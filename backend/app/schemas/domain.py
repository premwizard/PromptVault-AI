from datetime import datetime
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
    first_name: str | None = None
    last_name: str | None = None
    profile_image_url: str | None = None


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
    settings: UserSettingsResponse | None = None

    model_config = ConfigDict(from_attributes=True)


class CategoryBase(BaseModel):
    name: str
    color: str | None = None
    icon: str | None = None
    order: int | None = None


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CollectionBase(BaseModel):
    name: str
    description: str | None = None
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
    description: str | None = Field(default="", max_length=1000)
    content: str
    ai_model: str = Field(default="ChatGPT")
    status: str = "Published"
    category_id: UUID | None = None
    collection_id: UUID | None = None

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
    title: str | None = Field(None, max_length=255)
    description: str | None = Field(None, max_length=1000)
    content: str | None = None
    ai_model: str | None = None
    status: str | None = None
    category_id: UUID | None = None
    collection_id: UUID | None = None

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
    # embeddings omitted from standard response

    model_config = ConfigDict(from_attributes=True)
