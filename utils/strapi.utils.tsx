import { StrapiNavItem, StructuredNavItem } from "@/types/strapi";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337";
const API_URL = `${BASE_URL}/api`;

// NavItem

function transformEnsatData(strapiData: StrapiNavItem[]) {
  return strapiData.map((item) => {
    // Find the hero Component
    const hero = item.navItem.find(
      (component) => component.__component === "nav-item.hero"
    )!;

    // Create the base structure with the primary locale (fr)
    const result: StructuredNavItem = {
      id: item.id,
      documentId: item.documentId,
      locales: {
        [item.locale]: {
          title: item.title,
          headline: hero.headline || "",
          subHeading: hero.subHeading || "",
        },
      },

      media: {
        background: hero.background.url || "",
      },
    };

    item.localizations.forEach((localization) => {
      const locHeroComponent = localization.navItem?.find(
        (comp) => comp.__component === "nav-item.hero"
      );

      result.locales[localization.locale] = {
        title: locHeroComponent?.__component || "",
        headline: locHeroComponent?.headline || "",
        subHeading: locHeroComponent?.subHeading || "",
      };
    });

    return result;
  });
}

export async function getEnsatItemFromStrapi(): Promise<StructuredNavItem[]> {
  const url = `${API_URL}/ensats?populate[navItem][on][nav-item.hero][fields][0]=headline&populate[navItem][on][nav-item.hero][fields][1]=subHeading&populate[navItem][on][nav-item.hero][populate][background]=true&populate[localizations][populate]=*`;
  try {
    const res = await axios.get(url);
    return transformEnsatData(res.data.data);
  } catch (_err) {
    throw _err;
  }
}
