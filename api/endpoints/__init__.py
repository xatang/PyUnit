from fastapi import APIRouter
from .config_page import router as config_page_router
from .common import router as common_router
from .presets_page import router as presets_page_router
from .logs_page import router as logs_page_router
from .dashboard_page import router as dashboard_page_router


router = APIRouter()

router.include_router(config_page_router, prefix="/api/config", tags=["config"])
router.include_router(presets_page_router, prefix="/api/presets", tags=["presets"])
router.include_router(logs_page_router, prefix="/api/logs", tags=["logs"])
router.include_router(dashboard_page_router, prefix="/api/dashboard", tags=["dashboard"])
router.include_router(common_router, prefix="/api/common", tags=["common"])