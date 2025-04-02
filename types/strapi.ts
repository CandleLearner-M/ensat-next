// Raw strapi response Types
export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Image Types from Strapi
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface StrapiImage {
  id: number;
  name: string;
  url: string;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
}

// ENSAT components types
export interface StrapiHeroComponent {
  __component: "nav-item.hero";
  id: number;
  headline: string;
  subHeading: string;
  background: StrapiImage;
}

// Type for all Possible Components
export type StrapiComponent = StrapiHeroComponent;

// Main item type
export interface StrapiNavItem {
  id: number;
  documentId: string;
  locale: string;
  title: string;
  navItem: StrapiComponent[];
  localizations: StrapiNavItem[];
}

// Structured outputs types
export interface LocalizedContent {
  title: string;
  headline: string;
  subHeading: string;
}

export interface StructuredNavItem {
  id: number;
  documentId: string;
  locales: {
    [locale: string]: LocalizedContent;
  };
  media: {
    background: string;
  };
}
