import React from "react";
import styles from "./Hero.module.scss";
import HeroAnimation from "./HeroAnimation";
import HeroBG from "./HeroBG";

function Hero() {
  return (
    <section className={styles.hero}>
      <HeroBG />
      <HeroAnimation />
    </section>
  );
}
export default React.memo(Hero);
