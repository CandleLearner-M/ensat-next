"use client";

import { SliderItem } from "@/components/Home/Community/communityDS";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import LearnMoreBtn from "../LearnMoreBtn";
import styles from "./Slider.module.scss";
import { useSwipeable } from "react-swipeable";

function Slider({
  data,
  onClose,
}: {
  data: SliderItem[];
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = function () {
    setCurrentIndex((prev) => (prev + 1) % data.length);
  };

  const goToPrev = function () {
    setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handlers = useSwipeable({
    onSwipedLeft: goToNext,
    onSwipedRight: goToPrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const overlayVariants = {
    hidden: {
      clipPath: "inset(50% 50% 50% 50%)",
      backgroundColor: "rgba(14, 14, 14, 0)",
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      backgroundColor: "rgba(14, 14, 14, 0.98)",
      transition: {
        clipPath: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        backgroundColor: { duration: 0.5, delay: 0.2 },
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      clipPath: "inset(50% 50% 50% 50%)",
      backgroundColor: "rgba(14, 14, 14, 0)",
      transition: {
        clipPath: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
        backgroundColor: { duration: 0.3 },
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

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
      <div className={styles.slidesWindow} {...handlers}>
        <motion.div
          className={styles.slidesContainer}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5 }}
        >
          {data.map((item, index) => (
            <motion.div key={index} className={styles.slide}>
              <div className={styles.slideInner}>
                <div className={styles.imageContainer}>
                  <Image
                    src={item.url}
                    alt={item.alt || "Slider Image"}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                  />
                </div>

                <div className={styles.slideDetails}>
                  <h2 className={styles.slideTitle}>
                    {item.title || `Image ${currentIndex + 1}`}
                  </h2>

                  {item.text && (
                    <p className={styles.slideDescription}>{item.text}</p>
                  )}

                  {item.slug && (
                    <LearnMoreBtn href={`/community/${item.slug}`}>
                      Learn More
                    </LearnMoreBtn>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        className={styles.close}
        onClick={onClose}
        variants={buttonVariants}
      >
        <IoClose />
      </motion.button>

      <motion.button
        className={styles.previous}
        variants={buttonVariants}
        onClick={goToPrev}
      >
        <MdChevronLeft />
      </motion.button>

      <motion.button
        className={styles.next}
        variants={buttonVariants}
        onClick={goToNext}
      >
        <MdChevronRight />
      </motion.button>
    </motion.div>,
    document.body
  );
}

export default Slider;
