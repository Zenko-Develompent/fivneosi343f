import styles from "./input.module.css";

interface InputProps {
	label: string;
	placeholder: string;
	type: string;
}

export default function Input({ label, placeholder, type }: InputProps) {
	return (
		<div className={styles.wrapper}>
			<label htmlFor="login" className={styles.label}> {label} </label>
			<input id="login" type={type} placeholder={placeholder} className={styles.input}/>
		</div>
	);
}