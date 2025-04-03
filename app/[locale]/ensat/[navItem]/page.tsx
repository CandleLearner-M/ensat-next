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
  const resolvedParams = await params;
  const locale = resolvedParams.locale;
  const navItem = resolvedParams.navItem;

  const items = await getEnsatItemFromStrapi();

  const data = items.find(
    (item) => item.slug === navItem && item.locales[locale]
  );

  if (!data) {
    notFound();
  }

  return (
    <main>
      <NavItemHero data={data.locales[locale].components.hero} />
    </main>
  );
}
