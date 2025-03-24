import aiohttp_jinja2
from aiohttp import web


class HomeHandler(web.View):
    @aiohttp_jinja2.template("index.html")
    async def get(self):
        self.request.app.logger.info(
            f"Handling GET request for home page from {self.request.remote}")
        self.request.app.logger.debug(
            f"Rendering index.html with {len(self.request.app.idryers)} iDryers")
        return {
            "title": "iDryer",
            "idryers": self.request.app.idryers,
            "update_rate": (self.request.app.config['update_rate'] * 1000)
        }

    async def post(self):
        self.request.app.logger.info(
            f"Handling POST request for home page data from {self.request.remote}")
        data = []
        for idryer in self.request.app.idryers:
            data.append({
                "id": idryer.id,
                "status": str(idryer.status),
                "temperature": idryer.temperature_sensor.temperature,
                "relative_humidity": idryer.temperature_sensor.relative_humidity,
                "absolute_humidity": idryer.temperature_sensor.absolute_humidity,
                'time_left': idryer.time_left,
                'target_temperature': idryer.target_temperature,
                'max_temperature_delta': idryer.max_temperature_delta,
                'target_humidity': idryer.target_humidity,
                'dry_time': idryer.display_dry_time,
                'humidity_storage_dry_time': idryer.display_humidity_storage_dry_time,
                'humidity_storage_range': idryer.humidity_storage_range,
                'storage_temperature': idryer.storage_temperature,
            })
            self.request.app.logger.debug(f"Added data for iDryer '{idryer.name}': "
                                          f"ID={idryer.id}, Status={str(idryer.status)}, "
                                          f"Temperature={idryer.temperature_sensor.temperature}, "
                                          f"Relative Humidity={idryer.temperature_sensor.relative_humidity}, "
                                          f"Absolute Humidity={idryer.temperature_sensor.absolute_humidity}, "
                                          f"Time Left={idryer.time_left}, "
                                          f"Target Temperature={idryer.target_temperature}, "
                                          f"Max Temperature Delta={idryer.max_temperature_delta}, "
                                          f"Target Humidity={idryer.target_humidity}, "
                                          f"Display Dry Time={idryer.display_dry_time}, "
                                          f"Disaply Humidity Storage Dry Time={idryer.display_humidity_storage_dry_time}, "
                                          f"Storage Temperature={idryer.storage_temperature}")

        self.request.app.logger.debug(
            f"Returning JSON response with data for {len(data)} iDryers")
        return web.json_response(data)
