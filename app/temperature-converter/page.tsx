import type { Metadata } from "next";
import { CategoryPageTemplate } from "@/components/category-page-template";
import {
  getBrowseCategory,
  getBrowseCategoryKeywords,
  getBrowseCategoryMetaDescription,
  getBrowseCategoryMetaTitle,
} from "@/lib/content/categories";
import { buildMetadata } from "@/lib/seo";

const category = getBrowseCategory("temperature");

export const metadata: Metadata = category
  ? buildMetadata({
      title: getBrowseCategoryMetaTitle(category),
      description: getBrowseCategoryMetaDescription(category),
      path: category.route,
      keywords: getBrowseCategoryKeywords(category),
    })
  : {};

export default function TemperatureConverterPage() {
  return <CategoryPageTemplate categoryKey="temperature" />;
}
