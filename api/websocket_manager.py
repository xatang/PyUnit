"""WebSocket connection manager.

Provides simple grouping of WebSocket clients for application logs, dryer logs
and dryer statistics. The original interface is preserved: `connect` accepts a
`connection_type` (channel) string and `broadcast` can target a specific group
or all active connections. Dead/broken connections are pruned during broadcast
with lightweight debug logging.

Supports dynamic channels like dryer_{id}_stats for per-dryer subscriptions.
"""

from fastapi import WebSocket
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class WebSocketConnectionManager:
    """Manage WebSocket connections grouped by a semantic type.

    Supported connection types:
      - app_logs: general backend/application log lines
      - dryer_logs: dryer operational log messages
      - dryers_stats: periodic telemetry / status payloads (legacy - all dryers)
      - dryer_{id}_stats: per-dryer telemetry (optimized, e.g., dryer_1_stats)

    Dynamic channels are automatically created when first connection subscribes.
    """

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        # Legacy fixed channels
        self.app_logs_connections: List[WebSocket] = []
        self.dryer_logs_connections: List[WebSocket] = []
        self.dryers_stats_connections: List[WebSocket] = []
        # Dynamic channels (key = channel name, value = list of websockets)
        self.dynamic_channels: Dict[str, List[WebSocket]] = {}

    async def connect(self, websocket: WebSocket, connection_type: str = "general"):
        """Accept a new WebSocket and classify by `connection_type`.

        Supports both fixed channels (app_logs, dryer_logs, dryers_stats)
        and dynamic channels (e.g., dryer_1_stats, dryer_2_stats).
        """
        await websocket.accept()
        self.active_connections.append(websocket)
        
        # Fixed legacy channels
        if connection_type == "app_logs":
            self.app_logs_connections.append(websocket)
        elif connection_type == "dryer_logs":
            self.dryer_logs_connections.append(websocket)
        elif connection_type == "dryers_stats":
            self.dryers_stats_connections.append(websocket)
        else:
            # Dynamic channel (e.g., dryer_{id}_stats)
            if connection_type not in self.dynamic_channels:
                self.dynamic_channels[connection_type] = []
            self.dynamic_channels[connection_type].append(websocket)
            
        logger.debug(
            "WebSocket connected type=%s active=%d", connection_type, len(self.active_connections)
        )

    def disconnect(self, websocket: WebSocket):
        """Remove a WebSocket from all tracking lists if present."""
        removed = False
        
        # Remove from main list
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
            removed = True
            
        # Remove from fixed channels
        if websocket in self.app_logs_connections:
            self.app_logs_connections.remove(websocket)
            removed = True
        if websocket in self.dryer_logs_connections:
            self.dryer_logs_connections.remove(websocket)
            removed = True
        if websocket in self.dryers_stats_connections:
            self.dryers_stats_connections.remove(websocket)
            removed = True
            
        # Remove from dynamic channels
        empty_channels = []
        for channel_name, connections in self.dynamic_channels.items():
            if websocket in connections:
                connections.remove(websocket)
                removed = True
                # Mark channel for cleanup if empty
                if len(connections) == 0:
                    empty_channels.append(channel_name)
        
        # Cleanup empty dynamic channels to prevent memory leak
        for channel_name in empty_channels:
            del self.dynamic_channels[channel_name]
            logger.debug("Removed empty dynamic channel: %s", channel_name)
            
        if removed:
            logger.debug(
                "WebSocket disconnected remaining=%d dynamic_channels=%d", 
                len(self.active_connections),
                len(self.dynamic_channels)
            )

    async def broadcast(self, message: str, connection_type: str = "all"):
        """Send a text message to all or a specific connection type.

        Supports fixed channels (app_logs, dryer_logs, dryers_stats) and
        dynamic channels (dryer_{id}_stats). Broken connections encountered 
        during send are removed via `disconnect`.
        """
        if connection_type == "all":
            targets = list(self.active_connections)
        elif connection_type == "app_logs":
            targets = list(self.app_logs_connections)
        elif connection_type == "dryer_logs":
            targets = list(self.dryer_logs_connections)
        elif connection_type == "dryers_stats":
            targets = list(self.dryers_stats_connections)
        elif connection_type in self.dynamic_channels:
            # Dynamic channel (e.g., dryer_1_stats)
            targets = list(self.dynamic_channels[connection_type])
        else:
            # Unknown channel - no subscribers, skip silently
            logger.debug("No subscribers for channel '%s', skipping broadcast", connection_type)
            return

        dead_connections = []
        for ws in targets:
            try:
                await ws.send_text(message)
            except Exception as exc:  # noqa: BLE001 broad here to ensure cleanup
                logger.debug("Dropping dead WebSocket during broadcast channel=%s: %s", connection_type, exc)
                dead_connections.append(ws)
        
        # Batch cleanup after iteration
        for ws in dead_connections:
            self.disconnect(ws)


webSocketManager = WebSocketConnectionManager()