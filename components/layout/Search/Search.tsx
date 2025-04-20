"use client";

import { useEffect, useRef } from "react";
import styles from "./Search.module.scss";
import { motion, MotionProps } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { FiSearch, FiX } from "react-icons/fi";

type SearchProps = {
  onClose: () => void;
} & MotionProps;

function Search({ onClose, ...motionProps }: SearchProps) {
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
      <div className={styles.search__bar}>
        <input
          type="text"
          className={styles.search__input}
          placeholder="Search ENSA Tanger..."
          autoFocus
        />
        <button className={styles.search__iconButton} aria-label="Search">
          <FiSearch size={20} />
        </button>
        <button
          className={styles.search__iconButton}
          onClick={onClose}
          aria-label="Close search"
        >
          <FiX size={24} />
        </button>
      </div>

      <div className={styles.quickLinks}>
        <h4 className={styles.quickLinks__title}>QUICK LINKS</h4>
        <ul className={styles.quickLinks__list}>
          <li>
            <Link href="/a-to-z">A to Z index</Link> {/* Example Link */}
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
export default Search;
