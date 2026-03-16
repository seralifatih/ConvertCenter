import type {
    NumericPageSeed,
    Unit,
    UnitCategory,
} from "@/lib/config/conversion-registry";
import { cookingIngredients } from "@/lib/cooking/ingredients";

export const cookingVolumeUnits: Record<string, Unit> = {
    milliliter: {
        id: "milliliter",
        name: "Milliliter",
        pluralName: "Milliliters",
        abbreviation: "ml",
    },
    teaspoon: {
        id: "teaspoon",
        name: "Teaspoon",
        pluralName: "Teaspoons",
        abbreviation: "tsp",
    },
    tablespoon: {
        id: "tablespoon",
        name: "Tablespoon",
        pluralName: "Tablespoons",
        abbreviation: "tbsp",
    },
    cup: { id: "cup", name: "Cup", pluralName: "Cups", abbreviation: "cup" },
};

export const cookingWeightUnits: Record<string, Unit> = {
    gram: { id: "gram", name: "Gram", pluralName: "Grams", abbreviation: "g" },
    ounce: {
        id: "ounce",
        name: "Ounce",
        pluralName: "Ounces",
        abbreviation: "oz",
    },
};

export const cookingUnitCategories: Record<string, UnitCategory> = {
    volume: {
        id: "volume",
        baseUnit: "milliliter",
        units: {
            milliliter: { ...cookingVolumeUnits.milliliter, toBase: 1 },
            teaspoon: { ...cookingVolumeUnits.teaspoon, toBase: 4.92892 },
            tablespoon: { ...cookingVolumeUnits.tablespoon, toBase: 14.7868 },
            cup: { ...cookingVolumeUnits.cup, toBase: 236.588 },
        },
    },
    weight: {
        id: "weight",
        baseUnit: "gram",
        units: {
            gram: { ...cookingWeightUnits.gram, toBase: 1 },
            ounce: { ...cookingWeightUnits.ounce, toBase: 28.3495 },
        },
    },
};

const ingredients = Object.values(cookingIngredients);

export const cookingConversionSeeds: readonly NumericPageSeed[] = [
    {
        slug: "cups-to-grams",
        title: "Cups to Grams Converter",
        description:
            "Convert cups to grams for common cooking ingredients like flour, sugar, and butter.",
        metaDescription:
            "Instantly convert cups to grams for various ingredients with our cooking density converter. Supports water, flour, sugar, butter, and more.",
        relatedSlugs: ["grams-to-cups", "oz-to-grams", "tbsp-to-ml"],
        widget: {
            kind: "cooking-density",
            fromUnit: "cup",
            toUnit: "gram",
            ingredients,
        },
        examples: [
            { expression: "1 cup of flour", result: "120 g" },
            { expression: "0.5 cups of butter", result: "113.5 g" },
            { expression: "2 cups of water", result: "473.2 g" },
        ],
        faq: [
            {
                question: "Why does 1 cup of flour weigh less than 1 cup of sugar?",
                answer:
                    "The weight of a cup depends on the ingredient's density. Flour is less dense than sugar, so a cup of it weighs less.",
            },
        ],
    },
    {
        slug: "grams-to-cups",
        title: "Grams to Cups Converter",
        description:
            "Convert grams to cups for common cooking ingredients like flour, sugar, and butter.",
        metaDescription:
            "Instantly convert grams to cups for various ingredients with our cooking density converter. Supports water, flour, sugar, butter, and more.",
        relatedSlugs: ["cups-to-grams", "oz-to-grams", "ml-to-tsp"],
        widget: {
            kind: "cooking-density",
            fromUnit: "gram",
            toUnit: "cup",
            ingredients,
        },
        examples: [
            { expression: "240g of flour", result: "2 cups" },
            { expression: "100g of sugar", result: "0.5 cups" },
            { expression: "50g of butter", result: "0.22 cups" },
        ],
        faq: [
            {
                question: "How many cups is 300g of flour?",
                answer:
                    "300g of all-purpose flour is approximately 2.5 cups, as 1 cup of flour is about 120g.",
            },
        ],
    },
    {
        slug: "tbsp-to-ml",
        title: "Tablespoons to Milliliters (tbsp to ml)",
        description: "Convert tablespoons to milliliters for recipe accuracy.",
        metaDescription:
            "A fast and accurate converter for tablespoons (tbsp) to milliliters (ml). Includes a quick-reference conversion table.",
        relatedSlugs: ["ml-to-tsp", "cups-to-grams"],
        widget: {
            kind: "numeric-pair",
            category: "volume",
            fromUnit: "tablespoon",
            toUnit: "milliliter",
        },
        examples: [
            { expression: "1 tbsp", result: "14.79 ml" },
            { expression: "4 tbsp", result: "59.15 ml" },
        ],
        faq: [
            {
                question: "How many ml in a tablespoon?",
                answer:
                    "One US tablespoon is equal to approximately 14.79 milliliters.",
            },
        ],
    },
    {
        slug: "ml-to-tsp",
        title: "Milliliters to Teaspoons (ml to tsp)",
        description: "Convert milliliters to teaspoons for recipe accuracy.",
        metaDescription:
            "A fast and accurate converter for milliliters (ml) to teaspoons (tsp). Includes a quick-reference conversion table.",
        relatedSlugs: ["tbsp-to-ml", "grams-to-cups"],
        widget: {
            kind: "numeric-pair",
            category: "volume",
            fromUnit: "milliliter",
            toUnit: "teaspoon",
        },
        examples: [
            { expression: "5 ml", result: "1.01 tsp" },
            { expression: "15 ml", result: "3.04 tsp" },
        ],
        faq: [
            {
                question: "How many teaspoons in 5ml?",
                answer:
                    "5ml is approximately equal to 1 US teaspoon (1.014 tsp to be exact).",
            },
        ],
    },
    {
        slug: "oz-to-grams",
        title: "Ounces to Grams (oz to g)",
        description: "Convert weight from ounces to grams.",
        metaDescription:
            "A fast and accurate converter for ounces (oz) to grams (g). Includes a quick-reference conversion table for common weights.",
        relatedSlugs: ["grams-to-cups", "cups-to-grams"],
        widget: {
            kind: "numeric-pair",
            category: "weight",
            fromUnit: "ounce",
            toUnit: "gram",
        },
        examples: [
            { expression: "1 oz", result: "28.35 g" },
            { expression: "8 oz", result: "226.8 g" },
        ],
        faq: [
            {
                question: "How many grams are in an ounce?",
                answer: "There are 28.3495 grams in one ounce.",
            },
        ],
    },
];