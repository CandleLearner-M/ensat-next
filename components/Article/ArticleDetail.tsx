"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaNewspaper,
  FaShareAlt,
  FaAngleRight,
} from "react-icons/fa";
import styles from "./ArticleDetail.module.scss";
import { useLocale } from "next-intl";
import {
  FormattedArticleData,
  LocalizedArticle,
} from "@/app/[locale]/news/[slug]/utils";

interface ArticleDetailProps {
  article: FormattedArticleData;
  relatedArticles?: LocalizedArticle[];
  locale: string; // Initial locale from server component
}

export default function ArticleDetail({
  article,
  locale: initialLocale,
  relatedArticles = [],
}: ArticleDetailProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [relatedImagesLoaded, setRelatedImagesLoaded] = useState<{
    [key: number]: boolean;
  }>({});

  const currentLocale = useLocale();
  const currentContent = article[currentLocale] || article[initialLocale];

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!currentContent.content) return 1;

    // Count words by splitting on whitespace
    const wordCount = currentContent.content.split(/\s+/).length;

    // Average reading speed (words per minute)
    const wordsPerMinute = 125;

    // Calculate reading time in minutes
    const readingTimeMinutes = Math.max(
      1,
      Math.ceil(wordCount / wordsPerMinute)
    );

    return readingTimeMinutes;
  }, [currentContent.content]);

  if (!currentContent) {
    return <div className={styles.error}>Article not found</div>;
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Intl.DateTimeFormat(
      currentLocale === "fr" ? "fr-FR" : "en-US",
      options
    ).format(date);
  };

  // Format reading time with proper localization
  const formatReadingTime = (minutes: number) => {
    if (currentLocale === "fr") {
      return `${minutes} min${minutes > 1 ? "s" : ""} de lecture`;
    }
    return `${minutes} min${minutes > 1 ? "s" : ""} read`;
  };

  // Format content (handle paragraphs)
  const formatContent = (content: string = "") => {
    if (!content) return <p>No content available</p>;
    return content.split("\n").map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      return <p key={index}>{paragraph}</p>;
    });
  };

  const goBack = () => {
    router.back();
  };

  // Share functionality
  const shareArticle = () => {
    if (navigator.share) {
      navigator
        .share({
          title: currentContent.title,
          text:
            currentContent.content?.substring(0, 100) ||
            "Check out this article",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(currentLocale === "fr" ? "Lien copié!" : "Link copied!");
    }
  };

  // Handle image load for related articles
  const handleRelatedImageLoad = (index: number) => {
    setRelatedImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className={styles.articleDetail}>
      <div className={styles.articleHeader}>
        <motion.div
          className={styles.backButton}
          onClick={goBack}
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          whileHover={{ x: -5 }}
          transition={{ duration: 0.3 }}
        >
          <FaArrowLeft className={styles.icon} />
          <span>{currentLocale === "fr" ? "Retour" : "Back"}</span>
        </motion.div>

        <motion.div
          className={styles.shareButton}
          onClick={shareArticle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <FaShareAlt className={styles.icon} />
          <span>{currentLocale === "fr" ? "Partager" : "Share"}</span>
        </motion.div>
      </div>

      {currentContent.image && (
        <motion.div
          className={styles.imageContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: imageLoaded ? 0 : 30,
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={currentContent.image}
              alt={currentContent.title || "Article image"}
              width={1200}
              height={875}
              className={styles.image}
              priority
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          <div className={styles.imageOverlay}></div>
        </motion.div>
      )}

      <div className={styles.contentWrapper}>
        <motion.h1
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {currentContent.title}
        </motion.h1>

        <motion.div
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={styles.metaItem}>
            <FaCalendarAlt className={styles.metaIcon} />
            {formatDate(currentContent.publishedAt)}
          </div>
          <div className={styles.metaItem}>
            <FaClock className={styles.metaIcon} />
            {formatReadingTime(readingTime)}
          </div>
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {formatContent(currentContent.content)}
        </motion.div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <motion.section
            className={styles.relatedArticlesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className={styles.relatedHeading}>
              {currentLocale === "fr"
                ? "Articles connexes"
                : "Related articles"}
            </h2>

            <div className={styles.relatedGrid}>
              {relatedArticles.map((articleItem, index) => {
                // Get content for current locale or fallback
                const content =
                  articleItem[currentLocale] ||
                  articleItem[initialLocale] ||
                  articleItem[Object.keys(articleItem)[0]];

                if (!content) return null;

                return (
                  <motion.div
                    className={styles.relatedCard}
                    key={content.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * (index + 1), duration: 0.5 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 8px 30px rgba(0, 112, 243, 0.15)",
                    }}
                  >
                    <Link
                      href={`/news/${content.slug}`}
                      className={styles.relatedLink}
                    >
                      <div className={styles.relatedImageWrapper}>
                        {content.image && (
                          <>
                            <Image
                              src={content.image}
                              alt={content.title}
                              width={400}
                              height={225}
                              className={`${styles.relatedImage} ${
                                relatedImagesLoaded[index] ? styles.loaded : ""
                              }`}
                              onLoad={() => handleRelatedImageLoad(index)}
                            />
                            <div className={styles.relatedImageOverlay}></div>
                          </>
                        )}
                      </div>
                      <div className={styles.relatedContent}>
                        <h3 className={styles.relatedTitle}>{content.title}</h3>
                        <div className={styles.relatedMeta}>
                          <FaCalendarAlt className={styles.relatedMetaIcon} />
                          <span>{formatDate(content.publishedAt)}</span>
                        </div>
                        <span className={styles.readMore}>
                          {currentLocale === "fr"
                            ? "Lire l'article"
                            : "Read article"}
                          <FaAngleRight className={styles.arrowIcon} />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.section>
        )}

        <motion.div
          className={styles.viewAllNews}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.03 }}
        >
          <Link href="/news" className={styles.viewAllLink}>
            <FaNewspaper className={styles.newsIcon} />
            <span>
              {currentLocale === "fr"
                ? "Voir toutes les actualités"
                : "View all news"}
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
