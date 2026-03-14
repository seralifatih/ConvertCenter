import { describe, expect, it } from "vitest";
import { calculateAge } from "../../lib/date";

describe("age calculation", () => {
  it("calculates years months and days from a birthdate", () => {
    const result = calculateAge("2000-01-15", new Date(Date.UTC(2025, 2, 20)));

    expect(result).toEqual({
      approxMonths: 302,
      days: 5,
      months: 2,
      totalDays: 9196,
      totalWeeks: 1313,
      years: 25,
    });
  });

  it("returns null for invalid or future dates", () => {
    expect(calculateAge("not-a-date", new Date(Date.UTC(2025, 2, 20)))).toBeNull();
    expect(calculateAge("2099-01-01", new Date(Date.UTC(2025, 2, 20)))).toBeNull();
  });
});
