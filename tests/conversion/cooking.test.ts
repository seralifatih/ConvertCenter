import { describe, expect, it } from "vitest";
import {
  convertCookingValue,
  cookingIngredients,
  cupsToGrams,
  gramsToCups,
  gramsToTeaspoons,
  teaspoonsToGrams,
} from "@/lib/cooking";

describe("cooking conversions", () => {
  it("converts cups of flour to grams", () => {
    expect(cupsToGrams(2, "flour")).toBe(240);
  });

  it("converts cups of sugar to grams", () => {
    expect(cupsToGrams(1.5, "sugar")).toBe(300);
  });

  it("converts grams of sugar to cups", () => {
    expect(gramsToCups(200, "sugar")).toBe(1);
  });

  it("converts grams of flour to cups", () => {
    expect(gramsToCups(180, "flour")).toBeCloseTo(1.5, 3);
  });

  it("converts teaspoons of butter to grams", () => {
    expect(teaspoonsToGrams(2, "butter")).toBeCloseTo(9.46, 2);
  });

  it("converts grams of sugar to teaspoons", () => {
    expect(gramsToTeaspoons(12.6, "sugar")).toBeCloseTo(3, 3);
  });

  it("routes conversion modes through the shared cooking helper", () => {
    expect(convertCookingValue(1, "flour", "cupsToGrams")).toBe(cookingIngredients.flour.gramsPerCup);
    expect(convertCookingValue(8.4, "sugar", "gramsToTeaspoons")).toBeCloseTo(2, 3);
  });

  it("returns null for invalid cooking input values", () => {
    expect(cupsToGrams(Number.NaN, "flour")).toBeNull();
    expect(gramsToCups(Number.POSITIVE_INFINITY, "sugar")).toBeNull();
    expect(teaspoonsToGrams(Number.NEGATIVE_INFINITY, "butter")).toBeNull();
    expect(gramsToTeaspoons(Number.NaN, "sugar")).toBeNull();
  });
});
