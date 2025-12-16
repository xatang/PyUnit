"""SQLAlchemy ORM models for the PyUnit application.

Contains entity definitions for dryers, presets, configuration components
(servo, LED, heater, humidity, temperature), Moonraker connection settings, and
telemetry logs. Relationships are explicitly documented and Russian comments
translated to English for consistency.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class DryerPresetAssociation(Base):
    """Association table linking dryers and presets (many-to-many)."""
    __tablename__ = 'dryer_preset_association'

    dryer_id = Column(Integer, ForeignKey('dryers.id'), primary_key=True)
    preset_id = Column(Integer, ForeignKey('presets.id'), primary_key=True)

    dryer = relationship("Dryer", back_populates="preset_associations")
    preset = relationship("Preset", back_populates="dryer_associations")

    def __repr__(self):
        return f"<DryerPresetAssociation(dryer_id={self.dryer_id}, preset_id={self.preset_id})>"


class MoonrakerConfig(Base):
    """Connection details for a single Moonraker instance."""
    __tablename__ = 'moonraker_configs'

    id = Column(Integer, primary_key=True)
    moonraker_api_method = Column(String(10), default="http")
    moonraker_ip = Column(String(50), default="localhost")
    moonraker_port = Column(Integer, default=7125)
    moonraker_api_key = Column(String(100))

    def __repr__(self):
        return f"<MoonrakerConfig(ip='{self.moonraker_ip}', port={self.moonraker_port})>"


class ServoConfig(Base):
    """Servo mechanical configuration (angles, movement tuning)."""
    __tablename__ = 'servo_configs'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    close_angle = Column(Integer)
    open_angle = Column(Integer)
    soft_step = Column(Integer)
    soft_sleep = Column(Float)
    min_interval = Column(Integer)

    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    dryer = relationship("Dryer", back_populates="servo")

    def __repr__(self):
        return f"<ServoConfig(name='{self.name}', close={self.close_angle}, open={self.open_angle})>"


class LedConfig(Base):
    """LED configuration (device name + brightness)."""
    __tablename__ = 'led_configs'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    brightness = Column(Integer)

    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    dryer = relationship("Dryer", back_populates="led")

    def __repr__(self):
        return f"<LedConfig(name='{self.name}', brightness={self.brightness})>"


class HeaterConfig(Base):
    """Heater device and associated fan configuration."""
    __tablename__ = 'heater_configs'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))
    fan_name = Column(String(100))

    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    dryer = relationship("Dryer", back_populates="heater")

    def __repr__(self):
        return f"<HeaterConfig(name='{self.name}', fan_name={self.fan_name})>"


class HumidityConfig(Base):
    """Humidity control thresholds and plateau detection parameters."""
    __tablename__ = 'humidity_configs'

    id = Column(Integer, primary_key=True)
    open_threshold = Column(Float)
    close_threshold = Column(Float)
    plateau_duration = Column(Integer)
    plateau_window_size = Column(Integer)
    timer_drying_range = Column(Float)

    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    dryer = relationship("Dryer", back_populates="humidity")

    def __repr__(self):
        return f"<HumidityConfig(open_threshold={self.open_threshold}, close_threshold={self.close_threshold})>"


class TemperatureConfig(Base):
    """Temperature sensor identification."""
    __tablename__ = 'temperature_configs'

    id = Column(Integer, primary_key=True)
    sensor_name = Column(String(100))

    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    dryer = relationship("Dryer", back_populates="temperature")

    def __repr__(self):
        return f"<TemperatureConfig(sensor='{self.sensor_name}')>"


class Preset(Base):
    """Drying & storage target parameters grouped as a reusable preset."""
    __tablename__ = 'presets'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    temperature = Column(Integer)
    max_temperature_delta = Column(Integer)
    humidity = Column(Integer)
    dry_time = Column(Integer)
    storage_temperature = Column(Integer)
    humidity_storage_dry_time = Column(Integer)
    humidity_storage_range = Column(Integer)
    storage_type = Column(String(15), default="none")

    dryer_associations = relationship("DryerPresetAssociation", back_populates="preset", cascade="all, delete-orphan")

    @property
    def dryers(self):  # pragma: no cover - simple list comprehension
        return [association.dryer for association in self.dryer_associations]

    def __repr__(self):
        return f"<Preset(name='{self.name}', temp={self.temperature}°C)>"


class DryerLogs(Base):
    """Per-interval telemetry snapshot for dryer operations."""
    __tablename__ = 'dryer_logs'

    id = Column(Integer, primary_key=True)
    dryer_id = Column(Integer, ForeignKey('dryers.id'))
    status = Column(String(25), default="pending")
    timestamp = Column(DateTime, default=datetime.utcnow)
    heater_temperature = Column(Float)
    heater_is_on = Column(Boolean, default=False)
    heater_fan_is_run = Column(Boolean, default=False)
    temperature = Column(Float)
    servo_is_open = Column(Boolean, default=False)
    absolute_humidity = Column(Float)
    relative_humidity = Column(Float)
    current_preset_id = Column(Integer, nullable=True)
    time_left_drying = Column(Integer, nullable=True)

    dryer = relationship("Dryer", back_populates="logs")

    def __repr__(self):
        return f"<DryerLogs(dryer_id={self.dryer_id}, time={self.timestamp}, temp={self.temperature}°C)>"


class Dryer(Base):
    """Primary physical dryer unit entity linking all configuration components."""
    __tablename__ = 'dryers'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))

    logs = relationship("DryerLogs", back_populates="dryer", cascade="all, delete-orphan")
    preset_associations = relationship("DryerPresetAssociation", back_populates="dryer", cascade="all, delete-orphan")
    servo = relationship("ServoConfig", uselist=False, back_populates="dryer", cascade="all, delete-orphan")
    led = relationship("LedConfig", uselist=False, back_populates="dryer", cascade="all, delete-orphan")
    heater = relationship("HeaterConfig", uselist=False, back_populates="dryer", cascade="all, delete-orphan")
    humidity = relationship("HumidityConfig", uselist=False, back_populates="dryer", cascade="all, delete-orphan")
    temperature = relationship("TemperatureConfig", uselist=False, back_populates="dryer", cascade="all, delete-orphan")

    @property
    def presets(self):  # pragma: no cover - simple list comprehension
        return [association.preset for association in self.preset_associations]

    def __repr__(self):
        return f"<Dryer(name='{self.name}')>"