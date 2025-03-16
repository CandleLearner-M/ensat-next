// Define the navigation item type
interface NavigationItem {
  id: string;
  label: string;
  path: string;
  hasSubmenu?: boolean;
  submenu?: NavigationItem[];
}

// Define the main navigation data
const navigationData: NavigationItem[] = [
  {
    id: "ensat",
    label: "ENSAT",
    path: "",
    hasSubmenu: true,
    submenu: [
      {
        id: "mot-directeur",
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
        label: "Mission & Valeurs",
        path: "/ensat/mission-valeurs",
      },
      {
        id: "reglement",
        label: "Réglement Intérieur",
        path: "/ensat/reglement",
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
      { id: "charte", label: "Charte graphique", path: "/ensat/charte" },
      { id: "contact", label: "Contact", path: "/ensat/contact" },
    ],
  },
  {
    id: "formations",
    label: "Formations",
    path: "/formations",
    hasSubmenu: true,
    submenu: [
      {
        id: "formation-initiale",
        label: "Formation Initiale",
        path: "/formations/initiale",
        hasSubmenu: true,
        submenu: [
          {
            id: "annees-preparatoires",
            label: "Années Préparatoires (AP)",
            path: "/formations/initiale/ap",
          },
          {
            id: "cycle-ingenieur",
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
    hasSubmenu: true,
    submenu: [
      {
        id: "double-diplomation",
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
    hasSubmenu: true,
    submenu: [
      { id: "marches", label: "Marchés Publics", path: "/appels/marches" },
      { id: "stages", label: "Stages et Emplois", path: "/appels/stages" },
      { id: "bourses", label: "Bourses et Mobilités", path: "/appels/bourses" },
    ],
  },
];

export default navigationData;
