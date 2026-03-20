import { describe, expect, it } from "vitest";
import {
  convertValue,
  getUnitFormula,
  getUnitReferenceLine,
  hasExplicitUnitFormula,
} from "../../lib/conversion/units";

describe("unit conversions", () => {
  it("converts kilograms to pounds", () => {
    expect(convertValue("kg", "lb", 10)).toBeCloseTo(22.0462, 4);
  });

  it("converts pounds to kilograms", () => {
    expect(convertValue("lb", "kg", 165)).toBeCloseTo(74.8427, 4);
  });

  it("converts celsius to fahrenheit", () => {
    expect(convertValue("c", "f", 100)).toBe(212);
  });

  it("converts gigabytes to megabytes using binary units", () => {
    expect(convertValue("gb", "mb", 5)).toBe(5120);
  });

  it("converts kilometers to miles", () => {
    expect(convertValue("km", "mile", 5)).toBeCloseTo(3.1069, 4);
  });

  it("converts liters to gallons", () => {
    expect(convertValue("l", "gal", 3)).toBeCloseTo(0.7925, 4);
  });

  it("converts tablespoons to milliliters", () => {
    expect(convertValue("tbsp", "ml", 2)).toBeCloseTo(29.5735, 4);
  });

  it("converts milliliters to tablespoons", () => {
    expect(convertValue("ml", "tbsp", 30)).toBeCloseTo(2.0288, 4);
  });

  it("converts milliliters to teaspoons", () => {
    expect(convertValue("ml", "tsp", 10)).toBeCloseTo(2.0288, 4);
  });

  it("converts teaspoons to milliliters", () => {
    expect(convertValue("tsp", "ml", 3)).toBeCloseTo(14.7868, 4);
  });

  it("converts cups to milliliters", () => {
    expect(convertValue("cup", "ml", 1)).toBeCloseTo(236.5882, 4);
  });

  it("converts milliliters to cups", () => {
    expect(convertValue("ml", "cup", 500)).toBeCloseTo(2.1134, 4);
  });

  it("converts feet to centimeters", () => {
    expect(convertValue("ft", "cm", 6)).toBeCloseTo(182.88, 2);
  });

  it("converts yards to meters", () => {
    expect(convertValue("yd", "m", 10)).toBeCloseTo(9.144, 3);
  });

  it("converts fluid ounces to milliliters", () => {
    expect(convertValue("floz", "ml", 8)).toBeCloseTo(236.5882, 4);
  });

  it("converts fahrenheit to kelvin", () => {
    expect(convertValue("f", "k", 72)).toBeCloseTo(295.3722, 4);
  });

  it("converts kilobytes to megabytes", () => {
    expect(convertValue("kb", "mb", 2048)).toBe(2);
  });

  it("converts bytes to megabytes", () => {
    expect(convertValue("byte", "mb", 1048576)).toBe(1);
  });

  it("converts megabytes to bytes", () => {
    expect(convertValue("mb", "byte", 1)).toBe(1048576);
  });

  it("converts kilobytes to bytes", () => {
    expect(convertValue("kb", "byte", 1)).toBe(1024);
  });

  it("converts bytes to kilobytes", () => {
    expect(convertValue("byte", "kb", 2048)).toBe(2);
  });

  it("converts terabytes to gigabytes", () => {
    expect(convertValue("tb", "gb", 2)).toBe(2048);
  });

  it("converts megabytes to kilobytes", () => {
    expect(convertValue("mb", "kb", 2)).toBe(2048);
  });

  it("converts miles per hour to kilometers per hour", () => {
    expect(convertValue("mph", "kmh", 60)).toBeCloseTo(96.5606, 4);
  });

  it("converts kilometers per hour to knots", () => {
    expect(convertValue("kmh", "knot", 100)).toBeCloseTo(53.9957, 4);
  });

  it("converts hectopascals to millimeters of mercury", () => {
    expect(convertValue("hpa", "mmhg", 1013.25)).toBeCloseTo(760, 2);
  });

  it("converts bar to psi", () => {
    expect(convertValue("bar", "psi", 1)).toBeCloseTo(14.5038, 4);
  });

  it("converts millimeters of rain to inches of rain", () => {
    expect(convertValue("rainmm", "raininch", 25.4)).toBeCloseTo(1, 4);
  });

  it("converts inches of rain to millimeters of rain", () => {
    expect(convertValue("raininch", "rainmm", 2)).toBeCloseTo(50.8, 4);
  });

  it("returns custom formulas for temperature pairs", () => {
    expect(getUnitFormula("c", "f")).toBe("\u00b0F = (\u00b0C x 9/5) + 32");
    expect(getUnitFormula("f", "c")).toBe("\u00b0C = (\u00b0F - 32) x 5/9");
  });

  it("marks temperature pairs as explicit formulas", () => {
    expect(hasExplicitUnitFormula("c", "f")).toBe(true);
    expect(hasExplicitUnitFormula("f", "c")).toBe(true);
    expect(hasExplicitUnitFormula("kg", "lb")).toBe(false);
  });

  it("uses formula references for temperature in auto mode", () => {
    expect(getUnitReferenceLine("c", "f")).toBe("\u00b0F = (\u00b0C x 9/5) + 32");
    expect(getUnitReferenceLine("f", "c")).toBe("\u00b0C = (\u00b0F - 32) x 5/9");
    expect(getUnitReferenceLine("kg", "lb")).toBe("1 kg = 2.204623 lb");
  });
});
