"""Database utilities and lifecycle helpers.

Includes:
* Async SQLAlchemy engine/session factory
* Dependency provider `get_db`
* Migration runner `run_migrations`
* Initialization & seeding helpers

Seeding is idempotent; defaults only inserted when tables are empty.
"""

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text, event
from api.models import Base, Preset, MoonrakerConfig
import subprocess
from api.logger import get_logger
import os
import logging as _logging

DATABASE_URL = "sqlite+aiosqlite:///./pyunit.db"

db_logger = get_logger("database")

# Async engine (echo disabled by default; raise root logger to DEBUG to trace SQL)
engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    future=True,
    connect_args={
        "timeout": 30,  # Increase timeout for lock acquisition (default is 5)
        "check_same_thread": False  # Allow multi-threaded access
    },
    pool_pre_ping=True,  # Verify connections before use
    pool_size=10,  # Increase connection pool size
    max_overflow=20  # Allow more overflow connections
)

# Configure SQLite PRAGMA settings for each connection
@event.listens_for(engine.sync_engine, "connect")
def set_sqlite_pragma(dbapi_conn, connection_record):
    """Apply SQLite optimizations on each new connection.
    
    Critical for Orange Pi / SD card deployments:
    - WAL mode: allows concurrent reads during writes
    - synchronous=NORMAL: safe with WAL, much faster on slow storage
    - cache_size: reduces SD card access
    - temp_store: keeps temp data in RAM
    """
    cursor = dbapi_conn.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute("PRAGMA busy_timeout=30000")  # 30 second timeout
    cursor.execute("PRAGMA synchronous=NORMAL")  # Trade durability for speed (safe with WAL)
    cursor.execute("PRAGMA cache_size=-64000")  # 64MB cache (negative = KB)
    cursor.execute("PRAGMA temp_store=MEMORY")  # Keep temp tables in RAM
    cursor.close()
    db_logger.debug("SQLite PRAGMAs applied to new connection")

# Reduce SQLAlchemy internal logger verbosity
for _name in [
    'sqlalchemy.engine',
    'sqlalchemy.pool',
    'sqlalchemy.dialects',
    'sqlalchemy.orm'
]:
    _logging.getLogger(_name).setLevel(_logging.WARNING)

AsyncSessionLocal = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False
)


async def get_db():
    """Yield an `AsyncSession` with automatic commit/rollback semantics.

    Usage (FastAPI dependency):
        async def endpoint(db: AsyncSession = Depends(get_db)):
            ...
    Ensures session close at the end of request scope.
    """
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            db_logger.exception("Session error – rolled back")
            raise
        finally:
            await session.close()


def run_migrations():
    """Execute Alembic migrations to the latest head.

    Logs stdout/stderr for traceability. Skips if database file missing (first
    run scenarios may rely on `init_db` + `seed_db`).
    """
    if os.path.exists("./pyunit.db"):
        result = subprocess.Popen(
            ["alembic", "upgrade", "head"],
            cwd=".",
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        outputs = result.communicate()
        for output in outputs:
            if output:
                db_logger.info(output.decode())
        if result.returncode == 0:
            db_logger.info("Migrations applied successfully")
        else:
            db_logger.error("Migration process exited with code %s", result.returncode)
    else:
        db_logger.warning("Database file not found; skipping migrations")


async def init_db():
    """Create tables based on current SQLAlchemy metadata (non-destructive).
    
    Note: PRAGMA settings are now applied automatically via engine.connect event.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    db_logger.info("Database schema ensured (create_all)")


async def seed_db():
    """Insert baseline presets and Moonraker config if none exist."""
    async with AsyncSessionLocal() as session:
        try:
            has_preset = (await session.execute(Preset.__table__.select().limit(1))).first() is not None
            if not has_preset:
                db_logger.info("Seeding default presets")
                session.add_all([
                    Preset(name="PLA", temperature=50, max_temperature_delta=20, humidity=10, dry_time=180, storage_temperature=0, humidity_storage_dry_time=10, humidity_storage_range=3, storage_type="humidity"),
                    Preset(name="PETG", temperature=65, max_temperature_delta=20, humidity=10, dry_time=240, storage_temperature=0, humidity_storage_dry_time=10, humidity_storage_range=3, storage_type="humidity"),
                    Preset(name="TPU", temperature=60, max_temperature_delta=20, humidity=10, dry_time=300, storage_temperature=0, humidity_storage_dry_time=10, humidity_storage_range=3, storage_type="humidity"),
                    Preset(name="ABS", temperature=80, max_temperature_delta=20, humidity=10, dry_time=300, storage_temperature=0, humidity_storage_dry_time=10, humidity_storage_range=3, storage_type="humidity"),
                    Preset(name="PA", temperature=90, max_temperature_delta=20, humidity=10, dry_time=60, storage_temperature=70, humidity_storage_dry_time=0, humidity_storage_range=0, storage_type="temperature"),
                ])

            has_moonraker = (await session.execute(MoonrakerConfig.__table__.select().limit(1))).first() is not None
            if not has_moonraker:
                db_logger.info("Seeding default Moonraker config (127.0.0.1)")
                session.add(MoonrakerConfig(moonraker_ip="127.0.0.1"))

            await session.commit()
        except Exception:
            await session.rollback()
            db_logger.exception("Error while seeding database")
            raise
        finally:
            await session.close()