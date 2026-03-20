import type { FaqEntry, StructuredContent } from "@/lib/config/conversion-registry";
import { defineContentSection, defineFaq, defineFaqs, defineStructuredContent } from "@/lib/config/registry/registry-helpers";
import { cookingIngredients, type CookingConversionMode, type CookingIngredientKey } from "@/lib/cooking";

export type CookingPageDefinition = {
  defaultValue: string;
  description: string;
  faq?: readonly FaqEntry[];
  ingredient: CookingIngredientKey;
  intro: string;
  keywords: string[];
  longDescription?: StructuredContent;
  mode: CookingConversionMode;
  path: `/${string}`;
  slug: string;
  title: string;
  useCases: string[];
};

const cupsToGramsFlourLongDescription = defineStructuredContent(
  "About converting cups to grams for flour",
  defineContentSection("Why flour needs its own conversion", [
    "Flour is one of the easiest baking ingredients to mismeasure because a cup of flour does not have one perfectly universal weight. The result changes depending on whether the flour is spooned into the cup, scooped directly from the bag, or packed down more firmly than intended. That is why this page fixes the assumption to spooned-and-leveled all-purpose flour instead of pretending every cup of flour always weighs the same amount.",
  ]),
  defineContentSection("Kitchen formula and assumption", [
    "This converter uses a practical baking reference of 1 US cup of all-purpose flour being about 120 grams. That means 2 cups of flour comes out around 240 grams, while half a cup is about 60 grams. For home baking, that assumption is widely used because it helps line up cup-based recipes with gram-based kitchen scales without overcomplicating the result.",
  ]),
  defineContentSection("When this page is useful", [
    "This is most helpful when a recipe from the United States lists cups but you prefer to bake by weight, or when you are scaling a recipe and want more consistency than cup measuring usually gives. It is also useful when comparing recipes from different sites, checking ingredient prep before mixing dough, or translating an older family recipe into a scale-friendly format.",
  ]),
);

const cupsToGramsSugarLongDescription = defineStructuredContent(
  "About converting cups to grams for sugar",
  defineContentSection("Sugar is denser than flour, so the numbers change", [
    "A cup of granulated sugar weighs much more than a cup of flour, which is why cooking conversions like cups to grams need to be ingredient-specific. If a page simply says cups to grams without saying what ingredient is being measured, it risks giving a misleading answer. This page avoids that by fixing the ingredient to granulated sugar and using a standard kitchen reference.",
  ]),
  defineContentSection("Kitchen formula and assumption", [
    "The assumption here is 1 US cup of granulated sugar is about 200 grams. That makes half a cup about 100 grams, and 2 cups about 400 grams. It is a practical baking reference for cakes, cookies, syrups, fillings, and dessert prep where sugar quantity has a visible effect on texture and sweetness.",
  ]),
  defineContentSection("When this page is useful", [
    "Use this page when a recipe lists sugar in cups but you want to weigh it, when a gram-based recipe needs to be checked against US measuring cups, or when you are scaling desserts and want a more reliable result than eyeballing volume alone. It is especially useful for baking because sugar measurements affect browning, structure, and moisture retention.",
  ]),
);

const volumeCookingLongDescriptions = {
  cupsToMl: defineStructuredContent(
    "About converting cups to milliliters",
    defineContentSection("Why cooks search this so often", [
      "Cups are deeply familiar in US recipes, while milliliters are standard on measuring jugs, bottles, and many international ingredient labels. That means cups to ml is one of the most practical kitchen conversions: it helps bridge an American recipe and a metric measuring tool without slowing down prep.",
    ]),
    defineContentSection("Cooking formula", [
      "For US kitchen measurements, 1 cup is about 236.588 milliliters. In practice, many cooks round that to 240 ml for quick estimates, but the more precise figure is useful when scaling baking recipes, comparing liquid ingredients, or checking packaging amounts against a recipe requirement.",
    ]),
    defineContentSection("Where it helps in the kitchen", [
      "This page is useful for soups, sauces, baking liquids, drink recipes, and product labels that mix cup-based instructions with metric packaging. If a recipe says 2 cups of milk, broth, or water, a metric cook can quickly see the approximate milliliter amount and keep moving.",
    ]),
  ),
  tbspToMl: defineStructuredContent(
    "About converting tablespoons to milliliters",
    defineContentSection("Small liquid measurements need quick kitchen math", [
      "Tablespoons show up constantly in recipes for oils, sauces, extracts, dressings, and other small liquid ingredients. Milliliters are more common on kitchen tools, syrups, bottles, and metric recipes. That makes tablespoons to ml a very common kitchen lookup, especially when you are following a recipe from another region or working with a measuring jug instead of spoons.",
    ]),
    defineContentSection("Cooking formula", [
      "This page uses the standard US tablespoon relationship: 1 tablespoon is about 14.7868 milliliters. Many cooks round it to 15 ml for everyday use, which is usually fine for quick prep. The exact figure is still helpful when you want more precise scaling for sauces, batters, or drinks.",
    ]),
    defineContentSection("Where it helps in recipes", [
      "It is especially useful for marinades, salad dressings, baking extracts, and cocktail-style measurements where a few tablespoons can matter. Instead of approximating by eye, the conversion gives a clean metric number that works with measuring jugs, squeeze bottles, and recipe notes.",
    ]),
  ),
  tspToMl: defineStructuredContent(
    "About converting teaspoons to milliliters",
    defineContentSection("Teaspoons are tiny, but the conversion matters", [
      "Teaspoons are used for some of the smallest and most sensitive recipe measurements: vanilla extract, baking powder, syrups, flavorings, and seasoning blends. Milliliters are often easier to work with on metric tools, so tsp to ml is a very practical cooking conversion when precision matters more than rough estimation.",
    ]),
    defineContentSection("Cooking formula", [
      "A US teaspoon is about 4.92892 milliliters, which most cooks round to 5 ml in everyday kitchen use. That makes it easy to estimate quickly, but having the exact value is still useful when you are scaling recipes, checking syrup measurements, or converting several teaspoons into a single metric total.",
    ]),
    defineContentSection("Where it helps in baking and prep", [
      "This page is helpful for baking, drink mixing, sauces, and any recipe where a small spoon amount can noticeably affect flavor or texture. It also helps when your measuring spoons are missing or when you are reading a recipe that assumes teaspoons but your tools are marked only in milliliters.",
    ]),
  ),
} as const;

export const ingredientCookingPages: CookingPageDefinition[] = [
  {
    defaultValue: "1",
    description:
      "Convert cups to grams for flour with a baking-friendly reference based on all-purpose flour, kitchen scales, and recipe prep.",
    faq: defineFaqs(
      defineFaq(
        "How many grams are in 1 cup of all-purpose flour?",
        "This page uses an approximate baking reference of 1 US cup of all-purpose flour being about 120 grams.",
      ),
      defineFaq(
        "Why is cups to grams for flour only approximate?",
        "Flour density changes depending on how it is scooped, leveled, or packed, so the gram value is a kitchen estimate rather than a universal constant.",
      ),
      defineFaq(
        "When should I use cups to grams flour conversion?",
        "It is most useful when a recipe lists flour in cups but you want to weigh ingredients for more consistent baking results.",
      ),
    ),
    ingredient: "flour",
    intro:
      "This page assumes spooned-and-leveled all-purpose flour, where 1 US cup is treated as about 120 grams. Because flour compacts differently depending on how it is scooped, the result should be treated as a practical baking estimate rather than an exact lab measurement.",
    keywords: ["cups to grams flour", "cup flour to grams", "flour cup to gram", "baking flour conversion"],
    longDescription: cupsToGramsFlourLongDescription,
    mode: "cupsToGrams",
    path: "/cups-to-grams-flour",
    slug: "cups-to-grams-flour",
    title: "Cups to Grams Flour Converter",
    useCases: [
      "Convert cup-based flour amounts into grams for baking with a kitchen scale.",
      "Translate US flour measurements into metric-friendly recipe prep.",
      "Check approximate flour weights before scaling a recipe up or down.",
    ],
  },
  {
    defaultValue: "240",
    description:
      "Convert grams to cups for all-purpose flour using an ingredient-specific baking reference.",
    ingredient: "flour",
    intro:
      "This flour page uses a standard all-purpose flour assumption of about 120 grams per US cup. Since flour density changes with scooping, packing, and humidity, the conversion is best used as an approximate kitchen guide rather than a precise scientific weight-to-volume ratio.",
    keywords: ["grams to cups flour", "gram flour to cup", "flour grams to cups", "baking flour conversion"],
    mode: "gramsToCups",
    path: "/grams-to-cups-flour",
    slug: "grams-to-cups-flour",
    title: "Grams to Cups Flour Converter",
    useCases: [
      "Translate flour weights into cup measures for US recipes.",
      "Adapt gram-based baking recipes when you do not have a scale nearby.",
      "Estimate flour volume while planning ingredient prep.",
    ],
  },
  {
    defaultValue: "1",
    description:
      "Convert cups to grams for sugar with a granulated-sugar assumption that fits baking, desserts, and ingredient prep.",
    faq: defineFaqs(
      defineFaq(
        "How many grams are in 1 cup of granulated sugar?",
        "This page uses a common kitchen reference of 1 US cup of granulated sugar being about 200 grams.",
      ),
      defineFaq(
        "Why does sugar use a different cups to grams value than flour?",
        "Sugar is denser than flour, so the same cup volume weighs more. That is why ingredient type matters in baking conversions.",
      ),
      defineFaq(
        "When is cups to grams sugar conversion useful?",
        "It helps when dessert recipes list sugar in cups but you want to weigh it for more even baking and easier scaling.",
      ),
    ),
    ingredient: "sugar",
    intro:
      "Granulated sugar weighs differently from flour, butter, or brown sugar, so this page fixes the ingredient to granulated sugar. The reference here assumes 1 US cup of granulated sugar is about 200 grams, which makes the output useful for everyday baking, recipe scaling, and ingredient prep.",
    keywords: ["cups to grams sugar", "cup sugar to grams", "granulated sugar grams", "baking sugar conversion"],
    longDescription: cupsToGramsSugarLongDescription,
    mode: "cupsToGrams",
    path: "/cups-to-grams-sugar",
    slug: "cups-to-grams-sugar",
    title: "Cups to Grams Sugar Converter",
    useCases: [
      "Convert cup-based sugar amounts into grams for baking consistency.",
      "Translate US sugar measurements into metric recipes.",
      "Estimate granulated sugar weight before scaling desserts and syrups.",
    ],
  },
  {
    defaultValue: "200",
    description:
      "Convert grams to cups for granulated sugar using an ingredient-specific baking reference.",
    ingredient: "sugar",
    intro:
      "This sugar page is specific to granulated sugar and uses a standard kitchen assumption of roughly 200 grams per US cup. That makes it useful for baking and dessert prep, while still clearly signaling that weight-to-volume cooking conversions are approximate and ingredient-dependent.",
    keywords: ["grams to cups sugar", "gram sugar to cup", "granulated sugar cups", "baking sugar conversion"],
    mode: "gramsToCups",
    path: "/grams-to-cups-sugar",
    slug: "grams-to-cups-sugar",
    title: "Grams to Cups Sugar Converter",
    useCases: [
      "Turn weighed sugar into cup measures for quick baking prep.",
      "Adapt metric dessert recipes for cup-based kitchen tools.",
      "Estimate sugar volume without guessing from a dense ingredient.",
    ],
  },
  {
    defaultValue: "3",
    description:
      "Convert teaspoons to grams for granulated sugar using an ingredient-specific kitchen reference.",
    ingredient: "sugar",
    intro:
      "Teaspoon-to-gram cooking conversions are especially sensitive to ingredient type, so this page is fixed to granulated sugar. It uses an approximate reference of 4.2 grams per teaspoon, which is practical for syrups, toppings, drinks, and recipe adjustments that use small spoon measurements.",
    keywords: ["tsp to grams sugar", "teaspoons to grams sugar", "sugar teaspoon grams", "granulated sugar tsp grams"],
    mode: "teaspoonsToGrams",
    path: "/tsp-to-grams-sugar",
    slug: "tsp-to-grams-sugar",
    title: "Teaspoons to Grams Sugar Converter",
    useCases: [
      "Convert small sugar spoon amounts into grams for baking and drinks.",
      "Check topping or syrup quantities with a kitchen scale reference.",
      "Translate teaspoon sugar amounts into metric-friendly prep.",
    ],
  },
  {
    defaultValue: "1",
    description:
      "Convert tablespoons to grams for granulated sugar using the same ingredient-specific baking assumptions as the rest of the sugar conversion set.",
    faq: defineFaqs(
      defineFaq(
        "How many grams are in 1 tablespoon of granulated sugar?",
        "This page uses an approximate kitchen reference of 1 tablespoon of granulated sugar being about 12.6 grams.",
      ),
      defineFaq(
        "Why is tbsp to grams sugar only approximate?",
        "Tablespoon-to-gram cooking conversions still depend on ingredient density, packing, and spoon leveling, so the result is a practical kitchen estimate rather than a lab value.",
      ),
      defineFaq(
        "When is tbsp to grams sugar conversion useful?",
        "It is useful for syrups, toppings, sauces, drink recipes, and dessert adjustments where a tablespoon amount needs to be weighed more precisely.",
      ),
    ),
    ingredient: "sugar",
    intro:
      "This page is fixed to granulated sugar and uses the same ingredient-specific density assumptions as the rest of the sugar cooking tools. It treats 1 tablespoon as roughly 12.6 grams of granulated sugar, which is helpful for dessert prep, sweet sauces, drink recipes, and recipe scaling that starts with tablespoon measures.",
    keywords: ["tbsp to grams sugar", "tablespoons to grams sugar", "sugar tablespoon grams", "granulated sugar tbsp grams"],
    mode: "tablespoonsToGrams",
    path: "/tbsp-to-grams-sugar",
    slug: "tbsp-to-grams-sugar",
    title: "Tablespoons to Grams Sugar Converter",
    useCases: [
      "Convert tablespoon sugar amounts into grams for baking and dessert prep.",
      "Check syrup, glaze, and topping quantities against a kitchen scale.",
      "Translate sugar tablespoon values into metric-friendly recipe notes.",
    ],
  },
  {
    defaultValue: "12.6",
    description:
      "Convert grams to teaspoons for granulated sugar using an ingredient-specific kitchen reference.",
    ingredient: "sugar",
    intro:
      "This page converts grams into teaspoons for granulated sugar only. It uses an approximate reference of 4.2 grams per teaspoon, which helps when recipes, nutrition labels, or small batch adjustments need a spoon-based estimate instead of a raw gram value.",
    keywords: ["grams to tsp sugar", "grams to teaspoons sugar", "sugar grams to teaspoon", "granulated sugar tsp conversion"],
    mode: "gramsToTeaspoons",
    path: "/grams-to-tsp-sugar",
    slug: "grams-to-tsp-sugar",
    title: "Grams to Teaspoons Sugar Converter",
    useCases: [
      "Convert weighed sugar into teaspoon measures for drinks and toppings.",
      "Translate small gram values into spoon-based recipe steps.",
      "Estimate sugar teaspoons from metric ingredient lists.",
    ],
  },
];

export function getIngredientCookingPage(slug: string) {
  return ingredientCookingPages.find((page) => page.slug === slug);
}

export function requireIngredientCookingPage(slug: string) {
  const page = getIngredientCookingPage(slug);

  if (!page) {
    throw new Error(`Missing cooking page config for ${slug}`);
  }

  return page;
}

export function getCookingIngredientNote(ingredient: CookingIngredientKey) {
  return cookingIngredients[ingredient];
}

export const cookingVolumeSeoContent = {
  "cups-to-ml": {
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 cup for cooking?",
        "1 US cup is about 236.588 milliliters, which many recipes round to 240 ml for quick kitchen use.",
      ),
      defineFaq(
        "When do cooks need a cups to ml converter?",
        "It is useful when a recipe uses cups but your measuring jug, carton, or kitchen tools are marked in milliliters.",
      ),
      defineFaq(
        "Is cups to ml helpful for baking as well as cooking?",
        "Yes. It is useful for milk, water, oil, cream, and other liquids in both baking and savory recipe prep.",
      ),
    ),
    longDescription: volumeCookingLongDescriptions.cupsToMl,
    metaDescription:
      "Convert cups to ml for recipes, baking liquids, sauces, and kitchen prep with a quick US cup to milliliter reference.",
  },
  "tbsp-to-ml": {
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 tablespoon?",
        "1 US tablespoon is about 14.7868 milliliters, often rounded to 15 ml in everyday recipe use.",
      ),
      defineFaq(
        "Why would I convert tablespoons to ml in a recipe?",
        "It helps when sauces, oils, extracts, or syrups are listed in tablespoons but your kitchen tools are metric.",
      ),
      defineFaq(
        "Is tbsp to ml mainly for liquids?",
        "It is most often used for liquid or semi-liquid ingredients like dressings, vanilla, oil, and sauces.",
      ),
    ),
    longDescription: volumeCookingLongDescriptions.tbspToMl,
    metaDescription:
      "Convert tablespoons to ml for recipes, sauces, dressings, and baking ingredients with an easy kitchen-friendly reference.",
  },
  "tsp-to-ml": {
    faq: defineFaqs(
      defineFaq(
        "How many milliliters are in 1 teaspoon?",
        "1 US teaspoon is about 4.92892 milliliters, which most cooks round to 5 ml.",
      ),
      defineFaq(
        "Why do people search tsp to ml for baking?",
        "Teaspoons are common for vanilla, baking powder, extracts, and syrups, while many measuring tools show only milliliters.",
      ),
      defineFaq(
        "Is tsp to ml useful for small recipe adjustments?",
        "Yes. It helps when scaling ingredients that are measured in very small spoon amounts where accuracy matters.",
      ),
    ),
    longDescription: volumeCookingLongDescriptions.tspToMl,
    metaDescription:
      "Convert teaspoons to ml for baking, extracts, syrups, and small recipe measurements with a quick kitchen reference.",
  },
} as const;
