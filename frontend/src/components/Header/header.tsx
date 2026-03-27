"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import AccountIcon from "@/shared/assets/icons/account_circle.svg";
import CoinIcon from "@/shared/assets/icons/coin.svg";
import LogoIcon from "@/shared/assets/icons/logo.svg";

const coins = 4236;
const nickname = "Ник";
const email = "pochta@mail.ru";

export default function Header() {
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!profileWrapRef.current) {
        return;
      }

      if (!profileWrapRef.current.contains(event.target as Node)) {
        setIsCabinetOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsCabinetOpen(false);
      }
    }

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <img className={styles.logoImage} src={LogoIcon.src} alt="Логотип Бегемоша" />
        БЕГЕМОША
      </Link>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link href="/#myCourses" className={styles.link}>
              Мои курсы
            </Link>
          </li>
          <li>
            <Link href="/#aboutPlatform" className={styles.link}>
              О платформе
            </Link>
          </li>
          <li>
            <Link href="/#allCourses" className={styles.link}>
              Все курсы
            </Link>
          </li>
          <li>
            <Link href="/rating" className={styles.link}>
              Топ учеников
            </Link>
          </li>
        </ul>
      </nav>

      <div className={styles.profileWrap} ref={profileWrapRef}>
        <button
          type="button"
          className={styles.profile}
          aria-label="Открыть кабинет"
          aria-expanded={isCabinetOpen}
          aria-controls="cabinet-popup"
          onClick={() => setIsCabinetOpen((prev) => !prev)}
        >
          <img src={AccountIcon.src} alt="" />
        </button>

        {isCabinetOpen && (
          <div id="cabinet-popup" className={styles.cabinetPopup} role="dialog" aria-label="Кабинет">
            <p className={styles.popupCoins}>
              <span>{coins}</span>
              <img src={CoinIcon.src} alt="" aria-hidden="true" />
            </p>

            <div className={styles.popupDivider} />

            <p className={styles.popupNick}>{nickname}</p>
            <p className={styles.popupEmail}>{email}</p>
            <p className={styles.popupTitle}>Личный кабинет</p>

            <Link href="/account" className={styles.popupButton} onClick={() => setIsCabinetOpen(false)}>
              Открыть кабинет
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
