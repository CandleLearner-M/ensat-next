import img from "@/assets/bg-links.svg";
import AnimatedLink from "@/components/common/AnimatedLink/AnimatedLink";
import Image from "next/image";
import styles from "./RelatedTopicsSection.module.scss";

function RelatedTopicsSection() {
  return (
    <section className={styles.relatedTopicsSection}>
      <div className={styles.relatedTopicsSection__background}>
        <Image src={img} alt="Related Topics" width={500} height={300} />
        <div className={styles.overlay}></div>
      </div>

      <div className={styles.relatedTopicsSection__header}>
        <p>You May Also Like</p>
        <h2>Related In Focus topics</h2>
      </div>
      <ul className={styles.relatedTopicsSection__list}>
        <li>
          <AnimatedLink href="/director">Director</AnimatedLink>
        </li>
        <li>
          <AnimatedLink href="/director">Our Stuff</AnimatedLink>
        </li>
        <li>
          <AnimatedLink href="/director">News</AnimatedLink>
        </li>
      </ul>
    </section>
  );
}

export default RelatedTopicsSection;
