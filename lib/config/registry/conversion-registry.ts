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
  getUnitPluralLabel,
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

const textCasePages = textTransformPages.filter((page) => page.categoryKey === "text");
const encodingToolPages = textTransformPages.filter((page) => page.categoryKey === "encoding");
const colorToolPages = textTransformPages.filter((page) => page.categoryKey === "color");
const devDataToolPages = textTransformPages.filter((page) => page.categoryKey === "dev-data");
const featuredEncodingPage = encodingToolPages[0];
const featuredColorPage = colorToolPages[0];
const featuredDevDataPage = devDataToolPages[0];

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values)];
}

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
    intro:
      "Weight conversions show up in more everyday tasks than most people expect. You might need kilograms for a workout plan, pounds for a shipping form, grams for a nutrition label, or ounces for a recipe or small product listing. This hub is organized around those practical use cases, with focused converter pages that help you move quickly between metric and imperial units without doing the math manually. It is designed for fast answers, but also for the moments when you want examples, formulas, and a clearer sense of how common weight values compare across systems.",
    key: "weight",
    kind: "numeric",
    label: "weight",
    metaDescription:
      "Weight converter for kg, lbs, grams, and ounces. Use quick tools for fitness tracking, recipes, shipping, and everyday metric-to-imperial conversions.",
    pairPages: weightPairPages,
    relatedCategoryKeys: ["length", "volume", "data"],
    relatedTopics: ["fitness tracking", "shipping weights", "nutrition labels", "product packaging"],
    route: "/weight-converter",
    slug: "weight-converter",
    title: "Weight converter",
    useCases: [
      "Compare kilograms and pounds for training logs, body weight, and gym equipment.",
      "Check grams and ounces for recipes, food packaging, and serving sizes.",
      "Convert package weights before postage, delivery estimates, or ecommerce listings.",
    ],
    units: weightUnits,
  },
  {
    aliases: ["length", "distance", "cm", "feet", "inches", "km", "miles"],
    baseUnitKey: "m",
    description: "Switch between centimeters, inches, meters, and feet in a single fast calculator.",
    engine: "linear",
    featuredSlug: lengthPairPages[0].slug,
    intro:
      "Length conversions become useful the moment measurements cross regions, products, or industries. A listing might show centimeters, a builder may think in feet, and a race route could be described in miles or kilometers depending on the audience. This hub keeps those common length lookups in one place so you can move from a quick conversion to a dedicated page with examples and reference values. It is especially handy for product dimensions, room planning, travel distances, DIY work, and any situation where metric and imperial units keep colliding.",
    key: "length",
    kind: "numeric",
    label: "length",
    metaDescription:
      "Length converter for cm, inches, feet, meters, kilometers, and miles. Useful for sizing products, planning spaces, and comparing travel distances.",
    pairPages: lengthPairPages,
    relatedCategoryKeys: ["weight", "volume", "data"],
    relatedTopics: ["room dimensions", "product sizing", "travel distances", "print layouts"],
    route: "/length-converter",
    slug: "length-converter",
    title: "Length converter",
    useCases: [
      "Switch between centimeters and inches for clothing, product specs, and display sizes.",
      "Convert feet and meters when measuring rooms, furniture, and construction notes.",
      "Translate kilometers and miles for races, road trips, and route planning.",
    ],
    units: lengthUnits,
  },
  {
    aliases: ["volume", "liquid", "ml", "oz", "cups", "liters", "gallons"],
    baseUnitKey: "ml",
    description: "Convert milliliters and cups instantly for recipes, product sizes, and packaging work.",
    engine: "linear",
    featuredSlug: volumePairPages[0].slug,
    intro:
      "Volume conversions are most useful when liquids, recipes, and packaging labels refuse to stick to one unit system. A recipe might use cups, a bottle may show fluid ounces, and product packaging often switches to milliliters or liters. This hub brings those everyday conversions together so you can move quickly from a kitchen measurement to a packaging check or a beverage portion comparison. The goal is not just to provide a calculator, but to make common liquid-size conversions easier to scan, understand, and reuse across cooking, shopping, and product research.",
    key: "volume",
    kind: "numeric",
    label: "volume",
    metaDescription:
      "Volume converter for ml, cups, fluid ounces, liters, and gallons. Compare recipe amounts, drink sizes, and liquid packaging with fast reference tools.",
    pairPages: volumePairPages,
    relatedCategoryKeys: ["weight", "length", "temperature"],
    relatedTopics: ["recipes", "drink portions", "bottle sizes", "liquid packaging"],
    route: "/volume-converter",
    slug: "volume-converter",
    title: "Volume converter",
    useCases: [
      "Convert cups, milliliters, and fluid ounces while cooking or scaling recipes.",
      "Compare drink, bottle, and container sizes across US and metric labels.",
      "Switch between liters and gallons for larger liquid storage and fuel-style checks.",
    ],
    units: volumeUnits,
  },
  {
    aliases: ["temperature", "celsius", "fahrenheit", "kelvin", "weather"],
    baseUnitKey: "c",
    description: "Convert Celsius and Fahrenheit without jumping between cluttered tools.",
    engine: "formula",
    featuredSlug: temperaturePairPages[0].slug,
    intro:
      "Temperature conversions are slightly different from most other unit lookups because they depend on formulas, offsets, and familiar benchmark values rather than a single multiplier. That makes a focused hub especially useful. Whether you are comparing weather forecasts, setting an oven, planning a trip, or checking a science-related value, these pages help translate Celsius, Fahrenheit, and Kelvin with less guesswork. The hub keeps the most common temperature tools in one place, pairing live converters with formula references and example values so the numbers feel easier to interpret in real situations.",
    key: "temperature",
    kind: "numeric",
    label: "temperature",
    metaDescription:
      "Temperature converter for Celsius, Fahrenheit, and Kelvin. Check weather, cooking, and science conversions with formulas, examples, and quick tables.",
    pairPages: temperaturePairPages,
    relatedCategoryKeys: ["volume", "weight", "length"],
    relatedTopics: ["weather", "oven settings", "travel planning", "science and lab work"],
    route: "/temperature-converter",
    slug: "temperature-converter",
    title: "Temperature converter",
    useCases: [
      "Translate weather temperatures between Celsius and Fahrenheit while traveling.",
      "Convert oven settings from international recipes or appliance manuals.",
      "Check Kelvin-based values for school, science, and technical work.",
    ],
    units: temperatureUnits,
  },
  {
    aliases: ["data", "storage", "kb", "mb", "gb", "tb"],
    baseUnitKey: "mb",
    description: "Check megabytes and gigabytes quickly for storage, upload limits, and file handoffs.",
    engine: "linear",
    featuredSlug: dataPairPages[0].slug,
    intro:
      "Data-size conversions become valuable whenever files, storage plans, and transfer limits stop using the same unit. A media export may be listed in megabytes, cloud storage in gigabytes, and hardware capacity in terabytes. This hub is built around those practical translation points, helping you compare file sizes, estimate storage needs, and understand upload or backup limits without doing binary conversion math in your head. It is especially useful for developer workflows, content handoffs, cloud planning, and any situation where a raw KB, MB, GB, or TB number needs a more intuitive context.",
    key: "data",
    kind: "numeric",
    label: "data",
    metaDescription:
      "Data size converter for KB, MB, GB, and TB. Compare file sizes, storage limits, and transfer amounts for uploads, backups, and device capacity planning.",
    pairPages: dataPairPages,
    relatedCategoryKeys: ["text", "encoding", "length"],
    relatedTopics: ["file sizes", "storage planning", "uploads", "cloud backups"],
    route: "/data-converter",
    slug: "data-converter",
    title: "Data converter",
    useCases: [
      "Estimate storage needs by converting between KB, MB, GB, and TB.",
      "Check file handoff, attachment, and upload limits before sharing content.",
      "Compare hosting, backup, and device capacities using a consistent unit base.",
    ],
    units: dataUnits,
  },
  {
    aliases: ["text", "text case", "uppercase", "developer text"],
    description: "Change text case instantly with utility-focused formatting tools for writers and developers.",
    featuredSlug: textCasePages[0].slug,
    futureTools: plannedDevToolPages,
    intro:
      "Text conversion tools solve a different kind of formatting problem than numeric converters: they help reshape pasted words into the style a task expects. That might mean turning rough draft copy into title case, cleaning up interface labels in uppercase, or converting phrases into developer-friendly formats like snake_case and kebab-case. This hub brings those quick text-formatting jobs together for writers, marketers, product teams, and developers who want a fast paste-convert-copy workflow. Each page stays focused on one transformation so the behavior, examples, and use cases are easier to understand at a glance.",
    key: "text",
    kind: "text",
    label: "text",
    metaDescription:
      "Text case converter hub for uppercase, title case, snake_case, kebab-case, and more. Clean up copy, labels, and developer-friendly text in one place.",
    relatedCategoryKeys: ["encoding", "data", "length"],
    relatedTopics: ["headings", "UI labels", "developer identifiers", "content cleanup"],
    route: "/text-converter",
    slug: "text-converter",
    title: "Text converter",
    transforms: textCasePages,
    useCases: [
      "Format headings, labels, and callouts into uppercase, title case, or sentence case.",
      "Convert phrases into snake_case, camelCase, or kebab-case for code and content systems.",
      "Clean up pasted draft text before moving it into a CMS, design file, or product UI.",
    ],
  },
  {
    aliases: [
      "encoding",
      "encoding tools",
      "base64",
      "base64 encode",
      "base64 decode",
      "json formatter",
      "json minifier",
      "json validator",
      "url encode",
      "url decode",
      "url encode",
      "url decode",
      "json format",
    ],
    description:
      "Developer utilities for encoding, decoding, and formatting data such as Base64, URLs, and JSON.",
    featuredSlug: featuredEncodingPage?.slug ?? "",
    futureTools: plannedDevToolPages,
    intro:
      "A dedicated hub for developer-friendly encoding, decoding, and formatting utilities that will expand beyond the current launch set.",
    key: "encoding",
    kind: "text",
    label: "encoding",
    metaDescription:
      "Encoding and decoding tools for Base64, URLs, and JSON. Format, validate, encode, and decode developer-facing data directly in your browser.",
    relatedCategoryKeys: ["text", "data", "length"],
    route: "/encoding-tools",
    slug: "encoding-tools",
    title: "Encoding & Decoding Tools",
    transforms: encodingToolPages,
  },
  {
    aliases: [
      "color",
      "color tools",
      "hex",
      "rgb",
      "hsl",
      "hex rgb hsl",
      "designer color tools",
      "frontend color tools",
    ],
    description: "Convert color values between HEX, RGB, and HSL formats.",
    featuredSlug: featuredColorPage?.slug ?? "hex-to-rgb",
    featuredStandaloneSlugs: [
      "hex-to-rgb",
      "rgb-to-hex",
      "hex-to-hsl",
      "hsl-to-hex",
      "color-picker",
    ],
    futureTools: [],
    intro:
      "Color tools become useful the moment a visual choice needs to turn into production-ready values. Designers often start with a picked shade in a mockup, while frontend work may need HEX for CSS variables, RGB for graphics APIs, or HSL for more intuitive hue and lightness adjustments. This hub keeps those day-to-day conversions together in one lightweight place so you can move from a swatch or channel value to a copy-ready output without interrupting your workflow. It is built for UI work, design systems, prototypes, and handoff moments where speed matters, but clarity matters too. Instead of opening a full design app just to translate a color, you can jump straight to the format you need and keep working.",
    key: "color",
    kind: "text",
    label: "color",
    metaDescription:
      "Color tools for HEX, RGB, HSL, and live color picking. Useful for CSS work, design systems, UI handoff, and frontend styling workflows.",
    relatedCategoryKeys: ["text", "encoding"],
    relatedTopics: ["design systems", "CSS tokens", "UI handoff", "frontend styling"],
    route: "/color-tools",
    slug: "color-tools",
    title: "Color Conversion Tools",
    transforms: colorToolPages,
    useCases: [
      "Convert color values between design files, browser tools, and CSS code.",
      "Check HEX and RGB formats while working on themes, tokens, and UI states.",
      "Translate colors quickly during design handoff and frontend implementation.",
    ],
  },
  {
    aliases: [
      "developer tools",
      "developer utilities",
      "data conversion tools",
      "unix timestamp converter",
      "date to unix",
      "unix to date",
      "time zone converter",
      "markdown to html",
      "html to markdown",
      "json to yaml",
      "yaml to json",
      "seconds to milliseconds",
      "milliseconds to seconds",
      "programming tools",
    ],
    description:
      "Tools for converting data formats, units used in programming, and developer utilities.",
    featuredSlug: featuredDevDataPage?.slug ?? "",
    featuredStandaloneSlugs: [
      "unix-timestamp-converter",
      "date-to-unix",
      "unix-to-date",
      "time-zone-converter",
    ],
    futureTools: plannedDevToolPages,
    intro:
      "Developer workflows often involve small but repetitive conversion tasks that do not fit neatly into a general unit converter. You might need to turn a date into a Unix timestamp for an API, check a timestamp returned by logs, or compare time values across zones while debugging scheduling issues. This hub groups those practical developer and data utilities into one place so you can move faster between raw values and readable output. It is designed for frontend work, backend debugging, data handling, and quick programming tasks where a focused browser tool is often faster than opening a terminal or writing one-off code.",
    key: "dev-data",
    kind: "text",
    label: "dev-data",
    metaDescription:
      "Developer and data conversion tools for Unix timestamps, time zones, and related programming utilities.",
    relatedCategoryKeys: ["encoding", "data", "text"],
    relatedTopics: ["API debugging", "timestamps", "time zones", "developer workflows"],
    route: "/developer-tools",
    slug: "developer-tools",
    title: "Developer & Data Conversion Tools",
    transforms: devDataToolPages,
    useCases: [
      "Convert Unix timestamps while testing APIs, logs, and webhook payloads.",
      "Translate local time values between time zones for scheduling, releases, and debugging.",
      "Handle common developer-side date and data checks without leaving the browser.",
    ],
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
  exampleQueries: [
    "kg to lbs",
    "cm to inches",
    "celsius to fahrenheit",
    "cups to grams",
    "mb to gb",
    "percentage calculator",
  ],
  featuredConverter: {
    categoryKey: "weight",
    fromUnitKey: "kg",
    toUnitKey: "lb",
    value: 75,
  },
  filterCategoryKeys: ["weight", "length", "volume", "data", "text"],
  hubCategoryKeys: [
    "weight",
    "length",
    "volume",
    "temperature",
    "data",
    "text",
    "encoding",
    "color",
    "dev-data",
  ],
  popularToolSlugs: [
    buildUnitPairSlug("kg", "lb"),
    buildUnitPairSlug("cm", "inch"),
    buildUnitPairSlug("km", "mile"),
    buildUnitPairSlug("m", "ft"),
    buildUnitPairSlug("l", "gal"),
    buildUnitPairSlug("tbsp", "ml"),
    buildUnitPairSlug("mb", "gb"),
    buildUnitPairSlug("kb", "mb"),
    "uppercase-converter",
    "reverse-text",
    "remove-line-breaks",
    "remove-extra-spaces",
    "word-counter",
    "character-counter",
    "slug-generator",
    "snake-case-converter",
    "title-case-converter",
    "markdown-to-html",
    "yaml-to-json",
    "json-to-yaml",
  ],
};

export function getCategoryConfig(categoryKey: LaunchCategoryKey) {
  return categoryConfigByKey[categoryKey];
}

export function getCategoryAliases(categoryKey: LaunchCategoryKey) {
  return uniqueStrings(getCategoryConfig(categoryKey).aliases);
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
  return uniqueStrings(tool.aliases);
}

export function getToolLabel(tool: LaunchToolPageSchema) {
  if (tool.kind === "text-transform") {
    return tool.title;
  }

  if (tool.fromUnitKey === "floz" || tool.toUnitKey === "floz") {
    return `${getUnitPluralLabel(tool.fromUnitKey).toLowerCase()} to ${getUnitPluralLabel(
      tool.toUnitKey,
    ).toLowerCase()}`;
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
    keywords: uniqueStrings(getToolAliases(tool)),
    title: getToolLabel(tool),
  }));

  const categoryEntries = categoryRegistry.map((category) => ({
    category: category.key,
    entryType: "category" as const,
    href: category.route,
    keywords: uniqueStrings([
      ...category.aliases,
      ...(category.kind === "text"
        ? category.futureTools.flatMap((tool) => tool.aliases)
        : []),
      category.description,
      category.title,
    ]),
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
