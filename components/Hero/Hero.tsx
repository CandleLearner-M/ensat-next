"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import HeroBackground from "./HeroBackground";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const lineVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0.8, 1],
      height: "28vh",
      transition: {
        height: { duration: 2, ease: [0.19, 1, 0.22, 1] },
        opacity: { duration: 2.2, ease: [0, 0.4, 0.7, 1] },
      },
    },
  };
 
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 80,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className={styles.hero}>
      <HeroBackground />
     

      <motion.div
        className={styles.hero_text_content}
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
        variants={containerVariants}
      >
        <motion.h1 variants={textVariants}>
          École Nationale des Sciences Appliquées de Tanger
        </motion.h1>
        <motion.p variants={textVariants}>
          L’ENSAT, depuis 1998 : une formation d’ingénieur d’excellence, tournée
          vers l’innovation et l’industrie.
        </motion.p>
      </motion.div>

      <motion.div
        initial="initial"
        animate={isVisible ? "animate" : "initial"}
        variants={bottomLineVariants}
        className={styles.growing_bottom_line}
      ></motion.div>
    </main>
  );
}
export default Hero;
