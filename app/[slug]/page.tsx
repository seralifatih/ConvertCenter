import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TextPageTemplate } from "@/components/text-page-template";
import { UnitPageTemplate } from "@/components/unit-page-template";
import {
  getLaunchPage,
  getTextPageKeywords,
  getUnitPageKeywords,
  getTextPageMetaDescription,
  getTextPageMetaTitle,
  getUnitPageMetaDescription,
  getUnitPageMetaTitle,
  launchPages,
} from "@/lib/content/pages";
import { buildMetadata } from "@/lib/seo";

type SlugPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return launchPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLaunchPage(slug);

  if (!page) {
    return {};
  }

  if (page.kind === "text") {
    return buildMetadata({
      title: getTextPageMetaTitle(page),
      description: getTextPageMetaDescription(page),
      path: `/${page.slug}`,
      keywords: getTextPageKeywords(page),
    });
  }

  return buildMetadata({
    title: getUnitPageMetaTitle(page),
    description: getUnitPageMetaDescription(page),
    path: `/${page.slug}`,
    keywords: getUnitPageKeywords(page),
  });
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = getLaunchPage(slug);

  if (!page) {
    notFound();
  }

  if (page.kind === "text") {
    return <TextPageTemplate page={page} />;
  }

  return <UnitPageTemplate page={page} />;
}
