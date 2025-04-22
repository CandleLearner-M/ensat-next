// Article content interfaces
export interface ArticleContent {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  slug: string;
  image: string | null;
  imageFormats: any | null;
}

export interface FormattedArticleData {
  [locale: string]: ArticleContent;
}

/**
 * Transforms raw Strapi article data into a locale-based structure
 * @param articleData Raw data from Strapi API
 * @returns Object with locale keys and article content or null
 */
export function formatArticleData(
  articleData: any
): FormattedArticleData | null {
  if (!articleData?.data?.[0]) return null;

  const mainArticle = articleData.data[0].attributes || articleData.data[0];
  const result: FormattedArticleData = {};

  result[mainArticle.locale] = {
    id: articleData.data[0].id,
    title: mainArticle.title || "Untitled",
    content: mainArticle.content || "",
    publishedAt: mainArticle.publishedAt,
    slug: mainArticle.slug,
    image:
      mainArticle.image?.data?.attributes?.url ||
      mainArticle.image?.url ||
      null,
    imageFormats: mainArticle.image?.formats || null,
  };

  const localizations =
    mainArticle.localizations?.data || mainArticle.localizations || [];

  if (localizations.length > 0) {
    localizations.forEach((localization: any) => {
      const locAttrs = localization.attributes || localization;

      result[locAttrs.locale] = {
        id: localization.id,
        title: locAttrs.title || "Untitled",
        content: locAttrs.content || "",
        publishedAt: locAttrs.publishedAt,
        slug: locAttrs.slug || mainArticle.slug,
        image:
          mainArticle.image?.data?.attributes?.url ||
          mainArticle.image?.url ||
          null,
        imageFormats: mainArticle.image?.formats || null,
      };
    });
  }

  return result;
}

/**
 * Fetches an article by slug from Strapi API
 * @param slug Article slug
 * @returns Formatted article data or null
 */
export async function fetchArticleBySlug(
  slug: string
): Promise<FormattedArticleData | null> {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/articles?filters[slug]=${encodeURIComponent(slug)}&populate=*`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) return null;

    const articlesData = await response.json();
    return formatArticleData(articlesData);
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

/**
 * Format multiple articles as an array of localized articles
 * @param articlesData Array of article data from API
 * @param currentSlug Slug of the current article to exclude
 * @returns Array of articles with localized content
 */
export interface LocalizedArticle {
  [locale: string]: {
    id: number;
    title: string;
    content: string;
    publishedAt: string;
    slug: string;
    image: string | null;
    imageFormats: any | null;
  };
}

export function formatRelatedArticles(
  articlesData: any,
  currentSlug: string
): LocalizedArticle[] {
  const result: LocalizedArticle[] = [];

  if (!articlesData?.data || !Array.isArray(articlesData.data)) {
    return result;
  }

  // Process each article
  for (const article of articlesData.data) {
    const attributes = article.attributes || article;

    // Skip if this is the current article
    if (attributes.slug === currentSlug) {
      continue;
    }

    // Skip if missing critical data
    if (!attributes.slug || !attributes.locale) {
      continue;
    }

    // Create a new localized article object
    const localizedArticle: LocalizedArticle = {};

    // Add main locale version
    localizedArticle[attributes.locale] = {
      id: article.id,
      title: attributes.title || "Untitled",
      content: attributes.content || "",
      publishedAt: attributes.publishedAt,
      slug: attributes.slug,
      image: attributes.image?.url || attributes.image?.data?.attributes?.url || null,
      imageFormats: attributes.image?.formats || attributes.image?.data?.attributes?.formats || null,
    };

    // Process localizations
    const localizations = attributes.localizations?.data || attributes.localizations || [];

    if (localizations.length > 0) {
      localizations.forEach((localization: any) => {
        const locAttrs = localization.attributes || localization;

        if (locAttrs.locale) {
          localizedArticle[locAttrs.locale] = {
            id: localization.id,
            title: locAttrs.title || "Untitled",
            content: locAttrs.content || "",
            publishedAt: locAttrs.publishedAt,
            slug: locAttrs.slug || attributes.slug,
            image: attributes.image?.url || attributes.image?.data?.attributes?.url || null,
            imageFormats: attributes.image?.formats || attributes.image?.data?.attributes?.formats || null,
          };
        }
      });
    }

    // Add to results array
    result.push(localizedArticle);

    // If we've collected 3 articles, stop
    if (result.length >= 3) {
      break;
    }
  }

  return result;
}

/**
 * Fetches related articles (most recent except current)
 * @param currentSlug Slug of the current article to exclude
 * @param limit Maximum number of related articles to fetch
 * @returns Array of localized articles
 */
export async function fetchRelatedArticles(currentSlug: string, limit: number = 4): Promise<LocalizedArticle[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?sort=publishedAt:desc&pagination[limit]=${limit}&populate=*`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) return [];

    const articlesData = await response.json();
    return formatRelatedArticles(articlesData, currentSlug);
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }
}