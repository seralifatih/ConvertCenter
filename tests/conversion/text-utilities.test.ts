import { describe, expect, it } from "vitest";
import {
  analyzeReadability,
  countTextSyllables,
  countWordSyllables,
  getReadabilityLabel,
} from "../../lib/conversion/readability";
import { compareTextByLine } from "../../lib/conversion/text-diff";
import {
  generateText,
  normalizeGeneratorCount,
} from "../../lib/conversion/text-generators";

describe("readability helpers", () => {
  it("counts syllables with a reasonable heuristic", () => {
    expect(countWordSyllables("reading")).toBe(2);
    expect(countWordSyllables("simple")).toBe(2);
    expect(countTextSyllables("Simple writing helps readers.")).toBeGreaterThan(0);
  });

  it("maps score bands to clear labels", () => {
    expect(getReadabilityLabel(95)).toBe("Very easy");
    expect(getReadabilityLabel(75)).toBe("Fairly easy");
    expect(getReadabilityLabel(55)).toBe("Fairly difficult");
    expect(getReadabilityLabel(10)).toBe("Very confusing");
  });

  it("analyzes a passage into score, label, and counts", () => {
    const analysis = analyzeReadability(
      "Clear writing helps people finish tasks quickly. Short sentences usually improve scanning.",
    );

    expect(analysis).not.toBeNull();
    expect(analysis?.sentenceCount).toBe(2);
    expect(analysis?.wordCount).toBe(12);
    expect(analysis?.score).toBeGreaterThan(50);
    expect([
      "Fairly easy",
      "Standard",
      "Fairly difficult",
      "Easy",
      "Very easy",
    ]).toContain(analysis?.label);
  });

  it("returns null when no readable text is provided", () => {
    expect(analyzeReadability("   ")).toBeNull();
  });
});

describe("text diff helper", () => {
  it("compares text line by line and summarizes changes", () => {
    const diff = compareTextByLine(
      "alpha\nbeta\ngamma",
      "alpha\nbeta changed\ngamma\ndelta",
    );

    expect(diff.matchingLineCount).toBe(2);
    expect(diff.removedLineCount).toBe(1);
    expect(diff.addedLineCount).toBe(2);
    expect(diff.similarity).toBe(50);
    expect(diff.entries.map((entry) => entry.kind)).toEqual([
      "same",
      "added",
      "removed",
      "same",
      "added",
    ]);
  });

  it("treats two empty inputs as fully similar", () => {
    const diff = compareTextByLine("", "");

    expect(diff.similarity).toBe(100);
    expect(diff.entries).toHaveLength(0);
  });
});

describe("text generators", () => {
  it("clamps generation counts to safe limits", () => {
    expect(normalizeGeneratorCount("words", 500)).toBe(200);
    expect(normalizeGeneratorCount("sentences", 0)).toBe(1);
    expect(normalizeGeneratorCount("paragraphs", 99)).toBe(12);
  });

  it("keeps generated output deterministic for the same seed", () => {
    const first = generateText("random", {
      count: 2,
      seed: 7,
      unit: "sentences",
    });
    const second = generateText("random", {
      count: 2,
      seed: 7,
      unit: "sentences",
    });

    expect(first).toBe(second);
    expect(generateText("random", { count: 2, seed: 8, unit: "sentences" })).not.toBe(first);
  });

  it("creates the requested number of lorem paragraphs", () => {
    const output = generateText("lorem", {
      count: 2,
      seed: 11,
      unit: "paragraphs",
    });

    expect(output.split("\n\n")).toHaveLength(2);
    expect(output).toContain(".");
  });

  it("supports injected random sources for deterministic generator tests", () => {
    const output = generateText(
      "random",
      {
        count: 3,
        seed: 999,
        unit: "words",
      },
      () => 0,
    );

    expect(output).toBe("anchor anchor anchor");
  });
});
