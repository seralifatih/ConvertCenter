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
import {
  getInteractiveToolSearchEntries,
  interactiveToolPages,
  type InteractiveToolPageDefinition,
} from "@/lib/content/interactive-tools";
import { standaloneToolPages } from "@/lib/content/standalone-pages";
import { getMathSearchEntries, mathToolPages } from "@/lib/content/math-tools";
import { convertValue, formatNumber, getUnitFactor, units } from "@/lib/conversion/units";
import type { SearchEntry } from "@/lib/search";

export type UnitPageDefinition = {
  aliases: string[];
  category: NumericCategoryKey;
  crossLinks?: string[];
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
  crossLinks?: string[];
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
export type SiteToolPage = LaunchPage | InteractiveToolPageDefinition;

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values)];
}

const caseStyleModes = new Set<TextMode>([
  "uppercase",
  "lowercase",
  "title",
  "sentence",
  "camel",
  "snake",
  "kebab",
]);

function isCookingVolumePage(page: UnitPageDefinition) {
  const cookingUnits: UnitKey[] = ["cup", "ml", "tbsp", "tsp"];
  return page.category === "volume" && cookingUnits.includes(page.from) && cookingUnits.includes(page.to);
}

function usesFluidOunce(page: Pick<UnitPageDefinition, "from" | "to">) {
  return page.from === "floz" || page.to === "floz";
}

const practicalSampleValuesByUnit: Partial<Record<UnitKey, readonly number[]>> = {
  bar: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 80, 100, 120, 150, 200, 250, 300, 500],
  byte: [1, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648, 4294967296],
  c: [-40, -20, -10, -5, 0, 5, 10, 15, 20, 24, 25, 30, 32, 35, 37, 40, 50, 60, 70, 80, 90, 100, 120, 150, 180, 200, 250, 300, 500, 1000],
  cm: [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 250, 300, 500],
  cup: [0.125, 0.25, 0.3333, 0.5, 0.6667, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 100, 128, 160, 256],
  f: [-40, -20, 0, 10, 20, 32, 40, 50, 60, 68, 72, 75, 80, 86, 90, 100, 104, 120, 150, 180, 200, 212, 250, 300, 350, 400, 450, 500, 750, 1000],
  floz: [0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 256, 384, 512],
  ft: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500, 750, 1000],
  g: [1, 5, 10, 25, 50, 75, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000, 1250, 1500, 1750, 2000, 2500, 3000, 4000, 5000, 7500, 10000, 15000, 20000, 25000, 50000],
  gal: [0.25, 0.5, 0.75, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000],
  gb: [0.25, 0.5, 1, 2, 4, 5, 8, 10, 12, 16, 20, 25, 32, 40, 50, 64, 80, 100, 128, 160, 200, 256, 320, 500, 512, 750, 1000, 1024, 2048, 4096],
  hpa: [800, 850, 900, 920, 940, 950, 960, 970, 980, 990, 1000, 1005, 1010, 1013.25, 1015, 1020, 1025, 1030, 1040, 1050, 1060, 1070, 1080, 1090, 1100, 1120, 1140, 1160, 1180, 1200],
  inch: [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 24, 30, 36, 40, 48, 60, 72, 80, 84, 96, 100, 120, 144, 180, 200, 240, 300],
  k: [0, 50, 100, 150, 200, 250, 273.15, 280, 290, 295.15, 300, 310.15, 320, 330, 350, 373.15, 400, 450, 500, 550, 600, 650, 700, 750, 800, 900, 1000, 1200, 1500, 2000],
  kb: [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536, 131072, 262144, 524288, 1048576, 2097152, 4194304, 8388608, 16777216, 33554432, 67108864, 134217728, 268435456, 536870912],
  kg: [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 175, 200, 250, 300, 400, 500, 1000],
  km: [0.1, 0.25, 0.5, 1, 2, 3, 5, 8, 10, 15, 20, 25, 30, 40, 42.2, 50, 60, 75, 80, 90, 100, 120, 150, 160, 200, 250, 300, 400, 500, 1000],
  kmh: [1, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 400, 500, 600, 800, 1000],
  knot: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 120, 140, 160, 180, 200, 220, 250, 300, 350, 400, 450, 500, 750, 1000],
  l: [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 500, 1000],
  lb: [1, 2, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 120, 150, 165, 175, 180, 200, 220, 250, 275, 300, 350, 400, 450, 500, 600, 750, 1000],
  m: [0.1, 0.25, 0.5, 1, 1.5, 2, 2.5, 3, 5, 7.5, 10, 12.5, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500, 750, 1000],
  mb: [0.25, 0.5, 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 5120, 6144, 8192, 10240, 12288, 16384, 20480, 25600, 32768, 51200, 65536, 102400, 204800, 512000, 1048576],
  mile: [0.1, 0.25, 0.5, 1, 2, 3, 5, 6.2, 10, 13.1, 15, 20, 26.2, 30, 40, 50, 60, 75, 80, 90, 100, 120, 150, 160, 200, 250, 300, 400, 500, 1000],
  ml: [1, 5, 10, 15, 30, 50, 60, 75, 100, 125, 150, 180, 200, 240, 250, 300, 350, 375, 500, 600, 750, 800, 1000, 1250, 1500, 1750, 2000, 3000, 4000, 5000],
  mmhg: [600, 620, 640, 660, 680, 700, 720, 740, 750, 760, 765, 770, 780, 790, 800, 820, 840, 860, 880, 900, 920, 940, 960, 980, 1000, 1020, 1040, 1060, 1080, 1100],
  mph: [1, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 100, 110, 120, 130, 140, 150, 160, 180, 200, 250, 300, 500],
  oz: [0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 256, 320, 512, 1000],
  psi: [1, 2, 5, 10, 14.5, 20, 25, 30, 35, 40, 50, 60, 70, 80, 90, 100, 120, 150, 175, 200, 250, 300, 400, 500, 600, 750, 1000, 1500, 2000, 3000],
  raininch: [0.01, 0.05, 0.1, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 200],
  rainmm: [0.1, 0.5, 1, 2, 5, 10, 15, 20, 25, 25.4, 30, 40, 50, 60, 75, 100, 125, 150, 200, 250, 300, 400, 500, 600, 750, 1000, 1250, 1500, 2000, 3000],
  tbsp: [0.25, 0.5, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 30, 32, 36, 48, 60, 64, 72, 96, 128, 144, 192, 256, 384, 512, 768, 1024],
  tb: [0.25, 0.5, 1, 2, 4, 5, 8, 10, 12, 16, 20, 25, 32, 40, 50, 64, 80, 100, 128, 160, 200, 256, 320, 500, 512, 750, 1000, 2048, 4096, 8192],
  tsp: [0.25, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 30, 32, 36, 48, 60, 64, 72, 96, 128, 144, 192, 256, 384, 512, 768],
  yd: [1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500, 600, 750, 1000, 1250, 1500, 1760, 2000, 5000],
};

function fallbackSampleValues(values: readonly number[], exampleValue: number) {
  const seeds = [...values, exampleValue]
    .filter((value) => Number.isFinite(value))
    .sort((left, right) => left - right);
  const result = new Set<number>(seeds);

  let multiplier = 2;

  while (result.size < 30 && seeds.length) {
    seeds.forEach((value) => {
      if (result.size < 30) {
        result.add(Number((value * multiplier).toFixed(4)));
      }
    });
    multiplier += 1;
  }

  return [...result].sort((left, right) => left - right).slice(0, 30);
}

function getPracticalSampleValues(page: NumericPairPageSchema) {
  const presetValues = practicalSampleValuesByUnit[page.fromUnitKey];

  if (presetValues?.length === 30) {
    return [...presetValues];
  }

  return fallbackSampleValues(page.sampleValues, page.exampleValue);
}

function adaptUnitPage(page: NumericPairPageSchema): UnitPageDefinition {
  return {
    aliases: uniqueStrings(page.aliases),
    category: page.categoryKey,
    crossLinks: page.crossLinks ? [...page.crossLinks] : undefined,
    exampleValue: page.exampleValue,
    faq: page.faq ? [...page.faq] : [],
    formulaLabel: page.formulaLabel,
    from: page.fromUnitKey,
    kind: "unit",
    longDescription: page.longDescription,
    metaDescription: page.metaDescription,
    sampleValues: getPracticalSampleValues(page),
    slug: page.slug,
    to: page.toUnitKey,
  };
}

function adaptTextPage(page: TextTransformPageSchema): TextPageDefinition {
  return {
    actionLabel: page.actionLabel,
    aliases: uniqueStrings(page.aliases),
    category: page.categoryKey,
    crossLinks: page.crossLinks ? [...page.crossLinks] : undefined,
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
export const interactivePages = [...interactiveToolPages];
export const launchPageCount = new Set([
  ...launchPages.map((page) => page.slug),
  ...interactivePages.map((page) => page.slug),
  ...mathToolPages.map((page) => page.slug),
  ...standaloneToolPages.map((page) => page.slug),
]).size;

const unitPageBySlug = new Map(unitPages.map((page) => [page.slug, page] as const));
const textPageBySlug = new Map(textPages.map((page) => [page.slug, page] as const));
const interactivePageBySlug = new Map(
  interactivePages.map((page) => [page.slug, page] as const),
);

export function getUnitPage(slug: string) {
  return unitPageBySlug.get(slug);
}

export function getTextPage(slug: string) {
  return textPageBySlug.get(slug);
}

export function getLaunchPage(slug: string) {
  return getUnitPage(slug) ?? getTextPage(slug);
}

export function getInteractivePage(slug: string) {
  return interactivePageBySlug.get(slug);
}

export function getSiteToolPage(slug: string) {
  return getLaunchPage(slug) ?? getInteractivePage(slug);
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
  if (usesFluidOunce(page)) {
    return `${units[page.from].pluralLabel.toLowerCase()} to ${units[page.to].pluralLabel.toLowerCase()}`;
  }

  return page.aliases[0] ?? `${units[page.from].shortLabel.toLowerCase()} to ${units[
    page.to
  ].shortLabel.toLowerCase()}`;
}

export function getUnitPageDescription(page: UnitPageDefinition) {
  if (isCookingVolumePage(page)) {
    return `Convert ${units[page.from].pluralLabel.toLowerCase()} to ${units[
      page.to
    ].pluralLabel.toLowerCase()} for recipes, baking, sauces, and everyday kitchen measurements.`;
  }

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
  const launchCategoryPages = getCategoryTools(category)
    .map((tool) => getLaunchPage(tool.slug))
    .filter((page): page is LaunchPage => Boolean(page));
  const categoryInteractivePages = interactivePages.filter((page) => page.categoryKey === category);
  const curatedPages = (getCategoryConfig(category).curatedPageSlugs ?? [])
    .map((slug) => getSiteToolPage(slug))
    .filter((page): page is SiteToolPage => Boolean(page));

  const pageBySlug = new Map<string, SiteToolPage>();

  [...launchCategoryPages, ...categoryInteractivePages, ...curatedPages].forEach((page) => {
    pageBySlug.set(page.slug, page);
  });

  return [...pageBySlug.values()];
}

export function getCategoryStandalonePages(category: CategoryKey) {
  return standaloneToolPages.filter((page) => page.hubCategoryKey === category);
}

function uniqueLinkTargets(
  entries: Array<{
    href: `/${string}`;
    label: string;
  }>,
) {
  const seenHrefs = new Set<string>();

  return entries.filter((entry) => {
    if (seenHrefs.has(entry.href)) {
      return false;
    }

    seenHrefs.add(entry.href);
    return true;
  });
}

function resolveCrossLinkEntry(slug: string) {
  const page = getSiteToolPage(slug);

  if (page) {
    return {
      href: getPageHref(page),
      label:
        page.kind === "text"
          ? page.title
          : page.kind === "unit"
            ? getUnitPageTitle(page)
            : page.title,
    };
  }

  const standalonePage = standaloneToolPages.find((page) => page.slug === slug);

  if (standalonePage) {
    return {
      href: standalonePage.route,
      label: standalonePage.title,
    };
  }

  return null;
}

export function getCrossLinkEntries(page: LaunchPage) {
  const entries = (page.crossLinks ?? [])
    .map((slug) => resolveCrossLinkEntry(slug))
    .filter(
      (
        entry,
      ): entry is {
        href: `/${string}`;
        label: string;
      } => Boolean(entry),
    );

  return uniqueLinkTargets(entries);
}

export function getRelatedPageLinks(relatedSlugs: readonly string[]) {
  return uniqueLinkTargets(
    relatedSlugs
      .map((slug) => resolveCrossLinkEntry(slug))
      .filter(
        (
          entry,
        ): entry is {
          href: `/${string}`;
          label: string;
        } => Boolean(entry),
      ),
  );
}

export function getCategoryHighlights(category: CategoryKey) {
  return getConfigCategoryHighlights(category);
}

export function getTextPageKeywords(page: TextPageDefinition) {
  if (page.category === "encoding" || page.category === "dev-data") {
    return uniqueStrings([
      ...page.aliases,
      "developer tools",
      page.category === "encoding" ? "encoding tools" : "data conversion tools",
      `${page.title.toLowerCase()}`,
    ]);
  }

  if (caseStyleModes.has(page.mode)) {
    return uniqueStrings([
      ...page.aliases,
      "text case converter",
      `${page.mode} case`,
      "developer text tools",
      page.title.toLowerCase(),
    ]);
  }

  return uniqueStrings([
    ...page.aliases,
    "text cleaning tools",
    "text utilities",
    "online text tool",
    page.title.toLowerCase(),
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

export function getPageHref(page: SiteToolPage) {
  return page.kind === "unit" || page.kind === "text" ? getToolPath(page.slug) : page.route;
}

export function getLaunchPageLabel(page: SiteToolPage) {
  if (page.kind === "interactive-tool") {
    return page.title;
  }

  const rawPage = getLaunchToolConfig(page.slug);
  return rawPage ? getToolLabel(rawPage) : page.kind === "text" ? page.title : page.slug;
}

export function getHomepagePopularLabel(page: SiteToolPage) {
  if (page.kind === "interactive-tool") {
    return page.title;
  }

  if (page.kind === "text") {
    return page.title;
  }

  return page.aliases[0] ?? getLaunchPageLabel(page);
}

export function getUnitPageRelatedLabel(page: UnitPageDefinition) {
  if (usesFluidOunce(page)) {
    return `${units[page.from].pluralLabel.toLowerCase()} to ${units[page.to].pluralLabel.toLowerCase()}`;
  }

  return `${units[page.from].shortLabel.toLowerCase()} to ${units[page.to].shortLabel.toLowerCase()}`;
}

export function getLaunchPageSummary(page: SiteToolPage) {
  if (page.kind === "interactive-tool") {
    return page.description;
  }

  if (page.kind === "text") {
    return page.description;
  }

  return `Convert ${units[page.from].pluralLabel.toLowerCase()} to ${units[
    page.to
  ].pluralLabel.toLowerCase()} with instant results, examples, and a reference table.`;
}

export function getSearchEntries() {
  const registryEntries = getSearchSuggestionEntries();
  const mathEntries = getMathSearchEntries();
  const interactiveEntries = getInteractiveToolSearchEntries();
  const standaloneEntries: SearchEntry[] = standaloneToolPages.map((page) => ({
    category: page.category,
    entryType: "page",
    href: page.route,
    keywords: page.keywords,
    title: page.title,
  }));

  return [...registryEntries, ...mathEntries, ...interactiveEntries, ...standaloneEntries];
}
