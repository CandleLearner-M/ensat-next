import { Metadata } from "next";
import styles from "./page.module.scss";
import NewsPage from "@/components/NewsPage/NewsPage";
import UserTimeInfo from "@/components/UserTimeInfo/UserTimeInfo";
import { ProcessedArticle } from "./types";
import { fetchArticles } from "./api";
import {
  processArticle,
  buildArchiveData,
  extractTags,
  selectFeaturedArticles,
} from "./utils";

// Define metadata for the page
export const metadata: Metadata = {
  title: "ENSAT News Archive | Latest Updates and Announcements",
  description:
    "Stay informed with the latest news, events, research breakthroughs and announcements from the National School of Applied Sciences of Tangier.",
  openGraph: {
    title: "ENSAT News Archive",
    description: "Latest news and announcements from ENSAT",
    images: [{ url: "/images/news-og-image.jpg", width: 1200, height: 630 }],
  },
};

export const revalidate = 600; // 10 minutes

export default async function NewsPageContainer({
  params,
  searchParams,
}: {
  params: { locale?: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Get locale from params or default to French
  const locale = params.locale || "fr";

  // Parse search params for enhanced functionality
  const view =
    typeof searchParams?.view === "string" ? searchParams.view : "grid";
  const sort =
    typeof searchParams?.sort === "string" ? searchParams.sort : "latest";
  const archiveYear =
    typeof searchParams?.year === "string"
      ? parseInt(searchParams.year, 10)
      : undefined;
  const archiveMonth =
    typeof searchParams?.month === "string"
      ? parseInt(searchParams.month, 10)
      : undefined;
  const tag =
    typeof searchParams?.tag === "string" ? searchParams.tag : undefined;

  try {
    // Fetch articles from API
    const articles = await fetchArticles(
      locale,
      sort,
      archiveYear,
      archiveMonth,
      tag
    );

    if (!articles || articles.length === 0) {
      return (
        <>
          <UserTimeInfo />
          <div className={styles.empty}>
            <h2>No news articles available</h2>
            <p>
              {locale === "fr"
                ? "Aucun article trouvé pour les critères spécifiés."
                : "No articles found for the specified criteria."}
            </p>
          </div>
        </>
      );
    }

    // Process all articles
    const processedArticles: ProcessedArticle[] = articles
      .filter((article) => article && article.title && article.content)
      .map((article) => processArticle(article, locale));

    // Build archive data for sidebar navigation
    const archiveData = buildArchiveData(processedArticles);

    // Extract unique tags for filtering
    const allTags = extractTags(processedArticles);

    // Get featured articles
    const featuredArticles = selectFeaturedArticles(processedArticles, 3);

    // Render the page
    return (
      <div className={styles.pageContainer}>
        {/* <UserTimeInfo /> */}
        <NewsPage
          articles={processedArticles}
          locale={locale}
          viewMode={view as "grid" | "list" | "compact"}
          sortMode={sort as "latest" | "oldest" | "popular"}
          archiveData={archiveData}
          currentYear={archiveYear}
          currentMonth={archiveMonth}
          tags={allTags}
          currentTag={tag}
          featuredArticles={featuredArticles}
        />
      </div>
    );
  } catch (error) {
    console.error("Error in NewsPage:", error);
    return (
      <>
        <UserTimeInfo />
        <div className={styles.error}>
          <h2>
            {locale === "fr" ? "Erreur de chargement" : "Error Loading Content"}
          </h2>
          <p>
            {locale === "fr"
              ? "Une erreur s'est produite lors du chargement des articles."
              : "An error occurred while loading the articles."}
          </p>
        </div>
      </>
    );
  }
}
