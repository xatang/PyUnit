"""Application logging setup utilities.

Features:
* Loads .env file early so LOG_LEVEL / DRYER_LOG_LEVEL are respected.
* .env values have precedence by default (they overwrite existing env vars).
* To preserve already set process environment variables set DOTENV_RESPECT_ENV=1.
* Rotating file handlers for app & dryer specific logs.
* WebSocket broadcast handlers for real-time log streaming to clients.
* Convenience `get_logger` for consistent retrieval.
"""

import logging
import os
from logging.handlers import RotatingFileHandler
import asyncio

from api.websocket_manager import WebSocketConnectionManager, webSocketManager


def _as_bool(value: str | None) -> bool:
    return (value or '').strip().lower() in {"1", "true", "yes", "on"}


def _load_dotenv(override: bool = True):
    """Lightweight .env loader (no external dependency on python-dotenv).

    Parameters
    ----------
    override : bool
        If True, existing process environment variables are overwritten.

    Returns
    -------
    tuple[list[str], list[str]]
        (inserted_keys, overridden_keys)

    Notes
    -----
    The earlier behaviour (without override) only *added* variables that were
    missing. That could look like only the "last line" was loaded if earlier
    keys already existed (e.g. from an IDE run configuration). Now we default
    to overriding; to switch back set DOTENV_RESPECT_ENV=1 (which flips the
    `override` flag to False).
    Malformed / comment / blank lines are skipped silently.
    """
    try:
        project_root = os.path.dirname(os.path.dirname(__file__))  # ../..
        env_path = os.path.join(project_root, '.env')
        if not os.path.isfile(env_path):
            return [], []
        inserted: list[str] = []
        overridden: list[str] = []
        with open(env_path, 'r', encoding='utf-8') as f:
            for raw_line in f:
                line = raw_line.strip()
                if not line or line.startswith('#'):
                    continue
                if '=' not in line:
                    continue
                key, value = line.split('=', 1)
                key = key.strip()
                value = value.strip().strip('"').strip("'")
                if not key:
                    continue
                if key in os.environ:
                    if override:
                        os.environ[key] = value
                        overridden.append(key)
                else:
                    os.environ[key] = value
                    inserted.append(key)
        return inserted, overridden
    except Exception:
        # Fail silently; logging not configured yet.
        return [], []

class WebSocketLogHandler(logging.Handler):
    """Simple logging handler forwarding formatted records to WebSocket clients."""
    def __init__(self, manager: WebSocketConnectionManager, webSocketType: str):
        super().__init__()
        self.manager = manager
        self.webSocketType = webSocketType
        self.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))

    def emit(self, record):
        log_entry = self.format(record)
        try:
            # Use currently running loop; if none (e.g., during import/startup), skip silently.
            loop = asyncio.get_running_loop()
            loop.create_task(self.manager.broadcast(log_entry, connection_type=self.webSocketType))
        except RuntimeError:
            # No running event loop yet; websocket clients not ready. Silently drop.
            # (Option: buffer and flush later if needed.)
            pass


def _parse_level(value: str, default: int = logging.INFO) -> int:
    """Map string level name to logging constant with fallback."""
    if not value:
        return default
    value = value.strip().upper()
    return {
        'CRITICAL': logging.CRITICAL,
        'ERROR': logging.ERROR,
        'WARN': logging.WARN,
        'WARNING': logging.WARN,
        'INFO': logging.INFO,
        'DEBUG': logging.DEBUG,
        'NOTSET': logging.NOTSET
    }.get(value, default)

def setup_logging():
    """Configure root + dryer loggers and attach file/console/websocket handlers."""
    # Load .env first so LOG_LEVEL / DRYER_LOG_LEVEL can be supplied from file.
    respect_existing = _as_bool(os.getenv('DOTENV_RESPECT_ENV'))
    inserted_keys, overridden_keys = _load_dotenv(override=not respect_existing)
    file_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    console_formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    main_handler = RotatingFileHandler(
        'app.log',
        maxBytes=5 * 1024 * 1024,
        backupCount=1,
        encoding='utf-8'
    )
    main_handler.setFormatter(file_formatter)
    
    dryer_handler = RotatingFileHandler(
        'dryer.log',
        maxBytes=5 * 1024 * 1024,
        backupCount=0,
        encoding='utf-8'
    )
    dryer_handler.setFormatter(file_formatter)
    
    stream_handler = logging.StreamHandler()
    stream_handler.setFormatter(console_formatter)
    

    websocket_root_handler = WebSocketLogHandler(webSocketManager, 'app_logs')

    root_logger = logging.getLogger()
    root_level = _parse_level(os.getenv('LOG_LEVEL', 'INFO'), logging.INFO)
    root_logger.setLevel(root_level)
    root_logger.addHandler(main_handler)
    root_logger.addHandler(stream_handler)
    root_logger.addHandler(websocket_root_handler)

    websocket_dryer_handler = WebSocketLogHandler(webSocketManager, 'dryer_logs')
    
    dryer_logger = logging.getLogger("dryer")
    dryer_level = _parse_level(os.getenv('DRYER_LOG_LEVEL'), root_level)
    dryer_logger.setLevel(dryer_level)
    dryer_logger.propagate = False
    dryer_logger.addHandler(dryer_handler)
    dryer_logger.addHandler(stream_handler)
    dryer_logger.addHandler(websocket_dryer_handler)
    
    root_logger.debug(
        "Logging initialized root_level=%s dryer_level=%s env_inserted=%s env_overridden=%s mode=%s",
        logging.getLevelName(root_level),
        logging.getLevelName(dryer_level),
        ','.join(inserted_keys) if inserted_keys else 'none',
        ','.join(overridden_keys) if overridden_keys else 'none',
        'respect-env' if respect_existing else 'force-dotenv',
    )
    return root_logger

def get_logger(name: str):
    """Return a logger by name (wrapper for consistency/import ergonomics)."""
    return logging.getLogger(name)

logger = setup_logging()