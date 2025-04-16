export interface Announcement {
  id: number | string;
  title: string;
  description: string;
  imageSrc?: string;
  category?: string;
  link?: string;
  date?: string; // Using YYYY-MM-DD format
}

export const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "New Campus Initiative",
    description:
      "Launching our sustainability program to reduce carbon footprint across all university facilities.",
    // imageSrc: "/images/sustainability.jpg", // Keep existing images if you have them
    // category: "Campus Life", // Changed from "Campus"
    category: "",
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
