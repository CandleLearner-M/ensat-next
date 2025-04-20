import styles from "./NewsSection.module.scss";
import { formatDate } from "./utils";
import NewsMotion from "./NewsSection.client";

export default async function NewsSection({
  locale = "fr",
}: {
  locale?: string;
}) {
  // Fetch articles from Strapi
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*&locale=${locale}`,
    { next: { revalidate: 600 } }
  );

  const data = await response.json();
  const articles = data.data;

  if (!articles || articles.length === 0) {
    return <div className={styles.empty}>No news articles available</div>;
  }

  // Helper function to extract a short description
  const getShortDescription = (content, maxLength = 120) => {
    const firstParagraph = content.split("\n")[0];
    if (firstParagraph.length <= maxLength) return firstParagraph;
    return firstParagraph.substring(0, maxLength).trim() + "...";
  };

  // First article is featured
  const featuredArticle = articles[0];
  // Rest of the articles (up to 5) for the list
  const listArticles = articles.slice(1, 6);

  // Process all data on the server side
  const formattedFeaturedArticle = {
    ...featuredArticle,
    publishedAt: formatDate(featuredArticle.publishedAt, locale),
    description: getShortDescription(featuredArticle.content, 250),
  };

  const formattedListArticles = listArticles.map((article) => ({
    ...article,
    publishedAt: formatDate(article.publishedAt, locale),
    description: getShortDescription(article.content),
  }));

  return (
    <NewsMotion
      articles={formattedListArticles}
      featuredArticle={formattedFeaturedArticle}
      locale={locale}
    />
  );
}
