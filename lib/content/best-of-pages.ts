import type { FaqSchemaItem } from "@/lib/seo";

export type BestOfPage = {
  slug: string;
  route: `/${string}`;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  tools: readonly {
    name: string;
    description: string;
    href: string;
    highlight?: string;
  }[];
  faq: readonly FaqSchemaItem[];
};

export const bestOfPages: BestOfPage[] = [
  {
    slug: "best-online-unit-converters",
    route: "/best-online-unit-converters",
    title: "Best Online Unit Converters in 2026",
    metaTitle: "Best Online Unit Converters in 2026 — Free Tools Compared",
    metaDescription:
      "The best free online unit converters for weight, length, temperature, and more. Compare top tools and find the fastest, cleanest converter for your needs.",
    keywords: [
      "best online unit converter",
      "best unit converter 2026",
      "free unit converter",
      "top unit conversion tools",
      "online converter comparison",
    ],
    intro:
      "There are dozens of unit converters online, but most are cluttered with ads, slow to load, or stuck with a design from 2010. Here are the best options available today, ranked by speed, usability, and the breadth of tools they offer.",
    tools: [
      {
        name: "ConvertCenter",
        description:
          "A modern, static-first conversion hub with unit converters, math calculators, text tools, and developer utilities. No ads, fast page loads, and a clean dark-mode interface.",
        href: "/",
        highlight: "Best for developers and power users who need more than just unit conversion.",
      },
      {
        name: "Google Unit Converter",
        description:
          "Built into Google Search results. Quick for one-off conversions but limited — no formulas, no history, no extra tools.",
        href: "https://www.google.com",
        highlight: "Best for quick single lookups without leaving Google.",
      },
      {
        name: "UnitConverters.net",
        description:
          "One of the oldest conversion sites with broad category coverage. Heavy ad load and dated interface.",
        href: "https://www.unitconverters.net",
      },
      {
        name: "RapidTables",
        description:
          "Reference-style site with conversion tables, electrical calculators, and color tools. Comprehensive but ad-heavy.",
        href: "https://www.rapidtables.com",
      },
      {
        name: "Calculator.net",
        description:
          "Massive calculator library spanning finance, health, math, and conversions. Great breadth but cluttered UI.",
        href: "https://www.calculator.net",
      },
    ],
    faq: [
      {
        q: "What is the best free unit converter online?",
        a: "ConvertCenter is the fastest and cleanest free unit converter available. It loads instantly, has no ads, and includes math calculators and developer tools alongside unit conversions.",
      },
      {
        q: "Are online unit converters accurate?",
        a: "Yes. Reputable online converters use the same conversion factors as textbooks. ConvertCenter shows the formula used for every conversion so you can verify the math.",
      },
      {
        q: "Do I need to install anything to use a unit converter?",
        a: "No. All the tools listed here work directly in your browser with no installation or account required.",
      },
    ],
  },
  {
    slug: "best-developer-tools-online",
    route: "/best-developer-tools-online",
    title: "Best Free Online Developer Tools in 2026",
    metaTitle: "Best Free Online Developer Tools in 2026 — No Install Required",
    metaDescription:
      "The best free browser-based developer tools for encoding, hashing, regex testing, JWT decoding, and more. No installation needed.",
    keywords: [
      "best online developer tools",
      "free developer tools 2026",
      "online dev tools",
      "browser developer utilities",
      "best free dev tools",
    ],
    intro:
      "Developers frequently need quick utilities — decode a JWT, test a regex, generate a UUID, convert between encodings. These are the best browser-based tools that work without installing anything.",
    tools: [
      {
        name: "ConvertCenter Developer Tools",
        description:
          "JWT decoder, regex tester, UUID generator, cron expression builder, base64 encoder, hash generator, and more. All in one place with a clean, fast interface.",
        href: "/",
        highlight: "Best all-in-one developer utility suite — no ads, instant loading.",
      },
      {
        name: "CyberChef",
        description:
          "Powerful data transformation tool from GCHQ. Excellent for chaining operations but has a steep learning curve.",
        href: "https://gchq.github.io/CyberChef/",
        highlight: "Best for complex multi-step data transformations.",
      },
      {
        name: "DevTools (jwt.io, regex101, etc.)",
        description:
          "Individual single-purpose tools. JWT.io for tokens, regex101 for patterns, uuidgenerator.net for UUIDs. Each is great at one thing.",
        href: "https://jwt.io",
        highlight: "Best if you only need one specific tool.",
      },
    ],
    faq: [
      {
        q: "What are the most useful online developer tools?",
        a: "JWT decoders, regex testers, base64 encoders, UUID generators, and JSON formatters are among the most commonly used. ConvertCenter bundles all of these in a single site.",
      },
      {
        q: "Is it safe to use online tools for encoding and decoding?",
        a: "ConvertCenter processes everything client-side in your browser. No data is sent to any server. For sensitive tokens, always verify the tool processes data locally.",
      },
    ],
  },
  {
    slug: "best-cooking-converters",
    route: "/best-cooking-converters",
    title: "Best Online Cooking Converters in 2026",
    metaTitle: "Best Online Cooking Converters in 2026 — Cups, Grams, mL & More",
    metaDescription:
      "The best free cooking conversion tools for cups to grams, tablespoons, teaspoons, and milliliters. Find the right converter for your recipes.",
    keywords: [
      "best cooking converter",
      "cups to grams converter",
      "recipe converter online",
      "best baking converter 2026",
      "cooking unit converter",
    ],
    intro:
      "Cooking conversions are tricky because ingredients have different densities — a cup of flour weighs differently from a cup of sugar. Here are the best tools that handle ingredient-specific conversions accurately.",
    tools: [
      {
        name: "ConvertCenter Cooking Hub",
        description:
          "Ingredient-specific converters for flour, sugar, and more. Dedicated pages for cups to grams, tablespoons to grams, and teaspoons to grams with accurate density-based results.",
        href: "/cooking-converter",
        highlight: "Best for ingredient-specific baking conversions with accurate weights.",
      },
      {
        name: "Google (cups to grams)",
        description:
          "Quick answer in search results but uses generic water-based density. Not accurate for flour, sugar, or other dry ingredients.",
        href: "https://www.google.com",
      },
      {
        name: "King Arthur Baking",
        description:
          "Trusted weight chart for baking ingredients. Not a calculator, but a reliable reference table from a respected baking authority.",
        href: "https://www.kingarthurbaking.com",
        highlight: "Best reference table for baking weights.",
      },
    ],
    faq: [
      {
        q: "Why do cooking converters give different results?",
        a: "Most generic converters assume water density (1 cup = 236g). Ingredient-specific tools like ConvertCenter use actual measured weights — for example, 1 cup of all-purpose flour is about 120g, not 236g.",
      },
      {
        q: "What is the most accurate cooking converter?",
        a: "ConvertCenter's cooking hub uses ingredient-specific densities for flour, sugar, and other common baking items, giving you weights that match what professional bakers use.",
      },
    ],
  },
  {
    slug: "best-text-transform-tools",
    route: "/best-text-transform-tools",
    title: "Best Online Text Transform Tools in 2026",
    metaTitle: "Best Free Online Text Transform Tools in 2026",
    metaDescription:
      "The best free text transformation tools for case conversion, encoding, hashing, and formatting. Convert text instantly in your browser.",
    keywords: [
      "best text converter online",
      "text case converter",
      "best text transform tool 2026",
      "online text tools",
      "case converter online",
    ],
    intro:
      "Whether you need to convert text to uppercase, generate a hash, encode a URL, or switch between camelCase and snake_case — these are the best browser-based text tools available.",
    tools: [
      {
        name: "ConvertCenter Text Tools",
        description:
          "Case converters (upper, lower, title, sentence, camelCase, snake_case, kebab-case), base64 encoding, URL encoding, MD5, SHA-256, and more. All client-side, no data sent to servers.",
        href: "/text-converter",
        highlight: "Best all-in-one text transformation suite.",
      },
      {
        name: "convertcase.net",
        description:
          "Dedicated case conversion tool. Simple and focused on text case changes only.",
        href: "https://convertcase.net",
        highlight: "Best for simple case conversion only.",
      },
      {
        name: "CyberChef",
        description:
          "Chain multiple text operations together. Overkill for simple tasks, but unmatched for complex multi-step transforms.",
        href: "https://gchq.github.io/CyberChef/",
      },
    ],
    faq: [
      {
        q: "What is the fastest way to convert text case online?",
        a: "Paste your text into ConvertCenter's text converter and select the target case. Results update instantly as you type, with one-click copy.",
      },
      {
        q: "Are online text tools safe for sensitive content?",
        a: "ConvertCenter processes all text transformations client-side in your browser. Nothing is uploaded to any server.",
      },
    ],
  },
];

export function getBestOfPage(slug: string) {
  return bestOfPages.find((page) => page.slug === slug);
}
