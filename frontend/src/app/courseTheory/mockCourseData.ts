import type {
  CourseTheoryPayloadDTO,
  FixCodeTaskDTO,
  GuessCodeOptionDTO,
  GuessCodeQuestionDTO,
  MemoryMatchPairDTO,
} from "./types";

function option(id: string, label: string, isCorrect: boolean): GuessCodeOptionDTO {
  return { id, label, isCorrect };
}

function single(
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
      option("a", correct, true),
      ...wrong.map((item, index) => option(String.fromCharCode(98 + index), item, false)),
    ],
  };
}

function multiple(
  id: string,
  prompt: string,
  correct: string[],
  wrong: string[]
): GuessCodeQuestionDTO {
  return {
    id,
    prompt,
    mode: "multiple",
    options: [
      ...correct.map((item, index) => option(String.fromCharCode(97 + index), item, true)),
      ...wrong.map((item, index) => option(String.fromCharCode(97 + correct.length + index), item, false)),
    ],
  };
}

const researchersMemoryM1: MemoryMatchPairDTO[] = [
  { id: "pr-m1-mm-1", term: "print()", definition: "Вывод текста на экран" },
  { id: "pr-m1-mm-2", term: "Переменная", definition: "Именованное место хранения данных" },
  { id: "pr-m1-mm-3", term: "int", definition: "Целые числа" },
  { id: "pr-m1-mm-4", term: "float", definition: "Дробные числа" },
  { id: "pr-m1-mm-5", term: "str", definition: "Текстовые строки" },
  { id: "pr-m1-mm-6", term: "input()", definition: "Ввод от пользователя" },
  { id: "pr-m1-mm-7", term: "+", definition: "Сложение" },
  { id: "pr-m1-mm-8", term: "*", definition: "Умножение" },
];

const researchersMemoryM2: MemoryMatchPairDTO[] = [
  { id: "pr-m2-mm-1", term: "for", definition: "Цикл с известным количеством повторов" },
  { id: "pr-m2-mm-2", term: "while", definition: "Цикл до выполнения условия" },
  { id: "pr-m2-mm-3", term: "range()", definition: "Последовательность чисел" },
  { id: "pr-m2-mm-4", term: "list", definition: "Коллекция элементов" },
  { id: "pr-m2-mm-5", term: "append()", definition: "Добавить элемент в список" },
  { id: "pr-m2-mm-6", term: "def", definition: "Создать функцию" },
  { id: "pr-m2-mm-7", term: "return", definition: "Вернуть результат функции" },
  { id: "pr-m2-mm-8", term: "break", definition: "Остановить цикл" },
];

const gameBuildersMemoryM1: MemoryMatchPairDTO[] = [
  { id: "gb-m1-mm-1", term: "sprite", definition: "Игровой объект на экране" },
  { id: "gb-m1-mm-2", term: "event", definition: "Событие: клик или клавиша" },
  { id: "gb-m1-mm-3", term: "collision", definition: "Столкновение объектов" },
  { id: "gb-m1-mm-4", term: "score", definition: "Очки игрока" },
  { id: "gb-m1-mm-5", term: "x, y", definition: "Координаты" },
  { id: "gb-m1-mm-6", term: "speed", definition: "Скорость движения" },
  { id: "gb-m1-mm-7", term: "if", definition: "Проверка условия" },
  { id: "gb-m1-mm-8", term: "loop", definition: "Игровой цикл" },
];

const gameBuildersMemoryM2: MemoryMatchPairDTO[] = [
  { id: "gb-m2-mm-1", term: "list", definition: "Список игровых объектов" },
  { id: "gb-m2-mm-2", term: "dict", definition: "Словарь состояния игры" },
  { id: "gb-m2-mm-3", term: "def", definition: "Определение функции" },
  { id: "gb-m2-mm-4", term: "return", definition: "Возврат из функции" },
  { id: "gb-m2-mm-5", term: "state", definition: "Состояние игры" },
  { id: "gb-m2-mm-6", term: "level", definition: "Уровень сложности" },
  { id: "gb-m2-mm-7", term: "timer", definition: "Счетчик времени" },
  { id: "gb-m2-mm-8", term: "spawn", definition: "Появление нового объекта" },
];

const researchersGuessT11: GuessCodeQuestionDTO[] = [
  single("pr-g-11-1", "Какая команда выводит текст на экран?", "print()", ["input()", "output()", "show()"]),
  single("pr-g-11-2", "Как правильно назвать переменную возраста?", "age", ["1age", "user age", "@age"]),
  multiple("pr-g-11-3", "Выбери корректные типы данных", ["int", "float", "str"], ["txt"]),
];

const researchersGuessT12: GuessCodeQuestionDTO[] = [
  single("pr-g-12-1", "Чему равно 15 // 4?", "3", ["3.75", "4", "1"]),
  single("pr-g-12-2", "Что выведет print(2 + 3 * 4 ** 2)?", "50", ["20", "80", "100"]),
  multiple("pr-g-12-3", "Какие операции дают целое число?", ["10 // 2", "10 % 3", "10 * 2"], ["10 / 2"]),
];

const researchersGuessT13: GuessCodeQuestionDTO[] = [
  single("pr-g-13-1", "Какой оператор проверяет равенство?", "==", ["=", "!=", "==="]),
  single(
    "pr-g-13-2",
    "Как проверить: x больше 5 и меньше 10?",
    "x > 5 and x < 10",
    ["x > 5 or x < 10", "5 < x > 10", "x > 5 not x < 10"]
  ),
  multiple("pr-g-13-3", "Что вернет True при age = 12?", ["age > 10", "age == 12", "age >= 12"], ["age < 10"]),
];

const researchersGuessT21: GuessCodeQuestionDTO[] = [
  single("pr-g-21-1", "Сколько раз выполнится range(5)?", "5", ["4", "6", "1"]),
  single("pr-g-21-2", "Какой цикл работает пока условие истинно?", "while", ["for", "loop", "repeat"]),
  multiple("pr-g-21-3", "Как можно управлять циклом?", ["break", "continue"], ["stop", "exit"]),
];

const researchersGuessT22: GuessCodeQuestionDTO[] = [
  single("pr-g-22-1", "Как получить первый элемент списка?", "fruits[0]", ["fruits[1]", "fruits.first()", "fruits[3]"]),
  single("pr-g-22-2", "Как добавить элемент в конец списка?", "append()", ["add()", "insert()", "push()"]),
  multiple("pr-g-22-3", "Индексы списка [10,20,30]", ["0", "1", "2"], ["3"]),
];

const researchersGuessT23: GuessCodeQuestionDTO[] = [
  single("pr-g-23-1", "Ключевое слово для функции?", "def", ["function", "func", "define"]),
  single("pr-g-23-2", "Что делает return?", "Возвращает значение", ["Выводит результат", "Создает переменную", "Запускает цикл"]),
  multiple(
    "pr-g-23-3",
    "Плюсы функций",
    ["Меньше дублирования кода", "Легче читать код", "Легче тестировать"],
    ["Всегда ускоряют программу"]
  ),
];

const gameBuildersGuessT11: GuessCodeQuestionDTO[] = [
  single("gb-g-11-1", "Что отвечает за позицию по горизонтали?", "hero_x", ["hero_y", "hero_name", "hero_speed_y"]),
  multiple("gb-g-11-2", "Какие переменные нужны для движения?", ["x", "y", "speed"], ["while"]),
];

const gameBuildersGuessT12: GuessCodeQuestionDTO[] = [
  single("gb-g-12-1", "Какой оператор проверяет условие?", "if", ["for", "def", "import"]),
  single(
    "gb-g-12-2",
    "Когда использовать else?",
    "Когда нужен альтернативный сценарий",
    ["После каждого print()", "Только в цикле", "Только в функции"]
  ),
];

const gameBuildersGuessT13: GuessCodeQuestionDTO[] = [
  single(
    "gb-g-13-1",
    "Зачем нужен игровой цикл?",
    "Чтобы обновлять логику и экран каждый кадр",
    ["Чтобы один раз вывести print()", "Чтобы объявить переменную", "Чтобы импортировать модуль"]
  ),
  multiple("gb-g-13-2", "Какие команды управляют циклом?", ["break", "continue"], ["repeat", "stop"]),
];

const gameBuildersGuessT21: GuessCodeQuestionDTO[] = [
  single("gb-g-21-1", "Где хранить инвентарь?", "В list", ["В bool", "В print()", "В одной строке"]),
  multiple("gb-g-21-2", "Полезные операции для списка", ["append()", "remove()", "len()"], ["paint()"]),
];

const gameBuildersGuessT22: GuessCodeQuestionDTO[] = [
  single("gb-g-22-1", "Почему лучше выносить действия в функции?", "Меньше повторений и проще поддержка", ["Чтобы удалить переменные", "Чтобы не использовать циклы", "Это нужно только в больших играх"]),
  single("gb-g-22-2", "Что делает return?", "Возвращает результат функции", ["Запускает цикл", "Создает список", "Импортирует модуль"]),
];

const gameBuildersGuessT23: GuessCodeQuestionDTO[] = [
  single("gb-g-23-1", "С чего начать финальную мини-игру?", "С правил и механики", ["Случайный код без плана", "Удалить функции", "Скрыть интерфейс"]),
  multiple("gb-g-23-2", "Что обычно есть в мини-игре?", ["Управление", "Счет", "Условия победы/поражения"], ["Только один print()"]),
];

const researchersFixM1: FixCodeTaskDTO[] = [
  {
    id: "pr-fix-m1-1",
    prompt: "Исправь имена переменных.",
    brokenCode: `1name = "Маша"\nmy age = 12\nprint(1name, my age)`,
    options: [
      option("a", "Переименовать в name1 и my_age", true),
      option("b", "Оставить как есть", false),
      option("c", "Добавить кавычки", false),
    ],
  },
  {
    id: "pr-fix-m1-2",
    prompt: "Исправь проверку положительного числа.",
    brokenCode: `x = input("Введи число")\nif x > 0:\n    print("Число положительное")`,
    options: [
      option("a", "Преобразовать ввод: x = int(input(...))", true),
      option("b", "Поменять if на while", false),
      option("c", "Добавить только else", false),
    ],
  },
  {
    id: "pr-fix-m1-3",
    prompt: "Исправь формулу площади.",
    brokenCode: `length = 5\nwidth = 3\narea = length + width`,
    options: [
      option("a", "area = length * width", true),
      option("b", "area = length - width", false),
      option("c", "area = length / width", false),
    ],
  },
];

const researchersFixM2: FixCodeTaskDTO[] = [
  {
    id: "pr-fix-m2-1",
    prompt: "Исправь цикл while.",
    brokenCode: `i = 0\nwhile i < 5\n    print(i)\n    i = i + 1`,
    options: [
      option("a", "Добавить двоеточие: while i < 5:", true),
      option("b", "Заменить на break", false),
      option("c", "Удалить счетчик i", false),
    ],
  },
  {
    id: "pr-fix-m2-2",
    prompt: "Исправь добавление в список.",
    brokenCode: `fruits = ["яблоко"]\nfruits.add("банан")`,
    options: [
      option("a", "fruits.append('банан')", true),
      option("b", "fruits.push('банан')", false),
      option("c", "fruits += 'банан'", false),
    ],
  },
  {
    id: "pr-fix-m2-3",
    prompt: "Исправь функцию суммы.",
    brokenCode: `def add(a, b)\n    a + b`,
    options: [
      option("a", "Добавить ':' и return a + b", true),
      option("b", "Заменить def на function", false),
      option("c", "Оставить без return", false),
    ],
  },
];

const gameBuildersFixM1: FixCodeTaskDTO[] = [
  {
    id: "gb-fix-m1-1",
    prompt: "Исправь перемещение героя.",
    brokenCode: `hero_x = 10\nspeed = 5\nhero_x == hero_x + speed`,
    options: [
      option("a", "hero_x = hero_x + speed", true),
      option("b", "hero_x + speed", false),
      option("c", "speed = hero_x", false),
    ],
  },
  {
    id: "gb-fix-m1-2",
    prompt: "Исправь проверку столкновения.",
    brokenCode: `if player_x = enemy_x:\n    print("Столкновение!")`,
    options: [
      option("a", "if player_x == enemy_x:", true),
      option("b", "if player_x := enemy_x:", false),
      option("c", "if player_x != enemy_x:", false),
    ],
  },
];

const gameBuildersFixM2: FixCodeTaskDTO[] = [
  {
    id: "gb-fix-m2-1",
    prompt: "Исправь добавление предмета в инвентарь.",
    brokenCode: `inventory = ["ключ"]\ninventory.add("монета")`,
    options: [
      option("a", "inventory.append('монета')", true),
      option("b", "inventory.push('монета')", false),
      option("c", "inventory.insert('монета')", false),
    ],
  },
  {
    id: "gb-fix-m2-2",
    prompt: "Исправь функцию подсчета очков.",
    brokenCode: `def add_score(points)\n    total = 0\n    total = total + points\n    print(total)`,
    options: [
      option("a", "Добавить ':' и return total", true),
      option("b", "Заменить def на for", false),
      option("c", "Удалить total", false),
    ],
  },
];

const pythonResearchersCourse: CourseTheoryPayloadDTO = {
  courseId: "python-researchers",
  courseTitle: "Python для исследователей",
  audience: "12 лет",
  modules: [
    {
      moduleId: "pr-m1",
      title: "Модуль 1. Основы Python",
      themes: [
        { themeId: "pr-m1-t1", title: "Тема 1.1: Переменные и первая программа", lessons: [{ lessonId: "pr-m1-t1-l1", title: "Урок 1.1" }] },
        { themeId: "pr-m1-t2", title: "Тема 1.2: Арифметика и ввод", lessons: [{ lessonId: "pr-m1-t2-l1", title: "Урок 1.2" }] },
        { themeId: "pr-m1-t3", title: "Тема 1.3: Условные операторы", lessons: [{ lessonId: "pr-m1-t3-l1", title: "Урок 1.3" }] },
      ],
    },
    {
      moduleId: "pr-m2",
      title: "Модуль 2. Продвинутые инструменты",
      themes: [
        { themeId: "pr-m2-t1", title: "Тема 2.1: Циклы", lessons: [{ lessonId: "pr-m2-t1-l1", title: "Урок 2.1" }] },
        { themeId: "pr-m2-t2", title: "Тема 2.2: Списки", lessons: [{ lessonId: "pr-m2-t2-l1", title: "Урок 2.2" }] },
        { themeId: "pr-m2-t3", title: "Тема 2.3: Функции", lessons: [{ lessonId: "pr-m2-t3-l1", title: "Урок 2.3" }] },
      ],
    },
  ],
  flow: [
    { type: "theme", moduleId: "pr-m1", themeId: "pr-m1-t1", title: "Тема 1.1: Переменные и первая программа", text: "Учимся print(), переменным, базовым типам и правилам именования." },
    { type: "game", moduleId: "pr-m1", themeId: "pr-m1-t1", gameId: "pr-m1-memory", title: "Memory Match: термины модуля 1", description: "Собери пары термин - определение.", gameType: "memoryMatch", memoryPairs: researchersMemoryM1 },
    { type: "lesson", moduleId: "pr-m1", themeId: "pr-m1-t1", lessonId: "pr-m1-t1-l1", title: "Урок 1.1: Практика по переменным", text: "Создай переменные name, age, height, hobby. Выведи данные и определи типы.", showCompiler: true },
    { type: "game", moduleId: "pr-m1", themeId: "pr-m1-t1", lessonId: "pr-m1-t1-l1", gameId: "pr-m1-t1-guess", title: "Угадай код: тема 1.1", description: "Проверка по print(), переменным и типам.", gameType: "guessCode", guessCodeQuestions: researchersGuessT11 },
    { type: "theme", moduleId: "pr-m1", themeId: "pr-m1-t2", title: "Тема 1.2: Арифметика и ввод", text: "Операции + - * / // % **, порядок действий, input() и преобразование типов." },
    { type: "lesson", moduleId: "pr-m1", themeId: "pr-m1-t2", lessonId: "pr-m1-t2-l1", title: "Урок 1.2: Практика вычислений", text: "Сделай калькулятор возраста, площадь прямоугольника и задачу с остатком.", showCompiler: true },
    { type: "game", moduleId: "pr-m1", themeId: "pr-m1-t2", lessonId: "pr-m1-t2-l1", gameId: "pr-m1-t2-guess", title: "Угадай код: тема 1.2", description: "Проверка по арифметике и input().", gameType: "guessCode", guessCodeQuestions: researchersGuessT12 },
    { type: "theme", moduleId: "pr-m1", themeId: "pr-m1-t3", title: "Тема 1.3: Условные операторы", text: "Операторы сравнения, if/elif/else, and/or/not." },
    { type: "lesson", moduleId: "pr-m1", themeId: "pr-m1-t3", lessonId: "pr-m1-t3-l1", title: "Урок 1.3: Практика условий", text: "Сделай проверку возраста, четности, оценки и дня недели.", showCompiler: true },
    { type: "game", moduleId: "pr-m1", themeId: "pr-m1-t3", lessonId: "pr-m1-t3-l1", gameId: "pr-m1-t3-guess", title: "Угадай код: тема 1.3", description: "Проверка условий и логики.", gameType: "guessCode", guessCodeQuestions: researchersGuessT13 },
    { type: "game", moduleId: "pr-m1", themeId: "pr-m1-t3", lessonId: "pr-m1-t3-l1", gameId: "pr-m1-fix", title: "Исправь код: модуль 1", description: "Бонусная практика после урока 1.3.", gameType: "fixCode", fixCodeTasks: researchersFixM1 },
    { type: "theme", moduleId: "pr-m2", themeId: "pr-m2-t1", title: "Тема 2.1: Циклы", text: "Изучаем for/while, break/continue и повторяющиеся задачи." },
    { type: "game", moduleId: "pr-m2", themeId: "pr-m2-t1", gameId: "pr-m2-memory", title: "Memory Match: термины модуля 2", description: "Собери пары по циклам, спискам и функциям.", gameType: "memoryMatch", memoryPairs: researchersMemoryM2 },
    { type: "lesson", moduleId: "pr-m2", themeId: "pr-m2-t1", lessonId: "pr-m2-t1-l1", title: "Урок 2.1: Практика циклов", text: "Сделай таблицу умножения, сумму 1..100 и игру 'Угадай число'.", showCompiler: true },
    { type: "game", moduleId: "pr-m2", themeId: "pr-m2-t1", lessonId: "pr-m2-t1-l1", gameId: "pr-m2-t1-guess", title: "Угадай код: тема 2.1", description: "Проверка по циклам.", gameType: "guessCode", guessCodeQuestions: researchersGuessT21 },
    { type: "theme", moduleId: "pr-m2", themeId: "pr-m2-t2", title: "Тема 2.2: Списки", text: "Списки, индексы, append(), remove(), len(), перебор." },
    { type: "lesson", moduleId: "pr-m2", themeId: "pr-m2-t2", lessonId: "pr-m2-t2-l1", title: "Урок 2.2: Практика списков", text: "Собери список дел и мини-меню покупок.", showCompiler: true },
    { type: "game", moduleId: "pr-m2", themeId: "pr-m2-t2", lessonId: "pr-m2-t2-l1", gameId: "pr-m2-t2-guess", title: "Угадай код: тема 2.2", description: "Проверка по спискам.", gameType: "guessCode", guessCodeQuestions: researchersGuessT22 },
    { type: "theme", moduleId: "pr-m2", themeId: "pr-m2-t3", title: "Тема 2.3: Функции", text: "def, параметры, return и повторное использование кода." },
    { type: "lesson", moduleId: "pr-m2", themeId: "pr-m2-t3", lessonId: "pr-m2-t3-l1", title: "Урок 2.3: Практика функций", text: "Создай функции приветствия, калькулятора и проверки возраста.", showCompiler: true },
    { type: "game", moduleId: "pr-m2", themeId: "pr-m2-t3", lessonId: "pr-m2-t3-l1", gameId: "pr-m2-t3-guess", title: "Угадай код: тема 2.3", description: "Проверка по функциям.", gameType: "guessCode", guessCodeQuestions: researchersGuessT23 },
    { type: "game", moduleId: "pr-m2", themeId: "pr-m2-t3", lessonId: "pr-m2-t3-l1", gameId: "pr-m2-fix", title: "Исправь код: модуль 2", description: "Бонусная практика после урока 2.3.", gameType: "fixCode", fixCodeTasks: researchersFixM2 },
  ],
};

const pythonGameBuildersCourse: CourseTheoryPayloadDTO = {
  courseId: "python-game-builders",
  courseTitle: "Python для создателей игр",
  audience: "11-13 лет",
  modules: [
    {
      moduleId: "gb-m1",
      title: "Модуль 1. Логика игры и управление",
      themes: [
        { themeId: "gb-m1-t1", title: "Тема 1.1: Координаты и спрайты", lessons: [{ lessonId: "gb-m1-t1-l1", title: "Урок 1.1" }] },
        { themeId: "gb-m1-t2", title: "Тема 1.2: События и условия", lessons: [{ lessonId: "gb-m1-t2-l1", title: "Урок 1.2" }] },
        { themeId: "gb-m1-t3", title: "Тема 1.3: Игровой цикл и счет", lessons: [{ lessonId: "gb-m1-t3-l1", title: "Урок 1.3" }] },
      ],
    },
    {
      moduleId: "gb-m2",
      title: "Модуль 2. Системы игры и мини-проект",
      themes: [
        { themeId: "gb-m2-t1", title: "Тема 2.1: Списки и инвентарь", lessons: [{ lessonId: "gb-m2-t1-l1", title: "Урок 2.1" }] },
        { themeId: "gb-m2-t2", title: "Тема 2.2: Функции и действия", lessons: [{ lessonId: "gb-m2-t2-l1", title: "Урок 2.2" }] },
        { themeId: "gb-m2-t3", title: "Тема 2.3: Финальная мини-игра", lessons: [{ lessonId: "gb-m2-t3-l1", title: "Урок 2.3" }] },
      ],
    },
  ],
  flow: [
    { type: "theme", moduleId: "gb-m1", themeId: "gb-m1-t1", title: "Тема 1.1: Координаты и спрайты", text: "Перемещение персонажа, координаты x/y и скорость." },
    { type: "game", moduleId: "gb-m1", themeId: "gb-m1-t1", gameId: "gb-m1-memory", title: "Memory Match: термины модуля 1", description: "Собери пары по базовым игровым терминам.", gameType: "memoryMatch", memoryPairs: gameBuildersMemoryM1 },
    { type: "lesson", moduleId: "gb-m1", themeId: "gb-m1-t1", lessonId: "gb-m1-t1-l1", title: "Урок 1.1: Движение героя", text: "Задай hero_x, hero_y, speed и обновляй позицию в цикле.", showCompiler: true },
    { type: "game", moduleId: "gb-m1", themeId: "gb-m1-t1", lessonId: "gb-m1-t1-l1", gameId: "gb-m1-t1-guess", title: "Угадай код: тема 1.1", description: "Проверка по координатам и переменным.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT11 },
    { type: "theme", moduleId: "gb-m1", themeId: "gb-m1-t2", title: "Тема 1.2: События и условия", text: "Реакция игры на действия игрока через if/else." },
    { type: "lesson", moduleId: "gb-m1", themeId: "gb-m1-t2", lessonId: "gb-m1-t2-l1", title: "Урок 1.2: Обработка событий", text: "Добавь проверку столкновений и альтернативные сценарии.", showCompiler: true },
    { type: "game", moduleId: "gb-m1", themeId: "gb-m1-t2", lessonId: "gb-m1-t2-l1", gameId: "gb-m1-t2-guess", title: "Угадай код: тема 1.2", description: "Проверка условий и ветвлений.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT12 },
    { type: "theme", moduleId: "gb-m1", themeId: "gb-m1-t3", title: "Тема 1.3: Игровой цикл и счет", text: "Базовый цикл, счет очков и завершение игры." },
    { type: "lesson", moduleId: "gb-m1", themeId: "gb-m1-t3", lessonId: "gb-m1-t3-l1", title: "Урок 1.3: Таймер и score", text: "Собери цикл обновления и счетчик очков.", showCompiler: true },
    { type: "game", moduleId: "gb-m1", themeId: "gb-m1-t3", lessonId: "gb-m1-t3-l1", gameId: "gb-m1-t3-guess", title: "Угадай код: тема 1.3", description: "Проверка игрового цикла.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT13 },
    { type: "game", moduleId: "gb-m1", themeId: "gb-m1-t3", lessonId: "gb-m1-t3-l1", gameId: "gb-m1-fix", title: "Исправь код: модуль 1", description: "Бонусные задачи по движению и столкновению.", gameType: "fixCode", fixCodeTasks: gameBuildersFixM1 },
    { type: "theme", moduleId: "gb-m2", themeId: "gb-m2-t1", title: "Тема 2.1: Списки и инвентарь", text: "Храним предметы и объекты игры в list/dict." },
    { type: "game", moduleId: "gb-m2", themeId: "gb-m2-t1", gameId: "gb-m2-memory", title: "Memory Match: термины модуля 2", description: "Собери пары по структурам данных и состояниям.", gameType: "memoryMatch", memoryPairs: gameBuildersMemoryM2 },
    { type: "lesson", moduleId: "gb-m2", themeId: "gb-m2-t1", lessonId: "gb-m2-t1-l1", title: "Урок 2.1: Инвентарь", text: "Добавляй и удаляй предметы в списке inventory.", showCompiler: true },
    { type: "game", moduleId: "gb-m2", themeId: "gb-m2-t1", lessonId: "gb-m2-t1-l1", gameId: "gb-m2-t1-guess", title: "Угадай код: тема 2.1", description: "Проверка списков и операций.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT21 },
    { type: "theme", moduleId: "gb-m2", themeId: "gb-m2-t2", title: "Тема 2.2: Функции и действия", text: "Вынос логики атаки/движения в отдельные функции." },
    { type: "lesson", moduleId: "gb-m2", themeId: "gb-m2-t2", lessonId: "gb-m2-t2-l1", title: "Урок 2.2: Функции персонажа", text: "Сделай move_player() и attack() с return.", showCompiler: true },
    { type: "game", moduleId: "gb-m2", themeId: "gb-m2-t2", lessonId: "gb-m2-t2-l1", gameId: "gb-m2-t2-guess", title: "Угадай код: тема 2.2", description: "Проверка def и return.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT22 },
    { type: "theme", moduleId: "gb-m2", themeId: "gb-m2-t3", title: "Тема 2.3: Финальная мини-игра", text: "Сборка проекта: управление, счет, победа/поражение." },
    { type: "lesson", moduleId: "gb-m2", themeId: "gb-m2-t3", lessonId: "gb-m2-t3-l1", title: "Урок 2.3: Финальная сборка", text: "Объедини цикл, условия, функции и счет в один мини-проект.", showCompiler: true },
    { type: "game", moduleId: "gb-m2", themeId: "gb-m2-t3", lessonId: "gb-m2-t3-l1", gameId: "gb-m2-t3-guess", title: "Угадай код: тема 2.3", description: "Итоговая проверка по курсу.", gameType: "guessCode", guessCodeQuestions: gameBuildersGuessT23 },
    { type: "game", moduleId: "gb-m2", themeId: "gb-m2-t3", lessonId: "gb-m2-t3-l1", gameId: "gb-m2-fix", title: "Исправь код: модуль 2", description: "Бонусные задачи по инвентарю и функциям.", gameType: "fixCode", fixCodeTasks: gameBuildersFixM2 },
  ],
};

export const COURSE_THEORY_PAYLOADS: CourseTheoryPayloadDTO[] = [
  pythonResearchersCourse,
  pythonGameBuildersCourse,
];

export const LOCAL_COURSE_THEORY_PAYLOAD: CourseTheoryPayloadDTO = pythonResearchersCourse;
