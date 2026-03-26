from typing import Optional
from sqlmodel import SQLModel, Field


class Course(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    description: str | None = None
    is_published: bool = Field(default=False)


class CourseModule(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    course_id: int = Field(foreign_key="course.id", index=True)
    title: str
    description: str | None = None
    order: int = Field(index=True)
    is_published: bool = Field(default=False)


class Lesson(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    module_id: int = Field(foreign_key="coursemodule.id", index=True)
    title: str
    description: str | None = None
    order: int = Field(index=True)
    is_published: bool = Field(default=False)