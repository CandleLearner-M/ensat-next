"use client";

import { useScreenSize } from "@/utils/useScreenSize";
import CommunityDesktop from "./CommunityDesktop";
import CommunityMobile from "./CommunityMobile";

function Community() {
  const { isMobile } = useScreenSize();

  return isMobile ? <CommunityMobile /> : <CommunityDesktop />;
}

export default Community;
