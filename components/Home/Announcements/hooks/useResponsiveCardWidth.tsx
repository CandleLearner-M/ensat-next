import { useState, useEffect, RefObject } from "react";

export function useResponsiveCardWidth(
  trackRef: RefObject<HTMLDivElement>,
  maxVisibleCards: number,
  cardGap: number,
  itemCount: number,
  minCardWidth: number = 280
) {
  const [cardWidth, setCardWidth] = useState(minCardWidth);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const calculateWidths = () => {
      const trackClientWidth = trackRef.current?.offsetWidth;
      const baseWidth =
        trackClientWidth && trackClientWidth > 0
          ? trackClientWidth
          : window.innerWidth * 0.9;

      setContainerWidth(baseWidth);

      const viewPortWidth = window.innerWidth;
      let numCardsToShow: number;

      if (viewPortWidth < 640) {
        numCardsToShow = 1;
      } else if (viewPortWidth < 1024) {
        numCardsToShow = Math.min(2, maxVisibleCards);
      } else {
        numCardsToShow = maxVisibleCards;
      }

      const effectiveNumCardsToShow = Math.max(numCardsToShow, 1);

      const totalGapSpace = (effectiveNumCardsToShow - 1) * cardGap;

      const widthPerCard =
        (baseWidth - totalGapSpace) / effectiveNumCardsToShow;

      setCardWidth(Math.max(widthPerCard, minCardWidth));
    };

    calculateWidths();

    window.addEventListener("resize", calculateWidths);

    return () => window.removeEventListener("resize", calculateWidths);
  }, [trackRef, maxVisibleCards, cardGap, itemCount, minCardWidth]);

  return { cardWidth, containerWidth };
}
