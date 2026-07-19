from typing import List

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.prompt import Prompt
from app.schemas.domain import PromptCreate, PromptUpdate


class CRUDPrompt(CRUDBase[Prompt, PromptCreate, PromptUpdate]):
    async def get_multi_by_user(
        self, db: AsyncSession, *, user_id: str, skip: int = 0, limit: int = 100
    ) -> List[Prompt]:
        result = await db.execute(
            select(self.model)
            .filter(Prompt.user_id == user_id)
            .offset(skip)
            .limit(limit)
        )
        return list(result.scalars().all())


prompt = CRUDPrompt(Prompt)
