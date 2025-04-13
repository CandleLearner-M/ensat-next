"use client";

import styles from "./HeroAnimation.module.scss";

import React, { useEffect, useState } from "react";
import AnimatedHeroText from "./AnimatedHeroText";
import AnimatedLine from "./AnimatedLine";

import { useScreenSize } from "@/utils/useScreenSize";
import MaskAnimation from "./MaskAnimation";

function HeroAnimation() {
  const [isVisible, setIsVisible] = useState(false);

  const { isDesktop, isMounted } = useScreenSize();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const shouldShowMask = isDesktop && isMounted;

  return (
    <>
      {shouldShowMask && <MaskAnimation isVisible={isVisible} />}
      <div className={styles.hero}>
        <AnimatedLine
          className={`${styles.hero__line} ${styles.hero__line_top}`}
          height="20vh"
          isVisible={isVisible}
          isUpper={true}
        />

        <AnimatedHeroText className={styles.hero__text} isVisible={isVisible} />
        <AnimatedLine
          className={`${styles.hero__line} ${styles.hero__line_bottom}`}
          height="toBottom"
          isVisible={isVisible}
          delay={2}
          isUpper={false}
          duration={6}
        />
      </div>
    </>
  );
}
export default React.memo(HeroAnimation);
