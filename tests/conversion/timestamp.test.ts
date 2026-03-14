import { describe, expect, it } from "vitest";
import { dateToUnix, isoToDateTimeLocal, unixToDate } from "../../lib/timestamp";

describe("unix timestamp conversion", () => {
  it("converts unix seconds to an ISO date", () => {
    expect(unixToDate(1704067200)).toBe("2024-01-01T00:00:00.000Z");
  });

  it("converts a date string into unix seconds", () => {
    expect(dateToUnix("2024-01-01T00:00:00.000Z")).toBe(1704067200);
  });

  it("formats iso strings for datetime-local inputs", () => {
    expect(isoToDateTimeLocal("2024-01-01T00:00:00.000Z")).toBe("2024-01-01T00:00");
  });

  it("returns null for invalid conversion input", () => {
    expect(unixToDate(Number.NaN)).toBeNull();
    expect(dateToUnix("not-a-date")).toBeNull();
  });
});
