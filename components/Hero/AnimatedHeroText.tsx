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

  const titleWords = t("title").split(" ");

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 1, 
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

  const paragraphAnimation = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
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
          <React.Fragment key={index}>
            <motion.span
              className="inline-block whitespace-nowrap"
              variants={wordAnimation}
            >
              {Array.from(word).map((char, charIndex) => (
                <motion.span
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
          </React.Fragment>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.7 }}
      >
        <motion.p
          variants={paragraphAnimation}
          className="relative"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {t("description")}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default AnimatedHeroText;
