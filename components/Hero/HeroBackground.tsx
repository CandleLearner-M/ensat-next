"use client";

import Image from "next/image";
import heroBg from "../../assets/hero-bg.jpg";

import heroBgDesktop from "@/assets/hero-bg-mobile.jpg";

import styles from "./HeroBackground.module.scss";
import { useScreenSize } from "@/utils/useScreenSize";

function HeroBackground() {
  const { isDesktop } = useScreenSize();

  return (
    <div className={styles.hero__background}>
      {isDesktop ? (
        <Image
          src={heroBgDesktop}
          alt="ENSAT"
          className={styles.hero__background__image}
          fill
          priority
        />
      ) : (
        <Image
          src={heroBg}
          alt="ENSAT"
          className={styles.hero__background__image}
          fill
          priority
        />
      )}

      <div className={styles.gradient_overlay}></div>
    </div>
  );
}
export default HeroBackground;
