import { notFound } from "next/navigation";
import styles from "./page.module.scss";
import ArticleDetail from "@/components/Article/ArticleDetail";

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

interface ArticleContent {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  slug: string;
  image: string | null;
  imageFormats: any | null;
}

interface FormattedArticleData {
  [locale: string]: ArticleContent;
}

function formatArticleData(articleData: any): FormattedArticleData | null {
  if (!articleData?.data?.[0]) return null;

  const mainArticle = articleData.data[0];
  const result: FormattedArticleData = {};

  result[mainArticle.locale] = {
    id: mainArticle.id,
    title: mainArticle.title || "Untitled",
    content: mainArticle.content || "",
    publishedAt: mainArticle.publishedAt,
    slug: mainArticle.slug,
    image: mainArticle.image?.url || null,
    imageFormats: mainArticle.image?.formats || null,
  };

  // Process localizations (other language versions)
  if (mainArticle.localizations?.length > 0) {
    mainArticle.localizations.forEach((localization: any) => {
      result[localization.locale] = {
        id: localization.id,
        title: localization.title || "Untitled",
        content: localization.content || "",
        publishedAt: localization.publishedAt,
        slug: localization.slug || mainArticle.slug,
        image: mainArticle.image?.url || null,
        imageFormats: mainArticle.image?.formats || null,
      };
    });
  }

  return result;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug, locale } = params;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/articles?filters[slug]=${encodeURIComponent(slug)}&populate=*`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) return { title: "Article Not Found" };

    const articlesData = await response.json();
    const formattedData = formatArticleData(articlesData);

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
  const { slug, locale } = params;

  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL
      }/api/articles?filters[slug]=${encodeURIComponent(slug)}&populate=*`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) return notFound();

    const articlesData = await response.json();

    if (!articlesData?.data?.length) return notFound();

    const formattedData = formatArticleData(articlesData);

    if (!formattedData) return notFound();

    return (
      <div className={styles.container}>
        <ArticleDetail article={formattedData} locale={locale} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching article:", error);
    return notFound();
  }
}
