import { StrapiArticle } from "./types";

// Fetch articles from Strapi API
export async function fetchArticles(
  locale: string,
  sort: string,
  archiveYear?: number,
  archiveMonth?: number,
  tag?: string
) {
  try {
    // Build query parameters
    const queryParams = new URLSearchParams({
      populate: "*",
      locale: locale,
      sort: sort === "oldest" ? "publishedAt:asc" : "publishedAt:desc",
      "pagination[pageSize]": "100",
    });

    // Add year/month filtering if specified
    if (archiveYear) {
      const startDate = archiveMonth
        ? `${archiveYear}-${String(archiveMonth).padStart(2, "0")}-01`
        : `${archiveYear}-01-01`;

      const endDate = archiveMonth
        ? new Date(archiveYear, archiveMonth, 0).toISOString().split("T")[0]
        : `${archiveYear}-12-31`;

      queryParams.append("filters[$and][0][publishedAt][$gte]", startDate);
      queryParams.append("filters[$and][1][publishedAt][$lte]", endDate);
    }

    // Add tag filtering if specified
    if (tag) {
      queryParams.append("filters[tags][$contains]", tag);
    }

    // Fetch data
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/articles?${queryParams.toString()}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch articles: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data as StrapiArticle[];
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}
