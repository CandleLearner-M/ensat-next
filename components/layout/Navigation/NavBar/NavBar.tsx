"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import React, { useCallback, useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import LocaleSwitcher from "./LocaleSwitcher";
import MenuBtn from "./MenuBtn";
import styles from "./NavBar.module.scss";

import { AnimatePresence } from "framer-motion";
import throttle from "lodash-es/throttle";
import Search from "../../Search/Search";
import { debounce } from "lodash-es";
import { usePathname } from "next/navigation";

function NavBar(): React.ReactElement {
  const t = useTranslations("Navigation.NavBar");

  const [prevScrollPos, setPrevScrollPos] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);
  const [isTransparent, setIsTransparent] = useState<boolean>(true);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const pathName = usePathname();
  const transparentable = !pathName.includes("news");

  const isTransparentRef = useRef<boolean>(isTransparent);
  isTransparentRef.current = isTransparent;

  const handleCloseSearch = useCallback(() => {
    setIsSearchOpen(false);
  }, []);

  const checkIfAtTop = useCallback(() => {
    const shouldBeTransparent = window.scrollY < 10 && transparentable;
    if (isTransparentRef.current !== shouldBeTransparent) {
      setIsTransparent(shouldBeTransparent);
    }
  }, [transparentable]);

  const debouncedScrollEnd = useCallback(
    debounce(() => {
      checkIfAtTop();
    }, 150),
    [checkIfAtTop]
  );

  const throttledScrolledHandler = useCallback(
    throttle((currentScrollPos: number) => {
      const newScrollPos = window.scrollY;
      const isScrollingUp = currentScrollPos > newScrollPos;

      checkIfAtTop();
      setVisible(isScrollingUp);
      setPrevScrollPos(newScrollPos);
      debouncedScrollEnd();
    }, 100),
    [checkIfAtTop, debouncedScrollEnd]
  );

  const handleScroll = useCallback(() => {
    throttledScrolledHandler(prevScrollPos);
  }, [prevScrollPos, throttledScrolledHandler]);

  useEffect(() => {
    const shouldBeTransparent = window.scrollY < 10 && transparentable;
    setIsTransparent(shouldBeTransparent);

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      throttledScrolledHandler.cancel();
      debouncedScrollEnd.cancel();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    handleScroll,
    throttledScrolledHandler,
    debouncedScrollEnd,
    transparentable, // Correct to include this dependency
  ]);

  // Separate effect for path changes
  useEffect(() => {
    checkIfAtTop();
  }, [pathName, checkIfAtTop]);

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
