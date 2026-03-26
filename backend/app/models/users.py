from sqlmodel import Field, Relationship, SQLModel


class User(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    username: str
    email: str
    password: str
    role_id: int
    parent_id: int | None = Field(default=None, foreign_key="user.id")
    role: "Role" = Relationship()
    parent: "User" = Relationship(back_populates="children")
    children: list["User"] = Relationship(back_populates="parent")


class Role(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    name: str


class Profile(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    first_name: str | None = None
    last_name: str | None = None
    info: str | None = None
    picture_src: str | None = None
