"use client";

import styles from "./HeroAnimation.module.scss";

import { useEffect, useState } from "react";
import AnimatedLine from "./AnimatedLine";
import AnimatedHeroText from "./AnimatedHeroText";
import { useMousePosition } from "@/utils/useMousePosition";

import { motion } from "framer-motion";

function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();

  const size = isHovered ? 400 : 30;

  const color = isHovered ? "#002efe" : "rgba(0, 46, 254, 1)";

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      <motion.div
        className={styles.mask}
        initial={{ WebkitMaskPosition: `${-100}% ${-100}%`, WebkitMaskSize: 0 }}
        animate={{
          WebkitMaskSize: `${size}px`,
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          backgroundColor: color,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
      >
        <div className={styles.mask__text}>
          <AnimatedLine
            className={`${styles.mask__line} ${styles.mask__line_top}`}
            height="20vh"
            isVisible={isVisible}
          />

          <h1
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ color: "black" }}
          >
            Université Abdelmalek Essaadi{" "}
          </h1>
          <p
            style={{ color: "black" }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            L’ENSAT, depuis 1998 : une formation d’ingénieur d’excellence,
            tournée vers l’innovation et l’industrie.
          </p>
          <AnimatedLine
            className={`${styles.mask__line} ${styles.mask__line_bottom}`}
            height="toBottom"
            isVisible={isVisible}
            delay={1.4}
          />
        </div>
      </motion.div>
      <div className={styles.hero}>
        <AnimatedLine
          className={`${styles.hero__line} ${styles.hero__line_top}`}
          height="20vh"
          isVisible={isVisible}
        />

        <AnimatedHeroText className={styles.hero__text} isVisible={isVisible} />
        <AnimatedLine
          className={`${styles.hero__line} ${styles.hero__line_bottom}`}
          height="toBottom"
          isVisible={isVisible}
          delay={1.4}
        />
      </div>
    </>
  );
}
export default HeroAnimation;
