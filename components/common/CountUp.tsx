"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({
  from = 0,
  to,
  duration = 2,
  className = "",
}: {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}) {
  const count = useMotionValue(from);
  const [displayValue, setDisplayValue] = useState(from.toLocaleString());

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const formatted = useTransform(count, (value) =>
    Math.floor(value).toLocaleString()
  );

  useEffect(() => {
    if (!isInView) return;
    const animation = animate(count, to, { duration: duration });

    const unsubscribe = formatted.onChange(setDisplayValue);

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [count, duration, to, formatted, isInView]);
  return (
    <h1 className={className} ref={ref}>
      {displayValue}
    </h1>
  );
}
export default CountUp;
