from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, SQLModel, select

from app.core.db import get_session
from app.models.models import Course, CourseCategory, UserCourse
from fastapi import Depends, HTTPException, Request
from jose import JWTError

from fastapi import APIRouter, Depends
from sqlmodel import Session, SQLModel, select

from app.core.db import get_session
from app.models.models import Course, UserCourse
from app.core.security import get_current_user_id

router = APIRouter(prefix="/courses", tags=["courses"])





class CategoryPublic(SQLModel):
    id: int
    title: str


class CourseDetailPublic(SQLModel):
    id: int
    title: str
    description: str | None = None
    is_published: bool
    category_id: int | None = None
    progress_percent: float | None = None
    created_at: datetime
    updated_at: datetime
    category: CategoryPublic | None = None


class CoursePreviewPublic(SQLModel):
    course_id: int
    title: str
    description: str | None = None
    progress_percent: float
    category: CategoryPublic | None = None


class HomeCoursesResponse(SQLModel):
    all_courses: list[CoursePreviewPublic]
    my_courses: list[CoursePreviewPublic]




class CategoryPublic(SQLModel):
    id: int
    title: str


class CourseDetailPublic(SQLModel):
    id: int
    title: str
    description: str | None = None
    is_published: bool
    category_id: int | None = None
    progress_percent: float
    created_at: datetime
    updated_at: datetime
    category: CategoryPublic | None = None


class CategoryPublic(SQLModel):
    id: int
    title: str


class CoursePreviewPublic(SQLModel):
    course_id: int
    title: str
    description: str | None = None
    progress_percent: float
    category: CategoryPublic | None = None


@router.get("/home", response_model=HomeCoursesResponse)
def get_home_courses(
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user_id),
):
    courses = session.exec(
        select(Course)
        .where(Course.is_published.is_(True))
        .order_by(Course.id)
    ).all()

    user_courses = session.exec(
        select(UserCourse)
        .where(UserCourse.user_id == user_id)
        .order_by(UserCourse.id)
    ).all()

    progress_map = {
        user_course.course_id: user_course.progress_percent
        for user_course in user_courses
    }

    all_courses_result = []
    my_courses_result = []

    for course in courses:
        preview = CoursePreviewPublic(
            course_id=course.id,
            title=course.title,
            description=course.description,
            progress_percent=progress_map.get(course.id, 0),
            category=CategoryPublic(
                id=course.category.id,
                title=course.category.title,
            ) if course.category else None,
        )

        all_courses_result.append(preview)

    for user_course in user_courses:
        course = user_course.course

        if not course or not course.is_published:
            continue

        my_courses_result.append(
            CoursePreviewPublic(
                course_id=course.id,
                title=course.title,
                description=course.description,
                progress_percent=user_course.progress_percent,
                category=CategoryPublic(
                    id=course.category.id,
                    title=course.category.title,
                ) if course.category else None,
            )
        )

    return HomeCoursesResponse(
        all_courses=all_courses_result,
        my_courses=my_courses_result,
    )


@router.get("/{course_id}", response_model=CourseDetailPublic)
def get_course_by_id(
    course_id: int,
    session: Session = Depends(get_session),
    user_id: int = Depends(get_current_user_id),
):
    course = session.exec(
        select(Course).where(
            Course.id == course_id,
            Course.is_published.is_(True),
        )
    ).first()

    if not course:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Course not found",
        )

    user_course = session.exec(
        select(UserCourse).where(
            UserCourse.user_id == user_id,
            UserCourse.course_id == course_id,
        )
    ).first()

    return CourseDetailPublic(
        id=course.id,
        title=course.title,
        description=course.description,
        is_published=course.is_published,
        category_id=course.category_id,
        progress_percent=user_course.progress_percent if user_course else None,
        created_at=course.created_at,
        updated_at=course.updated_at,
        category=CategoryPublic(
            id=course.category.id,
            title=course.category.title,
        ) if course.category else None,
    )

