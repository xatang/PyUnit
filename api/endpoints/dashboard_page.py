"""Dashboard interaction endpoints.

Provides:
* WebSocket streaming of dryer log history and live updates
* Control endpoint to set a preset (or reset to pending) for a running dryer

WebSocket Endpoints:
-------------------
1. /dashboard/dryers (DEPRECATED - loads ALL logs from ALL dryers)
   - Use for backward compatibility only
   - Performance issue: sends all historical data on connection

2. /dashboard/dryer/{dryer_id} (RECOMMENDED - optimized for single dryer)
   - Query parameters:
     * start_time: ISO datetime (e.g., "2025-12-18T10:00:00Z") - filter logs after this time
     * end_time: ISO datetime - filter logs before this time
     * limit: max number of historical logs (optional) - limits result set if needed
   
   Frontend Usage Example (TypeScript):
   -----------------------------------
   // Connect to specific dryer with time filtering (no limit)
   const dryerId = 1;
   const oneHourAgo = new Date(Date.now() - 3600000).toISOString();
   const ws = new WebSocket(
     `ws://localhost:8000/dashboard/dryer/${dryerId}?start_time=${oneHourAgo}`
   );
   
   // Or with time range (limit is optional)
   const startTime = '2025-12-18T00:00:00Z';
   const endTime = '2025-12-18T23:59:59Z';
   const ws = new WebSocket(
     `ws://localhost:8000/dashboard/dryer/${dryerId}?start_time=${startTime}&end_time=${endTime}`
   );
"""

from fastapi import APIRouter, HTTPException, Request, WebSocket, status, WebSocketDisconnect, Depends
from api.logger import get_logger
from api.schemas import dryer_schema
from api.websocket_manager import webSocketManager
from api.cruds.dryer_crud import dryer_crud
from api.cruds.preset_crud import preset_crud
from api.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
import json
from typing import Optional, Any

router = APIRouter()
logger = get_logger("dashboard_page_endpoint")


def get_app(request: Request):
    """Dependency returning current FastAPI app (for runtime dryer instances)."""
    return request.app


@router.websocket("/dryers")
async def dryers_stats_websocket(
    websocket: WebSocket, 
    start_time: Optional[str] = None,
    end_time: Optional[str] = None,
    limit: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    """WebSocket endpoint streaming historical and live logs for ALL dryers.

    DEPRECATED: Use /dryer/{dryer_id} for better performance with single dryer pages.
    
    Query parameters:
    - start_time: ISO datetime string (e.g., 2025-12-18T10:00:00Z) - logs after this time
    - end_time: ISO datetime string - logs before this time  
    - limit: Maximum number of historical logs to load per dryer (optional)

    Sends filtered history then streams live updates for all dryers.
    """
    logger.debug("WS /dashboard/dryers connect start=%s end=%s limit=%s (deprecated - consider /dryer/{id})", 
                 start_time, end_time, limit)
    await webSocketManager.connect(websocket, 'dryers_stats')
    
    # Fetch filtered historical logs (all dryers)
    try:
        old_logs = await dryer_crud.get_logs(
            db,
            start_time=start_time,
            end_time=end_time,
            limit=limit
        )
        history = {'history': [json.loads(log.json()) for log in old_logs]}
        await websocket.send_text(json.dumps(history))
        logger.debug("WS /dashboard/dryers sent %d historical logs", len(old_logs))
    except Exception as e:  # non-fatal, continue with live stream
        logger.warning("Failed to send history over WS error=%s", e)
    
    try:
        while True:
            try:
                await websocket.receive_text()  # currently ignored (keep-alive / future commands)
            except RuntimeError as e:
                # WebSocket not connected or already closed
                logger.debug("WS receive error (client likely disconnected): %s", e)
                break
    except WebSocketDisconnect:
        logger.debug("WS /dashboard/dryers disconnect (explicit)")
    except Exception as e:
        logger.error("WS /dashboard/dryers unexpected error: %s", e)
    finally:
        webSocketManager.disconnect(websocket)
        logger.debug("WS /dashboard/dryers cleanup complete")


@router.websocket("/dryer/{dryer_id}")
async def dryer_stats_websocket(
    websocket: WebSocket, 
    dryer_id: int,
    start_time: Optional[str] = None,
    end_time: Optional[str] = None,
    limit: Optional[int] = None,
    db: AsyncSession = Depends(get_db)
):
    """WebSocket endpoint for a SINGLE dryer with optimized log filtering.

    Query parameters:
    - start_time: ISO datetime string (e.g., 2025-12-18T10:00:00Z) - logs after this time
    - end_time: ISO datetime string - logs before this time  
    - limit: Maximum number of historical logs to load (optional)

    Sends filtered history then streams live updates for this dryer only.
    """
    logger.debug("WS /dashboard/dryer/%s connect start=%s end=%s limit=%s", 
                 dryer_id, start_time, end_time, limit)
    
    # Register for live updates specific to this dryer
    await webSocketManager.connect(websocket, f'dryer_{dryer_id}_stats')
    
    # Fetch filtered historical logs
    try:
        old_logs = await dryer_crud.get_logs(
            db, 
            dryer_id=dryer_id,
            start_time=start_time,
            end_time=end_time,
            limit=limit
        )
        history = {'history': [json.loads(log.json()) for log in old_logs]}
        await websocket.send_text(json.dumps(history))
        logger.debug("WS /dashboard/dryer/%s sent %d historical logs", dryer_id, len(old_logs))
    except Exception as e:
        logger.warning("Failed to send history for dryer %s: %s", dryer_id, e)
    
    # Keep connection alive for live updates
    try:
        while True:
            try:
                # Client can send commands here (currently keep-alive only)
                await websocket.receive_text()
            except RuntimeError as e:
                logger.debug("WS dryer/%s receive error: %s", dryer_id, e)
                break
    except WebSocketDisconnect:
        logger.debug("WS /dashboard/dryer/%s disconnect (explicit)", dryer_id)
    except Exception as e:
        logger.error("WS /dashboard/dryer/%s unexpected error: %s", dryer_id, e)
    finally:
        webSocketManager.disconnect(websocket)
        logger.debug("WS /dashboard/dryer/%s cleanup complete", dryer_id)


@router.post("/control/set-preset/{dryer_id}")
async def dryer_control_set_preset(dryer_id: int, preset_id: Optional[int] = None, app = Depends(get_app), db: AsyncSession = Depends(get_db)):
    """Set (or clear) the active preset for a dryer.

    If preset_id is omitted the dryer status is set to PENDING (idle).
    Raises 404 if dryer (db or runtime instance) or preset link (when provided)
    does not exist.
    """
    logger.debug("POST /dashboard/control/set-preset/%s preset_id=%s", dryer_id, preset_id)
    existing_dryer_config = await dryer_crud.get_dryer_config(db, dryer_id)
    if not existing_dryer_config:
        logger.warning("Dryer not found dryer_id=%s (db lookup)", dryer_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Dryer with id {dryer_id} not found"
        )
    runtime_dryer = await get_dryer(app, dryer_id)
    if not runtime_dryer:
        logger.warning("Dryer not found dryer_id=%s (runtime instances)", dryer_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Dryer with id {dryer_id} not found"
        )
    if preset_id is None:
        dryer_status = dryer_schema.DryerLogStatus.PENDING
        await runtime_dryer.set_status(dryer_status)
        return {"success": True, "message": f"Dryer with id {dryer_id} set to status {dryer_status}"}
    existing_preset_link = await preset_crud.get_preset_link(db, preset_id, dryer_id)
    if not existing_preset_link:
        logger.warning("Preset link not found preset_id=%s dryer_id=%s", preset_id, dryer_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Preset link with preset id {preset_id} and dryer id {dryer_id} not found"
        )
    existing_preset = await preset_crud.get_preset(db, preset_id)
    dryer_status = dryer_schema.DryerLogStatus.DRYING
    await runtime_dryer.set_status(dryer_status, existing_preset)
    return {"success": True, "message": f"Dryer with id {dryer_id} set to status {dryer_status} with preset {existing_preset.name}"}


async def get_dryer(app, id: int):
    """Return runtime dryer instance by id (None if not found)."""
    for i in reversed(range(len(app.state.dryer_instances))):
        if app.state.dryer_instances[i].id == id:
            return app.state.dryer_instances[i]
    return None