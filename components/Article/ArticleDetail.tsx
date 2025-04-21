"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaNewspaper,
  FaShareAlt,
} from "react-icons/fa";
import styles from "./ArticleDetail.module.scss";
import { useLocale } from "next-intl";

// Define interface for our localized article data
interface LocalizedArticleData {
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

interface ArticleDetailProps {
  article: LocalizedArticleData;
  locale: string; // Initial locale from server component
}

export default function ArticleDetail({
  article,
  locale: initialLocale,
}: ArticleDetailProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentLocale = useLocale();

  const currentContent = article[currentLocale] || article[initialLocale];

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
          <FaCalendarAlt className={styles.calendarIcon} />
          {formatDate(currentContent.publishedAt)}
        </motion.div>

        <motion.div
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {formatContent(currentContent.content)}
        </motion.div>

        <motion.div
          className={styles.viewAllNews}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
