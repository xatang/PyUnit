"""Servo subsystem configuration schemas."""

from pydantic import BaseModel, Field


class ServoConfigBase(BaseModel):
    """Base attributes for servo movement limits and timing."""
    name: str = Field(..., max_length=50, description="Servo device name")
    close_angle: int = Field(..., ge=0, le=180, description="Angle representing fully closed state")
    open_angle: int = Field(..., ge=0, le=180, description="Angle representing fully open state")
    soft_step: int = Field(..., ge=1, description="Incremental step for smooth movement")
    soft_sleep: float = Field(..., ge=0.0, description="Delay between soft steps (seconds)")
    min_interval: int = Field(..., ge=1, description="Minimum seconds between servo actuation")


class ServoConfig(ServoConfigBase):
    """Read model for servo config."""
    class Config:
        from_attributes = True


class ServoConfigCreate(ServoConfigBase):
    """Creation payload for servo config."""
    name: str = Field(..., max_length=100)
    close_angle: int = Field(..., ge=0, le=180)
    open_angle: int = Field(..., ge=0, le=180)
    soft_step: int = Field(..., ge=1)
    soft_sleep: float = Field(..., ge=0.0)
    min_interval: int = Field(..., ge=1)


class ServoConfigUpdate(BaseModel):
    """Update payload for servo config."""
    name: str = Field(..., max_length=100)
    close_angle: int = Field(..., ge=0, le=180)
    open_angle: int = Field(..., ge=0, le=180)
    soft_step: int = Field(..., ge=1)
    soft_sleep: float = Field(..., ge=0.0)
    min_interval: int = Field(..., ge=1)