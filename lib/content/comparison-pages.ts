import type { FaqSchemaItem } from "@/lib/seo";

export type ComparisonPage = {
  slug: string;
  route: `/${string}`;
  title: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  competitor: string;
  competitorUrl: string;
  intro: string;
  advantages: readonly string[];
  sharedFeatures: readonly string[];
  faq: readonly FaqSchemaItem[];
  relatedSlugs: readonly string[];
};

export const comparisonPages: ComparisonPage[] = [
  {
    slug: "convertcenter-vs-unitconverters",
    route: "/convertcenter-vs-unitconverters",
    title: "ConvertCenter vs UnitConverters.net",
    metaTitle: "ConvertCenter vs UnitConverters.net — Which Converter Is Better?",
    metaDescription:
      "Compare ConvertCenter and UnitConverters.net side by side. See which unit converter is faster, cleaner, and more useful for everyday conversions.",
    keywords: [
      "unitconverters.net alternative",
      "convertcenter vs unitconverters",
      "best unit converter",
      "unit converter comparison",
    ],
    competitor: "UnitConverters.net",
    competitorUrl: "https://www.unitconverters.net",
    intro:
      "UnitConverters.net is one of the oldest unit conversion sites on the web. It covers a wide range of categories but carries a dated interface and heavy ad load. ConvertCenter is built for speed — static-first pages, no sign-ups, and a developer-friendly design that loads instantly on any device.",
    advantages: [
      "No ads or pop-ups — just clean, fast tools.",
      "Static-first architecture means pages load in milliseconds.",
      "Built-in math calculators, text tools, and developer utilities beyond unit conversion.",
      "Modern responsive design that works on every screen size.",
      "Copy results with one click — no highlighting and pasting.",
    ],
    sharedFeatures: [
      "Weight, length, volume, and temperature conversions.",
      "Data size conversions (MB, GB, TB).",
      "Free to use with no account required.",
    ],
    faq: [
      {
        q: "Is ConvertCenter free like UnitConverters.net?",
        a: "Yes. ConvertCenter is completely free with no account required, no paywalls, and no ads.",
      },
      {
        q: "Does ConvertCenter support the same unit categories?",
        a: "ConvertCenter covers weight, length, volume, temperature, data, pressure, wind, and rainfall. It also includes math calculators, text tools, and developer utilities that UnitConverters.net does not offer.",
      },
    ],
    relatedSlugs: ["weight-converter", "length-converter", "temperature-converter"],
  },
  {
    slug: "convertcenter-vs-google-converter",
    route: "/convertcenter-vs-google-converter",
    title: "ConvertCenter vs Google Unit Converter",
    metaTitle: "ConvertCenter vs Google Unit Converter — Why Use a Dedicated Tool?",
    metaDescription:
      "Google's built-in converter is quick for one-off lookups, but ConvertCenter gives you dedicated pages, formulas, examples, and developer tools.",
    keywords: [
      "google unit converter alternative",
      "better than google converter",
      "convertcenter vs google",
      "dedicated unit converter",
    ],
    competitor: "Google Unit Converter",
    competitorUrl: "https://www.google.com",
    intro:
      "Google's built-in unit converter is convenient for quick one-off conversions right in the search results. But it is limited — no saved history, no formulas, no bulk conversions, and no extra tools. ConvertCenter is a dedicated conversion hub with individual tool pages, example tables, math calculators, and developer utilities all in one place.",
    advantages: [
      "Dedicated pages for every conversion pair with formulas and example tables.",
      "Math calculators, text transforms, and developer tools beyond basic unit conversion.",
      "Recent conversion history so you can revisit past lookups.",
      "Category hubs to browse related conversions and discover new tools.",
      "SEO-optimized individual pages you can bookmark and share.",
    ],
    sharedFeatures: [
      "Instant results for common unit conversions.",
      "Weight, length, volume, and temperature support.",
      "Free to use with no sign-up.",
    ],
    faq: [
      {
        q: "Why use ConvertCenter instead of just Googling it?",
        a: "Google's converter works for quick lookups, but ConvertCenter gives you dedicated pages with formulas, example values, related tools, and a recent history. It is designed for people who convert things regularly.",
      },
      {
        q: "Is ConvertCenter faster than Google's converter?",
        a: "ConvertCenter's static-first pages load in milliseconds. For repeat conversions, having a bookmarked dedicated page is faster than typing a query into Google every time.",
      },
    ],
    relatedSlugs: ["kg-to-lbs", "cm-to-inches", "celsius-to-fahrenheit"],
  },
  {
    slug: "convertcenter-vs-rapidtables",
    route: "/convertcenter-vs-rapidtables",
    title: "ConvertCenter vs RapidTables",
    metaTitle: "ConvertCenter vs RapidTables — Modern Converter Comparison",
    metaDescription:
      "Compare ConvertCenter and RapidTables. Both offer free converters, but ConvertCenter adds math calculators, developer tools, and a cleaner interface.",
    keywords: [
      "rapidtables alternative",
      "convertcenter vs rapidtables",
      "online converter comparison",
      "best free converter",
    ],
    competitor: "RapidTables",
    competitorUrl: "https://www.rapidtables.com",
    intro:
      "RapidTables is a well-known reference site with conversion tables, calculators, and electrical tools. It covers a lot of ground but uses a traditional layout with heavy advertising. ConvertCenter takes a utility-first approach with fast static pages, a modern dark-mode interface, and integrated developer tools.",
    advantages: [
      "Clean, modern interface with dark mode by default.",
      "No intrusive ads interrupting your workflow.",
      "Integrated text tools, encoding utilities, and developer helpers.",
      "One-click copy on every result.",
      "Mobile-first responsive design.",
    ],
    sharedFeatures: [
      "Unit conversions for weight, length, volume, temperature, and data.",
      "Color conversion tools (hex, RGB, HSL).",
      "Free access without registration.",
    ],
    faq: [
      {
        q: "Does ConvertCenter have electrical calculators like RapidTables?",
        a: "Yes. ConvertCenter includes a watts-to-amps converter and other electrical tools, alongside math calculators and developer utilities.",
      },
      {
        q: "Is ConvertCenter as comprehensive as RapidTables?",
        a: "ConvertCenter covers the most common conversion categories and adds math calculators, text tools, and developer utilities. RapidTables has more niche reference tables, but ConvertCenter focuses on the tools people actually use daily.",
      },
    ],
    relatedSlugs: ["hex-to-rgb", "watts-to-amps", "math-calculators"],
  },
  {
    slug: "convertcenter-vs-calculator-net",
    route: "/convertcenter-vs-calculator-net",
    title: "ConvertCenter vs Calculator.net",
    metaTitle: "ConvertCenter vs Calculator.net — Which Tool Suite Is Better?",
    metaDescription:
      "Calculator.net is a classic calculator site. See how ConvertCenter compares with its modern interface, developer tools, and fast static pages.",
    keywords: [
      "calculator.net alternative",
      "convertcenter vs calculator.net",
      "online calculator comparison",
      "best online calculator",
    ],
    competitor: "Calculator.net",
    competitorUrl: "https://www.calculator.net",
    intro:
      "Calculator.net has been around for years and offers a massive library of calculators across finance, health, math, and conversions. The trade-off is a cluttered interface with heavy ad placement. ConvertCenter focuses on the tools developers and everyday users need most — converters, math calculators, text transforms, and encoding utilities — with a clean, fast experience.",
    advantages: [
      "Distraction-free interface with no ads.",
      "Developer-focused tools like JWT decoder, regex tester, and base64 encoding.",
      "Text transformation tools (case converters, hash generators, URL encoding).",
      "Static-first architecture for instant page loads.",
      "Modern, accessible design with keyboard navigation.",
    ],
    sharedFeatures: [
      "Math calculators for percentages, ratios, and averages.",
      "Unit conversions across common categories.",
      "Free to use without creating an account.",
    ],
    faq: [
      {
        q: "Does ConvertCenter have as many calculators as Calculator.net?",
        a: "Calculator.net has a larger total number of calculators, especially in finance and health. ConvertCenter focuses on the most commonly used math, conversion, and developer tools with a much faster, cleaner experience.",
      },
      {
        q: "Which site is better for developers?",
        a: "ConvertCenter. It includes JWT decoding, regex testing, UUID generation, cron expression building, base64 encoding, and other developer utilities that Calculator.net does not offer.",
      },
    ],
    relatedSlugs: ["math-calculators", "jwt-decoder", "regex-tester"],
  },
];

export function getComparisonPage(slug: string) {
  return comparisonPages.find((page) => page.slug === slug);
}
