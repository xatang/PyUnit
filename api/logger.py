"""Application logging setup utilities.

Features:
* Loads .env file early so LOG_LEVEL / DRYER_LOG_LEVEL are respected.
* .env values have precedence by default (they overwrite existing env vars).
* To preserve already set process environment variables set DOTENV_RESPECT_ENV=1.
* Size-limited file handlers maintaining logs at ~4-5MB (removes old entries).
* Auto-truncation when size exceeds 5MB, trimming to 4MB (safe for Docker bind mounts).
* WebSocket broadcast handlers for real-time log streaming to clients.
* Convenience `get_logger` for consistent retrieval.
"""

import logging
import os
import asyncio

from api.websocket_manager import WebSocketConnectionManager, webSocketManager


class SizeLimitedFileHandler(logging.FileHandler):
    """FileHandler that maintains file size around maxBytes by truncating old entries.
    
    Unlike RotatingFileHandler, this doesn't try to rename files (which fails
    with Docker bind mounts). Instead, it truncates old entries from the beginning
    of the file when the limit is reached, keeping the file size stable around maxBytes.
    """
    def __init__(self, filename, mode='a', encoding=None, maxBytes=0, targetBytes=None):
        """
        Args:
            filename: Path to log file
            mode: File opening mode (typically 'a' for append)
            encoding: File encoding
            maxBytes: Maximum file size in bytes before truncation (0 = no limit)
            targetBytes: Target size after truncation (default: maxBytes * 0.8)
        """
        super().__init__(filename, mode, encoding)
        self.maxBytes = maxBytes
        self.targetBytes = targetBytes or int(maxBytes * 0.8) if maxBytes > 0 else 0
        self._check_counter = 0
        
    def emit(self, record):
        """Emit a record, checking file size periodically and truncating if needed."""
        try:
            # Check file size every 100 records to avoid excessive I/O
            self._check_counter += 1
            if self.maxBytes > 0 and self._check_counter >= 100:
                self._check_counter = 0
                self.stream.flush()
                if os.path.exists(self.baseFilename):
                    current_size = os.path.getsize(self.baseFilename)
                    if current_size > self.maxBytes:
                        self._truncate_to_target()
            super().emit(record)
        except Exception:
            self.handleError(record)
            
    def _truncate_to_target(self):
        """Truncate file to targetBytes by removing old entries from the beginning."""
        try:
            self.stream.close()
            
            current_size = os.path.getsize(self.baseFilename)
            bytes_to_remove = current_size - self.targetBytes
            
            if bytes_to_remove <= 0:
                self.stream = self._open()
                return
            
            # Read file and find position to cut
            with open(self.baseFilename, 'r', encoding=self.encoding or 'utf-8') as f:
                # Skip bytes_to_remove bytes, then find next newline
                f.seek(bytes_to_remove)
                # Read until next complete line
                f.readline()  # Skip partial line
                # Keep everything from here
                remaining_content = f.read()
            
            # Rewrite file with remaining content
            with open(self.baseFilename, 'w', encoding=self.encoding or 'utf-8') as f:
                f.write(f"--- Log truncated, removed ~{bytes_to_remove} bytes of old entries ---\n")
                f.write(remaining_content)
            
            # Reopen stream
            self.stream = self._open()
        except Exception as e:
            # If truncation fails, just continue logging
            print(f"Failed to truncate log file {self.baseFilename}: {e}")
            try:
                self.stream = self._open()
            except:
                pass


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
    
    # Use SizeLimitedFileHandler to maintain log files around 5MB
    # When file exceeds 5MB, old entries are removed to bring it down to ~4MB
    # This keeps the file size stable without rotating files (Docker bind mount safe)
    main_handler = SizeLimitedFileHandler(
        'app.log',
        mode='a',
        encoding='utf-8',
        maxBytes=5 * 1024 * 1024,    # 5 MB - trigger truncation
        targetBytes=4 * 1024 * 1024  # 4 MB - target size after truncation
    )
    main_handler.setFormatter(file_formatter)
    
    dryer_handler = SizeLimitedFileHandler(
        'dryer.log',
        mode='a',
        encoding='utf-8',
        maxBytes=5 * 1024 * 1024,    # 5 MB - trigger truncation
        targetBytes=4 * 1024 * 1024  # 4 MB - target size after truncation
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