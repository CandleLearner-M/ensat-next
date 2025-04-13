import Image, { StaticImageData } from "next/image";
import styles from "./HeroBackground.module.scss";
import React from "react";

function HeroBackground({ bgImg }: { bgImg: string | StaticImageData }) {
  return (
    <div className={styles.hero__background}>
      <Image
        src={bgImg}
        alt="ENSAT"
        className={styles.hero__background__image}
        fill
        priority
      />

      <div className={styles.gradient_overlay}></div>
    </div>
  );
}
export default React.memo(HeroBackground);
