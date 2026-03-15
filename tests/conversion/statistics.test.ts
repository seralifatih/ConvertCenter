import { describe, expect, it } from "vitest";
import {
  calculateMedian,
  calculateMode,
  calculatePopulationStandardDeviation,
  calculateRange,
} from "@/lib/statistics";

describe("statistics calculations", () => {
  it("calculates median for odd and even-length lists", () => {
    expect(calculateMedian([1, 5, 3])).toBe(3);
    expect(calculateMedian([1, 2, 3, 4])).toBe(2.5);
  });

  it("calculates mode results including no-mode datasets", () => {
    expect(calculateMode([1, 2, 2, 3])).toEqual({
      frequency: 2,
      hasMode: true,
      values: [2],
    });
    expect(calculateMode([1, 2, 3])).toEqual({
      frequency: 1,
      hasMode: false,
      values: [],
    });
  });

  it("calculates range and population standard deviation", () => {
    expect(calculateRange([12, 18, 9, 27, 14])).toBe(18);
    const result = calculatePopulationStandardDeviation([8, 10, 12, 14, 16]);

    expect(result?.mean).toBe(12);
    expect(result?.variance).toBe(8);
    expect(result?.standardDeviation).toBeCloseTo(2.8284271247461903, 10);
  });
});
