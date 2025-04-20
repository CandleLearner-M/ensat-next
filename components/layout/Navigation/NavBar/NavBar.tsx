"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import MenuBtn from "./MenuBtn";
import styles from "./NavBar.module.scss";

import { AnimatePresence } from "framer-motion";
import throttle from "lodash-es/throttle";
import Search from "../../Search/Search";
import { debounce } from "lodash-es";

function NavBar() {
  const t = useTranslations("Navigation.NavBar");

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const checkIfAtTop = useCallback(() => {
    setIsTransparent(window.scrollY < 10);
  }, []);

  // This will run after scrolling stops
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScrollEnd = useCallback(
    debounce(() => {
      checkIfAtTop();
    }, 150),
    [checkIfAtTop]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledScrolledHandler = useCallback(
    throttle((currentPrevScrollPos) => {
      checkIfAtTop();

      const currentScrollPos = window.scrollY;

      const isScrollingUp = currentPrevScrollPos > currentScrollPos;

      setVisible(isScrollingUp);
      setPrevScrollPos(currentScrollPos);

      debouncedScrollEnd();
    }, 100),
    []
  );

  const handleScroll = useCallback(() => {
    throttledScrolledHandler(prevScrollPos);
  }, [prevScrollPos, throttledScrolledHandler]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      throttledScrolledHandler.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, throttledScrolledHandler]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseSearch();
      }
    };

    if (isSearchOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchOpen, handleCloseSearch]);

  return (
    <nav
      className={`${styles.navbar} ${
        visible ? styles.navbar__visible : styles.navbar__hidden
      } ${isTransparent ? styles.navbar__transparent : ""}`}
    >
      <div className={styles.navbar__container}>
        <div className={styles.navbar__brand}>
          <Link href="/" className={styles.navbar__logo}>
            <Logo color={!isTransparent ? "black" : "white"} />
          </Link>
        </div>

        <div className={styles.navbar__actions}>
          <LocaleSwitcher txtColor={isTransparent ? "white" : "black"} />

          <button
            className={`${styles.navbar__action} ${styles.searchBtn}`}
            aria-label={t("search")}
            onClick={() => setIsSearchOpen(true)}
          >
            <div
              className={`flex justify-space-between gap-6 transition-all duration-300 ease-in-out ${
                !isTransparent ? "text-black" : "text-white"
              } ${styles.action} `}
            >
              <FiSearch size={30} className={styles.navbar__icon} />
              <span className={`${styles.navbar__actionText}  `}>
                {t("search")}
              </span>
            </div>
          </button>

          <MenuBtn color={!isTransparent ? "black" : "white"} />
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (
          <Search
            onClose={handleCloseSearch}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            key={"search"}
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

export default React.memo(NavBar);
