import { describe, expect, it } from "vitest";
import { greatestCommonDivisor, simplifyRatio, solveProportion } from "@/lib/ratio";

describe("ratio calculations", () => {
  it("finds the greatest common divisor", () => {
    expect(greatestCommonDivisor(12, 18)).toBe(6);
  });

  it("simplifies ratios using the gcd", () => {
    expect(simplifyRatio(4, 8)).toEqual({ left: 1, right: 2 });
    expect(simplifyRatio(150, 100)).toEqual({ left: 3, right: 2 });
  });

  it("returns null for invalid simplify inputs", () => {
    expect(simplifyRatio(0, 8)).toBeNull();
    expect(simplifyRatio(4.5, 9)).toBeNull();
    expect(simplifyRatio(Number.NaN, 9)).toBeNull();
  });

  it("solves proportions", () => {
    expect(solveProportion(1, 2, 3)).toEqual({
      missingValue: 6,
      ratio: { left: 1, right: 2 },
    });
  });

  it("returns null for invalid proportion inputs", () => {
    expect(solveProportion(0, 2, 3)).toBeNull();
    expect(solveProportion(2, Number.POSITIVE_INFINITY, 3)).toBeNull();
  });
});
