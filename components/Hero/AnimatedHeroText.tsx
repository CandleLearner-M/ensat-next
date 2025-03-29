import { motion } from "framer-motion";

function AnimatedHeroText({ isVisible, className }: { isVisible: boolean; className: string }) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      <motion.h1 variants={fadeInUp}>
        École Nationale des Sciences Appliquées de Tanger
      </motion.h1>
      <motion.p variants={fadeInUp} transition={{ delay: 0.2 }}>
        L&apos;ENSAT, depuis 1998 : une formation d&apos;ingénieur d&apos;excellence, tournée
        vers l&apos;innovation et l&apos;industrie.
      </motion.p>
    </motion.div>
  );
}

export default AnimatedHeroText;
