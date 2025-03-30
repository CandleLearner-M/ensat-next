"use client";

import { useScreenSize } from "@/utils/useScreenSize";
import HeroBackground from "./HeroBackground";
import HeroBackgroundMobile from "./HeroBackgroundMobile";

function HeroBG() {
  const { isMobile } = useScreenSize();
  return <>{!isMobile ? <HeroBackground /> : <HeroBackgroundMobile />}</>;
}
export default HeroBG;
