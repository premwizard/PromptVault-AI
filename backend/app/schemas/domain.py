from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field, field_validator


class UserSettingsBase(BaseModel):
    theme: str = "system"
    preferred_ai_provider: str = "openai"
    ai_temperature: float = 0.7


class UserSettingsResponse(UserSettingsBase):
    id: UUID
    user_id: UUID

    model_config = ConfigDict(from_attributes=True)


class UserBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    profile_image_url: Optional[str] = None


class UserCreate(UserBase):
    email: str
    username: str
    password: str


class UserResponse(UserBase):
    id: UUID
    email: str
    username: str
    created_at: datetime
    updated_at: datetime
    settings: Optional[UserSettingsResponse] = None

    model_config = ConfigDict(from_attributes=True)


class CategoryBase(BaseModel):
    name: str
    color: Optional[str] = None
    icon: Optional[str] = None
    order: Optional[int] = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CollectionBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = False


class CollectionCreate(CollectionBase):
    pass


class CollectionResponse(CollectionBase):
    id: UUID
    user_id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class PromptBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = Field(default="", max_length=1000)
    content: str
    ai_model: str = Field(default="ChatGPT")
    status: str = "Published"
    category_id: Optional[UUID] = None
    collection_id: Optional[UUID] = None

    @field_validator("category_id", "collection_id", mode="before")
    @classmethod
    def empty_uuid_to_none(cls, v):
        if not v or v == "" or v == "undefined" or v == "null":
            return None
        return v

    @field_validator("ai_model", mode="before")
    @classmethod
    def empty_model_to_default(cls, v):
        if not v or v == "":
            return "ChatGPT"
        return v

    @field_validator("description", mode="before")
    @classmethod
    def empty_desc_to_str(cls, v):
        if v is None:
            return ""
        return v


class PromptCreate(PromptBase):
    pass


class PromptUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = Field(None, max_length=1000)
    content: Optional[str] = None
    ai_model: Optional[str] = None
    status: Optional[str] = None
    category_id: Optional[UUID] = None
    collection_id: Optional[UUID] = None

    @field_validator("category_id", "collection_id", mode="before")
    @classmethod
    def empty_uuid_to_none(cls, v):
        if not v or v == "" or v == "undefined" or v == "null":
            return None
        return v


class PromptResponse(PromptBase):
    id: UUID
    user_id: UUID
    usage_count: int
    created_at: datetime
    updated_at: datetime
    # We omit embeddings from standard response

    model_config = ConfigDict(from_attributes=True)
