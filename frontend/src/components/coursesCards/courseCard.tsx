import styles from "./courseCard.module.css";

interface CardProps {
  category: string;
  title: string;
  description?: string;
  onClick?: () => void;
  backgroundColor?: string;
  textColor?: string;
  descriptionColor?: string; // отдельный цвет для описания
  children?: React.ReactNode;
}

export default function Card({
  category,
  title,
  description,
  onClick,
  backgroundColor,
  textColor,
  descriptionColor,
  children,
}: CardProps) {
  const customStyle = {
    ...(backgroundColor && { backgroundColor }),
    ...(textColor && { color: textColor }),
  };

  const descriptionStyle = {
    ...(descriptionColor && { color: descriptionColor }),
  };

  return (
    <div className={styles.card} style={customStyle} onClick={onClick}>
      <span className={styles.category}>{category}</span>
      <h3 className={styles.title}>{title}</h3>
      {description && (
        <p className={styles.description} style={descriptionStyle}>
          {description}
        </p>
      )}
      <button className={styles.button}>Просмотреть подробнее</button>
      {children}
    </div>
  );
}
