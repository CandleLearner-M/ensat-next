"use client";

import styles from "./HeroAnimation.module.scss";

import { useEffect, useState } from "react";
import AnimatedLine from "./AnimatedLine";

function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={styles.hero_animation}>
      <AnimatedLine
        className={styles.upper_line}
        height="25vh"
        isVisible={isVisible}
      />
      <AnimatedLine
        className={styles.bottom_line}
        height="25vh"
        isVisible={isVisible}
        delay={1.4}
      />
    </div>
  );
}
export default HeroAnimation;
