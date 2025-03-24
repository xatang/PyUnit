from aiohttp import web


from views.index import HomeHandler as index
from views.chart import ChartHandler as chart
from views.status import StatusHandler as status
from views.webcam import WebcamStatusHandler as webcam_status
from views.webcam import WebcamChartHandler as webcam_chart


def setup_routes(app):
    app["static_root_url"] = "/static"
    app.add_routes([web.static("/static", "./static")])

    app.router.add_get("/", index, name="index")
    app.router.add_post("/", index, name="index")

    app.router.add_get("/chart", chart, name="chart")
    app.router.add_post("/chart", chart, name="chart")

    app.router.add_get("/status/{idryer_id}", status, name="status")
    app.router.add_post("/status/{idryer_id}", status, name="status")

    app.router.add_get("/webcam_status", webcam_status, name="webcam_status")
    app.router.add_get("/webcam_chart", webcam_chart, name="webcam_chart")
