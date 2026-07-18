import uuid
from datetime import datetime
from sqlalchemy import String, Integer, DateTime, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
# Note: we need pgvector's Vector type
from pgvector.sqlalchemy import Vector
from app.db.base import Base

class Prompt(Base):
    __tablename__ = "prompts"

    id: Mapped[str] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255), index=True)
    description: Mapped[str] = mapped_column(String(1000))
    content: Mapped[str] = mapped_column(Text)
    ai_model: Mapped[str] = mapped_column(String(50))
    status: Mapped[str] = mapped_column(String(50), default="Published") # Draft, Published, Archived
    usage_count: Mapped[int] = mapped_column(Integer, default=0)
    
    # pgvector embedding column for semantic search
    embedding = mapped_column(Vector(1536))
    
    user_id: Mapped[str] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    category_id: Mapped[str | None] = mapped_column(UUID(as_uuid=True), ForeignKey("categories.id", ondelete="SET NULL"))
    collection_id: Mapped[str | None] = mapped_column(UUID(as_uuid=True), ForeignKey("collections.id", ondelete="SET NULL"))
    
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="prompts")
    category = relationship("Category", back_populates="prompts")
    collection = relationship("Collection", back_populates="prompts")
    tags = relationship("Tag", secondary="prompt_tags", back_populates="prompts")
