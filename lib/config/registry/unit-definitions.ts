import type {
  FormulaUnitSchema,
  LinearUnitSchema,
  NumericUnitSchema,
  UnitKey,
} from "./conversion-types";

function defineLinearUnit(
  key: UnitKey,
  label: string,
  pluralLabel: string,
  symbol: string,
  routeSegment: string,
  factorToBase: number,
  aliases: readonly string[],
): LinearUnitSchema {
  return {
    aliases,
    factorToBase,
    key,
    label,
    pluralLabel,
    routeSegment,
    symbol,
    type: "linear",
  };
}

function defineFormulaUnit(
  key: UnitKey,
  label: string,
  pluralLabel: string,
  symbol: string,
  routeSegment: string,
  toBase: (value: number) => number,
  fromBase: (value: number) => number,
  aliases: readonly string[],
): FormulaUnitSchema {
  return {
    aliases,
    fromBase,
    key,
    label,
    pluralLabel,
    routeSegment,
    symbol,
    toBase,
    type: "formula",
  };
}

export const weightUnits = [
  defineLinearUnit("kg", "Kilogram", "Kilograms", "kg", "kg", 1, [
    "kg",
    "kilogram",
    "kilograms",
    "kilo",
  ]),
  defineLinearUnit("lb", "Pound", "Pounds", "lb", "lbs", 0.45359237, [
    "lb",
    "lbs",
    "pound",
    "pounds",
  ]),
  defineLinearUnit("g", "Gram", "Grams", "g", "grams", 0.001, ["g", "gram", "grams"]),
  defineLinearUnit("oz", "Ounce", "Ounces", "oz", "ounces", 0.028349523125, [
    "oz",
    "ounce",
    "ounces",
  ]),
] as const;

export const lengthUnits = [
  defineLinearUnit("km", "Kilometer", "Kilometers", "km", "km", 1000, [
    "km",
    "kilometer",
    "kilometers",
    "kilometre",
    "kilometres",
  ]),
  defineLinearUnit("cm", "Centimeter", "Centimeters", "cm", "cm", 0.01, [
    "cm",
    "centimeter",
    "centimeters",
  ]),
  defineLinearUnit("inch", "Inch", "Inches", "in", "inches", 0.0254, [
    "in",
    "inch",
    "inches",
  ]),
  defineLinearUnit("m", "Meter", "Meters", "m", "meters", 1, [
    "m",
    "meter",
    "meters",
    "metre",
    "metres",
  ]),
  defineLinearUnit("ft", "Foot", "Feet", "ft", "feet", 0.3048, [
    "ft",
    "foot",
    "feet",
  ]),
  defineLinearUnit("mile", "Mile", "Miles", "mi", "miles", 1609.344, [
    "mi",
    "mile",
    "miles",
  ]),
] as const;

export const volumeUnits = [
  defineLinearUnit("l", "Liter", "Liters", "L", "liters", 1000, [
    "l",
    "liter",
    "liters",
    "litre",
    "litres",
  ]),
  defineLinearUnit("ml", "Milliliter", "Milliliters", "ml", "ml", 1, [
    "ml",
    "milliliter",
    "milliliters",
    "millilitre",
    "millilitres",
  ]),
  defineLinearUnit("floz", "Fluid Ounce", "Fluid Ounces", "oz", "oz", 29.5735295625, [
    "oz",
    "fluid ounce",
    "fluid ounces",
    "fl oz",
  ]),
  defineLinearUnit("gal", "Gallon", "Gallons", "gal", "gallons", 3785.411784, [
    "gal",
    "gallon",
    "gallons",
  ]),
  defineLinearUnit("cup", "Cup", "Cups", "cup", "cups", 236.5882365, [
    "cup",
    "cups",
  ]),
] as const;

export const temperatureUnits = [
  defineFormulaUnit(
    "c",
    "Celsius",
    "Degrees Celsius",
    "\u00b0C",
    "celsius",
    (value) => value,
    (value) => value,
    ["c", "celsius", "centigrade"],
  ),
  defineFormulaUnit(
    "f",
    "Fahrenheit",
    "Degrees Fahrenheit",
    "\u00b0F",
    "fahrenheit",
    (value) => ((value - 32) * 5) / 9,
    (value) => (value * 9) / 5 + 32,
    ["f", "fahrenheit"],
  ),
  defineFormulaUnit(
    "k",
    "Kelvin",
    "Kelvin",
    "K",
    "kelvin",
    (value) => value - 273.15,
    (value) => value + 273.15,
    ["k", "kelvin"],
  ),
] as const;

export const dataUnits = [
  defineLinearUnit("kb", "Kilobyte", "Kilobytes", "KB", "kb", 1 / 1024, [
    "kb",
    "kilobyte",
    "kilobytes",
  ]),
  defineLinearUnit("mb", "Megabyte", "Megabytes", "MB", "mb", 1, [
    "mb",
    "megabyte",
    "megabytes",
  ]),
  defineLinearUnit("gb", "Gigabyte", "Gigabytes", "GB", "gb", 1024, [
    "gb",
    "gigabyte",
    "gigabytes",
  ]),
  defineLinearUnit("tb", "Terabyte", "Terabytes", "TB", "tb", 1024 * 1024, [
    "tb",
    "terabyte",
    "terabytes",
  ]),
] as const;

export const numericUnitRegistry = [
  ...weightUnits,
  ...lengthUnits,
  ...volumeUnits,
  ...temperatureUnits,
  ...dataUnits,
] as const;

const unitConfigByKey = Object.fromEntries(
  numericUnitRegistry.map((unit) => [unit.key, unit]),
) as Record<UnitKey, NumericUnitSchema>;

export function getUnitConfig(unitKey: UnitKey) {
  return unitConfigByKey[unitKey];
}

export function getUnitLabel(unitKey: UnitKey) {
  return getUnitConfig(unitKey).label;
}

export function getUnitPluralLabel(unitKey: UnitKey) {
  return getUnitConfig(unitKey).pluralLabel;
}

export function getUnitSymbol(unitKey: UnitKey) {
  return getUnitConfig(unitKey).symbol;
}

export function getUnitAliases(unitKey: UnitKey) {
  return [...getUnitConfig(unitKey).aliases];
}

export function buildUnitPairSlug(fromUnitKey: UnitKey, toUnitKey: UnitKey) {
  return `${getUnitConfig(fromUnitKey).routeSegment}-to-${getUnitConfig(toUnitKey).routeSegment}`;
}
