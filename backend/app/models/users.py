from __future__ import annotations

from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    __tablename__ = "users"

    id: int | None = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, max_length=100)
    email: str = Field(index=True, unique=True, max_length=255)
    password: str = Field(max_length=255)
    role_id: int = Field(foreign_key="roles.id", index=True)
    parent_id: int | None = Field(default=None, foreign_key="users.id", index=True)

    role: "Role" = Relationship(back_populates="users")
    parent: "User | None" = Relationship(
        back_populates="children",
        sa_relationship_kwargs={"remote_side": "User.id"},
    )
    children: list["User"] = Relationship(back_populates="parent")
    profile: "Profile | None" = Relationship(back_populates="user")
    achievements: list["UserAchievement"] = Relationship(back_populates="user")


class Role(SQLModel, table=True):
    __tablename__ = "roles"

    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True, unique=True, max_length=100)

    users: list[User] = Relationship(back_populates="role")


class Profile(SQLModel, table=True):
    __tablename__ = "profiles"

    id: int | None = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id", unique=True, index=True)
    first_name: str | None = Field(default=None, max_length=100)
    last_name: str | None = Field(default=None, max_length=100)
    info: str | None = Field(default=None, max_length=1000)
    picture_src: str | None = Field(default=None, max_length=500)

    user: User = Relationship(back_populates="profile")
