from typing import Any, List
from uuid import UUID
import uuid

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.db import get_db
from app.models.collection import Collection
from app.schemas.domain import CollectionCreate, CollectionResponse

router = APIRouter()


@router.get("", response_model=List[CollectionResponse])
async def read_collections(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve collections.
    """
    result = await db.execute(select(Collection).offset(skip).limit(limit))
    collections = result.scalars().all()
    return collections


@router.post("", response_model=CollectionResponse)
async def create_collection(
    *,
    db: AsyncSession = Depends(get_db),
    collection_in: CollectionCreate,
) -> Any:
    """
    Create a collection.
    """
    mock_user_id = uuid.uuid4()
    db_obj = Collection(
        name=collection_in.name,
        description=collection_in.description,
        is_public=collection_in.is_public,
        user_id=mock_user_id,
    )
    db.add(db_obj)
    await db.commit()
    await db.refresh(db_obj)
    return db_obj


@router.get("/{id}", response_model=CollectionResponse)
async def read_collection(
    *,
    db: AsyncSession = Depends(get_db),
    id: UUID,
) -> Any:
    """
    Get collection by ID.
    """
    result = await db.execute(select(Collection).filter(Collection.id == id))
    collection = result.scalar_one_or_none()
    if not collection:
        raise HTTPException(status_code=404, detail="Collection not found")
    return collection
