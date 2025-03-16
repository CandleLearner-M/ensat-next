import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function AnimatedLine({
  className,
  isVisible,
  height,
  delay = 0,
}: {
  className: string;
  isVisible: boolean;
  height: string;
  delay?: number;
}) {
  const [lineHeight, setLineHeight] = useState(height);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (height === "toBottom") {
      const calculatehHeight = () => {
        if (lineRef.current) {
          const parent = lineRef.current.parentElement;
          if (parent) {
            const lineTop = lineRef.current.offsetTop;
            const parentHeight = parent.clientHeight;
            const distanceToBottom = parentHeight - lineTop;

            setLineHeight(`${distanceToBottom}px`);
          }
        }
      };
      calculatehHeight();

      window.addEventListener("resize", calculatehHeight);
      return () => {
        window.removeEventListener("resize", calculatehHeight);
      };
    }
  }, [height]);

  const lineVariants = {
    initial: {
      height: 0,
      opacity: 0,
    },
    animate: {
      opacity: [0, 1, 0.8, 1],
      height: lineHeight,
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
      ref={lineRef}
      initial="initial"
      animate={isVisible ? "animate" : "initial"}
      variants={lineVariants}
      className={className}
    ></motion.div>
  );
}
export default AnimatedLine;
