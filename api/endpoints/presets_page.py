"""Preset CRUD and association endpoints.

Endpoints cover preset CRUD plus the linking of presets to dryer units.
Link creation gracefully handles existing links by reusing the found instance.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.params import Query
from api.logger import get_logger
from api.cruds.preset_crud import preset_crud
from api.schemas import preset_schema as presetSchema
from api.database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from api.endpoints.config_page import get_unit_config

router = APIRouter()
logger = get_logger("presets_page_endpoint")


@router.get("/preset")
async def get_preset(preset_id: int, db: AsyncSession = Depends(get_db)):
    """Retrieve a preset by id or raise 404."""
    logger.debug("GET /preset preset_id=%s", preset_id)
    existing_preset = await preset_crud.get_preset(db, preset_id)
    if existing_preset:
        logger.debug("Preset retrieved preset_id=%s", preset_id)
        return existing_preset
    logger.warning("Preset not found preset_id=%s", preset_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Preset with id {preset_id} not found"
    )


@router.post("/preset")
async def create_preset(config: presetSchema.PresetCreate, db: AsyncSession = Depends(get_db)):
    """Create and return a new preset."""
    logger.debug("POST /preset create")
    existing_preset = await preset_crud.create_preset(db, config)
    logger.info("Preset created preset_id=%s", existing_preset.id)
    return existing_preset


@router.put("/preset")
async def update_preset(config: presetSchema.PresetUpdate, db: AsyncSession = Depends(get_db), preset_id: int = Query(None)):
    """Update an existing preset by id or raise 404."""
    logger.debug("PUT /preset preset_id=%s", preset_id)
    existing_preset = await preset_crud.update_preset(db, preset_id, config)
    if existing_preset:
        logger.info("Preset updated preset_id=%s", preset_id)
        return existing_preset
    logger.warning("Preset not found preset_id=%s", preset_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Preset with id {preset_id} not found"
    )


@router.delete("/preset")
async def delete_preset(db: AsyncSession = Depends(get_db), preset_id: int = Query(None)):
    """Delete a preset by id or raise 404."""
    logger.debug("DELETE /preset preset_id=%s", preset_id)
    success = await preset_crud.delete_preset(db, preset_id)
    if success:
        logger.info("Preset deleted preset_id=%s", preset_id)
        return {"success": True, "message": f"Preset with id {preset_id} deleted"}
    logger.warning("Preset not found preset_id=%s", preset_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Preset with id {preset_id} not found"
    )


@router.get("/preset/link")
async def get_preset_link(preset_id: int, dryer_id: int, db: AsyncSession = Depends(get_db)):
    """Return a preset-dryer association or raise 404."""
    logger.debug("GET /preset/link preset_id=%s dryer_id=%s", preset_id, dryer_id)
    existing_preset_link = await preset_crud.get_preset_link(db, preset_id, dryer_id)
    if existing_preset_link:
        logger.debug("Preset link retrieved preset_id=%s dryer_id=%s", preset_id, dryer_id)
        return existing_preset_link
    logger.warning("Preset link not found preset_id=%s dryer_id=%s", preset_id, dryer_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Preset link with preset_id {preset_id} and dryer_id {dryer_id} not found"
    )


@router.post("/preset/link")
async def create_preset_link(config: presetSchema.DryerPresetAssociationCreate, db: AsyncSession = Depends(get_db)):
    """Create a link between preset and dryer if it doesn't already exist."""
    logger.debug("POST /preset/link preset_id=%s dryer_id=%s", config.preset_id, config.dryer_id)
    await get_preset(preset_id=config.preset_id, db=db)
    await get_unit_config(dryer_id=config.dryer_id, db=db)
    try:
        existing_link = await get_preset_link(preset_id=config.preset_id, dryer_id=config.dryer_id, db=db)
    except HTTPException:
        existing_link = await preset_crud.create_preset_link(db, config)
        logger.info("Preset linked preset_id=%s dryer_id=%s", config.preset_id, config.dryer_id)
    return existing_link


@router.delete("/preset/link")
async def delete_preset_link(db: AsyncSession = Depends(get_db), preset_id: int = Query(None), dryer_id: int = Query(None)):
    """Delete a preset-dryer association or raise 404."""
    logger.debug("DELETE /preset/link preset_id=%s dryer_id=%s", preset_id, dryer_id)
    success = await preset_crud.delete_preset_link(db, preset_id, dryer_id)
    if success:
        logger.info("Preset link deleted preset_id=%s dryer_id=%s", preset_id, dryer_id)
        return {"success": True, "message": f"Preset link with with preset_id {preset_id} and dryer_id {dryer_id} deleted"}
    logger.warning("Preset link not found preset_id=%s dryer_id=%s", preset_id, dryer_id)
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Preset with preset_id {preset_id} and dryer_id {dryer_id} not found"
    )