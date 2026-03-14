import { describe, expect, it } from "vitest";
import { calculatePercentageChange } from "@/lib/percentage";

describe("percentage calculations", () => {
  it("calculates percentage increase", () => {
    expect(calculatePercentageChange(100, 120)).toEqual({
      difference: 20,
      direction: "increase",
      percentage: 20,
    });
  });

  it("calculates percentage decrease", () => {
    expect(calculatePercentageChange(200, 150)).toEqual({
      difference: -50,
      direction: "decrease",
      percentage: 25,
    });
  });

  it("returns no-change when values are equal", () => {
    expect(calculatePercentageChange(50, 50)).toEqual({
      difference: 0,
      direction: "no-change",
      percentage: 0,
    });
  });

  it("returns null for invalid or zero-base input", () => {
    expect(calculatePercentageChange(0, 50)).toBeNull();
    expect(calculatePercentageChange(Number.NaN, 50)).toBeNull();
    expect(calculatePercentageChange(50, Number.POSITIVE_INFINITY)).toBeNull();
  });
});
