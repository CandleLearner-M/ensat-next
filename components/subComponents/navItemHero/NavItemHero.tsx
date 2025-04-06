"use client";

import { LocalizedHeroComponent } from "@/types/strapi";
import Image from "next/image";
import styles from "./NavItemHero.module.scss";
import { useScreenSize } from "@/utils/useScreenSize";
import AnimatedLine from "@/components/layout/Hero/AnimatedLine";
import { motion } from "framer-motion";

function NavItemHero({ data }: { data: LocalizedHeroComponent }) {
  const { isMobile } = useScreenSize();

  // Text animation variants
  const textContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  };

  const textItem = {
    hidden: {
      y: 30,
      opacity: 0,
      filter: "blur(1px)",
    },
    show: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1.1,
      },
    },
  };

  return (
    <section className={styles.hero}>
      <div className={styles.hero__background}>
        <Image
          src={data.background}
          alt="hero"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          className={styles.backgroundImage}
        />
        <div className={styles.darkOverlay}></div>
        {!isMobile && (
          <AnimatedLine
            height="toBottom"
            isUpper={false}
            isVisible={true}
            className={styles.line}
            duration={5.5}
          />
        )}
      </div>

      <motion.div
        className={styles.textContainer}
        variants={textContainer}
        initial="hidden"
        animate="show"
      >
        <motion.h2 className={styles.headline} variants={textItem}>
          {data.headline}
        </motion.h2>

        <motion.p className={styles.subheading} variants={textItem}>
          {data.subHeading}
        </motion.p>
      </motion.div>
    </section>
  );
}

export default NavItemHero;
