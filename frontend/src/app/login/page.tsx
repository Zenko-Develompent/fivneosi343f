'use client'
import { useRouter } from "next/navigation";
import styles from './login.module.css';
export default function LoginPage() {
  const router = useRouter();

  return (
    <div>
      <div className={styles.main}>
        <div className={styles.loginWindow}>
            <h1 className={styles.title}>Вход</h1>
            <div className={styles.hipoinfo}>
              <div className={styles.imageHipos}>
                <div className={styles.image}></div>
                {/* <img src="" alt="Два бегемота" /> */}
              </div>
            </div>
            <div className={styles.forms}>
              <label htmlFor="login">Логин</label>
              <input id="login" type="email" placeholder='Введите почту'/>
              <label htmlFor="password">Пароль</label>
              <input id="password" type="password" placeholder='Введите пароль'/>
              <button type="button" onClick={() => router.push("/dashboard")}>Войти</button>
              <span>Ещё нет аккаунта?</span> <a href="/registration">Создать</a>
            </div>
        </div>
      </div>
    </div>
  );
}
