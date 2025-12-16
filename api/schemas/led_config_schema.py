"""LED subsystem configuration schemas."""

from pydantic import BaseModel, Field


class LedConfigBase(BaseModel):
    """Base attributes for LED brightness control."""
    name: str = Field(..., max_length=100, description="LED device name")
    brightness: int = Field(..., ge=0, le=100, description="Initial brightness percentage (0-100)")


class LedConfig(LedConfigBase):
    """Read model for LED config."""
    class Config:
        from_attributes = True


class LedConfigCreate(LedConfigBase):
    """Creation payload for LED config."""
    name: str = Field(..., max_length=100)
    brightness: int = Field(..., ge=0, le=100)


class LedConfigUpdate(BaseModel):
    """Update payload for LED config."""
    name: str = Field(..., max_length=100)
    brightness: int = Field(..., ge=0, le=100)

