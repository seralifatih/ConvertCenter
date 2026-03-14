import { describe, expect, it } from "vitest";
import { convertTimeBetweenZones, parseTimeInput } from "@/lib/time-zone";

describe("time zone helpers", () => {
  it("parses valid time input", () => {
    expect(parseTimeInput("09:30")).toEqual({ hour: 9, minute: 30 });
  });

  it("rejects invalid time input", () => {
    expect(parseTimeInput("25:99")).toBeNull();
  });

  it("returns a converted time payload for valid zones", () => {
    const result = convertTimeBetweenZones("09:00", "America/New_York", "Europe/London");

    expect(result).not.toBeNull();
    expect(result?.convertedDateTime.length).toBeGreaterThan(0);
    expect(result?.sourceDateLabel.length).toBeGreaterThan(0);
  });
});

