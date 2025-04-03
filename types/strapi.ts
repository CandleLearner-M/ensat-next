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
  __component: "page-component.hero";
  id: number;
  headline: string;
  subHeading: string;
  background: StrapiImage;
}

// Type for all Possible Components
export type StrapiComponent = StrapiHeroComponent;

// Main item type
export interface StrapiEnsatItem {
  id: number;
  slug: string;
  documentId: string;
  publishedAt: string;
  locale: string;
  title: string;
  pageComponents: StrapiComponent[];
  localizations: StrapiEnsatItem[];
}

// Structured outputs types

export interface LocalizedHeroComponent {
  id: number;
  headline: string;
  subHeading: string;
  background: string;
}

export interface LocaleComponents {
  hero?: LocalizedHeroComponent;
}

export interface LocaleContent {
  title: string;
  components: LocaleComponents;
}

export interface StructuredEnsatPage {
  id: number;
  title: string;
  slug: string;
  documentId: string;
  publishedAt: string;
  locales: {
    [locale: string]: LocaleContent;
  };
}
