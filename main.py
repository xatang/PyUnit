from fastapi import FastAPI
from fastapi.responses import HTMLResponse
import uvicorn
from contextlib import asynccontextmanager
from api.database import run_migrations, seed_db
from api.logger import logger, get_logger
from fastapi.responses import FileResponse
import os
from api.endpoints import router as api_router
from api.workers.status_worker import statusWorker
from api.tools.dryer_control import Dryer_control
from api.cruds.common_crud import common_crud
from api.database import get_db

def _to_bool(v: str | None) -> bool:
    if v is None:
        return False
    return v.strip().lower() in {"1", "true", "yes", "on"}

CLEAR_LOGS_ON_STARTUP = _to_bool(os.getenv("CLEAR_LOGS_ON_STARTUP"))

api_logger = get_logger("api")

dryer_instances: list[Dryer_control] = []

@asynccontextmanager
async def lifespan(app: FastAPI):
    run_migrations()
    if CLEAR_LOGS_ON_STARTUP:
        async for session in get_db():
            try:
                deleted = await common_crud.clear_logs(session)
                logger.info("Startup log clear executed deleted=%s", deleted)
            except Exception:
                logger.exception("Failed to clear logs on startup")
    else:
        logger.info("Skipping startup log clear (CLEAR_LOGS_ON_STARTUP=%s)", CLEAR_LOGS_ON_STARTUP)
    # Seed baseline data (presets, moonraker config) if empty
    await seed_db()
    await statusWorker.start(app)
    logger.info("Application started with migrations")
    yield
    await statusWorker.stop()
    logger.info("Application shutting down")

app = FastAPI(
    title="PyUnit",
    description="Api for PyUnit",
    version="2.0.2",
    debug=True,
    lifespan=lifespan
)

app.state.dryer_instances = dryer_instances
app.include_router(api_router)

@app.get("/help", response_class=HTMLResponse)
async def help_page():
    return """
    <h1>Hello World</h1>
    <p>
        <a href="/docs">Swagger UI documentation</a><br>
        <a href="/redoc">ReDoc documentation</a>
    </p>
    """

@app.get("/{full_path:path}")
async def web_gui(full_path: str):
    file_path = os.path.join("web", "dist", "pyunit", "browser", full_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    return FileResponse(os.path.join("web", "dist", "pyunit", "browser", "index.html"))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000, log_config=None)