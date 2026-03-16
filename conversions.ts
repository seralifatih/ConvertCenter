import type { CookingIngredient } from "./ingredients";

interface ConvertCookingUnitParams {
    value: number;
    from: "cup" | "gram";
    to: "cup" | "gram";
    ingredient: CookingIngredient;
}

/**
 * Converts a cooking measurement between volume (cups) and weight (grams)
 * for a specific ingredient.
 */
export function convertCookingUnit({ value, from, to, ingredient }: ConvertCookingUnitParams): number {
    if (from === to) {
        return value;
    }

    if (isNaN(value) || !ingredient) {
        return 0;
    }

    if (from === "cup" && to === "gram") {
        return value * ingredient.gramsPerCup;
    }

    if (from === "gram" && to === "cup") {
        if (ingredient.gramsPerCup === 0) return 0; // Avoid division by zero
        return value / ingredient.gramsPerCup;
    }

    throw new Error(`Unsupported cooking conversion from ${from} to ${to}`);
}