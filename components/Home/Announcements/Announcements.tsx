"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import styles from "./Announcements.module.scss";
import Card from "./Card/Card"; // Assuming Card component exists
import { motion, AnimatePresence } from "framer-motion";

interface Announcement {
  id: number | string;
  title: string;
  description: string;
  imageSrc?: string;
  category?: string;
  link?: string;
  date?: string; // Using YYYY-MM-DD format
}

const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Campus Initiative",
    description:
      "Launching our sustainability program to reduce carbon footprint across all university facilities.",
    // imageSrc: "/images/sustainability.jpg", // Keep existing images if you have them
    category: "Campus Life", // Changed from "Campus"
    link: "/announcements/sustainability-initiative",
    date: "2025-04-15", // Keep recent dates
  },
  {
    id: 2,
    title: "Academic Calendar Update", // Fits well
    description:
      "Important changes to the upcoming semester schedule and exam periods.",
    // imageSrc: "/images/calendar.jpg",
    category: "Academic", // Fits well
    link: "/announcements/calendar-update",
    date: "2025-04-12",
  },
  {
    id: 3,
    title: "Student Research Symposium", // Fits well
    description:
      "Annual research showcase featuring projects from undergraduate and graduate students.",
    // imageSrc: "/images/research.jpg",
    category: "Events", // Fits well
    link: "/announcements/research-symposium",
    date: "2025-04-08",
  },
  // { // Removing Faculty Awards to avoid category confusion, focusing on Recruitment
  //   id: 4,
  //   title: "Faculty Recognition Awards",
  //   description:
  //     "Celebrating outstanding achievements of our teaching and research staff.",
  //   imageSrc: "/images/awards.jpg",
  //   category: "Faculty", // This category is less distinct now
  //   link: "/announcements/faculty-awards",
  //   date: "2025-04-05",
  // },
  {
    id: 5, // Re-using ID 5
    title: "Library Expansion Project",
    description:
      "Details on the upcoming expansion and renovation plans for the main library.",
    // imageSrc: "/images/library.jpg",
    category: "Campus Life", // Changed from "Campus"
    link: "/announcements/library-expansion",
    date: "2025-04-01",
  },

  // --- New Announcements Based on Your List ---
  {
    id: 6,
    title: "Horaire Ramadan",
    description:
      "Consultez les horaires spécifiques pour les services et cours durant le mois de Ramadan.",
    // imageSrc: "/images/ramadan.jpg",
    category: "Student Life", // Or "Campus Life"
    link: "/announcements/horaire-ramadan",
    date: "2025-03-28", // Assuming Ramadan started before April
  },
  {
    id: 7,
    title: "12ᵉ édition du Workshop Serious Game #RSE",
    description:
      "Participez au workshop sur les jeux sérieux appliqués à la Responsabilité Sociale des Entreprises.",
    // imageSrc: "/images/workshop.jpg",
    category: "Events", // Or "Academic"
    link: "/announcements/workshop-serious-game",
    date: "2025-04-14",
  },
  {
    id: 8,
    title: "Nouveau calendrier académique 2024-2025",
    description:
      "Le calendrier académique officiel pour l'année 2024-2025 est maintenant disponible.",
    // imageSrc: "/images/calendar-new.jpg",
    category: "Academic",
    link: "/announcements/calendrier-academique-24-25",
    date: "2025-04-10",
  },
  {
    id: 9,
    title: "Liste des candidats au conseil étudiant",
    description:
      "Affichage de la liste officielle des étudiants candidats pour les élections au conseil de l'institution.",
    // imageSrc: "/images/elections.jpg",
    category: "Student Life",
    link: "/announcements/candidats-conseil-etudiant",
    date: "2025-04-09",
  },
  {
    id: 10,
    title: "Résultat Recrutement Maître de Conférences (Génie Industriel)",
    description:
      "Publication du résultat final du concours de recrutement pour le poste de Maître de Conférences en Génie Industriel.",
    // imageSrc: "/images/recruitment-result.jpg",
    category: "Recruitment",
    link: "/announcements/resultat-mc-genie-industriel",
    date: "2025-04-16", // Today's date
  },
  {
    id: 11,
    title: "Avis – Élections Universitaires des Étudiants",
    description:
      "Informations importantes concernant le déroulement des élections universitaires étudiantes.",
    // imageSrc: "/images/elections-avis.jpg",
    category: "Student Life",
    link: "/announcements/avis-elections-etudiantes",
    date: "2025-04-07",
  },
  {
    id: 12,
    title: "Résultat Recrutement Ingénieur d'État (Informatique)",
    description:
      "Annonce des résultats du concours pour le recrutement d'un Ingénieur d'État en Informatique.",
    // imageSrc: "/images/recruitment-info.jpg",
    category: "Recruitment",
    link: "/announcements/resultat-ingenieur-informatique",
    date: "2025-04-15",
  },
  {
    id: 13,
    title: "Sélection Oral Maître de Conférences (Génie Industriel)",
    description:
      "Liste des candidats sélectionnés pour l'épreuve orale du concours de Maître de Conférences (Génie Industriel).",
    // imageSrc: "/images/recruitment-oral.jpg",
    category: "Recruitment",
    link: "/announcements/selection-oral-mc-genie-industriel",
    date: "2025-04-06",
  },
  {
    id: 14,
    title: "Report Épreuve Orale Ingénieur d'État",
    description:
      "Avis de report de la date de l'épreuve orale pour le concours d'Ingénieur d'État.",
    // imageSrc: "/images/recruitment-postponed.jpg",
    category: "Recruitment",
    link: "/announcements/report-oral-ingenieur",
    date: "2025-04-04",
  },
  {
    id: 15,
    title: "Liste Admis Oral Ingénieur d'État",
    description:
      "Publication de la liste des candidats admis à passer l'épreuve orale pour le poste d'Ingénieur d'État.",
    // imageSrc: "/images/recruitment-admis.jpg",
    category: "Recruitment",
    link: "/announcements/liste-admis-oral-ingenieur",
    date: "2025-04-02",
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
  autoplaySpeed = 3000,
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

  // --Navigation Handlers--
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

  const handleFilterClick = (category: string) => {
    setActiveFilter(category);
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

    // How far the start of the current card from the start of the track
    const baseOffset = currentIndex * (cardWidth + cardGap);

    return centerPoint - cardCenter - baseOffset;
  };

  const trackOffset = calculateOffset();

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  return (
    <section
      className={styles.announcementsCarousel}
      aria-labelledby="announcements-title"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <h2 id="annoucements-title" className={styles.title}>
            {title}
          </h2>
          {showFilters && categories.length > 1 && (
            <div className={styles.filters}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleFilterClick(category)}
                  className={`${styles.filterBtn} ${
                    activeFilter === category ? styles.active : ""
                  } `}
                  aria-pressed={activeFilter === category}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Main content */}
        <>
          {filteredAnnouncements.length > 0 ? (
            <div className={styles.carouselContainer}>
              {filteredAnnouncements.length > 1 && (
                <>
                  <button
                    className={`${styles.navButton} ${styles.prevButton}`}
                    onClick={handlePrevious}
                    aria-label="Previous announcement"
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
                    aria-label="Previous announcement"
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

                  <div className={styles.carouselTrackWrapper}>
                    <div
                      className={styles.carouselTrack}
                      ref={carouselTrackRef}
                    >
                      <motion.div
                        className={styles.carouselInner}
                        animate={{ x: trackOffset }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 25,
                        }} // Animation physics
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
                              imageSrc={announcement?.imageSrc}
                              imageAlt={announcement.title}
                              title={announcement.title}
                              description={announcement.description}
                              link={announcement.link}
                              linkText="Read More"
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
                            idx === currentIndex ? styles.active : "" // Apply active class
                          }`}
                          onClick={() => handleDotClick(idx)} // Attach click handler
                          aria-label={`Go to announcement ${idx + 1}`}
                          aria-current={idx === currentIndex ? "true" : "false"} // Accessibility
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <p>Placeholder: View All link will be here</p>
          )}
        </>
      </div>
    </section>
  );
}
export default Announcements;
