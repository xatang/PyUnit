"""Humidity control configuration schemas."""

from pydantic import BaseModel, Field


class HumidityConfigBase(BaseModel):
    """Thresholds and smoothing parameters for humidity driven logic."""
    open_threshold: float = Field(..., ge=0, le=100, description="Relative humidity >= opens servo (percent)")
    close_threshold: float = Field(..., ge=0, le=100, description="Relative humidity <= closes servo (percent)")
    plateau_duration: int = Field(..., ge=0, description="Seconds of stable humidity to consider plateau")
    plateau_window_size: int = Field(..., ge=1, description="Samples window for plateau detection")
    timer_drying_range: float = Field(..., ge=0, le=100, description="Humidity range for switching to timer mode")


class HumidityConfig(HumidityConfigBase):
    """Read model for humidity config."""
    class Config:
        from_attributes = True


class HumidityConfigCreate(HumidityConfigBase):
    """Creation payload for humidity config."""
    open_threshold: float = Field(..., ge=0, le=100)
    close_threshold: float = Field(..., ge=0, le=100)
    plateau_duration: int = Field(..., ge=0)
    plateau_window_size: int = Field(..., ge=1)
    timer_drying_range: float = Field(..., ge=0, le=100)


class HumidityConfigUpdate(HumidityConfigBase):
    """Update payload for humidity config."""
    open_threshold: float = Field(..., ge=0, le=100)
    close_threshold: float = Field(..., ge=0, le=100)
    plateau_duration: int = Field(..., ge=0)
    plateau_window_size: int = Field(..., ge=1)
    timer_drying_range: float = Field(..., ge=0, le=100)

