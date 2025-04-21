"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ArticleDetail.module.scss";

// Define interfaces based on your actual data structure
interface ArticleDetailProps {
  article: any; // We use any temporarily until we confirm the exact structure
  locale: string;
}

export default function ArticleDetail({ article, locale }: ArticleDetailProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!article) {
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
      locale === "fr" ? "fr-FR" : "en-US",
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

  // Get image URL with safety checks
  const getImageUrl = () => {
    if (!article.image) return null;
    return article.image.url;
  };

  const imageUrl = getImageUrl();

  return (
    <div className={styles.articleDetail}>
      <motion.div
        className={styles.backButton}
        onClick={goBack}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        whileHover={{ x: -5 }}
        transition={{ duration: 0.3 }}
      >
        ← {locale === "fr" ? "Retour" : "Back"}
      </motion.div>

      <motion.h1
        className={styles.title}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {article.title}
      </motion.h1>

      <motion.div
        className={styles.meta}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {formatDate(article.publishedAt)}
      </motion.div>

      {imageUrl && (
        <motion.div
          className={styles.imageContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{
            y: imageLoaded ? 0 : 30,
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={imageUrl}
            alt={article.title || "Article image"}
            width={900}
            height={500}
            className={styles.image}
            priority
            onLoad={() => setImageLoaded(true)}
          />
        </motion.div>
      )}

      <motion.div
        className={styles.content}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {formatContent(article.content)}
      </motion.div>

      <motion.div
        className={styles.viewAllNews}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        <Link href="/news">
          {locale === "fr" ? "Voir toutes les actualités" : "View all news"} →
        </Link>
      </motion.div>
    </div>
  );
}
