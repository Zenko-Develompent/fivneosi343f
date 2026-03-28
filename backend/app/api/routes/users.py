from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Field, SQLModel, Session, select

from app.core.db import get_session
from app.core.security import (
    create_tokens,
    get_current_user_id,
    hash_password,
    refresh_user_id,
    verify_password,
)
from app.models.models import AchievementUser, Role, User, UserCourse
from app.services.course_progress import recalculate_user_course_progress
from app.services.give_achievement import check_and_award_level_achievements

router = APIRouter(prefix="/users", tags=["users"])


class UserAchievementPublic(SQLModel):
    id: int
    title: str
    description: str | None = None
    icon_url: str | None = None
    xp_reward: int
    condition_value: int | None = None
    received_at: datetime


class CategoryPublic(SQLModel):
    id: int
    title: str


class MyCoursePublic(SQLModel):
    course_id: int
    title: str
    description: str | None = None
    is_published: bool
    progress_percent: float
    xp_earned: int
    status: str
    category: CategoryPublic | None = None


class UserPublic(SQLModel):
    id: int
    first_name: str
    last_name: str | None = None
    mail: str
    level: int
    total_xp: int
    role_id: int
    courses: list[MyCoursePublic] = Field(default_factory=list)


class UserRegister(SQLModel):
    first_name: str
    last_name: str | None = None
    mail: str
    password: str


class UserLogin(SQLModel):
    mail: str
    password: str


class RolePublic(SQLModel):
    id: int
    name: str


@router.post("/register")
def register_user(payload: UserRegister, session: Session = Depends(get_session)):
    existing_user = session.exec(select(User).where(User.mail == payload.mail)).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    user_role = session.exec(select(Role).where(Role.name == "user")).first()
    if not user_role:
        user_role = Role(name="user")
        session.add(user_role)
        session.commit()
        session.refresh(user_role)

    new_user = User(
        first_name=payload.first_name,
        last_name=payload.last_name,
        mail=payload.mail,
        password=hash_password(payload.password),
        role_id=user_role.id,
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user


@router.post("/login")
def login(payload: UserLogin, session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.mail == payload.mail)).first()
    if not user or not verify_password(payload.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Wrong password or username",
        )

    access_token, refresh_token = create_tokens(user.id)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.get("/me", response_model=UserPublic)
def get_my_profile(
    user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session),
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user token. Please log in again.",
        )

    check_and_award_level_achievements(session=session, user=user)

    user_courses = session.exec(select(UserCourse).where(UserCourse.user_id == user_id)).all()
    progress_map: dict[int, float] = {}
    for user_course in user_courses:
        progress_map[user_course.course_id] = recalculate_user_course_progress(
            session=session,
            user_id=user_id,
            course_id=user_course.course_id,
        )

    session.commit()

    courses: list[MyCoursePublic] = []
    for user_course in user_courses:
        course = user_course.course
        if not course or not course.is_published:
            continue

        courses.append(
            MyCoursePublic(
                course_id=course.id,
                title=course.title,
                description=course.description,
                is_published=course.is_published,
                progress_percent=progress_map.get(course.id, user_course.progress_percent),
                xp_earned=user_course.xp_earned,
                status=user_course.status.value,
                category=CategoryPublic(
                    id=course.category.id,
                    title=course.category.title,
                )
                if course.category
                else None,
            )
        )

    return UserPublic(
        id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        mail=user.mail,
        level=user.level,
        total_xp=user.total_xp,
        role_id=user.role_id,
        courses=courses,
    )


@router.get("/refresh")
def refresh_user(
    user_id: int = Depends(refresh_user_id),
    session: Session = Depends(get_session),
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token. Please log in again.",
        )

    access_token, refresh_token = create_tokens(user_id)
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
    }


@router.get("/roles", response_model=list[RolePublic])
def get_roles(session: Session = Depends(get_session)):
    return session.exec(select(Role).order_by(Role.id)).all()


@router.get("/me/achievements", response_model=list[UserAchievementPublic])
def get_my_achievements(
    user_id: int = Depends(get_current_user_id),
    session: Session = Depends(get_session),
):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user token. Please log in again.",
        )

    check_and_award_level_achievements(session=session, user=user)
    session.commit()

    achievement_links = session.exec(
        select(AchievementUser)
        .where(AchievementUser.user_id == user_id)
        .order_by(AchievementUser.created_at.desc())
    ).all()

    result: list[UserAchievementPublic] = []
    for link in achievement_links:
        achievement = link.achievement
        if not achievement:
            continue
        if achievement.xp_reward <= 0:
            continue

        result.append(
            UserAchievementPublic(
                id=achievement.id,
                title=achievement.title,
                description=achievement.description,
                icon_url=achievement.icon_url,
                xp_reward=achievement.xp_reward,
                condition_value=achievement.condition_value,
                received_at=link.created_at,
            )
        )

    return result
