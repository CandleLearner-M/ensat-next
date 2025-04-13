import { useScreenSize } from "@/utils/useScreenSize";
import { motion } from "framer-motion";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
function AnimatedLine({
  className,
  isVisible,
  height,
  delay = 0,
  isUpper,
  duration = 8,
}: {
  className: string;
  isVisible: boolean;
  height: string;
  delay?: number;
  isUpper: boolean;
  duration?: number;
}) {
  const [lineHeight, setLineHeight] = useState(height);
  const lineRef = useRef<HTMLDivElement>(null);
  const calculateHeight = useCallback(() => {
    if (lineRef.current) {
      const parent = lineRef.current.parentElement;
      if (parent) {
        const lineTop = lineRef.current.offsetTop;
        const parentHeight = parent.clientHeight;
        const distanceToBottom = parentHeight - lineTop;

        setLineHeight(`${distanceToBottom}px`);
      }
    }
  }, []);

  useEffect(() => {
    if (height === "toBottom") {
      calculateHeight();

      window.addEventListener("resize", calculateHeight);
      return () => {
        window.removeEventListener("resize", calculateHeight);
      };
    }
  }, [height, calculateHeight]);

  const { isMobile } = useScreenSize();

  const mobileDelay = useMemo(
    () => (isMobile ? (delay ? delay * 1 : 0) : delay ?? 0),
    [isMobile, delay]
  );

  const lineVariants = useMemo(
    () => ({
      initial: {
        height: 0,
        opacity: 0,
      },
      animate: {
        opacity: [0, 1, 0.8, 1],
        height: lineHeight,
        transition: {
          height: {
            duration: isUpper ? 3.5 : duration,
            ease: [0.19, 1, 0.22, 1],
            delay: mobileDelay,
          },
          opacity: {
            duration: 3,
            ease: [0, 0.4, 0.7, 1],
            delay: mobileDelay,
          },
        },
      },
    }),
    [duration, lineHeight, mobileDelay, isUpper]
  );

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
export default React.memo(AnimatedLine);
