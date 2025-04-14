"use client";

import director from "@/assets/director.jpg";
import { Link } from "@/i18n/navigation";
import { useScreenSize } from "@/utils/useScreenSize";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
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
  const { isMobile } = useScreenSize();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  const controls = useAnimation();

  // Enhanced parallax effect for image (only on desktop)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // More pronounced parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      className={styles.director}
      ref={sectionRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      <motion.div
        className={styles.imageContainer}
        variants={imageVariants}
        ref={imageRef}
      >
        <motion.div
          style={
            isMobile
              ? {} // No parallax on mobile
              : {
                  y: imageY,
                  height: "120%",
                  width: "100%",
                  position: "absolute",
                  top: "-10%",
                }
          }
          className={styles.parallaxContainer}
        >
          <Image
            src={director}
            alt="Professor Ahmed Moussa"
            fill
            objectFit="cover"
            priority
          />
        </motion.div>
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        ></motion.div>
      </motion.div>

      <div className={styles.content}>
        <motion.div className={styles.title} variants={itemVariants}>
          <h3>MOT DU DIRECTEUR</h3>
          <h2>PR. AHMED MOUSSA</h2>
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

          {/* Sliding glow effect */}
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
          <p>
            Je tiens tout d&apos;abord à remercier le Gouvernement de Sa Majesté
            le Roi Mohammed VI, que Dieu l&apos;assiste, d&apos;avoir renouvelé
            sa confiance en moi en me nommant Directeur de l&apos;Ecole
            Nationale des Sciences Appliquées de Tanger pour...
          </p>

          <Link href="ensat/mot-directeur" className={styles.readMoreLink}>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0, 126, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Lire La Suite</span>
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
