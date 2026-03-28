from datetime import datetime, timezone

from sqlmodel import Session, select

from app.models.models import (
    Module,
    Task,
    TaskType,
    Topic,
    UserAnswer,
    UserCourse,
    UserCourseStatus,
)


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def recalculate_user_course_progress(
    session: Session,
    user_id: int,
    course_id: int,
) -> float:
    user_course = session.exec(
        select(UserCourse).where(
            UserCourse.user_id == user_id,
            UserCourse.course_id == course_id,
        )
    ).first()

    if not user_course:
        return 0

    task_ids = session.exec(
        select(Task.id)
        .join(Topic, Topic.id == Task.topic_id)
        .join(Module, Module.id == Topic.module_id)
        .where(
            Module.course_id == course_id,
            Task.is_published.is_(True),
            Task.task_type != TaskType.LECTURE,
        )
    ).all()

    total_tasks = len(task_ids)

    if total_tasks == 0:
        progress_percent = 0.0
    else:
        solved_task_ids = set(
            session.exec(
                select(UserAnswer.task_id).where(
                    UserAnswer.user_id == user_id,
                    UserAnswer.task_id.in_(task_ids),
                    UserAnswer.is_correct.is_(True),
                )
            ).all()
        )
        progress_percent = round((len(solved_task_ids) / total_tasks) * 100, 2)

    user_course.progress_percent = progress_percent

    if progress_percent <= 0:
        user_course.status = UserCourseStatus.NOT_STARTED
    elif progress_percent >= 100:
        user_course.status = UserCourseStatus.COMPLETED
        if not user_course.started_at:
            user_course.started_at = utc_now()
        if not user_course.completed_at:
            user_course.completed_at = utc_now()
    else:
        user_course.status = UserCourseStatus.IN_PROGRESS
        if not user_course.started_at:
            user_course.started_at = utc_now()

    session.add(user_course)
    return progress_percent
