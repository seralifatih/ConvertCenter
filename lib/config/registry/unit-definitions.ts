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
  defineLinearUnit("yd", "Yard", "Yards", "yd", "yards", 0.9144, [
    "yd",
    "yard",
    "yards",
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
  defineLinearUnit("floz", "Fluid Ounce", "Fluid Ounces", "fl oz", "floz", 29.5735295625, [
    "oz",
    "floz",
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
  defineLinearUnit("tbsp", "Tablespoon", "Tablespoons", "tbsp", "tbsp", 14.78676478125, [
    "tbsp",
    "tablespoon",
    "tablespoons",
  ]),
  defineLinearUnit("tsp", "Teaspoon", "Teaspoons", "tsp", "tsp", 4.92892159375, [
    "tsp",
    "teaspoon",
    "teaspoons",
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

export const windUnits = [
  defineLinearUnit("kmh", "Kilometer per Hour", "Kilometers per Hour", "km/h", "kmh", 1, [
    "kmh",
    "km/h",
    "kilometer per hour",
    "kilometers per hour",
    "kilometre per hour",
    "kilometres per hour",
  ]),
  defineLinearUnit("mph", "Mile per Hour", "Miles per Hour", "mph", "mph", 1.609344, [
    "mph",
    "mile per hour",
    "miles per hour",
  ]),
  defineLinearUnit("knot", "Knot", "Knots", "kn", "knots", 1.852, [
    "kn",
    "knot",
    "knots",
    "nautical mile per hour",
    "nautical miles per hour",
  ]),
] as const;

export const pressureUnits = [
  defineLinearUnit("hpa", "Hectopascal", "Hectopascals", "hPa", "hpa", 1, [
    "hpa",
    "hPa",
    "hectopascal",
    "hectopascals",
  ]),
  defineLinearUnit("mmhg", "Millimeter of Mercury", "Millimeters of Mercury", "mmHg", "mmhg", 1.33322387415, [
    "mmhg",
    "mm hg",
    "millimeter of mercury",
    "millimeters of mercury",
  ]),
  defineLinearUnit("bar", "Bar", "Bars", "bar", "bar", 1000, [
    "bar",
    "bars",
  ]),
  defineLinearUnit("psi", "Pound per Square Inch", "Pounds per Square Inch", "psi", "psi", 68.9475729318, [
    "psi",
    "pound per square inch",
    "pounds per square inch",
  ]),
] as const;

export const rainfallUnits = [
  defineLinearUnit("rainmm", "Millimeter of Rain", "Millimeters of Rain", "mm rain", "mm", 1, [
    "mm rain",
    "mm rainfall",
    "millimeter of rain",
    "millimeters of rain",
    "millimeter of rainfall",
    "millimeters of rainfall",
  ]),
  defineLinearUnit("raininch", "Inch of Rain", "Inches of Rain", "in rain", "inches-rain", 25.4, [
    "inch of rain",
    "inches of rain",
    "inch rain",
    "inches rain",
    "inch of rainfall",
    "inches of rainfall",
  ]),
] as const;

export const dataUnits = [
  defineLinearUnit("byte", "Byte", "Bytes", "B", "bytes", 1 / (1024 * 1024), [
    "b",
    "byte",
    "bytes",
  ]),
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
  ...windUnits,
  ...pressureUnits,
  ...rainfallUnits,
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
