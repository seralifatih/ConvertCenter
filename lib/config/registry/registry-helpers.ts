import type { TextMode } from "@/lib/conversion/text";

import type {
  FaqEntry,
  NumericCategoryKey,
  NumericPairPageSchema,
  StructuredContent,
  StructuredContentSection,
  TextualCategoryKey,
  TextTransformPageSchema,
  UnitKey,
} from "./conversion-types";
import {
  buildUnitPairSlug,
  getUnitConfig,
  getUnitLabel,
  getUnitSymbol,
} from "./unit-definitions";

export function defineNumericPairPage(
  categoryKey: NumericCategoryKey,
  fromUnitKey: UnitKey,
  toUnitKey: UnitKey,
  exampleValue: number,
  sampleValues: readonly number[],
  options?: {
    aliases?: readonly string[];
    crossLinks?: readonly string[];
    faq?: readonly FaqEntry[];
    featured?: boolean;
    formulaLabel?: string;
    metaDescription?: string;
    popular?: boolean;
    customLongDescription?: StructuredContent;
    customLongDescriptionSections?: readonly StructuredContentSection[];
    relatedSlugs?: readonly string[];
  },
): NumericPairPageSchema {
  const defaultAliases = [
    `${getUnitConfig(fromUnitKey).routeSegment} to ${getUnitConfig(toUnitKey).routeSegment}`,
    `${getUnitSymbol(fromUnitKey).toLowerCase()} to ${getUnitSymbol(toUnitKey).toLowerCase()}`,
    `${getUnitLabel(fromUnitKey).toLowerCase()} to ${getUnitLabel(toUnitKey).toLowerCase()}`,
  ];

  return {
    aliases: options?.aliases ?? defaultAliases,
    categoryKey,
    crossLinks: options?.crossLinks,
    customLongDescription: options?.customLongDescription,
    customLongDescriptionSections: options?.customLongDescriptionSections,
    exampleValue,
    faq: options?.faq,
    featured: options?.featured,
    formulaLabel: options?.formulaLabel,
    fromUnitKey,
    kind: "numeric-pair",
    longDescription: resolveNumericPairLongDescription(
      categoryKey,
      fromUnitKey,
      toUnitKey,
      options?.customLongDescription,
      options?.customLongDescriptionSections,
    ),
    metaDescription: options?.metaDescription,
    popular: options?.popular,
    relatedSlugs: options?.relatedSlugs,
    sampleValues,
    slug: buildUnitPairSlug(fromUnitKey, toUnitKey),
    toUnitKey,
  };
}

export function defineTextTransformPage(
  slug: string,
  mode: TextMode,
  title: string,
  description: string,
  exampleInput: string,
  options?: {
    actionLabel?: string;
    aliases?: readonly string[];
    categoryKey?: TextualCategoryKey;
    crossLinks?: readonly string[];
    faq?: readonly FaqEntry[];
    featured?: boolean;
    longDescription?: StructuredContent;
    metaDescription?: string;
    outputStyle?: "panel" | "textarea";
    popular?: boolean;
    relatedSlugs?: readonly string[];
    secondaryActionLabel?: string;
    showCharacterCount?: boolean;
  },
): TextTransformPageSchema {
  return {
    actionLabel: options?.actionLabel,
    aliases: options?.aliases ?? [slug.replace(/-/g, " "), title.toLowerCase(), `${mode} converter`],
    categoryKey: options?.categoryKey ?? "text",
    crossLinks: options?.crossLinks,
    description,
    exampleInput,
    faq: options?.faq,
    featured: options?.featured,
    kind: "text-transform",
    longDescription: options?.longDescription,
    metaDescription: options?.metaDescription,
    mode,
    outputStyle: options?.outputStyle,
    popular: options?.popular,
    relatedSlugs: options?.relatedSlugs,
    secondaryActionLabel: options?.secondaryActionLabel,
    showCharacterCount: options?.showCharacterCount,
    slug,
    title,
  };
}

export function defineFaq(question: string, answer: string) {
  return { question, answer };
}

export function defineFaqs(...entries: FaqEntry[]) {
  return entries;
}

export function defineContentSection(
  heading: string,
  paragraphs: readonly string[],
  listItems?: readonly string[],
): StructuredContentSection {
  return {
    heading,
    listItems,
    paragraphs,
  };
}

export function defineStructuredContent(
  title: string,
  ...sections: StructuredContentSection[]
): StructuredContent {
  return {
    sections,
    title,
  };
}

function getCategoryContext(categoryKey: NumericCategoryKey) {
  switch (categoryKey) {
    case "weight":
      return {
        context: "shipping, nutrition labels, fitness tracking, and product packaging",
        heading: "When this conversion is useful",
      };
    case "length":
      return {
        context: "travel, home projects, furniture sizing, and engineering or product specs",
        heading: "When this conversion is useful",
      };
    case "volume":
      return {
        context: "cooking, beverage prep, packaging, and liquid storage planning",
        heading: "When this conversion is useful",
      };
    case "temperature":
      return {
        context: "weather, cooking, travel, science, and technical reference work",
        heading: "When this conversion is useful",
      };
    case "data":
      return {
        context: "storage planning, upload limits, backups, and file transfer estimates",
        heading: "When this conversion is useful",
      };
  }
}

export function buildNumericPairLongDescription(
  categoryKey: NumericCategoryKey,
  fromUnitKey: UnitKey,
  toUnitKey: UnitKey,
): StructuredContent {
  const fromUnit = getUnitConfig(fromUnitKey);
  const toUnit = getUnitConfig(toUnitKey);
  const categoryContext = getCategoryContext(categoryKey);
  const exampleOne = 1;
  const exampleFive = 5;
  const exampleTen = 10;

  return defineStructuredContent(
    `About converting ${fromUnit.pluralLabel.toLowerCase()} to ${toUnit.pluralLabel.toLowerCase()}`,
    defineContentSection("Conversion formula", [
      `${fromUnit.pluralLabel} and ${toUnit.pluralLabel.toLowerCase()} are both used to measure the same kind of value, but they belong to different measurement systems or are used in different contexts. This page helps you move between ${fromUnit.label.toLowerCase()} and ${toUnit.label.toLowerCase()} without doing the math by hand. It is useful when you need a fast answer and also want a clear explanation of how the conversion works.`,
      `The ${fromUnit.label.toLowerCase()} to ${toUnit.label.toLowerCase()} conversion on this page uses the same formula shown in the calculator and reference table. You can enter any value, see the result immediately, and check the relationship between the two units before copying the output. For quick checks, it also helps to remember reference points like ${exampleOne} ${fromUnit.symbol} and ${exampleTen} ${fromUnit.symbol}, which are often enough to estimate a rough result mentally before confirming the exact number.`,
    ]),
    defineContentSection(`Common ${fromUnit.routeSegment} to ${toUnit.routeSegment} values`, [
      `A few common conversions make this page easier to use in real situations. For example, ${exampleOne} ${fromUnit.symbol} is a useful baseline, ${exampleFive} ${fromUnit.symbol} is handy for quick comparisons, and ${exampleTen} ${fromUnit.symbol} is often used as a clean reference point when checking larger values. The table on this page gives you a faster way to scan those common numbers without re-entering them each time.`,
    ]),
    defineContentSection(categoryContext.heading, [
      `This conversion often comes up in ${categoryContext.context}. Whether you are comparing measurements from different regions, reading labels, checking specifications, or planning practical tasks, having a quick ${fromUnit.symbol.toLowerCase()} to ${toUnit.symbol.toLowerCase()} reference can save time and reduce mistakes. Because this page is static and focused on a single conversion intent, it is built to give you the formula, worked examples, and quick-reference values in one place.`,
    ]),
  );
}

export function buildLongDescriptionFromSections(
  title: string,
  sections: readonly StructuredContentSection[],
): StructuredContent {
  return defineStructuredContent(title, ...sections);
}

export function resolveNumericPairLongDescription(
  categoryKey: NumericCategoryKey,
  fromUnitKey: UnitKey,
  toUnitKey: UnitKey,
  customLongDescription?: StructuredContent,
  customLongDescriptionSections?: readonly StructuredContentSection[],
): StructuredContent {
  if (customLongDescription) {
    return customLongDescription;
  }

  if (customLongDescriptionSections?.length) {
    return buildLongDescriptionFromSections(
      `About converting ${getUnitLabel(fromUnitKey).toLowerCase()} to ${getUnitLabel(toUnitKey).toLowerCase()}`,
      customLongDescriptionSections,
    );
  }

  return buildNumericPairLongDescription(categoryKey, fromUnitKey, toUnitKey);
}
