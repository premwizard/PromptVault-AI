import uuid
from sqlalchemy import Table, Column, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.base import Base

prompt_tags = Table(
    "prompt_tags",
    Base.metadata,
    Column("prompt_id", UUID(as_uuid=True), ForeignKey("prompts.id", ondelete="CASCADE"), primary_key=True),
    Column("tag_id", UUID(as_uuid=True), ForeignKey("tags.id", ondelete="CASCADE"), primary_key=True),
)

class Tag(Base):
    __tablename__ = "tags"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String(50), unique=True, index=True)

    # Relationships
    prompts = relationship("Prompt", secondary=prompt_tags, back_populates="tags")
