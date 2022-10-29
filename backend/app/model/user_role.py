from typing import Optional
from sqlmodel import SQLModel, Field
from app.model.mixins import TimeMixin

class UsersRole(SQLModel,TimeMixin,table=True):
    __tablename__= "user_role"

    users_id: Optional[str] = Field(default=None, foreign_key="users.id",primary_key=True)
    role_id: Optional[str] = Field(default=None, foreign_key="role.id",primary_key=True)