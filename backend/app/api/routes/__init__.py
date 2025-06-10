from fastapi import APIRouter
from app.api.routes import items, users, ai, templates, backendless

router = APIRouter()

router.include_router(items.router, prefix="/items", tags=["items"])
router.include_router(users.router, prefix="/users", tags=["users"])
router.include_router(ai.router, prefix="/ai", tags=["ai"])
router.include_router(templates.router, prefix="/templates", tags=["templates"])
router.include_router(backendless.router, prefix="/backendless", tags=["backendless"])
