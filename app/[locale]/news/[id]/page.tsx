import { notFound } from "next/navigation";
import ArticleDetail from "@/components/Article/ArticleDetail";
import styles from "./page.module.scss";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    locale?: string;
  };
}

export default async function ArticlePage({ params, searchParams }: PageProps) {
  const { id } = params;
  const locale = searchParams.locale || "fr";

  try {
    // First try to fetch ALL articles (we'll filter for the one we need)
    // This is a workaround if the direct ID endpoint doesn't work
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/articles?populate=*&locale=${locale}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      console.error(`API returned ${response.status}: ${response.statusText}`);
      return notFound();
    }

    const allArticlesData = await response.json();

    if (
      !allArticlesData ||
      !allArticlesData.data ||
      !Array.isArray(allArticlesData.data)
    ) {
      console.error("Invalid API response format");
      return notFound();
    }

    // Find the article with the matching ID
    const article = allArticlesData.data.find(
      (article: any) => article.id.toString() === id
    );

    if (!article) {
      console.error(`Article with ID ${id} not found`);
      return notFound();
    }

    return (
      <div className={styles.container}>
        <ArticleDetail article={article} locale={locale} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}
