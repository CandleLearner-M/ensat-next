"use client";
import AnimatedLine from "./AnimatedLine"

function HeroAnimation() {
  return (
    <div className={styles.hero_animation}>
      <AnimatedLine className={styles.upper_line} height="25vh" isVisible />
    </div>
  )
}
export default HeroAnimation