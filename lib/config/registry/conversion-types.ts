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
  | "floz"
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
  | "k"
  | "kb"
  | "mb"
  | "gb"
  | "tb";

export type BaseCategorySchema<K extends ToolCategoryKey, Kind extends string> = {
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

export type FaqEntry = {
  answer: string;
  question: string;
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
  faq?: readonly FaqEntry[];
  featured?: boolean;
  formulaLabel?: string;
  fromUnitKey: UnitKey;
  kind: "numeric-pair";
  longDescription?: string;
  metaDescription?: string;
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
  faq?: readonly FaqEntry[];
  featured?: boolean;
  kind: "text-transform";
  metaDescription?: string;
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
