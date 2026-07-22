from typing import Any, List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import prompt as crud_prompt
from app.dependencies.db import get_db
from app.schemas.domain import PromptCreate, PromptResponse, PromptUpdate

router = APIRouter()

# TODO: Add current_user dependency to endpoints


@router.get("", response_model=List[PromptResponse])
async def read_prompts(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
) -> Any:
    """
    Retrieve prompts.
    """
    prompts = await crud_prompt.get_multi(db, skip=skip, limit=limit)
    return prompts


@router.post("", response_model=PromptResponse)
async def create_prompt(
    *,
    db: AsyncSession = Depends(get_db),
    prompt_in: PromptCreate,
) -> Any:
    """
    Create new prompt.
    """
    import uuid
    from app.models.prompt import Prompt

    mock_user_id = uuid.uuid4()
    obj_in_data = prompt_in.model_dump()
    
    prompt = Prompt(**obj_in_data, user_id=mock_user_id)
    db.add(prompt)
    await db.commit()
    await db.refresh(prompt)
    return prompt


@router.get("/{id}", response_model=PromptResponse)
async def read_prompt(
    *,
    db: AsyncSession = Depends(get_db),
    id: UUID,
) -> Any:
    """
    Get prompt by ID.
    """
    prompt = await crud_prompt.get(db=db, id=id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    return prompt


@router.put("/{id}", response_model=PromptResponse)
async def update_prompt(
    *,
    db: AsyncSession = Depends(get_db),
    id: UUID,
    prompt_in: PromptUpdate,
) -> Any:
    """
    Update a prompt.
    """
    prompt = await crud_prompt.get(db=db, id=id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    prompt = await crud_prompt.update(db=db, db_obj=prompt, obj_in=prompt_in)
    return prompt


@router.delete("/{id}", response_model=PromptResponse)
async def delete_prompt(
    *,
    db: AsyncSession = Depends(get_db),
    id: UUID,
) -> Any:
    """
    Delete a prompt.
    """
    prompt = await crud_prompt.get(db=db, id=id)
    if not prompt:
        raise HTTPException(status_code=404, detail="Prompt not found")
    prompt = await crud_prompt.remove(db=db, id=id)
    return prompt
