from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession
from api.schemas import dryer_schema as dryerSchema
from api.schemas import preset_schema as presetSchema
from api import models
from typing import List
from sqlalchemy.orm import selectinload
from api.logger import get_logger

logger = get_logger("common_crud")

class CommonCRUD:
    """Common read operations for lightweight lists and maintenance tasks.

    Methods return Pydantic schema objects (not raw ORM instances) to ensure
    response stability and decouple higher layers from SQLAlchemy internals.
    """

    async def get_units(self, db: AsyncSession) -> List[models.Dryer]:
        """Return list of dryers (short schema).

        Returns empty list if no dryers exist.
        """
        logger.debug("get_units start")
        result = await db.execute(select(models.Dryer))
        db_dryers = result.scalars().all()
        dryers = [dryerSchema.DryerShort.from_orm(d) for d in db_dryers] if db_dryers else []
        logger.debug("get_units done count=%s", len(dryers))
        return dryers

    async def get_presets(self, db: AsyncSession) -> List[models.Preset]:
        """Return list of presets with linked dryers eager-loaded.

        Helpful for UI dropdowns where association preview is needed.
        """
        logger.debug("get_presets start")
        result = await db.execute(
            select(models.Preset)
            .options(
                selectinload(models.Preset.dryer_associations)
                .selectinload(models.DryerPresetAssociation.dryer)
            )
        )
        db_presets = result.scalars().all()
        presets = [presetSchema.Preset.from_orm(p) for p in db_presets] if db_presets else []
        logger.debug("get_presets done count=%s", len(presets))
        return presets

    async def clear_logs(self, db: AsyncSession) -> bool:
        """Delete all dryer logs.

        Returns True if any rows were deleted, False otherwise.
        Errors are caught and logged; on failure returns False.
        """
        logger.warning("clear_logs start (full table purge)")
        try:
            stmt = delete(models.DryerLogs)
            result = await db.execute(stmt)
            await db.commit()
            deleted_count = result.rowcount or 0
            logger.info("clear_logs success deleted=%s", deleted_count)
            return deleted_count > 0
        except Exception:
            await db.rollback()
            logger.exception("clear_logs failed")
            return False

common_crud = CommonCRUD()