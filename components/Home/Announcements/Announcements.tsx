"use client";

import { motion } from "framer-motion";
import {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import styles from "./Announcements.module.scss";
import Card from "./Card/Card";
import fallbackImg from "@/assets/fallback.png";
import { sampleAnnouncements, type Announcement } from "./dummydata";
import { useResponsiveCardWidth } from "./hooks/useResponsiveCardWidth";

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const headerVariants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const filterButtonVariants = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 150 },
  },
};

const carouselVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
    },
  },
};

const navButtonVariants = {
  hidden: (direction) => ({ x: direction === "prev" ? -20 : 20, opacity: 0 }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 20 },
  },
};

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.05 * i,
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  }),
};

const indicatorsVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const indicatorVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300 },
  },
};

const viewAllVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

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

  const { cardWidth, containerWidth } = useResponsiveCardWidth(
    carouselTrackRef as RefObject<HTMLDivElement>,
    maxVisibleCards,
    cardGap,
    filteredAnnouncements.length
  );

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
    <motion.section
      className={styles.announcementsCarousel}
      aria-labelledby="announcements-title"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.header
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={headerVariants}
        >
          <h2 id="announcements-title" className={styles.title}>
            {displayTitle}
          </h2>
          {showFilters && categories.length > 1 && (
            <motion.div
              className={styles.filters}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={filterContainerVariants}
            >
              {categories.map((displayedCategory) => (
                <motion.button
                  key={displayedCategory}
                  onClick={() => handleFilterClick(displayedCategory)}
                  className={`${styles.filterBtn} ${
                    activeFilter === displayedCategory ? styles.active : ""
                  } `}
                  aria-pressed={activeFilter === displayedCategory}
                  variants={filterButtonVariants}
                >
                  {displayedCategory}
                </motion.button>
              ))}
            </motion.div>
          )}
        </motion.header>

        <>
          {filteredAnnouncements.length > 0 ? (
            <motion.div
              className={styles.carouselContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={carouselVariants}
            >
              {filteredAnnouncements.length > 1 && (
                <>
                  <motion.button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={handlePrevious}
                    aria-label={t("prevButtonLabel")}
                    disabled={!isClient}
                    custom="prev"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={navButtonVariants}
                  >
                    <FiChevronLeft />
                  </motion.button>
                  <motion.button
                    className={`${styles.navButton} ${styles.nextButton}`}
                    onClick={handleNext}
                    aria-label={t("nextButtonLabel")}
                    disabled={!isClient}
                    custom="next"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={navButtonVariants}
                  >
                    <FiChevronRight />
                  </motion.button>
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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={cardVariants}
                        custom={idx}
                      >
                        <Card
                          imageSrc={announcement?.imageSrc || fallbackImg}
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
                <motion.div
                  className={styles.indicators}
                  initial="hidden"
                  key={activeFilter}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={indicatorsVariants}
                >
                  {filteredAnnouncements.map((_, idx) => (
                    <motion.button
                      key={idx}
                      className={`${styles.indicator} ${
                        idx === currentIndex ? styles.active : ""
                      }`}
                      onClick={() => handleDotClick(idx)}
                      aria-label={t("indicatorLabel", { number: idx + 1 })}
                      aria-current={idx === currentIndex ? "true" : "false"}
                      variants={indicatorVariants}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              className={styles.empty}
              ref={carouselTrackRef}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={carouselVariants}
            >
              <p>{t("emptyMessage")}</p>
            </motion.div>
          )}
        </>

        <motion.div
          className={styles.viewAllWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.8 }}
          variants={viewAllVariants}
        >
          <a href={viewAllLink} className={styles.viewAll}>
            {t("viewAll")}
            <FiArrowRight />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
export default Announcements;
