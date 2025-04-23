export interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

export interface ArticleImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  isFeatured: boolean;
  slug: string;
  image: ArticleImage;
  readTime?: number;
  viewCount?: number;
  tags?: string[];
}

export interface ProcessedArticle {
  id: string | number;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  image: ArticleImage | null;
  slug: string;
  readTime: number;
  viewCount?: number;
  tags?: string[];
  year?: number;
  month?: number;
}

export interface ArchiveData {
  years: number[];
  months: string[];
}
