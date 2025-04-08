import Image from "next/image";
import img from "@/assets/bg-links.svg";
import styles from './RelatedTopicsSection.module.scss'

function RelatedTopicsSection() {
  return (
    <section className={styles.relatedTopicsSection}>
      <div className={styles.relatedTopicsSection__background}>
        <Image src={img} alt="Related Topics" width={500} height={300} />
        <div className={styles.overlay}></div>
      </div>


      
    </section>
  );
}

export default RelatedTopicsSection;
