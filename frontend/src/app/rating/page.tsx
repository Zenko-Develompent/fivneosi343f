import Header from "@/components/header/header";
import LevelBadge from "@/components/levelBadge/levelBadge";
import CoinIcon from "@/shared/assets/icons/coin.svg";
import styles from "./rating.module.css";

interface StudentRatingItem {
  id: string;
  name: string;
  coins: number;
  level: number;
}

const topStudents: StudentRatingItem[] = [
  { id: "1", name: "Алина Смирнова", coins: 8920, level: 9 },
  { id: "2", name: "Тимур Ахметов", coins: 8410, level: 9 },
  { id: "3", name: "Мария Петрова", coins: 8035, level: 8 },
  { id: "4", name: "Арсен Иманов", coins: 7640, level: 8 },
  { id: "5", name: "София Ким", coins: 7280, level: 8 },
  { id: "6", name: "Данил Волков", coins: 7015, level: 7 },
  { id: "me", name: "Ник", coins: 6920, level: 7 },
  { id: "8", name: "Ева Соколова", coins: 6880, level: 7 },
  { id: "9", name: "Роман Беляев", coins: 6645, level: 7 },
  { id: "10", name: "Омар Ибрагимов", coins: 6405, level: 7 },
];

export default function RatingPage() {
  const topTenStudents = topStudents.slice(0, 10);
  const currentUserId = "me";
  const currentUserPosition = topTenStudents.findIndex((student) => student.id === currentUserId) + 1;

  const getWinnerClass = (index: number): string => {
    if (index === 0) return styles.winnerGold;
    if (index === 1) return styles.winnerSilver;
    if (index === 2) return styles.winnerBronze;
    return "";
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.content}>
        <h1 className={styles.title}>Топ учеников</h1>
        <p className={styles.subtitle}>Рейтинг обновляется по количеству заработанных койнов.</p>
        <p className={styles.userPosition}>
          Твоя позиция:{" "}
          <strong className={styles.userPositionValue}>
            {currentUserPosition > 0 ? `${currentUserPosition} место` : "вне топ-10"}
          </strong>
        </p>

        <ol className={styles.list}>
          {topTenStudents.map((student, index) => (
            <li
              key={student.id}
              className={`${styles.row} ${getWinnerClass(index)} ${student.id === currentUserId ? styles.rowCurrentUser : ""}`.trim()}
            >
              <span className={`${styles.place} ${getWinnerClass(index)}`.trim()}>{index + 1}</span>

              <div className={styles.studentInfo}>
                <p className={styles.studentName}>{student.name}</p>
                <LevelBadge level={student.level} tone="orange" className={styles.studentLevelBadge} />
              </div>

              <p className={styles.coins}>
                <span>{student.coins}</span>
                <img src={CoinIcon.src} alt="" aria-hidden="true" />
              </p>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}
