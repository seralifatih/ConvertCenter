import { describe, expect, it } from "vitest";
import {
  estimatePasswordEntropy,
  formatRandomColor,
  generateRandomColors,
  generateRandomNames,
  generateRandomNumbers,
  generateRandomPasswords,
  generateRandomTeams,
} from "../../lib/conversion/generator-tools";
import {
  getDefaultGeneratorToolValues,
  getGeneratorToolDefinition,
  getGeneratorToolDefinitions,
} from "../../lib/generator-tools/registry";

describe("generator tool logic", () => {
  it("generates deterministic random numbers with an injected random source", () => {
    const numbers = generateRandomNumbers(
      {
        count: 3,
        decimals: 0,
        max: 9,
        min: 2,
        unique: false,
      },
      () => 0,
    );

    expect(numbers).toEqual(["2", "2", "2"]);
  });

  it("generates deterministic placeholder names with an injected random source", () => {
    const names = generateRandomNames(
      {
        count: 2,
        style: "full",
      },
      () => 0,
    );

    expect(names).toEqual(["Ayla Aydin", "Ayla Aydin"]);
  });

  it("generates deterministic passwords with entropy and strength feedback", () => {
    const result = generateRandomPasswords(
      {
        count: 1,
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: false,
        includeUppercase: true,
        length: 6,
      },
      () => 0,
    );

    expect(result.passwords).toEqual(["a0AAAA"]);
    expect(result.entropyBits).toBeCloseTo(35.73, 2);
    expect(result.strength.label).toBe("Fair");
    expect(result.strength.suggestions).toEqual(
      expect.arrayContaining([
        "Use at least 8 characters.",
        "Aim for 12 or more characters for stronger passwords.",
        "Add a symbol like !, @, or #.",
        "Avoid repeating the same character several times.",
      ]),
    );
  });

  it("generates deterministic color palettes and format conversions", () => {
    const colors = generateRandomColors({ count: 2 }, () => 0);

    expect(colors).toEqual([
      {
        hex: "#000000",
        hsl: "hsl(0, 0%, 0%)",
        rgb: "rgb(0, 0, 0)",
      },
      {
        hex: "#000000",
        hsl: "hsl(0, 0%, 0%)",
        rgb: "rgb(0, 0, 0)",
      },
    ]);
    expect(formatRandomColor(colors[0]!, "hex")).toBe("#000000");
    expect(formatRandomColor(colors[0]!, "rgb")).toBe("rgb(0, 0, 0)");
    expect(formatRandomColor(colors[0]!, "hsl")).toBe("hsl(0, 0%, 0%)");
  });

  it("generates deterministic balanced teams from a cleaned participant list", () => {
    const teams = generateRandomTeams(
      {
        names: "A\nB\n\nC\nB\nD",
        teamCount: 2,
      },
      () => 0,
    );

    expect(teams).toEqual([
      {
        label: "Team 1",
        members: ["B", "D"],
      },
      {
        label: "Team 2",
        members: ["C", "A"],
      },
    ]);
  });

  it("computes password entropy defensively", () => {
    expect(estimatePasswordEntropy(0, 62)).toBe(0);
    expect(estimatePasswordEntropy(10, 0)).toBe(0);
    expect(estimatePasswordEntropy(8, 2)).toBe(8);
  });
});

describe("generator tool registry", () => {
  it("registers the full generator family", () => {
    const toolIds = new Set(getGeneratorToolDefinitions().map((tool) => tool.id));

    expect(toolIds).toEqual(
      new Set([
        "random-number-generator",
        "random-name-generator",
        "random-password-generator",
        "random-color-generator",
        "random-team-generator",
        "random-text-generator",
        "lorem-ipsum-generator",
      ]),
    );
  });

  it("exposes default values for shared generator widgets", () => {
    const tool = getGeneratorToolDefinition("random-password-generator");

    expect(tool?.title).toBe("Random Password Generator");

    if (!tool) {
      return;
    }

    expect(getDefaultGeneratorToolValues(tool)).toEqual(
      expect.objectContaining({
        count: "3",
        includeLowercase: true,
        includeNumbers: true,
        includeSymbols: true,
        includeUppercase: true,
        length: "16",
      }),
    );
  });
});
