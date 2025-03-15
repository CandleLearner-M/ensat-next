import { motion } from "framer-motion";

function AnimatedLine({className, isVisible, height, delay = 0 }: { className: string, isVisible: boolean, height: string, delay?: number }) {

  const lineVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0.8, 1],
      height: height,
      transition: {
        height: {
          duration: 2,
          ease: [0.19, 1, 0.22, 1],
          delay: delay,
        },
        opacity: {
          duration: 1.8,
          ease: [0, 0.4, 0.7, 1],
          delay: delay,
        },
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={lineVariants}
      className={className}
    ></motion.div>
  );
}
export default AnimatedLine;
