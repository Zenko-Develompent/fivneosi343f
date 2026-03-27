import type { CourseTheoryPayloadDTO } from "./types";

// Контракт подготовлен для backend: вопросы могут проверяться сервером,
// а correctOptionId используется как временный локальный fallback.
export const LOCAL_COURSE_THEORY_PAYLOAD: CourseTheoryPayloadDTO = {
  courseTitle: "Python для исследователей: кодим безопасно",
  themes: [
    {
      themeId: "theme-1",
      title: "Модуль 1. Старт в Python",
      lessons: [
        { lessonId: "lesson-1", title: "Урок 1. Переменные и print()" },
        { lessonId: "lesson-2", title: "Урок 2. Ввод данных и условия" },
      ],
    },
    {
      themeId: "theme-2",
      title: "Модуль 2. Циклы и практические задачи",
      lessons: [
        { lessonId: "lesson-1", title: "Урок 3. Цикл for и подсчет символов" },
        { lessonId: "lesson-2", title: "Урок 4. Проверка надежности пароля" },
      ],
    },
    {
      themeId: "theme-3",
      title: "Модуль 3. Безопасное программирование",
      lessons: [
        { lessonId: "lesson-1", title: "Урок 5. Валидация пользовательского ввода" },
        { lessonId: "lesson-2", title: "Урок 6. Поиск подозрительных команд" },
      ],
    },
    {
      themeId: "theme-4",
      title: "Модуль 4. Контрольные уроки (выбор 1 ответа)",
      lessons: [
        { lessonId: "lesson-1", title: "Урок 7. Контроль: типы данных" },
        { lessonId: "lesson-2", title: "Урок 8. Контроль: циклы и условия" },
      ],
    },
    {
      themeId: "theme-5",
      title: "Модуль 5. Финальная практика",
      lessons: [{ lessonId: "lesson-1", title: "Урок 9. Код + тест" }],
    },
  ],
  flow: [
    {
      type: "theme",
      themeId: "theme-1",
      title: "Модуль 1. Старт в Python",
      text:
        "В этом модуле ты пишешь первые программы на Python.\n" +
        "Фокус: переменные, ввод/вывод и условия.",
    },
    {
      type: "lesson",
      themeId: "theme-1",
      lessonId: "lesson-1",
      title: "Урок 1. Переменные и print()",
      text:
        "Создай переменные name и age.\n" +
        "Выведи фразу: Привет, меня зовут ... Мне ... лет.",
      compilerInitialCode:
        "name = \"Алия\"\n" +
        "age = 12\n" +
        "print(f\"Привет, меня зовут {name}. Мне {age} лет.\")",
      quizQuestions: [
        {
          id: "t1-l1-q1",
          prompt: "Что выводит данные в консоль Python?",
          options: [
            { id: "print", label: "print()" },
            { id: "input", label: "input()" },
            { id: "class", label: "class" },
          ],
          correctOptionId: "print",
          explanation: "print() выводит данные, input() читает ввод пользователя.",
        },
      ],
    },
    {
      type: "lesson",
      themeId: "theme-1",
      lessonId: "lesson-2",
      title: "Урок 2. Ввод данных и условия",
      text:
        "Спроси возраст пользователя и выведи:\n" +
        "- Доступ разрешен, если возраст >= 10\n" +
        "- Попроси помощь взрослого, если возраст < 10",
      compilerInitialCode:
        "age = int(input(\"Сколько тебе лет? \"))\n" +
        "if age >= 10:\n" +
        "    print(\"Доступ разрешен\")\n" +
        "else:\n" +
        "    print(\"Попроси помощь взрослого\")",
    },
    {
      type: "theme",
      themeId: "theme-2",
      title: "Модуль 2. Циклы и практические задачи",
      text:
        "Здесь ты используешь циклы и практикуешь базовые алгоритмы.\n" +
        "После кода идут вопросы для самопроверки.",
    },
    {
      type: "lesson",
      themeId: "theme-2",
      lessonId: "lesson-1",
      title: "Урок 3. Цикл for и подсчет символов",
      text: "Напиши программу, которая считает длину пароля через цикл for.",
      compilerInitialCode:
        "password = input(\"Введите пароль: \")\n" +
        "count = 0\n" +
        "for _ in password:\n" +
        "    count += 1\n" +
        "print(\"Длина пароля:\", count)",
    },
    {
      type: "lesson",
      themeId: "theme-2",
      lessonId: "lesson-2",
      title: "Урок 4. Проверка надежности пароля",
      text:
        "Проверь пароль: длина >= 8 и наличие хотя бы одной цифры.",
      compilerInitialCode:
        "password = input(\"Введите пароль: \")\n" +
        "has_digit = any(ch.isdigit() for ch in password)\n" +
        "\n" +
        "if len(password) >= 8 and has_digit:\n" +
        "    print(\"Пароль подходит\")\n" +
        "else:\n" +
        "    print(\"Пароль слишком слабый\")",
      quizQuestions: [
        {
          id: "t2-l2-q1",
          prompt: "Что сильнее всего повышает надежность пароля?",
          options: [
            { id: "length", label: "Длина 8+ символов" },
            { id: "same", label: "Один и тот же пароль везде" },
            { id: "name", label: "Имя пользователя в пароле" },
          ],
          correctOptionId: "length",
        },
      ],
    },
    {
      type: "theme",
      themeId: "theme-3",
      title: "Модуль 3. Безопасное программирование",
      text:
        "Научись фильтровать ввод и находить рискованные конструкции в коде.",
    },
    {
      type: "lesson",
      themeId: "theme-3",
      lessonId: "lesson-1",
      title: "Урок 5. Валидация пользовательского ввода",
      text: "Проверь, что логин содержит только буквы и цифры.",
      compilerInitialCode:
        "login = input(\"Введите логин: \")\n" +
        "if login.isalnum():\n" +
        "    print(\"Логин валиден\")\n" +
        "else:\n" +
        "    print(\"Логин содержит недопустимые символы\")",
    },
    {
      type: "lesson",
      themeId: "theme-3",
      lessonId: "lesson-2",
      title: "Урок 6. Поиск подозрительных команд",
      text: "Проверь строку кода на eval, exec и os.system.",
      compilerInitialCode:
        "line = input(\"Вставь строку кода: \")\n" +
        "blocked = [\"eval\", \"exec\", \"os.system\"]\n" +
        "if any(word in line for word in blocked):\n" +
        "    print(\"Найдена потенциально опасная команда\")\n" +
        "else:\n" +
        "    print(\"Явно опасных команд не найдено\")",
    },
    {
      type: "theme",
      themeId: "theme-4",
      title: "Модуль 4. Контрольные уроки (выбор 1 ответа)",
      text:
        "В этом модуле отдельные уроки без компилятора.\n" +
        "Только single-choice вопросы с проверкой верно/неверно.",
    },
    {
      type: "lesson",
      themeId: "theme-4",
      lessonId: "lesson-1",
      title: "Урок 7. Контроль: типы данных",
      text: "Выбери один правильный вариант ответа.",
      showCompiler: false,
      quizQuestions: [
        {
          id: "t4-l1-q1",
          prompt: "Какой тип данных у значения 3.14?",
          options: [
            { id: "int", label: "int" },
            { id: "float", label: "float" },
            { id: "str", label: "str" },
          ],
          correctOptionId: "float",
          explanation: "Числа с дробной частью в Python имеют тип float.",
        },
        {
          id: "t4-l1-q2",
          prompt: "Какой оператор сравнивает на равенство?",
          options: [
            { id: "assign", label: "=" },
            { id: "equal", label: "==" },
            { id: "not-equal", label: "!=" },
          ],
          correctOptionId: "equal",
          explanation: "= присваивает, а == сравнивает значения.",
        },
      ],
    },
    {
      type: "lesson",
      themeId: "theme-4",
      lessonId: "lesson-2",
      title: "Урок 8. Контроль: циклы и условия",
      text: "Выбери один правильный вариант ответа.",
      showCompiler: false,
      quizQuestions: [
        {
          id: "t4-l2-q1",
          prompt: "Какая конструкция отвечает за цикл в Python?",
          options: [
            { id: "if", label: "if" },
            { id: "for", label: "for" },
            { id: "def", label: "def" },
          ],
          correctOptionId: "for",
        },
      ],
    },
    {
      type: "theme",
      themeId: "theme-5",
      title: "Модуль 5. Финальная практика",
      text:
        "Итоговый урок объединяет код и вопросы.\n" +
        "Сначала практика в компиляторе, затем проверка ответов.",
    },
    {
      type: "lesson",
      themeId: "theme-5",
      lessonId: "lesson-1",
      title: "Урок 9. Код + тест",
      text:
        "Сделай мини-валидатор пароля:\n" +
        "1. Длина от 8 символов\n" +
        "2. Есть хотя бы одна цифра\n" +
        "3. Есть хотя бы одна заглавная буква",
      compilerInitialCode:
        "password = input(\"Введите пароль: \")\n" +
        "has_digit = any(ch.isdigit() for ch in password)\n" +
        "has_upper = any(ch.isupper() for ch in password)\n" +
        "\n" +
        "if len(password) >= 8 and has_digit and has_upper:\n" +
        "    print(\"Пароль проходит проверку\")\n" +
        "else:\n" +
        "    print(\"Пароль не проходит проверку\")",
      quizQuestions: [
        {
          id: "t5-l1-q1",
          prompt: "Какой метод проверяет, что символ является цифрой?",
          options: [
            { id: "isdigit", label: "isdigit()" },
            { id: "isalpha", label: "isalpha()" },
            { id: "islower", label: "islower()" },
          ],
          correctOptionId: "isdigit",
        },
      ],
    },
  ],
};
