from idryer.moonraker_api import Moonraker_api
from misc.logs import logger

import numpy as np
from collections import deque
from datetime import datetime
from simple_pid import PID
import json
import time
import asyncio


class JsonEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, iDryer):
            return obj.__dict__
        if isinstance(obj, iDryer_temperature_sensor):
            return obj.__dict__
        if isinstance(obj, IDryer_servo_status):
            return obj.__dict__
        if isinstance(obj, iDryer_servo):
            return obj.__dict__
        if isinstance(obj, iDryer_status):
            return obj.__dict__
        if isinstance(obj, iDryer_led):
            return obj.__dict__
        if isinstance(obj, iDryer_led_pixel):
            return obj.__dict__
        if isinstance(obj, iDryer_heater_fan):
            return obj.__dict__
        if isinstance(obj, iDryer_heater):
            return obj.__dict__
        if isinstance(obj, iDryer_preset):
            return obj.__dict__
        return None


class RealTimeMedianFilter:
    def __init__(self, window_size):
        self.window_size = window_size
        self.window = deque(maxlen=window_size)
        logger.info(
            f"Initialized RealTimeMedianFilter with window_size={window_size}")

    def update(self, new_value):
        logger.debug(f"Updating filter with new_value={new_value}")
        self.window.append(new_value)
        median_value = np.median(self.window)
        logger.debug(f"New median value calculated: {median_value}")
        return median_value


class iDryer_heater_fan(object):
    def __init__(self, name: str):
        self.name = name
        self.speed: float = 0
        self.rpm: float = 0
        logger.info(
            f"Initialized iDryer_heater_fan with name='{name}'. Initial speed={self.speed}, initial rpm={self.rpm}")

    async def update(self, speed: float, rpm: float):
        logger.debug(
            f"Updating iDryer_heater_fan '{self.name}'. New speed={speed}, new rpm={rpm}")
        self.speed = speed
        self.rpm = rpm
        logger.debug(
            f"Updated iDryer_heater_fan '{self.name}'. Current speed={self.speed}, current rpm={self.rpm}")


class iDryer_heater(object):
    def __init__(self, name: str, max_temperature: float, fan: iDryer_heater_fan, moonraker_api: Moonraker_api):
        self.name = name
        self.max_temperature: float = max_temperature
        self.temperature: float = 0
        self.target: float = 0
        self.power: float = 0
        self.fan: iDryer_heater_fan = fan
        self.moonraker_api: Moonraker_api = moonraker_api
        logger.info(
            f"Initialized iDryer_heater '{self.name}'. Max temperature={self.max_temperature}, initial temperature={self.temperature}, initial target={self.target}, initial power={self.power}")

    async def update(self, temperature: float, target: float, power: float):
        logger.debug(
            f"Updating iDryer_heater '{self.name}'. New temperature={temperature}, new target={target}, new power={power}")
        self.temperature = temperature
        self.target = target
        self.power = power
        logger.debug(
            f"Updated iDryer_heater '{self.name}'. Current temperature={self.temperature}, current target={self.target}, current power={self.power}")

    async def set(self, target: float, force: bool = False):
        heater_name = self.name.split(" ")[1]
        logger.debug(
            f"Attempting to set target temperature for iDryer_heater '{self.name}'. Requested target={target}, force={force}")

        if target <= self.max_temperature and self.target != target:
            gcode = f"SET_HEATER_TEMPERATURE HEATER={heater_name} TARGET={target}"
            logger.debug(f"Sending G-code: {gcode}")
            status = await self.moonraker_api.send_gcode(gcode=gcode)
            if status != True:
                logger.error(
                    f"Failed to set heater temperature for '{self.name}'")
            else:
                logger.debug(
                    f"Successfully set target temperature for '{self.name}' to {target}")
        elif force == True:
            gcode = f"SET_HEATER_TEMPERATURE HEATER={heater_name} TARGET={target}"
            logger.debug(f"Sending G-code (forced): {gcode}")
            status = await self.moonraker_api.send_gcode(gcode=gcode)
            if status != True:
                logger.error(
                    f"Failed to force-set heater temperature for '{self.name}'")
            else:
                logger.info(
                    f"Successfully force-set target temperature for '{self.name}' to {target}")


class iDryer_temperature_sensor(object):
    def __init__(self, name: str, humidity_plateau_duration: int):
        self.name = name
        self.temperature: float = 0
        self.relative_humidity: float = 0
        self.absolute_humidity: float = self.get_absolute_humidity()
        self.median_relative_humidity_filter = RealTimeMedianFilter(5)
        self.median_relative_humidity = 0
        self.median_absolute_humidity_filter = RealTimeMedianFilter(5)
        self.median_absolute_humidity = 0
        self.relative_humidity_values: deque = deque(
            maxlen=humidity_plateau_duration)
        self.absolute_humidity_values: deque = deque(
            maxlen=humidity_plateau_duration)
        logger.info(
            f"Initialized iDryer_temperature_sensor '{self.name}'. Humidity plateau duration={humidity_plateau_duration}")

    def get_absolute_humidity(self, temperature: float = None, relative_humidity: float = None):
        if temperature == None:
            temperature = self.temperature
        if relative_humidity == None:
            relative_humidity = self.relative_humidity
        saturation_vapor_pressure = 6.112 * \
            (2.71828 ** ((17.67 * temperature) / (temperature + 243.5)))
        absolute_humidity = (saturation_vapor_pressure *
                             relative_humidity * 2.1674) / (273.15 + temperature)
        absolute_humidity_rounded = round(absolute_humidity, 1)
        logger.debug(
            f"Calculated absolute humidity for '{self.name}'. Temperature={temperature}, relative_humidity={relative_humidity}, absolute_humidity={absolute_humidity_rounded}")
        return absolute_humidity_rounded

    async def update(self, temperature: float, relative_humidity: float):
        logger.debug(
            f"Updating iDryer_temperature_sensor '{self.name}'. New temperature={temperature}, new relative_humidity={relative_humidity}")

        self.temperature: float = round(temperature, 1)
        self.relative_humidity: float = round(relative_humidity, 1)
        self.absolute_humidity: float = self.get_absolute_humidity()

        self.median_relative_humidity = float(
            self.median_relative_humidity_filter.update(self.relative_humidity))
        self.median_absolute_humidity = float(
            self.median_absolute_humidity_filter.update(self.absolute_humidity))

        self.relative_humidity_values.append(self.median_relative_humidity)
        self.absolute_humidity_values.append(self.median_absolute_humidity)

        logger.debug(f"Updated iDryer_temperature_sensor '{self.name}'. Current temperature={self.temperature}, current relative_humidity={self.relative_humidity}, current absolute_humidity={self.absolute_humidity}, median_relative_humidity={self.median_relative_humidity}, median_absolute_humidity={self.median_absolute_humidity}")


class IDryer_servo_status(object):
    def __init__(self, status: int):
        self.status = status
        self.servo_state_change_timeout = 5
        self.last_state_change_time = time.time()
        logger.info(
            f"Initialized IDryer_servo_status with status={self.status} ({str(self)})")

    def __str__(self):
        if self.status == 0:
            return 'Close'
        elif self.status == 1:
            return 'Open'
        else:
            return 'N\\A'

    def __eq__(self, other):
        if isinstance(other, IDryer_servo_status):
            return self.status == other.status
        return self.status == other

    def __lt__(self, other):
        if isinstance(other, IDryer_servo_status):
            return self.status < other.status
        return self.status < other

    def __le__(self, other):
        if isinstance(other, IDryer_servo_status):
            return self.status <= other.status
        return self.status <= other

    def __gt__(self, other):
        if isinstance(other, IDryer_servo_status):
            return self.status > other.status
        return self.status > other

    def __ge__(self, other):
        if isinstance(other, IDryer_servo_status):
            return self.status >= other.status
        return self.status >= other

    async def timeout_check(self):
        delta = time.time() - self.last_state_change_time
        if delta > self.servo_state_change_timeout:
            logger.debug(
                f"Timeout check for IDryer_servo_status: timeout reached (delta={delta})")
            return True
        else:
            logger.debug(
                f"Timeout check for IDryer_servo_status: no timeout (delta={delta})")
            return False

    async def update(self, new_status: int):
        logger.debug(
            f"Updating IDryer_servo_status. New status={new_status} ({self.__str__()})")
        self.status = new_status
        self.last_state_change_time = time.time()
        logger.info(
            f"Updated IDryer_servo_status. Current status={self.status} ({self.__str__()})")


class iDryer_servo(object):
    def __init__(self, name: str, close_angle: float, open_angle: float, moonraker_api: Moonraker_api):
        self.name = name
        self.close_angle: float = close_angle
        self.open_angle: float = open_angle
        self.status: IDryer_servo_status = IDryer_servo_status(status=None)
        self.moonraker_api: Moonraker_api = moonraker_api
        self.current_angle: float = None
        self.target_angle: float = self.close_angle
        logger.info(
            f"Initialized iDryer_servo '{self.name}'. Close angle={self.close_angle}, open angle={self.open_angle}")

    async def close(self, ignore_timeout: bool = False):
        logger.debug(
            f"Attempting to close servo '{self.name}'. Ignore timeout={ignore_timeout}")
        if ignore_timeout == False:
            if await self.status.timeout_check() == False:
                logger.debug(
                    f"Servo '{self.name}' close operation skipped due to timeout check")
                return
        if self.status == 0:
            logger.debug(f"Servo '{self.name}' is already closed")
            return
        await self.status.update(0)
        self.target_angle = self.close_angle
        logger.info(
            f"Servo '{self.name}' closed. Target angle set to {self.target_angle}")

    async def open(self, ignore_timeout: bool = False):
        logger.debug(
            f"Attempting to open servo '{self.name}'. Ignore timeout={ignore_timeout}")
        if ignore_timeout == False:
            if await self.status.timeout_check() == False:
                logger.debug(
                    f"Servo '{self.name}' open operation skipped due to timeout check")
                return
        if self.status == 1:
            logger.debug(f"Servo '{self.name}' is already open")
            return
        await self.status.update(1)
        self.target_angle = self.open_angle
        logger.info(
            f"Servo '{self.name}' opened. Target angle set to {self.target_angle}")

    async def soft_set(self):
        step = 3
        sleep = 0.3
        if self.current_angle == None:
            logger.debug(
                f"Current angle for servo '{self.name}' is None. Setting to close angle {self.close_angle}")
            await self.set(self.close_angle)
            await self.status.update(0)
        while True:
            if self.target_angle > self.current_angle:
                while self.current_angle < self.target_angle:
                    logger.debug(
                        f"Soft-setting servo '{self.name}'. Increasing angle from {self.current_angle} to {self.current_angle + step}")
                    await self.set(self.current_angle + step)
                    await asyncio.sleep(sleep)
                delta = self.current_angle - self.target_angle
            else:
                while self.current_angle > self.target_angle:
                    logger.debug(
                        f"Soft-setting servo '{self.name}'. Decreasing angle from {self.current_angle} to {self.current_angle - step}")
                    await self.set(self.current_angle - step)
                    await asyncio.sleep(sleep)
                delta = self.target_angle - self.current_angle
            if delta <= step and delta != 0:
                logger.debug(
                    f"Final adjustment for servo '{self.name}'. Setting angle to {self.target_angle}")
                await self.set(self.target_angle)
            await asyncio.sleep(sleep)

    async def set(self, angle: int):
        servo_name = self.name.split(" ")[1]
        gcode = f"SET_SERVO SERVO={servo_name} ANGLE={angle}"
        logger.debug(f"Sending G-code to servo '{self.name}': {gcode}")
        status = await self.moonraker_api.send_gcode(gcode=gcode)
        if status == True:
            self.current_angle = angle
            logger.debug(
                f"Successfully set servo '{self.name}' angle to {angle}")
            return True
        else:
            logger.error(f"Failed to set servo '{self.name}' angle to {angle}")
            return False


class iDryer_led_pixel(object):
    def __init__(self, led_name: str, index: int, red: int, green: int, blue: int, moonraker_api: Moonraker_api):
        self.index = index
        self.red = red
        self.green = green
        self.blue = blue
        self.moonraker_api = moonraker_api
        self.led_name = led_name
        logger.info(
            f"Initialized iDryer_led_pixel '{self.led_name}' at index {self.index}. Initial RGB: ({self.red}, {self.green}, {self.blue})")

    async def update(self, red: int, green: int, blue: int):
        logger.debug(
            f"Updating iDryer_led_pixel '{self.led_name}' at index {self.index}. New RGB: ({red}, {green}, {blue})")
        self.red = red
        self.green = green
        self.blue = blue
        logger.debug(
            f"Updated iDryer_led_pixel '{self.led_name}' at index {self.index}. Current RGB: ({self.red}, {self.green}, {self.blue})")

    async def set(self, red: int, green: int, blue: int):
        logger.debug(
            f"Setting iDryer_led_pixel '{self.led_name}' at index {self.index}. New RGB: ({red}, {green}, {blue})")
        self.red = red
        self.green = green
        self.blue = blue
        gcode = f"SET_LED LED={self.led_name} INDEX={self.index} RED={red} GREEN={green} BLUE={blue}"
        logger.debug(f"Sending G-code: {gcode}")
        status = await self.moonraker_api.send_gcode(gcode=gcode)
        if status != True:
            logger.error(
                f"Failed to update LED pixel '{self.led_name}' at index {self.index}")
        else:
            logger.debug(
                f"Successfully updated LED pixel '{self.led_name}' at index {self.index}")

    async def get_rgb(self):
        rgb = [self.red, self.green, self.blue]
        logger.debug(
            f"Retrieved RGB values for iDryer_led_pixel '{self.led_name}' at index {self.index}: {rgb}")
        return rgb


class iDryer_led(object):
    def __init__(self, name: str, brightness: int, moonraker_api: Moonraker_api):
        self.name = name
        self.led_pixels: list[iDryer_led_pixel] = []
        self.brightness: int = brightness
        self.moonraker_api: Moonraker_api = moonraker_api
        logger.info(
            f"Initialized iDryer_led '{self.name}'. Initial brightness={self.brightness}%")

    async def update(self, color_data_raw: list):
        logger.debug(
            f"Updating iDryer_led '{self.name}'. New color data: {color_data_raw}")
        led_pixels = []
        color_counter = 1
        for color_data_item in color_data_raw:
            led_name = self.name.split(" ")[1]
            index = color_counter
            red = color_data_item[0]
            green = color_data_item[1]
            blue = color_data_item[2]
            if len(self.led_pixels) != len(color_data_raw):
                logger.debug(
                    f"Creating new LED pixel for '{self.name}'. Index={index}, RGB=({red}, {green}, {blue})")
                led_pixels.append(iDryer_led_pixel(led_name=led_name,
                                                   index=index, red=red, green=green, blue=blue, moonraker_api=self.moonraker_api))
            else:
                for self_pixel in self.led_pixels:
                    if self_pixel.index == index:
                        logger.debug(
                            f"Updating existing LED pixel for '{self.name}'. Index={index}, RGB=({red}, {green}, {blue})")
                        await self_pixel.update(red=red, green=green, blue=blue)
                        break
            color_counter += 1
        if len(self.led_pixels) != len(color_data_raw):
            self.led_pixels = led_pixels
            logger.debug(
                f"Updated LED pixels for '{self.name}'. Total pixels={len(self.led_pixels)}")

    async def set_color(self, index: int, red: int, green: int, blue: int):
        brightness = self.brightness / 100
        red = red * brightness
        green = green * brightness
        blue = blue * brightness
        logger.debug(
            f"Setting color for LED '{self.name}' at index {index}. Adjusted RGB=({red}, {green}, {blue})")
        for led_pixel in self.led_pixels:
            if led_pixel.index == index:
                current_rgb = await led_pixel.get_rgb()
                if current_rgb != [red, green, blue]:
                    logger.debug(
                        f"Updating LED pixel '{self.name}' at index {index}. Current RGB={current_rgb}, New RGB=({red}, {green}, {blue})")
                    await led_pixel.set(red=red, green=green, blue=blue)
                else:
                    logger.debug(
                        f"LED pixel '{self.name}' at index {index} already has the desired RGB=({red}, {green}, {blue})")
                break


class iDryer_preset(object):
    def __init__(self, id: int, name: str, temperature: float, max_temperature_delta: float, humidity: float, dry_time: int, storage_temperature: float, humidity_storage_dry_time: int, humidity_storage_range: float):
        self.id = id
        self.name = name
        self.temperature = temperature
        self.max_temperature_delta = max_temperature_delta
        self.humidity = humidity
        self.dry_time = dry_time
        self.storage_temperature = storage_temperature
        self.humidity_storage_dry_time = humidity_storage_dry_time
        self.humidity_storage_range = humidity_storage_range
        logger.info(f"Initialized iDryer_preset '{self.name}' (ID={self.id}). Parameters: "
                    f"temperature={self.temperature}, max_temperature_delta={self.max_temperature_delta}, "
                    f"humidity={self.humidity}, dry_time={self.dry_time}, storage_temperature={self.storage_temperature}, "
                    f"humidity_storage_dry_time={self.humidity_storage_dry_time}, humidity_storage_range={self.humidity_storage_range})")


class iDryer_status(object):
    def __init__(self, status: int):
        self.status = status
        logger.info(
            f"Initialized iDryer_status with status={self.status} ({self.__str__()})")

    def __str__(self):
        if self.status == 0:
            return 'Pending'
        elif self.status == 1:
            return 'Drying'
        elif self.status == 2:
            return 'Timer drying'
        elif self.status == 3:
            return 'Humidity storage'
        elif self.status == 4:
            return 'Temperature storage'
        else:
            return 'N\\A'

    def __eq__(self, other):
        if isinstance(other, iDryer_status):
            return self.status == other.status
        return self.status == other

    def __lt__(self, other):
        if isinstance(other, iDryer_status):
            return self.status < other.status
        return self.status < other

    def __le__(self, other):
        if isinstance(other, iDryer_status):
            return self.status <= other.status
        return self.status <= other

    def __gt__(self, other):
        if isinstance(other, iDryer_status):
            return self.status > other.status
        return self.status > other

    def __ge__(self, other):
        if isinstance(other, iDryer_status):
            return self.status >= other.status
        return self.status >= other

    async def update(self, new_status: int):
        logger.debug(
            f"Updating iDryer_status. New status={new_status} ({self.__str__()})")
        self.status = new_status
        logger.info(
            f"Updated iDryer_status. Current status={self.status} ({self.__str__()})")


class IDryer_heater_PID(object):
    def __init__(self):
        self.pid = PID(1, 0.1, 0.05, setpoint=0)
        self.pid.output_limits = (0, 1)
        self.pid.set_auto_mode(True)
        logger.info(
            f"Initialized IDryer_heater_PID. PID parameters: Kp={self.pid.Kp}, Ki={self.pid.Ki}, Kd={self.pid.Kd}, setpoint={self.pid.setpoint}, output_limits={self.pid.output_limits}")

    async def update(self, target_temperature: float, min_temperature: float, max_temperature: float):
        logger.debug(
            f"Updating PID controller. New target_temperature={target_temperature}, min_temperature={min_temperature}, max_temperature={max_temperature}")
        if target_temperature != self.pid.setpoint:
            logger.debug(f"Updating PID setpoint to {target_temperature}")
            self.pid.setpoint = target_temperature
        if self.pid.output_limits[0] != min_temperature or self.pid.output_limits[1] != max_temperature:
            logger.debug(
                f"Updating PID output limits to ({min_temperature}, {max_temperature})")
            self.pid.output_limits = (min_temperature, max_temperature)

    async def get(self, current_temperature: float):
        output = round(self.pid(current_temperature), 2)
        logger.debug(
            f"Calculated PID output for current_temperature={current_temperature}. Output={output}")
        return output


class IDryer_humidty_PID(object):
    def __init__(self, target_humidity, min_temperature: float, max_temperature: float):
        self.pid = PID(1, 0.1, 0.05, setpoint=target_humidity)
        self.pid.output_limits = (min_temperature, max_temperature)
        self.pid.set_auto_mode(True)
        logger.info(f"Initialized IDryer_humidty_PID. PID parameters: Kp={self.pid.Kp}, Ki={self.pid.Ki}, Kd={self.pid.Kd}, "
                    f"setpoint={self.pid.setpoint}, output_limits={self.pid.output_limits}")

    async def get(self, curent_humidity: float):
        logger.debug(
            f"Calculating PID output for current_humidity={curent_humidity}")
        pid_output = self.pid(curent_humidity)
        min_temperature = self.pid.output_limits[0]
        max_temperature = self.pid.output_limits[1]
        target_temperature = (max_temperature - min_temperature) * (
            (100 - (((pid_output - min_temperature) / (max_temperature - min_temperature)) * 100)) / 100) + min_temperature
        target_temperature_rounded = round(target_temperature, 2)
        logger.debug(
            f"Calculated target_temperature={target_temperature_rounded} for current_humidity={curent_humidity}")
        return target_temperature_rounded


class iDryer(object):
    def __init__(self, id: int, name: str, moonraker_api: Moonraker_api, heater: str, heater_fan_name: str, heater_max_temperature: float, temperature_sensor: str, servo_name: str, servo_close_angle: float, servo_open_angle: float, led: str, led_brightness: int, presets: list[iDryer_preset], humidity_open_treshold: float, humidity_close_treshold: float, humidity_plateau_duration: int, humidity_plateau_window_size: int, humidity_timer_drying_range: float):
        self.id: int = id
        self.name: str = name
        self.moonraker_api: Moonraker_api = moonraker_api
        self.heater: iDryer_heater = iDryer_heater(
            name=heater, max_temperature=heater_max_temperature, fan=iDryer_heater_fan(name=heater_fan_name), moonraker_api=moonraker_api)
        self.temperature_sensor: iDryer_temperature_sensor = iDryer_temperature_sensor(
            name=temperature_sensor, humidity_plateau_duration=humidity_plateau_duration)
        self.servo: iDryer_servo = iDryer_servo(
            name=servo_name, close_angle=servo_close_angle, open_angle=servo_open_angle, moonraker_api=moonraker_api)
        self.led: iDryer_led = iDryer_led(
            name=led, brightness=led_brightness, moonraker_api=moonraker_api)
        self.presets: list[iDryer_preset] = presets
        self.status: iDryer_status = iDryer_status(status=0)
        self.heater_PID: IDryer_heater_PID = IDryer_heater_PID()
        self.humidity_PID: IDryer_humidty_PID = None
        ##############################
        self.target_humidity: float = self.presets[0].humidity
        self.target_temperature: float = 0
        self.max_temperature_delta: float = 0
        self.humidity_storage_range: float = 0
        self.humidity_storage_dry_time: int = 0
        self.display_humidity_storage_dry_time: str = self.display_time(
            self.humidity_storage_dry_time)
        self.dry_time: int = 0
        self.display_dry_time: str = self.display_time(self.dry_time)
        self.storage_temperature: int = 0
        self.time_left: str = 'N\\A'
        ############################
        self.humidity_open_treshold = humidity_open_treshold
        self.humidity_close_treshold = humidity_close_treshold
        self.humidity_plateau_duration = humidity_plateau_duration
        self.humidity_plateau_window_size = humidity_plateau_window_size
        self.humidity_timer_drying_range = humidity_timer_drying_range
        self.timer_drying_flag: int = 0
        logger.info(
            f"Initialized iDryer '{self.name}' (ID={self.id}). Components: heater='{heater}', heater_fan='{heater_fan_name}', temperature_sensor='{temperature_sensor}', servo='{servo_name}', led='{led}'")

    async def create(self):
        logger.info(f"Creating iDryer '{self.name}'")
        await self.heater.set(target=0, force=True)
        await self.update_all()
        asyncio.get_event_loop().create_task(self.servo.soft_set())
        return self

    def to_json(self):
        logger.debug(f"Converting iDryer '{self.name}' to JSON")
        return json.dumps(self, cls=JsonEncoder)

    async def update_all(self):
        logger.debug(f"Updating all components for iDryer '{self.name}'")
        data = await self.moonraker_api.get_idryer_status(self)
        if data == None:
            logger.error('Failed to get data from moonraker')
            return
        await self.heater.update(power=data[self.heater.name]['power'], target=data[self.heater.name]['target'], temperature=data[self.heater.name]['temperature'])
        await self.heater.fan.update(speed=data[self.heater.fan.name]['speed'], rpm=data[self.heater.fan.name]['rpm'])
        await self.temperature_sensor.update(temperature=data[self.temperature_sensor.name]['temperature'], relative_humidity=data[self.temperature_sensor.name]['humidity'])
        await self.led.update(color_data_raw=data[self.led.name]['color_data'])
        if self.status == 0:
            self.time_left = '∞'
        await self.drying_worker()
        await self.update_led_colors()

    async def update_led_colors(self):
        off_color = [0, 0, 0]
        default_color = [0.01, 0.01, 0.01]
        leds_is_on = True
        current_second = datetime.now().second
        if current_second % 2 == 0:
            leds_is_on = False

        # Heater
        if self.heater.power == 0:
            await self.led.set_color(1, *default_color)
        else:
            await self.led.set_color(index=1, red=self.heater.power, green=0, blue=0)
        # Heater fan
        if self.status == 3 and leds_is_on == False:
            await self.led.set_color(2, *off_color)
        else:
            if self.heater.fan.speed == 0:
                await self.led.set_color(2, *default_color)
            else:
                await self.led.set_color(index=2, red=0, green=self.heater.fan.speed, blue=0)
        # Humidity
        if (self.status == 2 or self.status == 3 or self.status == 4) and leds_is_on == False:
            await self.led.set_color(3, *off_color)
        else:
            if self.temperature_sensor.median_relative_humidity < self.target_humidity:
                await self.led.set_color(3, *default_color)
            else:
                await self.led.set_color(index=3, red=0, green=0, blue=self.temperature_sensor.median_relative_humidity/100)
        # Temperature
        if self.status == 4 and leds_is_on == False:
            await self.led.set_color(4, *off_color)
        else:
            if self.temperature_sensor.temperature <= 50:
                await self.led.set_color(4, *default_color)
            else:
                await self.led.set_color(index=4, red=(self.heater.temperature/(self.heater.max_temperature/100))/100, green=0, blue=0)

    async def change_status(self, new_status: int, preset_id: int = None, custom_preset: iDryer_preset = None):
        logger.info(f"Changing status of iDryer '{self.name}' to {new_status}")
        if preset_id != None:
            for preset in self.presets:
                if preset.id == preset_id:
                    self.target_temperature = preset.temperature
                    self.max_temperature_delta = preset.max_temperature_delta
                    self.target_humidity = preset.humidity
                    self.dry_time = preset.dry_time*60
                    self.display_dry_time = self.display_time(
                        seconds=self.dry_time)
                    self.storage_temperature = preset.storage_temperature
                    self.humidity_storage_range = preset.humidity_storage_range
                    self.humidity_storage_dry_time = preset.humidity_storage_dry_time*60
                    self.display_humidity_storage_dry_time: str = self.display_time(
                        self.humidity_storage_dry_time)
                    await self.status.update(new_status=1)
                    break
        elif custom_preset != None:
            self.target_temperature = custom_preset.temperature
            self.max_temperature_delta = custom_preset.max_temperature_delta
            self.target_humidity = custom_preset.humidity
            self.dry_time = custom_preset.dry_time*60
            self.display_dry_time = self.display_time(seconds=self.dry_time)
            self.storage_temperature = custom_preset.storage_temperature
            self.humidity_storage_range = custom_preset.humidity_storage_range
            self.humidity_storage_dry_time = custom_preset.humidity_storage_dry_time*60
            self.display_humidity_storage_dry_time: str = self.display_time(
                self.humidity_storage_dry_time)
            await self.status.update(new_status=1)
        elif new_status == 2:
            self.humidity_PID = None
        elif new_status == 3:
            self.time_left = '∞'
            self.dry_time = self.humidity_storage_dry_time
            await self.servo.close(ignore_timeout=True)
            await self.heater.set(target=0)
        elif new_status == 4:
            self.time_left = '∞'
        else:
            self.target_temperature = 0
            self.max_temperature_delta = 0
            self.dry_time = 0
            self.storage_temperature = 0
            self.target_humidity = self.presets[0].humidity
            self.humidity_storage_range = 0
            self.humidity_storage_dry_time = 0
            self.display_dry_time = self.display_time(self.dry_time)
            self.display_humidity_storage_dry_time: str = self.display_time(
                self.humidity_storage_dry_time)
            await self.heater.set(target=0)
            await self.servo.close(ignore_timeout=True)
        await self.status.update(new_status=new_status)

    async def drying_worker(self):
        def moving_average(data):
            return sum(data) / len(data)

        def is_plateau(smoothed_values: deque, threshold: int):
            change = max(smoothed_values) - min(smoothed_values)
            logger.debug(f'Open plateau change: {change}')
            return change < threshold

        def is_falling_stopped(smoothed_values: deque, threshold: int):
            change = smoothed_values[-1] - smoothed_values[0]
            change = change * -1
            if change <= -0.1:
                return True
            plateau_change = max(smoothed_values) - min(smoothed_values)
            logger.debug(f'Close plateau change: {plateau_change}')
            return change == plateau_change and plateau_change < threshold

        async def servo_worker(self: iDryer):
            humidity_values = self.temperature_sensor.relative_humidity_values
            if len(humidity_values) == self.humidity_plateau_duration:
                smoothed_values = [
                    moving_average(
                        list(humidity_values)[i:i + self.humidity_plateau_window_size])
                    for i in range(self.humidity_plateau_duration - self.humidity_plateau_window_size + 1)
                ]
                if is_plateau(smoothed_values, self.humidity_open_treshold) and is_falling_stopped(smoothed_values, self.humidity_close_treshold):
                    if self.servo.status == 1:
                        await self.servo.close()
                else:
                    if self.servo.status == 0 and is_plateau(smoothed_values, self.humidity_open_treshold):
                        await self.servo.open()
                    if self.servo.status == 1 and is_falling_stopped(smoothed_values, self.humidity_close_treshold):
                        await self.servo.close()

        ##################################
        if self.storage_temperature == 0:
            min_temperature = 1
        else:
            min_temperature = self.storage_temperature

        if self.status == 0:
            return 'Pending'
        elif self.status == 1:
            # 'Drying'
            await self.pid_heat(min_temperature=min_temperature)
            await servo_worker(self=self)
            if self.target_humidity >= self.temperature_sensor.median_relative_humidity:
                await self.change_status(new_status=2)
        elif self.status == 2:
            # 'Timer drying'
            ##################################
            target_relative_humidity_max = self.target_humidity + \
                self.humidity_timer_drying_range
            target_relative_humidity_min = self.target_humidity - \
                self.humidity_timer_drying_range
            if self.temperature_sensor.median_relative_humidity > target_relative_humidity_max:
                await self.pid_heat(min_temperature=min_temperature)
                await servo_worker(self=self)
            else:
                await self.pid_humidity(min_temperature=min_temperature)
                if self.temperature_sensor.median_relative_humidity < target_relative_humidity_min:
                    await self.servo.open()
                else:
                    await self.servo.close()
            ##################################
            self.dry_time -= 1
            self.time_left = self.display_time(self.dry_time)
            if self.dry_time == 0:
                if self.storage_temperature == 0:
                    await self.change_status(new_status=3)
                else:
                    await self.change_status(new_status=4)
        elif self.status == 3:
            # 'Humidity storage'
            target_relative_humidity_max = self.target_humidity+self.humidity_storage_range
            target_relative_humidity_min = self.target_humidity-self.humidity_storage_range
            if self.dry_time == self.humidity_storage_dry_time and self.temperature_sensor.median_relative_humidity < target_relative_humidity_max:
                return
            else:
                if self.temperature_sensor.median_relative_humidity > target_relative_humidity_max+0.1:
                    await self.pid_heat(min_temperature=min_temperature)
                    await servo_worker(self=self)
                else:
                    await self.pid_humidity(min_temperature=1)
                    if self.temperature_sensor.median_relative_humidity < target_relative_humidity_min:
                        await self.servo.open()
                    else:
                        await self.servo.close()
            ##################################
            self.dry_time -= 1
            self.time_left = self.display_time(self.dry_time)
            if self.dry_time == 0:
                self.dry_time = self.humidity_storage_dry_time
                await self.heater.set(target=0)
                self.time_left = '∞'
        elif self.status == 4:
            # 'Temperature storage'
            await self.pid_heat(min_temperature=min_temperature, target_temperature=self.storage_temperature)
            if self.temperature_sensor.median_relative_humidity > self.target_humidity:
                await servo_worker(self=self)
            elif self.temperature_sensor.median_relative_humidity < self.target_humidity:
                await self.servo.open()
            else:
                await self.servo.close()

    async def pid_heat(self, min_temperature: float, target_temperature: int = None):
        max_temperature = self.target_temperature+self.max_temperature_delta
        if target_temperature == None:
            await self.heater_PID.update(self.target_temperature, max_temperature=max_temperature, min_temperature=min_temperature)
        else:
            await self.heater_PID.update(target_temperature, max_temperature=max_temperature, min_temperature=min_temperature)
        await self.heater.set(await self.heater_PID.get(self.temperature_sensor.temperature))

    async def pid_humidity(self, min_temperature: float):
        max_temperature = self.target_temperature+self.max_temperature_delta
        if self.humidity_PID == None:
            self.humidity_PID = IDryer_humidty_PID(
                target_humidity=self.target_humidity, min_temperature=min_temperature, max_temperature=max_temperature)
        pid_result = await self.humidity_PID.get(self.temperature_sensor.median_relative_humidity)
        if pid_result == min_temperature:
            await self.pid_heat(min_temperature=min_temperature, target_temperature=min_temperature)
        else:
            await self.heater.set(pid_result)

    def display_time(self, seconds, granularity=5):
        intervals = (
            ('w', 604800),  # 60 * 60 * 24 * 7
            ('d', 86400),    # 60 * 60 * 24
            ('h', 3600),    # 60 * 60
            ('m', 60),
            ('s', 1),
        )
        result = []
        for name, count in intervals:
            value = seconds // count
            if value:
                seconds -= value * count
                if value == 1:
                    name = name.rstrip('s')
                result.append("{}{}".format(int(value), name))
        return ' '.join(result[:granularity])
