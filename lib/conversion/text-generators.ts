import {
  createSeededRandom,
  pickRandom,
  randomBetween,
  type RandomSource,
} from "@/lib/conversion/random-source";

export type TextGeneratorMode = "lorem" | "random";
export type TextGeneratorUnit = "paragraphs" | "sentences" | "words";

export type TextGeneratorOptions = {
  count: number;
  seed: number;
  unit: TextGeneratorUnit;
};

const loremWordBank = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "commodo",
] as const;

const randomWordBank = [
  "anchor",
  "beacon",
  "canvas",
  "cinder",
  "delta",
  "ember",
  "field",
  "glow",
  "harbor",
  "lantern",
  "meadow",
  "notion",
  "orbit",
  "packet",
  "quiet",
  "ripple",
  "signal",
  "silver",
  "syntax",
  "tidal",
  "vector",
  "velvet",
  "window",
  "yellow",
  "zenith",
  "marble",
  "northbound",
  "storyline",
  "grain",
  "transit",
];

function pickWord(words: readonly string[], random: RandomSource) {
  return pickRandom(words, random);
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function normalizeGeneratorCount(unit: TextGeneratorUnit, count: number) {
  const safeCount = Number.isFinite(count) ? Math.floor(count) : 1;

  if (unit === "words") {
    return Math.min(200, Math.max(1, safeCount));
  }

  if (unit === "sentences") {
    return Math.min(40, Math.max(1, safeCount));
  }

  return Math.min(12, Math.max(1, safeCount));
}

function buildWordOutput(words: readonly string[], random: RandomSource, count: number) {
  return Array.from({ length: count }, () => pickWord(words, random)).join(" ");
}

function buildSentence(words: readonly string[], random: RandomSource) {
  const length = randomBetween(random, 6, 12);
  const sentenceWords = Array.from({ length }, () => pickWord(words, random));

  if (sentenceWords.length > 7 && random() > 0.55) {
    sentenceWords.splice(randomBetween(random, 2, sentenceWords.length - 3), 0, ",");
  }

  const sentence = sentenceWords.join(" ").replace(/\s+,/g, ",");
  return `${capitalize(sentence)}.`;
}

function buildParagraph(words: readonly string[], random: RandomSource) {
  const sentenceCount = randomBetween(random, 3, 5);
  return Array.from({ length: sentenceCount }, () => buildSentence(words, random)).join(" ");
}

export function generateText(
  mode: TextGeneratorMode,
  options: TextGeneratorOptions,
  randomOverride?: RandomSource,
) {
  const words = mode === "lorem" ? loremWordBank : randomWordBank;
  const random = randomOverride ?? createSeededRandom(options.seed);
  const count = normalizeGeneratorCount(options.unit, options.count);

  if (options.unit === "words") {
    return buildWordOutput(words, random, count);
  }

  if (options.unit === "sentences") {
    return Array.from({ length: count }, () => buildSentence(words, random)).join(" ");
  }

  return Array.from({ length: count }, () => buildParagraph(words, random)).join("\n\n");
}
