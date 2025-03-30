import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HeroAnimation.module.scss";

function AnimatedHeroText({
  isVisible,
  className,
}: {
  isVisible: boolean;
  className: string;
}) {
  const t = useTranslations("Hero");

  // Container animation (subtle fade in)
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  // Title animation - Split into words
  const titleWords = t("title").split(" ");

  // Words animation variant
  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  // Character animation variant - keeping the scale at 1 to prevent text size changes
  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 1, // Changed from 0.9 to 1 to maintain original size
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Subtitle animation with a subtle slide effect
  const subtitleAnimation = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
        delay: 0.5, // Start after title animation
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerAnimation}
    >
      <motion.h1
        className={`overflow-hidden pb-2 ${styles.heroTitle}`}
        style={{ fontSize: "2rem !important" }}
      >
        {titleWords.map((word, index) => (
          <>
            <motion.span
              key={index}
              className="inline-block whitespace-nowrap"
              variants={wordAnimation}
              >
              {Array.from(word).map((char, charIndex) => (
                <motion.span
                // style={{ fontSize: "1rem !important", backgroundColor: "green" }}
                  key={`${index}-${charIndex}`}
                  className="inline-block"
                  variants={characterAnimation}
                  transition={{
                    delay: index * 0.08 + charIndex * 0.03,
                    type: "spring",
                    damping: 12,
                    stiffness: 100,
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.span>
            {/* Add space after each word except the last one */}
            {index < titleWords.length - 1 && " "}
          </>
        ))}
      </motion.h1>

      <motion.p variants={subtitleAnimation} className="relative inline-block">
        {t("description")}
        <motion.span
          className="absolute bottom-0 left-0 w-full h-[2px] bg-current"
          initial={{ scaleX: 0, originX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      </motion.p>
    </motion.div>
  );
}

export default AnimatedHeroText;
