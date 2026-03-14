export type StandaloneToolPage = {
  category: string;
  hubCategoryKey?: string;
  description: string;
  keywords: string[];
  route: `/${string}`;
  slug: string;
  title: string;
};

export const standaloneToolPages: StandaloneToolPage[] = [
  {
    category: "date",
    description: "Calculate your exact age in years, months, and days using this free age calculator.",
    keywords: ["age calculator", "calculate age", "birthday calculator", "age in years months days"],
    route: "/age-calculator",
    slug: "age-calculator",
    title: "Age Calculator",
  },
  {
    category: "math",
    description: "Calculate percentage increase or decrease between two numbers instantly.",
    keywords: ["percentage change calculator", "percentage increase", "percentage decrease", "percent change"],
    route: "/percentage-change",
    slug: "percentage-change",
    title: "Percentage Change Calculator",
  },
  {
    category: "date",
    description: "Convert dates to Unix timestamps instantly.",
    hubCategoryKey: "dev-data",
    keywords: ["date to unix timestamp", "date to epoch", "convert date to unix"],
    route: "/date-to-unix",
    slug: "date-to-unix",
    title: "Date to Unix Timestamp Converter",
  },
  {
    category: "cooking",
    description:
      "Browse cooking conversions for cups, milliliters, tablespoons, teaspoons, and ingredient-specific baking weights.",
    keywords: [
      "cooking converter",
      "recipe converter",
      "kitchen measurement converter",
      "baking conversions",
      "recipe cups grams",
      "kitchen tbsp ml",
      "baking tsp ml",
      "ingredient grams cups",
    ],
    route: "/cooking-converter",
    slug: "cooking-converter",
    title: "Cooking Converter",
  },
  {
    category: "cooking",
    description:
      "Convert cups to grams for flour, sugar, butter, water, and other common cooking ingredients.",
    keywords: ["cups to grams", "cup to gram", "baking conversion", "cooking conversions"],
    route: "/cups-to-grams",
    slug: "cups-to-grams",
    title: "Cups to Grams Converter",
  },
  {
    category: "cooking",
    description:
      "Convert cups to grams for all-purpose flour using an ingredient-specific kitchen reference.",
    keywords: ["cups to grams flour", "cup flour to grams", "flour cup to gram"],
    route: "/cups-to-grams-flour",
    slug: "cups-to-grams-flour",
    title: "Cups to Grams Flour Converter",
  },
  {
    category: "cooking",
    description:
      "Convert cups to grams for granulated sugar using a clear ingredient-specific kitchen assumption.",
    keywords: ["cups to grams sugar", "cup sugar to grams", "granulated sugar grams"],
    route: "/cups-to-grams-sugar",
    slug: "cups-to-grams-sugar",
    title: "Cups to Grams Sugar Converter",
  },
  {
    category: "cooking",
    description:
      "Convert grams to cups for flour, sugar, butter, water, and other common cooking ingredients.",
    keywords: ["grams to cups", "gram to cup", "baking conversion", "cooking conversions"],
    route: "/grams-to-cups",
    slug: "grams-to-cups",
    title: "Grams to Cups Converter",
  },
  {
    category: "cooking",
    description:
      "Convert grams to cups for all-purpose flour using an ingredient-specific baking reference.",
    keywords: ["grams to cups flour", "gram flour to cup", "flour grams to cups"],
    route: "/grams-to-cups-flour",
    slug: "grams-to-cups-flour",
    title: "Grams to Cups Flour Converter",
  },
  {
    category: "cooking",
    description:
      "Convert grams to cups for granulated sugar using an ingredient-specific baking reference.",
    keywords: ["grams to cups sugar", "gram sugar to cup", "granulated sugar cups"],
    route: "/grams-to-cups-sugar",
    slug: "grams-to-cups-sugar",
    title: "Grams to Cups Sugar Converter",
  },
  {
    category: "cooking",
    description:
      "Convert teaspoons to grams for flour, sugar, butter, water, and other common cooking ingredients.",
    keywords: ["teaspoons to grams", "tsp to grams", "baking conversion", "cooking conversions"],
    route: "/teaspoons-to-grams",
    slug: "teaspoons-to-grams",
    title: "Teaspoons to Grams Converter",
  },
  {
    category: "cooking",
    description:
      "Convert teaspoons to grams for granulated sugar using an ingredient-specific kitchen reference.",
    keywords: ["tsp to grams sugar", "teaspoons to grams sugar", "sugar teaspoon grams"],
    route: "/tsp-to-grams-sugar",
    slug: "tsp-to-grams-sugar",
    title: "Teaspoons to Grams Sugar Converter",
  },
  {
    category: "cooking",
    description:
      "Convert grams to teaspoons for granulated sugar using an ingredient-specific kitchen reference.",
    keywords: ["grams to tsp sugar", "grams to teaspoons sugar", "sugar grams to teaspoon"],
    route: "/grams-to-tsp-sugar",
    slug: "grams-to-tsp-sugar",
    title: "Grams to Teaspoons Sugar Converter",
  },
  {
    category: "color",
    hubCategoryKey: "color",
    description: "Pick a color and copy its HEX, RGB, and HSL values instantly.",
    keywords: ["color picker", "hex rgb hsl picker", "pick a color", "designer tools", "hex rgb hsl values"],
    route: "/color-picker",
    slug: "color-picker",
    title: "Color Picker",
  },
  {
    category: "color",
    hubCategoryKey: "color",
    description: "Convert HEX color codes to RGB instantly with a live preview and copy-ready output.",
    keywords: ["hex to rgb", "hex color converter", "convert hex to rgb", "hex color codes to rgb", "designer tools"],
    route: "/hex-to-rgb",
    slug: "hex-to-rgb",
    title: "HEX to RGB Converter",
  },
  {
    category: "color",
    hubCategoryKey: "color",
    description: "Convert HEX colors to HSL instantly with live output, color preview, and copy-ready values.",
    keywords: ["hex to hsl", "hex color to hsl", "convert hex to hsl", "designer tools", "hex hsl converter"],
    route: "/hex-to-hsl",
    slug: "hex-to-hsl",
    title: "HEX to HSL Converter",
  },
  {
    category: "color",
    hubCategoryKey: "color",
    description: "Convert RGB colors to HEX instantly with this free online RGB to HEX converter.",
    keywords: ["rgb to hex", "rgb color converter", "convert rgb to hex", "rgb colors to hex", "designer tools"],
    route: "/rgb-to-hex",
    slug: "rgb-to-hex",
    title: "RGB to HEX Converter",
  },
  {
    category: "color",
    hubCategoryKey: "color",
    description: "Convert HSL colors to HEX instantly with a live preview and copy-ready HEX output.",
    keywords: ["hsl to hex", "convert hsl to hex", "hsl color converter", "designer tools", "hsl hex converter"],
    route: "/hsl-to-hex",
    slug: "hsl-to-hex",
    title: "HSL to HEX Converter",
  },
  {
    category: "date",
    description: "Convert time between time zones instantly using this free time zone converter.",
    hubCategoryKey: "dev-data",
    keywords: ["time zone converter", "timezone converter", "convert time between zones"],
    route: "/time-zone-converter",
    slug: "time-zone-converter",
    title: "Time Zone Converter",
  },
  {
    category: "date",
    description: "Convert Unix timestamps to readable dates and vice versa instantly.",
    hubCategoryKey: "dev-data",
    keywords: ["unix timestamp converter", "timestamp to date", "date to unix timestamp", "epoch converter"],
    route: "/unix-timestamp-converter",
    slug: "unix-timestamp-converter",
    title: "Unix Timestamp Converter",
  },
  {
    category: "date",
    description: "Convert Unix timestamps to human-readable dates instantly.",
    hubCategoryKey: "dev-data",
    keywords: ["unix timestamp to date", "epoch to date", "convert unix timestamp"],
    route: "/unix-to-date",
    slug: "unix-to-date",
    title: "Unix Timestamp to Date Converter",
  },
];
