"use client";

import img from "@/assets/bg-links.svg";
import AnimatedLink from "@/components/common/AnimatedLink/AnimatedLink";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./RelatedTopicsSection.module.scss";

const headerAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const listContainerAnimation = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const listItemAnimation = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function RelatedTopicsSection() {
  const t = useTranslations("relatedTopics");

  return (
    <section className={styles.relatedTopicsSection}>
      <div className={styles.relatedTopicsSection__background}>
        <Image src={img} alt={t("imageAlt")} width={500} height={300} />
        <div className={styles.overlay}></div>
      </div>

      <motion.div
        className={styles.relatedTopicsSection__header}
        variants={headerAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5, margin: "0px 0px -100px 0px" }}
      >
        <p>{t("heading")}</p>
        <h2>{t("subheading")}</h2>
      </motion.div>

      <motion.ul
        className={styles.relatedTopicsSection__list}
        variants={listContainerAnimation}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3, margin: "0px 0px -100px 0px" }}
      >
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">{t("links.director")}</AnimatedLink>
        </motion.li>
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">{t("links.ourStuff")}</AnimatedLink>
        </motion.li>
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">{t("links.news")}</AnimatedLink>
        </motion.li>
      </motion.ul>
    </section>
  );
}

export default RelatedTopicsSection;
