"use client";

import { useEffect, useRef } from "react";
import styles from "./Search.module.scss";
import { motion, MotionProps } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import { useTranslations } from "next-intl";

const searchBarVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      type: "spring",
      stiffness: 300,
      damping: 20,
    },
  },
};

const quickLinksVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3 + custom * 0.1,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
};

type SearchProps = {
  onClose: () => void;
} & MotionProps;

function Search({ onClose, ...motionProps }: SearchProps) {
  const t = useTranslations("Search");
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <motion.div
      className={styles.search}
      ref={searchRef}
      {...motionProps}
      layout
    >
      <motion.div
        className={styles.search__bar}
        variants={searchBarVariants}
        initial="hidden"
        animate="visible"
      >
        <input
          type="text"
          className={styles.search__input}
          placeholder={t("placeholder")}
          autoFocus
        />
        <motion.button
          className={styles.search__iconButton}
          aria-label={t("search")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiSearch size={20} />
        </motion.button>
        <motion.button
          className={styles.search__iconButton}
          onClick={onClose}
          aria-label={t("close")}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiX size={24} />
        </motion.button>
      </motion.div>

      <motion.div
        className={styles.quickLinks}
        variants={quickLinksVariants}
        initial="hidden"
        animate="visible"
      >
        <h4 className={styles.quickLinks__title}>{t("quickLinks.title")}</h4>
        <ul className={styles.quickLinks__list}>
          <motion.li
            custom={0}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/a-to-z">{t("quickLinks.aToZ")}</Link>
          </motion.li>
          <motion.li
            custom={1}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/courses">{t("quickLinks.courses")}</Link>
          </motion.li>
          <motion.li
            custom={2}
            variants={listItemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/programs">{t("quickLinks.programs")}</Link>
          </motion.li>
        </ul>
      </motion.div>
    </motion.div>
  );
}

export default Search;
