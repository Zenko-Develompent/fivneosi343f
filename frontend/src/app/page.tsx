"use client";

import { useMemo, useState } from "react";
import Card from "@/components/coursesCards/courseCard";
import Button from "@/components/button/button";
import Header from "@/components/header/header";
import HipoImg from "@/shared/assets/images/hipocatalog.png";
import styles from "./page.module.css";

type CourseCategory = "Программирование" | "Цифровая грамотность";
type FilterCategory = "Все курсы" | CourseCategory;

interface CatalogCourse {
  id: string;
  category: CourseCategory;
  title: string;
  lessonsDone: number;
  lessonsTotal: number;
  progress: number;
  color: "blue" | "orange";
  buttonHref: string;
  buttonTitle?: string;
}

const myCourses: CatalogCourse[] = [
  {
    id: "my-python-researchers",
    category: "Программирование",
    title: "Python для исследователей",
    lessonsDone: 6,
    lessonsTotal: 7,
    progress: 86,
    color: "blue",
    buttonHref: "/courses/python-researchers",
  },
  {
    id: "my-digital",
    category: "Цифровая грамотность",
    title: "Цифровая грамотность для школьников",
    lessonsDone: 4,
    lessonsTotal: 7,
    progress: 64,
    color: "orange",
    buttonHref: "/courses/digital-literacy",
  },
];

const allCourses: CatalogCourse[] = [
  {
    id: "all-python-researchers",
    category: "Программирование",
    title: "Python для исследователей",
    lessonsDone: 0,
    lessonsTotal: 7,
    progress: 0,
    color: "blue",
    buttonHref: "/courses/python-researchers",
    buttonTitle: "Поступить на курс!",
  },
  {
    id: "all-digital",
    category: "Цифровая грамотность",
    title: "Цифровая грамотность для школьников",
    lessonsDone: 0,
    lessonsTotal: 7,
    progress: 0,
    color: "orange",
    buttonHref: "/courses/digital-literacy",
    buttonTitle: "Поступить на курс!",
  },
];

const filters: FilterCategory[] = ["Все курсы", "Программирование", "Цифровая грамотность"];

function filterCourses(courses: CatalogCourse[], selectedFilter: FilterCategory): CatalogCourse[] {
  if (selectedFilter === "Все курсы") {
    return courses;
  }

  return courses.filter((course) => course.category === selectedFilter);
}

function getFilterButtonColor(filter: FilterCategory): "logo" | "blue" | "orange" {
  if (filter === "Все курсы") {
    return "logo";
  }

  return filter === "Программирование" ? "blue" : "orange";
}

export default function Home() {
  const [myFilter, setMyFilter] = useState<FilterCategory>("Все курсы");
  const [allFilter, setAllFilter] = useState<FilterCategory>("Все курсы");

  const filteredMyCourses = useMemo(() => filterCourses(myCourses, myFilter), [myFilter]);
  const filteredAllCourses = useMemo(() => filterCourses(allCourses, allFilter), [allFilter]);

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.aboutus}>
          <div className={styles.imageHipo}>
            <img src={HipoImg.src} alt="" />
          </div>
          <div className={styles.description}>
            <h2 className={styles.title} id="aboutPlatform">
              О платформе
            </h2>
            <p className={styles.text}>
              <br />
              Знакомьтесь, это Бегемоша - самый умный и добрый бегемот в мире программирования!
              <br />
              Он помогает детям делать первые шаги в IT.
              <br />
              Вместе с Бегемошей ваш ребенок научится писать настоящий код.
              <br />
              И все это в игровой форме, без скучных правил и сложных терминов.
              <br />
              Программировать может каждый, особенно с таким другом, как Бегемоша!
            </p>
          </div>
        </div>

        <div className={styles.my_filter_wrapper}>
          <div className={styles.my_title_wrapper}>
            <h2 className={styles.my_title_filter} id="myCourses">
              Мои курсы
            </h2>
          </div>
          <div className={styles.filters}>
            {filters.map((filter) => {
              const isActive = myFilter === filter;
              return (
                <Button
                  key={`my-${filter}`}
                  size="m"
                  variant={isActive ? "filled" : "outline"}
                  color={getFilterButtonColor(filter)}
                  title={filter}
                  onClick={() => setMyFilter(filter)}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.my_card_wrapper}>
          {filteredMyCourses.map((course) => (
            <Card
              key={course.id}
              category={course.category}
              title={course.title}
              description={`Прогресс: ${course.lessonsDone}/${course.lessonsTotal} уроков`}
              color={course.color}
              progress={course.progress}
              progressLabel="Прогресс курса"
              buttonHref={course.buttonHref}
              buttonTitle={course.buttonTitle}
            />
          ))}
        </div>

        <div className={styles.my_filter_wrapper}>
          <div className={styles.my_title_wrapper}>
            <h2 className={styles.my_title_filter} id="allCourses">
              Все курсы
            </h2>
          </div>
          <div className={styles.filters}>
            {filters.map((filter) => {
              const isActive = allFilter === filter;
              return (
                <Button
                  key={`all-${filter}`}
                  size="m"
                  variant={isActive ? "filled" : "outline"}
                  color={getFilterButtonColor(filter)}
                  title={filter}
                  onClick={() => setAllFilter(filter)}
                />
              );
            })}
          </div>
        </div>

        <div className={styles.my_card_wrapper}>
          {filteredAllCourses.map((course) => (
            <Card
              key={course.id}
              category={course.category}
              title={course.title}
              description={`Прогресс: ${course.lessonsDone}/${course.lessonsTotal} уроков`}
              color={course.color}
              progress={course.progress}
              progressLabel="Прогресс курса"
              buttonHref={course.buttonHref}
              buttonTitle={course.buttonTitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
