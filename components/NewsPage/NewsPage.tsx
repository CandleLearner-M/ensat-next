"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  FaSearch,
  FaFilter,
  FaTimes,
  FaTh,
  FaThList,
  FaRegClock,
  FaRegEye,
  FaCalendarAlt,
  FaTag,
  FaRegStar,
  FaRegBookmark,
} from "react-icons/fa";
import styles from "./NewsPage.module.scss";
import { FaArrowRightLong } from "react-icons/fa6";

// Update interface with new fields
interface ArticleImage {
  url: string;
  formats?: {
    small?: { url: string };
    medium?: { url: string };
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
  readTime: number;
  viewCount?: number;
  tags?: string[];
  year?: number;
  month?: number;
}

// Add new interface for archive data
interface ArchiveData {
  years: number[];
  months: string[];
}

// Update props interface with new parameters
interface NewsPageProps {
  articles: Article[];
  locale: string;
  viewMode?: "grid" | "list" | "compact";
  sortMode?: "latest" | "oldest" | "popular";
  archiveData?: ArchiveData;
  currentYear?: number;
  currentMonth?: number;
  tags?: string[];
  currentTag?: string;
  featuredArticles?: Article[];
}

export default function NewsPage({
  articles,
  locale,
  viewMode = "grid",
  sortMode = "latest",
  archiveData = { years: [], months: [] },
  currentYear,
  currentMonth,
  tags = [],
  currentTag,
  featuredArticles = [],
}: NewsPageProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showArchive, setShowArchive] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);
  const [currentView, setCurrentView] = useState<"grid" | "list" | "compact">(
    viewMode
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedArticles, setBookmarkedArticles] = useState<string[]>([]);

  // Articles per page changes based on view mode
  const getArticlesPerPage = () => {
    switch (currentView) {
      case "compact":
        return 12;
      case "list":
        return 8;
      default:
        return 9;
    }
  };

  // Set up local storage for bookmarks
  useEffect(() => {
    // Load bookmarks from localStorage
    const savedBookmarks = localStorage.getItem("ensat-news-bookmarks");
    if (savedBookmarks) {
      setBookmarkedArticles(JSON.parse(savedBookmarks));
    }
  }, []);

  // Apply filters to articles
  useEffect(() => {
    let results = [...articles];

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        (article) =>
          article.title.toLowerCase().includes(term) ||
          article.description.toLowerCase().includes(term)
      );
    }

    setFilteredArticles(results);
    setCurrentPage(1);
  }, [articles, searchTerm]);

  // Change URL when filters change
  const updateUrlParams = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    router.push(`${pathname}?${newParams.toString()}`);
  };

  // Toggle bookmark status
  const toggleBookmark = (articleId: string | number) => {
    const idStr = String(articleId);

    setBookmarkedArticles((prev) => {
      const isBookmarked = prev.includes(idStr);
      const newBookmarks = isBookmarked
        ? prev.filter((id) => id !== idStr)
        : [...prev, idStr];

      // Save to localStorage
      localStorage.setItem(
        "ensat-news-bookmarks",
        JSON.stringify(newBookmarks)
      );
      return newBookmarks;
    });
  };

  // Calculate pagination
  const articlesPerPage = getArticlesPerPage();
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  // Month name formatter
  const getMonthName = (monthNum: number, locale: string) => {
    const date = new Date(2000, monthNum - 1, 1);
    return date.toLocaleDateString(locale === "fr" ? "fr-FR" : "en-US", {
      month: "long",
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
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

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className={styles.featuredSection}>
          <h2 className={styles.sectionTitle}>
            <FaRegStar className={styles.sectionIcon} />
            {locale === "fr" ? "Articles en vedette" : "Featured Articles"}
          </h2>

          <div className={styles.featuredSlider}>
            {featuredArticles.map((article) => (
              <motion.div
                key={`featured-${article.id}`}
                className={styles.featuredCard}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Link
                  href={`/news/${article.slug}`}
                  className={styles.featuredLink}
                >
                  <div className={styles.featuredImageWrapper}>
                    {article.image && (
                      <Image
                        src={
                          article.image.formats?.medium?.url ||
                          article.image.url
                        }
                        alt={article.title}
                        width={600}
                        height={350}
                        className={styles.featuredImage}
                        priority
                      />
                    )}
                  </div>

                  <div className={styles.featuredContent}>
                    <h3 className={styles.featuredTitle}>{article.title}</h3>

                    <div className={styles.featuredMeta}>
                      <span className={styles.featuredDate}>
                        <FaCalendarAlt /> {article.publishedAt}
                      </span>

                      <span className={styles.featuredReadTime}>
                        <FaRegClock /> {article.readTime}{" "}
                        {locale === "fr" ? "min de lecture" : "min read"}
                      </span>

                      {article.viewCount && (
                        <span className={styles.featuredViews}>
                          <FaRegEye /> {article.viewCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                <button
                  className={`${styles.bookmarkButton} ${
                    bookmarkedArticles.includes(String(article.id))
                      ? styles.bookmarked
                      : ""
                  }`}
                  onClick={() => toggleBookmark(article.id)}
                  aria-label={
                    locale === "fr" ? "Ajouter aux favoris" : "Bookmark article"
                  }
                >
                  <FaRegBookmark />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Top Controls */}
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

        <div className={styles.viewControls}>
          <div className={styles.viewButtons}>
            <button
              className={`${styles.viewButton} ${
                currentView === "grid" ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentView("grid");
                updateUrlParams({ view: "grid" });
              }}
              aria-label="Grid view"
            >
              <FaTh />
            </button>

            <button
              className={`${styles.viewButton} ${
                currentView === "list" ? styles.active : ""
              }`}
              onClick={() => {
                setCurrentView("list");
                updateUrlParams({ view: "list" });
              }}
              aria-label="List view"
            >
              <FaThList />
            </button>
          </div>

          <select
            className={styles.sortSelect}
            value={sortMode}
            onChange={(e) => updateUrlParams({ sort: e.target.value })}
            aria-label={
              locale === "fr" ? "Trier les articles" : "Sort articles"
            }
          >
            <option value="latest">
              {locale === "fr" ? "Plus récents" : "Latest"}
            </option>
            <option value="oldest">
              {locale === "fr" ? "Plus anciens" : "Oldest"}
            </option>
            <option value="popular">
              {locale === "fr" ? "Populaires" : "Popular"}
            </option>
          </select>

          <button
            className={styles.mobileFilterToggle}
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter />
            <span>{locale === "fr" ? "Filtres" : "Filters"}</span>
          </button>
        </div>
      </div>

      {/* Sidebar and Content Grid */}
      <div className={styles.mainLayout}>
        {/* Sidebar */}
        <motion.div
          className={`${styles.sidebar} ${
            showFilters ? styles.showMobile : ""
          }`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <button
            className={styles.closeSidebar}
            onClick={() => setShowFilters(false)}
          >
            <FaTimes />
          </button>

          {/* Archives Section */}
          <div className={styles.sidebarSection}>
            <h3
              className={styles.sidebarTitle}
              onClick={() => setShowArchive(!showArchive)}
            >
              <FaCalendarAlt />
              <span>{locale === "fr" ? "Archives" : "Archives"}</span>
            </h3>

            {showArchive && archiveData.years.length > 0 && (
              <div className={styles.archiveList}>
                {archiveData.years
                  .sort((a, b) => b - a)
                  .map((year) => {
                    // Get months for this year
                    const yearMonths = archiveData.months
                      .filter((ym) => ym.startsWith(String(year)))
                      .map((ym) => parseInt(ym.split("-")[1], 10))
                      .sort((a, b) => b - a);

                    return (
                      <div key={year} className={styles.archiveYear}>
                        <button
                          className={`${styles.archiveYearBtn} ${
                            currentYear === year ? styles.active : ""
                          }`}
                          onClick={() =>
                            updateUrlParams({
                              year: String(year),
                              month: undefined,
                              tag: undefined,
                            })
                          }
                        >
                          {year}
                        </button>

                        {currentYear === year && yearMonths.length > 0 && (
                          <div className={styles.archiveMonths}>
                            {yearMonths.map((month) => (
                              <button
                                key={`${year}-${month}`}
                                className={`${styles.archiveMonthBtn} ${
                                  currentMonth === month ? styles.active : ""
                                }`}
                                onClick={() =>
                                  updateUrlParams({
                                    year: String(year),
                                    month: String(month),
                                    tag: undefined,
                                  })
                                }
                              >
                                {getMonthName(month, locale)}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Tags Section */}
          {tags.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3
                className={styles.sidebarTitle}
                onClick={() => setShowTags(!showTags)}
              >
                <FaTag />
                <span>{locale === "fr" ? "Tags" : "Tags"}</span>
              </h3>

              {showTags && (
                <div className={styles.tagCloud}>
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      className={`${styles.tagButton} ${
                        currentTag === tag ? styles.active : ""
                      }`}
                      onClick={() =>
                        updateUrlParams({
                          tag: currentTag === tag ? undefined : tag,
                          year: undefined,
                          month: undefined,
                        })
                      }
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Bookmarks Section */}
          {bookmarkedArticles.length > 0 && (
            <div className={styles.sidebarSection}>
              <h3 className={styles.sidebarTitle}>
                <FaRegBookmark />
                <span>{locale === "fr" ? "Mes favoris" : "My Bookmarks"}</span>
              </h3>

              <div className={styles.bookmarkList}>
                {articles
                  .filter((article) =>
                    bookmarkedArticles.includes(String(article.id))
                  )
                  .slice(0, 3)
                  .map((article) => (
                    <Link
                      key={`bookmark-${article.id}`}
                      href={`/news/${article.slug}`}
                      className={styles.bookmarkItem}
                    >
                      {article.title}
                    </Link>
                  ))}

                {bookmarkedArticles.length > 3 && (
                  <span className={styles.moreBookmarks}>
                    +{bookmarkedArticles.length - 3}{" "}
                    {locale === "fr" ? "plus" : "more"}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Current Filters */}
          {(currentYear || currentMonth || currentTag || searchTerm) && (
            <div className={styles.activeFilters}>
              <h4>{locale === "fr" ? "Filtres actifs" : "Active Filters"}</h4>

              <div className={styles.filterTags}>
                {currentYear && (
                  <span className={styles.filterTag}>
                    {currentYear}
                    <button
                      onClick={() =>
                        updateUrlParams({
                          year: undefined,
                          month: undefined,
                        })
                      }
                      aria-label="Remove year filter"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}

                {currentMonth && (
                  <span className={styles.filterTag}>
                    {getMonthName(currentMonth, locale)}
                    <button
                      onClick={() => updateUrlParams({ month: undefined })}
                      aria-label="Remove month filter"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}

                {currentTag && (
                  <span className={styles.filterTag}>
                    {currentTag}
                    <button
                      onClick={() => updateUrlParams({ tag: undefined })}
                      aria-label="Remove tag filter"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}

                {searchTerm && (
                  <span className={styles.filterTag}>
                    "{searchTerm}"
                    <button
                      onClick={() => setSearchTerm("")}
                      aria-label="Remove search filter"
                    >
                      <FaTimes />
                    </button>
                  </span>
                )}
              </div>

              <button
                className={styles.clearAllFilters}
                onClick={() => {
                  updateUrlParams({
                    year: undefined,
                    month: undefined,
                    tag: undefined,
                  });
                  setSearchTerm("");
                }}
              >
                {locale === "fr" ? "Effacer tout" : "Clear all"}
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Section */}
        <div className={styles.articlesSection}>
          {/* Results Info */}
          <div className={styles.resultsInfo}>
            <p>
              {locale === "fr"
                ? `${filteredArticles.length} articles trouvés`
                : `${filteredArticles.length} articles found`}
            </p>
          </div>

          {/* Articles Grid/List */}
          {filteredArticles.length > 0 ? (
            <>
              <motion.div
                className={`${styles.articlesContainer} ${styles[currentView]}`}
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
                            />
                          )}

                          {article.tags && article.tags[0] && (
                            <span className={styles.categoryTag}>
                              {article.tags[0]}
                            </span>
                          )}
                        </div>

                        <div className={styles.articleContent}>
                          <div className={styles.articleMeta}>
                            <span>{article.publishedAt}</span>

                            <div className={styles.articleStats}>
                              <span className={styles.readTime}>
                                <FaRegClock /> {article.readTime} min
                              </span>

                              {article.viewCount && (
                                <span className={styles.viewCount}>
                                  <FaRegEye /> {article.viewCount}
                                </span>
                              )}
                            </div>
                          </div>

                          <h2 className={styles.articleTitle}>
                            {article.title}
                          </h2>

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

                      <button
                        className={`${styles.bookmarkButton} ${
                          bookmarkedArticles.includes(String(article.id))
                            ? styles.bookmarked
                            : ""
                        }`}
                        onClick={() => toggleBookmark(article.id)}
                        aria-label={
                          locale === "fr"
                            ? "Ajouter aux favoris"
                            : "Bookmark article"
                        }
                      >
                        <FaRegBookmark />
                      </button>
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
                  updateUrlParams({
                    year: undefined,
                    month: undefined,
                    tag: undefined,
                  });
                  setSearchTerm("");
                }}
              >
                {locale === "fr"
                  ? "Réinitialiser les filtres"
                  : "Reset filters"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
