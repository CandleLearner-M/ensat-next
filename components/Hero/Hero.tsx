import styles from "./Hero.module.scss";
import HeroBackground from "./HeroBackground";

function Hero() {
  return (
    <main className={styles.hero}>
      <HeroBackground />

      <h1>École Nationale des Sciences Appliquées de Tanger</h1>
      <p>
        L’ENSAT, depuis 1998 : une formation d’ingénieur d’excellence, tournée
        vers l’innovation et l’industrie.
      </p>

      <div className={styles.hero__content}></div>
    </main>
  );
}
export default Hero;
