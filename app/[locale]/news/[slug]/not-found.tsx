import Link from "next/link";
import { FaNewspaper, FaArrowLeft } from "react-icons/fa";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.content}>
        <FaNewspaper className={styles.icon} />
        <h1 className={styles.title}>Article Not Found</h1>
        <p className={styles.description}>
          The article you're looking for doesn't exist or has been moved.
        </p>
        <div className={styles.links}>
          <Link href="/news" className={styles.linkButton}>
            <FaArrowLeft />
            <span>Back to All News</span>
          </Link>
          <Link href="/" className={styles.linkButton}>
            <span>Go to Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
