"""Runtime control primitives for dryer hardware abstraction.

This module contains lightweight controller objects that wrap Moonraker API
interactions for the physical subsystems (servo, LED, heater, sensors) plus
PID helpers and the orchestrating `Dryer_control` class that coordinates
status evaluation, actuator decisions, and logging.

Design principles:
* Fire-and-forget soft servo movement to avoid blocking the main update loop.
* Idempotent update_status() methods – safe to call frequently with or without
    externally batched Moonraker query data.
* Separation of concerns: each subsystem controller is responsible only for
    its own API calls and state derivation; orchestration logic lives in
    `Dryer_control`.
"""

from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional, cast
from api.schemas import dryer_schema
from api.schemas import preset_schema
from api.logger import get_logger
from api.tools.moonraker_api import Moonraker_api
import asyncio
from api.database import get_db
from api.cruds.dryer_crud import dryer_crud
from simple_pid import PID
from collections import deque
import statistics
from datetime import datetime
import json
from api.cruds.preset_crud import preset_crud


logger = get_logger("dryer")

class Servo_control(object):
    """Servo control with fire-and-forget soft movement.

    Key Concepts:
    - desired_is_open: logical target (never None after first open/close)
    - physical_is_open: inferred from actual pulse width (may be None mid-travel)
    - _soft_task: background task performing stepped motion
    - DB should log desired_is_open to avoid None constraint violations
    """

    def __init__(self, moonraker_api: Moonraker_api, servo: dryer_schema.ServoConfig):
        self.servo = servo
        self.moonraker_api = moonraker_api
        self.close_pulse_width: Optional[float] = None
        self.open_pulse_width: Optional[float] = None
        self.current_pulse_width: Optional[float] = None
        self.desired_is_open: Optional[bool] = None
        self.physical_is_open: Optional[bool] = None
        self._soft_task: Optional[asyncio.Task] = None
        self._last_commanded_angle: Optional[int] = None
        # Defaults (overridden by servo config optional fields if present and >0)
        self.external_data: Optional[dict] = None
        logger.debug("Servo_control created name=%s", self.servo.name)

    async def _ensure_initialized(self):
        if self.close_pulse_width is None or self.open_pulse_width is None or self.current_pulse_width is None:
            logger.debug("Servo initializing pulse widths name=%s", self.servo.name)
            await self._get_close_and_open_pulse_width()
            # Force to closed baseline fast to align logical + physical
            await self.close(fast=True)

    async def close(self, fast: bool = False):
        await self._ensure_initialized()
        if self.desired_is_open == False and self.physical_is_open == False:
            return
        self.desired_is_open = False
        if fast:
            await self._set_angle(self.servo.close_angle)
        else:
            await self._soft_set_angle(self.servo.close_angle)

    async def open(self, fast: bool = False):
        await self._ensure_initialized()
        if self.desired_is_open == True and self.physical_is_open == True:
            return
        self.desired_is_open = True
        if fast:
            await self._set_angle(self.servo.open_angle)
        else:
            await self._soft_set_angle(self.servo.open_angle)

    async def update_status(self, external_data: dict = None):
        await self._ensure_initialized()
        self.external_data = external_data
        self.current_pulse_width = await self._get_status()

    async def _get_close_and_open_pulse_width(self):
        await self._set_angle(self.servo.open_angle)
        self.open_pulse_width = await self._get_status()
        await self._set_angle(self.servo.close_angle)
        self.close_pulse_width = await self._get_status()
        self.current_pulse_width = self.close_pulse_width
        logger.debug("Servo pulse calibration done name=%s open=%s close=%s", self.servo.name, self.open_pulse_width, self.close_pulse_width)

    async def _get_status(self):
        if self.external_data is None:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.servo.name}"
            result = await self.moonraker_api.call_api(url)
        else:
            result = self.external_data
            self.external_data = None
        return result['data']['result']['status'][self.servo.name]['value']

    async def _set_angle(self, angle: int):
        servo_name = " ".join(self.servo.name.split(" ")[1:])
        gcode = f"SET_SERVO SERVO={servo_name} ANGLE={angle}"
        result = await self.moonraker_api.send_gcode(gcode=gcode)
        if result['success']:
            self.current_pulse_width = await self._get_status()
            if self.current_pulse_width == self.open_pulse_width:
                self.physical_is_open = True
            elif self.current_pulse_width == self.close_pulse_width:
                self.physical_is_open = False
            else:
                self.physical_is_open = None
            self._last_commanded_angle = angle
            logger.debug(
                "Servo angle set name=%s angle=%s pulse=%s phys_is_open=%s desired_is_open=%s",
                self.servo.name, angle, self.current_pulse_width, self.physical_is_open, self.desired_is_open
            )
        else:
            logger.error("Servo angle set FAILED name=%s angle=%s response=%s", self.servo.name, angle, result)
            return result['success']

    async def _soft_set_angle(self, target_angle: int):
        """Fire-and-forget smooth move to target_angle.

        - Cancels previous soft task.
        - Leaves desired_is_open as previously set by open()/close().
        - physical_is_open updates only when pulse equals endpoints.
        - Guarantees final _set_angle(target_angle) call.
        """
        if self._soft_task and not self._soft_task.done():
            self._soft_task.cancel()
            logger.debug("Servo soft move canceled previous task name=%s new_target=%s", self.servo.name, target_angle)

        # Derive start angle
        if self.current_pulse_width == self.open_pulse_width:
            start_angle = self.servo.open_angle
        elif self.current_pulse_width == self.close_pulse_width:
            start_angle = self.servo.close_angle
        elif self._last_commanded_angle is not None:
            start_angle = self._last_commanded_angle
        else:
            # Choose nearest extreme
            if abs(target_angle - self.servo.open_angle) < abs(target_angle - self.servo.close_angle):
                start_angle = self.servo.open_angle
            else:
                start_angle = self.servo.close_angle

        step = self.servo.soft_step
        sleep = self.servo.soft_sleep
        logger.debug(
            "Servo soft move scheduled name=%s from=%s to=%s step=%s sleep=%.2f desired_is_open=%s",
            self.servo.name, start_angle, target_angle, step, sleep, self.desired_is_open
        )

        async def _worker():
            angle = start_angle
            try:
                if target_angle > angle:
                    while angle < target_angle:
                        angle += step
                        if angle > target_angle:
                            angle = target_angle
                        await self._set_angle(angle)
                        if angle == target_angle:
                            break
                        await asyncio.sleep(sleep)
                elif target_angle < angle:
                    while angle > target_angle:
                        angle -= step
                        if angle < target_angle:
                            angle = target_angle
                        await self._set_angle(angle)
                        if angle == target_angle:
                            break
                        await asyncio.sleep(sleep)
                # Final ensure
                await self._set_angle(target_angle)
                logger.info(
                    "Servo soft move complete name=%s final_angle=%s desired_is_open=%s physical_is_open=%s",
                    self.servo.name, angle, self.desired_is_open, self.physical_is_open
                )
            except asyncio.CancelledError:
                logger.debug("Servo soft move worker canceled name=%s", self.servo.name)
                raise
            except Exception as e:
                logger.error("Servo soft move worker error name=%s target=%s error=%s", self.servo.name, target_angle, e)

        self._soft_task = asyncio.create_task(_worker())
        def _done(task: asyncio.Task):
            if task.cancelled():
                return
            exc = task.exception()
            if exc:
                logger.error("Servo soft move task exception name=%s error=%s", self.servo.name, exc)
        self._soft_task.add_done_callback(_done)

class Led_pixel_control(object):
    """Represents a single addressable LED pixel with convenience color setter."""

    def __init__(self, led_name: str, index: int, red: int, green: int, blue: int, moonraker_api: Moonraker_api):
        self.index = index + 1
        self.red = red
        self.green = green
        self.blue = blue
        self.led_name = " ".join(led_name.split(" ")[1:])
        self.moonraker_api = moonraker_api

    async def set_color(self, red: int, green: int, blue: int):
        self.red = red
        self.green = green
        self.blue = blue
        await self.moonraker_api.send_gcode(f"SET_LED LED={self.led_name} INDEX={self.index} RED={red} GREEN={green} BLUE={blue}")

class Led_control(object):
    """Manages an LED strip (group of pixels) including brightness scaling."""

    def __init__(self, moonraker_api: Moonraker_api, led: dryer_schema.LedConfig):
        self.led = led
        self.moonraker_api = moonraker_api
        self.pixels: list[Led_pixel_control] = []
        self.default_color: list = [0.01, 0.01, 0.01]
        self.off_color: list = [0, 0, 0]
        self.external_data: dict = None
        logger.debug("Led_control created name=%s", self.led.name)

    async def _ensure_initialized(self):
        if len(self.pixels) == 0:
            self.pixels = await self._get_pixels()
            for pixel in self.pixels:
                await pixel.set_color(*self.default_color)

    async def update_status(self, external_data: dict = None):
        await self._ensure_initialized()
        self.external_data = external_data
        self.pixels = await self._get_pixels()

    async def set_pixel_color(self, index: int, red: int, green: int, blue: int):
        await self._ensure_initialized()
        index = index + 1
        brightness = self.led.brightness / 100
        red = red * brightness
        green = green * brightness
        blue = blue * brightness
        for pixel in self.pixels:
            if pixel.index == index:
                if pixel.red != red or pixel.green != green or pixel.blue != blue:
                    await pixel.set_color(red=red, green=green, blue=blue)
                break

    async def _get_pixels(self):
        result = await self._get_status()
        pixels = []
        for i in range(len(result)):
            red = result[i][0]
            green = result[i][1]
            blue = result[i][2]
            pixels.append(Led_pixel_control(self.led.name, i, red, green, blue, self.moonraker_api))
        return pixels

    async def _get_status(self):
        if self.external_data == None:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.led.name}"
            result = await self.moonraker_api.call_api(url)
        else:
            result = self.external_data
            self.external_data = None
        return result['data']['result']['status'][self.led.name]['color_data']

class Heater_fan_control(object):
    """Encapsulates heater fan speed / run-state queries."""

    def __init__(self, moonraker_api: Moonraker_api, fan: dryer_schema.HeaterConfig):
        self.fan = fan
        self.moonraker_api = moonraker_api
        self.speed: float = None
        self.is_run: bool = None
        self.external_data: dict = None
        logger.debug("Heater_fan_control created name=%s", self.fan.fan_name)

    async def update_status(self, external_data: dict = None):
        await self._ensure_initialized()
        self.external_data = external_data
        self.speed = await self._get_status()
        self.is_run = await self._is_run_status(self.speed)

    async def _ensure_initialized(self):
        if self.speed == None:
            self.speed = await self._get_status()
            self.is_run = await self._is_run_status(self.speed)

    async def _is_run_status(self, speed: float):
        if speed > 0:
            return True
        else:
            return False
        
    async def _get_status(self):
        if self.external_data == None:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.fan.fan_name}"
            result = await self.moonraker_api.call_api(url)
        else:
            result = self.external_data
            self.external_data = None
        return result['data']['result']['status'][self.fan.fan_name]['speed']     

class Heater_control(object):
    """Provides heater temperature / power state management and setpoint changes."""

    def __init__(self, moonraker_api: Moonraker_api, heater: dryer_schema.HeaterConfig):
        self.heater = heater
        self.moonraker_api = moonraker_api
        self.max_temperature: float = None
        self.temperature: float = 0
        self.power: float = 0
        self.target: float = 0
        self.is_on: bool = None
        self.fan = Heater_fan_control(self.moonraker_api, self.heater)
        self.external_data: dict = None
        logger.debug("Heater_control created name=%s", self.heater.name)


    async def update_status(self, external_data: dict = None):
        await self._ensure_initialized()
        self.external_data = external_data
        await self.fan.update_status(self.external_data)
        result = await self._get_status()
        self.temperature = round(result['temperature'], 2)
        self.target = result['target']
        self.power = round(result['power'], 2)
        self.is_on = await self._is_on_status(result['power'])

    async def set(self, target: float):
        await self._ensure_initialized()
        heater_name = " ".join(self.heater.name.split(" ")[1:])
        if target <= self.max_temperature and self.target != target:
            gcode = f"SET_HEATER_TEMPERATURE HEATER={heater_name} TARGET={target}"
            await self.moonraker_api.send_gcode(gcode=gcode)

    async def _ensure_initialized(self):
        if self.temperature == None or self.target == None:
            result = await self._get_status()
            self.temperature = result['temperature']
            self.target = result['target']
            self.is_on = await self._is_on_status(result['power'])
        if self.max_temperature == None:
            self.max_temperature = await self._get_max_temp()

    async def _is_on_status(self, power: float):
        if power > 0:
            return True
        else:
            return False

    async def _get_status(self):
        if self.external_data == None:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.heater.name}"
            result = await self.moonraker_api.call_api(url)
        else:
            result = self.external_data
            self.external_data = None
        return result['data']['result']['status'][self.heater.name]

    async def _get_max_temp(self):
        url = f"{self.moonraker_api.url}/printer/objects/query?configfile"
        result = await self.moonraker_api.call_api(url)
        return result['data']['result']['status']['configfile']['settings'][self.heater.name]['max_temp']

class Temperature_and_humidity_control(object):
    """Tracks temperature & humidity metrics, computing derived statistics.

    Maintains rolling deques plus real-time median filters used for plateau
    detection and control decisions.
    """

    def __init__(self, moonraker_api: Moonraker_api, sensor: dryer_schema.TemperatureConfig, plateau_duration: int):
        self.sensor = sensor
        self.moonraker_api = moonraker_api
        self.temperature = None
        self.relative_humidity = None
        self.absolute_humidity = None
        self.median_relative_humidity_filter = self.RealTimeMedianFilter(5)
        self.median_relative_humidity = None
        self.median_absolute_humidity_filter = self.RealTimeMedianFilter(5)
        self.median_absolute_humidity = None
        self.relative_humidity_values: deque = deque(
            maxlen=plateau_duration)
        self.absolute_humidity_values: deque = deque(
            maxlen=plateau_duration)
        self.external_data: dict = None
        logger.debug("TempHum_control created sensor=%s", self.sensor.sensor_name)

    async def _ensure_initialized(self):
        if self.temperature == None or self.relative_humidity == None or self.absolute_humidity == None or self.median_relative_humidity == None or self.median_absolute_humidity == None:
            result = await self._get_status()
            self.temperature = result['temperature']
            self.relative_humidity = result['humidity']
            self.absolute_humidity = await self._get_absolute_humidity()

    async def update_status(self, external_data: dict = None):
        await self._ensure_initialized()
        self.external_data = external_data
        result = await self._get_status()
        self.temperature = round(result['temperature'], 1)
        self.relative_humidity = round(result['humidity'], 1)
        self.absolute_humidity = await self._get_absolute_humidity()
        self.median_relative_humidity = float(
            self.median_relative_humidity_filter.update(self.relative_humidity))
        self.median_absolute_humidity = float(
            self.median_absolute_humidity_filter.update(self.absolute_humidity))

        self.relative_humidity_values.append(self.median_relative_humidity)
        self.absolute_humidity_values.append(self.median_absolute_humidity)

    async def _get_status(self):
        if self.external_data == None:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.sensor.sensor_name}"
            result = await self.moonraker_api.call_api(url)
        else:
            result = self.external_data
            self.external_data = None
        return result['data']['result']['status'][self.sensor.sensor_name]  

    async def _get_absolute_humidity(self):
        saturation_vapor_pressure = 6.112 * \
            (2.71828 ** ((17.67 * self.temperature) / (self.temperature + 243.5)))
        absolute_humidity = (saturation_vapor_pressure *
                             self.relative_humidity * 2.1674) / (273.15 + self.temperature)
        absolute_humidity_rounded = round(absolute_humidity, 1)
        return absolute_humidity_rounded

    class RealTimeMedianFilter:
        """Simple fixed-size median filter for streaming values."""

        def __init__(self, window_size):
            self.window_size = window_size
            self.window = deque(maxlen=window_size)

        def update(self, new_value):
            self.window.append(new_value)
            median_value = statistics.median(self.window)
            return median_value

class Heater_PID(object):
    """Wrapper around PID for heater temperature control with dynamic limits."""

    def __init__(self, max_temperature: float):
        self.pid = PID(1, 0.1, 0.05, setpoint=0)
        self.pid.output_limits = (0, 1)
        self.pid.set_auto_mode(True)
        self.min_temperature = 1
        self.max_temperature = max_temperature

    async def update(self, target_temperature: float, min_temperature: float = None, max_temperature: float = None):
        if min_temperature == None:
            min_temperature = self.min_temperature
        if max_temperature == None or max_temperature > self.max_temperature:
            max_temperature = self.max_temperature

        if target_temperature != self.pid.setpoint:
            self.pid.setpoint = target_temperature
        if self.pid.output_limits[0] != min_temperature or self.pid.output_limits[1] != max_temperature:
            self.pid.output_limits = (min_temperature, max_temperature)

    async def get(self, current_temperature: float):
        output = round(self.pid(current_temperature), 2)
        return output

class humidity_PID(object):
    """Computes target heater power indirectly from humidity readings.

    Translates humidity PID output into an equivalent temperature target to
    leverage existing temperature control pathways.
    """

    def __init__(self, target_humidity, min_temperature: float, max_temperature: float):
        self.pid = PID(1, 0.1, 0.05, setpoint=target_humidity)
        self.pid.output_limits = (min_temperature, max_temperature)
        self.pid.set_auto_mode(True)

    async def get(self, curent_humidity: float):
        pid_output = self.pid(curent_humidity)
        min_temperature = self.pid.output_limits[0]
        max_temperature = self.pid.output_limits[1]
        target_temperature = (max_temperature - min_temperature) * (
            (100 - (((pid_output - min_temperature) / (max_temperature - min_temperature)) * 100)) / 100) + min_temperature
        target_temperature_rounded = round(target_temperature, 2)
        return target_temperature_rounded

class Dryer_control(object):
    """Central orchestrator for a single dryer instance.

    Responsibilities:
    * Initialize subsystem controllers
    * Periodically gather batched Moonraker state
    * Apply control algorithms (servo hysteresis, PID loops, storage modes)
    * Persist telemetry logs
    * Manage preset-driven state machine transitions
    """

    def __init__(self, id: int):
        self.id = id
        self.status: dryer_schema.DryerLogStatus = dryer_schema.DryerLogStatus('pending')
        self.current_preset: Optional[preset_schema.Preset] = None
        self.db: Optional[AsyncSession] = None
        self.moonraker_api: Optional[Moonraker_api] = None
        # Fully typed dryer_config; populated in initialize()
        self.dryer_config: Optional[dryer_schema.Dryer] = None
        self.servo: Optional[Servo_control] = None
        self.led: Optional[Led_control] = None
        self.heater: Optional[Heater_control] = None
        self.heater_pid: Optional[Heater_PID] = None
        self.humidity_pid: Optional[humidity_PID] = None
        self.time_drying_start: Optional[datetime] = None
        self.time_left_drying: Optional[int] = None
        self.temperature_and_humidity: Optional[Temperature_and_humidity_control] = None
        # Servo control hysteresis helpers
        self._servo_last_action: Optional[datetime] = None
        logger.info("Dryer instance created id=%s status=%s", self.id, self.status)

    async def initialize(self):
        logger.info("Dryer initialize start id=%s", self.id)
        self.db = get_db()
        async for session in self.db:
            self.moonraker_api = Moonraker_api(session)
            await self.moonraker_api.initialize()
            # Cast to concrete Dryer schema to help static analysis (pylance/pylint)
            self.dryer_config = cast(dryer_schema.Dryer, await dryer_crud.get_dryer_config(session, self.id))
            # Defensive assertion to narrow Optional types for subsequent attribute access
            assert self.dryer_config and self.dryer_config.config, "Dryer config not loaded"
            self.servo = Servo_control(self.moonraker_api, self.dryer_config.config.servo)
            self.led = Led_control(self.moonraker_api, self.dryer_config.config.led)
            self.heater = Heater_control(self.moonraker_api, self.dryer_config.config.heater)
            self.temperature_and_humidity = Temperature_and_humidity_control(
                self.moonraker_api,
                self.dryer_config.config.temperature,
                self.dryer_config.config.humidity.plateau_duration
            )
            logger.info("Dryer initialize done id=%s servo=%s led=%s heater=%s", self.id, self.servo.servo.name, self.led.led.name, self.heater.heater.name)

    async def update_status(self, fast: bool = True) -> json:
        logger.debug("Dryer update_status start id=%s fast=%s status=%s preset=%s", self.id, fast, self.status, getattr(self.current_preset, 'id', None))
        if fast == True:
            url = f"{self.moonraker_api.url}/printer/objects/query?{self.dryer_config.config.servo.name}&{self.dryer_config.config.led.name}&{self.dryer_config.config.heater.name}&{self.dryer_config.config.heater.fan_name}&{self.dryer_config.config.temperature.sensor_name}&"
            result = await self.moonraker_api.call_api(url)
            await self.servo.update_status(result)
            await self.led.update_status(result)
            await self.heater.update_status(result)
            await self.temperature_and_humidity.update_status(result)
        else:
            await self.servo.update_status()
            await self.led.update_status()
            await self.heater.update_status()
            await self.temperature_and_humidity.update_status()
        
        await self._update_led()
        if self.current_preset != None:
            self.db = get_db()
            async for session in self.db:
                preset_link = await preset_crud.get_preset_link(session, self.current_preset.id, self.id)
                current_preset = await preset_crud.get_preset(session, self.current_preset.id)
                if current_preset == None or preset_link == None:
                    logger.warning("Dryer preset missing id=%s preset=%s -> status pending", self.id, getattr(self.current_preset, 'id', None))
                    await self.set_status(dryer_schema.DryerLogStatus.PENDING)
                else:
                    if self.current_preset != current_preset:
                        if (self.current_preset.storage_type == preset_schema.PresetStorageType.HUMIDITY or self.current_preset.storage_type == preset_schema.PresetStorageType.TEMPERATURE) and current_preset.storage_type == preset_schema.PresetStorageType.NONE:
                            if self.status == dryer_schema.DryerLogStatus.HUMIDITY_STORAGE or self.status == dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE:
                                await self.set_status(dryer_schema.DryerLogStatus.PENDING)
                        if (self.status == dryer_schema.DryerLogStatus.TIMER_DRYING and current_preset.humidity < self.temperature_and_humidity.relative_humidity):
                            await self.set_status(dryer_schema.DryerLogStatus.DRYING, current_preset)
                        self.current_preset = current_preset
                        logger.info("Dryer preset reloaded id=%s preset=%s", self.id, self.current_preset.id)

        await self._apply_actuator_targets()
        self.db = get_db()
        log_data = dryer_schema.DryerLogBase(
            dryer_id = self.id,
            current_preset_id=self.current_preset.id if self.current_preset else None,
            status = self.status,
            timestamp = datetime.utcnow(),
            heater_temperature = self.heater.temperature,
            heater_is_on = self.heater.is_on,
            heater_fan_is_run = self.heater.fan.is_run,
            temperature = self.temperature_and_humidity.temperature,
            servo_is_open = self.servo.desired_is_open,
            absolute_humidity = self.temperature_and_humidity.absolute_humidity,
            relative_humidity = self.temperature_and_humidity.relative_humidity,
            time_left_drying = int(self.time_left_drying) if self.time_left_drying is not None else None
        )
        async for session in self.db:
            result = await dryer_crud.add_log(session, log_data)
            logger.debug(
                "Dryer update_status done id=%s temp=%.2f target=%.2f power=%.2f hum=%.2f relHum=%.2f servoOpen=%s heaterOn=%s fanRun=%s",
                self.id,
                self.heater.temperature,
                self.heater.target,
                self.heater.power,
                self.temperature_and_humidity.absolute_humidity,
                self.temperature_and_humidity.relative_humidity,
                self.servo.desired_is_open,
                self.heater.is_on,
                self.heater.fan.is_run
            )
            return result.json()

    async def set_status(self, status: dryer_schema.DryerLogStatus, preset: preset_schema.Preset = None):
        previous = self.status
        self.status = status
        logger.info("Status change id=%s %s -> %s preset=%s", self.id, previous, self.status, getattr(preset, 'id', None))
        if self.status == dryer_schema.DryerLogStatus.PENDING:
            self.current_preset = None
            self.heater_pid = None
            self.humidity_pid = None
            self.time_left_drying = None
            self.time_drying_start = None
            await self.heater.set(0)
            await self.servo.close()
        elif self.status == dryer_schema.DryerLogStatus.DRYING:
            self.heater_pid = None
            self.humidity_pid = None
            self.time_left_drying = None
            self.time_drying_start = None
            await self.servo.close()
            self.current_preset = preset
        elif self.status == dryer_schema.DryerLogStatus.TIMER_DRYING:
            await self.servo.close()
            self.time_drying_start = datetime.utcnow()
            self.current_preset = preset
        elif self.status == dryer_schema.DryerLogStatus.HUMIDITY_STORAGE:
            await self.servo.close()
            self.current_preset = preset
        elif self.status == dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE:
            await self.servo.close()
            self.current_preset = preset
        logger.debug("Status handlers applied id=%s status=%s current_preset=%s", self.id, self.status, getattr(self.current_preset, 'id', None))

    async def _update_led(self):
        # LED logic is frequent; keep as debug-level summary only.
        current_second = datetime.now().second
        if current_second % 2 == 0:
            leds_is_on = False
        else:
            leds_is_on = True

        #Heater
        if self.heater.is_on == True:
            await self.led.set_pixel_color(0, self.heater.power, 0, 0)
        if self.heater.is_on == False:
            await self.led.set_pixel_color(0, *self.led.default_color)
        #Heater fan
        if self.heater.fan.is_run == True:
            if self.status == dryer_schema.DryerLogStatus.HUMIDITY_STORAGE and leds_is_on == False:
                await self.led.set_pixel_color(1, *self.led.off_color)
            else:
                await self.led.set_pixel_color(1, 0, self.heater.fan.speed, 0)
        if self.heater.fan.is_run == False:
            await self.led.set_pixel_color(1, *self.led.default_color)
        #Humidity
        if self.current_preset != None:
            if (self.status == dryer_schema.DryerLogStatus.TIMER_DRYING or self.status == dryer_schema.DryerLogStatus.HUMIDITY_STORAGE or self.status == dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE) and leds_is_on == False:
                await self.led.set_pixel_color(2, *self.led.off_color)
            else:
                if self.temperature_and_humidity.median_relative_humidity < self.current_preset.humidity:
                    await self.led.set_pixel_color(2, *self.led.default_color)
                else:
                    await self.led.set_pixel_color(2, 0, 0, self.temperature_and_humidity.median_relative_humidity / 100)
        else:
            await self.led.set_pixel_color(2, *self.led.default_color)
        #Temperature
        if self.status == dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE and leds_is_on == False:
            await self.led.set_pixel_color(3, *self.led.off_color)
        else:
            if self.temperature_and_humidity.temperature <= 50:
                await self.led.set_pixel_color(3, *self.led.default_color)
            else:
                await self.led.set_pixel_color(3, (self.heater.temperature/(self.heater.max_temperature/100))/100, 0, 0)
        logger.debug("LED update applied id=%s leds_on=%s heater_on=%s fan=%s servo_open=%s", self.id, leds_is_on, self.heater.is_on, self.heater.fan.is_run, self.servo.desired_is_open)

    async def _apply_actuator_targets(self):
        # Decide and apply control outputs based on status
        logger.debug("Apply actuators start id=%s status=%s", self.id, self.status)
        if self.status == dryer_schema.DryerLogStatus.PENDING:
            if self.heater.is_on == True:
                logger.info("Heater off due to PENDING id=%s", self.id)
                await self.heater.set(0)
        elif self.status == dryer_schema.DryerLogStatus.DRYING:
            max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
            if max_temperature > self.heater.max_temperature:
                max_temperature = self.heater.max_temperature
            if self.heater_pid == None:
                self.heater_pid = Heater_PID(max_temperature)
            await self.heater_pid.update(self.current_preset.temperature, max_temperature=max_temperature)
            await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
            await self._servo_control()
            if self.current_preset.humidity >= self.temperature_and_humidity.median_relative_humidity:
                await self.set_status(dryer_schema.DryerLogStatus.TIMER_DRYING, self.current_preset)
        elif self.status == dryer_schema.DryerLogStatus.TIMER_DRYING:
            target_relative_humidity_max = self.current_preset.humidity + \
                self.dryer_config.config.humidity.timer_drying_range
            target_relative_humidity_min = self.current_preset.humidity - \
                self.dryer_config.config.humidity.timer_drying_range
            if self.temperature_and_humidity.median_relative_humidity > target_relative_humidity_max:
                max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
                if max_temperature > self.heater.max_temperature:
                    max_temperature = self.heater.max_temperature
                await self.heater_pid.update(self.current_preset.temperature, max_temperature=max_temperature)
                await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
                await self._servo_control()
            else:
                if self.humidity_pid == None:
                    max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
                    if max_temperature > self.heater.max_temperature:
                        max_temperature = self.heater.max_temperature
                    self.humidity_pid = humidity_PID(self.current_preset.humidity, 1, max_temperature)
                pid_result = await self.humidity_pid.get(self.temperature_and_humidity.median_relative_humidity)
                if pid_result == 1:
                    max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
                    if max_temperature > self.heater.max_temperature:
                        max_temperature = self.heater.max_temperature
                    await self.heater_pid.update(1, 1, max_temperature)
                    await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
                else:
                    await self.heater.set(pid_result)
                if self.temperature_and_humidity.median_relative_humidity < target_relative_humidity_min:
                    await self.servo.open()
                else:
                    await self.servo.close()
            delta = datetime.utcnow() - self.time_drying_start
            self.time_left_drying = self.current_preset.dry_time * 60 - delta.total_seconds()
            if delta.total_seconds() >= self.current_preset.dry_time * 60:
                if self.current_preset.storage_type == preset_schema.PresetStorageType.HUMIDITY:
                    await self.set_status(dryer_schema.DryerLogStatus.HUMIDITY_STORAGE, self.current_preset)
                    self.time_drying_start = None
                    self.time_left_drying = None
                elif self.current_preset.storage_type == preset_schema.PresetStorageType.TEMPERATURE:
                    await self.set_status(dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE, self.current_preset)
                    self.time_drying_start = None
                    self.time_left_drying = None
                else:
                    await self.set_status(dryer_schema.DryerLogStatus.PENDING)
                    self.time_drying_start = None
                    self.time_left_drying = None
        elif self.status == dryer_schema.DryerLogStatus.HUMIDITY_STORAGE:
            target_relative_humidity_max = self.current_preset.humidity+self.dryer_config.config.humidity.timer_drying_range
            target_relative_humidity_min = self.current_preset.humidity-self.dryer_config.config.humidity.timer_drying_range
            if self.time_drying_start == None and self.temperature_and_humidity.median_relative_humidity < target_relative_humidity_max:
                return
            else:
                if self.temperature_and_humidity.median_relative_humidity > target_relative_humidity_max+0.1:
                    self.time_drying_start = datetime.utcnow()
                    max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
                    if max_temperature > self.heater.max_temperature:
                        max_temperature = self.heater.max_temperature
                    await self.heater_pid.update(self.current_preset.temperature, max_temperature=max_temperature)
                    await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
                    await self._servo_control()
                else:
                    pid_result = await self.humidity_pid.get(self.temperature_and_humidity.median_relative_humidity)
                    if pid_result == 1:
                        max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
                        if max_temperature > self.heater.max_temperature:
                            max_temperature = self.heater.max_temperature
                        await self.heater_pid.update(1, 1, max_temperature)
                        await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
                    else:
                        await self.heater.set(pid_result)
                    if self.temperature_and_humidity.median_relative_humidity < target_relative_humidity_min:
                        await self.servo.open()
                    else:
                        await self.servo.close()
            ##################################
            delta = datetime.utcnow() - self.time_drying_start
            self.time_left_drying = self.current_preset.dry_time * 60 - delta.total_seconds()
            if delta.total_seconds() >= self.current_preset.humidity_storage_dry_time * 60:
                await self.heater.set(target=0)
                self.time_drying_start = None
        elif self.status == dryer_schema.DryerLogStatus.TEMPERATURE_STORAGE:
            max_temperature = self.current_preset.temperature + self.current_preset.max_temperature_delta
            if max_temperature > self.heater.max_temperature:
                max_temperature = self.heater.max_temperature
            await self.heater_pid.update(self.current_preset.temperature, self.current_preset.storage_temperature, max_temperature)
            await self.heater.set(await self.heater_pid.get(self.temperature_and_humidity.temperature))
            if self.temperature_and_humidity.median_relative_humidity > self.current_preset.humidity:
                await self._servo_control()
            elif self.temperature_and_humidity.median_relative_humidity < self.current_preset.humidity:
                await self.servo.open()
            else:
                await self.servo.close()

    def moving_average(self, data):
        return sum(data) / len(data)

    def is_plateau(self, smoothed_values: deque, threshold: int):
        change = max(smoothed_values) - min(smoothed_values)
        logger.debug(f'Open plateau change: {change}')
        return change < threshold

    def is_falling_stopped(self, smoothed_values: deque, threshold: int):
        change = smoothed_values[-1] - smoothed_values[0]
        change = change * -1
        if change <= -0.1:
            return True
        plateau_change = max(smoothed_values) - min(smoothed_values)
        logger.debug(f'Close plateau change: {plateau_change}')
        return change == plateau_change and plateau_change < threshold

    async def _servo_control(self):
        humidity_cfg = self.dryer_config.config.humidity
        humidity_values = self.temperature_and_humidity.relative_humidity_values
        required = humidity_cfg.plateau_duration
        if len(humidity_values) != required:
            return

        window = humidity_cfg.plateau_window_size
        values_list = list(humidity_values)
        smoothed_values = [
            self.moving_average(values_list[i:i + window])
            for i in range(required - window + 1)
        ]

        # Core metrics
        amplitude = max(smoothed_values) - min(smoothed_values)
        net_change = smoothed_values[-1] - smoothed_values[0]
        falling_stopped = self.is_falling_stopped(smoothed_values, humidity_cfg.close_threshold)
        open_plateau = self.is_plateau(smoothed_values, humidity_cfg.open_threshold)

        now = datetime.utcnow()
        if self._servo_last_action and (now - self._servo_last_action).total_seconds() < self.servo.servo.min_interval:
            logger.debug(
                "Servo action suppressed (cooldown) id=%s is_open=%s amp=%.3f net=%.3f openPlateau=%s fallingStopped=%s secsSince=%.1f",
                self.id,
                self.servo.desired_is_open,
                amplitude,
                net_change,
                open_plateau,
                falling_stopped,
                (now - self._servo_last_action).total_seconds()
            )
            return

        # Decision matrix
        perform_open = (self.servo.desired_is_open is False) and open_plateau and not falling_stopped
        perform_close = (self.servo.desired_is_open is True) and (falling_stopped or (open_plateau and falling_stopped))

        # Refined close heuristic: if amplitude extremely low AND trend not decreasing further.
        if perform_close:
            await self.servo.close()
            self._servo_last_action = now
            logger.info(
                "Servo CLOSE id=%s amp=%.3f net=%.3f openPlateau=%s fallingStopped=%s window=%s duration=%s",
                self.id, amplitude, net_change, open_plateau, falling_stopped, window, required
            )
            return

        if perform_open:
            await self.servo.open()
            self._servo_last_action = now
            logger.info(
                "Servo OPEN id=%s amp=%.3f net=%.3f openPlateau=%s fallingStopped=%s window=%s duration=%s",
                self.id, amplitude, net_change, open_plateau, falling_stopped, window, required
            )
            return

        # No action; emit a concise debug for traceability.
        logger.debug(
            "Servo noop id=%s is_open=%s amp=%.3f net=%.3f openPlateau=%s fallingStopped=%s window=%s duration=%s",
            self.id, self.servo.desired_is_open, amplitude, net_change, open_plateau, falling_stopped, window, required
        )

