'use client';

import styles from "./sidebar.module.css";
import CoinIcon from "@/shared/assets/icons/coin.svg";

interface SidebarLesson {
  lessonId: string;
  title: string;
}

interface SidebarTheme {
  themeId: string;
  title: string;
  lessons: SidebarLesson[];
}

interface SidebarModule {
  moduleId: string;
  title: string;
  themes: SidebarTheme[];
}

interface SidebarProps {
  totalSteps: number;
  completedSteps: number;
  isOpen: boolean;
  onToggle: () => void;
  courseTitle?: string;
  modules: SidebarModule[];
  activeModuleId?: string;
  activeThemeId?: string;
  activeLessonId?: string;
  onThemeSelect: (themeId: string) => void;
  onLessonSelect: (themeId: string, lessonId: string) => void;
}

export default function Sidebar({
  totalSteps,
  completedSteps,
  isOpen,
  onToggle,
  courseTitle = "Название курса",
  modules,
  activeModuleId,
  activeThemeId,
  activeLessonId,
  onThemeSelect,
  onLessonSelect,
}: SidebarProps) {
  const safeTotalSteps = Math.max(totalSteps, 1);
  const safeCompletedSteps = Math.min(Math.max(completedSteps, 0), safeTotalSteps);
  const progressPercent = Math.round((safeCompletedSteps / safeTotalSteps) * 100);

  return (
    <aside className={`${styles.wrapper} ${!isOpen ? styles.collapsed : ""}`}>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={onToggle}
        aria-label={isOpen ? "Свернуть сайдбар" : "Открыть сайдбар"}
      >
        {isOpen ? ">" : "<"}
      </button>

      <div className={styles.sidebarBody}>
        <h2 className={styles.title2}>{courseTitle}</h2>
        <h3 className={styles.title3}>Шаг {safeCompletedSteps} из {safeTotalSteps}</h3>
        <div className={styles.coinsRow}>
          <span className={styles.coinsText}>Пройдено {safeCompletedSteps} из {safeTotalSteps}</span>
          <img className={styles.coinIcon} src={CoinIcon.src} alt="Монета" />
        </div>
        <h3 className={styles.title3}>Прогресс</h3>

        <div className={styles.progressTrack}>
          <div className={styles.progressFill} style={{ width: `${progressPercent}%` }} />
        </div>

        <h3 className={`${styles.title3} ${styles.modulesTitle}`}>Содержание</h3>

        <div className={styles.module}>
          <ul className={styles.moduleList}>
            {modules.map((module) => {
              const isModuleActive = module.moduleId === activeModuleId;

              return (
                <li className={styles.moduleItem} key={module.moduleId}>
                  <p className={`${styles.moduleTitle} ${isModuleActive ? styles.moduleTitleActive : ""}`.trim()}>
                    {module.title}
                  </p>

                  <ul className={styles.themeList}>
                    {module.themes.map((theme) => {
                      const isThemeActive = theme.themeId === activeThemeId;

                      return (
                        <li className={styles.themeItem} key={theme.themeId}>
                          <button
                            type="button"
                            className={`${styles.themeButton} ${isThemeActive ? styles.themeButtonActive : ""}`.trim()}
                            onClick={() => onThemeSelect(theme.themeId)}
                          >
                            {theme.title}
                          </button>
                          <ul className={styles.lessonList}>
                            {theme.lessons.map((lesson) => {
                              const isLessonActive =
                                theme.themeId === activeThemeId && lesson.lessonId === activeLessonId;

                              return (
                                <li key={`${theme.themeId}-${lesson.lessonId}`}>
                                  <button
                                    type="button"
                                    className={`${styles.lessonButton} ${isLessonActive ? styles.lessonButtonActive : ""}`.trim()}
                                    onClick={() => onLessonSelect(theme.themeId, lesson.lessonId)}
                                  >
                                    {lesson.title}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}
