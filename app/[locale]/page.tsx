import Announcements from "@/components/Home/Announcements/Announcements";
import Communty from "@/components/Home/Community/Communty";
import DirectorsWord from "@/components/Home/Director'sWord/DirectorsWord";
import NewsSection from "@/components/Home/NewsSection/NewsSection";
import OverView from "@/components/Home/overView/overView";
import RelatedTopicsSection from "@/components/Home/relatedTopicsPage/RelatedTopicsSection";
import Hero from "@/components/layout/Hero/Hero";
import { Suspense } from "react";

import styles from "./page.module.scss";

export default function Home({ params }: { params: { locale: string } }) {
  return (
    <main className="">
      <Hero />
      <OverView />
      <Announcements />
      <Communty />

      <DirectorsWord />
      <Suspense
        fallback={<div className={styles.loading}>Loading news...</div>}
      >
        <NewsSection locale={params.locale} />
      </Suspense>
      <RelatedTopicsSection />
    </main>
  );
}
