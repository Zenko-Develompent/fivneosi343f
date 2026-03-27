"use client";

import Link from "next/link";
import Input from "@/components/input/input";
import Button from "@/components/button/button";
import HipoLogin from "@/shared/assets/images/hipilogin.png";
import HandIcon from "@/shared/assets/icons/hand.svg";
import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.main}>
			<div className={styles.titlelogo}>Бегемоша</div>
      <div className={styles.loginWindow}>
        <div className={styles.leftPane}>
          <img className={styles.heroImage} src={HipoLogin.src} alt="Бегемоша" />
        </div>
        <div className={styles.forms}>
          <h1 className={styles.title}>Вход</h1>

          <h2 className={styles.hello}>
            Рады вас видеть!
            <img className={styles.helloIcon} src={HandIcon.src} alt="" aria-hidden="true" />
          </h2>

					<Input 
						label="Логин"
						placeholder="Введите email"
						type="email"
					/>

          <Input 
            label="Пароль"
            placeholder="Введите пароль"
            type="password"
          />

					<Button size="m" variant="filled" fullWidth 
						title="Войти"
					/>

          <p className={styles.registerText}>
            Еще нет аккаунта?{" "}
            <Link href="/registration" className={styles.registerLink}>
              Создать аккаунт
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
