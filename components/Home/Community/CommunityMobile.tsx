"use client";

import CustomBtn from "@/components/common/CustomBtn";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styles from "./Community.module.scss";
import { imageBlocks } from "./communityDS";
import { useCallback, useState } from "react";
import Slider from "@/components/common/Slider/Slider";

const mobileVisibleImages = imageBlocks.filter(
  (img) =>
    !["div2", "div5", "div7", "div9", "div10", "div12"].includes(img.className)
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.7 }, // Faster for mobile
  },
};

const secondContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const baseVariants = {
  hidden: (index: number) => ({
    opacity: 0,
    scale: 0.9,
    filter: "blur(6px)",
  }),
  visible: (index: number) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 0.7 + index * 0.4,
      ease: [0.16, 1, 0.3, 1], // Nice smooth ease
    },
  }),
};

// const baseVariants = {
//   hidden: (index) => ({
//     opacity: 0,
//     y: 25,
//     scale: 0.92,
//     rotateX: 10, // Subtle 3D effect
//     transformPerspective: 1000,
//   }),
//   visible: (index) => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     rotateX: 0,
//     transformPerspective: 1000,
//     transition: {
//       type: "spring",
//       damping: 20,
//       stiffness: 90,
//       delay: 0.7 + index * 0.5,
//     },
//   }),
// };

const titleVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: [0.34, 1.3, 0.64, 1],
      duration: 0.8,
      delay: 0.2,
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
      viewport={{ once: true, amount: 0.5 }} // More sensitive for mobile
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
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              ease: [0.34, 1.3, 0.64, 1],
              duration: 0.7,
              delay: 0.4,
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
            quality={75} // Lower quality is fine for mobile
            priority={index < 2} // Only prioritize first couple images
            loading={index < 2 ? "eager" : "lazy"}
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {sliderShown && (
          <Slider
            data={imageBlocks} // Still show all images in slider
            onClose={handleCloseSlider}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export default CommunityMobile;
