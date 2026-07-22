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
cors_origins = [str(o).rstrip("/") for o in settings.BACKEND_CORS_ORIGINS] if settings.BACKEND_CORS_ORIGINS else []
if "https://prompt-vault-ai-omega.vercel.app" not in cors_origins:
    cors_origins.append("https://prompt-vault-ai-omega.vercel.app")
if "http://localhost:3000" not in cors_origins:
    cors_origins.append("http://localhost:3000")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins if cors_origins else ["*"],
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Welcome to PromptVault AI API"}


# Include routers
app.include_router(api_router, prefix=settings.API_V1_STR)
