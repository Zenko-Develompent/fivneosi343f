export type CourseColor = "blue" | "orange";

function normalizeCategory(value: string): string {
  return value.trim().toLowerCase();
}

export function getCourseColorByCategory(category: string): CourseColor {
  const normalized = normalizeCategory(category);

  const isDigital =
    normalized.includes("digital") ||
    normalized.includes("literacy") ||
    normalized.includes("security") ||
    normalized.includes("safety") ||
    normalized.includes("цифр") ||
    normalized.includes("грамот") ||
    normalized.includes("безопас");

  if (isDigital) {
    return "orange";
  }

  const isProgramming =
    normalized.includes("python") ||
    normalized.includes("program") ||
    normalized.includes("coding") ||
    normalized.includes("code") ||
    normalized.includes("программ");

  if (isProgramming) {
    return "blue";
  }

  return "blue";
}
