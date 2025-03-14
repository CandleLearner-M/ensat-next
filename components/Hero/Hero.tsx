import styles from "./Hero.module.scss";
import HeroBackground from "./HeroBackground";

function Hero() {
  return (
    <main className={styles.hero}>
      <HeroBackground />
      <div className={styles.hero__content}></div>
    </main>
  );
}
export default Hero;
