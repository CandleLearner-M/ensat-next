"use client";

import Image from "next/image";
import styles from "./Card.module.scss";
import LearnMoreBtn from "@/components/common/LearnMoreBtn";

import img from "@/assets/ensat.jpeg";
import { Link } from "@/i18n/navigation";
import AnimatedLink from "@/components/common/AnimatedLink/AnimatedLink";

function Card({
  imageSrc,
  imageAlt = "Card image",
  title = "Card Title",
  description,
  link = "#",
  linkText = "Learn More",
}: {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  link?: string;
  linkText?: string;
}) {
  return (
    <Link href={link} className={styles.card}>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageSrc || img}
            alt={imageAlt}
            fill
            className={styles.image}
          />
        </div>
      </div>

      <div className={styles.content}>
        <AnimatedLink className={styles.title} href={link} headline={true}>
          {title}{" "}
        </AnimatedLink>

        <p className={styles.description}>
          {description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit corrupti ipsam aspernatur itaque a impedit aliquam, possimus, amet quas numquam beatae odit."}
        </p>

        <div className={styles.buttonWrapper}>
          <LearnMoreBtn href={link}>
            <span>{linkText}</span>
          </LearnMoreBtn>
        </div>
      </div>
    </Link>
  );
}

export default Card;
