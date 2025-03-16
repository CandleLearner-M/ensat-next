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
    <div className={styles.hero_animation}>
      <AnimatedLine
        className={styles.upper_line}
        height="25vh"
        isVisible={isVisible}
      />

      <AnimatedHeroText className={styles.hero_text} isVisible={isVisible} />
      <AnimatedLine
        className={styles.bottom_line}
        height="28vh"
        isVisible={isVisible}
        delay={1}
        
      />
    </div>
  );
}
export default HeroAnimation;
