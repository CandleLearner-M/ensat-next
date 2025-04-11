"use client";

import CustomBtn from "@/components/common/CustomBtn";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import styles from "./Community.module.scss";
import { imageBlocks } from "./communityDS";

function Community() {
  const getCustomDelay = (index: number) => {
    const delays = [
      1.7, 0.5, 3.4, 0.25, 2.4, 1.2, 3.8, 3.1, 2.9, 0.8, 1.5, 2.0,
    ];
    const randomOffset = Math.sin(index * 9137) * 0.15;

    return (delays[index] || 2.3) + randomOffset;
  };

  const getDuration = (index: number) => {
    const durationMap: { [key: number]: number } = {
      0: 1.4,
      3: 1.5,
      6: 1.5,
      9: 1.4,
    };

    return durationMap[index] || 1.25;
  };

  const getEasing = (index: number) => {
    const easingOptions = [
      [0.33, 1, 0.68, 1],
      [0.25, 0.1, 0.25, 1],
      [0.34, 1.3, 0.64, 1],
    ];

    return easingOptions[index % 3];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  const secondContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  const baseVariants = {
    hidden: (index: number) => ({
      opacity: 0,
      y: 100 + (index % 3) * 20,

      scale: 0.92,
    }),
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: getDuration(index),
        delay: getCustomDelay(index),
        ease: getEasing(index),
      },
    }),
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.94 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        ease: [0.34, 1.3, 0.64, 1],
        duration: 1,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.section
      className={styles.community}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div
        className={styles.div1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={secondContainerVariants}
      >
        <motion.h1 variants={titleVariants}>Welcome to the community</motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              ease: [0.34, 1.3, 0.64, 1],
              duration: 0.8,
              delay: 0.6,
            },
          }}
          viewport={{ once: true, amount: 0.6 }}
        >
          <CustomBtn>
            <p>Meet ENSAT Staff and Students</p>
          </CustomBtn>
        </motion.div>
      </motion.div>

      {imageBlocks.map((img, index) => (
        <motion.div
          key={index}
          className={styles[img.className]}
          custom={index}
          variants={baseVariants}
        >
          <Image
            src={img.url}
            alt={img.alt}
            fill
            quality={85}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}

export default Community;
