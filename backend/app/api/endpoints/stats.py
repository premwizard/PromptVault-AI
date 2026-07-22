from typing import Any, Dict
from fastapi import APIRouter, Depends
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.db import get_db
from app.models.prompt import Prompt

router = APIRouter()


@router.get("", response_model=Dict[str, Any])
async def get_dashboard_stats(
    db: AsyncSession = Depends(get_db),
) -> Any:
    """
    Get dashboard metrics and activity statistics.
    """
    total_result = await db.execute(select(func.count(Prompt.id)))
    total_prompts = total_result.scalar() or 0

    save_time_hours = round(total_prompts * 0.5, 1)

    return {
        "totalPrompts": total_prompts,
        "favoritePrompts": 0,
        "usageThisMonth": total_prompts,
        "usageLastMonth": 0,
        "saveTimeHours": save_time_hours,
        "recentActivity": [],
    }
