import NavItemHero from "@/components/subComponents/navItemHero/NavItemHero";
import { getEnsatItemFromStrapi } from "@/utils/api";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    navItem: string;
    locale: string;
  };
}) {

  const items = await getEnsatItemFromStrapi();

  const data = items.find(item => item.slug === params.navItem && item.locales[params.locale]);

  if (!data) {
    notFound();
  }


  return (
    <main>
      <NavItemHero data={data} />
    </main>
  );
}
