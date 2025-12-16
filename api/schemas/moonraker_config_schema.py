"""Moonraker connectivity configuration schemas."""

from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class MoonrakerMethod(str, Enum):
    """Protocol method options for Moonraker API communication."""
    HTTP = "http"
    HTTPS = "https"

    def __str__(self):  # pragma: no cover - trivial
        return self.value


class MoonrakerConfigBase(BaseModel):
    """Base parameters required to talk to a Moonraker instance."""
    moonraker_api_method: MoonrakerMethod = Field(default=MoonrakerMethod.HTTP, description="Protocol scheme")
    moonraker_ip: str = Field(default="127.0.0.1", max_length=50, description="Moonraker host/IP")
    moonraker_port: int = Field(default=7125, ge=1, le=65535, description="Moonraker port")
    moonraker_api_key: Optional[str] = Field(None, max_length=100, description="Optional API key for auth")


class MoonrakerConfig(MoonrakerConfigBase):
    """Read model for Moonraker config."""
    class Config:
        from_attributes = True


class MoonrakerConfigCreate(MoonrakerConfigBase):
    """Creation payload for Moonraker config."""
    moonraker_api_method: MoonrakerMethod = Field(default=MoonrakerMethod.HTTP)
    moonraker_ip: str = Field(..., max_length=50)
    moonraker_port: int = Field(..., ge=1, le=65535)
    moonraker_api_key: Optional[str] = Field(None, max_length=100)


class MoonrakerConfigUpdate(MoonrakerConfigBase):
    """Update payload for Moonraker config."""
    moonraker_api_method: MoonrakerMethod = Field(default=MoonrakerMethod.HTTP)
    moonraker_ip: str = Field(..., max_length=50)
    moonraker_port: int = Field(..., ge=1, le=65535)
    moonraker_api_key: Optional[str] = Field(None, max_length=100)