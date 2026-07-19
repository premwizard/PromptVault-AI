from fastapi import APIRouter

from app.api.endpoints import prompts

api_router = APIRouter()
api_router.include_router(prompts.router, prefix="/prompts", tags=["prompts"])
