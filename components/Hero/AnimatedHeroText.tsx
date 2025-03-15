import { motion } from "framer-motion";

function AnimatedHeroText({
  isVisible,
  className,
}: {
  isVisible: boolean;
  className: string;
}) {
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    initial: {
      opacity: 0,
      y: 80,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={containerVariants}
    >
      <motion.h1 variants={textVariants}>
        École Nationale des Sciences Appliquées de Tanger
      </motion.h1>
      <motion.p variants={textVariants}>
        L’ENSAT, depuis 1998 : une formation d’ingénieur d’excellence, tournée
        vers l’innovation et l’industrie.
      </motion.p>
    </motion.div>
  );
}
export default AnimatedHeroText;
