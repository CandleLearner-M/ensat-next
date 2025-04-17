"use client";

import Image, { StaticImageData } from "next/image";
import { motion, Variants } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import styles from "./Card.module.scss";
import { Link } from "@/i18n/navigation";
import fallbackImg from "@/assets/fallback.png";

type CardProps = {
  imageSrc?: string | StaticImageData;
  imageAlt?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
  style?: React.CSSProperties;
};

const cardWrapperVariants: Variants = {
  outOfView: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    filter: "blur(8px)",
    transition: { duration: 0.5, ease: "easeOut" },
  },
  inView: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 },
  },
  rest: {
    y: 0,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 24px rgba(0, 0, 0, 0.12)",
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const imageVariants: Variants = {
  outOfView: { scale: 0.98, opacity: 0 },
  inView: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] },
  },
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

const titleVariants: Variants = {
  outOfView: { y: 25, opacity: 0 },
  inView: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
  rest: { y: 0 },
  hover: { y: -2 },
};

const descVariants: Variants = {
  outOfView: { y: 20, opacity: 0 },
  inView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const buttonAreaVariants: Variants = {
  outOfView: { y: 20, opacity: 0 },
  inView: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const arrowVariants: Variants = {
  outOfView: { x: -10, opacity: 0 },
  inView: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.55, ease: [0.25, 0.1, 0.25, 1] },
  },
  rest: { x: 0 },
  hover: { x: 4 },
};

function Card({
  imageSrc,
  imageAlt = "Card image",
  title = "Card Title",
  description,
  link = "#",
  linkText = "Learn More",
  style,
}: CardProps) {
  const finalImageSrc = imageSrc || fallbackImg;

  return (
    <motion.div
      className={styles.cardMotionWrapper}
      style={style}
      variants={cardWrapperVariants}
      initial="outOfView"
      whileInView="inView"
      whileHover="hover"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Link href={link} className={styles.card}>
        <div className={styles.imageContainer}>
          <motion.div className={styles.imageWrapper} variants={imageVariants}>
            <Image
              src={finalImageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className={styles.image}
              priority={false}
            />
          </motion.div>
        </div>

        <div className={styles.content}>
          <motion.h2 className={styles.title} variants={titleVariants}>
            {title}
          </motion.h2>

          <motion.p className={styles.description} variants={descVariants}>
            {description ||
              "Default description text. Consider providing a meaningful default or making it required."}
          </motion.p>

          <motion.div
            className={styles.buttonContainer}
            variants={buttonAreaVariants}
          >
            <div className={styles.buttonWrapper}>
              <div className={styles.linkTextWrapper}>
                <span className={styles.linkText}>{linkText}</span>
                {/* Underline motion.span removed */}
              </div>
              <motion.span
                className={styles.arrowIcon}
                variants={arrowVariants}
              >
                <FiArrowRight />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
}

export default Card;
