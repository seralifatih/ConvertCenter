export type TextMode =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "camel"
  | "snake"
  | "kebab";

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
    default:
      return value;
  }
}

export function getTextModeOption(mode: TextMode) {
  return textModeOptions.find((option) => option.mode === mode);
}
