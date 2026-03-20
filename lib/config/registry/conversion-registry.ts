import type {
  CategoryKey,
  CategorySchema,
  HomePageConfig,
  LaunchCategoryKey,
  LaunchToolPageSchema,
  NumericCategorySchema,
} from "./conversion-types";
import {
  buildUnitPairSlug,
  dataUnits,
  getUnitPluralLabel,
  getUnitSymbol,
  lengthUnits,
  pressureUnits,
  rainfallUnits,
  temperatureUnits,
  volumeUnits,
  windUnits,
  weightUnits,
} from "./unit-definitions";
import {
  dataPairPages,
  lengthPairPages,
  pressurePairPages,
  rainfallPairPages,
  temperaturePairPages,
  volumePairPages,
  windPairPages,
  weightPairPages,
} from "./numeric-pair-pages";
import { plannedDevToolPages, textTransformPages } from "./text-transform-pages";

const textCasePages = textTransformPages.filter((page) => page.categoryKey === "text");
const encodingToolPages = textTransformPages.filter((page) => page.categoryKey === "encoding");
const colorToolPages = textTransformPages.filter((page) => page.categoryKey === "color");
const devDataToolPages = textTransformPages.filter((page) => page.categoryKey === "dev-data");
const featuredEncodingPage = encodingToolPages[0];
const featuredColorPage = colorToolPages[0];

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values)];
}

export * from "./conversion-types";
export * from "./unit-definitions";
export { plannedDevToolPages } from "./text-transform-pages";

export const categoryRegistry: CategorySchema[] = [
  {
    aliases: ["weight", "mass", "kg", "lbs", "grams", "ounces"],
    baseUnitKey: "kg",
    description: "Convert kilograms, pounds, grams, and ounces with a clean utility-first interface.",
    engine: "linear",
    featuredSlug: weightPairPages[0].slug,
    intro:
      "Weight conversions show up in more everyday tasks than most people expect. You might need kilograms for a workout plan, pounds for a shipping form, grams for a nutrition label, or ounces for a recipe or small product listing. This hub is organized around those practical use cases, with focused converter pages that help you move quickly between metric and imperial units without doing the math manually. It is designed for fast answers, but also for the moments when you want examples, formulas, and a clearer sense of how common weight values compare across systems.",
    key: "weight",
    kind: "numeric",
    label: "weight",
    metaDescription:
      "Weight converter for kg, lbs, grams, and ounces. Use quick tools for fitness tracking, recipes, shipping, and everyday metric-to-imperial conversions.",
    pairPages: weightPairPages,
    relatedCategoryKeys: ["length", "volume", "data"],
    relatedTopics: ["fitness tracking", "shipping weights", "nutrition labels", "product packaging"],
    route: "/weight-converter",
    slug: "weight-converter",
    title: "Weight converter",
    useCases: [
      "Compare kilograms and pounds for training logs, body weight, and gym equipment.",
      "Check grams and ounces for recipes, food packaging, and serving sizes.",
      "Convert package weights before postage, delivery estimates, or ecommerce listings.",
    ],
    units: weightUnits,
  },
  {
    aliases: ["length", "distance", "cm", "feet", "inches", "km", "miles"],
    baseUnitKey: "m",
    description: "Switch between centimeters, inches, meters, and feet in a single fast calculator.",
    engine: "linear",
    featuredSlug: lengthPairPages[0].slug,
    intro:
      "Length conversions become useful the moment measurements cross regions, products, or industries. A listing might show centimeters, a builder may think in feet, and a race route could be described in miles or kilometers depending on the audience. This hub keeps those common length lookups in one place so you can move from a quick conversion to a dedicated page with examples and reference values. It is especially handy for product dimensions, room planning, travel distances, DIY work, and any situation where metric and imperial units keep colliding.",
    key: "length",
    kind: "numeric",
    label: "length",
    metaDescription:
      "Length converter for cm, inches, feet, meters, kilometers, and miles. Useful for sizing products, planning spaces, and comparing travel distances.",
    pairPages: lengthPairPages,
    relatedCategoryKeys: ["weight", "volume", "data"],
    relatedTopics: ["room dimensions", "product sizing", "travel distances", "print layouts"],
    route: "/length-converter",
    slug: "length-converter",
    title: "Length converter",
    useCases: [
      "Switch between centimeters and inches for clothing, product specs, and display sizes.",
      "Convert feet and meters when measuring rooms, furniture, and construction notes.",
      "Translate kilometers and miles for races, road trips, and route planning.",
    ],
    units: lengthUnits,
  },
  {
    aliases: ["volume", "liquid", "ml", "oz", "cups", "liters", "gallons"],
    baseUnitKey: "ml",
    description: "Convert milliliters and cups instantly for recipes, product sizes, and packaging work.",
    engine: "linear",
    featuredSlug: volumePairPages[0].slug,
    intro:
      "Volume conversions are most useful when liquids, recipes, and packaging labels refuse to stick to one unit system. A recipe might use cups, a bottle may show fluid ounces, and product packaging often switches to milliliters or liters. This hub brings those everyday conversions together so you can move quickly from a kitchen measurement to a packaging check or a beverage portion comparison. The goal is not just to provide a calculator, but to make common liquid-size conversions easier to scan, understand, and reuse across cooking, shopping, and product research.",
    key: "volume",
    kind: "numeric",
    label: "volume",
    metaDescription:
      "Volume converter for ml, cups, fluid ounces, liters, and gallons. Compare recipe amounts, drink sizes, and liquid packaging with fast reference tools.",
    pairPages: volumePairPages,
    relatedCategoryKeys: ["weight", "length", "temperature"],
    relatedTopics: ["recipes", "drink portions", "bottle sizes", "liquid packaging"],
    route: "/volume-converter",
    slug: "volume-converter",
    title: "Volume converter",
    useCases: [
      "Convert cups, milliliters, and fluid ounces while cooking or scaling recipes.",
      "Compare drink, bottle, and container sizes across US and metric labels.",
      "Switch between liters and gallons for larger liquid storage and fuel-style checks.",
    ],
    units: volumeUnits,
  },
  {
    aliases: ["temperature", "celsius", "fahrenheit", "kelvin", "weather"],
    baseUnitKey: "c",
    description: "Convert Celsius and Fahrenheit without jumping between cluttered tools.",
    engine: "formula",
    featuredSlug: temperaturePairPages[0].slug,
    intro:
      "Temperature conversions are slightly different from most other unit lookups because they depend on formulas, offsets, and familiar benchmark values rather than a single multiplier. That makes a focused hub especially useful. Whether you are comparing weather forecasts, setting an oven, planning a trip, or checking a science-related value, these pages help translate Celsius, Fahrenheit, and Kelvin with less guesswork. The hub keeps the most common temperature tools in one place, pairing live converters with formula references and example values so the numbers feel easier to interpret in real situations.",
    key: "temperature",
    kind: "numeric",
    label: "temperature",
    metaDescription:
      "Temperature converter for Celsius, Fahrenheit, and Kelvin. Check weather, cooking, and science conversions with formulas, examples, and quick tables.",
    pairPages: temperaturePairPages,
    relatedCategoryKeys: ["volume", "weight", "length"],
    relatedTopics: ["weather", "oven settings", "travel planning", "science and lab work"],
    route: "/temperature-converter",
    slug: "temperature-converter",
    title: "Temperature converter",
    useCases: [
      "Translate weather temperatures between Celsius and Fahrenheit while traveling.",
      "Convert oven settings from international recipes or appliance manuals.",
      "Check Kelvin-based values for school, science, and technical work.",
    ],
    units: temperatureUnits,
  },
  {
    aliases: ["wind", "wind speed", "mph", "kmh", "km/h", "knots"],
    baseUnitKey: "kmh",
    description: "Convert mph, km/h, and knots for forecasts, travel, and marine planning.",
    engine: "linear",
    featuredSlug: windPairPages[0].slug,
    intro:
      "Wind speed is one of those values that changes meaning depending on the unit you are used to seeing. Weather apps may show kilometers per hour, marine forecasts often use knots, and many people in the United States still think in miles per hour. This hub keeps those common wind-speed lookups together so you can move quickly between forecast data, travel references, and marine or aviation contexts without re-checking the math each time.",
    key: "wind",
    kind: "numeric",
    label: "wind",
    metaDescription:
      "Wind converter for mph, km/h, and knots. Compare forecasts, road speeds, and marine conditions with fast wind-speed tools.",
    pairPages: windPairPages,
    relatedCategoryKeys: ["temperature", "pressure", "length"],
    relatedTopics: ["weather alerts", "marine forecasts", "aviation references", "speed comparisons"],
    route: "/wind-converter",
    slug: "wind-converter",
    title: "Wind converter",
    useCases: [
      "Translate wind speeds between mph and km/h for forecasts and travel planning.",
      "Convert knots for marine weather, sailing, and aviation references.",
      "Compare speed thresholds from different reporting systems without manual math.",
    ],
    units: windUnits,
  },
  {
    aliases: ["pressure", "air pressure", "hpa", "mmhg", "bar", "psi"],
    baseUnitKey: "hpa",
    description: "Convert hPa, mmHg, bar, and psi for weather maps, gauges, and technical checks.",
    engine: "linear",
    featuredSlug: pressurePairPages[0].slug,
    intro:
      "Pressure values show up in more places than most utility sites account for. Forecast maps and aviation references often use hectopascals, gauges may show bar or psi, and some readings still appear in millimeters of mercury. This hub keeps those practical pressure conversions together so you can move between weather, workshop, and technical contexts without switching tools or hunting down formulas.",
    key: "pressure",
    kind: "numeric",
    label: "pressure",
    metaDescription:
      "Pressure converter for hPa, mmHg, bar, and psi. Useful for weather, aviation, tire pressure, and gauge comparisons.",
    pairPages: pressurePairPages,
    relatedCategoryKeys: ["temperature", "wind", "rainfall"],
    relatedTopics: ["weather maps", "aviation pressure", "tire pressure", "industrial gauges"],
    route: "/pressure-converter",
    slug: "pressure-converter",
    title: "Pressure converter",
    useCases: [
      "Convert hPa and mmHg while comparing weather charts and aviation references.",
      "Switch between bar and psi for tire pressure, compressors, and regulators.",
      "Use one calculator for mixed pressure units instead of separate lookup tables.",
    ],
    units: pressureUnits,
  },
  {
    aliases: ["rainfall", "rain", "precipitation", "mm rain", "inches rain"],
    baseUnitKey: "rainmm",
    description: "Convert rainfall totals between millimeters and inches for forecasts and storm reports.",
    engine: "linear",
    featuredSlug: rainfallPairPages[0].slug,
    intro:
      "Rainfall totals are easy to misread when forecast sources switch between metric and imperial reporting. One service may describe a storm in millimeters, while a local weather report uses inches of rain. This hub keeps rainfall conversion focused on that weather use case so you can compare totals, brief conditions, and read hydrology-style references without second-guessing what the number means.",
    key: "rainfall",
    kind: "numeric",
    label: "rainfall",
    metaDescription:
      "Rainfall converter for millimeters and inches of rain. Compare forecast totals, storm reports, and precipitation data quickly.",
    pairPages: rainfallPairPages,
    relatedCategoryKeys: ["temperature", "pressure", "wind"],
    relatedTopics: ["storm totals", "forecast comparisons", "hydrology notes", "weather reporting"],
    route: "/rainfall-converter",
    slug: "rainfall-converter",
    title: "Rainfall converter",
    useCases: [
      "Translate rainfall totals between mm and inches during storms and forecasts.",
      "Compare precipitation numbers from local and international weather sources.",
      "Read hydrology and weather data in the unit system that feels most familiar.",
    ],
    units: rainfallUnits,
  },
  {
    aliases: ["data", "storage", "kb", "mb", "gb", "tb"],
    baseUnitKey: "mb",
    description: "Check megabytes and gigabytes quickly for storage, upload limits, and file handoffs.",
    engine: "linear",
    featuredSlug: dataPairPages[0].slug,
    intro:
      "Data-size conversions become valuable whenever files, storage plans, and transfer limits stop using the same unit. A media export may be listed in megabytes, cloud storage in gigabytes, and hardware capacity in terabytes. This hub is built around those practical translation points, helping you compare file sizes, estimate storage needs, and understand upload or backup limits without doing binary conversion math in your head. It is especially useful for developer workflows, content handoffs, cloud planning, and any situation where a raw KB, MB, GB, or TB number needs a more intuitive context.",
    key: "data",
    kind: "numeric",
    label: "data",
    metaDescription:
      "Data size converter for KB, MB, GB, and TB. Compare file sizes, storage limits, and transfer amounts for uploads, backups, and device capacity planning.",
    pairPages: dataPairPages,
    relatedCategoryKeys: ["text", "encoding", "length"],
    relatedTopics: ["file sizes", "storage planning", "uploads", "cloud backups"],
    route: "/data-converter",
    slug: "data-converter",
    title: "Data converter",
    useCases: [
      "Estimate storage needs by converting between KB, MB, GB, and TB.",
      "Check file handoff, attachment, and upload limits before sharing content.",
      "Compare hosting, backup, and device capacities using a consistent unit base.",
    ],
    units: dataUnits,
  },
  {
    aliases: ["text", "text tools", "writing tools", "text utilities", "developer text"],
    description: "Clean, compare, analyze, and transform text with fast browser-based tools for writers and teams.",
    featuredSlug: "readability-checker",
    futureTools: plannedDevToolPages,
    intro:
      "Text tools solve a different kind of utility problem than numeric converters. Sometimes you need to clean up pasted copy, sometimes you need to compare two drafts, and sometimes you just need a quick readability check before publishing. This hub brings those day-to-day text workflows together in one place for writers, marketers, product teams, support teams, and developers who want a fast browser-based workflow. Some pages stay intentionally simple, like case conversion or line cleanup, while richer tools add focused widgets for comparison and readability.",
    key: "text",
    kind: "text",
    label: "text",
    metaDescription:
      "Text tools for cleanup, comparison, readability, case conversion, and copy-friendly formatting in one browser-based hub.",
    relatedCategoryKeys: ["encoding", "generator", "dev-data"],
    relatedTopics: ["text cleanup", "draft comparison", "readability", "writing workflows"],
    route: "/text-converter",
    slug: "text-converter",
    title: "Text converter",
    transforms: textCasePages,
    useCases: [
      "Clean up pasted copy by removing duplicates, blank lines, punctuation, or inconsistent Unicode.",
      "Compare drafts, check readability, and count sentences or paragraphs before publishing.",
      "Transform case, normalize text, or prepare cleaner copy for publishing and handoff.",
    ],
  },
  {
    aliases: [
      "encoding",
      "encoding tools",
      "developer encoding",
      "developer formatting tools",
      "base64 tools",
      "url tools",
      "html entity tools",
      "json tools",
    ],
    description:
      "Developer utilities for Base64, URLs, HTML entities, and JSON formatting in the browser.",
    featuredSlug: featuredEncodingPage?.slug ?? "",
    futureTools: plannedDevToolPages,
    intro:
      "Encoding tasks tend to be tiny, but they show up everywhere: debugging payloads, cleaning copied markup, escaping template snippets, and validating JSON before it hits an API. This hub keeps those fast browser-based encoding and formatting tools together so you can move between Base64, URLs, HTML entities, and JSON without breaking focus or writing a throwaway script.",
    key: "encoding",
    kind: "text",
    label: "encoding",
    metaDescription:
      "Encoding and decoding tools for Base64, URLs, HTML entities, and JSON. Format, validate, encode, and decode developer-facing data directly in your browser.",
    relatedCategoryKeys: ["text", "data", "length"],
    relatedTopics: ["base64 payloads", "url parameters", "html entities", "json formatting"],
    route: "/encoding-tools",
    slug: "encoding-tools",
    title: "Encoding & Decoding Tools",
    transforms: encodingToolPages,
    useCases: [
      "Encode or decode Base64, URLs, and HTML entities while debugging browser or API data.",
      "Format, minify, and validate JSON without switching to a code editor.",
      "Clean copied snippets and payload fragments before moving them into docs or templates.",
    ],
  },
  {
    aliases: [
      "color",
      "color tools",
      "hex",
      "rgb",
      "hsl",
      "hex rgb hsl",
      "designer color tools",
      "frontend color tools",
    ],
    description: "Convert color values between HEX, RGB, and HSL formats.",
    featuredSlug: featuredColorPage?.slug ?? "hex-to-rgb",
    featuredStandaloneSlugs: [
      "hex-to-rgb",
      "rgb-to-hex",
      "hex-to-hsl",
      "hsl-to-hex",
      "color-picker",
    ],
    futureTools: [],
    intro:
      "Color tools become useful the moment a visual choice needs to turn into production-ready values. Designers often start with a picked shade in a mockup, while frontend work may need HEX for CSS variables, RGB for graphics APIs, or HSL for more intuitive hue and lightness adjustments. This hub keeps those day-to-day conversions together in one lightweight place so you can move from a swatch or channel value to a copy-ready output without interrupting your workflow. It is built for UI work, design systems, prototypes, and handoff moments where speed matters, but clarity matters too. Instead of opening a full design app just to translate a color, you can jump straight to the format you need and keep working.",
    key: "color",
    kind: "text",
    label: "color",
    metaDescription:
      "Color tools for HEX, RGB, HSL, and live color picking. Useful for CSS work, design systems, UI handoff, and frontend styling workflows.",
    relatedCategoryKeys: ["text", "encoding"],
    relatedTopics: ["design systems", "CSS tokens", "UI handoff", "frontend styling"],
    route: "/color-tools",
    slug: "color-tools",
    title: "Color Conversion Tools",
    transforms: colorToolPages,
    useCases: [
      "Convert color values between design files, browser tools, and CSS code.",
      "Check HEX and RGB formats while working on themes, tokens, and UI states.",
      "Translate colors quickly during design handoff and frontend implementation.",
    ],
  },
  {
    aliases: [
      "developer tools",
      "developer utilities",
      "data conversion tools",
      "data format tools",
      "programming tools",
      "browser developer tools",
      "payload tools",
      "api debugging tools",
    ],
    description:
      "Developer tools for data formats, payload inspection, scheduling, IDs, hashing, and browser-based debugging.",
    featuredSlug: "regex-tester",
    featuredStandaloneSlugs: [
      "unix-timestamp-converter",
      "date-to-unix",
      "unix-to-date",
      "time-zone-converter",
    ],
    futureTools: plannedDevToolPages,
    intro:
      "Developer workflows are full of small format and inspection tasks that are annoying to do by hand but too common to keep rebuilding from scratch. You might need to turn CSV into JSON, decode a JWT from an API response, generate a cron schedule, hash a payload, or test a regex before shipping it into code. This hub groups those practical browser-based utilities with the existing time and data helpers so you can move from raw input to copy-ready output faster.",
    key: "dev-data",
    kind: "text",
    label: "dev-data",
    metaDescription:
      "Developer and data tools for JSON, CSV, XML, regex, JWT decoding, cron expressions, UUIDs, hashes, Unix timestamps, and time zones.",
    relatedCategoryKeys: ["encoding", "data", "text"],
    relatedTopics: ["API debugging", "payload formats", "timestamps", "developer workflows"],
    route: "/developer-tools",
    slug: "developer-tools",
    title: "Developer & Data Conversion Tools",
    transforms: devDataToolPages,
    useCases: [
      "Convert JSON, CSV, XML, Markdown, and YAML without leaving the browser.",
      "Inspect JWTs, test regex patterns, and generate cron expressions during debugging.",
      "Handle timestamps, hashes, UUIDs, and payload cleanup in one shared utility hub.",
    ],
  },
  {
    aliases: [
      "generator tools",
      "random generators",
      "random tools",
      "generator utilities",
      "online generator tools",
    ],
    description:
      "Random generators for numbers, names, passwords, colors, teams, and placeholder text in one browser-based hub.",
    featuredSlug: "random-password-generator",
    intro:
      "Generator tools are handy because they remove tiny bits of friction that keep showing up during design, QA, content prep, onboarding, and day-to-day operations. You might need a strong password, a clean test name list, a few balanced teams, a fresh color palette, or placeholder text that stays reproducible between screenshots. This hub groups those repeatable generation workflows into one shared family so they stay consistent, fast, and easy to extend.",
    key: "generator",
    kind: "interactive",
    label: "generator",
    metaDescription:
      "Generator tools for random numbers, names, passwords, colors, teams, random text, and lorem ipsum with browser-based outputs.",
    relatedCategoryKeys: ["text", "utility", "social", "color"],
    relatedTopics: [
      "placeholder content",
      "test data",
      "team shuffling",
      "design inspiration",
    ],
    route: "/generator-tools",
    slug: "generator-tools",
    title: "Generator Tools",
    useCases: [
      "Generate reproducible placeholder text, names, and numbers during design or QA work.",
      "Create stronger passwords, random teams, and quick palettes without switching apps.",
      "Keep small generation tasks inside one browser-based workflow with shared controls.",
    ],
  },
  {
    aliases: [
      "seo tools",
      "marketing tools",
      "seo marketing tools",
      "utm tools",
      "technical seo tools",
    ],
    description:
      "SEO and marketing tools for metadata, sitemaps, robots rules, campaign URLs, keyword review, and link inspection.",
    featuredSlug: "meta-tag-generator",
    intro:
      "SEO and marketing workflows often sit in an awkward middle ground. They are too structured for a plain text box, but too small to deserve a heavy analytics platform every time. This hub brings those practical browser-side tools together so you can generate metadata, audit links, build campaign URLs, and review draft copy without bouncing between five unrelated tabs.",
    key: "seo",
    kind: "interactive",
    label: "seo",
    metaDescription:
      "SEO and marketing tools for meta tags, robots.txt, sitemap XML, keyword density, SEO word counts, URL parsing, and UTM links.",
    relatedCategoryKeys: ["social", "utility", "text", "dev-data"],
    relatedTopics: [
      "metadata setup",
      "campaign links",
      "content audits",
      "technical seo basics",
    ],
    route: "/seo-marketing-tools",
    slug: "seo-marketing-tools",
    title: "SEO & Marketing Tools",
    useCases: [
      "Generate metadata, robots rules, and sitemap XML during a launch or migration.",
      "Inspect URLs and build UTM-tagged campaign links without a spreadsheet.",
      "Review keyword density and draft length before publishing a landing page or article.",
    ],
  },
  {
    aliases: [
      "social media tools",
      "social tools",
      "creator tools",
      "social writing tools",
      "social publishing tools",
    ],
    description:
      "Social media tools for hashtags, username ideas, Instagram-style fonts, bio formatting, and tweet-length checks.",
    featuredSlug: "hashtag-generator",
    intro:
      "Social publishing work moves quickly, which makes small utility tools disproportionately useful. You might need a quick hashtag set, a cleaner bio layout, a readable styled headline, or a last-minute length check before a post goes live. This hub groups those repeatable browser-side tasks into one shared workflow family for creators, marketers, and teams managing fast-moving campaigns.",
    key: "social",
    kind: "interactive",
    label: "social",
    metaDescription:
      "Social media tools for hashtag generation, username ideas, Instagram fonts, bio formatting, and tweet-length checks.",
    relatedCategoryKeys: ["seo", "utility", "text"],
    relatedTopics: [
      "creator workflows",
      "profile setup",
      "caption prep",
      "campaign publishing",
    ],
    route: "/social-media-tools",
    slug: "social-media-tools",
    title: "Social Media Tools",
    useCases: [
      "Generate hashtag and username ideas for a new profile or launch campaign.",
      "Format bios and stylized short text for profile and caption updates.",
      "Check post length and social-ready copy before publishing.",
    ],
  },
  {
    aliases: [
      "micro utilities",
      "design utilities",
      "css utilities",
      "frontend utility tools",
      "small design tools",
    ],
    curatedPageSlugs: ["favicon-generator"],
    description:
      "Micro utilities for password checks, color contrast, gradients, shadows, border radius, and quick design output.",
    featuredSlug: "color-contrast-checker",
    intro:
      "Some of the most useful site tools are the smallest ones. A contrast check, a quick gradient, a reusable box shadow, a favicon pack, or a password strength review can unblock a design or launch task in minutes. This hub collects those focused browser-side helpers into one family so design, product, and content work can keep moving without heavier software.",
    key: "utility",
    kind: "interactive",
    label: "utility",
    metaDescription:
      "Micro utility tools for password strength, color contrast, CSS gradients, box shadows, border radius, and favicon generation.",
    relatedCategoryKeys: ["seo", "social", "color", "image"],
    relatedTopics: [
      "accessibility checks",
      "css snippets",
      "launch polish",
      "small UI helpers",
    ],
    route: "/micro-utilities",
    slug: "micro-utilities",
    title: "Micro Design & Utility Tools",
    useCases: [
      "Check accessibility and generate small CSS snippets during UI polish work.",
      "Create gradients, shadows, and border-radius values without guesswork.",
      "Handle small launch tasks like password feedback and favicon generation in one place.",
    ],
  },
  {
    aliases: [
      "science calculators",
      "engineering calculators",
      "engineering tools",
      "electrical tools",
      "science tools",
      "engineering conversion tools",
    ],
    description:
      "Science and engineering tools for electrical formulas, signal power, torque, and viscosity conversions.",
    featuredSlug: "watts-to-amps",
    intro:
      "Science and engineering tools rarely fit into a simple one-number converter. Many of them need context like voltage, current, or a chosen unit family before the result is meaningful. This hub groups those practical calculators together so you can move from quick electrical checks to mechanical and fluid-style conversions without bouncing between unrelated pages.",
    key: "science",
    kind: "interactive",
    label: "science",
    metaDescription:
      "Science and engineering calculators for watts to amps, volts to watts, dBm to watts, torque conversion, and viscosity conversion.",
    relatedCategoryKeys: ["pressure", "temperature", "data"],
    relatedTopics: [
      "electrical formulas",
      "signal power",
      "mechanical torque",
      "fluid measurements",
    ],
    route: "/science-calculators",
    slug: "science-calculators",
    title: "Science & Engineering Tools",
    useCases: [
      "Estimate electrical current or power from everyday voltage and amp values.",
      "Translate dBm readings into watts for RF and networking work.",
      "Convert torque and viscosity units without building a one-off spreadsheet.",
    ],
  },
  {
    aliases: [
      "weather tools",
      "uv tools",
      "uv safety tools",
      "weather safety tools",
      "sun exposure tools",
    ],
    description:
      "Weather-focused tools for interpreting UV index risk levels and outdoor exposure guidance.",
    featuredSlug: "uv-index-calculator",
    intro:
      "Weather tools become more useful when they explain what the number means, not just what the number is. UV index is a good example: the same reading can feel abstract until you translate it into risk level, sun-protection urgency, and outdoor planning context. This hub keeps the first weather-safety tools focused on that practical interpretation.",
    key: "weather",
    kind: "interactive",
    label: "weather",
    metaDescription:
      "Weather and UV tools for checking UV index risk, dangerous exposure ranges, and outdoor planning guidance.",
    relatedCategoryKeys: ["temperature", "wind", "pressure", "rainfall"],
    relatedTopics: [
      "uv safety",
      "sun exposure",
      "outdoor planning",
      "weather awareness",
    ],
    route: "/weather-tools",
    slug: "weather-tools",
    title: "Weather & UV Tools",
    useCases: [
      "Check whether today’s UV index is low, moderate, high, or extreme.",
      "Explain UV ranges quickly before outdoor work, travel, or exercise.",
      "Turn a forecast number into clearer sun-protection guidance.",
    ],
  },
  {
    aliases: [
      "image tools",
      "image utilities",
      "image converter tools",
      "browser image tools",
      "photo tools",
      "favicon tools",
    ],
    description:
      "Browser-based image tools for format conversion, resizing, rotation, cropping, Base64 encoding, and favicon generation.",
    featuredSlug: "png-to-jpg",
    intro:
      "Image tasks show up everywhere: preparing a screenshot for docs, shrinking a file for upload, turning a logo into a favicon set, or converting a downloaded asset into the format a tool actually accepts. This hub brings those practical image workflows together in one place with a shared upload, preview, and download experience. The goal is to keep everyday image jobs small, local, and reliable, so you can fix or export the file you need without jumping into a heavier editor for every one-off change.",
    key: "image",
    kind: "interactive",
    label: "image",
    metaDescription:
      "Image tools for PNG to JPG, JPG to PNG, WEBP to PNG, SVG to PNG, resizing, cropping, rotating, Base64 image conversion, and favicon generation.",
    relatedCategoryKeys: ["file", "text", "color"],
    relatedTopics: ["asset prep", "image resizing", "favicon setup", "inline image encoding"],
    route: "/image-tools",
    slug: "image-tools",
    title: "Image Tools",
    useCases: [
      "Convert images between practical web-friendly formats without leaving the browser.",
      "Resize, crop, rotate, and compress assets before publishing or sharing them.",
      "Generate Base64 strings and favicon packs from one upload workflow.",
    ],
  },
  {
    aliases: [
      "file tools",
      "pdf tools",
      "browser file tools",
      "document tools",
      "pdf utilities",
    ],
    description:
      "Browser-based file tools for PDF text extraction, text-to-PDF creation, merging PDFs, and splitting PDFs.",
    featuredSlug: "pdf-to-text",
    intro:
      "File utilities often need more than a simple input and output field. PDF tasks especially need upload handling, validation, structured results, and sometimes multiple downloads from one action. This hub is built around that reality. It starts with practical PDF workflows like extraction, creation, merging, and splitting, all inside the same reusable file-processing system so the site can grow into broader file tooling without falling back to one-off page logic.",
    key: "file",
    kind: "interactive",
    label: "file",
    metaDescription:
      "File tools for PDF to text, text to PDF, merge PDF, and split PDF with browser-based processing, downloads, and clear result panels.",
    relatedCategoryKeys: ["image", "text", "dev-data"],
    relatedTopics: ["pdf workflows", "document handoff", "text extraction", "browser file utilities"],
    route: "/file-tools",
    slug: "file-tools",
    title: "File Tools",
    useCases: [
      "Extract text from PDFs and move it into editing or cleanup workflows quickly.",
      "Create, merge, and split PDFs in the browser without installing extra software.",
      "Use a consistent upload and result workflow for structured document utilities.",
    ],
  },
];

const categoryConfigByKey = categoryRegistry.reduce(
  (accumulator, category) => {
    accumulator[category.key] = category;
    return accumulator;
  },
  {} as Record<CategoryKey, CategorySchema>,
);

export const launchToolRegistry = categoryRegistry.reduce<LaunchToolPageSchema[]>(
  (accumulator, category) => {
    if (category.kind === "numeric") {
      accumulator.push(...category.pairPages);
    } else if (category.kind === "text") {
      accumulator.push(...category.transforms);
    }

    return accumulator;
  },
  [],
);

const toolConfigBySlug = Object.fromEntries(
  launchToolRegistry.map((tool) => [tool.slug, tool]),
) as Record<string, LaunchToolPageSchema>;

export const homepageConfig: HomePageConfig = {
  exampleQueries: [
    "kg to lbs",
    "cm to inches",
    "celsius to fahrenheit",
    "mph to kmh",
    "random number generator",
    "random password generator",
    "meta tag generator",
    "utm builder",
    "hashtag generator",
    "color contrast checker",
    "json to csv",
    "regex tester",
    "jwt decoder",
    "watts to amps",
    "uv index calculator",
    "png to jpg",
    "pdf to text",
    "merge pdf",
    "readability checker",
    "text diff",
    "lorem ipsum generator",
    "cups to grams",
    "mb to gb",
    "percentage calculator",
  ],
  featuredConverter: {
    categoryKey: "weight",
    fromUnitKey: "kg",
    toUnitKey: "lb",
    value: 75,
  },
  filterCategoryKeys: ["weight", "length", "volume", "temperature", "wind", "pressure", "rainfall", "data", "text"],
  hubCategoryKeys: [
    "weight",
    "length",
    "volume",
    "temperature",
    "wind",
    "pressure",
    "rainfall",
    "data",
    "text",
    "encoding",
    "color",
    "dev-data",
  ],
  popularToolSlugs: [
    buildUnitPairSlug("kg", "lb"),
    buildUnitPairSlug("cm", "inch"),
    buildUnitPairSlug("km", "mile"),
    buildUnitPairSlug("m", "ft"),
    buildUnitPairSlug("l", "gal"),
    buildUnitPairSlug("tbsp", "ml"),
    buildUnitPairSlug("mph", "kmh"),
    buildUnitPairSlug("hpa", "mmhg"),
    buildUnitPairSlug("rainmm", "raininch"),
    buildUnitPairSlug("mb", "gb"),
    buildUnitPairSlug("kb", "mb"),
    "pressure-unit-converter",
    "watts-to-amps",
    "uv-index-calculator",
    "random-number-generator",
    "random-password-generator",
    "random-color-generator",
    "random-text-generator",
    "lorem-ipsum-generator",
    "uppercase-converter",
    "reverse-text",
    "remove-line-breaks",
    "remove-extra-spaces",
    "word-counter",
    "character-counter",
    "normalize-unicode",
    "shuffle-lines",
    "slug-generator",
    "html-encode",
    "json-to-csv",
    "regex-tester",
    "jwt-decoder",
    "uuid-generator",
    "hash-generator",
    "cron-expression-generator",
    "meta-tag-generator",
    "utm-builder",
    "hashtag-generator",
    "color-contrast-checker",
    "png-to-jpg",
    "image-resizer",
    "favicon-generator",
    "pdf-to-text",
    "merge-pdf",
    "split-pdf",
    "snake-case-converter",
    "title-case-converter",
    "markdown-to-html",
    "yaml-to-json",
    "json-to-yaml",
  ],
};

export function getCategoryConfig(categoryKey: CategoryKey) {
  return categoryConfigByKey[categoryKey];
}

export function getCategoryAliases(categoryKey: LaunchCategoryKey) {
  return uniqueStrings(getCategoryConfig(categoryKey).aliases);
}

export function getNumericCategoryConfigs(): NumericCategorySchema[] {
  return categoryRegistry.filter(
    (category): category is NumericCategorySchema => category.kind === "numeric",
  );
}

export function getCategoryTools(categoryKey: CategoryKey) {
  const category = getCategoryConfig(categoryKey);
  if (category.kind === "numeric") {
    return [...category.pairPages];
  }

  if (category.kind === "text") {
    return [...category.transforms];
  }

  return [];
}

export function getLaunchToolConfig(slug: string) {
  return toolConfigBySlug[slug];
}

export function getNumericPairConfig(slug: string) {
  const tool = getLaunchToolConfig(slug);
  return tool?.kind === "numeric-pair" ? tool : undefined;
}

export function getTextTransformConfig(slug: string) {
  const tool = getLaunchToolConfig(slug);
  return tool?.kind === "text-transform" ? tool : undefined;
}

export function getToolPath(slug: string) {
  return `/${slug}` as const;
}

export function getToolAliases(tool: LaunchToolPageSchema) {
  return uniqueStrings(tool.aliases);
}

export function getToolLabel(tool: LaunchToolPageSchema) {
  if (tool.kind === "text-transform") {
    return tool.title;
  }

  if (tool.fromUnitKey === "floz" || tool.toUnitKey === "floz") {
    return `${getUnitPluralLabel(tool.fromUnitKey).toLowerCase()} to ${getUnitPluralLabel(
      tool.toUnitKey,
    ).toLowerCase()}`;
  }

  return `${getUnitSymbol(tool.fromUnitKey).toLowerCase()} to ${getUnitSymbol(
    tool.toUnitKey,
  ).toLowerCase()}`;
}

export function getRelatedToolSlugs(tool: LaunchToolPageSchema) {
  if (tool.relatedSlugs?.length) {
    return [...tool.relatedSlugs];
  }

  const categoryTools = getCategoryTools(tool.categoryKey).filter((entry) => entry.slug !== tool.slug);

  if (tool.kind === "numeric-pair") {
    const reverseSlug = buildUnitPairSlug(tool.toUnitKey, tool.fromUnitKey);
    const reverseTool = categoryTools.find((entry) => entry.slug === reverseSlug);
    const remainingTools = categoryTools.filter((entry) => entry.slug !== reverseSlug);

    return [reverseTool?.slug, ...remainingTools.map((entry) => entry.slug)]
      .filter((slug): slug is string => Boolean(slug))
      .slice(0, 5);
  }

  return categoryTools.map((entry) => entry.slug).slice(0, 5);
}

export function getRelatedTools(tool: LaunchToolPageSchema) {
  return getRelatedToolSlugs(tool)
    .map((slug) => getLaunchToolConfig(slug))
    .filter((entry): entry is LaunchToolPageSchema => Boolean(entry));
}

export function getCategoryHighlights(categoryKey: CategoryKey) {
  const category = getCategoryConfig(categoryKey);

  return category.relatedCategoryKeys.map((key) => getCategoryConfig(key)).filter(Boolean);
}

export function getSearchSuggestionEntries() {
  const toolEntries = launchToolRegistry.map((tool) => ({
    category: tool.categoryKey,
    entryType: "page" as const,
    href: getToolPath(tool.slug),
    keywords: uniqueStrings(getToolAliases(tool)),
    title: getToolLabel(tool),
  }));

  const categoryEntries = categoryRegistry.map((category) => ({
    category: category.key,
    entryType: "category" as const,
    href: category.route,
    keywords: uniqueStrings([
      ...category.aliases,
      ...(category.kind === "text"
        ? category.futureTools.flatMap((tool) => tool.aliases)
        : []),
      category.description,
      category.title,
    ]),
    title: category.title,
  }));

  return [...toolEntries, ...categoryEntries];
}

export function getHomepagePopularTools() {
  return homepageConfig.popularToolSlugs
    .map((slug) => getLaunchToolConfig(slug))
    .filter((tool): tool is LaunchToolPageSchema => Boolean(tool));
}

export function getHomepageFilterCategories() {
  return homepageConfig.filterCategoryKeys.map((key) => getCategoryConfig(key));
}

export function getHomepageHubCategories() {
  return homepageConfig.hubCategoryKeys.map((key) => getCategoryConfig(key));
}
