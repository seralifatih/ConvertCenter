export type TextMode =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "camel"
  | "snake"
  | "kebab"
  | "base64Encode"
  | "base64Decode"
  | "urlEncode"
  | "urlDecode"
  | "jsonFormat"
  | "jsonMinify"
  | "jsonValidate";

export type TextModeGroupKey = "editorial" | "developer";

export type TextModeOption = {
  description: string;
  group: TextModeGroupKey;
  helperLabel: string;
  label: string;
  mode: TextMode;
  sampleValue: string;
};

export const textModeOptions: readonly TextModeOption[] = [
  {
    description: "Turns every letter into uppercase for emphasis and quick cleanup.",
    group: "editorial",
    helperLabel: "UPPERCASE",
    label: "UPPERCASE",
    mode: "uppercase",
    sampleValue: "The quick brown fox jumps over the lazy dog.",
  },
  {
    description: "Normalizes text into lowercase for simpler formatting and imports.",
    group: "editorial",
    helperLabel: "lowercase",
    label: "lowercase",
    mode: "lowercase",
    sampleValue: "The QUICK Brown Fox Jumps OVER the Lazy Dog.",
  },
  {
    description: "Capitalizes each major word for headings, cards, and titles.",
    group: "editorial",
    helperLabel: "Title Case",
    label: "Title Case",
    mode: "title",
    sampleValue: "the quick brown fox jumps over the lazy dog",
  },
  {
    description: "Formats copy as sentence case for readable paragraphs and email text.",
    group: "editorial",
    helperLabel: "Sentence case",
    label: "Sentence case",
    mode: "sentence",
    sampleValue: "tHE QUICK BROWN FOX. jUMPS OVER THE LAZY DOG!",
  },
  {
    description: "Builds camelCase names for variables, fields, and JSON keys.",
    group: "developer",
    helperLabel: "camelCase",
    label: "camelCase",
    mode: "camel",
    sampleValue: "The quick brown fox jumps over the lazy dog",
  },
  {
    description: "Builds snake_case output for schemas, constants, and backend fields.",
    group: "developer",
    helperLabel: "snake_case",
    label: "snake_case",
    mode: "snake",
    sampleValue: "The quick brown fox jumps over the lazy dog",
  },
  {
    description: "Builds kebab-case strings for URLs, slugs, and CSS-friendly tokens.",
    group: "developer",
    helperLabel: "kebab-case",
    label: "kebab-case",
    mode: "kebab",
    sampleValue: "The quick brown fox jumps over the lazy dog",
  },
  {
    description: "Encodes plain text into Base64 for transport, testing, and quick developer workflows.",
    group: "developer",
    helperLabel: "Base64 encode",
    label: "Base64 encode",
    mode: "base64Encode",
    sampleValue: "ConvertCenter Base64 example",
  },
  {
    description: "Decodes Base64 back into plain text in the browser with quick validation feedback.",
    group: "developer",
    helperLabel: "Base64 decode",
    label: "Base64 decode",
    mode: "base64Decode",
    sampleValue: "Q29udmVydENlbnRlciBCYXNlNjQgZXhhbXBsZQ==",
  },
  {
    description: "Encodes URLs and query parameters safely for links, APIs, and browser-based tooling.",
    group: "developer",
    helperLabel: "URL encode",
    label: "URL encode",
    mode: "urlEncode",
    sampleValue: "https://convertcenter.org/search?q=kg to lbs&source=app",
  },
  {
    description: "Decodes percent-encoded URLs back into readable text for debugging, APIs, and query-string checks.",
    group: "developer",
    helperLabel: "URL decode",
    label: "URL decode",
    mode: "urlDecode",
    sampleValue: "https%3A%2F%2Fconvertcenter.org%2Fsearch%3Fq%3Dkg%2520to%2520lbs%26source%3Dapp",
  },
  {
    description: "Formats, validates, and beautifies JSON for APIs, configs, and developer workflows.",
    group: "developer",
    helperLabel: "JSON format",
    label: "JSON format",
    mode: "jsonFormat",
    sampleValue: '{"site":"ConvertCenter","tools":["base64","url","json"],"active":true}',
  },
  {
    description: "Minifies JSON by removing whitespace for APIs, payloads, and production-ready data.",
    group: "developer",
    helperLabel: "JSON minify",
    label: "JSON minify",
    mode: "jsonMinify",
    sampleValue: '{\n  "site": "ConvertCenter",\n  "tools": ["base64", "url", "json"],\n  "active": true\n}',
  },
  {
    description: "Checks whether JSON syntax is valid and returns a quick validation result.",
    group: "developer",
    helperLabel: "JSON validate",
    label: "JSON validate",
    mode: "jsonValidate",
    sampleValue: '{"site":"ConvertCenter","tools":["base64","url","json"],"active":true}',
  },
] as const;

export const textModeGroups: ReadonlyArray<{
  key: TextModeGroupKey;
  label: string;
}> = [
  { key: "editorial", label: "case types" },
  { key: "developer", label: "developer styles" },
] as const;

export const textSampleHelpers: ReadonlyArray<{
  label: string;
  value: string;
}> = [
  { label: "headline", value: "the quick brown fox jumps over the lazy dog" },
  { label: "sentence", value: "tHE QUICK BROWN FOX. jUMPS OVER THE LAZY DOG!" },
  { label: "identifier", value: "Customer account status history" },
] as const;

const sentenceBoundary = /(^\s*[a-z])|([.!?]\s+[a-z])/g;

function splitWords(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

export function encodeBase64(input: string) {
  if (typeof window !== "undefined" && typeof window.btoa === "function") {
    return window.btoa(unescape(encodeURIComponent(input)));
  }

  return Buffer.from(input, "utf8").toString("base64");
}

export function decodeBase64(input: string) {
  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return decodeURIComponent(escape(window.atob(input)));
    }

    return Buffer.from(input, "base64").toString("utf8");
  } catch {
    return "Invalid Base64 string";
  }
}

export function encodeURL(input: string) {
  return encodeURIComponent(input);
}

export function decodeURL(input: string) {
  try {
    return decodeURIComponent(input);
  } catch {
    return "Invalid encoded URL";
  }
}

export function formatJSON(input: string) {
  try {
    return JSON.stringify(JSON.parse(input), null, 2);
  } catch {
    return "Invalid JSON";
  }
}

export function minifyJSON(input: string) {
  try {
    return JSON.stringify(JSON.parse(input));
  } catch {
    return "Invalid JSON";
  }
}

export function validateJSON(input: string) {
  try {
    JSON.parse(input);
    return "Valid JSON";
  } catch (error) {
    return error instanceof Error ? error.message : "Invalid JSON";
  }
}

export function transformText(mode: TextMode, value: string) {
  switch (mode) {
    case "uppercase":
      return value.toUpperCase();
    case "lowercase":
      return value.toLowerCase();
    case "title":
      return splitWords(value)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    case "sentence":
      return value
        .toLowerCase()
        .replace(sentenceBoundary, (match) => match.toUpperCase());
    case "camel": {
      const words = splitWords(value).map((word) => word.toLowerCase());
      return words
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");
    }
    case "snake":
      return splitWords(value)
        .map((word) => word.toLowerCase())
        .join("_");
    case "kebab":
      return splitWords(value)
        .map((word) => word.toLowerCase())
        .join("-");
    case "base64Encode":
      return encodeBase64(value);
    case "base64Decode":
      return decodeBase64(value);
    case "urlEncode":
      return encodeURL(value);
    case "urlDecode":
      return decodeURL(value);
    case "jsonFormat":
      return formatJSON(value);
    case "jsonMinify":
      return minifyJSON(value);
    case "jsonValidate":
      return validateJSON(value);
    default:
      return value;
  }
}

export function getTextModeOption(mode: TextMode) {
  return textModeOptions.find((option) => option.mode === mode);
}
