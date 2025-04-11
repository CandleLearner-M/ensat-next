"use client";

import { ReactNode } from "react";
import { BsCopy } from "react-icons/bs";
import { motion } from "framer-motion";
import { useScreenSize } from "@/utils/useScreenSize";

function CustomBtn({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) {
  const { isMobile } = useScreenSize();

  return (
    <motion.div
      className="group flex items-center gap-2 md:gap-3 hover:text-[#007EFF] cursor-pointer"
      whileHover={{
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
          duration: 0.15,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          type: "spring",
          stiffness: 600,
          damping: 25,
          duration: 0.08,
        },
      }}
      {...props}
    >
      <div className="flex items-center justify-center bg-[#656f77] w-6 h-6 md:w-10 md:h-10 rounded-full group-hover:bg-[#007EFF] transition-colors duration-200 ease-in-out cursor-pointer">
        <BsCopy size={!isMobile ? 19 : 11} className="text-white" />
      </div>
      <div className="text-sm md:text-base">{children}</div>
    </motion.div>
  );
}

export default CustomBtn;
