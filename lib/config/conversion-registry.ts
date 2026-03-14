import type { TextMode } from "@/lib/conversion/text";

export type NumericCategoryKey =
  | "weight"
  | "length"
  | "volume"
  | "temperature"
  | "data";

export type LaunchCategoryKey = NumericCategoryKey | "text";
export type FutureCategoryKey = "dev";
export type CategoryKey = LaunchCategoryKey;
export type ToolCategoryKey = LaunchCategoryKey | FutureCategoryKey;

export type UnitKey =
  | "kg"
  | "lb"
  | "g"
  | "oz"
  | "km"
  | "mile"
  | "cm"
  | "inch"
  | "m"
  | "ft"
  | "l"
  | "gal"
  | "ml"
  | "cup"
  | "c"
  | "f"
  | "kb"
  | "mb"
  | "gb"
  | "tb";

type BaseCategorySchema<K extends ToolCategoryKey, Kind extends string> = {
  aliases: readonly string[];
  description: string;
  featuredSlug: string;
  intro: string;
  key: K;
  kind: Kind;
  label: string;
  relatedCategoryKeys: readonly LaunchCategoryKey[];
  route: `/${string}`;
  title: string;
};

export type LinearUnitSchema = {
  aliases: readonly string[];
  factorToBase: number;
  key: UnitKey;
  label: string;
  pluralLabel: string;
  routeSegment: string;
  symbol: string;
  type: "linear";
};

export type FormulaUnitSchema = {
  aliases: readonly string[];
  fromBase: (value: number) => number;
  key: UnitKey;
  label: string;
  pluralLabel: string;
  routeSegment: string;
  symbol: string;
  toBase: (value: number) => number;
  type: "formula";
};

export type NumericUnitSchema = LinearUnitSchema | FormulaUnitSchema;

export type NumericPairPageSchema = {
  aliases: readonly string[];
  categoryKey: NumericCategoryKey;
  exampleValue: number;
  featured?: boolean;
  formulaLabel?: string;
  fromUnitKey: UnitKey;
  kind: "numeric-pair";
  popular?: boolean;
  relatedSlugs?: readonly string[];
  sampleValues: readonly number[];
  slug: string;
  toUnitKey: UnitKey;
};

export type TextTransformPageSchema = {
  aliases: readonly string[];
  categoryKey: "text";
  description: string;
  exampleInput: string;
  featured?: boolean;
  kind: "text-transform";
  mode: TextMode;
  popular?: boolean;
  relatedSlugs?: readonly string[];
  slug: string;
  title: string;
};

export type DevToolPageSchema = {
  aliases: readonly string[];
  categoryKey: FutureCategoryKey;
  description: string;
  enabled: boolean;
  kind: "dev-tool";
  slug: string;
  title: string;
};

export type NumericCategorySchema<K extends NumericCategoryKey = NumericCategoryKey> =
  BaseCategorySchema<K, "numeric"> & {
    baseUnitKey: UnitKey;
    engine: "linear" | "formula";
    pairPages: readonly NumericPairPageSchema[];
    units: readonly NumericUnitSchema[];
  };

export type TextCategorySchema = BaseCategorySchema<"text", "text"> & {
  futureTools: readonly DevToolPageSchema[];
  transforms: readonly TextTransformPageSchema[];
};

export type LaunchCategorySchema = NumericCategorySchema | TextCategorySchema;
export type LaunchToolPageSchema = NumericPairPageSchema | TextTransformPageSchema;

export type HomePageConfig = {
  exampleQueries: readonly string[];
  featuredConverter: {
    categoryKey: NumericCategoryKey;
    fromUnitKey: UnitKey;
    toUnitKey: UnitKey;
    value: number;
  };
  hubCategoryKeys: readonly LaunchCategoryKey[];
  popularToolSlugs: readonly string[];
  filterCategoryKeys: readonly LaunchCategoryKey[];
};

function defineLinearUnit(
  key: UnitKey,
  label: string,
  pluralLabel: string,
  symbol: string,
  routeSegment: string,
  factorToBase: number,
  aliases: readonly string[],
): LinearUnitSchema {
  return {
    aliases,
    factorToBase,
    key,
    label,
    pluralLabel,
    routeSegment,
    symbol,
    type: "linear",
  };
}

function defineFormulaUnit(
  key: UnitKey,
  label: string,
  pluralLabel: string,
  symbol: string,
  routeSegment: string,
  toBase: (value: number) => number,
  fromBase: (value: number) => number,
  aliases: readonly string[],
): FormulaUnitSchema {
  return {
    aliases,
    fromBase,
    key,
    label,
    pluralLabel,
    routeSegment,
    symbol,
    toBase,
    type: "formula",
  };
}

const weightUnits = [
  defineLinearUnit("kg", "Kilogram", "Kilograms", "kg", "kg", 1, [
    "kg",
    "kilogram",
    "kilograms",
    "kilo",
  ]),
  defineLinearUnit("lb", "Pound", "Pounds", "lb", "lbs", 0.45359237, [
    "lb",
    "lbs",
    "pound",
    "pounds",
  ]),
  defineLinearUnit("g", "Gram", "Grams", "g", "grams", 0.001, ["g", "gram", "grams"]),
  defineLinearUnit("oz", "Ounce", "Ounces", "oz", "ounces", 0.028349523125, [
    "oz",
    "ounce",
    "ounces",
  ]),
] as const;

const lengthUnits = [
  defineLinearUnit("km", "Kilometer", "Kilometers", "km", "km", 1000, [
    "km",
    "kilometer",
    "kilometers",
    "kilometre",
    "kilometres",
  ]),
  defineLinearUnit("cm", "Centimeter", "Centimeters", "cm", "cm", 0.01, [
    "cm",
    "centimeter",
    "centimeters",
  ]),
  defineLinearUnit("inch", "Inch", "Inches", "in", "inches", 0.0254, [
    "in",
    "inch",
    "inches",
  ]),
  defineLinearUnit("m", "Meter", "Meters", "m", "meters", 1, [
    "m",
    "meter",
    "meters",
    "metre",
    "metres",
  ]),
  defineLinearUnit("ft", "Foot", "Feet", "ft", "feet", 0.3048, [
    "ft",
    "foot",
    "feet",
  ]),
  defineLinearUnit("mile", "Mile", "Miles", "mi", "miles", 1609.344, [
    "mi",
    "mile",
    "miles",
  ]),
] as const;

const volumeUnits = [
  defineLinearUnit("l", "Liter", "Liters", "L", "liters", 1000, [
    "l",
    "liter",
    "liters",
    "litre",
    "litres",
  ]),
  defineLinearUnit("ml", "Milliliter", "Milliliters", "ml", "ml", 1, [
    "ml",
    "milliliter",
    "milliliters",
    "millilitre",
    "millilitres",
  ]),
  defineLinearUnit("gal", "Gallon", "Gallons", "gal", "gallons", 3785.411784, [
    "gal",
    "gallon",
    "gallons",
  ]),
  defineLinearUnit("cup", "Cup", "Cups", "cup", "cups", 236.5882365, [
    "cup",
    "cups",
  ]),
] as const;

const temperatureUnits = [
  defineFormulaUnit(
    "c",
    "Celsius",
    "Degrees Celsius",
    "\u00b0C",
    "celsius",
    (value) => value,
    (value) => value,
    ["c", "celsius", "centigrade"],
  ),
  defineFormulaUnit(
    "f",
    "Fahrenheit",
    "Degrees Fahrenheit",
    "\u00b0F",
    "fahrenheit",
    (value) => ((value - 32) * 5) / 9,
    (value) => (value * 9) / 5 + 32,
    ["f", "fahrenheit"],
  ),
] as const;

const dataUnits = [
  defineLinearUnit("kb", "Kilobyte", "Kilobytes", "KB", "kb", 1 / 1024, [
    "kb",
    "kilobyte",
    "kilobytes",
  ]),
  defineLinearUnit("mb", "Megabyte", "Megabytes", "MB", "mb", 1, [
    "mb",
    "megabyte",
    "megabytes",
  ]),
  defineLinearUnit("gb", "Gigabyte", "Gigabytes", "GB", "gb", 1024, [
    "gb",
    "gigabyte",
    "gigabytes",
  ]),
  defineLinearUnit("tb", "Terabyte", "Terabytes", "TB", "tb", 1024 * 1024, [
    "tb",
    "terabyte",
    "terabytes",
  ]),
] as const;

const numericUnitRegistry = [
  ...weightUnits,
  ...lengthUnits,
  ...volumeUnits,
  ...temperatureUnits,
  ...dataUnits,
] as const;

const unitConfigByKey = Object.fromEntries(
  numericUnitRegistry.map((unit) => [unit.key, unit]),
) as Record<UnitKey, NumericUnitSchema>;

export function getUnitConfig(unitKey: UnitKey) {
  return unitConfigByKey[unitKey];
}

export function getUnitLabel(unitKey: UnitKey) {
  return getUnitConfig(unitKey).label;
}

export function getUnitPluralLabel(unitKey: UnitKey) {
  return getUnitConfig(unitKey).pluralLabel;
}

export function getUnitSymbol(unitKey: UnitKey) {
  return getUnitConfig(unitKey).symbol;
}

export function getUnitAliases(unitKey: UnitKey) {
  return [...getUnitConfig(unitKey).aliases];
}

export function buildUnitPairSlug(fromUnitKey: UnitKey, toUnitKey: UnitKey) {
  return `${getUnitConfig(fromUnitKey).routeSegment}-to-${getUnitConfig(toUnitKey).routeSegment}`;
}

function defineNumericPairPage(
  categoryKey: NumericCategoryKey,
  fromUnitKey: UnitKey,
  toUnitKey: UnitKey,
  exampleValue: number,
  sampleValues: readonly number[],
  options?: {
    aliases?: readonly string[];
    featured?: boolean;
    formulaLabel?: string;
    popular?: boolean;
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
    exampleValue,
    featured: options?.featured,
    formulaLabel: options?.formulaLabel,
    fromUnitKey,
    kind: "numeric-pair",
    popular: options?.popular,
    relatedSlugs: options?.relatedSlugs,
    sampleValues,
    slug: buildUnitPairSlug(fromUnitKey, toUnitKey),
    toUnitKey,
  };
}

function defineTextTransformPage(
  slug: string,
  mode: TextMode,
  title: string,
  description: string,
  exampleInput: string,
  options?: {
    aliases?: readonly string[];
    featured?: boolean;
    popular?: boolean;
    relatedSlugs?: readonly string[];
  },
): TextTransformPageSchema {
  return {
    aliases: options?.aliases ?? [slug.replace(/-/g, " "), title.toLowerCase(), `${mode} converter`],
    categoryKey: "text",
    description,
    exampleInput,
    featured: options?.featured,
    kind: "text-transform",
    mode,
    popular: options?.popular,
    relatedSlugs: options?.relatedSlugs,
    slug,
    title,
  };
}

const weightPairPages = [
  defineNumericPairPage("weight", "kg", "lb", 75, [1, 5, 10, 25, 50, 100], {
    featured: true,
    popular: true,
  }),
  defineNumericPairPage("weight", "lb", "kg", 165, [1, 5, 10, 25, 50, 100], {
    popular: true,
  }),
  defineNumericPairPage("weight", "g", "oz", 500, [50, 100, 250, 500, 1000, 2000], {
    popular: true,
  }),
  defineNumericPairPage("weight", "oz", "g", 16, [1, 4, 8, 12, 16, 32]),
] as const;

const lengthPairPages = [
  defineNumericPairPage("length", "cm", "inch", 30, [1, 5, 10, 25, 50, 100], {
    featured: true,
    popular: true,
  }),
  defineNumericPairPage("length", "inch", "cm", 12, [1, 5, 10, 25, 50, 100]),
  defineNumericPairPage("length", "m", "ft", 10, [1, 2, 5, 10, 25, 50], {
    popular: true,
  }),
  defineNumericPairPage("length", "ft", "m", 25, [1, 5, 10, 25, 50, 100]),
  defineNumericPairPage("length", "km", "mile", 5, [1, 5, 10, 21.1, 42.2, 100], {
    popular: true,
  }),
  defineNumericPairPage("length", "mile", "km", 3.1, [1, 3, 5, 10, 26.2, 50]),
] as const;

const volumePairPages = [
  defineNumericPairPage("volume", "ml", "cup", 500, [50, 100, 250, 500, 750, 1000], {
    featured: true,
    popular: true,
  }),
  defineNumericPairPage("volume", "cup", "ml", 2, [0.25, 0.5, 1, 2, 3, 4]),
  defineNumericPairPage("volume", "l", "gal", 3, [0.5, 1, 2, 3, 5, 10], {
    popular: true,
  }),
  defineNumericPairPage("volume", "gal", "l", 1, [0.5, 1, 2, 5, 10, 20]),
] as const;

const temperaturePairPages = [
  defineNumericPairPage("temperature", "c", "f", 24, [0, 10, 20, 30, 40, 100], {
    featured: true,
    formulaLabel: "\u00b0F = (\u00b0C x 9/5) + 32",
  }),
  defineNumericPairPage("temperature", "f", "c", 72, [32, 50, 68, 72, 86, 104], {
    formulaLabel: "\u00b0C = (\u00b0F - 32) x 5/9",
  }),
] as const;

const dataPairPages = [
  defineNumericPairPage("data", "mb", "gb", 5120, [16, 64, 128, 256, 1024, 5120], {
    featured: true,
    popular: true,
  }),
  defineNumericPairPage("data", "gb", "mb", 5, [0.5, 1, 2, 5, 10, 25]),
  defineNumericPairPage("data", "kb", "mb", 2048, [128, 256, 512, 1024, 2048, 4096], {
    popular: true,
  }),
  defineNumericPairPage("data", "tb", "gb", 2, [0.25, 0.5, 1, 2, 5, 10]),
] as const;

const textTransformPages = [
  defineTextTransformPage(
    "uppercase-converter",
    "uppercase",
    "Uppercase converter",
    "Convert pasted text to uppercase instantly and copy the result with one click.",
    "The quick brown fox jumps over the lazy dog.",
    { featured: true, popular: true },
  ),
  defineTextTransformPage(
    "lowercase-converter",
    "lowercase",
    "Lowercase converter",
    "Normalize text to lowercase for copy cleanup, imports, and quick formatting passes.",
    "The QUICK Brown Fox Jumps OVER the Lazy Dog.",
  ),
  defineTextTransformPage(
    "title-case-converter",
    "title",
    "Title case converter",
    "Turn messy text into polished title case for headings, cards, and content blocks.",
    "the quick brown fox jumps over the lazy dog",
    { popular: true },
  ),
  defineTextTransformPage(
    "sentence-case-converter",
    "sentence",
    "Sentence case converter",
    "Convert text into sentence case for readable body copy, emails, and documentation.",
    "tHE QUICK BROWN FOX. jUMPS OVER THE LAZY DOG!",
  ),
  defineTextTransformPage(
    "camelcase-converter",
    "camel",
    "camelCase converter",
    "Generate camelCase names for variables, JSON keys, and frontend code quickly.",
    "The quick brown fox jumps over the lazy dog",
  ),
  defineTextTransformPage(
    "snake-case-converter",
    "snake",
    "snake_case converter",
    "Create snake_case output for backend fields, constants, and migration work.",
    "The quick brown fox jumps over the lazy dog",
    { popular: true },
  ),
  defineTextTransformPage(
    "kebab-case-converter",
    "kebab",
    "kebab-case converter",
    "Convert strings to kebab-case for URLs, slugs, and CSS-friendly identifiers.",
    "The quick brown fox jumps over the lazy dog",
  ),
] as const;

export const plannedDevToolPages = [
  {
    aliases: ["json yaml", "json to yaml", "yaml converter"],
    categoryKey: "dev",
    description: "Convert JSON payloads into readable YAML for config and developer workflows.",
    enabled: false,
    kind: "dev-tool",
    slug: "json-to-yaml",
    title: "JSON to YAML converter",
  },
  {
    aliases: ["base64", "base64 encode", "base64 decode"],
    categoryKey: "dev",
    description: "Encode and decode Base64 strings without leaving the utility shell.",
    enabled: false,
    kind: "dev-tool",
    slug: "base64-tool",
    title: "Base64 tool",
  },
] as const satisfies readonly DevToolPageSchema[];

export const categoryRegistry: LaunchCategorySchema[] = [
  {
    aliases: ["weight", "mass", "kg", "lbs", "grams", "ounces"],
    baseUnitKey: "kg",
    description: "Convert kilograms, pounds, grams, and ounces with a clean utility-first interface.",
    engine: "linear",
    featuredSlug: weightPairPages[0].slug,
    intro: "Useful for shipping, training plans, nutrition labels, and quick everyday comparisons.",
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
    aliases: ["volume", "liquid", "ml", "cups", "liters", "gallons"],
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
    aliases: ["temperature", "celsius", "fahrenheit", "weather"],
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
