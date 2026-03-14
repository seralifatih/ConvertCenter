import type { MetadataRoute } from "next";
import { browseCategories } from "@/lib/content/categories";
import { launchPages } from "@/lib/content/pages";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    ...browseCategories.map((category) => category.route),
    ...launchPages.map((page) => `/${page.slug}`),
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
