"""Moonraker API wrapper with structured logging and error translation.

Provides helper methods for common Moonraker endpoints plus generic GET / POST
logic that converts network / protocol errors into HTTPExceptions suitable for
FastAPI routes. All successful calls return a dict with shape:
{ "success": bool, "data": <raw json from moonraker> }
"""

from api.cruds.moonraker_config_crud import moonraker_crud
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import aiohttp
import asyncio
from api.schemas import dryer_schema
from api.logger import get_logger
from typing import Any, Dict

logger = get_logger("moonraker_api")


class Moonraker_api(object):
    """Lightweight async client for Moonraker endpoints.

    Usage:
        api = Moonraker_api(db_session)
        await api.initialize()
        info = await api.get_info()
    """

    def __init__(self, db: AsyncSession):
        self.url: str | None = None
        self.headers: Dict[str, str] | None = None
        self.db = db
        logger.debug("Moonraker_api instance created")

    async def initialize(self) -> None:
        """Load config row (id=1) and build base URL / headers."""
        existing_config = await moonraker_crud.get_config(self.db, 1)
        if not existing_config:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Moonraker configuration not found"
            )
        self.url = f"{existing_config.moonraker_api_method}://{existing_config.moonraker_ip}:{existing_config.moonraker_port}"
        self.headers = {}
        if existing_config.moonraker_api_key:
            self.headers["X-Api-Key"] = existing_config.moonraker_api_key
        logger.debug("Moonraker initialized url=%s", self.url)

    async def get_info(self) -> Dict[str, Any]:
        url = f"{self.url}/printer/info"
        logger.debug("get_info %s", url)
        return await self.call_api(url)

    async def get_object_list(self) -> Dict[str, Any]:
        url = f"{self.url}/printer/objects/list"
        logger.debug("get_object_list %s", url)
        return await self.call_api(url)

    async def get_dryer_status(self, dryer: dryer_schema.Dryer) -> Dict[str, Any]:
        url = f"{self.url}/printer/objects/query?{dryer.config.heater.name}&{dryer.config.heater.fan_name}&{dryer.config.temperature.sensor_name}&{dryer.config.led.name}&{dryer.config.servo.name}"
        logger.debug("get_dryer_status %s", url)
        return await self.call_api(url)

    async def call_api(self, url: str) -> Dict[str, Any]:
        """Perform a GET request to Moonraker converting errors to HTTPException."""
        logger.debug("API call %s", url)
        try:
            async with aiohttp.ClientSession() as session:
                async with session.get(url, headers=self.headers, timeout=10) as response:
                    logger.debug("API status %s %s", response.status, url)
                    if response.status == 200:
                        data = await response.json()
                        logger.debug("API ok %s", url)
                        return {"success": True, "data": data}
                    logger.warning("API call failed: %s status=%s", url, response.status)
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY,
                        detail=f"Moonraker API returned error status: {response.status}"
                    )
        except aiohttp.ClientConnectorError as e:
            logger.error("Connection error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Moonraker connection error: {e}"
            )
        except aiohttp.ClientResponseError as e:
            logger.error("Response error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=e.status if e.status != 200 else status.HTTP_502_BAD_GATEWAY,
                detail=f"Moonraker response error: {e}"
            )
        except asyncio.TimeoutError:
            logger.error("Timeout error calling %s", url)
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Moonraker connection timeout"
            )
        except Exception as e:
            logger.error("Unexpected error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error communicating with Moonraker: {e}"
            )

    async def send_gcode(self, gcode: str) -> Dict[str, Any]:
        """Send a GCODE script to Moonraker."""
        url = f"{self.url}/printer/gcode/script"
        payload = {"script": gcode}
        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(url, json=payload, headers=self.headers, timeout=10) as response:
                    logger.debug("API status %s %s", response.status, url)
                    if response.status == 200:
                        data = await response.json()
                        logger.debug("API ok %s", url)
                        return {"success": True, "data": data}
                    logger.warning("API call failed: %s status=%s", url, response.status)
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY,
                        detail=f"Moonraker API returned error status: {response.status}"
                    )
        except aiohttp.ClientConnectorError as e:
            logger.error("Connection error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Moonraker connection error: {e}"
            )
        except aiohttp.ClientResponseError as e:
            logger.error("Response error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=e.status if e.status != 200 else status.HTTP_502_BAD_GATEWAY,
                detail=f"Moonraker response error: {e}"
            )
        except asyncio.TimeoutError:
            logger.error("Timeout error calling %s", url)
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Moonraker connection timeout"
            )
        except Exception as e:
            logger.error("Unexpected error calling %s error=%s", url, e)
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Unexpected error communicating with Moonraker: {e}"
            )





