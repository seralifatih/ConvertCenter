import { describe, expect, it } from "vitest";
import { calculateAverage, parseNumberList } from "@/lib/average";

describe("average calculations", () => {
  it("parses comma and newline separated values", () => {
    expect(parseNumberList("10, 20\n30")).toEqual([10, 20, 30]);
  });

  it("ignores blank tokens and invalid values", () => {
    expect(parseNumberList("10,\n, 20\n\n apples \n30")).toEqual([10, 20, 30]);
  });

  it("calculates the arithmetic mean", () => {
    expect(calculateAverage([10, 20, 30, 40])).toEqual({
      average: 25,
      count: 4,
      sum: 100,
      values: [10, 20, 30, 40],
    });
    expect(calculateAverage(parseNumberList("10, 20\n30"))).toEqual({
      average: 20,
      count: 3,
      sum: 60,
      values: [10, 20, 30],
    });
  });

  it("returns null for empty or invalid input", () => {
    expect(calculateAverage([])).toBeNull();
    expect(calculateAverage([10, Number.NaN])).toBeNull();
  });
});
