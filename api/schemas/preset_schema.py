"""Preset and preset-dryer association schemas."""

from pydantic import BaseModel, Field
from enum import Enum
from typing import Optional
from api.schemas.dryer_schema import DryerShort


class DryerPresetAssociationBase(BaseModel):
    """Base identifiers linking a preset to a dryer."""
    dryer_id: int
    preset_id: int


class DryerPresetAssociation(DryerPresetAssociationBase):
    """Read model for preset-dryer link."""
    dryer_id: int
    preset_id: int

    class Config:
        from_attributes = True


class DryerPresetAssociationCreate(DryerPresetAssociation):
    """Creation payload for preset-dryer link."""
    dryer_id: int = Field(...)
    preset_id: int = Field(...)


class DryerPresetAssociationDelete(DryerPresetAssociation):
    """Deletion payload for preset-dryer link."""
    dryer_id: int = Field(...)
    preset_id: int = Field(...)


class PresetStorageType(str, Enum):
    """Indicates which storage maintenance mode applies post-dry."""
    NONE = "none"
    TEMPERATURE = "temperature"
    HUMIDITY = "humidity"

    def __str__(self):  # pragma: no cover - trivial
        return self.value


class PresetBase(BaseModel):
    """Common preset parameters controlling temperature & humidity targets."""
    name: str = Field(..., max_length=50, description="Preset name")
    temperature: int = Field(..., ge=0, description="Target temperature (°C)")
    max_temperature_delta: int = Field(..., ge=0, description="Allowed deviation before action")
    humidity: int = Field(..., ge=0, le=100, description="Target relative humidity (%)")
    dry_time: int = Field(..., ge=0, description="Drying duration seconds (timer mode)")
    storage_temperature: int = Field(..., ge=0, description="Maintenance temperature after drying")
    humidity_storage_dry_time: int = Field(..., ge=0, description="Max drying time in humidity storage mode")
    humidity_storage_range: int = Field(..., ge=0, description="Allowed humidity drift in storage mode")
    storage_type: PresetStorageType = Field(default=PresetStorageType.NONE, description="Storage mode strategy")
    dryers: Optional[list[DryerShort]] = Field(default=[], description="Dryers linked to this preset")


class Preset(PresetBase):
    """Full preset read model."""
    id: int

    class Config:
        from_attributes = True


class PresetShort(BaseModel):
    """Abbreviated preset representation (id + name)."""
    id: int
    name: str = Field(..., max_length=50)

    class Config:
        from_attributes = True


class PresetCreate(BaseModel):
    """Creation payload for a preset."""
    name: str = Field(..., max_length=50)
    temperature: int = Field(..., ge=0)
    max_temperature_delta: int = Field(..., ge=0)
    humidity: int = Field(..., ge=0, le=100)
    dry_time: int = Field(..., ge=0)
    storage_temperature: int = Field(..., ge=0)
    humidity_storage_dry_time: int = Field(..., ge=0)
    humidity_storage_range: int = Field(..., ge=0)
    storage_type: PresetStorageType = Field(default=PresetStorageType.NONE)


class PresetUpdate(BaseModel):
    """Update payload for a preset."""
    name: str = Field(..., max_length=50)
    temperature: int = Field(..., ge=0)
    max_temperature_delta: int = Field(..., ge=0)
    humidity: int = Field(..., ge=0, le=100)
    dry_time: int = Field(..., ge=0)
    storage_temperature: int = Field(..., ge=0)
    humidity_storage_dry_time: int = Field(..., ge=0)
    humidity_storage_range: int = Field(..., ge=0)
    storage_type: PresetStorageType = Field(default=PresetStorageType.NONE)
