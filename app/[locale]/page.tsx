import Communty from "@/components/Home/Community/Communty";
import DirectorsWord from "@/components/Home/Director'sWord/DirectorsWord";
import OverView from "@/components/Home/overView/overView";
import RelatedTopicsSection from "@/components/Home/relatedTopicsPage/RelatedTopicsSection";
import Hero from "@/components/layout/Hero/Hero";

export default function Home() {

  return (
    <main className="">
      <Hero />
      <OverView />
      <Communty />
      <DirectorsWord />
      <RelatedTopicsSection />
    </main>
  );
}
