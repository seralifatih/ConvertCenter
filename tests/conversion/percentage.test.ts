import { describe, expect, it } from "vitest";
import {
  applyPercentageAdjustment,
  calculatePercentageChange,
  getPercentageChangeState,
  percentOf,
  whatPercentOf,
} from "@/lib/percentage";

describe("percentage calculations", () => {
  it("calculates a percent of a value", () => {
    expect(percentOf(25, 200)).toBe(50);
  });

  it("calculates what percent one value is of another", () => {
    expect(whatPercentOf(45, 60)).toBe(75);
  });

  it("calculates percentage increase", () => {
    expect(calculatePercentageChange(100, 120)).toEqual({
      baselineType: "positive",
      difference: 20,
      direction: "increase",
      percentage: 20,
    });
  });

  it("calculates percentage decrease", () => {
    expect(calculatePercentageChange(200, 150)).toEqual({
      baselineType: "positive",
      difference: -50,
      direction: "decrease",
      percentage: 25,
    });
  });

  it("returns no-change when values are equal", () => {
    expect(calculatePercentageChange(50, 50)).toEqual({
      baselineType: "positive",
      difference: 0,
      direction: "no-change",
      percentage: 0,
    });
  });

  it("handles negative baselines using the absolute baseline size", () => {
    expect(calculatePercentageChange(-100, -80)).toEqual({
      baselineType: "negative",
      difference: 20,
      direction: "increase",
      percentage: 20,
    });
    expect(calculatePercentageChange(-100, -140)).toEqual({
      baselineType: "negative",
      difference: -40,
      direction: "decrease",
      percentage: 40,
    });
  });

  it("supports increase and decrease by percentage", () => {
    const increased = applyPercentageAdjustment(200, 15, "increase");
    const decreased = applyPercentageAdjustment(200, 15, "decrease");

    expect(increased?.direction).toBe("increase");
    expect(increased?.percentage).toBe(15);
    expect(increased?.delta).toBeCloseTo(30, 10);
    expect(increased?.result).toBeCloseTo(230, 10);

    expect(decreased?.direction).toBe("decrease");
    expect(decreased?.percentage).toBe(15);
    expect(decreased?.delta).toBeCloseTo(-30, 10);
    expect(decreased?.result).toBeCloseTo(170, 10);
  });

  it("returns zero-baseline state when the old value is zero", () => {
    expect(getPercentageChangeState(0, 50)).toEqual({
      difference: 50,
      kind: "zero-baseline",
    });
  });

  it("returns null or invalid state for invalid inputs", () => {
    expect(percentOf(Number.NaN, 50)).toBeNull();
    expect(whatPercentOf(10, 0)).toBeNull();
    expect(calculatePercentageChange(0, 50)).toBeNull();
    expect(calculatePercentageChange(Number.NaN, 50)).toBeNull();
    expect(calculatePercentageChange(50, Number.POSITIVE_INFINITY)).toBeNull();
    expect(applyPercentageAdjustment(Number.NaN, 15, "increase")).toBeNull();
    expect(getPercentageChangeState(Number.NaN, 50)).toEqual({ kind: "invalid" });
  });
});
