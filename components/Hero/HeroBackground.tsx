import Image from "next/image";
import heroBg from "../../assets/hero-bg.jpg";
import styles from "./Hero.module.scss";


function HeroBackground() {
  return (
    <div className={styles.hero__background}>
      <Image src={heroBg} alt="ENSAT" fill priority />
    </div>
  );
}
export default HeroBackground;
