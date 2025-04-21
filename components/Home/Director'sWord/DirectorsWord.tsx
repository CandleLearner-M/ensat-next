"use client";

import director from "@/assets/director.jpg";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import styles from "./DirectorsWord.module.scss";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
  },
};

const imageVariants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1, ease: [0.23, 1, 0.32, 1] },
  },
};

function DirectorsWord() {
  const t = useTranslations("DirectorsWord");
  const [parallaxActive, setParallaxActive] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkScreenWidth = () => setParallaxActive(window.innerWidth > 992);

    checkScreenWidth();

    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <motion.section
      className={styles.director}
      whileInView="visible"
      ref={sectionRef}
      viewport={{ once: true, amount: 0.3 }}
      initial="hidden"
      variants={containerVariants}
    >
      <motion.div className={styles.imageContainer} variants={imageVariants}>
        <motion.div
          className={styles.parallaxContainer}
          style={parallaxActive ? { y: imageY } : {}}
        >
          <Image
            src={director}
            alt={t("directorAlt")}
            fill
            style={{
              objectFit: "cover",
              objectPosition: !parallaxActive ? "center 0%" : "center",
            }}
            // sizes="(max-width: 992px) 100vw, 45vw"
            priority
          />
        </motion.div>
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ delay: 0.5, duration: 1 }}
        ></motion.div>
      </motion.div>

      <div className={styles.content}>
        <motion.div className={styles.title} variants={itemVariants}>
          <h3>{t("sectionTitle")}</h3>
          <h2>{t("directorName")}</h2>
        </motion.div>

        <motion.div className={styles.dividerWrapper} variants={itemVariants}>
          <motion.div
            className={styles.creativeDivider}
            animate={{
              scaleY: [1, 1.5, 1],
              backgroundColor: ["#007eff", "#00c6ff", "#007eff"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />

          <motion.div
            className={styles.dividerGlow}
            animate={{
              x: ["-100%", "200%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        <motion.div className={styles.text} variants={itemVariants}>
          <p>{t("messageExcerpt")}</p>

          <Link href={t("fullMessageLink")} className={styles.readMoreLink}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 126, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t("readMoreButton")}</span>
              <motion.div
                animate={{
                  x: [0, 5, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatType: "reverse",
                }}
              >
                <FaArrowRight className={styles.icon} />
              </motion.div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default DirectorsWord;
