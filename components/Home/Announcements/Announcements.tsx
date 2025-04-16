"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styles from "./Announcements.module.scss";
import Card from "./Card/Card"; // Assuming Card component exists
import { motion, AnimatePresence } from "framer-motion";

// Define the type for an announcement item
interface Announcement {
  id: number | string;
  title: string;
  description: string;
  imageSrc?: string;
  category?: string;
  link?: string;
  date?: string;
}

// Default sample data (ensure it matches the Announcement type)
const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Campus Initiative",
    description:
      "Launching our sustainability program to reduce carbon footprint across all university facilities.",
    imageSrc: "/images/sustainability.jpg",
    category: "Campus",
    link: "/announcements/sustainability-initiative",
    date: "2025-04-15",
  },
  {
    id: 2,
    title: "Academic Calendar Update",
    description:
      "Important changes to the upcoming semester schedule and exam periods.",
    // imageSrc: "/images/calendar.jpg",
    category: "Academic",
    link: "/announcements/calendar-update",
    date: "2025-04-12",
  },
  {
    id: 3,
    title: "Student Research Symposium",
    description:
      "Annual research showcase featuring projects from undergraduate and graduate students.",
    // imageSrc: "/images/research.jpg",
    category: "Events",
    link: "/announcements/research-symposium",
    date: "2025-04-08",
  },
  {
    id: 4,
    title: "Faculty Recognition Awards",
    description:
      "Celebrating outstanding achievements of our teaching and research staff.",
    // imageSrc: "/images/awards.jpg",
    category: "Faculty",
    link: "/announcements/faculty-awards",
    date: "2025-04-05",
  },
  {
    id: 5,
    title: "Library Expansion Project",
    description: "Details on the upcoming expansion and renovation.",
    // imageSrc: "/images/library.jpg",
    category: "Campus",
    link: "/announcements/library-expansion",
    date: "2025-04-01",
  },
];

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
  title = "Latest Announcements",
  data = sampleAnnouncements,
  autoplay = true,
  autoplaySpeed = 2000,
  showFilters = true,
  maxVisibleCards = 3,
  viewAllLink = "/announcements",
}: AnnouncementsProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const cardGap = 32;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the categories from the data
  const categories = useMemo(
    () => [
      "All",
      ...new Set(data.map((item) => item.category || "Uncategorized")),
    ],
    [data]
  );

  const filteredAnnouncements = useMemo(
    () =>
      activeFilter === "All"
        ? data
        : data.filter((item) => item.category === activeFilter),
    [data, activeFilter]
  );

  // Calculate a responsive Width for the card
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

      const totalGapSpace = (numCardToShow - 1) * cardGap;
      const widthPerCard = (trackWidth - totalGapSpace) / numCardToShow;

      setCardWidth(Math.max(widthPerCard, 280));
    };

    calculateWidths();
    window.addEventListener("resize", calculateWidths);

    return () => window.removeEventListener("resize", calculateWidths);
  }, [isClient, maxVisibleCards]);

  // Autoplay functionality
  useEffect(() => {
    
  }, []);

  return (
    <section
      className={styles.announcementsCarousel}
      aria-labelledby="annoucements-title"
    >
      <div className={styles.container}>
        <p>Carousel Content Placeholder</p>
      </div>
    </section>
  );
}
export default Announcements;
