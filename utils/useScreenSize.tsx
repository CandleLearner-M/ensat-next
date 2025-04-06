"use client";

import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";

export function useScreenSize() {
  // Start with "not mounted" state
  const [isMounted, setIsMounted] = useState(false);

  // Always call hooks unconditionally
  const mobileMQ = useMediaQuery({ maxWidth: 768 });
  const tabletMQ = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  const desktopMQ = useMediaQuery({ minWidth: 1024 });

  // Set mounted state after hydration
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use the values only when mounted
  const isMobile = isMounted ? mobileMQ : false;
  const isTablet = isMounted ? tabletMQ : false;
  const isDesktop = isMounted ? desktopMQ : false;

  return { isMobile, isTablet, isDesktop, isMounted };
}
