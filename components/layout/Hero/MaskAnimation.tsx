import { useMousePosition } from "@/utils/useMousePosition";
import AnimatedLine from "./AnimatedLine";
import styles from "./HeroAnimation.module.scss";
import { motion } from "framer-motion";
import React, {  useState } from "react";
import { useTranslations } from "next-intl";

function MaskAnimation({ isVisible }: { isVisible: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 30;

  const color = isHovered ? "#002efe" : "rgba(0, 46, 254, 1)";

  // MULTILINGUAL SUPPORT 
  const t = useTranslations("Hero.Mask");

  return (
    <motion.div
      className={styles.mask}
      initial={{
        WebkitMaskPosition: `${-100}% ${-100}%`,
        WebkitMaskSize: 0,
      }}
      animate={{
        WebkitMaskSize: `${size}px`,
        WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
        backgroundColor: color,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
    >
      <div className={styles.mask__text}>
        <AnimatedLine
          className={`${styles.mask__line} ${styles.mask__line_top}`}
          height="20vh"
          isVisible={isVisible}
        />

        <h1
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ color: "black" }}
        >
          {t("title")}
        </h1>
        <p
          style={{ color: "black" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
         {t("description")}  
        </p>
        <AnimatedLine
          className={`${styles.mask__line} ${styles.mask__line_bottom}`}
          height="toBottom"
          isVisible={isVisible}
          delay={1.4}
        />
      </div>
    </motion.div>
  );
}
export default React.memo(MaskAnimation);
