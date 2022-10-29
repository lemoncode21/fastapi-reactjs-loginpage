from typing import List, Optional
from sqlalchemy import table
from sqlmodel import Relationship, SQLModel, Field
from app.model.mixins import TimeMixin
from app.model.user_role import UsersRole

class Role(SQLModel,TimeMixin, table=True):
    __tablename__ = "role"

    id: Optional[str] = Field(None,primary_key=True, nullable=True)
    role_name: str

    users: List["Users"] = Relationship(back_populates="roles", link_model=UsersRole)