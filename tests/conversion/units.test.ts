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

  it("converts kilobytes to megabytes", () => {
    expect(convertValue("kb", "mb", 2048)).toBe(2);
  });

  it("converts terabytes to gigabytes", () => {
    expect(convertValue("tb", "gb", 2)).toBe(2048);
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
