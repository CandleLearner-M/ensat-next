import { FiSearch } from "react-icons/fi";
import Logo from "../../Logo/Logo";
import MenuBtn from "./MenuBtn";
import styles from "./NavBar.module.scss";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import SwapUp from "@/components/common/SwapUp";
import React, { useCallback, useEffect, useState } from "react";

import throttle from "lodash-es/throttle";

function NavBar() {
  const t = useTranslations("Navigation.NavBar");

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isTransparent, setIsTransparent] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledScrolledHandler = useCallback(
    throttle((currentPrevScrollPos) => {
      setIsTransparent(window.scrollY < 10);
      const currentScrollPos = window.scrollY;

      const isScrollingUp = currentPrevScrollPos > currentScrollPos;

      setVisible(isScrollingUp);

      setPrevScrollPos(currentScrollPos);
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

          <button className={styles.navbar__action} aria-label={t("search")}>
            <SwapUp custom={true}>
              <div
                className={`flex justify-space-between gap-6 transition-all duration-300 ease-in-out ${
                  !isTransparent ? "text-black" : "text-white"
                }`}
              >
                <FiSearch size={30} className={styles.navbar__icon} />
                <span className={`${styles.navbar__actionText}  `}>
                  {t("search")}
                </span>
              </div>
            </SwapUp>
          </button>

          <MenuBtn color={!isTransparent ? "black" : "white"} />
        </div>
      </div>
    </nav>
  );
}

export default React.memo(NavBar);
