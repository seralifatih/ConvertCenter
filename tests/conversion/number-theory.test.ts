import { describe, expect, it } from "vitest";
import { leastCommonMultiple } from "@/lib/number-theory";

describe("number theory helpers", () => {
  it("calculates least common multiples", () => {
    expect(leastCommonMultiple(12, 18)).toBe(36);
    expect(leastCommonMultiple(7, 9)).toBe(63);
  });

  it("returns null for invalid lcm inputs", () => {
    expect(leastCommonMultiple(0, 9)).toBeNull();
    expect(leastCommonMultiple(1.5, 9)).toBeNull();
  });
});
