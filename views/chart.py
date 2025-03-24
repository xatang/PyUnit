import aiohttp_jinja2
from aiohttp import web
import json


from aiohttp import web
import aiohttp_jinja2
import json


class ChartHandler(web.View):
    @aiohttp_jinja2.template("chart.html")
    async def get(self):
        self.request.app.logger.info(
            f"Handling GET request for chart data from {self.request.remote}")
        series = []
        for idryer in self.request.app.idryers:
            series.append({
                "name": f"Temperature {idryer.name}",
                "data": [],
                "yAxis": 0
            })
            series.append({
                "name": f"Relative humidity {idryer.name}",
                "data": [],
                "yAxis": 1
            })
            series.append({
                "name": f"Absolute humidity {idryer.name}",
                "data": [],
                "yAxis": 2
            })
            series.append({
                "name": f"Relative humidity trend {idryer.name}",
                "data": [],
                "yAxis": 1,
                "dashStyle": "dash",
                "marker": {
                    "enabled": False
                }
            })
            series.append({
                "name": f"Absolute humidity trend {idryer.name}",
                "data": [],
                "yAxis": 1,
                "dashStyle": "dash",
                "marker": {
                    "enabled": False
                }
            })
            self.request.app.logger.debug(
                f"Added series for iDryer '{idryer.name}'")

        series = json.dumps(series, ensure_ascii=False)
        self.request.app.logger.debug(
            f"Returning chart data with {len(series)} series")
        return {
            "title": "Humidity and temperature graph",
            "url": f"{self.request.raw_path}",
            "series": series,
            "update_rate": (self.request.app.config['update_rate'] * 1000)
        }

    async def post(self):
        self.request.app.logger.info(
            f"Handling POST request for chart data from {self.request.remote}")
        chart_data = []
        for idryer in self.request.app.idryers:
            chart_data.append({
                "name": idryer.name,
                "temperature": idryer.temperature_sensor.temperature,
                "relative_humidity": idryer.temperature_sensor.median_relative_humidity,
                "absolute_humidity": idryer.temperature_sensor.median_absolute_humidity
            })
            self.request.app.logger.debug(f"Added chart data for iDryer '{idryer.name}': "
                                          f"Temperature={idryer.temperature_sensor.temperature}, "
                                          f"Relative Humidity={idryer.temperature_sensor.median_relative_humidity}, "
                                          f"Absolute Humidity={idryer.temperature_sensor.median_absolute_humidity}")

        self.request.app.logger.debug(
            f"Returning JSON response with chart data for {len(chart_data)} iDryers")
        return web.json_response(chart_data)
