import {
  categoryRegistry,
  getCategoryConfig,
  homepageConfig,
  type CategoryKey,
} from "@/lib/config/conversion-registry";

export type BrowseCategory = {
  key: CategoryKey;
  label: string;
  route: `/${string}`;
  slug: string;
  title: string;
  description: string;
  intro: string;
  featuredSlug: string;
  metaDescription?: string;
  relatedTopics?: readonly string[];
  useCases?: readonly string[];
};

export const browseCategories: BrowseCategory[] = categoryRegistry.map((category) => ({
  description: category.description,
  featuredSlug: category.featuredSlug,
  intro: category.intro,
  key: category.key,
  label: category.label,
  metaDescription: category.metaDescription,
  relatedTopics: category.relatedTopics,
  route: category.route,
  slug: category.slug,
  title: category.title,
  useCases: category.useCases,
}));

export const homeQuickSearches = homepageConfig.exampleQueries;
export const homePopularSlugs = homepageConfig.popularToolSlugs;

export function getBrowseCategory(routeOrKey: string) {
  if (routeOrKey.startsWith("/")) {
    return browseCategories.find((category) => category.route === routeOrKey);
  }

  return getCategoryConfig(routeOrKey as CategoryKey);
}

export function getBrowseCategoryMetaTitle(category: BrowseCategory) {
  return category.title;
}

export function getBrowseCategoryMetaDescription(category: BrowseCategory) {
  return (
    category.metaDescription ??
    `Browse ${category.label} tools, featured converters, and related links in the ${category.title.toLowerCase()} hub.`
  );
}

export function getBrowseCategoryKeywords(category: BrowseCategory) {
  return [category.title.toLowerCase(), `${category.label} converter`, category.description];
}
