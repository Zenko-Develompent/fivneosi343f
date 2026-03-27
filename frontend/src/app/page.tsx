import Card from "@/components/coursesCards/courseCard";
import HipoImg from "@/shared/assets/images/hipocatalog.png";
import styles from "./page.module.css";
export default function Home() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.aboutus}>
          <div className={styles.imageHipo}>
            <img src={HipoImg.src} alt="" />
          </div>
          <div className={styles.description}>
            <h2 className={styles.title}>О платформе</h2>
            <p className={styles.text}>
              сюда какой-нибдуь текст накинуть много текста реально много текста
              надо дальше карточки будут кекв
            </p>
          </div>
        </div>

        <div className={styles.my_filter_wrapper}>
          <div className={styles.my_title_wrapper}>
            <h2 className={styles.my_title_filter}>Мои курсы</h2>
          </div>
          <div className={styles.filters}>
            <p>сюда компоненты кнопок надо сделать</p>
            <p>я хочу спать </p>
            <p>время 5:35</p>
          </div>
        </div>
        <div className={styles.my_card_wrapper}>
          <Card
            category="Категория"
            title="Название"
            description="прогрес бар)"
            backgroundColor="green"
            textColor="white"
          />
          <Card
            category="Категория"
            title="Название"
            description="прогрес бар)"
            backgroundColor="green"
            textColor="white"
          />
          <Card
            category="Категория"
            title="Название"
            description="прогрес бар)"
            backgroundColor="green"
            textColor="white"
          />
        </div>
        <div className={styles.filter_wrapper}>
          <div className={styles.title_wrapper}>
            <h2 className={styles.title_filter}>Все курсы</h2>
          </div>
          <div className={styles.filters}>
            <p>сюда компоненты кнопок надо сделать</p>
            <p>я хочу спать </p>
            <p>время 5:35</p>
          </div>
        </div>
        <div className={styles.card_wrapper}>
          <Card
            category="Категория"
            title="Название"
            description="текст о том как олег хотел спать"
            backgroundColor="blue"
            textColor="white"
          />
          <Card
            category="Категория"
            title="Название"
            description="текст о том как олег хотел спать"
            backgroundColor="blue"
            textColor="white"
          />
          <Card
            category="Категория"
            title="Название"
            description="текст о том как олег хотел спать"
            backgroundColor="blue"
            textColor="white"
          />
        </div>
      </div>
    </div>
  );
}
