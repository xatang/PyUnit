import aiohttp
from misc.logs import logger


class Moonraker_api(object):
    def __init__(self, ip: str, port: int, api_key: str, api_method: str):
        self.url = f'{api_method}://{ip}:{port}'
        self.headers = {
            "X-Api-Key": api_key
        }
        logger.info(f"Initialized Moonraker_api. URL: {self.url}")

    async def get_idryer_settings(self):
        url = f"{self.url}/printer/objects/query?configfile"
        logger.debug(f"Fetching iDryer settings from URL: {url}")
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self.headers) as response:
                if response.status == 200:
                    data = await response.json()
                    data = data['result']['status']['configfile']['settings']
                    logger.debug(
                        f"Successfully fetched iDryer settings: {data}")
                    return data
                else:
                    logger.error(
                        f"Failed to fetch iDryer settings. Status code: {response.status}")
                    return None

    async def get_idryer_status(self, idryer: dict):
        url = f"{self.url}/printer/objects/query?{idryer.heater.name}&{idryer.temperature_sensor.name}&{idryer.led.name}&{idryer.servo.name}&{idryer.heater.fan.name}"
        logger.debug(f"Fetching iDryer status from URL: {url}")
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=self.headers) as response:
                if response.status == 200:
                    data = await response.json()
                    data = data['result']['status']
                    logger.debug(f"Successfully fetched iDryer status: {data}")
                    return data
                else:
                    logger.error(
                        f"Failed to fetch iDryer status. Status code: {response.status}")
                    return None

    async def send_gcode(self, gcode: str):
        url = f"{self.url}/printer/gcode/script"
        payload = {"script": gcode}
        logger.debug(f"Sending G-code: {gcode} to URL: {url}")
        async with aiohttp.ClientSession() as session:
            async with session.post(url, json=payload, headers=self.headers) as response:
                if response.status == 200:
                    logger.debug(f"G-code executed successfully: {gcode}")
                    return True
                else:
                    error_message = f"G-code error: {response.status}, {await response.text()}"
                    logger.error(error_message)
                    return False
