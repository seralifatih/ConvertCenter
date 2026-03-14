import {
  getLaunchToolConfig,
  getNumericCategoryConfigs,
  getUnitConfig,
  type CategoryKey,
  type NumericCategoryKey,
  type UnitKey,
} from "@/lib/config/conversion-registry";

export type { CategoryKey, NumericCategoryKey, UnitKey };

export type UnitDefinition = {
  aliases: string[];
  category: NumericCategoryKey;
  key: UnitKey;
  label: string;
  pluralLabel: string;
  shortLabel: string;
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
};

const numericCategoryByUnit = Object.fromEntries(
  getNumericCategoryConfigs().flatMap((category) =>
    category.units.map((unit) => [unit.key, category.key]),
  ),
) as Record<UnitKey, NumericCategoryKey>;

export const units = Object.fromEntries(
  getNumericCategoryConfigs().flatMap((category) =>
    category.units.map((unit) => [
      unit.key,
      {
        aliases: [...unit.aliases],
        category: category.key,
        fromBase:
          unit.type === "linear"
            ? (value: number) => value / unit.factorToBase
            : unit.fromBase,
        key: unit.key,
        label: unit.label,
        pluralLabel: unit.pluralLabel,
        shortLabel: unit.symbol,
        toBase:
          unit.type === "linear"
            ? (value: number) => value * unit.factorToBase
            : unit.toBase,
      },
    ]),
  ),
) as Record<UnitKey, UnitDefinition>;

export const categoryUnits = Object.fromEntries(
  getNumericCategoryConfigs().map((category) => [
    category.key,
    category.units.map((unit) => unit.key),
  ]),
) as Record<NumericCategoryKey, UnitKey[]>;

export function convertValue(from: UnitKey, to: UnitKey, value: number) {
  const fromUnit = units[from];
  const toUnit = units[to];

  if (fromUnit.category !== toUnit.category) {
    throw new Error(`Cannot convert ${from} to ${to} across categories.`);
  }

  return toUnit.fromBase(fromUnit.toBase(value));
}

export function getUnitFactor(from: UnitKey, to: UnitKey) {
  return convertValue(from, to, 1);
}

export function formatNumber(value: number, maximumFractionDigits = 4) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(Number(value.toFixed(maximumFractionDigits)));
}

export function getUnitFormula(from: UnitKey, to: UnitKey) {
  const pairSlug = `${getUnitConfig(from).routeSegment}-to-${getUnitConfig(to).routeSegment}`;
  const pairConfig = getLaunchToolConfig(pairSlug);

  if (pairConfig?.kind === "numeric-pair" && pairConfig.formulaLabel) {
    return pairConfig.formulaLabel;
  }

  return `${units[to].label.toLowerCase()} = ${units[from].label.toLowerCase()} x ${formatNumber(
    getUnitFactor(from, to),
    6,
  )}`;
}

export function hasExplicitUnitFormula(from: UnitKey, to: UnitKey) {
  const pairSlug = `${getUnitConfig(from).routeSegment}-to-${getUnitConfig(to).routeSegment}`;
  const pairConfig = getLaunchToolConfig(pairSlug);

  return Boolean(pairConfig?.kind === "numeric-pair" && pairConfig.formulaLabel);
}

export function getUnitRateLine(from: UnitKey, to: UnitKey) {
  return `1 ${units[from].shortLabel} = ${formatNumber(getUnitFactor(from, to), 6)} ${units[
    to
  ].shortLabel}`;
}

export function getUnitReferenceLine(
  from: UnitKey,
  to: UnitKey,
  mode: "auto" | "formula" | "rate" = "auto",
) {
  if (mode === "formula") {
    return getUnitFormula(from, to);
  }

  if (mode === "rate") {
    return getUnitRateLine(from, to);
  }

  return hasExplicitUnitFormula(from, to)
    ? getUnitFormula(from, to)
    : getUnitRateLine(from, to);
}

export function getUnitCategory(unitKey: UnitKey) {
  return numericCategoryByUnit[unitKey];
}
