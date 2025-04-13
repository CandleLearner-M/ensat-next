"use client";

import heroBgDesktop from "@/assets/heroBgDesktop.jpg";
import heroBgMobile from "@/assets/heroBgMobile.jpg";
import { useScreenSize } from "@/utils/useScreenSize";
import React from "react";
import HeroBackground from "./HeroBackground";

function HeroBG() {
  const { isMobile, isDesktop, isTablet } = useScreenSize();
  return (
    <>
      {isMobile && <HeroBackground bgImg={heroBgMobile} />}
      {(isDesktop || isTablet) && <HeroBackground bgImg={heroBgDesktop} />}
    </>
  );
}
export default React.memo(HeroBG);
