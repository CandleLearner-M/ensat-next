"use client";

import LearnMoreBtn from "@/components/common/LearnMoreBtn";
import styles from "./overView.module.scss";
import CountUp from "@/components/common/CountUp";
import { motion } from "framer-motion";
import { useMemo, useRef } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: 0.2,
    },
  },
};

const statsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const statItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      type: "spring",
      stiffness: 100,
    },
  },
};

function OverView() {
  const t = useTranslations("Overview");

  // Reference for the stats section
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  // Reference for the main section
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const stats = useMemo(
    () => [
      { number: 58, label: t("enseignants") },
      { number: 11, label: t("filieres") },
      { number: 1290, label: t("etudiants") },
      { number: 13, label: t("centres") },
      { number: 24, label: t("nationalites") },
      { number: 30, label: t("clubs") },
      { number: 4, label: t("batiments") },
      { number: 14500, label: t("locaux") },
    ],
    [t]
  );

  return (
    <motion.section
      className={styles.overview}
      ref={sectionRef}
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className={styles.overview__sec1}>
        <motion.h2 variants={titleVariants}>{t("title")}</motion.h2>
        <div>
          <motion.p variants={textVariants}>{t("description")}</motion.p>
          <motion.div
            variants={textVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <LearnMoreBtn href="/overview">{t("learnMore")}</LearnMoreBtn>
          </motion.div>
        </div>
      </div>

      <div className={styles.overview__sec2} ref={statsRef}>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10"
          initial="hidden"
          animate={statsInView ? "visible" : "hidden"}
          variants={statsContainerVariants}
        >
          {stats.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              variants={statItemVariants}
            >
              {statsInView && (
                <CountUp
                  className="text-2xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-[#007EFF]"
                  from={0}
                  to={item.number}
                  duration={item.number > 1000 ? 2.5 : 1.8}
                />
              )}
              <motion.p
                className="text-black text-sm sm:text-base md:text-base lg:text-lg mt-1 md:mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {item.label}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default OverView;
