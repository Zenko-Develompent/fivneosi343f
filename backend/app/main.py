from fastapi import FastAPI

from app.core.db import create_db_and_tables
from app.api.routes.users import router as users_router
from app.api.routes.courses import router as courses_router

from app.models.models import (
    Achievement,
    AchievementUser,
    Course,
    CourseCategory,
    Module,
    Role,
    Task,
    Topic,
    User,
    UserAnswer,
    UserCourse,
)

app = FastAPI()


@app.on_event("startup")
def on_startup() -> None:
    create_db_and_tables()


app.include_router(users_router)
app.include_router(courses_router)

@app.get("/")
def root():
    return {"status": "ok"}