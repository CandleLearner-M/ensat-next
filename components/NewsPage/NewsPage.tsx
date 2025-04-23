"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFilter, FaArrowRightLong } from "react-icons/fa6";
import styles from "./NewsPage.module.scss";
import { FaSearch, FaTimes } from "react-icons/fa";

interface ArticleImage {
  url: string;
  formats?: {
    small?: {
      url: string;
    };
    medium?: {
      url: string;
    };
  };
}

interface Article {
  id: string | number;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  image: ArticleImage | null;
  slug: string;
  category?: string;
}

interface NewsPageProps {
  articles: Article[];
  locale: string;
  categories?: string[];
}

export default function NewsPage({
  articles,
  locale,
  categories = [],
}: NewsPageProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  useEffect(() => {
    let results = articles;

    // Filter by category
    if (activeCategory !== "all") {
      results = results.filter(
        (article) => article.category === activeCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.description.toLowerCase().includes(term)
      );
    }

    setFilteredArticles(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [articles, activeCategory, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    if (window.innerWidth < 768) {
      setShowFilters(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
  };

  return (
    <div className={styles.newsPageContainer}>
      {/* Page Header */}
      <motion.div
        className={styles.pageHeader}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.pageTitle}>
          {locale === "fr" ? "Toutes les actualités" : "All News"}
        </h1>
        <div className={styles.titleUnderline}></div>
      </motion.div>

      {/* Filters and Search Section */}
      <div className={styles.controlsContainer}>
        <div className={styles.searchContainer}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder={
              locale === "fr"
                ? "Rechercher des articles..."
                : "Search articles..."
            }
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              className={styles.clearSearch}
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>

        <button
          className={styles.mobileFilterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter />
          <span>{locale === "fr" ? "Filtres" : "Filters"}</span>
        </button>

        <motion.div
          className={`${styles.categoriesContainer} ${
            showFilters ? styles.showMobileFilters : ""
          }`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            className={styles.closeFilters}
            onClick={() => setShowFilters(false)}
          >
            <FaTimes />
          </button>

          <div className={styles.categoriesWrapper}>
            <button
              className={`${styles.categoryButton} ${
                activeCategory === "all" ? styles.active : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              {locale === "fr" ? "Tous" : "All"}
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${
                  activeCategory === category ? styles.active : ""
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Results Info */}
      <div className={styles.resultsInfo}>
        <p>
          {locale === "fr"
            ? `${filteredArticles.length} articles trouvés`
            : `${filteredArticles.length} articles found`}
        </p>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length > 0 ? (
        <>
          <motion.div
            className={styles.articlesGrid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence mode="wait">
              {currentArticles.map((article) => (
                <motion.div
                  key={article.id}
                  className={styles.articleCard}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className={styles.articleLink}
                  >
                    <div className={styles.articleImageWrapper}>
                      {article.image && (
                        <Image
                          src={
                            article.image.formats?.medium?.url ||
                            article.image.url
                          }
                          alt={article.title}
                          width={500}
                          height={300}
                          className={styles.articleImage}
                          priority={indexOfFirstArticle === 0}
                        />
                      )}

                      {article.category && (
                        <span className={styles.categoryTag}>
                          {article.category}
                        </span>
                      )}
                    </div>

                    <div className={styles.articleContent}>
                      <div className={styles.articleMeta}>
                        {article.publishedAt}
                      </div>
                      <h2 className={styles.articleTitle}>{article.title}</h2>
                      <p className={styles.articleDescription}>
                        {article.description}
                      </p>

                      <div className={styles.readMore}>
                        <span>
                          {locale === "fr" ? "Lire la suite" : "Read more"}
                        </span>
                        <FaArrowRightLong className={styles.readMoreIcon} />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    className={`${styles.paginationButton} ${
                      currentPage === pageNum ? styles.activePage : ""
                    }`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          )}
        </>
      ) : (
        <div className={styles.noResults}>
          <h3>
            {locale === "fr" ? "Aucun article trouvé" : "No articles found"}
          </h3>
          <p>
            {locale === "fr"
              ? "Essayez de modifier vos filtres ou votre recherche."
              : "Try changing your filters or search term."}
          </p>
          <button
            className={styles.resetButton}
            onClick={() => {
              setSearchTerm("");
              setActiveCategory("all");
            }}
          >
            {locale === "fr" ? "Réinitialiser les filtres" : "Reset filters"}
          </button>
        </div>
      )}
    </div>
  );
}
