"""Heater subsystem configuration schemas."""

from pydantic import BaseModel, Field


class HeaterConfigBase(BaseModel):
    """Base attributes for heater control (heater + fan logical names)."""
    name: str = Field(..., max_length=100, description="Heater device name as recognized by backend")
    fan_name: str = Field(..., max_length=100, description="Associated fan device name")


class HeaterConfig(HeaterConfigBase):
    """Read model for heater config."""
    class Config:
        from_attributes = True


class HeaterConfigCreate(HeaterConfigBase):
    """Creation payload for heater config."""
    name: str = Field(..., max_length=100)
    fan_name: str = Field(..., max_length=100)


class HeaterConfigUpdate(BaseModel):
    """Update payload for heater config (all fields required)."""
    name: str = Field(..., max_length=100)
    fan_name: str = Field(..., max_length=100)
