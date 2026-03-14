import {
  buildUnitPairSlug,
  getCategoryConfig,
  getCategoryTools,
  getCategoryHighlights as getConfigCategoryHighlights,
  getLaunchToolConfig,
  getNumericPairConfig,
  getRelatedTools,
  getSearchSuggestionEntries,
  getTextTransformConfig,
  getToolLabel,
  getToolPath,
  launchToolRegistry,
  type CategoryKey,
  type NumericCategoryKey,
  type NumericPairPageSchema,
  type StructuredContent,
  type TextualCategoryKey,
  type TextTransformPageSchema,
  type UnitKey,
} from "@/lib/config/conversion-registry";
import { transformText, type TextMode } from "@/lib/conversion/text";
import { convertValue, formatNumber, getUnitFactor, units } from "@/lib/conversion/units";

export type UnitPageDefinition = {
  aliases: string[];
  category: NumericCategoryKey;
  exampleValue: number;
  faq: Array<{
    answer: string;
    question: string;
  }>;
  formulaLabel?: string;
  from: UnitKey;
  kind: "unit";
  longDescription?: StructuredContent;
  metaDescription?: string;
  sampleValues: number[];
  slug: string;
  to: UnitKey;
};

export type TextPageDefinition = {
  actionLabel?: string;
  aliases: string[];
  category: TextualCategoryKey;
  description: string;
  exampleInput: string;
  faq: Array<{
    answer: string;
    question: string;
  }>;
  kind: "text";
  longDescription?: StructuredContent;
  metaDescription?: string;
  mode: TextMode;
  outputStyle?: "panel" | "textarea";
  showCharacterCount?: boolean;
  slug: string;
  secondaryActionLabel?: string;
  title: string;
};

export type LaunchPage = UnitPageDefinition | TextPageDefinition;

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values)];
}

function adaptUnitPage(page: NumericPairPageSchema): UnitPageDefinition {
  return {
    aliases: uniqueStrings(page.aliases),
    category: page.categoryKey,
    exampleValue: page.exampleValue,
    faq: page.faq ? [...page.faq] : [],
    formulaLabel: page.formulaLabel,
    from: page.fromUnitKey,
    kind: "unit",
    longDescription: page.longDescription,
    metaDescription: page.metaDescription,
    sampleValues: [...page.sampleValues],
    slug: page.slug,
    to: page.toUnitKey,
  };
}

function adaptTextPage(page: TextTransformPageSchema): TextPageDefinition {
  return {
    actionLabel: page.actionLabel,
    aliases: uniqueStrings(page.aliases),
    category: page.categoryKey,
    description: page.description,
    exampleInput: page.exampleInput,
    faq: page.faq ? [...page.faq] : [],
    kind: "text",
    longDescription: page.longDescription,
    metaDescription: page.metaDescription,
    mode: page.mode,
    outputStyle: page.outputStyle,
    showCharacterCount: page.showCharacterCount,
    slug: page.slug,
    secondaryActionLabel: page.secondaryActionLabel,
    title: page.title,
  };
}

const rawUnitPages = launchToolRegistry.filter(
  (page): page is NumericPairPageSchema => page.kind === "numeric-pair",
);

const rawTextPages = launchToolRegistry.filter(
  (page): page is TextTransformPageSchema => page.kind === "text-transform",
);

export const unitPages = rawUnitPages.map(adaptUnitPage);
export const textPages = rawTextPages.map(adaptTextPage);
export const launchPages: LaunchPage[] = [...unitPages, ...textPages];
export const launchPageCount = new Set(launchPages.map((page) => page.slug)).size;

const unitPageBySlug = new Map(unitPages.map((page) => [page.slug, page] as const));
const textPageBySlug = new Map(textPages.map((page) => [page.slug, page] as const));

export function getUnitPage(slug: string) {
  return unitPageBySlug.get(slug);
}

export function getTextPage(slug: string) {
  return textPageBySlug.get(slug);
}

export function getLaunchPage(slug: string) {
  return getUnitPage(slug) ?? getTextPage(slug);
}

export function getLaunchPageCount() {
  return launchPageCount;
}

export function getReverseUnitPageSlug(page: UnitPageDefinition) {
  const reverseSlug = buildUnitPairSlug(page.to, page.from);
  return getUnitPage(reverseSlug)?.slug;
}

export function getUnitPageTitle(page: UnitPageDefinition) {
  return `${units[page.from].pluralLabel} to ${units[page.to].pluralLabel.toLowerCase()} converter`;
}

export function getUnitPageSearchIntent(page: UnitPageDefinition) {
  return page.aliases[0] ?? `${units[page.from].shortLabel.toLowerCase()} to ${units[
    page.to
  ].shortLabel.toLowerCase()}`;
}

export function getUnitPageDescription(page: UnitPageDefinition) {
  return `Convert ${units[page.from].pluralLabel.toLowerCase()} to ${units[
    page.to
  ].pluralLabel.toLowerCase()} instantly with a fast ${units[page.from].shortLabel.toLowerCase()} to ${units[
    page.to
  ].shortLabel.toLowerCase()} calculator.`;
}

export function getUnitPageMetaTitle(page: UnitPageDefinition) {
  return `${getUnitPageSearchIntent(page)} converter`;
}

export function getUnitPageMetaDescription(page: UnitPageDefinition) {
  if (page.metaDescription) {
    return page.metaDescription;
  }

  return `Convert ${getUnitPageSearchIntent(page)} instantly with a fast calculator, formula, examples, and reference table.`;
}

export function getUnitPageKeywords(page: UnitPageDefinition) {
  return uniqueStrings([
    ...page.aliases,
    ...units[page.from].aliases,
    ...units[page.to].aliases,
    `${units[page.from].shortLabel.toLowerCase()} to ${units[page.to].shortLabel.toLowerCase()}`,
    `${units[page.from].label.toLowerCase()} to ${units[page.to].label.toLowerCase()}`,
  ]);
}

export function getUnitPageIntro(page: UnitPageDefinition) {
  return getCategoryConfig(page.category).intro;
}

export function getUnitPageExample(page: UnitPageDefinition) {
  const result = convertValue(page.from, page.to, page.exampleValue);

  if (page.formulaLabel) {
    return `${formatNumber(page.exampleValue, 2)} ${units[page.from].shortLabel} = ${formatNumber(
      result,
      2,
    )} ${units[page.to].shortLabel}`;
  }

  return `${formatNumber(page.exampleValue, 2)} ${units[page.from].shortLabel} x ${formatNumber(
    getUnitFactor(page.from, page.to),
    6,
  )} = ${formatNumber(result, 4)} ${units[page.to].shortLabel}`;
}

export function getUnitPageFaqs(page: UnitPageDefinition) {
  return page.faq;
}

export function getUnitTableRows(page: UnitPageDefinition) {
  return page.sampleValues.map((value) => ({
    from: `${formatNumber(value, 4)} ${units[page.from].shortLabel}`,
    to: `${formatNumber(convertValue(page.from, page.to, value), 4)} ${units[page.to].shortLabel}`,
  }));
}

export function getRelatedUnitPages(page: UnitPageDefinition) {
  const rawPage = getNumericPairConfig(page.slug);

  if (!rawPage) {
    return [];
  }

  return getRelatedTools(rawPage)
    .filter((entry): entry is NumericPairPageSchema => entry.kind === "numeric-pair")
    .map((entry) => getUnitPage(entry.slug))
    .filter((entry): entry is UnitPageDefinition => Boolean(entry));
}

export function getCategoryPages(category: CategoryKey) {
  return getCategoryTools(category)
    .map((tool) => getLaunchPage(tool.slug))
    .filter((page): page is LaunchPage => Boolean(page));
}

export function getCategoryHighlights(category: CategoryKey) {
  return getConfigCategoryHighlights(category);
}

export function getTextPageKeywords(page: TextPageDefinition) {
  if (page.category === "encoding") {
    return uniqueStrings([
      ...page.aliases,
      "developer tools",
      "encoding tools",
      `${page.title.toLowerCase()}`,
    ]);
  }

  return uniqueStrings([
    ...page.aliases,
    "text case converter",
    `${page.mode} case`,
    "developer text tools",
  ]);
}

export function getTextPageMetaTitle(page: TextPageDefinition) {
  return page.title;
}

export function getTextPageMetaDescription(page: TextPageDefinition) {
  return page.metaDescription ?? page.description;
}

export function getTextPageOutput(page: TextPageDefinition) {
  return transformText(page.mode, page.exampleInput);
}

export function getTextPageFaqs(page: TextPageDefinition) {
  return page.faq;
}

export function getRelatedTextPages(page: TextPageDefinition) {
  const rawPage = getTextTransformConfig(page.slug);

  if (!rawPage) {
    return [];
  }

  return getRelatedTools(rawPage)
    .filter((entry): entry is TextTransformPageSchema => entry.kind === "text-transform")
    .map((entry) => getTextPage(entry.slug))
    .filter((entry): entry is TextPageDefinition => Boolean(entry));
}

export function getPageHref(page: LaunchPage) {
  return getToolPath(page.slug);
}

export function getLaunchPageLabel(page: LaunchPage) {
  const rawPage = getLaunchToolConfig(page.slug);
  return rawPage ? getToolLabel(rawPage) : page.kind === "text" ? page.title : page.slug;
}

export function getLaunchPageSummary(page: LaunchPage) {
  if (page.kind === "text") {
    return page.description;
  }

  return `Convert ${units[page.from].pluralLabel.toLowerCase()} to ${units[
    page.to
  ].pluralLabel.toLowerCase()} with instant results, examples, and a reference table.`;
}

export function getSearchEntries() {
  return getSearchSuggestionEntries();
}
