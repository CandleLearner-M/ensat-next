import styles from "./Hero.module.scss";
import HeroAnimation from "./HeroAnimation";
import HeroBG from "./HeroBG";

function Hero() {
  return (
    <main className={styles.hero}>
      <HeroBG />
      <HeroAnimation />
    </main>
  );
}
export default Hero;
