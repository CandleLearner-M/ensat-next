import { formatDate } from "@/components/Home/NewsSection/utils";
import { StrapiArticle, ProcessedArticle, ArchiveData } from "./types";

//Extract a short description from article content
export function getShortDescription(
  content: string = "",
  maxLength: number = 150
): string {
  if (!content) return "";
  // Handle markdown content by removing potential formatting
  const cleanContent = content.replace(/#+\s|\*\*|\*|_|`|>/g, "");
  const firstParagraph = cleanContent.split("\n")[0];
  if (firstParagraph.length <= maxLength) return firstParagraph;
  return firstParagraph.substring(0, maxLength).trim() + "...";
}

// Calculate estimated read time based on content length
export function calculateReadTime(content: string): number {
  if (!content) return 1;
  const words = content.trim().split(/\s+/).length;
  const readingSpeed = 150;
  const readTime = Math.ceil(words / readingSpeed);
  return readTime < 1 ? 1 : readTime;
}

// Process an article from Strapi API response format to our app format
export function processArticle(
  article: StrapiArticle,
  locale: string
): ProcessedArticle {
  // Parse date for archive grouping
  const publishDate = new Date(article.publishedAt);

  return {
    id: article.id,
    title: article.title || "Untitled",
    content: article.content || "",
    description: getShortDescription(article.content, 150),
    publishedAt: formatDate(article.publishedAt, locale),
    image: article.image || null,
    slug: article.slug || `article-${article.id}`,
    readTime: article.readTime || calculateReadTime(article.content),
    viewCount: article.viewCount || Math.floor(Math.random() * 500) + 50,
    tags: article.tags || [],
    year: publishDate.getFullYear(),
    month: publishDate.getMonth() + 1,
  };
}

// Build archive data structure from processed articles
export function buildArchiveData(articles: ProcessedArticle[]): ArchiveData {
  return articles.reduce(
    (acc, article) => {
      if (article.year && !acc.years.includes(article.year)) {
        acc.years.push(article.year);
      }

      if (article.year && article.month) {
        const yearMonthKey = `${article.year}-${article.month}`;
        if (!acc.months.includes(yearMonthKey)) {
          acc.months.push(yearMonthKey);
        }
      }

      return acc;
    },
    { years: [] as number[], months: [] as string[] }
  );
}

//Extract unique tags from articles
export function extractTags(articles: ProcessedArticle[]): string[] {
  return articles
    .flatMap((article) => article.tags || [])
    .filter((value, index, self) => self.indexOf(value) === index)
    .sort();
}

// Select featured articles based on view count
export function selectFeaturedArticles(
  articles: ProcessedArticle[],
  count = 3
): ProcessedArticle[] {
  return articles
    .filter((article) => article.viewCount && article.viewCount > 200)
    .slice(0, count);
}
