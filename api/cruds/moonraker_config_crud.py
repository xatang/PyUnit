from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from api.schemas import moonraker_config_schema as schema
from api import models
from typing import Optional
from api.logger import get_logger

logger = get_logger("moonraker_config_crud")

class MoonrakerCRUD:
    """CRUD operations for MoonrakerConfig (usually single-row configuration)."""
    async def create_config(self, db: AsyncSession, config_data: schema.MoonrakerConfigCreate) -> models.MoonrakerConfig:
        """Create a new Moonraker configuration row."""
        logger.debug("create_config start ip=%s", config_data.moonraker_ip)
        db_config = models.MoonrakerConfig(**config_data.dict())
        db.add(db_config)
        await db.commit()
        await db.refresh(db_config)
        logger.info("create_config success id=%s ip=%s", db_config.id, db_config.moonraker_ip)
        return schema.MoonrakerConfig.from_orm(db_config) if db_config else None
    
    async def update_config(self, db: AsyncSession, config_id: int, config_data: schema.MoonrakerConfigUpdate) -> models.MoonrakerConfig | None:
        """Update Moonraker configuration by ID; returns updated schema or None."""
        logger.debug("update_config start id=%s", config_id)
        result = await db.execute(
            select(models.MoonrakerConfig).where(models.MoonrakerConfig.id == config_id)
        )
        db_config = result.scalar_one_or_none()
        if db_config:
            for key, value in config_data.dict(exclude_unset=True).items():
                setattr(db_config, key, value)
            await db.commit()
            await db.refresh(db_config)
            logger.info("update_config success id=%s", config_id)
            return schema.MoonrakerConfig.from_orm(db_config)
        logger.warning("update_config not_found id=%s", config_id)
        return None

    async def get_config(self, session: AsyncSession, config_id: int) -> Optional[models.MoonrakerConfig]:
        """Fetch configuration by ID or return None."""
        logger.debug("get_config start id=%s", config_id)
        result = await session.execute(
            select(models.MoonrakerConfig).where(models.MoonrakerConfig.id == config_id)
        )
        db_config = result.scalar_one_or_none()
        if db_config:
            logger.debug("get_config found id=%s", config_id)
            return schema.MoonrakerConfig.from_orm(db_config)
        logger.warning("get_config not_found id=%s", config_id)
        return None

moonraker_crud = MoonrakerCRUD()