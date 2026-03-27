from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, SQLModel, select

from app.core.db import get_session
from app.models.models import Role, User


router = APIRouter(prefix="/users", tags=["users"])


class UserCreate(SQLModel):
    first_name: str
    last_name: str | None = None
    password_hash: str
    role_id: int
    mail: str


class UserPublic(SQLModel):
    id: int
    first_name: str
    last_name: str | None = None
    level: int
    total_xp: int
    role_id: int
    mail: str


class RolePublic(SQLModel):
    id: int
    name: str


def serialize_user(user: User) -> UserPublic:
    return UserPublic(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        level=user.level,
        total_xp=user.total_xp,
        role_id=user.role_id,
        mail=user.mail,
    )


def serialize_role(role: Role) -> RolePublic:
    return RolePublic(
        id=role.id,
        name=role.name,
    )


@router.post("/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register_user(
    user_data: UserCreate,
    session: Session = Depends(get_session),
) -> UserPublic:
    existing_user = session.exec(
        select(User).where(User.mail == user_data.mail)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this mail already exists",
        )

    role = session.get(Role, user_data.role_id)
    if role is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Role not found",
        )

    user = User(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        password_hash=user_data.password_hash,
        role_id=user_data.role_id,
        mail=user_data.mail,
    )

    session.add(user)
    session.commit()
    session.refresh(user)

    return serialize_user(user)


@router.get("/roles", response_model=list[RolePublic])
def get_roles(session: Session = Depends(get_session)) -> list[RolePublic]:
    roles = session.exec(select(Role).order_by(Role.id)).all()
    return [serialize_role(role) for role in roles]


@router.get("", response_model=list[UserPublic])
def list_users(session: Session = Depends(get_session)) -> list[UserPublic]:
    users = session.exec(select(User).order_by(User.id)).all()
    return [serialize_user(user) for user in users]


@router.get("/{user_id}", response_model=UserPublic)
def get_user_by_id(
    user_id: int,
    session: Session = Depends(get_session),
) -> UserPublic:
    user = session.get(User, user_id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return serialize_user(user)