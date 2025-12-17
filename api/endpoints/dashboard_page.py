"""Dashboard interaction endpoints.

Provides:
* WebSocket streaming of dryer log history and live updates
* Control endpoint to set a preset (or reset to pending) for a running dryer
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
async def dryers_stats_websocket(websocket: WebSocket, db: AsyncSession = Depends(get_db)):
    """WebSocket endpoint streaming historical and live dryer logs.

    Sends an initial history payload (if any) then keeps the connection open
    until the client disconnects.
    """
    logger.debug("WS /dashboard/dryers connect")
    await webSocketManager.connect(websocket, 'dryers_stats')
    old_logs = await dryer_crud.get_logs(db)

    try:
        history = {'history': [json.loads(log.json()) for log in old_logs]}
        await websocket.send_text(json.dumps(history))
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