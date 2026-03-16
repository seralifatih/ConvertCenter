import {
    cookingConversionSeeds,
    cookingUnitCategories,
} from "@/lib/content/cooking-conversions";

// --- TYPE DEFINITIONS (Assumed to exist and be extended) ---

export type FaqEntry = {
    question: string;
    answer: string;
};

export type Example = {
    expression: string;
    result: string;
};

export type Ingredient = {
    id: string;
    name: string;
    gramsPerCup: number;
};

export type NumericWidgetConfig =
    | {
        kind: "numeric-pair";
        fromUnit: string;
        toUnit: string;
        category: "weight" | "volume" | "length"; // etc.
    }
    | {
        kind: "cooking-density";
        fromUnit: "cup" | "gram";
        toUnit: "cup" | "gram";
        ingredients: Ingredient[];
    };

export type NumericPageSeed = {
    slug: string;
    title: string;
    description: string;
    metaDescription?: string;
    relatedSlugs: readonly string[];
    widget: NumericWidgetConfig;
    examples: readonly Example[];
    faq: readonly FaqEntry[];
};

export type NumericPageDefinition = NumericPageSeed & {
    route: `/${string}`;
};

export type Unit = {
    id: string;
    name: string;
    pluralName: string;
    abbreviation: string;
};

export type UnitDefinition = Unit & {
    toBase: number;
};

export type UnitCategory = {
    id: string;
    baseUnit: string;
    units: Record<string, UnitDefinition>;
};

export type NumericCategory = {
    id: string;
    name: string;
    slug: string;
    description: string;
    pages: NumericPageDefinition[];
};

// --- REGISTRY ---

function buildPage(seed: NumericPageSeed): NumericPageDefinition {
    return {
        ...seed,
        route: `/${seed.slug}`,
    };
}

const cookingCategory: NumericCategory = {
    id: "cooking",
    name: "Cooking Conversions",
    slug: "cooking-conversions",
    description:
        "Quickly convert between common cooking units for volume and weight, including ingredient-specific conversions like cups to grams.",
    pages: cookingConversionSeeds.map(buildPage),
};

// Assume other categories like 'weight', 'length' are defined elsewhere and merged.
const allCategories: NumericCategory[] = [
    cookingCategory,
    // ...other categories
];

export const numericCategoryRegistry = new Map(
    allCategories.map((cat) => [cat.slug, cat])
);

export const unitRegistry = new Map(
    Object.entries(cookingUnitCategories).map(([id, category]) => [id, category])
);