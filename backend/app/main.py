from fastapi import FastAPI

from app.core.db import create_db_and_tables
from app.models.achievements import Achievement
from app.models.users import (
    AchievementUser,
    Module,
    Role,
    User,
    UserAnswer,
    UserCourse,
)
from app.models.courses import (
    CourseCategory,
    Course,
    Module,
    Topic,
    Task,
)

app = FastAPI()

@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()

@app.get("/")
def root():
    return {"status": "ok"}