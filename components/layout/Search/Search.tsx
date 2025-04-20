"use client";

import { useEffect, useRef } from "react";
import styles from "./Search.module.scss";
// Import motion components and types
import { motion, MotionProps, Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { FiSearch, FiX } from "react-icons/fi";

type SearchProps = {
  onClose: () => void;
} & MotionProps;

// --- Animation Variants ---

// Variants for the container that holds the search bar and quick links
const contentContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren", // Ensure children exit first
      staggerChildren: 0.05, // Stagger children exit slightly
      staggerDirection: -1, // Reverse stagger on exit
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Ensure container is ready before children animate in
      delayChildren: 0.1, // Small delay after main component animates before children start
      staggerChildren: 0.1, // Delay between each child animating in
    },
  },
};

// Variants for individual items (search bar, title, list items)
const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring", // Or "tween" with ease
      stiffness: 120,
      damping: 15,
      // ease: "easeOut", // Use if type is "tween"
      // duration: 0.3,  // Use if type is "tween"
    },
  },
  // Optional: define exit animation for items if needed, otherwise they'll just disappear
  // exit: { y: -10, opacity: 0 }
};

// --- Component ---

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
    // Main search container animation (e.g., scaleX, opacity defined in NavBar)
    <motion.div
      className={styles.search}
      ref={searchRef}
      {...motionProps} // Pass initial, animate, exit, transition from NavBar
      layout
    >
      {/* Inner container to manage staggered animations for content */}
      <motion.div
        className={styles.search__contentWrapper} // Optional: Add class if needed for styling
        variants={contentContainerVariants}
        initial="hidden" // Start children hidden
        animate="visible" // Animate children to visible
        exit="hidden" // Animate children out (if exit defined in itemVariants)
      >
        {/* Search Bar - Animated Item */}
        <motion.div className={styles.search__bar} variants={itemVariants}>
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
        </motion.div>

        {/* Quick Links Section - Animated Item */}
        <motion.div className={styles.quickLinks} variants={itemVariants}>
          {/* Title - Also animated (optional, could be part of quickLinks animation) */}
          <motion.h4
            className={styles.quickLinks__title}
            // variants={itemVariants} // Inherits from parent, or define specific variant if needed
          >
            QUICK LINKS
          </motion.h4>
          <ul className={styles.quickLinks__list}>
            {/* List Item - Animated Item */}
            {/* Wrap Link in motion.li */}
            <motion.li variants={itemVariants}>
              <Link href="/a-to-z">A to Z index</Link>
            </motion.li>
            {/* Add more motion.li items here if you have more links */}
            <motion.li variants={itemVariants}>
              <Link href="/another-link">Another Link</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href="/contact">Contact Us</Link>
            </motion.li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
export default Search;
