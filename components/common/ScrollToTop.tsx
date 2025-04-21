"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top when the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
