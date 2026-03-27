import Button from "@/components/button/button";
import styles from "./courseCard.module.css";

type CardColor = "blue" | "orange";

interface CardProps {
  category: string;
  title: string;
  description?: string;
  color?: CardColor;
  children?: React.ReactNode;
}

export default function Card({
  category,
  title,
  description,
  color = "blue",
  children,
}: CardProps) {
  const isBlue = color === "blue";
  const cardClass = isBlue ? styles.cardBlue : styles.cardOrange;
  const categoryClass = isBlue ? styles.categoryBlue : styles.categoryOrange;
  const buttonColor = isBlue ? "blue" : "orange";

  return (
    <div className={`${styles.card} ${cardClass}`}>
      <span className={`${styles.category} ${categoryClass}`}>{category}</span>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      <Button
        title="Подробнее о курсе"
        size="m"
        variant="filled"
        color={buttonColor}
        fullWidth
        className={styles.button}
      />
      {children}
    </div>
  );
}
