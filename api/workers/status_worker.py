"""Background status worker.

Periodically:
* Loads dryers from DB
* Reconciles runtime instances with DB state (adds / removes)
* Updates each dryer (batched Moonraker status queries inside dryer control)
* Broadcasts aggregated log JSON over the 'dryers_stats' WebSocket channel

Timing: The loop attempts roughly 1 Hz cadence (sleep adjusted for processing
time). Errors trigger a brief backoff and a safety heater shutdown.
"""

import asyncio
from api.logger import get_logger
from api.database import get_db
from api.tools.moonraker_api import Moonraker_api
from fastapi import FastAPI, HTTPException
from api.cruds.common_crud import common_crud
from sqlalchemy.ext.asyncio import AsyncSession
from api.tools.dryer_control import Dryer_control
import traceback
from datetime import datetime
from api.websocket_manager import webSocketManager

logger = get_logger("status_worker")


class StatusWorker:
    """Periodic background process maintaining dryer runtime state and telemetry."""

    def __init__(self):
        self.db: AsyncSession | None = None
        self.task: asyncio.Task | None = None
        self.running = False
        self.app: FastAPI | None = None

    async def worker(self):
        """Main loop fetching DB dryers, syncing instances, updating status, broadcasting logs."""
        while self.running:
            if not self.app:
                logger.warning("Worker running without app reference; sleeping")
                await asyncio.sleep(1)
                continue
            self.db = get_db()
            start_time = datetime.utcnow()
            update_result: list[str] = []
            try:
                async for session in self.db:
                    db_dryers = await common_crud.get_units(session)
                    # Remove runtime dryers missing from DB
                    for dryer in list(self.app.state.dryer_instances):
                        if not any(e.id == dryer.id for e in db_dryers):
                            await self._delete_Dryer(dryer.id)
                    # Ensure runtime instances exist for all DB dryers
                    for db_dryer in db_dryers:
                        try:
                            dryer = next(e for e in self.app.state.dryer_instances if e.id == db_dryer.id)
                        except StopIteration:
                            dryer = await self._add_Dryer(db_dryer.id)
                        try:
                            update_result.append(await dryer.update_status())
                        except HTTPException:
                            logger.error("Dryer missing during update dryer_id=%s", db_dryer.id)
                if update_result:
                    update_result = ','.join(update_result)
                    await webSocketManager.broadcast(f'[{update_result}]', 'dryers_stats')
                end_time = datetime.utcnow()
                delta_time = end_time - start_time
                # Aim for ~1 second loop time
                if delta_time.seconds == 0:
                    await asyncio.sleep((1_000_000 - delta_time.microseconds)/1_000_000)
            except Exception as e:  # broad catch to keep loop alive
                logger.error("Status loop error: %s", e)
                logger.error("Traceback: %s", traceback.format_exc())
                await self._on_data_error()
                await asyncio.sleep(1)

    async def _add_Dryer(self, id: int):
        """Instantiate and initialize a runtime Dryer_control, register in app state."""
        dryer = Dryer_control(id)
        await dryer.initialize()
        self.app.state.dryer_instances.append(dryer)
        logger.info("Runtime dryer added dryer_id=%s", id)
        return dryer

    async def _delete_Dryer(self, id: int):
        """Remove a runtime dryer instance by id if present."""
        for i in reversed(range(len(self.app.state.dryer_instances))):
            if self.app.state.dryer_instances[i].id == id:
                del self.app.state.dryer_instances[i]
                logger.info("Runtime dryer removed dryer_id=%s", id)
                break

    async def _on_data_error(self):
        """Fail-safe: stop heating on all dryers after unrecoverable loop error."""
        dryers: list[Dryer_control] = self.app.state.dryer_instances
        for dryer in dryers:
            try:
                await dryer.heater.set(0)
            except Exception:
                pass

    async def start(self, app: FastAPI):
        """Start the background worker loop."""
        if self.running:
            logger.warning("Status worker already running")
            return
        self.app = app
        self.running = True
        self.task = asyncio.create_task(self.worker())
        logger.info("Status worker started")

    async def stop(self):
        """Stop the worker and cancel its task."""
        self.running = False
        if self.task:
            self.task.cancel()
            try:
                await self.task
            except asyncio.CancelledError:
                pass
        logger.info("Status worker stopped")

statusWorker = StatusWorker()


