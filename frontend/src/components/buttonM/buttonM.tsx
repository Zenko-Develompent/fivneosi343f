import { title } from "process";
import styles from "./buttonM.module.css";

interface ButtonProps {
	title: string;
}

export default function ButtonM({title}: ButtonProps) {
	return (
		<button className={styles.button}>
			{title}
		</button>
	);
}