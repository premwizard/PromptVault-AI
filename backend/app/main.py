from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.api import api_router
from app.core.config import settings

from contextlib import asynccontextmanager
from app.db.session import engine
from app.models import Base

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all database tables on startup (bypasses need for Alembic in simple SQLite setups)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(
    title=settings.PROJECT_NAME, 
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


@app.get("/")
def read_root():
    return {"message": "Welcome to PromptVault AI API"}


# Include routers
app.include_router(api_router, prefix=settings.API_V1_STR)
