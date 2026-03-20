import type { CategoryKey, FaqEntry, StructuredContent } from "@/lib/config/registry/conversion-types";
import type {
  MeasurementFamilyKey,
  MeasurementUnitKey,
} from "@/lib/conversion/measurement-families";
import type { CronPreset } from "@/lib/conversion/developer-helpers";
import type { FileToolId } from "@/lib/file-tools/types";
import type { GeneratorToolId } from "@/lib/generator-tools/types";
import type { SearchEntry } from "@/lib/search";
import { fileToolPages } from "@/lib/content/file-tool-pages";
import { generatorToolPages } from "@/lib/content/generator-tool-pages";
import { utilityToolPages } from "@/lib/content/utility-tool-pages";
import type { UtilityToolId } from "@/lib/utility-tools/types";

export type InteractiveToolWidgetConfig =
  | {
      defaultAmps?: number;
      defaultPowerFactor?: number;
      defaultVolts: number;
      defaultWatts?: number;
      kind: "electrical-power";
      mode: "voltsToWatts" | "wattsToAmps";
    }
  | {
      defaultDayOfMonth: number;
      defaultDayOfWeek: number;
      defaultHour: number;
      defaultMinute: number;
      defaultPreset: CronPreset;
      kind: "cron-expression";
    }
  | {
      defaultDbm: number;
      kind: "dbm-to-watts";
    }
  | {
      defaultText: string;
      kind: "hash-generator";
    }
  | {
      defaultToken: string;
      kind: "jwt-decoder";
    }
  | {
      defaultText: string;
      kind: "readability-checker";
    }
  | {
      defaultFromUnitKey: MeasurementUnitKey;
      defaultToUnitKey: MeasurementUnitKey;
      defaultValue: number;
      familyKey: MeasurementFamilyKey;
      kind: "measurement-family";
    }
  | {
      defaultLeftText: string;
      defaultRightText: string;
      kind: "text-diff";
    }
  | {
      defaultFlags: string;
      defaultPattern: string;
      defaultSampleText: string;
      kind: "regex-tester";
    }
  | {
      kind: "generator-tool";
      toolId: GeneratorToolId;
    }
  | {
      defaultCount: number;
      kind: "uuid-generator";
    }
  | {
      defaultValue: number;
      kind: "uv-index";
      mode?: "calculator" | "guide";
    }
  | {
      kind: "file-tool";
      toolId: FileToolId;
    }
  | {
      kind: "utility-tool";
      toolId: UtilityToolId;
    };

export type InteractiveToolExample = {
  expression: string;
  note?: string;
  result: string;
};

export type InteractiveToolPageDefinition = {
  aliases: readonly string[];
  categoryKey: CategoryKey;
  description: string;
  examples: readonly InteractiveToolExample[];
  faq: readonly FaqEntry[];
  kind: "interactive-tool";
  keywords: readonly string[];
  longDescription: StructuredContent;
  metaDescription?: string;
  relatedSlugs: readonly string[];
  route: `/${string}`;
  slug: string;
  title: string;
  useCases: readonly string[];
  widget: InteractiveToolWidgetConfig;
};

type InteractiveToolSeed = Omit<InteractiveToolPageDefinition, "kind" | "longDescription" | "route"> & {
  overview: readonly string[];
  supportingNotes: readonly string[];
};

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values)];
}

function buildInteractiveLongDescription(
  title: string,
  overview: readonly string[],
  supportingNotes: readonly string[],
  useCases: readonly string[],
): StructuredContent {
  return {
    sections: [
      {
        heading: "How this tool works",
        paragraphs: overview,
      },
      {
        heading: "Where it is useful",
        listItems: useCases,
        paragraphs: supportingNotes,
      },
    ],
    title: `About the ${title.toLowerCase()}`,
  };
}

const interactiveToolSeeds: InteractiveToolSeed[] = [
  {
    aliases: [
      "readability checker",
      "readability score checker",
      "text readability checker",
      "flesch reading ease checker",
    ],
    categoryKey: "text",
    description:
      "Check a passage with a live readability score, clear difficulty label, and quick explanation.",
    examples: [
      { expression: "Short plain paragraph", result: "Score 78.4, fairly easy" },
      { expression: "Dense technical copy", result: "Score 34.6, difficult" },
      { expression: "Typical business writing", result: "Score 61.2, standard" },
    ],
    faq: [
      {
        answer:
          "It uses the Flesch Reading Ease formula, which looks at sentence length and syllables per word to estimate how easy the text feels to read.",
        question: "What does the readability checker measure?",
      },
      {
        answer:
          "Not by itself. It is a quick indicator that helps you spot dense writing, but tone, structure, and audience still matter.",
        question: "Can one score tell me whether my writing is good?",
      },
      {
        answer:
          "Scores around the standard or fairly easy range are often easier for broad web audiences, but the best target depends on who the text is for.",
        question: "What readability score should I aim for?",
      },
    ],
    keywords: [
      "readability checker",
      "reading ease score",
      "flesch reading ease",
      "text readability score",
    ],
    overview: [
      "Readability tools work best when they explain the score instead of just printing a number. This page translates the result into an easy label and a short editorial interpretation.",
      "It is useful for blog drafts, landing pages, help content, product copy, and other text where clarity matters more than academic precision.",
    ],
    relatedSlugs: ["sentence-counter", "paragraph-counter", "text-compare-tool"],
    slug: "readability-checker",
    supportingNotes: [
      "The score updates live as you edit, so it is easy to see whether shorter sentences or simpler wording are helping.",
      "Because the widget is shared and config-driven, the same pattern can support future writing and SEO tools without a one-off page build.",
    ],
    title: "Readability Checker",
    useCases: [
      "Review draft copy before publishing a blog post or landing page.",
      "Simplify help-center or onboarding text for a broader audience.",
      "Compare two revisions and see whether the rewritten version reads more easily.",
    ],
    widget: {
      defaultText:
        "Our support team reviews every request within one business day. Clear screenshots and a short summary help us solve issues faster. If the problem blocks your launch, include the deadline so we can prioritize the response.",
      kind: "readability-checker",
    },
  },
  {
    aliases: [
      "text diff",
      "text compare tool",
      "compare text",
      "line by line text diff",
    ],
    categoryKey: "text",
    description:
      "Compare two text blocks side by side, line by line, and see a quick summary of what changed.",
    examples: [
      { expression: "One revised line", result: "2 matching lines, 1 removed, 1 added" },
      { expression: "Extra line added", result: "3 matching lines, 1 added" },
      { expression: "Two empty inputs", result: "100% similarity, no differences" },
    ],
    faq: [
      {
        answer:
          "This tool compares text line by line, which is practical for notes, prompts, lists, config snippets, and draft revisions.",
        question: "How does the text compare tool decide what changed?",
      },
      {
        answer:
          "Yes. Blank lines are treated as real lines so spacing changes can still appear in the diff summary.",
        question: "Does the diff keep blank lines and spacing changes in view?",
      },
      {
        answer:
          "It is ideal for quick browser-based checks, but it is not meant to replace a full version-control diff for large code changes.",
        question: "Should I use this instead of a code diff viewer?",
      },
    ],
    keywords: [
      "text diff",
      "compare text online",
      "line diff tool",
      "text comparison tool",
    ],
    overview: [
      "Many compare tools are overkill when you just want to paste two short versions and understand the edits quickly. This page focuses on that smaller, practical workflow.",
      "The summary counts make it easy to see whether most lines stayed the same, while the detailed list highlights which lines only exist on one side.",
    ],
    relatedSlugs: ["readability-checker", "remove-duplicate-lines", "sort-lines"],
    slug: "text-compare-tool",
    supportingNotes: [
      "It is especially useful when reviewing prompt variations, copied lists, release notes, or two versions of marketing copy.",
      "Because it runs entirely in the browser, it is also a comfortable option for quick private comparisons.",
    ],
    title: "Text Compare Tool",
    useCases: [
      "Compare two short drafts before sending an edit for review.",
      "Check whether copied lists or notes have drifted apart.",
      "Review prompt, config, or outline changes without leaving the browser.",
    ],
    widget: {
      defaultLeftText: "Launch checklist\nConfirm analytics\nDraft release notes",
      defaultRightText:
        "Launch checklist\nConfirm analytics setup\nDraft release notes\nSchedule announcement",
      kind: "text-diff",
    },
  },
  {
    aliases: [
      "uuid generator",
      "generate uuid",
      "uuid v4 generator",
      "random uuid generator",
    ],
    categoryKey: "dev-data",
    description: "Generate one or more UUID v4 values locally with copy-ready output for fixtures and app setup.",
    examples: [
      { expression: "1 UUID", result: "One copy-ready UUID v4 value" },
      { expression: "5 UUIDs", result: "Five unique UUID v4 values for fixtures or seed data" },
      { expression: "25 UUIDs", result: "A capped bulk set for quick browser-based generation" },
    ],
    faq: [
      {
        answer:
          "It generates RFC 4122 version 4 UUIDs, which are random-style identifiers commonly used in application data and test fixtures.",
        question: "What kind of UUID does this tool generate?",
      },
      {
        answer:
          "Yes. The widget uses browser-safe randomness and generates values locally without sending the input or output anywhere.",
        question: "Does the UUID generator run locally?",
      },
      {
        answer:
          "Use one when you need a quick ID, or generate a batch when you are setting up fixture data, mock records, or migration samples.",
        question: "When should I generate multiple UUIDs at once?",
      },
    ],
    keywords: [
      "uuid generator",
      "uuid v4 generator",
      "generate uuid online",
      "random unique id generator",
    ],
    overview: [
      "UUID generation is one of those tiny developer tasks that keeps showing up during setup, QA, and data mocking. This page keeps it fast and copy-friendly without requiring a terminal or a scratch script.",
      "Because the tool can generate several values at once, it works well for seed data, demos, fixtures, and quick browser-side checks.",
    ],
    relatedSlugs: ["hash-generator", "regex-tester", "json-to-csv"],
    slug: "uuid-generator",
    supportingNotes: [
      "The output stays local to the browser and is ready to copy as a single item or as a newline-separated list.",
      "It also gives the dev-data hub a reusable pattern for future generator-style tools that need only a few inputs and a structured result area.",
    ],
    title: "UUID Generator",
    useCases: [
      "Create IDs for fixtures, mock records, and local development data.",
      "Generate sample identifiers during API and database testing.",
      "Copy a batch of UUIDs quickly without opening a terminal.",
    ],
    widget: {
      defaultCount: 5,
      kind: "uuid-generator",
    },
  },
  {
    aliases: ["regex tester", "regex test tool", "test regex online", "regular expression tester"],
    categoryKey: "dev-data",
    description: "Test regex patterns against sample text with live matches, captures, flags, and error handling.",
    examples: [
      { expression: "\\b(error|warning)\\b with gi", result: "Matches every error or warning token" },
      { expression: "^[A-Z]{3}-\\d+$", result: "Checks whether a value matches a strict code format" },
      { expression: "(?<tag>#[a-z]+)", result: "Shows captures for hashtag-style matches" },
    ],
    faq: [
      {
        answer:
          "It applies the pattern and flags directly in the browser, then shows the matched text, position, and captured groups for each result.",
        question: "What does the regex tester show me?",
      },
      {
        answer:
          "Yes. Invalid patterns or unsupported flags surface a clear error message instead of failing silently.",
        question: "Does the regex tester handle malformed expressions?",
      },
      {
        answer:
          "The global flag finds every match in the sample text. Without it, the tool reports only the first match, which mirrors standard JavaScript regex behavior.",
        question: "Why do the results change when I add the global flag?",
      },
    ],
    keywords: [
      "regex tester",
      "regular expression tester",
      "test regex online",
      "javascript regex tool",
    ],
    overview: [
      "Regex work is much easier when the pattern, flags, input text, and match results are visible together. This page is built around that tight feedback loop.",
      "Instead of just telling you that a pattern matched, it also shows positions and captures so debugging feels more concrete.",
    ],
    relatedSlugs: ["jwt-decoder", "hash-generator", "uuid-generator"],
    slug: "regex-tester",
    supportingNotes: [
      "It is useful for data cleanup rules, validation experiments, parser prototypes, and quick JavaScript-style regex checks.",
      "Because the widget is registry-driven, future structured dev tools can reuse the same interactive page path instead of branching into one-off routes.",
    ],
    title: "Regex Tester",
    useCases: [
      "Test validation and extraction patterns against pasted sample text.",
      "Debug captures and flags before moving a regex into application code.",
      "Check whether a pattern behaves globally or only on the first match.",
    ],
    widget: {
      defaultFlags: "gi",
      defaultPattern: "\\b(error|warning)\\b",
      defaultSampleText:
        "warning: disk space low\nall clear\na second error arrived\nanother WARNING line",
      kind: "regex-tester",
    },
  },
  {
    aliases: ["jwt decoder", "decode jwt", "jwt token decoder", "jwt parser"],
    categoryKey: "dev-data",
    description: "Decode JWT headers and payloads locally, inspect claims, and check expiration details quickly.",
    examples: [
      { expression: "Valid JWT", result: "Decoded header, payload, and signature segments" },
      { expression: "JWT with exp", result: "Expiration timestamp and expired state become visible" },
      { expression: "Malformed token", result: "Clear error instead of a broken output panel" },
    ],
    faq: [
      {
        answer:
          "It decodes the Base64URL header and payload, then parses the JSON claims so you can inspect them directly in the browser.",
        question: "What does the JWT decoder actually do?",
      },
      {
        answer:
          "No. This tool does not verify the signature or confirm trust. It is meant for inspection and debugging, not token validation.",
        question: "Does decoding a JWT verify that it is valid?",
      },
      {
        answer:
          "When the payload includes an exp claim, the widget converts it into an ISO timestamp and marks whether the token appears expired.",
        question: "How does the decoder handle expiration data?",
      },
    ],
    keywords: ["jwt decoder", "decode jwt", "jwt token parser", "jwt payload viewer"],
    overview: [
      "JWTs are often easy to inspect but annoying to decode by hand, especially when you just want to verify a claim or timestamp quickly. This tool makes that browser workflow faster.",
      "The output keeps the header, payload, and signature segment separate so it is easier to reason about what the token contains and what it does not prove.",
    ],
    relatedSlugs: ["regex-tester", "hash-generator", "json-formatter"],
    slug: "jwt-decoder",
    supportingNotes: [
      "It is useful during API debugging, auth troubleshooting, webhook inspection, and local development work.",
      "The tool stays client-safe and explains its limits clearly, which is a better fit than pretending it performs signature verification.",
    ],
    title: "JWT Decoder",
    useCases: [
      "Inspect claims during auth, API, and webhook debugging.",
      "Check exp, sub, aud, or custom fields without decoding manually.",
      "Compare token payloads quickly while troubleshooting environment issues.",
    ],
    widget: {
      defaultToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNvbnZlcnRDZW50ZXIiLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6NDEwMjQ0NDgwMH0.signature",
      kind: "jwt-decoder",
    },
  },
  {
    aliases: [
      "cron expression generator",
      "cron generator",
      "build cron expression",
      "cron schedule generator",
    ],
    categoryKey: "dev-data",
    description: "Build 5-field cron expressions from simple schedule inputs with a live explanation of the result.",
    examples: [
      { expression: "Daily at 09:00", result: "0 9 * * *" },
      { expression: "Weekly on Monday at 09:15", result: "15 9 * * 1" },
      { expression: "Monthly on day 1 at 00:00", result: "0 0 1 * *" },
    ],
    faq: [
      {
        answer:
          "This tool generates standard 5-field cron expressions in the order minute, hour, day of month, month, and day of week.",
        question: "What cron format does the generator use?",
      },
      {
        answer:
          "Yes. The widget is designed for common recurring schedules like hourly, daily, weekly, or monthly jobs where a full raw cron editor would be slower.",
        question: "Can I use this for simple recurring task schedules?",
      },
      {
        answer:
          "It is intentionally focused on common presets. For advanced vendor-specific extensions, treat it as a clean starting point rather than a complete cron IDE.",
        question: "Does the generator support every cron variant?",
      },
    ],
    keywords: [
      "cron expression generator",
      "cron builder",
      "cron schedule tool",
      "generate cron expression",
    ],
    overview: [
      "Cron syntax is compact, but not always memorable. This page turns common schedules into a copy-ready expression and a plain-English explanation at the same time.",
      "That makes it useful for job schedulers, automation tasks, internal docs, and quick ops-style checks where you want to avoid small cron mistakes.",
    ],
    relatedSlugs: ["time-zone-converter", "unix-timestamp-converter", "regex-tester"],
    slug: "cron-expression-generator",
    supportingNotes: [
      "It is particularly helpful when a dashboard or config file expects cron but the person writing it is thinking in times and recurrence rules instead.",
      "The preset-driven widget is also a good reusable pattern for future configuration helpers that need a few inputs and a structured explanation.",
    ],
    title: "Cron Expression Generator",
    useCases: [
      "Create cron schedules for recurring jobs without memorizing field order.",
      "Translate a human schedule into a copy-ready cron expression.",
      "Double-check hourly, daily, weekly, or monthly timing before deploying a task.",
    ],
    widget: {
      defaultDayOfMonth: 1,
      defaultDayOfWeek: 1,
      defaultHour: 9,
      defaultMinute: 0,
      defaultPreset: "daily",
      kind: "cron-expression",
    },
  },
  {
    aliases: ["hash generator", "md5 generator", "sha256 generator", "text hash generator"],
    categoryKey: "dev-data",
    description: "Generate MD5 and SHA-256 hashes locally for pasted text with copy-ready digest output.",
    examples: [
      { expression: "hello", result: "MD5 and SHA-256 digests for a short string" },
      { expression: "JSON payload", result: "Stable digests for fixture and integrity checks" },
      { expression: "Config snippet", result: "Quick digest comparison without leaving the browser" },
    ],
    faq: [
      {
        answer:
          "This page generates MD5 and SHA-256 from the pasted text so you can compare digests or copy the values directly.",
        question: "Which hashes does the generator support?",
      },
      {
        answer:
          "It is useful for quick checks, fixtures, and comparisons, but a browser hash tool is not a substitute for a full security workflow or signature system.",
        question: "Is this hash generator meant for security-critical verification?",
      },
      {
        answer:
          "Because the widget recalculates as you type, it is easy to confirm whether a small input change produces a completely different digest.",
        question: "Why is live hashing useful during development?",
      },
    ],
    keywords: ["hash generator", "md5 hash generator", "sha256 hash generator", "text digest tool"],
    overview: [
      "Hashing is a common developer task when you need a quick checksum, a reproducible fixture value, or a way to compare whether two strings are truly identical.",
      "This page focuses on the practical browser workflow: paste text, get common digests, and copy the result without extra setup.",
    ],
    relatedSlugs: ["uuid-generator", "jwt-decoder", "json-validator"],
    slug: "hash-generator",
    supportingNotes: [
      "The live side-by-side digests make it easier to compare common formats without switching tools.",
      "Keeping the logic client-safe also makes the page comfortable for quick local checks and documentation examples.",
    ],
    title: "Hash Generator",
    useCases: [
      "Generate MD5 and SHA-256 digests for test strings and fixtures.",
      "Compare whether two inputs resolve to the same checksum.",
      "Create copy-ready hashes while documenting or debugging an integration.",
    ],
    widget: {
      defaultText: "ConvertCenter developer hash example",
      kind: "hash-generator",
    },
  },
  {
    aliases: [
      "general pressure converter",
      "pressure unit converter",
      "pressure conversion calculator",
      "convert pressure units",
    ],
    categoryKey: "pressure",
    description: "Convert between hPa, mmHg, bar, and psi in one general pressure converter.",
    examples: [
      { expression: "1013.25 hPa", result: "760 mmHg" },
      { expression: "2 bar", result: "29.0075 psi" },
      { expression: "35 psi", result: "2.4132 bar" },
    ],
    faq: [
      {
        answer: "It covers hectopascals, millimeters of mercury, bar, and psi in a single converter.",
        question: "Which pressure units does this converter support?",
      },
      {
        answer: "Use hPa and mmHg for weather and aviation references, or bar and psi for gauges, compressors, and tire pressure.",
        question: "When is a general pressure converter more useful than a pair page?",
      },
      {
        answer: "Yes. It uses the same conversion factors as the dedicated pair pages, but keeps all supported units in one tool.",
        question: "Is this pressure converter accurate enough for reference work?",
      },
    ],
    keywords: [
      "general pressure converter",
      "pressure unit calculator",
      "pressure units",
      "hpa mmhg bar psi",
    ],
    overview: [
      "Pressure values often jump between weather, medical, automotive, and industrial systems. A general converter is useful when you do not want to choose a separate page for every pair.",
      "This tool keeps the most common pressure units in one interface so you can compare atmospheric readings, gauge values, and workshop references more quickly.",
    ],
    relatedSlugs: ["hpa-to-mmhg", "mmhg-to-hpa", "bar-to-psi"],
    slug: "pressure-unit-converter",
    supportingNotes: [
      "It is especially helpful when a reading arrives in one unit but the destination reference or manual uses another.",
      "Because the tool is unit-family based, it scales well as more pressure use cases or unit families are added later.",
    ],
    title: "General Pressure Converter",
    useCases: [
      "Translate atmospheric pressure between hPa and mmHg.",
      "Switch compressor, regulator, or tire values between bar and psi.",
      "Compare mixed-unit technical references without manual formulas.",
    ],
    widget: {
      defaultFromUnitKey: "pressure:hpa",
      defaultToUnitKey: "pressure:mmhg",
      defaultValue: 1013.25,
      familyKey: "pressure",
      kind: "measurement-family",
    },
  },
  {
    aliases: ["watts to amps", "watt to amp", "convert watts to amps", "amps from watts"],
    categoryKey: "science",
    description: "Calculate amps from watts, volts, and optional power factor in one quick tool.",
    examples: [
      { expression: "1200 W at 120 V", result: "10 A" },
      { expression: "1500 W at 230 V", result: "6.5217 A" },
      { expression: "1000 W at 120 V, PF 0.8", result: "10.4167 A", note: "includes power factor" },
    ],
    faq: [
      {
        answer: "For a simple single-phase estimate, amps equals watts divided by volts times power factor.",
        question: "What formula does the watts to amps calculator use?",
      },
      {
        answer: "Use 1 for resistive or DC-style estimates. Lower values help model AC loads where current and voltage are not perfectly aligned.",
        question: "Why does this calculator include power factor?",
      },
      {
        answer: "No. Voltage must be greater than zero or the current calculation becomes undefined.",
        question: "Can I convert watts to amps without a voltage value?",
      },
    ],
    keywords: [
      "watts to amps formula",
      "amp calculator",
      "power to current calculator",
      "electrical current from watts",
    ],
    overview: [
      "Watts to amps is not a pure unit conversion because the result depends on voltage, and sometimes power factor. That makes it a calculator rather than a simple pair page.",
      "This tool keeps the needed electrical inputs together so the current estimate is easier to check and explain.",
    ],
    relatedSlugs: ["volts-to-watts", "dbm-to-watts", "pressure-unit-converter"],
    slug: "watts-to-amps",
    supportingNotes: [
      "It is useful for appliance planning, rough electrical load checks, and quick educational reference.",
      "When power factor matters, the calculator gives a better estimate than the simplified watts divided by volts shortcut.",
    ],
    title: "Watts to Amps Calculator",
    useCases: [
      "Estimate circuit current from a known wattage and supply voltage.",
      "Check appliance or equipment current draw quickly.",
      "Compare how the same wattage behaves at different voltages.",
    ],
    widget: {
      defaultPowerFactor: 1,
      defaultVolts: 120,
      defaultWatts: 1200,
      kind: "electrical-power",
      mode: "wattsToAmps",
    },
  },
  {
    aliases: ["volts to watts", "volt to watt", "convert volts to watts", "watts from volts and amps"],
    categoryKey: "science",
    description: "Calculate watts from volts, amps, and optional power factor in one simple tool.",
    examples: [
      { expression: "120 V at 5 A", result: "600 W" },
      { expression: "230 V at 10 A", result: "2300 W" },
      { expression: "240 V at 12 A, PF 0.9", result: "2592 W", note: "includes power factor" },
    ],
    faq: [
      {
        answer: "The calculator multiplies volts by amps and then applies the power factor when provided.",
        question: "What formula does the volts to watts calculator use?",
      },
      {
        answer: "You still need current. Voltage alone is not enough to determine wattage.",
        question: "Can volts be converted directly to watts without amps?",
      },
      {
        answer: "Yes. Use a power factor below 1 when you want a more realistic AC estimate instead of a purely resistive one.",
        question: "Should I use power factor for AC equipment?",
      },
    ],
    keywords: [
      "volts to watts formula",
      "power calculator",
      "watts from amps and volts",
      "electrical power from voltage",
    ],
    overview: [
      "Volts to watts calculations need current input because wattage depends on both voltage and amperage. That is why a dedicated calculator is more accurate than treating it as a direct conversion.",
      "This page is built for quick electrical reference work where you want the formula, result, and assumptions together.",
    ],
    relatedSlugs: ["watts-to-amps", "dbm-to-watts", "pressure-unit-converter"],
    slug: "volts-to-watts",
    supportingNotes: [
      "It is useful for equipment planning, educational examples, and checking rough power draw from known circuit values.",
      "Keeping amps and power factor in view also makes the result easier to validate against a spec sheet.",
    ],
    title: "Volts to Watts Calculator",
    useCases: [
      "Estimate wattage from voltage and measured current.",
      "Check load size before comparing equipment or outlet limits.",
      "Use a quick power-factor-aware reference during troubleshooting.",
    ],
    widget: {
      defaultAmps: 5,
      defaultPowerFactor: 1,
      defaultVolts: 120,
      kind: "electrical-power",
      mode: "voltsToWatts",
    },
  },
  {
    aliases: ["dbm to watts", "dbm to watt", "convert dbm to watts", "rf power dbm to watts"],
    categoryKey: "science",
    description: "Convert dBm into watts and milliwatts with a fast logarithmic power calculator.",
    examples: [
      { expression: "30 dBm", result: "1 W" },
      { expression: "20 dBm", result: "0.1 W" },
      { expression: "0 dBm", result: "0.001 W", note: "1 milliwatt reference" },
    ],
    faq: [
      {
        answer: "dBm is decibels referenced to 1 milliwatt, so the conversion uses watts = 10^((dBm - 30) / 10).",
        question: "What formula converts dBm to watts?",
      },
      {
        answer: "Yes. The result card also shows milliwatts because dBm is defined against a 1 mW reference point.",
        question: "Does the tool show milliwatts too?",
      },
      {
        answer: "This page is useful for RF power, wireless links, and signal-chain comparisons where logarithmic values need a linear watt reading.",
        question: "When would I use dBm to watts instead of staying in dBm?",
      },
    ],
    keywords: [
      "dbm calculator",
      "rf power converter",
      "dbm to milliwatts",
      "signal power watts",
    ],
    overview: [
      "dBm values are easy to compare on a logarithmic scale, but watts are often easier to interpret in a physical system. This page converts between those perspectives for a faster reference workflow.",
      "The tool also surfaces milliwatts, which helps when the result is small and a full-watt figure feels less intuitive.",
    ],
    relatedSlugs: ["watts-to-amps", "volts-to-watts", "pressure-unit-converter"],
    slug: "dbm-to-watts",
    supportingNotes: [
      "It is useful in RF, wireless networking, signal distribution, and lab-style measurement work.",
      "Because dBm values span large ranges cleanly, turning them into watts helps bridge spec sheets and real-world intuition.",
    ],
    title: "dBm to Watts Calculator",
    useCases: [
      "Translate RF or wireless signal power into watts.",
      "Compare dBm readings with linear power values from a spec sheet.",
      "Check milliwatt-scale outputs without doing logarithmic math manually.",
    ],
    widget: {
      defaultDbm: 30,
      kind: "dbm-to-watts",
    },
  },
  {
    aliases: ["torque converter", "convert torque units", "nm to lb ft", "lb ft to nm"],
    categoryKey: "science",
    description: "Convert torque units like N·m, lb-ft, lb-in, and kgf·m in one general converter.",
    examples: [
      { expression: "100 N·m", result: "73.7562 lb-ft" },
      { expression: "50 lb-ft", result: "67.7909 N·m" },
      { expression: "12 lb-in", result: "1 lb-ft", note: "common fastener reference" },
    ],
    faq: [
      {
        answer: "It supports newton-meters, pound-feet, pound-inches, and kilogram-force meters.",
        question: "Which torque units are included?",
      },
      {
        answer: "Torque conversions are useful for automotive specs, fastener tightening, machine setup, and workshop documentation.",
        question: "When do I need a torque converter?",
      },
      {
        answer: "Yes. It uses direct linear conversion factors between the supported torque units.",
        question: "Is the torque converter suitable for reference use?",
      },
    ],
    keywords: [
      "nm to lb ft",
      "lb ft to nm",
      "torque unit converter",
      "fastener torque conversion",
    ],
    overview: [
      "Torque specs frequently move between metric and imperial systems, especially in automotive and industrial references. A general converter is faster than opening separate pages for each pair.",
      "This page keeps the most common torque units in one tool so fastener, engine, and workshop values are easier to compare.",
    ],
    relatedSlugs: ["viscosity-converter", "watts-to-amps", "pressure-unit-converter"],
    slug: "torque-converter",
    supportingNotes: [
      "It is useful when manuals, tools, and torque wrench markings do not use the same unit system.",
      "A family-based converter also makes it straightforward to expand torque coverage later without adding many pair routes.",
    ],
    title: "Torque Converter",
    useCases: [
      "Convert tightening specs from N·m to lb-ft or lb-in.",
      "Compare workshop manuals written in different unit systems.",
      "Check engine, wheel, and fastener torque references quickly.",
    ],
    widget: {
      defaultFromUnitKey: "torque:nm",
      defaultToUnitKey: "torque:lbft",
      defaultValue: 100,
      familyKey: "torque",
      kind: "measurement-family",
    },
  },
  {
    aliases: ["viscosity converter", "convert viscosity units", "cp to pas", "centipoise converter"],
    categoryKey: "science",
    description: "Convert dynamic viscosity units like cP, mPa·s, Pa·s, and poise.",
    examples: [
      { expression: "1000 cP", result: "1 Pa·s" },
      { expression: "250 cP", result: "2.5 P" },
      { expression: "1 mPa·s", result: "1 cP", note: "water-style reference scale" },
    ],
    faq: [
      {
        answer: "This tool focuses on dynamic viscosity and supports centipoise, millipascal-seconds, pascal-seconds, and poise.",
        question: "Which viscosity units are included?",
      },
      {
        answer: "It is useful for fluids, coatings, lab notes, and industrial product specs that report viscosity in different systems.",
        question: "Who uses a viscosity converter?",
      },
      {
        answer: "Yes. For the supported dynamic-viscosity units, the conversion is linear and reference-friendly.",
        question: "Is viscosity conversion straightforward between these units?",
      },
    ],
    keywords: [
      "cp to pas",
      "viscosity units",
      "centipoise converter",
      "dynamic viscosity calculator",
    ],
    overview: [
      "Viscosity values often appear in lab sheets, product data, and fluid references, but not always in the same unit. A family converter makes comparison faster than re-deriving the factor each time.",
      "This page focuses on dynamic viscosity so the available units stay coherent and easier to trust.",
    ],
    relatedSlugs: ["torque-converter", "dbm-to-watts", "pressure-unit-converter"],
    slug: "viscosity-converter",
    supportingNotes: [
      "It helps when a formulation sheet, material supplier, and internal note all use different viscosity labels.",
      "Because cP and mPa·s line up directly, the converter also makes it easier to spot familiar water-like benchmarks.",
    ],
    title: "Viscosity Converter",
    useCases: [
      "Translate viscosity specs across lab, industrial, and product references.",
      "Compare cP, Pa·s, and poise values without manual factors.",
      "Check fluid-property notes while working across different data sources.",
    ],
    widget: {
      defaultFromUnitKey: "viscosity:cp",
      defaultToUnitKey: "viscosity:pas",
      defaultValue: 1000,
      familyKey: "viscosity",
      kind: "measurement-family",
    },
  },
  {
    aliases: ["uv index calculator", "calculate uv risk", "uv level checker", "uv danger calculator"],
    categoryKey: "weather",
    description: "Check what a UV index number means and whether the current level is low, high, or extreme.",
    examples: [
      { expression: "UV 2", result: "Low risk" },
      { expression: "UV 6", result: "High risk" },
      { expression: "UV 11", result: "Extreme risk" },
    ],
    faq: [
      {
        answer: "The calculator maps your UV value to the standard low, moderate, high, very high, and extreme categories.",
        question: "What does the UV index calculator tell me?",
      },
      {
        answer: "Most practical guidance treats 6 and above as dangerous enough to require deliberate sun protection.",
        question: "At what UV index does exposure become dangerous?",
      },
      {
        answer: "Yes. A moderate reading may still deserve sunscreen and shade if you plan to stay outside for a long time.",
        question: "Can a moderate UV index still matter?",
      },
    ],
    keywords: [
      "uv index risk",
      "uv safety",
      "sun exposure calculator",
      "uv level meaning",
    ],
    overview: [
      "UV index is most useful when it is translated into a risk category and a practical next step. This calculator helps turn the number into something you can act on more quickly.",
      "It keeps the full scale visible so a single reading also makes sense in the context of the broader UV range.",
    ],
    relatedSlugs: ["what-uv-index-is-dangerous", "pressure-unit-converter", "hpa-to-mmhg"],
    slug: "uv-index-calculator",
    supportingNotes: [
      "The page is useful for outdoor work, travel, exercise, school activities, and general weather awareness.",
      "It also works well as an explainer page because the same tool shows both the current category and the larger UV scale.",
    ],
    title: "UV Index Calculator",
    useCases: [
      "Interpret a forecast UV number before going outside.",
      "Decide when sunscreen, shade, and protective clothing matter more.",
      "Explain UV categories to teams, families, or students quickly.",
    ],
    widget: {
      defaultValue: 7,
      kind: "uv-index",
      mode: "calculator",
    },
  },
  {
    aliases: [
      "what uv index is dangerous",
      "dangerous uv index",
      "what uv level is dangerous",
      "uv index dangerous levels",
    ],
    categoryKey: "weather",
    description: "See which UV index ranges are considered dangerous and how the standard UV scale is interpreted.",
    examples: [
      { expression: "UV 5", result: "Moderate, not usually classed as dangerous" },
      { expression: "UV 6", result: "High, practical danger threshold begins" },
      { expression: "UV 8", result: "Very high, stronger protection needed" },
    ],
    faq: [
      {
        answer: "A practical rule is that UV index 6 and above is the more dangerous range because skin damage can happen faster without protection.",
        question: "What UV index is usually considered dangerous?",
      },
      {
        answer: "They mean the same thing. The distinction is in the severity: high begins at 6, very high at 8, and extreme at 11.",
        question: "Is high UV the same as very high or extreme UV?",
      },
      {
        answer: "Not always. Low and moderate levels can still matter during long outdoor exposure, but the sharper risk jump usually begins at 6 or higher.",
        question: "Does dangerous UV always start with immediate sunburn?",
      },
    ],
    keywords: [
      "what uv index is dangerous",
      "dangerous uv level",
      "uv scale explanation",
      "sun exposure risk levels",
    ],
    overview: [
      "Many people do not need a calculator as much as a fast explanation of where the UV danger line starts. This page is built for that question-first search intent.",
      "It still includes the live UV tool so the answer is practical instead of purely descriptive.",
    ],
    relatedSlugs: ["uv-index-calculator", "pressure-unit-converter", "celsius-to-fahrenheit"],
    slug: "what-uv-index-is-dangerous",
    supportingNotes: [
      "The standard UV scale matters because weather apps often show only the number, not the meaning behind it.",
      "By pairing the explanation with a live input, the page works for both education and quick daily checks.",
    ],
    title: "What UV Index Is Dangerous?",
    useCases: [
      "Answer a quick UV safety question without reading a long weather article.",
      "Understand where the UV scale turns from caution to stronger protection.",
      "Check whether today’s reading falls into the higher-risk range.",
    ],
    widget: {
      defaultValue: 8,
      kind: "uv-index",
      mode: "guide",
    },
  },
];

export const interactiveToolPages: InteractiveToolPageDefinition[] = [
  ...interactiveToolSeeds.map(
    (page): InteractiveToolPageDefinition => ({
      aliases: [...page.aliases],
      categoryKey: page.categoryKey,
      description: page.description,
      examples: [...page.examples],
      faq: [...page.faq],
      kind: "interactive-tool",
      keywords: [...page.keywords],
      longDescription: buildInteractiveLongDescription(
        page.title,
        page.overview,
        page.supportingNotes,
        page.useCases,
      ),
      metaDescription: page.metaDescription,
      relatedSlugs: [...page.relatedSlugs],
      route: `/${page.slug}`,
      slug: page.slug,
      title: page.title,
      useCases: [...page.useCases],
      widget: page.widget,
    }),
  ),
  ...generatorToolPages,
  ...utilityToolPages,
  ...fileToolPages,
];

const pageBySlug = new Map(interactiveToolPages.map((page) => [page.slug, page] as const));

export function getInteractiveToolPage(slug: string) {
  return pageBySlug.get(slug);
}

export function getInteractiveToolPagesForCategory(categoryKey: CategoryKey) {
  return interactiveToolPages.filter((page) => page.categoryKey === categoryKey);
}

export function getInteractiveToolRelatedPages(page: InteractiveToolPageDefinition) {
  return page.relatedSlugs
    .map((slug) => getInteractiveToolPage(slug))
    .filter((entry): entry is InteractiveToolPageDefinition => Boolean(entry));
}

export function getInteractiveToolSearchEntries(): SearchEntry[] {
  return interactiveToolPages.map((page) => ({
    category: page.categoryKey,
    entryType: "page",
    href: page.route,
    keywords: uniqueStrings([...page.aliases, ...page.keywords, page.title.toLowerCase()]),
    title: page.title,
  }));
}
