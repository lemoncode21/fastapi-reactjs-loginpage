from typing import List
from sqlalchemy.future import select

from app.config import db,commit_rollback
from app.model.role import Role
from app.repository.base_repo import BaseRepo


class RoleRepository(BaseRepo):
    model = Role

    @staticmethod
    async def find_by_role_name(role_name:str):
        query = select(Role).where(Role.role_name == role_name)
        return (await db.execute(query)).scalar_one_or_none()

    @staticmethod
    async def find_by_list_role_name(role_name:List[str]):
        query =  select(Role).where(Role.role_name.in_(role_name))
        return (await db.execute(query)).scalars().all()

    @staticmethod
    async def create_list(role_name: List[Role]):
        db.add_all(role_name)
        await commit_rollback()

