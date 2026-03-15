import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPageTemplate } from "@/components/category-page-template";
import { MathToolPageTemplate } from "@/components/math-tool-page-template";
import { TextPageTemplate } from "@/components/text-page-template";
import { UnitPageTemplate } from "@/components/unit-page-template";
import {
  browseCategories,
  getBrowseCategory,
  getBrowseCategoryKeywords,
  getBrowseCategoryMetaDescription,
  getBrowseCategoryMetaTitle,
} from "@/lib/content/categories";
import {
  getMathToolPage,
  mathToolPages,
} from "@/lib/content/math-tools";
import {
  getLaunchPage,
  getTextPageKeywords,
  getTextPageMetaDescription,
  getTextPageMetaTitle,
  getUnitPageKeywords,
  getUnitPageMetaDescription,
  getUnitPageMetaTitle,
  launchPages,
} from "@/lib/content/pages";
import { buildMetadata } from "@/lib/seo";

type DynamicPageProps = {
  params: Promise<{
    category: string;
  }>;
};

export function generateStaticParams() {
  const categoryParams = browseCategories.map((category) => ({
    category: category.route.slice(1),
  }));
  const launchPageParams = launchPages.map((page) => ({ category: page.slug }));
  const mathPageParams = mathToolPages.map((page) => ({ category: page.slug }));

  return [...categoryParams, ...launchPageParams, ...mathPageParams];
}

export async function generateMetadata({ params }: DynamicPageProps): Promise<Metadata> {
  const { category } = await params;
  const browseCategory = getBrowseCategory(`/${category}`);

  if (browseCategory) {
    return buildMetadata({
      title: getBrowseCategoryMetaTitle(browseCategory),
      description: getBrowseCategoryMetaDescription(browseCategory),
      imagePath: `/${category}/opengraph-image`,
      path: browseCategory.route,
      keywords: getBrowseCategoryKeywords(browseCategory),
    });
  }

  const page = getLaunchPage(category);

  if (page) {
    if (page.kind === "text") {
      return buildMetadata({
        title: getTextPageMetaTitle(page),
        description: getTextPageMetaDescription(page),
        imagePath: `/${page.slug}/opengraph-image`,
        path: `/${page.slug}`,
        keywords: getTextPageKeywords(page),
      });
    }

    return buildMetadata({
      title: getUnitPageMetaTitle(page),
      description: getUnitPageMetaDescription(page),
      imagePath: `/${page.slug}/opengraph-image`,
      path: `/${page.slug}`,
      keywords: getUnitPageKeywords(page),
    });
  }

  const mathToolPage = getMathToolPage(category);

  if (mathToolPage) {
    return buildMetadata({
      title: mathToolPage.title,
      description: mathToolPage.metaDescription ?? mathToolPage.description,
      imagePath: `/${mathToolPage.slug}/opengraph-image`,
      path: mathToolPage.route,
      keywords: [...mathToolPage.aliases, ...mathToolPage.keywords],
    });
  }

  return {};
}

export default async function DynamicPage({ params }: DynamicPageProps) {
  const { category } = await params;
  const browseCategory = getBrowseCategory(`/${category}`);

  if (browseCategory) {
    return <CategoryPageTemplate categoryKey={browseCategory.key} />;
  }

  const page = getLaunchPage(category);

  if (page) {
    if (page.kind === "text") {
      return <TextPageTemplate page={page} />;
    }

    return <UnitPageTemplate page={page} />;
  }

  const mathToolPage = getMathToolPage(category);

  if (mathToolPage) {
    return <MathToolPageTemplate page={mathToolPage} />;
  }

  notFound();
}
