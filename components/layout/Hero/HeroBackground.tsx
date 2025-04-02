import Image from "next/image";
import heroBg from "@/assets/hero-bg-mobile.jpg";
import styles from "./HeroBackground.module.scss";

function HeroBackground() {
  return (
    <div className={styles.hero__background}>
      <Image
        src={heroBg}
        alt="ENSAT"
        className={styles.hero__background__image}
        fill
        priority
      />

      <div className={styles.gradient_overlay}></div>
    </div>
  );
}
export default HeroBackground;
