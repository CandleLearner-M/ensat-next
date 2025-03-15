import styles from "./Hero.module.scss";
import HeroAnimation from "./HeroAnimation";
import HeroBackground from "./HeroBackground";

function Hero() {
  return (
    <main className={styles.hero}>
      <HeroBackground />
      <HeroAnimation />
    </main>
  );
}
export default Hero;
