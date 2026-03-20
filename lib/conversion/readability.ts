import { countSentences, removeDiacritics } from "@/lib/conversion/text";

export type ReadabilityLabel =
  | "Very easy"
  | "Easy"
  | "Fairly easy"
  | "Standard"
  | "Fairly difficult"
  | "Difficult"
  | "Very confusing";

export type ReadabilityAnalysis = {
  averageSentenceLength: number;
  explanation: string;
  gradeLevel: number;
  label: ReadabilityLabel;
  score: number;
  sentenceCount: number;
  syllableCount: number;
  wordCount: number;
};

function getWords(value: string) {
  return removeDiacritics(value)
    .toLowerCase()
    .match(/[a-z0-9']+/g) ?? [];
}

export function countWordSyllables(word: string) {
  const cleaned = removeDiacritics(word)
    .toLowerCase()
    .replace(/[^a-z]/g, "");

  if (!cleaned) {
    return 0;
  }

  if (cleaned.length <= 3) {
    return 1;
  }

  const normalized = cleaned
    .replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/i, "")
    .replace(/^y/, "");
  const groups = normalized.match(/[aeiouy]{1,2}/g);

  return Math.max(1, groups?.length ?? 1);
}

export function countTextSyllables(value: string) {
  return getWords(value).reduce((total, word) => total + countWordSyllables(word), 0);
}

export function getReadabilityLabel(score: number): ReadabilityLabel {
  if (score >= 90) {
    return "Very easy";
  }

  if (score >= 80) {
    return "Easy";
  }

  if (score >= 70) {
    return "Fairly easy";
  }

  if (score >= 60) {
    return "Standard";
  }

  if (score >= 50) {
    return "Fairly difficult";
  }

  if (score >= 30) {
    return "Difficult";
  }

  return "Very confusing";
}

export function getReadabilityExplanation(label: ReadabilityLabel) {
  switch (label) {
    case "Very easy":
      return "The wording is very simple and should feel easy to scan quickly.";
    case "Easy":
      return "Most readers should find the text straightforward and light to read.";
    case "Fairly easy":
      return "The text is still approachable, but it is a little denser than casual copy.";
    case "Standard":
      return "This sits around everyday web and business writing complexity.";
    case "Fairly difficult":
      return "The text may feel a bit heavy, so shorter sentences or simpler wording could help.";
    case "Difficult":
      return "Many readers will need more effort to follow the text comfortably.";
    case "Very confusing":
      return "The text is dense or highly technical and may benefit from a substantial rewrite.";
  }
}

export function analyzeReadability(value: string): ReadabilityAnalysis | null {
  const wordCount = getWords(value).length;

  if (wordCount === 0) {
    return null;
  }

  const sentenceCount = Math.max(countSentences(value), 1);
  const syllableCount = countTextSyllables(value);
  const averageSentenceLength = wordCount / sentenceCount;
  const averageSyllablesPerWord = syllableCount / wordCount;
  const score = Number(
    (
      206.835 -
      1.015 * averageSentenceLength -
      84.6 * averageSyllablesPerWord
    ).toFixed(1),
  );
  const gradeLevel = Number(
    Math.max(
      0,
      0.39 * averageSentenceLength + 11.8 * averageSyllablesPerWord - 15.59,
    ).toFixed(1),
  );
  const label = getReadabilityLabel(score);

  return {
    averageSentenceLength: Number(averageSentenceLength.toFixed(1)),
    explanation: getReadabilityExplanation(label),
    gradeLevel,
    label,
    score,
    sentenceCount,
    syllableCount,
    wordCount,
  };
}
