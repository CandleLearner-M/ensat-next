import { useTranslations } from "next-intl";
import styles from "./HeroAnimation.module.scss";
import { motion } from "framer-motion";

function AnimatedHeroText({
  isVisible,
  className,
}: {
  isVisible: boolean;
  className: string;
}) {
  const t = useTranslations("Hero");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const titleWords = t("title").split(" ");

  const wordAnimation = {
    hidden: {},
    visible: {},
  };

  const characterAnimation = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.7,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const paragraphAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  console.log(titleWords)

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <h1 className={`overflow-hidden pb-2 ${styles.heroTitle}`}>
        {titleWords.map((word, index) => (
          <motion.span key={index} variants={wordAnimation}>
            {Array.from(word).map((char, charIndex) => (
              <motion.span key={charIndex} variants={characterAnimation} transition={{ delay: index * 0.08 + charIndex * 0.03, type: "spring", damping: 12, stiffness: 100 }}>
                {char}
              </motion.span>
            ))}
          </motion.span>
        ))}
      </h1>

      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={paragraphAnimation}
      >
        <p>{t("description")}</p>
      </motion.div>
    </motion.div>
  );
}

export default AnimatedHeroText;
