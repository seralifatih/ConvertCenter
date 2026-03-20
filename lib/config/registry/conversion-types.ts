import type { TextMode } from "@/lib/conversion/text";

export type NumericCategoryKey =
  | "weight"
  | "length"
  | "volume"
  | "temperature"
  | "wind"
  | "pressure"
  | "rainfall"
  | "data";

export type TextualCategoryKey = "text" | "encoding" | "color" | "dev-data";
export type InteractiveCategoryKey =
  | "generator"
  | "seo"
  | "social"
  | "utility"
  | "science"
  | "weather"
  | "image"
  | "file";
export type LaunchCategoryKey = NumericCategoryKey | TextualCategoryKey;
export type FutureCategoryKey = "dev";
export type CategoryKey = LaunchCategoryKey | InteractiveCategoryKey;
export type ToolCategoryKey = CategoryKey | FutureCategoryKey;

export type UnitKey =
  | "byte"
  | "kg"
  | "lb"
  | "g"
  | "oz"
  | "floz"
  | "tbsp"
  | "tsp"
  | "km"
  | "mile"
  | "yd"
  | "cm"
  | "inch"
  | "m"
  | "ft"
  | "mph"
  | "kmh"
  | "knot"
  | "l"
  | "gal"
  | "ml"
  | "cup"
  | "c"
  | "f"
  | "k"
  | "hpa"
  | "mmhg"
  | "bar"
  | "psi"
  | "rainmm"
  | "raininch"
  | "kb"
  | "mb"
  | "gb"
  | "tb";

export type BaseCategorySchema<K extends CategoryKey, Kind extends string> = {
  aliases: readonly string[];
  curatedPageSlugs?: readonly string[];
  description: string;
  featuredSlug: string;
  featuredStandaloneSlugs?: readonly string[];
  intro: string;
  key: K;
  kind: Kind;
  label: string;
  metaDescription?: string;
  relatedTopics?: readonly string[];
  relatedCategoryKeys: readonly CategoryKey[];
  route: `/${string}`;
  slug: string;
  title: string;
  useCases?: readonly string[];
};

export type FaqEntry = {
  answer: string;
  question: string;
};

export type StructuredContentSection = {
  heading: string;
  listItems?: readonly string[];
  paragraphs: readonly string[];
};

export type StructuredContent = {
  sections: readonly StructuredContentSection[];
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
  crossLinks?: readonly string[];
  customLongDescription?: StructuredContent;
  customLongDescriptionSections?: readonly StructuredContentSection[];
  exampleValue: number;
  faq?: readonly FaqEntry[];
  featured?: boolean;
  formulaLabel?: string;
  fromUnitKey: UnitKey;
  kind: "numeric-pair";
  longDescription?: StructuredContent;
  metaDescription?: string;
  popular?: boolean;
  relatedSlugs?: readonly string[];
  sampleValues: readonly number[];
  slug: string;
  toUnitKey: UnitKey;
};

export type TextTransformPageSchema = {
  actionLabel?: string;
  aliases: readonly string[];
  categoryKey: TextualCategoryKey;
  crossLinks?: readonly string[];
  description: string;
  exampleInput: string;
  faq?: readonly FaqEntry[];
  featured?: boolean;
  kind: "text-transform";
  longDescription?: StructuredContent;
  metaDescription?: string;
  mode: TextMode;
  outputStyle?: "panel" | "textarea";
  popular?: boolean;
  relatedSlugs?: readonly string[];
  secondaryActionLabel?: string;
  showCharacterCount?: boolean;
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

export type TextCategorySchema<K extends TextualCategoryKey = TextualCategoryKey> =
  BaseCategorySchema<K, "text"> & {
    futureTools: readonly DevToolPageSchema[];
    transforms: readonly TextTransformPageSchema[];
  };

export type InteractiveCategorySchema<
  K extends InteractiveCategoryKey = InteractiveCategoryKey,
> = BaseCategorySchema<K, "interactive">;

export type CategorySchema =
  | NumericCategorySchema
  | TextCategorySchema
  | InteractiveCategorySchema;
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
