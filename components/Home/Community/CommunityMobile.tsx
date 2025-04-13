"use client";

import CustomBtn from "@/components/common/CustomBtn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./Community.module.scss";
import { imageBlocks } from "./communityDS";
import { useCallback, useState } from "react";
import Slider from "@/components/common/Slider/Slider";

// Filter only mobile-visible images
const mobileVisibleImages = imageBlocks.filter(
  (img) =>
    !["div2", "div5", "div7", "div9", "div10", "div12"].includes(img.className)
);

// Using the exact same animation logic as desktop
const getCustomDelay = (index) => {
  const baseDelay = 0.2;

  const gridPositions = {
    div3: 0, // top-middle
    div4: 1.5, // top-right
    div6: 2, // middle-right
    div8: 3, // bottom-right
    div11: 7, // bottom-left
    div13: 5  , // second row left
  };

  // Get the original image from imageBlocks that corresponds to this mobile index
  const img = mobileVisibleImages[index];
  const className = img?.className;
  const position = gridPositions[className] || index;

  const distanceFromCenter = Math.abs(position - 5) * 0.2;

  let groupDelay = 0;
  if (position < 3) {
    groupDelay = 0.6;
  } else if (position >= 8) {
    groupDelay = 1.5;
  } else if (position >= 5 && position < 8) {
    groupDelay = 1.0;
  } else {
    groupDelay = 0.3;
  }

  const randomVariation = Math.sin(index * 7123) * 0.2;

  let specialDelay = 0;
  if (className === "div3" || className === "div13") {
    specialDelay = 0.4;
  } else if (className === "div8") {
    specialDelay = 0.7;
  }

  return (
    baseDelay + distanceFromCenter + groupDelay + randomVariation + specialDelay
  );
};

const getDuration = (index) => {
  const sizeBasedDuration = {
    div3: 1.8,
    div4: 1.7,
    div6: 1.5,
    div8: 1.5,
    div11: 1.5,
    div13: 1.9,
  };

  const img = mobileVisibleImages[index];
  const className = img?.className;
  return sizeBasedDuration[className] || 1.5;
};

const getEasing = (index) => {
  const easingOptions = [
    [0.33, 1, 0.68, 1],
    [0.25, 0.1, 0.25, 1],
    [0.34, 1.3, 0.64, 1],
    [0.42, 0, 0.58, 1],
  ];

  const img = mobileVisibleImages[index];
  const className = img?.className;
  if (className === "div3" || className === "div13") {
    return easingOptions[2];
  } else if (className === "div8" || className === "div6") {
    return easingOptions[1];
  }

  return easingOptions[index % 4];
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1.0 },
  },
};

const secondContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.0,
    },
  },
};

const baseVariants = {
  hidden: (index) => ({
    opacity: 0,
    y: 80 + (index % 3) * 15,
    scale: 0.92,
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

const titleVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: [0.34, 1.3, 0.64, 1],
      duration: 1,
      delay: 0.3,
    },
  },
};

function CommunityMobile() {
  const [sliderShown, setSliderShown] = useState(false);

  const handleOpenSlider = useCallback(() => setSliderShown(true), []);
  const handleCloseSlider = useCallback(() => setSliderShown(false), []);

  return (
    <motion.section
      className={styles.community}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div
        className={styles.div1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
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
          viewport={{ once: true, amount: 0.5 }}
        >
          <CustomBtn onClick={handleOpenSlider}>
            <p>Meet ENSAT Staff and Students</p>
          </CustomBtn>
        </motion.div>
      </motion.div>

      {mobileVisibleImages.map((img, index) => (
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
            quality={75} // Only subtle quality reduction for mobile
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {sliderShown && (
          <Slider data={imageBlocks} onClose={handleCloseSlider} />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default CommunityMobile;
