from fastapi import APIRouter

from app.api.endpoints import prompts, health

api_router = APIRouter()
api_router.include_router(prompts.router, prefix="/prompts", tags=["prompts"])
api_router.include_router(health.router, tags=["health"])
