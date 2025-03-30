"use client";

import { useScreenSize } from "@/utils/useScreenSize";
import HeroBackground from "./HeroBackground";
import HeroBackgroundMobile from "./HeroBackgroundMobile";

function HeroBG() {
  const { isMobile, isDesktop, isTablet } = useScreenSize();
  return (
    <>
      {isMobile && <HeroBackgroundMobile />}
      {(isDesktop || isTablet) && <HeroBackground />}
    </>
  );
}
export default HeroBG;
