"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./Community.module.scss";
import { imageBlocks } from "./communityDS";

function Community() {
  // Chaotic animation delay pattern
  const getCustomDelay = (index) => {
    // Dramatically increased delays with chaotic distribution
    const delayMap = {
      0: 2.1, // Top-left
      1: 0.7, // Top-middle-left
      2: 3, // Top-middle-right
      3: 0.5, // Top-right (appears early but still part of chaos)
      4: 2.7, // Middle-left
      5: 1.4, // Middle-right
      6: 3.5, // Bottom-left
      7: 1.9, // Bottom-middle-left
      8: 2.4, // Bottom-middle-right (increased from previous)
      9: 1.2, // Bottom-right
      10: 2.6, // Extra position 1
      11: 0.9, // Extra position 2
    };

    // Add slight randomization based on the index
    const randomOffset = Math.sin(index * 7919) * 0.3;

    return (delayMap[index] || 2.0) + randomOffset;
  };

  // Get dynamic duration based on element position
  const getDuration = (index) => {
    // Slightly varied durations create more organic movement
    const durationMap = {
      0: 1.4, // Top-left
      3: 1.5, // Top-right
      6: 1.5, // Bottom-left
      9: 1.4, // Bottom-right
    };

    return durationMap[index] || 1.25;
  };

  // Refined premium easing curves
  const getEasing = (index) => {
    // We now have 3 beautiful, premium easing options
    const easingOptions = [
      [0.33, 1, 0.68, 1], // Option 1: Elegant with slight overshoot
      [0.25, 0.1, 0.25, 1], // Option 2: Classic premium curve
      [0.34, 1.3, 0.64, 1], // Option 3: Luxurious with more dramatic deceleration
    ];

    // Distribute these options based on index modulo 3
    // This ensures variety while maintaining premium feel
    return easingOptions[index % 3];
  };

  // Container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  // Enhanced base variants for items
  const baseVariants = {
    hidden: (index) => ({
      opacity: 0,
      y: 100 + (index % 3) * 20,

      scale: 0.90,
    }),
    visible: (index) => ({
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

  // Title variant with improved easing
  const titleVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.6,
        delay: 0.45,
        ease: [0.33, 1, 0.68, 1], // Premium easing with elegant finish
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
      {/* Title block */}
      <motion.div className={styles.div1} variants={titleVariants}>
        <h1>Welcome to the community</h1>
      </motion.div>

      {/* Image blocks with enhanced animations */}
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
            sizes="(max-width: 768px) 20vw, 25vw"
            quality={85}
            loading={index === 0 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}

export default Community;
