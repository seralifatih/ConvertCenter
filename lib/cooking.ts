export const cookingIngredients = {
  butter: {
    approximationNote: "Approximate baking reference based on US cup and teaspoon measures.",
    densityDescription: "1 cup butter ≈ 227 g and 1 tsp butter ≈ 4.73 g",
    gramsPerCup: 227,
    gramsPerTeaspoon: 4.73,
    label: "Butter",
    slug: "butter",
  },
  flour: {
    approximationNote: "Approximate conversion based on spooned-and-leveled all-purpose flour.",
    densityDescription: "1 cup all-purpose flour ≈ 120 g and 1 tsp flour ≈ 2.6 g",
    gramsPerCup: 120,
    gramsPerTeaspoon: 2.6,
    label: "All-purpose flour",
    slug: "flour",
  },
  honey: {
    approximationNote: "Approximate kitchen reference for pourable honey.",
    densityDescription: "1 cup honey ≈ 340 g and 1 tsp honey ≈ 7.08 g",
    gramsPerCup: 340,
    gramsPerTeaspoon: 7.08,
    label: "Honey",
    slug: "honey",
  },
  milk: {
    approximationNote: "Approximate reference for whole milk using US cup and teaspoon sizes.",
    densityDescription: "1 cup milk ≈ 245 g and 1 tsp milk ≈ 5.1 g",
    gramsPerCup: 245,
    gramsPerTeaspoon: 5.1,
    label: "Milk",
    slug: "milk",
  },
  powderedSugar: {
    approximationNote: "Approximate baking reference for unsifted powdered sugar.",
    densityDescription: "1 cup powdered sugar ≈ 120 g and 1 tsp powdered sugar ≈ 2.5 g",
    gramsPerCup: 120,
    gramsPerTeaspoon: 2.5,
    label: "Powdered sugar",
    slug: "powdered-sugar",
  },
  rice: {
    approximationNote: "Approximate kitchen reference for uncooked white rice.",
    densityDescription: "1 cup uncooked rice ≈ 185 g and 1 tsp rice ≈ 3.85 g",
    gramsPerCup: 185,
    gramsPerTeaspoon: 3.85,
    label: "White rice",
    slug: "rice",
  },
  brownSugar: {
    approximationNote: "Approximate reference for packed brown sugar.",
    densityDescription: "1 cup packed brown sugar ≈ 220 g and 1 tsp brown sugar ≈ 4.58 g",
    gramsPerCup: 220,
    gramsPerTeaspoon: 4.58,
    label: "Brown sugar",
    slug: "brown-sugar",
  },
  sugar: {
    approximationNote: "Approximate baking reference for granulated sugar.",
    densityDescription: "1 cup granulated sugar ≈ 200 g and 1 tsp sugar ≈ 4.2 g",
    gramsPerCup: 200,
    gramsPerTeaspoon: 4.2,
    label: "Granulated sugar",
    slug: "sugar",
  },
  water: {
    approximationNote: "Approximate conversion using standard US kitchen measures.",
    densityDescription: "1 cup water ≈ 236.588 g and 1 tsp water ≈ 4.929 g",
    gramsPerCup: 236.588,
    gramsPerTeaspoon: 4.929,
    label: "Water",
    slug: "water",
  },
} as const;

export type CookingIngredientKey = keyof typeof cookingIngredients;
export type CookingConversionMode =
  | "cupsToGrams"
  | "gramsToCups"
  | "tablespoonsToGrams"
  | "teaspoonsToGrams"
  | "gramsToTeaspoons";

export function cupsToGrams(value: number, ingredient: CookingIngredientKey) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return value * cookingIngredients[ingredient].gramsPerCup;
}

export function gramsToCups(value: number, ingredient: CookingIngredientKey) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return value / cookingIngredients[ingredient].gramsPerCup;
}

export function teaspoonsToGrams(value: number, ingredient: CookingIngredientKey) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return value * cookingIngredients[ingredient].gramsPerTeaspoon;
}

export function tablespoonsToGrams(value: number, ingredient: CookingIngredientKey) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return value * cookingIngredients[ingredient].gramsPerTeaspoon * 3;
}

export function gramsToTeaspoons(value: number, ingredient: CookingIngredientKey) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return value / cookingIngredients[ingredient].gramsPerTeaspoon;
}

export function convertCookingValue(
  value: number,
  ingredient: CookingIngredientKey,
  mode: CookingConversionMode,
) {
  switch (mode) {
    case "cupsToGrams":
      return cupsToGrams(value, ingredient);
    case "gramsToCups":
      return gramsToCups(value, ingredient);
    case "tablespoonsToGrams":
      return tablespoonsToGrams(value, ingredient);
    case "teaspoonsToGrams":
      return teaspoonsToGrams(value, ingredient);
    case "gramsToTeaspoons":
      return gramsToTeaspoons(value, ingredient);
  }
}

export function getCookingModeLabels(mode: CookingConversionMode) {
  switch (mode) {
    case "cupsToGrams":
      return {
        inputLabel: "value in cups",
        outputLabel: "grams output",
        placeholder: "1",
        unitHint: "g",
      };
    case "gramsToCups":
      return {
        inputLabel: "value in grams",
        outputLabel: "cups output",
        placeholder: "200",
        unitHint: "cups",
      };
    case "tablespoonsToGrams":
      return {
        inputLabel: "value in tablespoons",
        outputLabel: "grams output",
        placeholder: "1",
        unitHint: "g",
      };
    case "teaspoonsToGrams":
      return {
        inputLabel: "value in teaspoons",
        outputLabel: "grams output",
        placeholder: "3",
        unitHint: "g",
      };
    case "gramsToTeaspoons":
      return {
        inputLabel: "value in grams",
        outputLabel: "teaspoons output",
        placeholder: "12",
        unitHint: "tsp",
      };
  }
}
