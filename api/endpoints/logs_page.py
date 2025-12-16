"""Log streaming endpoints.

WebSocket endpoints that replay existing rotated log files (app & dryer) and
then keep the connection open for live log push via the WebSocket manager.
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from api.logger import get_logger
from api.websocket_manager import webSocketManager
import aiofiles
from typing import List, Optional
import os

router = APIRouter()
logger = get_logger("logs_page_endpoint")


@router.websocket("/app")
async def app_log_websocket(websocket: WebSocket):
    """Stream application logs (historical + live) over WebSocket."""
    logger.debug("WS /logs/app connect")
    await webSocketManager.connect(websocket, 'app_logs')
    for rotated in ("app.log.1", "app.log"):
        old_logs = await read_log_file(rotated)
        for log in old_logs:
            await websocket.send_text(log)
    try:
        while True:
            await websocket.receive_text()  # ignored (keep-alive)
    except WebSocketDisconnect:
        webSocketManager.disconnect(websocket)
        logger.debug("WS /logs/app disconnect")


@router.websocket("/dryer")
async def dryer_log_websocket(websocket: WebSocket):
    """Stream dryer logs (historical + live) over WebSocket."""
    logger.debug("WS /logs/dryer connect")
    await webSocketManager.connect(websocket, 'dryer_logs')
    for rotated in ("dryer.log.1", "dryer.log"):
        old_logs = await read_log_file(rotated)
        for log in old_logs:
            await websocket.send_text(log)
    try:
        while True:
            await websocket.receive_text()  # ignored (keep-alive)
    except WebSocketDisconnect:
        webSocketManager.disconnect(websocket)
        logger.debug("WS /logs/dryer disconnect")


async def read_log_file(
    file_path: str = "app.log",
    limit: int = 999999,
    offset: int = 0,
    filter_level: Optional[str] = None,
    filter_name: Optional[str] = None
) -> List[str]:
    """Return filtered lines from a log file.

    Args:
        file_path: Path to log file.
        limit: Max number of lines to return after offset.
        offset: Number of filtered lines to skip before collecting.
        filter_level: If provided only lines containing this (case-insensitive) are included.
        filter_name: If provided only lines containing this (case-insensitive) are included.
    """
    if not os.path.exists(file_path):
        return []
    logs: List[str] = []
    try:
        async with aiofiles.open(file_path, 'r', encoding='utf-8') as f:
            content = await f.read()
        lines = content.splitlines()
        filtered_logs: List[str] = []
        for line in lines:
            line = line.strip()
            if not line:
                continue
            if filter_level and filter_level.upper() not in line.upper():
                continue
            if filter_name and filter_name.lower() not in line.lower():
                continue
            filtered_logs.append(line)
            if len(filtered_logs) >= limit + offset:
                break
        logs = filtered_logs[offset:offset + limit]
    except Exception as e:  # file can rotate concurrently
        logger.warning("Error reading log file %s error=%s", file_path, e)
    return logs