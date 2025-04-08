"use client";

import img from "@/assets/bg-links.svg";
import AnimatedLink from "@/components/common/AnimatedLink/AnimatedLink";
import Image from "next/image";
import styles from "./RelatedTopicsSection.module.scss";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";

function RelatedTopicsSection() {
  const div1 = useRef(null);
  const div2 = useRef(null);

  const div1IsInview = useInView(div1, {
    once: true,
    amount: 0.5,
    margin: "0px 0px -100px 0px",
  });

  const div2IsInview = useInView(div2, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -100px 0px",
  });

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
        delayChildren: 0.2, },
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

  return (
    <section className={styles.relatedTopicsSection}>
      <div className={styles.relatedTopicsSection__background}>
        <Image src={img} alt="Related Topics" width={500} height={300} />
        <div className={styles.overlay}></div>
      </div>

      <motion.div
        className={styles.relatedTopicsSection__header}
        variants={headerAnimation}
        initial="hidden"
        animate={div1IsInview ? "visible" : "hidden"}
        ref={div1}
      >
        <p>You May Also Like</p>
        <h2>Related In Focus topics</h2>
      </motion.div>

      <motion.ul
        className={styles.relatedTopicsSection__list}
        variants={listContainerAnimation}
        initial="hidden"
        animate={div2IsInview ? "visible" : "hidden"}
        ref={div2}
      >
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">Director</AnimatedLink>
        </motion.li>
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">Our Stuff</AnimatedLink>
        </motion.li>
        <motion.li variants={listItemAnimation}>
          <AnimatedLink href="/director">News</AnimatedLink>
        </motion.li>
      </motion.ul>
    </section>
  );
}

export default RelatedTopicsSection;
