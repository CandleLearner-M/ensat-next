"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function ScrollToTop() {
  const pathName = usePathname();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName]);
  return null;
}
export default ScrollToTop;
