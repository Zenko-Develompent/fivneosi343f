import type { TaskTreePublic } from "@/shared/api/client";

type LessonKey =
  | "variables"
  | "conditions"
  | "loops"
  | "functions"
  | "passwords"
  | "phishing"
  | "factcheck"
  | "privacy"
  | "generic-programming"
  | "generic-digital";

export type LessonInteractionType = "theory" | "singleQuestion" | "compiler";

interface SingleQuestionOption {
  id: string;
  label: string;
}

interface LessonSingleQuestion {
  prompt: string;
  options: SingleQuestionOption[];
}

export interface LessonEnhancement {
  interactionType: LessonInteractionType;
  compilerTitle?: string;
  compilerInitialCode?: string;
  singleQuestion?: LessonSingleQuestion;
}

const QUIZ_SINGLE_QUESTION_BY_KEY: Record<LessonKey, LessonSingleQuestion> = {
  variables: {
    prompt: "Какой тип данных хранит текст в Python?",
    options: [
      { id: "a", label: "str" },
      { id: "b", label: "int" },
      { id: "c", label: "float" },
    ],
  },
  conditions: {
    prompt: "Какое слово используют после if для альтернативной проверки?",
    options: [
      { id: "a", label: "elif" },
      { id: "b", label: "break" },
      { id: "c", label: "print" },
    ],
  },
  loops: {
    prompt: "Какой цикл чаще всего используют вместе с range()?",
    options: [
      { id: "a", label: "for" },
      { id: "b", label: "while" },
      { id: "c", label: "class" },
    ],
  },
  functions: {
    prompt: "Какое слово возвращает результат функции?",
    options: [
      { id: "a", label: "return" },
      { id: "b", label: "input" },
      { id: "c", label: "continue" },
    ],
  },
  passwords: {
    prompt: "Что обязательно стоит включить для защиты аккаунта?",
    options: [
      { id: "a", label: "2fa" },
      { id: "b", label: "короткий пароль" },
      { id: "c", label: "одинаковый пароль везде" },
    ],
  },
  phishing: {
    prompt: "Что нельзя никому сообщать даже знакомым людям?",
    options: [
      { id: "a", label: "не сообщать пароль" },
      { id: "b", label: "название игры" },
      { id: "c", label: "любимый цвет" },
    ],
  },
  factcheck: {
    prompt: "С чего начать проверку новости?",
    options: [
      { id: "a", label: "проверка источника" },
      { id: "b", label: "сразу переслать" },
      { id: "c", label: "доверять заголовку" },
    ],
  },
  privacy: {
    prompt: "Какой ответ связан с защитой личных данных?",
    options: [
      { id: "a", label: "приватность" },
      { id: "b", label: "публикация пароля" },
      { id: "c", label: "открытый профиль для всех" },
    ],
  },
  "generic-programming": {
    prompt: "Какой ответ чаще всего верный для темы функций?",
    options: [
      { id: "a", label: "return" },
      { id: "b", label: "hello" },
      { id: "c", label: "name" },
    ],
  },
  "generic-digital": {
    prompt: "Какое действие безопаснее в интернете?",
    options: [
      { id: "a", label: "проверить источник" },
      { id: "b", label: "сообщить пароль" },
      { id: "c", label: "кликнуть по любой ссылке" },
    ],
  },
};

const PRACTICE_SINGLE_QUESTION_BY_KEY: Partial<Record<LessonKey, LessonSingleQuestion>> = {
  passwords: {
    prompt: "Что добавляет дополнительную защиту аккаунту?",
    options: [
      { id: "a", label: "2fa" },
      { id: "b", label: "одинаковый пароль везде" },
      { id: "c", label: "короткий пароль" },
    ],
  },
  phishing: {
    prompt: "Какое действие безопасно при проверке подозрительного письма?",
    options: [
      { id: "a", label: "проверка домена" },
      { id: "b", label: "переход по ссылке сразу" },
      { id: "c", label: "передать код из SMS" },
    ],
  },
  factcheck: {
    prompt: "С чего лучше начать проверку новости?",
    options: [
      { id: "a", label: "первоисточник" },
      { id: "b", label: "репост без проверки" },
      { id: "c", label: "довериться заголовку" },
    ],
  },
  privacy: {
    prompt: "Какой пункт относится к плану цифровой безопасности?",
    options: [
      { id: "a", label: "ограничить видимость профиля" },
      { id: "b", label: "публиковать пароль" },
      { id: "c", label: "открыть все доступы приложениям" },
    ],
  },
};

const COMPILER_CODE_BY_KEY: Record<
  Exclude<LessonKey, "passwords" | "phishing" | "factcheck" | "privacy" | "generic-digital">,
  string
> = {
  variables: "name = 'Лена'\nage = 9\ncity = 'Москва'\nprint(name, age, city)",
  conditions:
    "age = 9\nif age < 8:\n    print('Младшая группа')\nelif age < 11:\n    print('Средняя группа')\nelse:\n    print('Старшая группа')",
  loops: "for i in range(1, 4):\n    print('Шаг', i)",
  functions:
    "def add(a, b):\n    return a + b\n\ndef sub(a, b):\n    return a - b\n\ndef mul(a, b):\n    return a * b\n\ndef div(a, b):\n    return a / b\n\nprint(add(2, 3))",
  "generic-programming": "print('Я учу Python!')",
};

function isProgrammingCategory(categoryTitle: string): boolean {
  const normalized = categoryTitle.trim().toLowerCase();
  return (
    normalized.includes("программ") ||
    normalized.includes("python") ||
    normalized.includes("code")
  );
}

function detectLessonKey(sourceText: string, isProgramming: boolean): LessonKey {
  if (isProgramming) {
    if (sourceText.includes("перемен") || sourceText.includes("тип")) return "variables";
    if (sourceText.includes("услов") || sourceText.includes("if") || sourceText.includes("лог"))
      return "conditions";
    if (sourceText.includes("цикл") || sourceText.includes("range") || sourceText.includes("while"))
      return "loops";
    if (sourceText.includes("функц") || sourceText.includes("def") || sourceText.includes("return"))
      return "functions";
    return "generic-programming";
  }

  if (sourceText.includes("парол") || sourceText.includes("2fa")) return "passwords";
  if (sourceText.includes("учетн")) return "passwords";
  if (sourceText.includes("фиш") || sourceText.includes("подозр")) return "phishing";
  if (sourceText.includes("критическ")) return "factcheck";
  if (sourceText.includes("факт") || sourceText.includes("источник") || sourceText.includes("новост"))
    return "factcheck";
  if (sourceText.includes("приват") || sourceText.includes("след")) return "privacy";
  if (sourceText.includes("безопасное поведение")) return "privacy";
  return "generic-digital";
}

function resolveInteractionType(
  lesson: TaskTreePublic,
  isProgramming: boolean
): LessonInteractionType {
  if (lesson.task_type === "lecture") {
    return "theory";
  }

  if (lesson.task_type === "practice" && isProgramming) {
    return "compiler";
  }

  return "singleQuestion";
}

export function getLessonEnhancement(
  categoryTitle: string | null | undefined,
  lesson: TaskTreePublic
): LessonEnhancement {
  const isProgramming = isProgrammingCategory(categoryTitle ?? "");
  const sourceText = `${lesson.title} ${lesson.description ?? ""}`.toLowerCase();
  const key = detectLessonKey(sourceText, isProgramming);
  const interactionType = resolveInteractionType(lesson, isProgramming);

  if (interactionType === "theory") {
    return { interactionType };
  }

  if (interactionType === "singleQuestion") {
    const singleQuestion =
      (lesson.task_type === "practice" && !isProgramming
        ? PRACTICE_SINGLE_QUESTION_BY_KEY[key]
        : undefined) ?? QUIZ_SINGLE_QUESTION_BY_KEY[key];

    return {
      interactionType,
      singleQuestion,
    };
  }

  const compilerKey = key as keyof typeof COMPILER_CODE_BY_KEY;
  return {
    interactionType,
    compilerTitle: "Практика написания кода",
    compilerInitialCode:
      COMPILER_CODE_BY_KEY[compilerKey] ?? COMPILER_CODE_BY_KEY["generic-programming"],
  };
}
