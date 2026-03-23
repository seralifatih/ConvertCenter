import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BestOfPageTemplate } from "@/components/best-of-page-template";
import { CategoryPageTemplate } from "@/components/category-page-template";
import { ComparisonPageTemplate } from "@/components/comparison-page-template";
import { InteractiveToolPageTemplate } from "@/components/interactive-tool-page-template";
import { MathToolPageTemplate } from "@/components/math-tool-page-template";
import { TextPageTemplate } from "@/components/text-page-template";
import { UnitPageTemplate } from "@/components/unit-page-template";
import { bestOfPages, getBestOfPage } from "@/lib/content/best-of-pages";
import {
  browseCategories,
  getBrowseCategory,
  getBrowseCategoryKeywords,
  getBrowseCategoryMetaDescription,
  getBrowseCategoryMetaTitle,
} from "@/lib/content/categories";
import { comparisonPages, getComparisonPage } from "@/lib/content/comparison-pages";
import {
  getMathToolPage,
  mathToolPages,
} from "@/lib/content/math-tools";
import { getInteractiveToolPage, interactiveToolPages } from "@/lib/content/interactive-tools";
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
  const interactivePageParams = interactiveToolPages.map((page) => ({ category: page.slug }));
  const mathPageParams = mathToolPages.map((page) => ({ category: page.slug }));
  const comparisonPageParams = comparisonPages.map((page) => ({ category: page.slug }));
  const bestOfPageParams = bestOfPages.map((page) => ({ category: page.slug }));

  return [
    ...categoryParams,
    ...launchPageParams,
    ...interactivePageParams,
    ...mathPageParams,
    ...comparisonPageParams,
    ...bestOfPageParams,
  ];
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

  const interactiveToolPage = getInteractiveToolPage(category);

  if (interactiveToolPage) {
    return buildMetadata({
      title: interactiveToolPage.title,
      description: interactiveToolPage.metaDescription ?? interactiveToolPage.description,
      imagePath: `/${interactiveToolPage.slug}/opengraph-image`,
      path: interactiveToolPage.route,
      keywords: [...interactiveToolPage.aliases, ...interactiveToolPage.keywords],
    });
  }

  const comparisonPage = getComparisonPage(category);

  if (comparisonPage) {
    return buildMetadata({
      title: comparisonPage.metaTitle,
      description: comparisonPage.metaDescription,
      path: comparisonPage.route,
      keywords: comparisonPage.keywords,
    });
  }

  const bestOfPage = getBestOfPage(category);

  if (bestOfPage) {
    return buildMetadata({
      title: bestOfPage.metaTitle,
      description: bestOfPage.metaDescription,
      path: bestOfPage.route,
      keywords: bestOfPage.keywords,
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

  const interactiveToolPage = getInteractiveToolPage(category);

  if (interactiveToolPage) {
    return <InteractiveToolPageTemplate page={interactiveToolPage} />;
  }

  const comparisonPage = getComparisonPage(category);

  if (comparisonPage) {
    return <ComparisonPageTemplate page={comparisonPage} />;
  }

  const bestOfPage = getBestOfPage(category);

  if (bestOfPage) {
    return <BestOfPageTemplate page={bestOfPage} />;
  }

  notFound();
}
