import Hero from "@/components/Hero/Hero";
import Test from "@/components/Test/Test";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("");

  return (
    <main className="">
      <Hero />
      <Test />
    </main>
  );
}
