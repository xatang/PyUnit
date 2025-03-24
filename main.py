import signal
import sys
from misc.logs import logger

import aiohttp_jinja2
import jinja2
from aiohttp import web
from aiohttp.abc import AbstractAccessLogger

import misc.jinja_formatters as jinja_formatters
from misc.routes import setup_routes
import json
from idryer.workers import moonraker_data_updater
import asyncio


class AccessLogger(AbstractAccessLogger):
    def log(self, request, response, time):
        try:
            real_ip = request.headers["CF-CONNECTING-IP"]
        except:
            real_ip = request.remote
        try:
            user_agent = request.headers["User-Agent"]
        except:
            user_agent = ""

        self.logger.info(
            f"{real_ip}"
            f' "{request.method} {request.raw_path} "'
            f' done in {time}s: {response.status} "-" "{user_agent}"'
        )


def init_app():
    app = web.Application()
    app.config = json.load(open('./config.json'))
    app.config['update_rate'] = 1
    app.idryers = []
    logger
    aiohttp_jinja2.setup(
        app,
        loader=jinja2.FileSystemLoader("templates"),
        context_processors=[aiohttp_jinja2.request_processor],
    )
    setup_routes(app)
    env = aiohttp_jinja2.get_env(app)
    env.globals.update(zip=zip)
    env.filters["format_datetime"] = jinja_formatters.format_datetime
    env.policies['json.dumps_kwargs']['ensure_ascii'] = False
    return app


app = init_app()


async def start_background_tasks(app):
    app['moonraker_data_updater'] = asyncio.create_task(
        moonraker_data_updater(app))


async def cleanup_background_tasks(app):
    app['moonraker_data_updater'].cancel()
    await app['moonraker_data_updater']


async def shutdown(signal=None, loop=None):
    """Cleanup tasks tied to the service's shutdown."""
    if signal:
        logger.info(f"Received exit signal {signal.name}...")
    else:
        logger.info("Shutting down...")

    tasks = [t for t in asyncio.all_tasks() if t is not asyncio.current_task()]
    [task.cancel() for task in tasks]

    logger.info(f"Cancelling {len(tasks)} outstanding tasks")
    await asyncio.gather(*tasks, return_exceptions=True)
    if loop:
        loop.stop()


def handle_exception(loop, context):
    msg = context.get("exception", context["message"])
    logger.error(f"Caught exception: {msg}")
    logger.info("Shutting down...")
    asyncio.create_task(shutdown(loop=loop))


app.on_startup.append(start_background_tasks)
app.on_cleanup.append(cleanup_background_tasks)

if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    if sys.platform != 'win32':
        signals = [signal.SIGTERM, signal.SIGINT]
        if hasattr(signal, 'SIGHUP'):
            signals.append(signal.SIGHUP)

        for s in signals:
            loop.add_signal_handler(
                s, lambda s=s: asyncio.create_task(shutdown(s, loop)))
    else:
        async def windows_shutdown():
            await shutdown(loop=loop)

        def signal_handler():
            asyncio.create_task(windows_shutdown())

        signal.signal(signal.SIGINT, signal_handler)

    loop.set_exception_handler(handle_exception)

    try:
        web.run_app(app, access_log_class=AccessLogger,
                    host=app.config['app_ip'], port=app.config['app_port'])
    finally:
        loop.close()
        logger.info("Successfully shutdown the service.")
