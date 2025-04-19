"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import styles from "./Announcements.module.scss";
import Carousel from "./Carousel";
import { sampleAnnouncements, type Announcement } from "./dummydata";

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1,
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  },
};

const filterContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      staggerChildren: 0.13,
    },
  },
};

const filterButtonVariants = {
  hidden: { y: 15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 150 },
  },
};

const carouselVariants = {
  hidden: { scale: 0.98, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: { duration: 0.2 },
  },
};

const viewAllVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 110,
      damping: 14,
    },
  },
};

type AnnouncementsProps = {
  title?: string;
  data?: Announcement[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  showFilters?: boolean;
  viewAllLink?: string;
};

function Announcements({
  data = sampleAnnouncements,
  autoplay = true,
  autoplaySpeed = 3500,
  showFilters = true,
  viewAllLink = "/announcements",
  title: titleProp,
}: AnnouncementsProps) {
  const t = useTranslations("Announcements");

  const [activeFilter, setActiveFilter] = useState("All");

  const displayTitle = titleProp || t("title");

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

  const handleFilterClick = (displayedCategory: string) => {
    setActiveFilter(displayedCategory);
  };

  useEffect(() => {
    setActiveFilter(t("allLabel"));
  }, [t]);

  return (
    <motion.section
      className={styles.announcementsCarousel}
      aria-labelledby="announcements-title"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className={styles.container}>
        <motion.header className={styles.header} variants={headerVariants}>
          <h2 id="announcements-title" className={styles.title}>
            {displayTitle}
          </h2>
          {showFilters && categories.length > 1 && (
            <motion.div
              className={styles.filters}
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

        <AnimatePresence mode="wait">
          {filteredAnnouncements.length > 0 ? (
            <motion.div
              className={styles.carouselContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={carouselVariants}
              key="carousel-content"
            >
              <Carousel
                data={filteredAnnouncements}
                autoplayEnabled={autoplay}
                autoplaySpeed={autoplaySpeed}
              />
            </motion.div>
          ) : (
            <motion.div
              className={styles.empty}
              variants={carouselVariants}
              key="empty-content"
            >
              <p>{t("emptyMessage")}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={styles.viewAllWrapper}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
