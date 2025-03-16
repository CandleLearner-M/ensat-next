"use client";

import styles from "./HeroAnimation.module.scss";

import { useEffect, useState } from "react";
import AnimatedLine from "./AnimatedLine";
import AnimatedHeroText from "./AnimatedHeroText";

function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
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
        delay={1}
      />
    </div>
  );
}
export default HeroAnimation;
