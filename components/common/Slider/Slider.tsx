"use client";

import { SliderItem } from "@/components/Home/Community/communityDS";
import { IoClose } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import styles from "./Slider.module.scss";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, stagger } from "framer-motion";

function Slider({
  data,
  onClose,
}: {
  data: SliderItem[];
  onClose: () => void;
}) {
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1],
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.34, 1.3, 0.64, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 10,
      transition: {
        duration: 0.25,
        ease: [0.34, 1.3, 0.64, 1],
      },
    },
  };

  // New animation variants for the buttons
  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.3, 0.64, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: [0.34, 1.3, 0.64, 1],
      },
    },
  };

  useEffect(() => {
    document.body.classList.add("slider-open");
    return () => {
      document.body.classList.remove("slider-open");
    };
  }, []);

  return createPortal(
    <motion.div
      className={styles.slider}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div className={styles.sliderContent} variants={contentVariants}>
        {/* Content will go here */}
      </motion.div>

      {/* Animate buttons independently with their own variants */}
      <motion.button
        className={styles.close}
        onClick={onClose}
        variants={buttonVariants}
      >
        <IoClose />
      </motion.button>

      <motion.button className={styles.previous} variants={buttonVariants}>
        <MdChevronLeft />
      </motion.button>

      <motion.button className={styles.next} variants={buttonVariants}>
        <MdChevronRight />
      </motion.button>
    </motion.div>,
    document.body
  );
}

export default Slider;
