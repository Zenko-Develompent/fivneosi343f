import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/header/header";
import HippoBlue from "@/shared/assets/images/hippoblue.png";
import HippoOrange from "@/shared/assets/images/hippoorange.png";
import styles from "./coursePage.module.css";

interface CoursePageData {
  slug: string;
  category: string;
  title: string;
  tone: "blue" | "orange";
  imageSrc: string;
  about: string;
  forWho: string[];
  program: string[];
  format: string[];
  result: string[];
}

const coursePages: CoursePageData[] = [
  {
    slug: "python-researchers",
    category: "Программирование",
    title: "Python для исследователей: кодим безопасно",
    tone: "blue",
    imageSrc: HippoBlue.src,
    about:
      "Исследовательский код редко пишут с нуля — чаще дорабатывают и передают коллегам.\n" +
      "Этот курс показывает, как писать понятный и устойчивый Python-код для научных задач.",
    forWho: [
      "Исследователи и школьники, которые хотят писать код аккуратно и понятно.",
      "Начинающие аналитики, работающие с экспериментальными данными.",
      "Ребята, которые хотят изучать Python в практическом формате.",
    ],
    program: [
      "Переменные, типы данных и чистый вывод результата.",
      "Проверка ввода, обработка ошибок и безопасные вычисления.",
      "Циклы, функции и структура кода без хаоса.",
      "Финальная практика с мини-проектом и разбором решений.",
    ],
    format: [
      "8 недель, онлайн.",
      "Короткие уроки и игровые задания.",
      "Практика в Python-компиляторе после каждой темы.",
    ],
    result: [
      "Уверенно используешь базовые конструкции Python.",
      "Пишешь код, который легко читать и проверять.",
      "Можешь собрать собственный небольшой проект.",
    ],
  },
  {
    slug: "digital-literacy",
    category: "Цифровая грамотность",
    title: "Цифровая грамотность для школьников",
    tone: "orange",
    imageSrc: HippoOrange.src,
    about:
      "Курс помогает уверенно ориентироваться в цифровой среде.\n" +
      "Разберем безопасность, личные данные, полезные онлайн-инструменты и культуру общения.",
    forWho: [
      "Школьники, которые активно пользуются интернетом.",
      "Ребята, которым важна цифровая безопасность.",
      "Все, кто хочет лучше понимать цифровые сервисы и риски.",
    ],
    program: [
      "Безопасные пароли, фишинг и приватность.",
      "Ответственное общение в сети и цифровой этикет.",
      "Проверка информации и борьба с фейками.",
      "Практические кейсы и итоговый мини-проект.",
    ],
    format: [
      "8 недель, онлайн.",
      "Разбор жизненных ситуаций и интерактивные задания.",
      "Мини-тесты и игровые активности после уроков.",
    ],
    result: [
      "Понимаешь базовые правила цифровой безопасности.",
      "Умеешь распознавать риски и защищать данные.",
      "Осознанно и уверенно пользуешься онлайн-сервисами.",
    ],
  },
];

function getCoursePageBySlug(slug: string): CoursePageData | undefined {
  return coursePages.find((course) => course.slug === slug);
}

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCoursePageBySlug(slug);

  if (!course) {
    notFound();
  }

  const heroClass = `${styles.hero} ${
    course.tone === "blue" ? styles.heroBlue : styles.heroOrange
  }`.trim();
  const ctaClass = `${styles.ctaButton} ${
    course.tone === "blue" ? styles.ctaBlue : styles.ctaOrange
  }`.trim();

  return (
    <div className={styles.page}>
      <Header />

      <section className={heroClass}>
        <div className={styles.heroText}>
          <span className={styles.categoryPill}>{course.category}</span>
          <h1 className={styles.title}>{course.title}</h1>
          <div className={styles.heroCtaWrap}>
            <Link href="/courseTheory" className={ctaClass}>
              Поступить на курс!
            </Link>
          </div>
        </div>

        <img className={styles.heroImage} src={course.imageSrc} alt={course.title} />
      </section>

      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>О курсе</h2>
          <p className={styles.paragraph}>{course.about}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Для кого</h2>
          <ul className={styles.list}>
            {course.forWho.map((item) => (
              <li className={styles.listItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Программа</h2>
          <ul className={styles.list}>
            {course.program.map((item) => (
              <li className={styles.listItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Формат</h2>
          <ul className={styles.list}>
            {course.format.map((item) => (
              <li className={styles.listItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Результат</h2>
          <ul className={styles.list}>
            {course.result.map((item) => (
              <li className={styles.listItem} key={item}>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.bottomCta}>
          <Link href="/courseTheory" className={ctaClass}>
            Поступить на курс!
          </Link>
        </div>
      </main>
    </div>
  );
}
