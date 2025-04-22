import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import ArticleDetail from "@/components/Article/ArticleDetail";
import { fetchArticleBySlug, fetchRelatedArticles } from "./utils";

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = await params;

  try {
    const formattedData = await fetchArticleBySlug(slug);

    if (!formattedData) return { title: "Article Not Found" };

    const availableLocale = formattedData[locale]
      ? locale
      : Object.keys(formattedData)[0];
    const article = formattedData[availableLocale];

    return {
      title: article.title,
      description: article.content?.substring(0, 160),
      openGraph: article.image
        ? { images: [{ url: article.image }] }
        : undefined,
    };
  } catch (_err) {
    return { title: "Article" };
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug, locale } = await params;

  try {
    // Fetch main article
    const formattedData = await fetchArticleBySlug(slug);
    if (!formattedData) return notFound();

    // Fetch related articles
    const relatedArticles = await fetchRelatedArticles(slug);

    return (
      <div className={styles.container}>
        <ArticleDetail
          article={formattedData}
          relatedArticles={relatedArticles}
          locale={locale}
        />
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}
