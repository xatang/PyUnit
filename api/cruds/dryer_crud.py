from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from api import models
from api.schemas import dryer_schema as schema
from typing import Optional, List
from api.logger import get_logger

logger = get_logger("dryer_crud")

class DryerCRUD:
    """CRUD operations for Dryer entities and related logs.

    Methods return Pydantic schemas to decouple layers.
    """
    async def get_dryer_config(self, db: AsyncSession, dryer_id: int) -> Optional[models.Dryer]:
        """Fetch a dryer with full configuration by ID.

        Returns Dryer schema or None.
        """
        logger.debug("get_dryer_config start id=%s", dryer_id)
        result = await db.execute(
            select(models.Dryer)
            .options(selectinload(models.Dryer.servo), selectinload(models.Dryer.heater), selectinload(models.Dryer.humidity),
                     selectinload(models.Dryer.led), selectinload(models.Dryer.temperature))
            .where(models.Dryer.id == dryer_id)
        )
        db_dryer = result.scalar_one_or_none()
        if db_dryer:
            logger.debug("get_dryer_config found id=%s", dryer_id)
            return schema.Dryer.from_orm(db_dryer)
        logger.warning("get_dryer_config not_found id=%s", dryer_id)
        return None

    async def create_dryer_config(self, db: AsyncSession, dryer_data: schema.DryerCreate) -> models.Dryer:
        """Create a new dryer with all related config sub-entities."""
        logger.debug("create_dryer_config start name=%s", dryer_data.name)
        dryer_dict = dryer_data.dict(exclude={'config'})
        db_dryer = models.Dryer(**dryer_dict)   
        db.add(db_dryer)
        await db.flush()

    # Create heater config
        heater_dict = dryer_data.config.heater.dict()
        heater_dict['dryer_id'] = db_dryer.id
        db_heater = models.HeaterConfig(**heater_dict)
        db.add(db_heater)

    # Create humidity config
        humidity_dict = dryer_data.config.humidity.dict()
        humidity_dict['dryer_id'] = db_dryer.id
        db_humidity = models.HumidityConfig(**humidity_dict)
        db.add(db_humidity)

    # Create LED config
        led_dict = dryer_data.config.led.dict()
        led_dict['dryer_id'] = db_dryer.id
        db_led = models.LedConfig(**led_dict)
        db.add(db_led)

    # Create temperature sensor config
        temp_dict = dryer_data.config.temperature.dict()
        temp_dict['dryer_id'] = db_dryer.id
        db_temp = models.TemperatureConfig(**temp_dict)
        db.add(db_temp)

    # Create servo config
        servo_dict = dryer_data.config.servo.dict()
        servo_dict['dryer_id'] = db_dryer.id
        db_servo = models.ServoConfig(**servo_dict)
        db.add(db_servo)


        await db.commit()
        result = await db.execute(
            select(models.Dryer)
            .options(selectinload(models.Dryer.servo), selectinload(models.Dryer.heater), selectinload(models.Dryer.humidity),
                     selectinload(models.Dryer.led), selectinload(models.Dryer.temperature))
            .where(models.Dryer.id == db_dryer.id)
        )
        db_dryer = result.scalar_one_or_none()
        logger.info("create_dryer_config success id=%s", getattr(db_dryer, 'id', None))
        return schema.Dryer.from_orm(db_dryer) if db_dryer else None

    async def update_dryer_config(self, db: AsyncSession, dryer_id: int, dryer_data: schema.DryerUpdate) -> models.Dryer | None:
        """Update dryer and nested config objects by ID.

        Returns updated Dryer schema or None.
        """
        logger.debug("update_dryer_config start id=%s", dryer_id)
        result = await db.execute(
            select(models.Dryer)
            .options(
                selectinload(models.Dryer.servo),
                selectinload(models.Dryer.heater),
                selectinload(models.Dryer.humidity),
                selectinload(models.Dryer.led),
                selectinload(models.Dryer.temperature)
            )
            .where(models.Dryer.id == dryer_id)
        )
        db_dryer = result.scalar_one_or_none()
        
        if not db_dryer:
            logger.warning("update_dryer_config not_found id=%s", dryer_id)
            return None

        db_dryer.name = dryer_data.name
        config_data = dryer_data.config
        
    # Update heater config
        if config_data.heater is not None and db_dryer.heater:
            for key, value in config_data.heater.dict(exclude_unset=True).items():
                setattr(db_dryer.heater, key, value)
        
    # Update humidity config
        if config_data.humidity is not None and db_dryer.humidity:
            for key, value in config_data.humidity.dict(exclude_unset=True).items():
                setattr(db_dryer.humidity, key, value)
        
    # Update LED config
        if config_data.led is not None and db_dryer.led:
            for key, value in config_data.led.dict(exclude_unset=True).items():
                setattr(db_dryer.led, key, value)
        
    # Update temperature config
        if config_data.temperature is not None and db_dryer.temperature:
            for key, value in config_data.temperature.dict(exclude_unset=True).items():
                setattr(db_dryer.temperature, key, value)
        
    # Update servo config
        if config_data.servo is not None and db_dryer.servo:
            for key, value in config_data.servo.dict(exclude_unset=True).items():
                setattr(db_dryer.servo, key, value)
        await db.commit()
        await db.refresh(db_dryer)
        logger.info("update_dryer_config success id=%s", dryer_id)
        return schema.Dryer.from_orm(db_dryer)

    async def delete_dryer(self, db: AsyncSession, dryer_id: int) -> bool:
        """Delete dryer by ID. Returns True if deleted."""
        logger.debug("delete_dryer start id=%s", dryer_id)
        result = await db.execute(
            select(models.Dryer).where(models.Dryer.id == dryer_id)
        )
        db_dryer = result.scalar_one_or_none()
        if db_dryer:
            await db.delete(db_dryer)
            await db.commit()
            logger.info("delete_dryer success id=%s", dryer_id)
            return True
        logger.warning("delete_dryer not_found id=%s", dryer_id)
        return False
    
    async def add_log(self, db: AsyncSession, log_data: schema.DryerLog) -> models.DryerLogs:
        """Insert a dryer log entry and return created schema."""
        db_log = models.DryerLogs(**log_data.dict())
        db.add(db_log)
        await db.commit()
        await db.refresh(db_log)
        return schema.DryerLog.from_orm(db_log) if db_log else None

    async def get_logs(self, db: AsyncSession) -> list[models.DryerLogs]:
        """Return all dryer logs (no filtering)."""
        result = await db.execute(select(models.DryerLogs))
        db_logs = result.scalars().all()
        return [schema.DryerLog.from_orm(log) for log in db_logs] if db_logs else None


dryer_crud = DryerCRUD()