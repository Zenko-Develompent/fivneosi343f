"use client";

import styles from "./header.module.css";
import AccountIcon from "@/shared/assets/icons/account_circle.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        Бегемоша
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="#!" className={styles.link}>
              Мои курсы
            </Link>
          </li>
          <li>
            <Link href="#!" className={styles.link}>
              О платформе
            </Link>
          </li>
          <li>
            <Link href="#!" className={styles.link}>
              Все курсы
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.profile}>
        <img src={AccountIcon.src} alt="" />
      </div>
    </header>
  );
}

// {!isAuth ? <li>
//           <a href="!#">О нас</a>
//         </li>:  }
