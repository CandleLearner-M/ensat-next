"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Announcements.module.scss";
import Card from "./Card/Card";
import { sampleAnnouncements, type Announcement } from "./dummydata";

type AnnouncementsProps = {
  title?: string;
  data?: Announcement[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showFilters?: boolean;
  maxVisibleCards?: number;
  viewAllLink?: string;
};

function Announcements({
  data = sampleAnnouncements,
  autoplay = true,
  autoplaySpeed = 3000,
  showFilters = true,
  maxVisibleCards = 3,
  viewAllLink = "/announcements",
  title: titleProp,
}: AnnouncementsProps) {
  const t = useTranslations("Announcements");

  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardGap = 32;

  const displayTitle = titleProp || t("title");

  useEffect(() => {
    setIsClient(true);
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(data.map((item) => item.category || t("uncategorizedLabel"))),
    ];
    return [t("allLabel"), ...uniqueCategories];
  }, [data, t]);

  const categoryMap = useMemo(() => {
    const map: { [key: string]: string | null } = {};
    map[t("allLabel")] = "All";
    map[t("uncategorizedLabel")] = "Uncategorized";
    data.forEach((item) => {
      if (item.category && !map[item.category]) {
        map[item.category] = item.category;
      }
    });
    return map;
  }, [data, t]);

  const filteredAnnouncements = useMemo(() => {
    const internalFilter = categoryMap[activeFilter];
    if (internalFilter === "All") return data;
    if (internalFilter === "Uncategorized")
      return data.filter((item) => !item.category);
    return data.filter((item) => item.category === internalFilter);
  }, [data, activeFilter, categoryMap]);

  useEffect(() => {
    if (!isClient || !carouselTrackRef.current) return;

    const calculateWidths = () => {
      const trackWidth =
        carouselTrackRef.current?.offsetWidth || window.innerWidth * 0.9;
      setContainerWidth(trackWidth);

      const viewPortWidth = window.innerWidth;
      let numCardToShow: number;

      if (viewPortWidth < 640) {
        numCardToShow = 1;
      } else if (viewPortWidth < 1024) {
        numCardToShow = Math.min(2, maxVisibleCards);
      } else {
        numCardToShow = maxVisibleCards;
      }

      const effectiveNumCardsToShow = Math.max(numCardToShow, 1);
      const totalGapSpace = (effectiveNumCardsToShow - 1) * cardGap;
      const widthPerCard =
        (trackWidth - totalGapSpace) / effectiveNumCardsToShow;

      setCardWidth(Math.max(widthPerCard, 280));
    };

    calculateWidths();
    window.addEventListener("resize", calculateWidths);

    calculateWidths();

    return () => window.removeEventListener("resize", calculateWidths);
  }, [isClient, maxVisibleCards, cardGap, filteredAnnouncements.length]);

  useEffect(() => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }

    if (!isClient || !autoplay || isPaused || filteredAnnouncements.length <= 1)
      return;

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % filteredAnnouncements.length
      );
    }, autoplaySpeed);

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [
    isClient,
    autoplay,
    isPaused,
    filteredAnnouncements.length,
    autoplaySpeed,
  ]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIdx) =>
      prevIdx === filteredAnnouncements.length - 1 ? 0 : prevIdx + 1
    );
  }, [filteredAnnouncements.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? filteredAnnouncements.length - 1 : prevIdx - 1
    );
  }, [filteredAnnouncements.length]);

  const handleDotClick = (idx: number) => {
    setCurrentIndex(idx);
  };

  const handleFilterClick = (displayedCategory: string) => {
    setActiveFilter(displayedCategory);
    setCurrentIndex(0);
  };

  const calculateOffset = () => {
    if (
      !isClient ||
      !containerWidth ||
      !cardWidth ||
      filteredAnnouncements.length <= 0
    )
      return 0;

    const centerPoint = containerWidth / 2;
    const cardCenter = cardWidth / 2;
    const baseOffset = currentIndex * (cardWidth + cardGap);

    return centerPoint - cardCenter - baseOffset;
  };

  const trackOffset = calculateOffset();

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  useEffect(() => {
    setActiveFilter(t("allLabel"));
  }, [t]);

  return (
    <section
      className={styles.announcementsCarousel}
      aria-labelledby="announcements-title"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="announcements-title" className={styles.title}>
            {displayTitle}
          </h2>
          {showFilters && categories.length > 1 && (
            <div className={styles.filters}>
              {categories.map((displayedCategory) => (
                <button
                  key={displayedCategory}
                  onClick={() => handleFilterClick(displayedCategory)}
                  className={`${styles.filterBtn} ${
                    activeFilter === displayedCategory ? styles.active : ""
                  } `}
                  aria-pressed={activeFilter === displayedCategory}
                >
                  {displayedCategory}
                </button>
              ))}
            </div>
          )}
        </header>

        <>
          {filteredAnnouncements.length > 0 ? (
            <div className={styles.carouselContainer}>
              {filteredAnnouncements.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={handlePrevious}
                    aria-label={t("prevButtonLabel")}
                    disabled={!isClient}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </button>
                  <button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={handleNext}
                    aria-label={t("nextButtonLabel")}
                    disabled={!isClient}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              <div className={styles.carouselTrackWrapper}>
                <div className={styles.carouselTrack} ref={carouselTrackRef}>
                  <motion.div
                    className={styles.carouselInner}
                    animate={{ x: trackOffset }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 25,
                    }}
                    style={{ gap: `${cardGap}px` }}
                  >
                    {filteredAnnouncements.map((announcement, idx) => (
                      <motion.div
                        key={announcement.id}
                        className={styles.carouselItem}
                        animate={{
                          scale: idx === currentIndex ? 1 : 0.92,
                          opacity: idx === currentIndex ? 1 : 0.6,
                          zIndex: idx === currentIndex ? 10 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        style={{
                          width: cardWidth,
                          flexShrink: 0,
                        }}
                      >
                        <Card
                          imageSrc={
                            announcement?.imageSrc || "/images/placeholder.jpg"
                          }
                          imageAlt={announcement.title}
                          title={announcement.title}
                          description={announcement.description}
                          link={announcement.link}
                          linkText={t("readMore")}
                          style={{
                            pointerEvents:
                              idx === currentIndex ? "auto" : "none",
                          }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {filteredAnnouncements.length > 1 && (
                <div className={styles.indicators}>
                  {filteredAnnouncements.map((_, idx) => (
                    <button
                      key={idx}
                      className={`${styles.indicator} ${
                        idx === currentIndex ? styles.active : ""
                      }`}
                      onClick={() => handleDotClick(idx)}
                      aria-label={t("indicatorLabel", { number: idx + 1 })}
                      aria-current={idx === currentIndex ? "true" : "false"}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.empty} ref={carouselTrackRef}>
              <p>{t("emptyMessage")}</p>
            </div>
          )}
        </>

        <div className={styles.viewAllWrapper}>
          <a href={viewAllLink} className={styles.viewAll}>
            {t("viewAll")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
export default Announcements;
