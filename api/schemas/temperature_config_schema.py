"""Temperature sensor configuration schemas."""

from pydantic import BaseModel, Field


class TemperatureConfigBase(BaseModel):
    """Base attributes for temperature sensor reference."""
    sensor_name: str = Field(..., max_length=100, description="Temperature sensor device name")


class TemperatureConfig(TemperatureConfigBase):
    """Read model for temperature config."""
    class Config:
        from_attributes = True


class TemperatureConfigCreate(TemperatureConfigBase):
    """Creation payload for temperature config."""
    sensor_name: str = Field(..., max_length=100)


class TemperatureConfigUpdate(BaseModel):
    """Update payload for temperature config."""
    sensor_name: str = Field(..., max_length=100)

