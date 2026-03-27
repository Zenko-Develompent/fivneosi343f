"use client";

import Input from "@/components/input/input";
import Button from "@/components/button/button";
import HipoChild from "@/shared/assets/images/hipochild.png";
import HipoParent from "@/shared/assets/images/hipoparent.png";
import HippoHello from "@/shared/assets/images/hippohello.png";
import styles from "./registration.module.css";
export default function RegistrationPage() {
  return (
    <div>
      <div className={styles.main}>
        <div className={styles.registrationWindow}>
          <h1 className={styles.title}>Регистрация</h1>
						<img className={styles.heroImage} src={HippoHello.src} alt="Бегемоша"/>
          <div className={styles.forms}>
            <Input
              label="Имя и фамилия"
              placeholder="Введите имя и фамилию"
              type="text"
            />
            <Input label="Почта" placeholder="Введите почту" type="email" />
            <Input
              label="Пароль"
              placeholder="Введите пароль"
              type="password"
            />
            <Button
              size="m"
              variant="filled"
              color="logo"
              fullWidth
              title="Создать аккаунт"
            />

            <div className="hadaccount">
              <span>Уже есть аккаунт?</span> <a href="#">Войти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
