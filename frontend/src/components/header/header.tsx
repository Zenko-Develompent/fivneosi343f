"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./header.module.css";
import AccountIcon from "@/shared/assets/icons/account_circle.svg";
import CoinIcon from "@/shared/assets/icons/coin.svg";
import LogoIcon from "@/shared/assets/icons/logo.svg";
import { ApiError, getMyProfile } from "@/shared/api/client";
import { clearTokens, getAccessToken } from "@/shared/auth/tokens";

interface HeaderProfile {
  firstName: string;
  lastName: string | null;
  mail: string;
  totalXp: number;
}

interface ProfileXpUpdatedDetail {
  totalXp?: number;
  deltaXp?: number;
}

export default function Header() {
  const router = useRouter();
  const [isCabinetOpen, setIsCabinetOpen] = useState(false);
  const [profile, setProfile] = useState<HeaderProfile | null>(null);
  const [hasSession, setHasSession] = useState(false);
  const profileWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    setHasSession(Boolean(token));

    if (!token) {
      setProfile(null);
      return;
    }

    let cancelled = false;

    const loadProfile = async () => {
      try {
        const response = await getMyProfile();

        if (cancelled) {
          return;
        }

        setProfile({
          firstName: response.first_name,
          lastName: response.last_name,
          mail: response.mail,
          totalXp: response.total_xp,
        });
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          clearTokens();
          if (!cancelled) {
            setHasSession(false);
          }
        }

        if (!cancelled) {
          setProfile(null);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isCabinetOpen || !hasSession) {
      return;
    }

    let cancelled = false;

    const refreshProfile = async () => {
      try {
        const response = await getMyProfile();

        if (cancelled) {
          return;
        }

        setProfile({
          firstName: response.first_name,
          lastName: response.last_name,
          mail: response.mail,
          totalXp: response.total_xp,
        });
      } catch {
        if (!cancelled) {
          setProfile(null);
        }
      }
    };

    void refreshProfile();

    return () => {
      cancelled = true;
    };
  }, [hasSession, isCabinetOpen]);

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

    function handleXpUpdated(event: Event) {
      const detail = (event as CustomEvent<ProfileXpUpdatedDetail>).detail;
      const totalXp = typeof detail?.totalXp === "number" ? detail.totalXp : null;
      const deltaXp = typeof detail?.deltaXp === "number" ? detail.deltaXp : 0;

      setProfile((previous) => {
        if (!previous) {
          return previous;
        }

        const nextTotalXp = totalXp ?? Math.max(0, previous.totalXp + deltaXp);
        return {
          ...previous,
          totalXp: nextTotalXp,
        };
      });
    }

    window.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("keydown", handleEscape);
    window.addEventListener("profile:xp-updated", handleXpUpdated as EventListener);
    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("profile:xp-updated", handleXpUpdated as EventListener);
    };
  }, []);

  const nickname = profile
    ? `${profile.firstName}${profile.lastName ? ` ${profile.lastName}` : ""}`
    : "Гость";
  const email = profile?.mail ?? "Войдите в аккаунт";
  const coins = profile?.totalXp ?? 0;
  const cabinetLink = hasSession ? "/account" : "/login";
  const cabinetLinkTitle = hasSession ? "Открыть кабинет" : "Войти";

  const handleLogout = () => {
    clearTokens();
    setHasSession(false);
    setProfile(null);
    setIsCabinetOpen(false);
    router.push("/login");
  };

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
            <p className={styles.popupTitle}>
              {hasSession ? "Личный кабинет" : "Гостевой режим"}
            </p>

            <Link href={cabinetLink} className={styles.popupButton} onClick={() => setIsCabinetOpen(false)}>
              {cabinetLinkTitle}
            </Link>

            {hasSession && (
              <button type="button" className={styles.popupLogout} onClick={handleLogout}>
                Выйти
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
