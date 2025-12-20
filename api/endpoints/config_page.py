"""Configuration & single unit management endpoints.

Contains endpoints for:
* Moonraker server configuration CRUD / probing
* Individual dryer (unit) configuration CRUD

Design notes:
* Moonraker has a single row (id=1); if absent it's created lazily.
* Dryer update/delete operations also remove any in-memory runtime instance.
"""

from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.params import Query
from api.logger import get_logger
from api.cruds.moonraker_config_crud import moonraker_crud
from api.cruds.dryer_crud import dryer_crud
from api.schemas import moonraker_config_schema as moonrkaerConfigSchema
from api.schemas import dryer_schema as dryerSchema
from api.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from api.tools.moonraker_api import Moonraker_api
from typing import Any
import aiohttp
import asyncio

router = APIRouter()
logger = get_logger("config_page_endpoint")


def get_app(request: Request):
    """Dependency that returns the current FastAPI application instance."""
    return request.app


@router.get("/moonraker")
async def get_moonraker_config(db: AsyncSession = Depends(get_db)):
    """Fetch the singleton Moonraker configuration (lazy create if missing)."""
    logger.debug("GET /config/moonraker")
    existing_config = await moonraker_crud.get_config(db, 1)
    if existing_config:
        logger.debug("Moonraker config retrieved id=1")
    else:
        logger.info("Moonraker config missing, creating default")
        config = moonrkaerConfigSchema.MoonrakerConfigBase()
        existing_config = await moonraker_crud.create_config(db, config)
        logger.info("Moonraker config created id=1")
    return existing_config


@router.post("/moonraker")
async def update_moonraker_config(config: moonrkaerConfigSchema.MoonrakerConfigUpdate, db: AsyncSession = Depends(get_db)):
    """Update the singleton Moonraker config (create if missing)."""
    logger.debug("POST /config/moonraker")
    existing_config = await moonraker_crud.update_config(db, 1, config)
    if existing_config:
        logger.info("Moonraker config updated id=1")
    else:
        logger.info("Moonraker config missing, creating new one")
        existing_config = await moonraker_crud.create_config(db, config)
        logger.info("Moonraker config created id=1")
    return existing_config


@router.post("/moonraker/test-connection")
async def test_connection_to_moonraker(config: moonrkaerConfigSchema.MoonrakerConfigBase, db: AsyncSession = Depends(get_db)):
    """Test connectivity to Moonraker server using provided configuration.
    
    Args:
        config: Moonraker connection parameters to test
        db: Database session (unused, kept for consistency)
    
    Returns:
        dict with success status and message
    """
    logger.debug("POST /config/moonraker/test-connection ip=%s port=%s", config.moonraker_ip, config.moonraker_port)
    
    # Build URL from provided config
    url = f"{config.moonraker_api_method}://{config.moonraker_ip}:{config.moonraker_port}/printer/info"
    headers = {}
    if config.moonraker_api_key:
        headers["X-Api-Key"] = config.moonraker_api_key
    
    # Test connection directly without saving to DB
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, timeout=10) as response:
                if response.status == 200:
                    logger.info("Moonraker connection successful ip=%s", config.moonraker_ip)
                    return {"success": True, "message": "Connection successful"}
                logger.warning("Moonraker connection failed ip=%s status=%s", config.moonraker_ip, response.status)
                return {"success": False, "message": f"Moonraker returned status {response.status}"}
    except aiohttp.ClientConnectorError as e:
        logger.warning("Moonraker connection error ip=%s error=%s", config.moonraker_ip, str(e))
        return {"success": False, "message": f"Connection error: {str(e)}"}
    except asyncio.TimeoutError:
        logger.warning("Moonraker connection timeout ip=%s", config.moonraker_ip)
        return {"success": False, "message": "Connection timeout"}
    except Exception as e:
        logger.error("Moonraker connection exception ip=%s error=%s", config.moonraker_ip, str(e))
        return {"success": False, "message": f"Error: {str(e)}"}


@router.get("/moonraker/get-objects-list")
async def get_objects_list_from_moonraker(db: AsyncSession = Depends(get_db)):
    """Return the list of objects provided by Moonraker (for sensor mapping)."""
    logger.debug("GET /config/moonraker/get-objects-list")
    moonraker_api = Moonraker_api(db)
    await moonraker_api.initialize()
    return await moonraker_api.get_object_list()


@router.get("/unit")
async def get_unit_config(dryer_id: int, db: AsyncSession = Depends(get_db)):
    """Retrieve a dryer configuration by id.

    Raises:
        HTTPException(404): if the dryer does not exist.
    """
    logger.debug("GET /config/unit dryer_id=%s", dryer_id)
    existing_dryer = await dryer_crud.get_dryer_config(db, dryer_id)
    if existing_dryer:
        logger.debug("Dryer config retrieved dryer_id=%s", dryer_id)
        return existing_dryer
    logger.warning("Dryer not found dryer_id=%s", dryer_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Dryer with id {dryer_id} not found"
    )


@router.post("/unit")
async def create_unit_config(config: dryerSchema.DryerCreate, db: AsyncSession = Depends(get_db)):
    """Create a new dryer configuration."""
    logger.debug("POST /config/unit create")
    existing_dryer = await dryer_crud.create_dryer_config(db, config)
    logger.info("Dryer config created dryer_id=%s", existing_dryer.id)
    return existing_dryer


@router.put("/unit")
async def update_unit_config(config: dryerSchema.DryerUpdate, app = Depends(get_app), db: AsyncSession = Depends(get_db), dryer_id: int = Query(None)):
    """Update an existing dryer configuration and remove its runtime instance.

    Removing the runtime instance ensures the lifecycle manager can recreate it
    with updated parameters on next access.
    """
    logger.debug("PUT /config/unit dryer_id=%s", dryer_id)
    existing_dryer = await dryer_crud.update_dryer_config(db, dryer_id, config)
    if existing_dryer:
        await delete_dryer(app, dryer_id)
        logger.info("Dryer config updated dryer_id=%s", dryer_id)
        return existing_dryer
    logger.warning("Dryer not found dryer_id=%s", dryer_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Dryer with id {dryer_id} not found"
    )


@router.delete("/unit")
async def delete_unit_config(app = Depends(get_app), db: AsyncSession = Depends(get_db), dryer_id: int = Query(None)):
    """Delete a dryer configuration and remove any in-memory runtime instance."""
    logger.debug("DELETE /config/unit dryer_id=%s", dryer_id)
    success = await dryer_crud.delete_dryer(db, dryer_id)
    if success:
        await delete_dryer(app, dryer_id)
        logger.info("Dryer config deleted dryer_id=%s", dryer_id)
        return {"success": True, "message": f"Dryer with id {dryer_id} deleted"}
    logger.warning("Dryer not found dryer_id=%s", dryer_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Dryer with id {dryer_id} not found"
    )


async def delete_dryer(app, id: int):
    """Remove a dryer runtime instance from application state if present."""
    for i in reversed(range(len(app.state.dryer_instances))):
        if app.state.dryer_instances[i].id == id:
            del app.state.dryer_instances[i]
            logger.debug("Runtime dryer instance removed dryer_id=%s", id)
            break