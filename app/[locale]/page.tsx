import Communty from "@/components/Home/Community/Communty";
import OverView from "@/components/Home/overView/overView";
import RelatedTopicsSection from "@/components/Home/relatedTopicsPage/RelatedTopicsSection";
import Hero from "@/components/layout/Hero/Hero";
import Test from "@/components/Test/Test";

export default function Home() {

  return (
    <main className="">
      <Hero />
      <OverView />
      <Communty />
      <Test />
      <RelatedTopicsSection />
    </main>
  );
}
