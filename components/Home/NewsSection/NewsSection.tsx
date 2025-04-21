import styles from "./NewsSection.module.scss";
import { formatDate } from "./utils";
import NewsMotion from "./NewsSection.client";

// Updated types based on your actual API response
interface ImageFormat {
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

interface ArticleImage {
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

interface Localization {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  isFeatured: boolean;
}

// Direct structure from your API
interface StrapiArticle {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  isFeatured: boolean;
  slug: string; // Added slug field
  image: ArticleImage;
  localizations: Localization[];
}

interface StrapiResponse {
  data: StrapiArticle[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Processed article for our client component
interface ProcessedArticle {
  id: string | number;
  title: string;
  content: string;
  description: string;
  publishedAt: string;
  image: ArticleImage | null;
  slug: string; // Added slug field
}

export default async function NewsSection({
  locale = "fr",
}: {
  locale?: string;
}) {
  try {
    // Fetch articles from Strapi
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*&locale=${locale}&sort=publishedAt:desc`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch articles: ${response.status} ${response.statusText}`
      );
      return <div className={styles.empty}>Failed to load news articles</div>;
    }

    const data: StrapiResponse = await response.json();
    const articles = data.data;

    if (!articles || articles.length === 0) {
      return <div className={styles.empty}>No news articles available</div>;
    }

    const getShortDescription = (
      content: string = "",
      maxLength: number = 120
    ): string => {
      if (!content) return "";
      const firstParagraph = content.split("\n")[0];
      if (firstParagraph.length <= maxLength) return firstParagraph;
      return firstParagraph.substring(0, maxLength).trim() + "...";
    };

    const processArticle = (article: StrapiArticle): ProcessedArticle => {
      return {
        id: article.id,
        title: article.title || "Untitled",
        content: article.content || "",
        description: getShortDescription(article.content, 120),
        publishedAt: formatDate(article.publishedAt, locale),
        image: article.image || null,
        slug: article.slug || `article-${article.id}`,
      };
    };

    const validArticles = articles.filter(
      (article: StrapiArticle) => article && article.title && article.content
    );

    if (validArticles.length === 0) {
      return (
        <div className={styles.empty}>No valid news articles available</div>
      );
    }

    const sortedArticles = [...validArticles].sort(
      (a: StrapiArticle, b: StrapiArticle) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    const featuredArticleData = sortedArticles[0];

    const featuredArticle = processArticle(featuredArticleData);

    featuredArticle.description = getShortDescription(
      featuredArticle.content,
      250
    );

    const listArticles = sortedArticles
      .filter(
        (article: StrapiArticle): boolean =>
          article.id !== featuredArticleData.id
      )
      .slice(0, 5)
      .map(
        (article: StrapiArticle): ProcessedArticle => processArticle(article)
      );

    return (
      <NewsMotion
        articles={listArticles}
        featuredArticle={featuredArticle}
        locale={locale}
      />
    );
  } catch (error) {
    console.error("Error in NewsSection:", error);
    return <div className={styles.empty}>Error loading news articles</div>;
  }
}
