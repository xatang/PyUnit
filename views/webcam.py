import aiohttp_jinja2
from aiohttp import web
import json


class WebcamStatusHandler(web.View):
    @aiohttp_jinja2.template("webcam_status.html")
    async def get(self):
        self.request.app.logger.info(
            f"Handling GET request for home page from {self.request.remote}")
        self.request.app.logger.debug(
            f"Rendering webcam_status.html with {len(self.request.app.idryers)} iDryers")
        return {
            "title": "iDryer",
            "idryers": self.request.app.idryers,
            "update_rate": (self.request.app.config['update_rate'] * 1000)
        }


class WebcamChartHandler(web.View):
    @aiohttp_jinja2.template("webcam_chart.html")
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
