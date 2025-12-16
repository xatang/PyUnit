"""Common lookup endpoints.

This module exposes lightweight, read-only endpoints used by the frontend to
populate select / dropdown UI elements (units and presets). They return simple
lists without pagination because the expected cardinality is low.
"""

from fastapi import APIRouter, Depends
from api.logger import get_logger
from api.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from api.cruds.common_crud import common_crud


router = APIRouter()
logger = get_logger("common_endpoint")


@router.get("/units")
async def get_units(db: AsyncSession = Depends(get_db)):
    """Return a list of all dryer (unit) configurations.

    Returns:
        List[DryerConfig]: Pydantic serialized dryer configurations.
    """
    logger.debug("GET /common/units")
    return await common_crud.get_units(db)


@router.get("/presets")
async def get_presets(db: AsyncSession = Depends(get_db)):
    """Return a list of all presets (lightweight summary only)."""
    logger.debug("GET /common/presets")
    return await common_crud.get_presets(db)


@router.get("/ping")
async def ping():
    """Simple health check endpoint (for uptime probes)."""
    logger.debug("GET /common/ping")
    return {"message": "pong"}


@router.get("/ws-info", tags=["websocket"], summary="WebSocket channels description")
async def ws_info():
    """Return JSON description of available WebSocket channels.

    OpenAPI does not include WebSocket routes, so we provide a separate
    machine-readable list. `path` is the URL to connect. `channel` is an
    internal grouping name in the manager.
    """
    websockets = [
        {
            "path": "/api/logs/app",
            "channel": "app_logs",
            "purpose": "Historical + live application log stream (text lines)",
            "client_send": "ignored / keep-alive",
            "server_send_example": "2025-10-12 12:00:00 - app - INFO - Started"
        },
        {
            "path": "/api/logs/dryer",
            "channel": "dryer_logs",
            "purpose": "Historical + live dryer log stream (text lines)",
            "client_send": "ignored / keep-alive",
            "server_send_example": "2025-10-12 12:00:01 - dryer - DEBUG - Fan on"
        },
        {
            "path": "/api/dashboard/dryers",
            "channel": "dryers_stats",
            "purpose": "Historical + live dryer state updates (JSON objects)",
            "client_send": "ignored (reserved for future commands)",
            "server_send_example": {"history": [{"id": 1, "status": "DRYING"}]}
        }
    ]
    logger.debug("GET /common/ws-info return %d channels", len(websockets))
    return {"websockets": websockets}