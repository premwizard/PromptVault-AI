from fastapi import APIRouter

from app.api.endpoints import prompts, health, stats, collections

api_router = APIRouter()
api_router.include_router(prompts.router, prefix="/prompts", tags=["prompts"])
api_router.include_router(stats.router, prefix="/stats", tags=["stats"])
api_router.include_router(collections.router, prefix="/collections", tags=["collections"])
api_router.include_router(health.router, tags=["health"])
