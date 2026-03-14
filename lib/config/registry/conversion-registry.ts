import type {
  HomePageConfig,
  LaunchCategoryKey,
  LaunchCategorySchema,
  LaunchToolPageSchema,
  NumericCategorySchema,
} from "./conversion-types";
import {
  buildUnitPairSlug,
  dataUnits,
  getUnitSymbol,
  lengthUnits,
  temperatureUnits,
  volumeUnits,
  weightUnits,
} from "./unit-definitions";
import {
  dataPairPages,
  lengthPairPages,
  temperaturePairPages,
  volumePairPages,
  weightPairPages,
} from "./numeric-pair-pages";
import { plannedDevToolPages, textTransformPages } from "./text-transform-pages";

export * from "./conversion-types";
export * from "./unit-definitions";
export { plannedDevToolPages } from "./text-transform-pages";

export const categoryRegistry: LaunchCategorySchema[] = [
  {
    aliases: ["weight", "mass", "kg", "lbs", "grams", "ounces"],
    baseUnitKey: "kg",
    description: "Convert kilograms, pounds, grams, and ounces with a clean utility-first interface.",
    engine: "linear",
    featuredSlug: weightPairPages[0].slug,
    intro: "Useful for fitness tracking, shipping estimates, nutrition labels, and everyday measurements.",
    key: "weight",
    kind: "numeric",
    label: "weight",
    pairPages: weightPairPages,
    relatedCategoryKeys: ["length", "volume", "data"],
    route: "/weight-converter",
    title: "Weight converter",
    units: weightUnits,
  },
  {
    aliases: ["length", "distance", "cm", "feet", "inches", "km", "miles"],
    baseUnitKey: "m",
    description: "Switch between centimeters, inches, meters, and feet in a single fast calculator.",
    engine: "linear",
    featuredSlug: lengthPairPages[0].slug,
    intro: "Helpful for product specs, room measurements, print layouts, and international sizing.",
    key: "length",
    kind: "numeric",
    label: "length",
    pairPages: lengthPairPages,
    relatedCategoryKeys: ["weight", "volume", "data"],
    route: "/length-converter",
    title: "Length converter",
    units: lengthUnits,
  },
  {
    aliases: ["volume", "liquid", "ml", "oz", "cups", "liters", "gallons"],
    baseUnitKey: "ml",
    description: "Convert milliliters and cups instantly for recipes, product sizes, and packaging work.",
    engine: "linear",
    featuredSlug: volumePairPages[0].slug,
    intro: "Built for kitchen prep, ecommerce listings, and simple liquid measurement lookups.",
    key: "volume",
    kind: "numeric",
    label: "volume",
    pairPages: volumePairPages,
    relatedCategoryKeys: ["weight", "length", "temperature"],
    route: "/volume-converter",
    title: "Volume converter",
    units: volumeUnits,
  },
  {
    aliases: ["temperature", "celsius", "fahrenheit", "kelvin", "weather"],
    baseUnitKey: "c",
    description: "Convert Celsius and Fahrenheit without jumping between cluttered tools.",
    engine: "formula",
    featuredSlug: temperaturePairPages[0].slug,
    intro: "Great for weather, cooking, travel planning, and science-related reference values.",
    key: "temperature",
    kind: "numeric",
    label: "temperature",
    pairPages: temperaturePairPages,
    relatedCategoryKeys: ["volume", "weight", "length"],
    route: "/temperature-converter",
    title: "Temperature converter",
    units: temperatureUnits,
  },
  {
    aliases: ["data", "storage", "kb", "mb", "gb", "tb"],
    baseUnitKey: "mb",
    description: "Check megabytes and gigabytes quickly for storage, upload limits, and file handoffs.",
    engine: "linear",
    featuredSlug: dataPairPages[0].slug,
    intro: "Ideal for developer workflows, cloud storage estimates, and transfer planning.",
    key: "data",
    kind: "numeric",
    label: "data",
    pairPages: dataPairPages,
    relatedCategoryKeys: ["text", "length", "weight"],
    route: "/data-converter",
    title: "Data converter",
    units: dataUnits,
  },
  {
    aliases: ["text", "text case", "uppercase", "developer text"],
    description: "Change text case instantly with utility-focused formatting tools for writers and developers.",
    featuredSlug: textTransformPages[0].slug,
    futureTools: plannedDevToolPages,
    intro: "Turn pasted text into readable headings, sentence case copy, or developer-friendly naming conventions.",
    key: "text",
    kind: "text",
    label: "text",
    relatedCategoryKeys: ["data", "length", "weight"],
    route: "/text-converter",
    title: "Text converter",
    transforms: textTransformPages,
  },
];

const categoryConfigByKey = categoryRegistry.reduce(
  (accumulator, category) => {
    accumulator[category.key] = category;
    return accumulator;
  },
  {} as Record<LaunchCategoryKey, LaunchCategorySchema>,
);

export const launchToolRegistry = categoryRegistry.reduce<LaunchToolPageSchema[]>(
  (accumulator, category) => {
    if (category.kind === "numeric") {
      accumulator.push(...category.pairPages);
    } else {
      accumulator.push(...category.transforms);
    }

    return accumulator;
  },
  [],
);

const toolConfigBySlug = Object.fromEntries(
  launchToolRegistry.map((tool) => [tool.slug, tool]),
) as Record<string, LaunchToolPageSchema>;

export const homepageConfig: HomePageConfig = {
  exampleQueries: ["kg to lbs", "km to miles", "uppercase", "kb to mb"],
  featuredConverter: {
    categoryKey: "weight",
    fromUnitKey: "kg",
    toUnitKey: "lb",
    value: 75,
  },
  filterCategoryKeys: ["weight", "length", "volume", "data", "text"],
  hubCategoryKeys: ["weight", "length", "volume", "temperature", "data", "text"],
  popularToolSlugs: [
    buildUnitPairSlug("kg", "lb"),
    buildUnitPairSlug("cm", "inch"),
    buildUnitPairSlug("km", "mile"),
    buildUnitPairSlug("m", "ft"),
    buildUnitPairSlug("l", "gal"),
    buildUnitPairSlug("mb", "gb"),
    buildUnitPairSlug("kb", "mb"),
    "uppercase-converter",
    "snake-case-converter",
    "title-case-converter",
  ],
};

export function getCategoryConfig(categoryKey: LaunchCategoryKey) {
  return categoryConfigByKey[categoryKey];
}

export function getCategoryAliases(categoryKey: LaunchCategoryKey) {
  return [...getCategoryConfig(categoryKey).aliases];
}

export function getNumericCategoryConfigs(): NumericCategorySchema[] {
  return categoryRegistry.filter(
    (category): category is NumericCategorySchema => category.kind === "numeric",
  );
}

export function getCategoryTools(categoryKey: LaunchCategoryKey) {
  const category = getCategoryConfig(categoryKey);
  return category.kind === "numeric"
    ? [...category.pairPages]
    : [...category.transforms];
}

export function getLaunchToolConfig(slug: string) {
  return toolConfigBySlug[slug];
}

export function getNumericPairConfig(slug: string) {
  const tool = getLaunchToolConfig(slug);
  return tool?.kind === "numeric-pair" ? tool : undefined;
}

export function getTextTransformConfig(slug: string) {
  const tool = getLaunchToolConfig(slug);
  return tool?.kind === "text-transform" ? tool : undefined;
}

export function getToolPath(slug: string) {
  return `/${slug}` as const;
}

export function getToolAliases(tool: LaunchToolPageSchema) {
  return [...tool.aliases];
}

export function getToolLabel(tool: LaunchToolPageSchema) {
  if (tool.kind === "text-transform") {
    return tool.title;
  }

  return `${getUnitSymbol(tool.fromUnitKey).toLowerCase()} to ${getUnitSymbol(
    tool.toUnitKey,
  ).toLowerCase()}`;
}

export function getRelatedToolSlugs(tool: LaunchToolPageSchema) {
  if (tool.relatedSlugs?.length) {
    return [...tool.relatedSlugs];
  }

  const categoryTools = getCategoryTools(tool.categoryKey).filter((entry) => entry.slug !== tool.slug);

  if (tool.kind === "numeric-pair") {
    const reverseSlug = buildUnitPairSlug(tool.toUnitKey, tool.fromUnitKey);
    const reverseTool = categoryTools.find((entry) => entry.slug === reverseSlug);
    const remainingTools = categoryTools.filter((entry) => entry.slug !== reverseSlug);

    return [reverseTool?.slug, ...remainingTools.map((entry) => entry.slug)]
      .filter((slug): slug is string => Boolean(slug))
      .slice(0, 5);
  }

  return categoryTools.map((entry) => entry.slug).slice(0, 5);
}

export function getRelatedTools(tool: LaunchToolPageSchema) {
  return getRelatedToolSlugs(tool)
    .map((slug) => getLaunchToolConfig(slug))
    .filter((entry): entry is LaunchToolPageSchema => Boolean(entry));
}

export function getCategoryHighlights(categoryKey: LaunchCategoryKey) {
  const category = getCategoryConfig(categoryKey);

  return category.relatedCategoryKeys.map((key) => getCategoryConfig(key)).filter(Boolean);
}

export function getSearchSuggestionEntries() {
  const toolEntries = launchToolRegistry.map((tool) => ({
    category: tool.categoryKey,
    entryType: "page" as const,
    href: getToolPath(tool.slug),
    keywords: getToolAliases(tool),
    title: getToolLabel(tool),
  }));

  const categoryEntries = categoryRegistry.map((category) => ({
    category: category.key,
    entryType: "category" as const,
    href: category.route,
    keywords: [
      ...category.aliases,
      ...(category.kind === "text"
        ? category.futureTools.flatMap((tool) => tool.aliases)
        : []),
      category.description,
      category.title,
    ],
    title: category.title,
  }));

  return [...toolEntries, ...categoryEntries];
}

export function getHomepagePopularTools() {
  return homepageConfig.popularToolSlugs
    .map((slug) => getLaunchToolConfig(slug))
    .filter((tool): tool is LaunchToolPageSchema => Boolean(tool));
}

export function getHomepageFilterCategories() {
  return homepageConfig.filterCategoryKeys.map((key) => getCategoryConfig(key));
}

export function getHomepageHubCategories() {
  return homepageConfig.hubCategoryKeys.map((key) => getCategoryConfig(key));
}
