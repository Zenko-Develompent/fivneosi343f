from sqlmodel import Session, select

from app.models.models import Achievement, AchievementUser, User


LEVEL_ACHIEVEMENTS: tuple[dict[str, int | str], ...] = (
    {
        "level": 1,
        "title": "Уровень 1",
        "description": "Достигнут 1 уровень",
    },
    {
        "level": 5,
        "title": "Уровень 5",
        "description": "Достигнут 5 уровень",
    },
    {
        "level": 10,
        "title": "Уровень 10",
        "description": "Достигнут 10 уровень",
    },
)


def ensure_level_achievements(session: Session) -> list[tuple[int, Achievement]]:
    result: list[tuple[int, Achievement]] = []

    for item in LEVEL_ACHIEVEMENTS:
        level = int(item["level"])
        title = str(item["title"])
        description = str(item["description"])

        achievement = session.exec(
            select(Achievement).where(Achievement.title == title)
        ).first()

        if not achievement:
            achievement = Achievement(
                title=title,
                description=description,
                # frontend card currently uses xp_reward as badge value
                xp_reward=level,
                is_active=True,
                condition_value=level,
            )
        else:
            achievement.description = description
            achievement.xp_reward = level
            achievement.is_active = True
            achievement.condition_value = level

        session.add(achievement)
        session.flush()
        result.append((level, achievement))

    return result


def check_and_award_level_achievements(
    session: Session,
    user: User,
) -> list[Achievement]:
    level_achievements = ensure_level_achievements(session)
    eligible_ids = [
        achievement.id
        for required_level, achievement in level_achievements
        if user.level >= required_level
    ]

    if not eligible_ids:
        return []

    owned_ids = set(
        session.exec(
            select(AchievementUser.achievement_id).where(
                AchievementUser.user_id == user.id,
                AchievementUser.achievement_id.in_(eligible_ids),
            )
        ).all()
    )

    awarded: list[Achievement] = []

    for required_level, achievement in level_achievements:
        if user.level < required_level:
            continue

        if achievement.id in owned_ids:
            continue

        session.add(
            AchievementUser(
                user_id=user.id,
                achievement_id=achievement.id,
            )
        )
        awarded.append(achievement)

    return awarded
