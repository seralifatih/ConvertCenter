import type { DevToolPageSchema } from "./conversion-types";
import { defineTextTransformPage } from "./registry-helpers";

export const textTransformPages = [
  defineTextTransformPage(
    "uppercase-converter",
    "uppercase",
    "Uppercase converter",
    "Convert pasted text to uppercase instantly and copy the result with one click.",
    "The quick brown fox jumps over the lazy dog.",
    { featured: true, popular: true },
  ),
  defineTextTransformPage(
    "lowercase-converter",
    "lowercase",
    "Lowercase converter",
    "Normalize text to lowercase for copy cleanup, imports, and quick formatting passes.",
    "The QUICK Brown Fox Jumps OVER the Lazy Dog.",
  ),
  defineTextTransformPage(
    "title-case-converter",
    "title",
    "Title case converter",
    "Turn messy text into polished title case for headings, cards, and content blocks.",
    "the quick brown fox jumps over the lazy dog",
    { popular: true },
  ),
  defineTextTransformPage(
    "sentence-case-converter",
    "sentence",
    "Sentence case converter",
    "Convert text into sentence case for readable body copy, emails, and documentation.",
    "tHE QUICK BROWN FOX. jUMPS OVER THE LAZY DOG!",
  ),
  defineTextTransformPage(
    "camelcase-converter",
    "camel",
    "camelCase converter",
    "Generate camelCase names for variables, JSON keys, and frontend code quickly.",
    "The quick brown fox jumps over the lazy dog",
  ),
  defineTextTransformPage(
    "snake-case-converter",
    "snake",
    "snake_case converter",
    "Create snake_case output for backend fields, constants, and migration work.",
    "The quick brown fox jumps over the lazy dog",
    { popular: true },
  ),
  defineTextTransformPage(
    "kebab-case-converter",
    "kebab",
    "kebab-case converter",
    "Convert strings to kebab-case for URLs, slugs, and CSS-friendly identifiers.",
    "The quick brown fox jumps over the lazy dog",
  ),
] as const;

export const plannedDevToolPages = [
  {
    aliases: ["json yaml", "json to yaml", "yaml converter"],
    categoryKey: "dev",
    description: "Convert JSON payloads into readable YAML for config and developer workflows.",
    enabled: false,
    kind: "dev-tool",
    slug: "json-to-yaml",
    title: "JSON to YAML converter",
  },
  {
    aliases: ["base64", "base64 encode", "base64 decode"],
    categoryKey: "dev",
    description: "Encode and decode Base64 strings without leaving the utility shell.",
    enabled: false,
    kind: "dev-tool",
    slug: "base64-tool",
    title: "Base64 tool",
  },
] as const satisfies readonly DevToolPageSchema[];
