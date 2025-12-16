from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from api import models
from api.schemas import preset_schema as schema
from typing import Optional
from sqlalchemy.orm import selectinload
from sqlalchemy import and_
from api.logger import get_logger

logger = get_logger("preset_crud")

class PresetCRUD:
    async def create_preset(
        self, 
        db: AsyncSession, 
        preset_data: schema.PresetCreate
    ) -> models.Preset:
        """Create a new preset.

        Parameters
        ----------
        db : AsyncSession
            Active database session.
        preset_data : schema.PresetCreate
            Validated preset creation payload.

        Returns
        -------
        schema.Preset
            Newly created preset with linked dryers list (likely empty initially).
        """
        logger.debug("create_preset start name=%s", preset_data.name)
        db_preset = models.Preset(**preset_data.dict())
        db.add(db_preset)
        await db.commit()
        await db.refresh(db_preset)
        preset = await self.get_preset(db ,db_preset.id)
        logger.info("create_preset success id=%s name=%s", db_preset.id, preset_data.name)
        return preset

    async def update_preset(
        self, 
        db: AsyncSession, 
        preset_id: int, 
        preset_data: schema.PresetUpdate
    ) -> models.Dryer | None:
        """Update preset by ID.

        Returns full refreshed preset schema or None if not found.
        """
        logger.debug("update_preset start id=%s", preset_id)
        result = await db.execute(
            select(models.Preset).where(models.Preset.id == preset_id)
        )
        db_preset = result.scalar_one_or_none()
        if db_preset:
            for key, value in preset_data.dict(exclude_unset=True).items():
                setattr(db_preset, key, value)
            await db.commit()
            await db.refresh(db_preset)
            logger.info("update_preset success id=%s", preset_id)
            return await self.get_preset(db ,db_preset.id)
        logger.warning("update_preset not_found id=%s", preset_id)
        return None
    
    async def get_preset(
        self, 
        session: AsyncSession, 
        preset_id: int
    ) -> Optional[models.Preset]:
        """Fetch preset by ID including associated dryers.

        Returns Pydantic schema or None.
        """
        result = await session.execute(
            select(models.Preset)
            .options(
                selectinload(models.Preset.dryer_associations)
                .selectinload(models.DryerPresetAssociation.dryer)
            )
            .where(models.Preset.id == preset_id)
        )
        db_preset = result.scalar_one_or_none()
        return schema.Preset.from_orm(db_preset) if db_preset else None

    async def delete_preset(
        self, 
        db: AsyncSession, 
        preset_id: int
    ) -> bool:
        """Delete preset by ID.

        Returns True if deleted, False if not found.
        """
        logger.debug("delete_preset start id=%s", preset_id)
        result = await db.execute(
            select(models.Preset).where(models.Preset.id == preset_id)
        )
        db_preset = result.scalar_one_or_none()
        if db_preset:
            await db.delete(db_preset)
            await db.commit()
            logger.info("delete_preset success id=%s", preset_id)
            return True
        logger.warning("delete_preset not_found id=%s", preset_id)
        return False
    
    async def create_preset_link(
        self,
        db: AsyncSession,
        link_data: schema.DryerPresetAssociationCreate
    ):
        """Create association between preset and dryer.

        Returns created association schema.
        """
        logger.debug("create_preset_link start preset_id=%s dryer_id=%s", link_data.preset_id, link_data.dryer_id)
        db_link = models.DryerPresetAssociation(**link_data.dict())
        db.add(db_link)
        await db.commit()
        await db.refresh(db_link)
        logger.info("create_preset_link success preset_id=%s dryer_id=%s", link_data.preset_id, link_data.dryer_id)
        return schema.DryerPresetAssociation.from_orm(db_link) if db_link else None

    async def get_preset_link(
        self, 
        session: AsyncSession, 
        preset_id: int,
        dryer_id: int
    ) -> Optional[models.DryerPresetAssociation]:
        """Fetch association between preset and dryer.

        Returns schema or None.
        """
        result = await session.execute(
            select(models.DryerPresetAssociation).where(and_(models.DryerPresetAssociation.preset_id == preset_id, models.DryerPresetAssociation.dryer_id==dryer_id))
        )
        db_link = result.scalar_one_or_none()
        return schema.DryerPresetAssociation.from_orm(db_link) if db_link else None

    async def delete_preset_link(
        self, 
        db: AsyncSession, 
        preset_id: int,
        dryer_id: int
    ) -> bool:
        """Delete association between preset and dryer.

        Returns True if deleted else False.
        """
        logger.debug("delete_preset_link start preset_id=%s dryer_id=%s", preset_id, dryer_id)
        result = await db.execute(
            select(models.DryerPresetAssociation).where(and_(models.DryerPresetAssociation.preset_id == preset_id, models.DryerPresetAssociation.dryer_id==dryer_id))
        )
        db_link = result.scalar_one_or_none()
        if db_link:
            await db.delete(db_link)
            await db.commit()
            logger.info("delete_preset_link success preset_id=%s dryer_id=%s", preset_id, dryer_id)
            return True
        logger.warning("delete_preset_link not_found preset_id=%s dryer_id=%s", preset_id, dryer_id)
        return False

preset_crud = PresetCRUD()