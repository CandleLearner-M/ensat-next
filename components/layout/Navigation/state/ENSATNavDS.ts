// Define the navigation item type
export interface NavigationItem {
  id: string; // Unchanged - use as translation key
  label: string;
  translationKey?: string; // Optional override if different from id
  path: string; // Unchanged
  image?: string; // Unchanged
  hasSubmenu?: boolean; // Unchanged
  submenu?: NavigationItem[]; // Unchanged
}

// Define the main navigation data
const navigationData: NavigationItem[] = [
  {
    id: "ensat",
    label: "ENSAT",
    path: "",
    image:
      "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", // Modern campus building
    hasSubmenu: true,
    submenu: [
      {
        id: "mot-directeur",
        translationKey: "motDirecteur",
        label: "Mot du Directeur",
        path: "/ensat/mot-directeur",
      },
      {
        id: "presentation",
        label: "Présentation",
        path: "/ensat/presentation",
      },
      {
        id: "mission-valeurs",
        translationKey: "missionValeurs",
        label: "Mission & Valeurs",
        path: "/ensat/mission-valeurs",
      },
      {
        id: "reglement",
        label: "Réglement Intérieur",
        path: "/documents/Reglement-interieur-ENSAT.pdf",
      },
      {
        id: "instances",
        label: "Instances et Structures de Gouvernance et de Gestion",
        path: "/ensat/instances",
      },
      {
        id: "conseil",
        label: "Conseil et Commissions",
        path: "/ensat/conseil",
      },
      {
        id: "infrastructures",
        label: "Infrastructures",
        path: "/ensat/infrastructures",
      },
      {
        id: "charte",
        label: "Charte graphique",
        path: "/documents/Charte-graphique-ENSA-Tanger.pdf",
      },
      { id: "contact", label: "Contact", path: "/ensat/contact" },
    ],
  },
  {
    id: "formations",
    label: "Formations",
    path: "/formations",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=75", // Students in lecture hall
    hasSubmenu: true,
    submenu: [
      {
        id: "formation-initiale",
        translationKey: "formationInitiale",
        label: "Formation Initiale",
        path: "/formations/initiale",
        hasSubmenu: true,
        submenu: [
          {
            id: "annees-preparatoires",
            translationKey: "anneesPreparatoires",
            label: "Années Préparatoires (AP)",
            path: "/formations/initiale/ap",
          },
          {
            id: "cycle-ingenieur",
            translationKey: "cycleIngenieur",
            label: "Cycle Ingénieur",
            path: "/formations/initiale/cycle-ingenieur",
            hasSubmenu: true,
            submenu: [
              {
                id: "gsr",
                label: "GSR",
                path: "/formations/initiale/cycle-ingenieur/gsr",
              },
              {
                id: "ginf",
                label: "GINF",
                path: "/formations/initiale/cycle-ingenieur/ginf",
              },
              {
                id: "gind",
                label: "GIND",
                path: "/formations/initiale/cycle-ingenieur/gind",
              },
              {
                id: "gsea",
                label: "GSEA",
                path: "/formations/initiale/cycle-ingenieur/gsea",
              },
              {
                id: "g2ei",
                label: "G2EI",
                path: "/formations/initiale/cycle-ingenieur/g2ei",
              },
              {
                id: "csi",
                label: "CSI",
                path: "/formations/initiale/cycle-ingenieur/csi",
              },
            ],
          },
          {
            id: "cycle-master",
            translationKey: "cycleMaster",
            label: "Cycle Master",
            path: "/formations/initiale/cycle-master",
            hasSubmenu: true,
            submenu: [
              {
                id: "mbisd",
                label: "MBISD",
                path: "/formations/initiale/cycle-master/mbisd",
              },
              {
                id: "mpsi",
                label: "MPSI",
                path: "/formations/initiale/cycle-master/mpsi",
              },
            ],
          },
        ],
      },
      {
        id: "formation-continue",
        translationKey: "formationContinue",
        label: "Formation Continue",
        path: "/formations/continue",
        hasSubmenu: true,
        submenu: [
          { id: "dca", label: "DCA", path: "/formations/continue/dca" },
          { id: "dcess", label: "DCESS", path: "/formations/continue/dcess" },
          {
            id: "formulaire",
            label: "Formulaire d'inscription",
            path: "/formations/continue/formulaire",
          },
        ],
      },
    ],
  },
  {
    id: "departements",
    label: "Départements",
    path: "",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", // Library or faculty corridor
    hasSubmenu: true,
    submenu: [
      { id: "sic", label: "SIC", path: "/departements/sic" },
      { id: "gei", label: "GEI", path: "/departements/gei" },
      { id: "mi", label: "MI", path: "/departements/mi" },
      { id: "lcm", label: "LCM", path: "/departements/lcm" },
    ],
  },
  {
    id: "recherche",
    label: "Recherche",
    path: "",
    image:
      "https://ensat.ac.ma/Portail/wp-content/uploads/2021/07/YSR_3570-1024x683.jpg", // Scientific research lab
    hasSubmenu: true,
    submenu: [
      {
        id: "laboratoires",
        label: "Laboratoires",
        path: "/recherche/laboratoires",
        hasSubmenu: true,
        submenu: [
          {
            id: "labtic",
            label: "LabTIC",
            path: "/recherche/laboratoires/labtic",
          },
          { id: "lti", label: "LTI", path: "/recherche/laboratoires/lti" },
        ],
      },
      {
        id: "equipes",
        label: "Equipes de recherche",
        path: "/recherche/equipes",
        hasSubmenu: true,
        submenu: [
          { id: "ermia", label: "ERMIA", path: "/recherche/equipes/ermia" },
          { id: "ids", label: "IDS", path: "/recherche/equipes/ids" },
          { id: "masi", label: "MASI", path: "/recherche/equipes/masi" },
        ],
      },
      {
        id: "formation-doctorale",
        translationKey: "formationDoctorale",
        label: "Formation Doctorale",
        path: "/recherche/formation-doctorale",
      },
      {
        id: "production",
        label: "Production Scientifique",
        path: "/recherche/production",
      },
      {
        id: "documents",
        label: "Documents de Soutenance",
        path: "/recherche/documents",
      },
    ],
  },
  {
    id: "partenariats",
    label: "Partenariats",
    path: "",
    image:
      "https://images.unsplash.com/photo-1541872703-74c5e44368f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", // Handshake or business meeting
    hasSubmenu: true,
    submenu: [
      {
        id: "double-diplomation",
        translationKey: "doubleDiplomation",
        label: "Conventions Double Diplomation",
        path: "/partenariats/double-diplomation",
      },
      {
        id: "relations",
        label: "Relations Entreprises",
        path: "/partenariats/relations",
      },
    ],
  },
  {
    id: "etudiants",
    label: "Étudiants",
    path: "",
    image:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", // Students working together
    hasSubmenu: true,
    submenu: [
      { id: "emploi", label: "Emploi du Temps", path: "/etudiants/emploi" },
      { id: "gestion", label: "Gestion Scolaire", path: "/etudiants/gestion" },
      { id: "choix", label: "Choix de la Filière", path: "/etudiants/choix" },
      { id: "ade", label: "ADE", path: "/etudiants/ade" },
      { id: "clubs", label: "Clubs et Associations", path: "/etudiants/clubs" },
      {
        id: "assurance",
        label: "Assurance Maladie Gratuite (AMO)",
        path: "/etudiants/assurance",
      },
    ],
  },
  {
    id: "appels",
    label: "Appels d'Offre",
    path: "",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80", // Business documents or contract signing
    hasSubmenu: true,
    submenu: [
      { id: "marches", label: "Marchés Publics", path: "/appels/marches" },
      { id: "stages", label: "Stages et Emplois", path: "/appels/stages" },
      { id: "bourses", label: "Bourses et Mobilités", path: "/appels/bourses" },
    ],
  },
];

export default navigationData;
