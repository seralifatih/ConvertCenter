export type MeasurementFamilyKey = "pressure" | "torque" | "viscosity";

export type MeasurementUnitKey =
  | "pressure:hpa"
  | "pressure:mmhg"
  | "pressure:bar"
  | "pressure:psi"
  | "torque:nm"
  | "torque:lbft"
  | "torque:lbin"
  | "torque:kgfm"
  | "viscosity:cp"
  | "viscosity:mpas"
  | "viscosity:pas"
  | "viscosity:p";

export type MeasurementUnitDefinition = {
  aliases: readonly string[];
  fromBase: (value: number) => number;
  key: MeasurementUnitKey;
  label: string;
  symbol: string;
  toBase: (value: number) => number;
};

export type MeasurementFamilyDefinition = {
  description: string;
  key: MeasurementFamilyKey;
  label: string;
  maxFractionDigits: number;
  units: readonly MeasurementUnitDefinition[];
};

function defineLinearMeasurementUnit(
  key: MeasurementUnitKey,
  label: string,
  symbol: string,
  factorToBase: number,
  aliases: readonly string[],
): MeasurementUnitDefinition {
  return {
    aliases,
    fromBase: (value) => value / factorToBase,
    key,
    label,
    symbol,
    toBase: (value) => value * factorToBase,
  };
}

const measurementFamilies = [
  {
    description: "Pressure conversions for weather maps, gauges, compressors, and technical checks.",
    key: "pressure",
    label: "pressure",
    maxFractionDigits: 4,
    units: [
      defineLinearMeasurementUnit("pressure:hpa", "Hectopascal", "hPa", 1, [
        "hpa",
        "hectopascal",
        "hectopascals",
      ]),
      defineLinearMeasurementUnit("pressure:mmhg", "Millimeter of Mercury", "mmHg", 1.33322387415, [
        "mmhg",
        "millimeter of mercury",
        "millimeters of mercury",
      ]),
      defineLinearMeasurementUnit("pressure:bar", "Bar", "bar", 1000, ["bar", "bars"]),
      defineLinearMeasurementUnit("pressure:psi", "Pound per Square Inch", "psi", 68.9475729318, [
        "psi",
        "pound per square inch",
        "pounds per square inch",
      ]),
    ],
  },
  {
    description: "Torque conversions for automotive, mechanical, and engineering work.",
    key: "torque",
    label: "torque",
    maxFractionDigits: 4,
    units: [
      defineLinearMeasurementUnit("torque:nm", "Newton-meter", "N·m", 1, [
        "nm",
        "newton meter",
        "newton meters",
        "newton-meter",
      ]),
      defineLinearMeasurementUnit("torque:lbft", "Pound-foot", "lb-ft", 1.3558179483314, [
        "lb ft",
        "lb-ft",
        "foot pound",
        "foot-pounds",
        "pound-foot",
      ]),
      defineLinearMeasurementUnit("torque:lbin", "Pound-inch", "lb-in", 0.1129848290276, [
        "lb in",
        "lb-in",
        "inch pound",
        "pound-inch",
      ]),
      defineLinearMeasurementUnit("torque:kgfm", "Kilogram-force meter", "kgf·m", 9.80665, [
        "kgfm",
        "kgf m",
        "kilogram force meter",
        "kilogram-force meter",
      ]),
    ],
  },
  {
    description: "Dynamic viscosity conversions for fluid, lab, and industrial references.",
    key: "viscosity",
    label: "viscosity",
    maxFractionDigits: 6,
    units: [
      defineLinearMeasurementUnit("viscosity:cp", "Centipoise", "cP", 1, [
        "cp",
        "centipoise",
      ]),
      defineLinearMeasurementUnit("viscosity:mpas", "Millipascal-second", "mPa·s", 1, [
        "mpas",
        "mPa s",
        "millipascal second",
        "millipascal-second",
      ]),
      defineLinearMeasurementUnit("viscosity:pas", "Pascal-second", "Pa·s", 1000, [
        "pas",
        "Pa s",
        "pascal second",
        "pascal-second",
      ]),
      defineLinearMeasurementUnit("viscosity:p", "Poise", "P", 100, ["p", "poise"]),
    ],
  },
] as const satisfies readonly MeasurementFamilyDefinition[];

const familyByKey = measurementFamilies.reduce<Record<MeasurementFamilyKey, MeasurementFamilyDefinition>>(
  (accumulator, family) => {
    accumulator[family.key] = family;
    return accumulator;
  },
  {
    pressure: measurementFamilies[0],
    torque: measurementFamilies[1],
    viscosity: measurementFamilies[2],
  },
);

const unitByKey = measurementFamilies.reduce<Record<MeasurementUnitKey, MeasurementUnitDefinition>>(
  (accumulator, family) => {
    for (const unit of family.units) {
      accumulator[unit.key] = unit;
    }

    return accumulator;
  },
  {
    "pressure:hpa": measurementFamilies[0].units[0],
    "pressure:mmhg": measurementFamilies[0].units[1],
    "pressure:bar": measurementFamilies[0].units[2],
    "pressure:psi": measurementFamilies[0].units[3],
    "torque:nm": measurementFamilies[1].units[0],
    "torque:lbft": measurementFamilies[1].units[1],
    "torque:lbin": measurementFamilies[1].units[2],
    "torque:kgfm": measurementFamilies[1].units[3],
    "viscosity:cp": measurementFamilies[2].units[0],
    "viscosity:mpas": measurementFamilies[2].units[1],
    "viscosity:pas": measurementFamilies[2].units[2],
    "viscosity:p": measurementFamilies[2].units[3],
  },
);

const unitToFamilyKey = measurementFamilies.reduce<Record<MeasurementUnitKey, MeasurementFamilyKey>>(
  (accumulator, family) => {
    for (const unit of family.units) {
      accumulator[unit.key] = family.key;
    }

    return accumulator;
  },
  {
    "pressure:hpa": "pressure",
    "pressure:mmhg": "pressure",
    "pressure:bar": "pressure",
    "pressure:psi": "pressure",
    "torque:nm": "torque",
    "torque:lbft": "torque",
    "torque:lbin": "torque",
    "torque:kgfm": "torque",
    "viscosity:cp": "viscosity",
    "viscosity:mpas": "viscosity",
    "viscosity:pas": "viscosity",
    "viscosity:p": "viscosity",
  },
);

export function getMeasurementFamilies() {
  return measurementFamilies.map((family) => ({
    ...family,
    units: [...family.units],
  }));
}

export function getMeasurementFamily(familyKey: MeasurementFamilyKey) {
  return familyByKey[familyKey];
}

export function getMeasurementUnit(unitKey: MeasurementUnitKey) {
  return unitByKey[unitKey];
}

export function getMeasurementFamilyForUnit(unitKey: MeasurementUnitKey) {
  return unitToFamilyKey[unitKey];
}

export function convertMeasurementValue(
  fromUnitKey: MeasurementUnitKey,
  toUnitKey: MeasurementUnitKey,
  value: number,
) {
  const fromFamily = getMeasurementFamilyForUnit(fromUnitKey);
  const toFamily = getMeasurementFamilyForUnit(toUnitKey);

  if (fromFamily !== toFamily) {
    throw new Error(`Cannot convert ${fromUnitKey} to ${toUnitKey} across measurement families.`);
  }

  const fromUnit = getMeasurementUnit(fromUnitKey);
  const toUnit = getMeasurementUnit(toUnitKey);

  return toUnit.fromBase(fromUnit.toBase(value));
}

export function formatMeasurementValue(familyKey: MeasurementFamilyKey, value: number) {
  const family = getMeasurementFamily(familyKey);

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: family.maxFractionDigits,
  }).format(Number(value.toFixed(family.maxFractionDigits)));
}

export function getMeasurementReferenceLine(
  fromUnitKey: MeasurementUnitKey,
  toUnitKey: MeasurementUnitKey,
) {
  const familyKey = getMeasurementFamilyForUnit(fromUnitKey);
  const oneUnit = convertMeasurementValue(fromUnitKey, toUnitKey, 1);
  const fromUnit = getMeasurementUnit(fromUnitKey);
  const toUnit = getMeasurementUnit(toUnitKey);

  return `1 ${fromUnit.symbol} = ${formatMeasurementValue(familyKey, oneUnit)} ${toUnit.symbol}`;
}
