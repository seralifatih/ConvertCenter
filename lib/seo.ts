import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export type FaqSchemaItem = {
  a?: string;
  answer?: string;
  q?: string;
  question?: string;
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  imagePath,
}: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${path}`;
  const imageUrl = imagePath ? `${siteConfig.url}${imagePath}` : undefined;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630, alt: title }] : undefined,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export function makeBreadcrumbSchema(
  items: Array<{
    name: string;
    path: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  };
}

export function makeFaqSchema(
  entries: readonly FaqSchemaItem[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.q ?? entry.question ?? "",
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a ?? entry.answer ?? "",
      },
    })),
  };
}

export function makeFaqSchemaIfPresent(
  entries: readonly FaqSchemaItem[],
) {
  return entries.length ? makeFaqSchema(entries) : null;
}

export function makeSoftwareApplicationSchema({
  name,
  description,
  path,
  applicationCategory = "UtilitiesApplication",
}: {
  name: string;
  description: string;
  path: string;
  applicationCategory?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory,
    description,
    name,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
    url: `${siteConfig.url}${path}`,
  };
}
