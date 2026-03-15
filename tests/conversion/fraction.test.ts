import { describe, expect, it } from "vitest";
import { decimalToFraction, fractionToDecimal, simplifyFraction } from "@/lib/fraction";

describe("fraction calculations", () => {
  it("simplifies valid fractions", () => {
    expect(simplifyFraction(18, 24)).toEqual({ denominator: 4, numerator: 3 });
    expect(simplifyFraction(-10, -20)).toEqual({ denominator: 2, numerator: 1 });
  });

  it("converts fractions to decimals", () => {
    expect(fractionToDecimal(3, 8)).toBe(0.375);
  });

  it("converts terminating decimals to fractions", () => {
    expect(decimalToFraction("0.75")).toEqual({ denominator: 4, numerator: 3 });
    expect(decimalToFraction("2.5")).toEqual({ denominator: 2, numerator: 5 });
  });

  it("returns null for invalid inputs", () => {
    expect(simplifyFraction(1.5, 2)).toBeNull();
    expect(fractionToDecimal(1, 0)).toBeNull();
    expect(decimalToFraction("not-a-number")).toBeNull();
  });
});
