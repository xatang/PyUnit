"""Dryer domain schemas.

Includes dryer CRUD models, composite configuration inclusion, and runtime log
status models used for historical / real-time monitoring.
"""

from pydantic import BaseModel, Field
from typing import Any, Optional
from .dryer_config_schema import DryerConfig, DryerConfigCreate, DryerConfigUpdate
from .heater_config_schema import HeaterConfig
from .humidity_config_schema import HumidityConfig
from .led_config_schema import LedConfig
from .temperature_config_schema import TemperatureConfig
from .servo_config_schema import ServoConfig
from datetime import datetime
from enum import Enum


class DryerBase(BaseModel):
    """Base fields shared by dryer read/create/update models."""
    name: str = Field(..., max_length=50, description="Human-readable dryer name")
    config: Optional[DryerConfig] = Field(None, description="Composite configuration of subsystems")


class Dryer(DryerBase):
    """Full dryer read model (includes id and optional nested config)."""
    id: int

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, obj: Any) -> "Dryer":
        """Custom ORM conversion to embed subsystem configs if present."""
        dryer = super().from_orm(obj)
        if any([obj.heater, obj.humidity, obj.led, obj.temperature, obj.servo]):
            dryer.config = DryerConfig(
                heater=HeaterConfig.from_orm(obj.heater) if obj.heater else None,
                humidity=HumidityConfig.from_orm(obj.humidity) if obj.humidity else None,
                led=LedConfig.from_orm(obj.led) if obj.led else None,
                temperature=TemperatureConfig.from_orm(obj.temperature) if obj.temperature else None,
                servo=ServoConfig.from_orm(obj.servo) if obj.servo else None
            )
        else:
            dryer.config = None
        return dryer


class DryerShort(BaseModel):
    """Abbreviated dryer representation (id + name only)."""
    id: int
    name: str = Field(..., max_length=50, description="Human-readable dryer name")

    class Config:
        from_attributes = True


class DryerCreate(DryerBase):
    """Payload for creating a dryer (requires full composite config)."""
    name: str = Field(..., max_length=50)
    config: DryerConfigCreate


class DryerUpdate(DryerBase):
    """Payload for updating a dryer configuration."""
    name: str = Field(..., max_length=50)
    config: DryerConfigUpdate


class DryerLogStatus(str, Enum):
    """Operational statuses a dryer may report in logs."""
    PENDING = "pending"
    DRYING = "drying"
    TIMER_DRYING = "timer_drying"
    HUMIDITY_STORAGE = 'humidity_storage'
    TEMPERATURE_STORAGE = 'temperature_storage'

    def __str__(self):  # pragma: no cover - simple convenience
        return self.value


class DryerLogBase(BaseModel):
    """Base telemetry event for a dryer at a specific timestamp."""
    dryer_id: int
    current_preset_id: Optional[int] = Field(None, description="Preset active when log emitted")
    timestamp: datetime
    status: DryerLogStatus
    heater_temperature: float
    heater_is_on: bool
    heater_fan_is_run: bool
    temperature: float
    servo_is_open: bool
    absolute_humidity: float
    relative_humidity: float
    time_left_drying: Optional[int] = Field(None, description="Estimated seconds remaining (if applicable)")


class DryerLog(DryerLogBase):
    """Full dryer log record with identifier."""
    id: int

    class Config:
        from_attributes = True