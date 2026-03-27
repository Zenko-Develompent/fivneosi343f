export interface CourseThemeLessonDTO {
  lessonId: string;
  title: string;
}

export interface CourseThemeDTO {
  themeId: string;
  title: string;
  lessons: CourseThemeLessonDTO[];
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

export interface CourseThemeItemDTO {
  type: "theme";
  themeId: string;
  title: string;
  // Текст из markdown после загрузки/подстановки с backend.
  contentMd?: string;
  text: string;
}

export interface CourseLessonItemDTO {
  type: "lesson";
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

export type CourseItemDTO = CourseThemeItemDTO | CourseLessonItemDTO;

export interface CourseTheoryPayloadDTO {
  courseTitle: string;
  themes: CourseThemeDTO[];
  flow: CourseItemDTO[];
}
