"use client";

import CustomBtn from "@/components/common/CustomBtn";
import { delay, motion } from "framer-motion";
import Image from "next/image";
import styles from "./Community.module.scss";
import { imageBlocks } from "./communityDS";

function Community() {
  // Improved delay calculation for more strategic timing
  const getCustomDelay = (index: number) => {
    // Base delay for all animations
    const baseDelay = 0.8;

    // Grid position-based delays to create a wave-like effect
    // Map the div classes to their grid positions
    const gridPositions: { [key: string]: number } = {
      div2: 0, // top-left
      div3: 1, // top-middle
      div4: 2, // top-right
      div13: 3, // second row left
      div5: 4, // top-right corner
      div6: 5, // middle-right
      div12: 6, // middle-left
      div7: 7, // middle-right-bottom
      div11: 8, // bottom-left
      div10: 9, // bottom-middle-left
      div9: 10, // bottom-middle-right
      div8: 11, // bottom-right
    };

    // Get the className from the imageBlocks array
    const className = imageBlocks[index]?.className;
    const position = gridPositions[className] || index;

    // Create a ripple effect from the center (div1)
    const distanceFromCenter = Math.abs(position - 5) * 0.15;

    // Add some strategic grouping
    // Images near the edges appear later than those near the center
    let groupDelay = 0;
    if (position < 3) {
      groupDelay = 0.3; // Top row
    } else if (position >= 8) {
      groupDelay = 0.6; // Bottom row
    } else {
      groupDelay = 0.15; // Middle elements
    }

    // Add a small random variation to make it feel organic
    const randomVariation = Math.sin(index * 7123) * 0.1;

    return baseDelay + distanceFromCenter + groupDelay + randomVariation;
  };

  const getDuration = (index: number) => {
    // Slightly longer durations for larger images
    const sizeBasedDuration = {
      div3: 1.6, // Mr. Sarsri (larger image)
      div4: 1.5, // Larger profile pic
      div5: 1.5, // Larger image
      div7: 1.6, // Larger image
      div10: 1.5, // Larger image
      div13: 1.6, // Mr. Moussa (larger image)
    };

    const className = imageBlocks[index]?.className;
    return sizeBasedDuration[className] || 1.3;
  };

  const getEasing = (index: number) => {
    // Different easing for different image types
    const easingOptions = [
      [0.33, 1, 0.68, 1], // Standard easing
      [0.25, 0.1, 0.25, 1], // Quick start, slower end
      [0.34, 1.3, 0.64, 1], // Bouncy easing
      [0.42, 0, 0.58, 1], // Ease-in-out
    ];

    // Use different easing based on image position
    const className = imageBlocks[index]?.className;
    if (className === "div3" || className === "div13") {
      return easingOptions[2]; // Bouncy for professor images
    } else if (
      className === "div2" ||
      className === "div8" ||
      className === "div6"
    ) {
      return easingOptions[1]; // Quick start for smaller images
    } else if (className === "div5" || className === "div7") {
      return easingOptions[3]; // Smooth for large images
    }

    return easingOptions[index % 4];
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
      y: 80 + (index % 3) * 15,
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
