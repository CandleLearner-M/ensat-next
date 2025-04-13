"use client";

import { SliderItem } from "@/components/Home/Community/communityDS";
import { motion, PanInfo, useAnimation, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import LearnMoreBtn from "../LearnMoreBtn";
import styles from "./Slider.module.scss";

function Slider({
  data,
  onClose,
}: {
  data: SliderItem[];
  onClose: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderControls = useAnimation();
  const slideWidth = 100;
  const threshold = 50;
  const constraintsRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const [dragStartPosition, setDragStartPosition] = useState(0);

  // Show content after main animation completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const goToNext = function () {
    if (currentIndex === data.length - 1) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const goToPrev = function () {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // Handler for close with animation sequence
  const handleClose = () => {
    setIsExiting(true);
    // Give time for content exit animations to play before overlay exits
    setTimeout(() => {
      onClose();
    }, 400);
  };

  useEffect(() => {
    sliderControls.start({
      x: `-${currentIndex * slideWidth}%`,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1], // Smooth cubic bezier
      },
    });

    setDragStartPosition(-currentIndex * slideWidth);
  }, [currentIndex, sliderControls]);

  const handleDragStart = function () {
    setIsDragging(true);
    setDragStartPosition(-currentIndex * slideWidth);
  };

  const handleDrag = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const delta = (info.offset.x / window.innerWidth) * 100;

    let newPosition = dragStartPosition + delta;
    if (currentIndex === 0 && delta > 0) {
      newPosition = delta * 0.2;
    } else if (currentIndex === data.length - 1 && delta < 0) {
      const maxNegativePosition = -(data.length - 1) * slideWidth;
      newPosition = maxNegativePosition + delta * 0.2;
    }

    sliderControls.set({ x: `${newPosition}%` });
  };

  const handleDragEnd = function (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) {
    setIsDragging(false);

    const offsetX = info.offset.x;

    if (currentIndex === 0 && offsetX > 0) {
      sliderControls.start({
        x: "0%",
        transition: {
          duration: 0.5,
          ease: [0.25, 1, 0.5, 1],
        },
      });
      return;
    } else if (currentIndex === data.length - 1 && offsetX < 0) {
      sliderControls.start({
        x: `-${(data.length - 1) * slideWidth}%`,
        transition: {
          duration: 0.5,
          ease: [0.25, 1, 0.5, 1],
        },
      });
      return;
    }

    if (offsetX > threshold) {
      goToPrev();
    } else if (offsetX < -threshold) {
      goToNext();
    } else {
      sliderControls.start({
        x: `-${currentIndex * slideWidth}%`,
        transition: {
          duration: 0.4,
          ease: [0.25, 1, 0.5, 1],
        },
      });
    }
  };

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
        duration: 0.5,
        ease: [0.36, 0, 0.66, -0.56], // Premium easing for exit
        when: "afterChildren",
        delayChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(8px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 0, 0.36, 1],
      },
    },
  };

  // Enhanced content animations with premium exit
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: [0.25, 0, 0.25, 1],
      },
    },
  };

  // Specialized exit animations for each content type
  const titleExitVariants = {
    exit: {
      opacity: 0,
      y: -40,
      filter: "blur(8px)",
      transition: {
        duration: 0.5,
        ease: [0.36, 0, 0.66, -0.56],
      },
    },
  };

  const descriptionExitVariants = {
    exit: {
      opacity: 0,
      y: -20,
      filter: "blur(4px)",
      transition: {
        duration: 0.4,
        ease: [0.36, 0, 0.66, -0.56],
      },
    },
  };

  const buttonExitVariants = {
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.9,
      transition: {
        duration: 0.3,
        ease: [0.36, 0, 0.66, -0.56],
      },
    },
  };

  // Enhanced image exit animation
  const imageExitVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: "blur(10px)",
      transition: {
        duration: 0.6,
        ease: [0.36, 0, 0.66, -0.56],
      },
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
      if (event.key === "ArrowRight") {
        goToNext();
      }
      if (event.key === "ArrowLeft") {
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, onClose, goToPrev, goToNext]);

  useEffect(() => {
    document.body.classList.add("slider-open");
    return () => {
      document.body.classList.remove("slider-open");
    };
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  return createPortal(
    <motion.div
      className={styles.slider}
      variants={overlayVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div
        className={styles.slidesWindow}
        ref={constraintsRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        <motion.div
          className={`${styles.slidesContainer} ${
            isDragging ? styles.grabbing : styles.grab
          }`}
          animate={sliderControls}
          drag="x"
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
        >
          {data.map((item, index) => (
            <motion.div key={index} className={styles.slide}>
              <div className={styles.slideInner}>
                <motion.div
                  className={styles.imageContainer}
                  initial="hidden"
                  animate={
                    isVisible && currentIndex === index ? "visible" : "hidden"
                  }
                  variants={contentVariants}
                  exit="exit"
                  variants={isExiting ? imageExitVariants : contentVariants}
                  custom={0}
                >
                  <Image
                    src={item.url}
                    alt={item.alt || "Slider Image"}
                    fill
                    style={{ objectFit: "cover" }}
                    quality={100}
                    priority={
                      index === currentIndex ||
                      index === (currentIndex + 1) % data.length ||
                      index === (currentIndex - 1 + data.length) % data.length
                    }
                    draggable={false}
                  />
                </motion.div>

                <div className={styles.slideDetails}>
                  <AnimatePresence mode="wait">
                    {currentIndex === index && (
                      <>
                        <motion.h2
                          key={`title-${index}`}
                          className={styles.slideTitle}
                          variants={contentVariants}
                          initial="hidden"
                          animate={isVisible ? "visible" : "hidden"}
                          exit="exit"
                          variants={
                            isExiting ? titleExitVariants : contentVariants
                          }
                          custom={1}
                          transition={{ delay: 0.1 }}
                        >
                          {item.title || `Image ${index + 1}`}
                        </motion.h2>

                        {item.text && (
                          <motion.p
                            key={`text-${index}`}
                            className={styles.slideDescription}
                            variants={contentVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            exit="exit"
                            variants={
                              isExiting
                                ? descriptionExitVariants
                                : contentVariants
                            }
                            custom={2}
                            transition={{ delay: 0.2 }}
                          >
                            {item.text}
                          </motion.p>
                        )}

                        {item.slug && (
                          <motion.div
                            key={`btn-${index}`}
                            variants={contentVariants}
                            initial="hidden"
                            animate={isVisible ? "visible" : "hidden"}
                            exit="exit"
                            variants={
                              isExiting ? buttonExitVariants : contentVariants
                            }
                            custom={3}
                            transition={{ delay: 0.3 }}
                          >
                            <LearnMoreBtn href={`/community/${item.slug}`}>
                              Learn More
                            </LearnMoreBtn>
                          </motion.div>
                        )}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.button
        className={styles.close}
        onClick={handleClose}
        variants={buttonVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Close slideshow"
      >
        <IoClose />
      </motion.button>

      <motion.button
        className={`${styles.previous} ${
          currentIndex === 0 ? styles.disabled : ""
        }`}
        variants={buttonVariants}
        whileHover={currentIndex !== 0 ? { scale: 1.1 } : undefined}
        whileTap={currentIndex !== 0 ? { scale: 0.95 } : undefined}
        onClick={goToPrev}
        aria-label="Previous slide"
        disabled={currentIndex === 0}
      >
        <MdChevronLeft />
      </motion.button>

      <motion.button
        className={`${styles.next} ${
          currentIndex === data.length - 1 ? styles.disabled : ""
        }`}
        variants={buttonVariants}
        whileHover={
          currentIndex !== data.length - 1 ? { scale: 1.1 } : undefined
        }
        whileTap={
          currentIndex !== data.length - 1 ? { scale: 0.95 } : undefined
        }
        onClick={goToNext}
        aria-label="Next slide"
        disabled={currentIndex === data.length - 1}
      >
        <MdChevronRight />
      </motion.button>
    </motion.div>,
    document.body
  );
}

export default Slider;
