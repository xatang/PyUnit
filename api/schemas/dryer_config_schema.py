"""Composite dryer configuration schemas.

Each dryer is composed of several subsystem configuration objects (heater, LED,
humidity control, temperature sensor, and servo). These schemas aggregate the
individual subsystem schemas into a single object for creation / update flows.
"""

from pydantic import BaseModel
from .heater_config_schema import HeaterConfig, HeaterConfigCreate, HeaterConfigUpdate
from .led_config_schema import LedConfig, LedConfigCreate, LedConfigUpdate
from .humidity_config_schema import HumidityConfig, HumidityConfigCreate, HumidityConfigUpdate
from .servo_config_schema import ServoConfig, ServoConfigCreate, ServoConfigUpdate
from .temperature_config_schema import TemperatureConfig, TemperatureConfigCreate, TemperatureConfigUpdate


class DryerConfig(BaseModel):
    """Read model grouping the active configuration of all dryer subsystems."""
    heater: HeaterConfig
    led: LedConfig
    humidity: HumidityConfig
    temperature: TemperatureConfig
    servo: ServoConfig


class DryerConfigCreate(DryerConfig):
    """Payload for creating a dryer with required subsystem configuration objects."""
    heater: HeaterConfigCreate
    led: LedConfigCreate
    humidity: HumidityConfigCreate
    temperature: TemperatureConfigCreate
    servo: ServoConfigCreate


class DryerConfigUpdate(DryerConfig):
    """Payload for updating a dryer; all nested configs are replaced atomically."""
    heater: HeaterConfigUpdate
    led: LedConfigUpdate
    humidity: HumidityConfigUpdate
    temperature: TemperatureConfigUpdate
    servo: ServoConfigUpdate
