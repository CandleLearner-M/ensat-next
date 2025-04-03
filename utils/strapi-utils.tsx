import {
  StrapiResponse,
  StrapiEnsatItem,
  StrapiComponent,
  StrapiHeroComponent,
  StructuredEnsatPage,
  LocaleComponents,
} from "../types/strapi";

export function transformEnsatData(
  response: StrapiResponse<StrapiEnsatItem>
): StructuredEnsatPage[] {
  return response.data.map((item: StrapiEnsatItem) => {
    const structuredPage: StructuredEnsatPage = {
      id: item.id,
      documentId: item.documentId,
      publishedAt: item.publishedAt,
      locales: {},
    };

    structuredPage.locales[item.locale] = {
      title: item.title,
      components: processComponents(item.pageComponents),
    };

    if (item.localizations && Array.isArray(item.localizations)) {
      item.localizations.forEach((localization) => {
        structuredPage.locales[localization.locale] = {
          title: localization.title,
          components: processComponents(localization.pageComponents),
        };
      });
    }

    return structuredPage;
  });
}

function processComponents(components: StrapiComponent[]): LocaleComponents {
  if (!components || !Array.isArray(components)) {
    return {};
  }

  const result: LocaleComponents = {};

  components.forEach((component) => {
    const componentTypeFull = component.__component;
    const componentType = componentTypeFull.split(".")[1];

    switch (componentType) {
      case "hero":
        const heroComponent = component as StrapiHeroComponent;

        result.hero = {
          id: heroComponent.id,
          headline: heroComponent.headline,
          subHeading: heroComponent.subHeading,
          background: heroComponent.background?.url || "",
        };
        break;

      default:
        console.warn(`Unknown component type: ${componentType}`);
    }
  });

  return result;
}
