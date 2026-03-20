import { marked } from "marked";
import { dump as dumpYaml } from "js-yaml";
import { load as loadYaml } from "js-yaml";
import TurndownService from "turndown";
import {
  csvToJson,
  htmlDecode,
  htmlEncode,
  jsonToCsv,
  jsonToXml,
  xmlToJson,
} from "@/lib/conversion/dev-formats";
export {
  csvToJson,
  htmlDecode,
  htmlEncode,
  jsonToCsv,
  jsonToXml,
  xmlToJson,
} from "@/lib/conversion/dev-formats";

export type TextMode =
  | "uppercase"
  | "lowercase"
  | "title"
  | "sentence"
  | "reverse"
  | "removeLineBreaks"
  | "removeExtraSpaces"
  | "removeDuplicateLines"
  | "removeEmptyLines"
  | "removePunctuation"
  | "stripHtmlTags"
  | "removeEmojis"
  | "normalizeUnicode"
  | "removeNonAscii"
  | "removeDiacritics"
  | "sortLines"
  | "shuffleLines"
  | "joinLines"
  | "splitText"
  | "lineBreaksToCommas"
  | "wordCount"
  | "characterCount"
  | "sentenceCount"
  | "paragraphCount"
  | "slug"
  | "camel"
  | "snake"
  | "kebab"
  | "base64Encode"
  | "base64Decode"
  | "urlEncode"
  | "urlDecode"
  | "htmlEncode"
  | "htmlDecode"
  | "jsonFormat"
  | "jsonMinify"
  | "jsonValidate"
  | "jsonToCsv"
  | "csvToJson"
  | "xmlToJson"
  | "jsonToXml"
  | "markdownToHtml"
  | "htmlToMarkdown"
  | "jsonToYaml"
  | "yamlToJson";

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
    description: "Reverses characters for playful text flips, debugging, and quick string checks.",
    group: "editorial",
    helperLabel: "Reverse text",
    label: "Reverse text",
    mode: "reverse",
    sampleValue: "ConvertCenter reverse text example",
  },
  {
    description: "Removes newline characters and joins multiline text into a single line.",
    group: "editorial",
    helperLabel: "Remove line breaks",
    label: "Remove line breaks",
    mode: "removeLineBreaks",
    sampleValue: "First line\nSecond line\nThird line",
  },
  {
    description: "Collapses repeated spaces into one clean space for tidier text.",
    group: "editorial",
    helperLabel: "Remove extra spaces",
    label: "Remove extra spaces",
    mode: "removeExtraSpaces",
    sampleValue: "Too    many   spaces    here",
  },
  {
    description: "Keeps the first instance of each line and removes repeated duplicates.",
    group: "editorial",
    helperLabel: "Remove duplicate lines",
    label: "Remove duplicate lines",
    mode: "removeDuplicateLines",
    sampleValue: "alpha\nbeta\nalpha\ngamma\nbeta",
  },
  {
    description: "Removes blank lines while keeping the remaining text in its original order.",
    group: "editorial",
    helperLabel: "Remove empty lines",
    label: "Remove empty lines",
    mode: "removeEmptyLines",
    sampleValue: "First line\n\nSecond line\n   \nThird line",
  },
  {
    description: "Strips punctuation marks for simpler text cleaning and downstream processing.",
    group: "editorial",
    helperLabel: "Remove punctuation",
    label: "Remove punctuation",
    mode: "removePunctuation",
    sampleValue: "Hello, world! Ready-to-go? Yes.",
  },
  {
    description: "Removes HTML tags and leaves behind readable plain text.",
    group: "editorial",
    helperLabel: "Strip HTML tags",
    label: "Strip HTML tags",
    mode: "stripHtmlTags",
    sampleValue: "<p>Hello <strong>world</strong></p>",
  },
  {
    description: "Removes emoji characters from text for exports, forms, and plain-text cleanup.",
    group: "editorial",
    helperLabel: "Remove emojis",
    label: "Remove emojis",
    mode: "removeEmojis",
    sampleValue: "Ship it 🚀 Ready ✅",
  },
  {
    description: "Normalizes Unicode text into a consistent compatibility form for matching and cleanup.",
    group: "editorial",
    helperLabel: "Normalize Unicode",
    label: "Normalize Unicode",
    mode: "normalizeUnicode",
    sampleValue: "Cafe\u0301 \uFF21\uFF22\uFF23 \uFB01",
  },
  {
    description: "Removes characters outside the ASCII range for strict plain-text output.",
    group: "editorial",
    helperLabel: "Remove non-ASCII",
    label: "Remove non-ASCII",
    mode: "removeNonAscii",
    sampleValue: "Cafe deja vu - año",
  },
  {
    description: "Normalizes accented characters into plain Latin letters when possible.",
    group: "editorial",
    helperLabel: "Remove diacritics",
    label: "Remove diacritics",
    mode: "removeDiacritics",
    sampleValue: "Crème brûlée déjà vu",
  },
  {
    description: "Sorts multiline text alphabetically for lists, exports, and cleanup work.",
    group: "editorial",
    helperLabel: "Sort lines",
    label: "Sort lines",
    mode: "sortLines",
    sampleValue: "banana\nApple\ncherry",
  },
  {
    description: "Shuffles non-empty lines into a deterministic randomized order for prompts and lists.",
    group: "editorial",
    helperLabel: "Shuffle lines",
    label: "Shuffle lines",
    mode: "shuffleLines",
    sampleValue: "alpha\nbeta\ngamma\ndelta",
  },
  {
    description: "Joins multiple lines into one clean line with single-space separators.",
    group: "editorial",
    helperLabel: "Join lines",
    label: "Join lines",
    mode: "joinLines",
    sampleValue: "First item\nSecond item\nThird item",
  },
  {
    description: "Splits delimited text into separate lines for easier scanning and cleanup.",
    group: "editorial",
    helperLabel: "Split text",
    label: "Split text",
    mode: "splitText",
    sampleValue: "apples, oranges, pears",
  },
  {
    description: "Replaces line breaks with comma-separated output for forms and inline lists.",
    group: "editorial",
    helperLabel: "Lines to commas",
    label: "Lines to commas",
    mode: "lineBreaksToCommas",
    sampleValue: "red\nblue\ngreen",
  },
  {
    description: "Counts words in pasted text for drafts, limits, and quick content checks.",
    group: "editorial",
    helperLabel: "Word count",
    label: "Word count",
    mode: "wordCount",
    sampleValue: "Count how many words are in this sentence.",
  },
  {
    description: "Counts characters instantly for forms, bios, metadata, and length checks.",
    group: "editorial",
    helperLabel: "Character count",
    label: "Character count",
    mode: "characterCount",
    sampleValue: "Count every character in this line.",
  },
  {
    description: "Counts likely sentences in pasted text for readability checks and content review.",
    group: "editorial",
    helperLabel: "Sentence count",
    label: "Sentence count",
    mode: "sentenceCount",
    sampleValue: "One. Two! Is this three?",
  },
  {
    description: "Counts paragraph blocks separated by blank lines.",
    group: "editorial",
    helperLabel: "Paragraph count",
    label: "Paragraph count",
    mode: "paragraphCount",
    sampleValue: "First paragraph.\n\nSecond paragraph.\nStill second.\n\nThird.",
  },
  {
    description: "Turns text into a clean lowercase slug for URLs, filenames, and CMS fields.",
    group: "editorial",
    helperLabel: "Slug generator",
    label: "Slug generator",
    mode: "slug",
    sampleValue: "ConvertCenter Slug Generator Example",
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
    description: "Escapes HTML-sensitive characters into safe entities for templates, docs, and snippets.",
    group: "developer",
    helperLabel: "HTML encode",
    label: "HTML encode",
    mode: "htmlEncode",
    sampleValue: '<button class="primary">Save & continue</button>',
  },
  {
    description: "Decodes HTML entities back into readable text and markup characters.",
    group: "developer",
    helperLabel: "HTML decode",
    label: "HTML decode",
    mode: "htmlDecode",
    sampleValue: "&lt;button class=&quot;primary&quot;&gt;Save &amp; continue&lt;/button&gt;",
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
  {
    description: "Converts JSON records into CSV with automatic headers for spreadsheets and exports.",
    group: "developer",
    helperLabel: "JSON to CSV",
    label: "JSON to CSV",
    mode: "jsonToCsv",
    sampleValue: '[{"name":"Ada","score":42},{"name":"Lin","score":39}]',
  },
  {
    description: "Converts CSV rows into formatted JSON arrays for APIs, fixtures, and cleanup work.",
    group: "developer",
    helperLabel: "CSV to JSON",
    label: "CSV to JSON",
    mode: "csvToJson",
    sampleValue: "name,score\nAda,42\nLin,39",
  },
  {
    description: "Converts XML documents into formatted JSON for inspection, migration, and tooling.",
    group: "developer",
    helperLabel: "XML to JSON",
    label: "XML to JSON",
    mode: "xmlToJson",
    sampleValue: "<person><name>Ada</name><score>42</score></person>",
  },
  {
    description: "Converts JSON data into XML for integrations, feeds, and structured exports.",
    group: "developer",
    helperLabel: "JSON to XML",
    label: "JSON to XML",
    mode: "jsonToXml",
    sampleValue: '{"person":{"name":"Ada","score":42}}',
  },
  {
    description: "Converts Markdown into HTML with a fast rendered preview for docs, content, and developer workflows.",
    group: "developer",
    helperLabel: "Markdown to HTML",
    label: "Markdown to HTML",
    mode: "markdownToHtml",
    sampleValue: "# Hello\n\nConvert **Markdown** into HTML.",
  },
  {
    description: "Converts HTML markup into Markdown for docs, migration work, and cleaner content editing.",
    group: "developer",
    helperLabel: "HTML to Markdown",
    label: "HTML to Markdown",
    mode: "htmlToMarkdown",
    sampleValue: "<h1>Hello</h1><p>Convert <strong>HTML</strong> into Markdown.</p>",
  },
  {
    description: "Converts JSON data into YAML for configs, tooling, and developer workflows.",
    group: "developer",
    helperLabel: "JSON to YAML",
    label: "JSON to YAML",
    mode: "jsonToYaml",
    sampleValue: '{\n  "name": "test"\n}',
  },
  {
    description: "Converts YAML into formatted JSON for APIs, config migrations, and developer workflows.",
    group: "developer",
    helperLabel: "YAML to JSON",
    label: "YAML to JSON",
    mode: "yamlToJson",
    sampleValue: "name: test",
  },
] as const;

export const textModeGroups: ReadonlyArray<{
  key: TextModeGroupKey;
  label: string;
}> = [
  { key: "editorial", label: "text tools" },
  { key: "developer", label: "developer tools" },
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
const turndownService = new TurndownService({
  headingStyle: "atx",
});

function splitWords(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
}

function getNormalizedLines(input: string) {
  return input.replace(/\r\n?/g, "\n").split("\n");
}

function hashString(value: string) {
  let hash = 2166136261;

  for (const character of value) {
    hash ^= character.codePointAt(0) ?? 0;
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0 || 1;

  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
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

export function markdownToHtml(input: string) {
  return String(marked.parse(input));
}

export function htmlToMarkdown(input: string) {
  return turndownService.turndown(input);
}

export function jsonToYaml(input: string) {
  try {
    return dumpYaml(JSON.parse(input), {
      lineWidth: -1,
      noRefs: true,
    }).trim();
  } catch {
    return "Invalid JSON";
  }
}

export function yamlToJson(input: string) {
  try {
    return JSON.stringify(loadYaml(input), null, 2);
  } catch {
    return "Invalid YAML";
  }
}

export function reverseText(input: string) {
  return input.split("").reverse().join("");
}

export function removeLineBreaks(input: string) {
  return input.replace(/\r?\n/g, " ");
}

export function removeExtraSpaces(input: string) {
  return input.replace(/\s+/g, " ").trim();
}

export function removeDuplicateLines(input: string) {
  const seen = new Set<string>();

  return getNormalizedLines(input)
    .filter((line) => {
      if (seen.has(line)) {
        return false;
      }

      seen.add(line);
      return true;
    })
    .join("\n");
}

export function removeEmptyLines(input: string) {
  return getNormalizedLines(input)
    .filter((line) => line.trim().length > 0)
    .join("\n");
}

export function removePunctuation(input: string) {
  return input.replace(/[\p{P}]+/gu, " ").replace(/\s+/g, " ").trim();
}

export function stripHtmlTags(input: string) {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function removeEmojis(input: string) {
  return input
    .replace(/[\p{Extended_Pictographic}\p{Regional_Indicator}\u200D\uFE0F]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeUnicode(input: string) {
  return input.normalize("NFKC");
}

export function removeNonAscii(input: string) {
  return input.replace(/[^\x00-\x7F]+/g, "").replace(/\s+/g, " ").trim();
}

export function removeDiacritics(input: string) {
  return input.normalize("NFD").replace(/\p{M}+/gu, "").normalize("NFC");
}

export function sortLinesAlphabetically(input: string) {
  return getNormalizedLines(input)
    .filter((line) => line.trim().length > 0)
    .sort((left, right) => left.localeCompare(right, undefined, { sensitivity: "base" }))
    .join("\n");
}

export function shuffleLines(input: string) {
  const lines = getNormalizedLines(input).filter((line) => line.trim().length > 0);

  if (lines.length <= 1) {
    return lines.join("\n");
  }

  const shuffled = [...lines];
  const random = createSeededRandom(hashString(lines.join("\n")));

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }

  return shuffled.join("\n");
}

export function joinLines(input: string) {
  return getNormalizedLines(input)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}

export function splitTextIntoLines(input: string) {
  const normalized = input.trim();

  if (!normalized) {
    return "";
  }

  const delimitedParts = normalized
    .split(/[\n,;|]+/)
    .map((part) => part.trim())
    .filter(Boolean);

  if (delimitedParts.length > 1) {
    return delimitedParts.join("\n");
  }

  return normalized
    .split(/\s+/)
    .filter(Boolean)
    .join("\n");
}

export function replaceLineBreaksWithCommas(input: string) {
  return getNormalizedLines(input)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(", ");
}

export function countWords(input: string) {
  const normalized = input.trim();
  return normalized ? normalized.split(/\s+/).length : 0;
}

export function countCharacters(input: string) {
  return input.length;
}

export function countSentences(input: string) {
  const matches = input
    .replace(/\n+/g, " ")
    .match(/[^.!?]+(?:[.!?]+|$)/g);

  if (!matches) {
    return 0;
  }

  return matches.filter((entry) => /[\p{L}\p{N}]/u.test(entry)).length;
}

export function countParagraphs(input: string) {
  return input
    .split(/\r?\n\s*\r?\n+/)
    .filter((paragraph) => paragraph.trim().length > 0).length;
}

export function generateSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]+/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
    case "reverse":
      return reverseText(value);
    case "removeLineBreaks":
      return removeLineBreaks(value);
    case "removeExtraSpaces":
      return removeExtraSpaces(value);
    case "removeDuplicateLines":
      return removeDuplicateLines(value);
    case "removeEmptyLines":
      return removeEmptyLines(value);
    case "removePunctuation":
      return removePunctuation(value);
    case "stripHtmlTags":
      return stripHtmlTags(value);
    case "removeEmojis":
      return removeEmojis(value);
    case "normalizeUnicode":
      return normalizeUnicode(value);
    case "removeNonAscii":
      return removeNonAscii(value);
    case "removeDiacritics":
      return removeDiacritics(value);
    case "sortLines":
      return sortLinesAlphabetically(value);
    case "shuffleLines":
      return shuffleLines(value);
    case "joinLines":
      return joinLines(value);
    case "splitText":
      return splitTextIntoLines(value);
    case "lineBreaksToCommas":
      return replaceLineBreaksWithCommas(value);
    case "wordCount":
      return String(countWords(value));
    case "characterCount":
      return String(countCharacters(value));
    case "sentenceCount":
      return String(countSentences(value));
    case "paragraphCount":
      return String(countParagraphs(value));
    case "slug":
      return generateSlug(value);
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
    case "htmlEncode":
      return htmlEncode(value);
    case "htmlDecode":
      return htmlDecode(value);
    case "jsonFormat":
      return formatJSON(value);
    case "jsonMinify":
      return minifyJSON(value);
    case "jsonValidate":
      return validateJSON(value);
    case "jsonToCsv":
      return jsonToCsv(value);
    case "csvToJson":
      return csvToJson(value);
    case "xmlToJson":
      return xmlToJson(value);
    case "jsonToXml":
      return jsonToXml(value);
    case "markdownToHtml":
      return markdownToHtml(value);
    case "htmlToMarkdown":
      return htmlToMarkdown(value);
    case "jsonToYaml":
      return jsonToYaml(value);
    case "yamlToJson":
      return yamlToJson(value);
    default:
      return value;
  }
}

export function getTextModeOption(mode: TextMode) {
  return textModeOptions.find((option) => option.mode === mode);
}
