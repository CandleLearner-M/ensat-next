import NavItemHero from "@/components/subComponents/navItemHero/NavItemHero";
import { getEnsatItemFromStrapi } from "@/utils/api";
import { notFound } from "next/navigation";

async function getPageData(navItem: string, locale: string) {
  try {
    const items = await getEnsatItemFromStrapi();

    const data = items.find(
      (item) => item.slug === navItem && item.locales[locale]
    );

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: {
    navItem: string;
    locale: string;
  };
}) {
  const { locale, navItem } = await params;
  const data = await getPageData(navItem, locale);

  if (!data) {
    return { title: "Not Found" };
  }

  return {
    title: `${data.locales[locale].title} - ENSAT`,
    description: "ENSAT",
  };
}

export default async function Page({
  params,
}: {
  params: {
    navItem: string;
    locale: string;
  };
}) {
  const { locale, navItem } = await params;
  const data = await getPageData(navItem, locale);

  if (!data) {
    notFound();
  }

  return (
    <main>
      <NavItemHero data={data.locales[locale].components.hero} />
    </main>
  );
}

export async function generateStaticParams() {
  const items = await getEnsatItemFromStrapi();

  return items.flatMap((item) =>
    Object.keys(item.locales).map((locale) => ({
      locale,
      navItem: item.slug,
    }))
  );
}

export const revalidate = 300;