import { describe, expect, it } from "vitest";
import { fromScientificNotation, toScientificNotation } from "@/lib/scientific-notation";

describe("scientific notation helpers", () => {
  it("converts decimals to scientific notation", () => {
    expect(toScientificNotation(0.00056)).toEqual({
      coefficient: 5.6,
      exponent: -4,
      normalized: "5.6 x 10^-4",
    });
  });

  it("converts scientific notation to decimals", () => {
    expect(fromScientificNotation(3.2, 5)).toBe(320000);
  });

  it("returns null for invalid inputs", () => {
    expect(toScientificNotation(Number.NaN)).toBeNull();
    expect(fromScientificNotation(1.2, 1.5)).toBeNull();
  });
});
