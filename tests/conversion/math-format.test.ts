import { describe, expect, it } from "vitest";
import {
  formatMathValue,
  formatPercentValue,
  formatSignedMathValue,
} from "@/lib/math-format";

describe("math formatting", () => {
  it("formats values with grouping and controlled decimals", () => {
    expect(formatMathValue(12345.6789, 2)).toBe("12,345.68");
    expect(formatMathValue(12, 4)).toBe("12");
  });

  it("formats signed values consistently", () => {
    expect(formatSignedMathValue(25.5, 1)).toBe("+25.5");
    expect(formatSignedMathValue(-25.5, 1)).toBe("-25.5");
    expect(formatSignedMathValue(0)).toBe("0");
  });

  it("formats percentages with the percent sign", () => {
    expect(formatPercentValue(12.3456, 2)).toBe("12.35%");
  });
});
