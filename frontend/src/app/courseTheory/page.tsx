"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Button from "@/components/button/button";
import PythonCompiler, {
  preloadPythonCompilerAssets,
} from "@/components/pythonCompiler/pythonCompiler";
import GuessCodeGame from "@/components/games/guessCode/guessCode";
import FixCodeGame from "@/components/games/fixCode/fixCode";
import MemoryMatchGame from "@/components/games/memoryMatch/memoryMatch";
import { COURSE_THEORY_PAYLOADS } from "./mockCourseData";
import type { CourseItemDTO, CourseLessonItemDTO, CourseTheoryPayloadDTO } from "./types";
import styles from "./course.module.css";

function getCourseItemKey(item: CourseItemDTO): string {
  if (item.type === "theme") {
    return `${item.moduleId}-${item.themeId}-theme`;
  }

  if (item.type === "lesson") {
    return `${item.moduleId}-${item.themeId}-${item.lessonId}`;
  }

  return `${item.moduleId}-${item.themeId}-${item.gameId}`;
}

function getFallbackCourse(): CourseTheoryPayloadDTO | undefined {
  return COURSE_THEORY_PAYLOADS[0];
}

export default function CourseTheoryPage() {
  const [selectedCourseId, setSelectedCourseId] = useState(getFallbackCourse()?.courseId ?? "");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const coursePayload = useMemo(() => {
    const found = COURSE_THEORY_PAYLOADS.find((course) => course.courseId === selectedCourseId);
    return found ?? getFallbackCourse();
  }, [selectedCourseId]);

  const courseFlow = coursePayload?.flow ?? [];

  useEffect(() => {
    const warmup = () => {
      void preloadPythonCompilerAssets();
    };

    if (typeof globalThis.requestIdleCallback === "function") {
      const idleId = globalThis.requestIdleCallback(warmup, { timeout: 1500 });
      return () => globalThis.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(warmup, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCourseId]);

  if (!coursePayload || courseFlow.length === 0) {
    return (
      <div>
        <Header />
        <main className={styles.emptyState}>Курс пока не заполнен.</main>
      </div>
    );
  }

  const safeIndex = Math.min(currentIndex, Math.max(courseFlow.length - 1, 0));
  const totalFlowSteps = courseFlow.length;
  const currentStep = safeIndex + 1;
  const isLastStep = safeIndex === courseFlow.length - 1;

  const currentItem = courseFlow[safeIndex];
  const currentThemeItems = courseFlow.filter((item) => item.themeId === currentItem.themeId);
  const currentThemeStep = Math.max(
    currentThemeItems.findIndex((item) => getCourseItemKey(item) === getCourseItemKey(currentItem)) + 1,
    1
  );

  const currentLesson: CourseLessonItemDTO | null = currentItem.type === "lesson" ? currentItem : null;
  const currentGame = currentItem.type === "game" ? currentItem : null;
  const shouldShowCompiler = Boolean(currentLesson && currentLesson.showCompiler !== false);

  const activeModuleId = currentItem.moduleId;
  const activeThemeId = currentItem.themeId;
  const activeLessonId =
    currentItem.type === "lesson"
      ? currentItem.lessonId
      : currentItem.type === "game"
        ? currentItem.lessonId
        : undefined;

  const currentContent =
    currentItem.type === "game"
      ? currentItem.description
      : (currentItem.contentMd ?? currentItem.text);

  const handleThemeSelect = (themeId: string) => {
    const index = courseFlow.findIndex((item) => item.type === "theme" && item.themeId === themeId);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handleLessonSelect = (themeId: string, lessonId: string) => {
    const index = courseFlow.findIndex(
      (item) => item.type === "lesson" && item.themeId === themeId && item.lessonId === lessonId
    );
    if (index !== -1) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, courseFlow.length - 1));
  };

  return (
    <div>
      <Header />
      <div className={styles.page}>
        <Sidebar
          totalSteps={totalFlowSteps}
          completedSteps={currentStep}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen((prev) => !prev)}
          courseTitle={coursePayload.courseTitle}
          modules={coursePayload.modules.map((module) => ({
            moduleId: module.moduleId,
            title: module.title,
            themes: module.themes.map((theme) => ({
              themeId: theme.themeId,
              title: theme.title,
              lessons: theme.lessons.map((lesson) => ({
                lessonId: lesson.lessonId,
                title: lesson.title,
              })),
            })),
          }))}
          activeModuleId={activeModuleId}
          activeThemeId={activeThemeId}
          activeLessonId={activeLessonId}
          onThemeSelect={handleThemeSelect}
          onLessonSelect={handleLessonSelect}
        />

        <main className={styles.content}>
          <div className={styles.courseSwitch}>
            {COURSE_THEORY_PAYLOADS.map((course) => (
              <Button
                key={course.courseId}
                title={course.courseTitle}
                size="s"
                variant={selectedCourseId === course.courseId ? "filled" : "outline"}
                color={selectedCourseId === course.courseId ? "logo" : "blue"}
                className={styles.courseSwitchButton}
                onClick={() => setSelectedCourseId(course.courseId)}
              />
            ))}
          </div>

          {coursePayload.audience && <p className={styles.audienceText}>Аудитория: {coursePayload.audience}</p>}

          <div className={styles.stepBanner}>
            <div className={styles.stepBannerTop}>
              Шаг {currentThemeStep} из {currentThemeItems.length}
            </div>
            <div className={styles.stepBannerBottom}>
              <div className={styles.stepSegments}>
                {currentThemeItems.map((item, index) => (
                  <span
                    key={getCourseItemKey(item)}
                    className={`${styles.stepSegment} ${
                      index + 1 === currentThemeStep ? styles.stepSegmentActive : ""
                    }`.trim()}
                  />
                ))}
              </div>
            </div>
          </div>

          <h1 className={styles.contentTitle}>{currentItem.title}</h1>
          {currentContent && <p className={styles.contentText}>{currentContent}</p>}

          {currentLesson && (
            <div className={styles.practiceStack}>
              {shouldShowCompiler && (
                <div className={styles.compilerBlock}>
                  <PythonCompiler
                    key={`compiler-${currentLesson.moduleId}-${currentLesson.themeId}-${currentLesson.lessonId}`}
                    title="Практика в Python"
                    initialCode=""
                  />
                </div>
              )}
            </div>
          )}

          {currentGame && (
            <section className={styles.gameBlock}>
              {currentGame.gameType === "memoryMatch" && currentGame.memoryPairs && (
                <MemoryMatchGame pairs={currentGame.memoryPairs} />
              )}

              {currentGame.gameType === "guessCode" && currentGame.guessCodeQuestions && (
                <GuessCodeGame questions={currentGame.guessCodeQuestions} />
              )}

              {currentGame.gameType === "fixCode" && currentGame.fixCodeTasks && (
                <FixCodeGame tasks={currentGame.fixCodeTasks} />
              )}
            </section>
          )}

          <div className={styles.nextButton}>
            <Button
              size="m"
              variant="filled"
              color="logo"
              fullWidth
              title={isLastStep ? "В каталог" : "Дальше"}
              onClick={handleNext}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
