"""WebSocket connection manager.

Provides simple grouping of WebSocket clients for application logs, dryer logs
and dryer statistics. The original interface is preserved: `connect` accepts a
`connection_type` (channel) string and `broadcast` can target a specific group
or all active connections. Dead/broken connections are pruned during broadcast
with lightweight debug logging.
"""

from fastapi import WebSocket
from typing import List
import logging

logger = logging.getLogger(__name__)


class WebSocketConnectionManager:
    """Manage WebSocket connections grouped by a semantic type.

    Supported connection types:
      - app_logs: general backend/application log lines
      - dryer_logs: dryer operational log messages
      - dryers_stats: periodic telemetry / status payloads

    Any other connection type passed to `connect` is stored only in the
    aggregate `active_connections` list and will receive broadcasts when the
    `connection_type` parameter is `all`.
    """

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.app_logs_connections: List[WebSocket] = []
        self.dryer_logs_connections: List[WebSocket] = []
        self.dryers_stats_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket, connection_type: str = "general"):
        """Accept a new WebSocket and classify by `connection_type`.

        Duplicate additions are naturally avoided because each list holds
        references only once (clients typically call connect a single time).
        """
        await websocket.accept()
        self.active_connections.append(websocket)
        if connection_type == "app_logs":
            self.app_logs_connections.append(websocket)
        elif connection_type == "dryer_logs":
            self.dryer_logs_connections.append(websocket)
        elif connection_type == "dryers_stats":
            self.dryers_stats_connections.append(websocket)
        logger.debug(
            "WebSocket connected type=%s active=%d", connection_type, len(self.active_connections)
        )

    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket from all tracking lists if present."""
        removed = False
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            removed = True
        if websocket in self.app_logs_connections:
            self.app_logs_connections.remove(websocket)
            removed = True
        if websocket in self.dryer_logs_connections:
            self.dryer_logs_connections.remove(websocket)
            removed = True
        if websocket in self.dryers_stats_connections:
            self.dryers_stats_connections.remove(websocket)
            removed = True
        if removed:
            logger.debug(
                "WebSocket disconnected remaining=%d", len(self.active_connections)
            )

    async def broadcast(self, message: str, connection_type: str = "all"):
        """Send a text message to all or a specific connection type.

        Broken connections encountered during send are removed via `disconnect`.
        """
        if connection_type == "all":
            targets = list(self.active_connections)
        elif connection_type == "app_logs":
            targets = list(self.app_logs_connections)
        elif connection_type == "dryer_logs":
            targets = list(self.dryer_logs_connections)
        elif connection_type == "dryers_stats":
            targets = list(self.dryers_stats_connections)
        else:
            logger.debug("Unknown connection_type '%s' defaulting to all", connection_type)
            targets = list(self.active_connections)

        for ws in targets:
            try:
                await ws.send_text(message)
            except Exception as exc:  # noqa: BLE001 broad here to ensure cleanup
                logger.debug("Dropping dead WebSocket during broadcast: %s", exc)
                self.disconnect(ws)


webSocketManager = WebSocketConnectionManager()