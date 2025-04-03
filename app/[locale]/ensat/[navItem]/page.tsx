import NavItemHero from "@/components/subComponents/navItemHero/NavItemHero";
import { getEnsatItemFromStrapi } from "@/utils/api";

export default async function Page({
  params,
}: {
  params: {
    navItem: string;
    locale: string;
  };
}) {
  console.log("Dynamic route params:", params); // For debugging

  const data = await getEnsatItemFromStrapi();

  return (
    <main>
      <NavItemHero data={data} />
    </main>
  );
}
