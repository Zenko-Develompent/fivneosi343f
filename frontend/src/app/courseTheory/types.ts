export interface CourseThemeLessonDTO {
  lessonId: string;
  title: string;
}

export interface CourseModuleThemeDTO {
  themeId: string;
  title: string;
  lessons: CourseThemeLessonDTO[];
}

export interface CourseModuleDTO {
  moduleId: string;
  title: string;
  themes: CourseModuleThemeDTO[];
}

export interface QuizOptionDTO {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface QuizQuestionDTO {
  id: string;
  prompt: string;
  options: QuizOptionDTO[];
  // Локальный fallback до подключения серверной проверки.
  correctOptionId?: string;
  explanation?: string;
}

export interface MemoryMatchPairDTO {
  id: string;
  term: string;
  definition: string;
}

export interface GuessCodeOptionDTO {
  id: string;
  label: string;
  isCorrect: boolean;
}

export interface GuessCodeQuestionDTO {
  id: string;
  prompt: string;
  mode: "single" | "multiple";
  options: GuessCodeOptionDTO[];
}

export interface FixCodeTaskDTO {
  id: string;
  brokenCode: string;
  prompt: string;
  options: GuessCodeOptionDTO[];
}

export interface CourseThemeItemDTO {
  type: "theme";
  moduleId: string;
  themeId: string;
  title: string;
  // Текст из markdown после загрузки/подстановки с backend.
  contentMd?: string;
  text: string;
}

export interface CourseLessonItemDTO {
  type: "lesson";
  moduleId: string;
  themeId: string;
  lessonId: string;
  title: string;
  // Текст из markdown после загрузки/подстановки с backend.
  contentMd?: string;
  text: string;
  showCompiler?: boolean;
  compilerInitialCode?: string;
  // Точка серверной проверки ответа по квизу.
  quizCheckEndpoint?: string;
  // Точка серверной проверки результата запуска компилятора.
  compilerCheckEndpoint?: string;
  quizQuestions?: QuizQuestionDTO[];
}

export interface CourseGameItemDTO {
  type: "game";
  moduleId: string;
  themeId: string;
  gameId: string;
  title: string;
  description?: string;
  gameType: "memoryMatch" | "guessCode" | "fixCode";
  // если игра относится к конкретному уроку, чтобы сохранять подсветку в сайдбаре
  lessonId?: string;
  memoryPairs?: MemoryMatchPairDTO[];
  guessCodeQuestions?: GuessCodeQuestionDTO[];
  fixCodeTasks?: FixCodeTaskDTO[];
}

export type CourseItemDTO = CourseThemeItemDTO | CourseLessonItemDTO | CourseGameItemDTO;

export interface CourseTheoryPayloadDTO {
  courseId: string;
  courseTitle: string;
  audience?: string;
  modules: CourseModuleDTO[];
  flow: CourseItemDTO[];
}
