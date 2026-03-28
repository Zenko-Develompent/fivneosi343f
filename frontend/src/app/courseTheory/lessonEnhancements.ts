import type { TaskTreePublic } from "@/shared/api/client";
import type {
  FixCodeTaskDTO,
  GuessCodeOptionDTO,
  GuessCodeQuestionDTO,
  MemoryMatchPairDTO,
} from "./types";

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

type LessonGameType = "memoryMatch" | "guessCode" | "fixCode";
export type LessonInteractionType = "game" | "singleQuestion" | "compiler";

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
  gameType?: LessonGameType;
  gameTitle?: string;
  gameDescription?: string;
  memoryPairs?: MemoryMatchPairDTO[];
  guessCodeQuestions?: GuessCodeQuestionDTO[];
  fixCodeTasks?: FixCodeTaskDTO[];
  compilerTitle?: string;
  compilerInitialCode?: string;
  singleQuestion?: LessonSingleQuestion;
}

function guessOption(id: string, label: string, isCorrect: boolean): GuessCodeOptionDTO {
  return { id, label, isCorrect };
}

function guessQuestion(
  id: string,
  prompt: string,
  correct: string,
  wrong: string[]
): GuessCodeQuestionDTO {
  return {
    id,
    prompt,
    mode: "single",
    options: [
      guessOption("a", correct, true),
      guessOption("b", wrong[0] ?? "Не знаю", false),
      guessOption("c", wrong[1] ?? "Не знаю", false),
    ],
  };
}

const MEMORY_BY_KEY: Record<LessonKey, MemoryMatchPairDTO[]> = {
  variables: [
    { id: "m-var-1", term: "print()", definition: "Показывает текст" },
    { id: "m-var-2", term: "str", definition: "Текстовый тип" },
    { id: "m-var-3", term: "int", definition: "Целое число" },
  ],
  conditions: [
    { id: "m-con-1", term: "if", definition: "Проверка условия" },
    { id: "m-con-2", term: "else", definition: "Иначе" },
    { id: "m-con-3", term: "==", definition: "Проверка равенства" },
  ],
  loops: [
    { id: "m-loop-1", term: "for", definition: "Повтор по шагам" },
    { id: "m-loop-2", term: "while", definition: "Повтор пока условие верно" },
    { id: "m-loop-3", term: "break", definition: "Остановить цикл" },
  ],
  functions: [
    { id: "m-fun-1", term: "def", definition: "Создать функцию" },
    { id: "m-fun-2", term: "return", definition: "Вернуть результат" },
    { id: "m-fun-3", term: "параметр", definition: "Данные для функции" },
  ],
  passwords: [
    { id: "m-pass-1", term: "Пароль", definition: "Секрет для входа" },
    { id: "m-pass-2", term: "2FA", definition: "Второй шаг защиты" },
    { id: "m-pass-3", term: "Уникальный", definition: "Разный для каждого сайта" },
  ],
  phishing: [
    { id: "m-ph-1", term: "Фишинг", definition: "Обман в сети" },
    { id: "m-ph-2", term: "Ссылка", definition: "Нужно проверять адрес" },
    { id: "m-ph-3", term: "Пароль", definition: "Нельзя сообщать" },
  ],
  factcheck: [
    { id: "m-fc-1", term: "Источник", definition: "Кто написал новость" },
    { id: "m-fc-2", term: "Дата", definition: "Когда вышла новость" },
    { id: "m-fc-3", term: "Проверка", definition: "Сравнить в 2 источниках" },
  ],
  privacy: [
    { id: "m-pr-1", term: "Приватность", definition: "Кто видит мои данные" },
    { id: "m-pr-2", term: "Геометка", definition: "Местоположение в посте" },
    { id: "m-pr-3", term: "Разрешения", definition: "Доступы приложения" },
  ],
  "generic-programming": [
    { id: "m-gp-1", term: "Код", definition: "Команды компьютеру" },
    { id: "m-gp-2", term: "Ошибка", definition: "Нужно исправить" },
    { id: "m-gp-3", term: "Проверка", definition: "Запустить и посмотреть результат" },
  ],
  "generic-digital": [
    { id: "m-gd-1", term: "Интернет", definition: "Сеть сайтов" },
    { id: "m-gd-2", term: "Безопасность", definition: "Защита данных" },
    { id: "m-gd-3", term: "Проверка", definition: "Сначала думаем, потом кликаем" },
  ],
};

const GUESS_BY_KEY: Record<LessonKey, GuessCodeQuestionDTO[]> = {
  variables: [guessQuestion("g-var-1", "Как вывести текст?", "print()", ["input()", "return"])],
  conditions: [guessQuestion("g-con-1", "Какая команда для выбора ветки?", "if", ["for", "def"])],
  loops: [guessQuestion("g-loop-1", "Какой цикл повторяет действия?", "for", ["if", "print"])],
  functions: [guessQuestion("g-fun-1", "С чего начинается функция?", "def", ["for", "while"])],
  passwords: [guessQuestion("g-pass-1", "Хороший пароль должен быть...", "длинный", ["короткий", "одинаковый везде"])],
  phishing: [guessQuestion("g-ph-1", "Что делать со странной ссылкой?", "не открывать", ["сразу открыть", "отправить всем"])],
  factcheck: [guessQuestion("g-fc-1", "Первый шаг проверки новости?", "проверка источника", ["сразу поделиться", "поверить без проверки"])],
  privacy: [guessQuestion("g-pr-1", "Что скрываем в профиле?", "личные данные", ["пароль в посте", "все открываем"])],
  "generic-programming": [guessQuestion("g-gp-1", "Что важно делать с кодом?", "проверять", ["не запускать", "удалять"])],
  "generic-digital": [guessQuestion("g-gd-1", "Перед кликом лучше...", "проверить ссылку", ["кликнуть сразу", "ввести пароль"])],
};

const FIX_BY_KEY: Record<
  Exclude<LessonKey, "passwords" | "phishing" | "factcheck" | "privacy" | "generic-digital">,
  FixCodeTaskDTO[]
> = {
  variables: [
    {
      id: "f-var-1",
      prompt: "Исправь имя переменной.",
      brokenCode: "1name = 'Аня'\nprint(1name)",
      options: [
        guessOption("a", "name1 = 'Аня'", true),
        guessOption("b", "name 1 = 'Аня'", false),
        guessOption("c", "print(name)", false),
      ],
    },
  ],
  conditions: [
    {
      id: "f-con-1",
      prompt: "Исправь сравнение.",
      brokenCode: "if age = 8:\n    print('ok')",
      options: [
        guessOption("a", "if age == 8:", true),
        guessOption("b", "if age === 8:", false),
        guessOption("c", "if age => 8:", false),
      ],
    },
  ],
  loops: [
    {
      id: "f-loop-1",
      prompt: "Исправь цикл.",
      brokenCode: "for i in range(3)\n    print(i)",
      options: [
        guessOption("a", "Добавить ':' после range(3)", true),
        guessOption("b", "Заменить for на print", false),
        guessOption("c", "Убрать range(3)", false),
      ],
    },
  ],
  functions: [
    {
      id: "f-fun-1",
      prompt: "Исправь функцию.",
      brokenCode: "def hello(name)\n    print(name)",
      options: [
        guessOption("a", "Добавить ':' после hello(name)", true),
        guessOption("b", "Заменить def на if", false),
        guessOption("c", "Удалить name", false),
      ],
    },
  ],
  "generic-programming": [
    {
      id: "f-gp-1",
      prompt: "Исправь отступ.",
      brokenCode: "def greet(name):\nprint(name)",
      options: [
        guessOption("a", "Сделать отступ перед print", true),
        guessOption("b", "Удалить функцию", false),
        guessOption("c", "Заменить def на while", false),
      ],
    },
  ],
};

const COMPILER_CODE_BY_KEY: Record<
  Exclude<LessonKey, "passwords" | "phishing" | "factcheck" | "privacy" | "generic-digital">,
  string
> = {
  variables: "name = 'Лена'\nprint('Привет, ' + name)",
  conditions: "age = 8\nif age < 10:\n    print('Младшая группа')\nelse:\n    print('Старшая группа')",
  loops: "for i in range(1, 4):\n    print('Шаг', i)",
  functions: "def hello(name):\n    return 'Привет, ' + name\n\nprint(hello('Петя'))",
  "generic-programming": "print('Я учу Python!')",
};

const SINGLE_QUESTION_BY_KEY: Record<LessonKey, LessonSingleQuestion> = {
  variables: {
    prompt: "Какой тип хранит текст?",
    options: [
      { id: "a", label: "str" },
      { id: "b", label: "int" },
      { id: "c", label: "float" },
    ],
  },
  conditions: {
    prompt: "Какая команда идет после if для дополнительной проверки?",
    options: [
      { id: "a", label: "elif" },
      { id: "b", label: "print" },
      { id: "c", label: "break" },
    ],
  },
  loops: {
    prompt: "Какой цикл часто используют для повторов по range()?",
    options: [
      { id: "a", label: "for" },
      { id: "b", label: "if" },
      { id: "c", label: "def" },
    ],
  },
  functions: {
    prompt: "Какое слово возвращает результат функции?",
    options: [
      { id: "a", label: "return" },
      { id: "b", label: "while" },
      { id: "c", label: "class" },
    ],
  },
  passwords: {
    prompt: "Что лучше включить для защиты входа?",
    options: [
      { id: "a", label: "2fa" },
      { id: "b", label: "один пароль везде" },
      { id: "c", label: "короткий пароль" },
    ],
  },
  phishing: {
    prompt: "Что нельзя никому сообщать?",
    options: [
      { id: "a", label: "не сообщать пароль" },
      { id: "b", label: "имя игры" },
      { id: "c", label: "цвет аватарки" },
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
    prompt: "Что помогает защитить личные данные?",
    options: [
      { id: "a", label: "приватность" },
      { id: "b", label: "публикация пароля" },
      { id: "c", label: "открытый профиль для всех" },
    ],
  },
  "generic-programming": {
    prompt: "Какой ответ чаще всего верный в проверке функций?",
    options: [
      { id: "a", label: "return" },
      { id: "b", label: "hello" },
      { id: "c", label: "name" },
    ],
  },
  "generic-digital": {
    prompt: "Что важно в интернете?",
    options: [
      { id: "a", label: "приватность" },
      { id: "b", label: "публиковать все данные" },
      { id: "c", label: "сообщать коды из SMS" },
    ],
  },
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
    if (sourceText.includes("услов") || sourceText.includes("if") || sourceText.includes("лог")) return "conditions";
    if (sourceText.includes("цикл") || sourceText.includes("range") || sourceText.includes("while")) return "loops";
    if (sourceText.includes("функц") || sourceText.includes("def") || sourceText.includes("return")) return "functions";
    return "generic-programming";
  }

  if (sourceText.includes("парол") || sourceText.includes("2fa")) return "passwords";
  if (sourceText.includes("учетн")) return "passwords";
  if (sourceText.includes("фиш") || sourceText.includes("подозр")) return "phishing";
  if (sourceText.includes("критическ")) return "factcheck";
  if (sourceText.includes("факт") || sourceText.includes("источник") || sourceText.includes("новост")) return "factcheck";
  if (sourceText.includes("приват") || sourceText.includes("след")) return "privacy";
  if (sourceText.includes("безопасное поведение")) return "privacy";
  return "generic-digital";
}

function resolveInteractionType(
  lesson: TaskTreePublic,
  isProgramming: boolean
): LessonInteractionType {
  if (lesson.task_type === "lecture") {
    return "game";
  }

  if (lesson.task_type === "practice" && isProgramming) {
    return "compiler";
  }

  if (lesson.task_type === "practice") {
    return "game";
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

  if (interactionType === "singleQuestion") {
    return {
      interactionType,
      singleQuestion: SINGLE_QUESTION_BY_KEY[key],
    };
  }

  if (interactionType === "compiler") {
    const compilerKey = key as keyof typeof COMPILER_CODE_BY_KEY;
    return {
      interactionType,
      compilerTitle: "Мини-компилятор Python",
      compilerInitialCode:
        COMPILER_CODE_BY_KEY[compilerKey] ?? COMPILER_CODE_BY_KEY["generic-programming"],
    };
  }

  const gameType: LessonGameType =
    lesson.task_type === "lecture"
      ? "memoryMatch"
      : isProgramming
        ? "fixCode"
        : "guessCode";

  if (gameType === "memoryMatch") {
    return {
      interactionType,
      gameType,
      gameTitle: "Мини-игра: собери пары",
      gameDescription: "Собери пары карточек по теме урока.",
      memoryPairs: MEMORY_BY_KEY[key],
    };
  }

  if (gameType === "fixCode") {
    const fixKey = key as keyof typeof FIX_BY_KEY;
    return {
      interactionType,
      gameType,
      gameTitle: "Мини-игра: исправь код",
      gameDescription: "Найди ошибку и выбери правильное исправление.",
      fixCodeTasks: FIX_BY_KEY[fixKey] ?? FIX_BY_KEY["generic-programming"],
    };
  }

  return {
    interactionType,
    gameType,
    gameTitle: "Мини-игра: выбери ответ",
    gameDescription: "Ответь на короткий вопрос по теме.",
    guessCodeQuestions: GUESS_BY_KEY[key],
  };
}
