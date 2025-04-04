import Image from "next/image";
import heroBg from "@/assets/hero-bg.jpg";
import styles from "./HeroBackground.module.scss";

function HeroBackgroundMobile() {
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
export default HeroBackgroundMobile;
