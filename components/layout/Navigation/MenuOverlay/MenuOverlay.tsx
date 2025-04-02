"use client";

import Logo from "@/components/layout/Logo/Logo";
import { useScreenSize } from "@/utils/useScreenSize";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useNavigation } from "../state/context";
import Background from "./Background/Background";
import ContentArea from "./ContentArea/ContentArea";
import styles from "./MenuOverlay.module.scss";
import SideBar from "./SideBar/SideBar";
import MobileSideBar from "./SideBar/MobileSideBar";
import TabletSideBar from "./SideBar/TabletSideBar";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type MenuOverlayProps = {
  initial: { y: string };
  animate: { y: number };
  exit: { y: string };
  transition: { type: string; stiffness: number; damping: number };
  key: string;
};

function MenuOverlay({ ...motionProps }: MenuOverlayProps) {
  const {
    state: { selectedMenuItem, backgroundImage },
  } = useNavigation();

  const { isDesktop, isMobile, isTablet } = useScreenSize();

  return (
    <motion.div className={styles.menu} {...motionProps}>
      <MenuNavBar />
      {(isDesktop || isTablet) && backgroundImage && (
        <Background src={backgroundImage} />
      )}

      {isMobile && <MobileSideBar />}
      {isTablet && <TabletSideBar />}
      {isDesktop && <SideBar />}
      {selectedMenuItem && isDesktop && <ContentArea />}

      <MenuFooter />
    </motion.div>
  );
}
export default MenuOverlay;

function MenuFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations("Navigation.MenuOverlay");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const footerItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <footer className={styles.menu__footer}>
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.li variants={footerItemVariants}>
          <span>{t("quickLinks")}</span>
          <GrFormNext className={styles.menu__footer__symbol} />
        </motion.li>
        <motion.li variants={footerItemVariants}>
          <Link href="/news">{t("news")}</Link>
        </motion.li>

        <motion.li variants={footerItemVariants}>
          <Link href="/defenses">{t("defenses")}</Link>
        </motion.li>
        <motion.li variants={footerItemVariants}>
          <Link href="/contact">{t("contact")}</Link>
        </motion.li>
      </motion.ul>
    </footer>
  );
}

function MenuNavBar() {
  const { dispatch } = useNavigation();
  const t = useTranslations("Navigation.MenuOverlay");

  return (
    <nav className={styles.menu__nav}>
      <ul>
        <li>
          <Link href="/" onClick={() => dispatch({ type: "CLOSE_MENU" })}>
            <Logo />
          </Link>
        </li>
        <li onClick={() => dispatch({ type: "CLOSE_MENU" })}>
          <span className={styles.menu__nav__close}>{t("close")}</span>
          <IoIosCloseCircleOutline size={38} className={styles.close} />
        </li>
      </ul>
    </nav>
  );
}
