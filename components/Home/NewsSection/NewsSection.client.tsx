"use client";

import AnimatedLink from "@/components/common/AnimatedLink/AnimatedLink";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsSection.module.scss";

// Enhanced animation variants
const featuredVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

const imageHover = {
  rest: { scale: 1, filter: "brightness(1)" },
  hover: {
    scale: 1.05,
    filter: "brightness(1.05)",
    transition: {
      scale: { duration: 0.4, ease: "easeOut" },
      filter: { duration: 0.2 },
    },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
  tap: { scale: 0.98 },
};

export default function NewsMotion({ articles, featuredArticle, locale }) {
  if (!articles || articles.length === 0) {
    return <div className={styles.empty}>No news articles available</div>;
  }

  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        {/* Featured Article - Removed parallax effect */}
        <motion.div
          className={styles.featured}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={featuredVariants}
        >
          <motion.div
            className={styles.featuredImage}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            {featuredArticle.image && (
              <motion.div
                style={{ width: "100%", height: "100%", position: "relative" }}
                variants={imageHover}
              >
                <Image
                  src={featuredArticle.image.url}
                  alt={featuredArticle.title}
                  fill
                  className={styles.image}
                  priority
                />
              </motion.div>
            )}
          </motion.div>

          <motion.div
            className={styles.featuredContent}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            <motion.div
              className={styles.featuredMeta}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {featuredArticle.publishedAt}
            </motion.div>

            <motion.h2
              className={styles.featuredTitle}
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/news/${featuredArticle.id}`}>
                {featuredArticle.title}
              </Link>
            </motion.h2>

            <motion.p
              className={styles.featuredDesc}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              {featuredArticle.description}
            </motion.p>

            <motion.div>
              <Link
                href={`/news/${featuredArticle.id}`}
                className={styles.readMore}
              >
                {locale === "fr" ? "Lire la suite" : "Read more"} &nbsp;&nbsp;→
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* News List - Simplified animations, keeping individual triggers */}
        <div className={styles.newsList}>
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              className={styles.newsItem}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
                ease: "easeOut",
              }}
            >
              <div className={styles.newsContent}>
                <div className={styles.newsMeta}>{article.publishedAt}</div>

                <h3 className={styles.newsTitle}>
                  <AnimatedLink href={`/news/${article.id}`}>
                    {article.title}
                  </AnimatedLink>
                </h3>

                <p className={styles.newsDesc}>{article.description}</p>
              </div>

              <motion.div
                className={styles.newsImage}
                initial="rest"
                whileHover="hover"
                variants={{
                  hover: {
                    scale: 1.08,
                    rotate: 1,
                    transition: { duration: 0.4, ease: "easeOut" },
                  },
                }}
              >
                {article.image && (
                  <Image
                    src={article.image.formats?.small?.url || article.image.url}
                    alt={article.title}
                    width={400}
                    height={400}
                    className={styles.image}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div variants={buttonVariants} initial="rest" whileTap="tap">
            <Link href="/news" className={styles.viewAllLink}>
              {locale === "fr" ? "Voir toutes les actualités" : "View all news"}{" "}
              &nbsp;&nbsp;→
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
