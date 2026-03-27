"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/header/header";
import Sidebar from "@/components/sidebar/sidebar";
import Button from "@/components/button/button";
import PythonCompiler, {
  preloadPythonCompilerAssets,
} from "@/components/pythonCompiler/pythonCompiler";
import styles from "./course.module.css";

type CourseItem =
  | {
      type: "theme";
      themeId: string;
      title: string;
      text: string;
    }
  | {
      type: "lesson";
      themeId: string;
      lessonId: string;
      title: string;
      text: string;
    };

const COURSE_THEMES = [
  {
    themeId: "theme-1",
    title: "Модуль 1. Первые шаги: от переменных до ветвления",
    lessons: [
      { lessonId: "lesson-1", title: "Урок 1. Знакомство со средой (Replit / Thonny)" },
      { lessonId: "lesson-2", title: "Урок 2. Типы данных и конфиденциальность" },
    ],
  },
  {
    themeId: "theme-2",
    title: "Модуль 2. Шифровальщик (циклы и списки)",
    lessons: [
      { lessonId: "lesson-1", title: "Урок 3. Шифр Цезаря" },
      { lessonId: "lesson-2", title: "Урок 4. Генератор надежных паролей" },
      { lessonId: "lesson-3", title: "Урок 5. Проверка «утечки» пароля" },
    ],
  },
  {
    themeId: "theme-3",
    title: "Модуль 3. Защита данных и работа с файлами",
    lessons: [
      { lessonId: "lesson-1", title: "Урок 6. Менеджер паролей (простой)" },
      { lessonId: "lesson-2", title: "Урок 7. Антивирусный сканер (симуляция)" },
    ],
  },
] as const;

const COURSE_FLOW: CourseItem[] = [
  {
    type: "theme",
    themeId: "theme-1",
    title: "Модуль 1. Первые шаги: от переменных до ветвления",
    text:
      "Курс: «Python для исследователей: Кодим безопасно».\n" +
      "Возраст: 10–13 лет.\n" +
      "Цель: освоить основы Python и применить их для защиты данных: шифрование, проверка паролей, аккуратная работа с кодом и файлами.\n\n" +
      "В этом модуле ты познакомишься со средой разработки и научишься работать с переменными, вводом и выводом, строками и условиями if.",
  },
  {
    type: "lesson",
    themeId: "theme-1",
    lessonId: "lesson-1",
    title: "Урок 1. Знакомство со средой (Replit / Thonny)",
    text:
      "Сегодня запускаем первую программу!\n\n" +
      "Задание:\n" +
      "1. Напиши программу, которая спрашивает имя пользователя.\n" +
      "2. Выведи фразу: «Привет, [имя]! Твой пароль слишком простой?»\n\n" +
      "Подсказка: используй input() и print().",
  },
  {
    type: "lesson",
    themeId: "theme-1",
    lessonId: "lesson-2",
    title: "Урок 2. Типы данных и конфиденциальность",
    text:
      "Разберем, почему нельзя показывать пароль полностью.\n\n" +
      "Задание:\n" +
      "1. Запроси у пользователя email и пароль.\n" +
      "2. Покажи только первые 3 символа пароля.\n" +
      "3. Остальные символы замени на звездочки.\n\n" +
      "Пример: qwerty123 -> qwe******",
  },
  {
    type: "theme",
    themeId: "theme-2",
    title: "Модуль 2. Шифровальщик (циклы и списки)",
    text:
      "Теперь ты станешь крипто-исследователем.\n" +
      "Мы научимся шифровать текст, генерировать надежные пароли и проверять слабые комбинации.\n\n" +
      "Ключевые темы: циклы, строки, списки, модуль random.",
  },
  {
    type: "lesson",
    themeId: "theme-2",
    lessonId: "lesson-1",
    title: "Урок 3. Шифр Цезаря",
    text:
      "Секретные сообщения начинаются с простых алгоритмов.\n\n" +
      "Задание:\n" +
      "1. Запроси сообщение у пользователя.\n" +
      "2. Сдвигай каждую букву на 3 позиции вперед.\n" +
      "3. Выведи зашифрованный текст.\n\n" +
      "Дополнительно: попробуй сделать и обратную расшифровку.",
  },
  {
    type: "lesson",
    themeId: "theme-2",
    lessonId: "lesson-2",
    title: "Урок 4. Генератор надежных паролей",
    text:
      "Надежный пароль — основа безопасности.\n\n" +
      "Задание:\n" +
      "1. Используй random.\n" +
      "2. Сгенерируй пароль длиной 12 символов.\n" +
      "3. Включи в него: маленькие и большие буквы, цифры, символы !@#$.\n\n" +
      "Проверь, чтобы в пароле были символы разных типов.",
  },
  {
    type: "lesson",
    themeId: "theme-2",
    lessonId: "lesson-3",
    title: "Урок 5. Проверка «утечки» пароля",
    text:
      "Некоторые пароли слишком популярны и небезопасны.\n\n" +
      "Задание:\n" +
      "1. Попроси пользователя ввести пароль.\n" +
      "2. Если пароль равен 123456 или password — выведи предупреждение:\n" +
      "   «Этот пароль в топе самых ненадежных!»\n" +
      "3. Иначе выведи: «Пароль выглядит лучше, но всегда проверяй сложность».",
  },
  {
    type: "theme",
    themeId: "theme-3",
    title: "Модуль 3. Защита данных и работа с файлами",
    text:
      "Переходим к файлам и безопасному коду.\n" +
      "Ты поймешь, как хранить данные, чем опасны некоторые команды и как делать простую автоматическую проверку текста программы.",
  },
  {
    type: "lesson",
    themeId: "theme-3",
    lessonId: "lesson-1",
    title: "Урок 6. Менеджер паролей (простой)",
    text:
      "Делаем мини-хранилище паролей.\n\n" +
      "Задание:\n" +
      "1. Создай программу, которая сохраняет пары (сайт, пароль) в текстовый файл.\n" +
      "2. Протестируй режимы записи:\n" +
      "   - 'w' — перезаписывает файл (старые данные стираются).\n" +
      "   - 'a' — добавляет новые записи в конец.\n\n" +
      "Цель: понять, почему 'w' может быть опасным в реальной жизни.",
  },
  {
    type: "lesson",
    themeId: "theme-3",
    lessonId: "lesson-2",
    title: "Урок 7. Антивирусный сканер (симуляция)",
    text:
      "Финальный проект курса.\n\n" +
      "Задание:\n" +
      "1. Прочитай текстовый файл с кодом.\n" +
      "2. Проверь, есть ли в нем «плохие» команды: eval, exec, os.system.\n" +
      "3. Если нашел — выдай предупреждение.\n" +
      "4. Если не нашел — напиши, что файл выглядит безопаснее.\n\n" +
      "Это не настоящий антивирус, но отличный первый шаг к безопасному программированию.",
  },
];

export default function CourseTheoryPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalFlowSteps = COURSE_FLOW.length;
  const currentStep = currentIndex + 1;
  const isLastStep = currentIndex === COURSE_FLOW.length - 1;

  const currentItem = useMemo(() => COURSE_FLOW[currentIndex], [currentIndex]);
  const currentThemeItems = useMemo(
    () => COURSE_FLOW.filter((item) => item.themeId === currentItem.themeId),
    [currentItem]
  );

  const currentThemeStep = useMemo(() => {
    const idx = currentThemeItems.findIndex((item) => {
      if (item.type !== currentItem.type) return false;
      if (item.type === "theme" && currentItem.type === "theme") {
        return item.themeId === currentItem.themeId;
      }
      if (item.type === "lesson" && currentItem.type === "lesson") {
        return item.lessonId === currentItem.lessonId;
      }
      return false;
    });
    return idx === -1 ? 1 : idx + 1;
  }, [currentItem, currentThemeItems]);

  const shouldShowCompiler = currentItem.type === "lesson";

  const activeThemeId = currentItem.themeId;
  const activeLessonId = currentItem.type === "lesson" ? currentItem.lessonId : undefined;

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

  const handleThemeSelect = (themeId: string) => {
    const index = COURSE_FLOW.findIndex(
      (item) => item.type === "theme" && item.themeId === themeId
    );
    if (index !== -1) setCurrentIndex(index);
  };

  const handleLessonSelect = (themeId: string, lessonId: string) => {
    const index = COURSE_FLOW.findIndex(
      (item) =>
        item.type === "lesson" &&
        item.themeId === themeId &&
        item.lessonId === lessonId
    );
    if (index !== -1) setCurrentIndex(index);
  };

  const handleNext = () => {
    if (isLastStep) return;
    setCurrentIndex((prev) => prev + 1);
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
          courseTitle="Python для исследователей: Кодим безопасно"
          themes={COURSE_THEMES.map((theme) => ({
            themeId: theme.themeId,
            title: theme.title,
            lessons: theme.lessons.map((lesson) => ({
              lessonId: lesson.lessonId,
              title: lesson.title,
            })),
          }))}
          activeThemeId={activeThemeId}
          activeLessonId={activeLessonId}
          onThemeSelect={handleThemeSelect}
          onLessonSelect={handleLessonSelect}
        />

        <main className={styles.content}>
          <div className={styles.stepBanner}>
            <div className={styles.stepBannerTop}>
              Шаг {currentThemeStep} из {currentThemeItems.length}
            </div>
            <div className={styles.stepBannerBottom}>
              <div className={styles.stepSegments}>
                {currentThemeItems.map((item, index) => {
                  const key =
                    item.type === "theme"
                      ? `${item.themeId}-theme`
                      : `${item.themeId}-${item.lessonId}`;
                  return (
                    <span
                      key={key}
                      className={`${styles.stepSegment} ${
                        index + 1 === currentThemeStep ? styles.stepSegmentActive : ""
                      }`}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <h1 className={styles.contentTitle}>{currentItem.title}</h1>
          <p className={styles.contentText}>{currentItem.text}</p>

          {shouldShowCompiler && (
            <div className={styles.compilerBlock}>
              <PythonCompiler title="Практика в Python" />
            </div>
          )}

          <div className={styles.nextButton}>
            <Button
              size="m"
              variant="filled"
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
