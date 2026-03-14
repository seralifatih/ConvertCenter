"use client";

import {
  ConverterField,
  ConverterNumberInput,
  ConverterReadout,
  ConverterSelect,
} from "@/components/converter-controls";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  categoryUnits,
  formatNumber,
  type NumericCategoryKey,
  type UnitKey,
  units,
} from "@/lib/conversion/units";

export function getConverterSelectOptions(category: NumericCategoryKey) {
  return categoryUnits[category].map((unit) => ({
    value: unit,
    label: `${units[unit].pluralLabel} (${units[unit].shortLabel})`,
  }));
}

export function formatConverterOutput(category: NumericCategoryKey, value: number) {
  return formatNumber(value, category === "data" ? 6 : 4);
}

export function SwapButton({
  onClick,
}: Readonly<{
  onClick: () => void;
}>) {
  return (
    <button
      aria-label="Swap units"
      className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--input)] text-xl text-[color:var(--text)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent)] min-[520px]:mt-7"
      onClick={onClick}
      type="button"
    >
      {"\u2194"}
    </button>
  );
}

export function ConverterActions({
  copyText,
  defaultValue,
  formulaLine,
  onClear,
}: Readonly<{
  copyText?: string;
  defaultValue: string;
  formulaLine: string;
  onClear: () => void;
}>) {
  return (
    <div className="mt-3 flex flex-col gap-3 border-t border-[color:var(--border)] pt-3 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
      <span className="font-mono text-xs">{formulaLine}</span>
      <div className="flex flex-wrap gap-2">
        <CopyButton text={copyText ?? defaultValue} />
        <PillButton aria-label="Clear converter value" onClick={onClear}>
          clear
        </PillButton>
      </div>
    </div>
  );
}

export function FreeFromField({
  category,
  fromUnit,
  fromUnitControlId,
  fromValueControlId,
  onChangeFromUnit,
  onChangeRawValue,
  rawValue,
}: Readonly<{
  category: NumericCategoryKey;
  fromUnit: UnitKey;
  fromUnitControlId: string;
  fromValueControlId: string;
  onChangeFromUnit: (value: UnitKey) => void;
  onChangeRawValue: (value: string) => void;
  rawValue: string;
}>) {
  const selectOptions = getConverterSelectOptions(category);

  return (
    <ConverterField htmlFor={fromUnitControlId} label="from">
      <ConverterSelect
        ariaLabel="From unit"
        id={fromUnitControlId}
        onChange={onChangeFromUnit}
        options={selectOptions}
        value={fromUnit}
      />
      <ConverterNumberInput
        ariaLabel={`Value in ${units[fromUnit].pluralLabel.toLowerCase()}`}
        id={fromValueControlId}
        onChange={onChangeRawValue}
        value={rawValue}
      />
    </ConverterField>
  );
}

export function FreeToField({
  category,
  onChangeToUnit,
  readoutValue,
  toUnit,
  toUnitControlId,
  toValueControlId,
}: Readonly<{
  category: NumericCategoryKey;
  onChangeToUnit: (value: UnitKey) => void;
  readoutValue: string;
  toUnit: UnitKey;
  toUnitControlId: string;
  toValueControlId: string;
}>) {
  const selectOptions = getConverterSelectOptions(category);

  return (
    <ConverterField htmlFor={toUnitControlId} label="to">
      <ConverterSelect
        ariaLabel="To unit"
        id={toUnitControlId}
        onChange={onChangeToUnit}
        options={selectOptions}
        value={toUnit}
      />
      <ConverterReadout
        ariaLabel={`Converted value in ${units[toUnit].pluralLabel.toLowerCase()}`}
        id={toValueControlId}
        unit={units[toUnit].shortLabel}
        value={readoutValue}
      />
    </ConverterField>
  );
}

export function PairFromField({
  fromUnit,
  fromUnitControlId,
  fromValueControlId,
  onChangeRawValue,
  rawValue,
}: Readonly<{
  fromUnit: UnitKey;
  fromUnitControlId: string;
  fromValueControlId: string;
  onChangeRawValue: (value: string) => void;
  rawValue: string;
}>) {
  return (
    <ConverterField htmlFor={fromValueControlId} label="from">
      <div
        aria-label="From unit"
        className="input-surface px-3 py-3 text-sm text-[color:var(--text)]"
        id={fromUnitControlId}
      >
        {units[fromUnit].pluralLabel}
      </div>
      <ConverterNumberInput
        ariaLabel={`Value in ${units[fromUnit].pluralLabel.toLowerCase()}`}
        id={fromValueControlId}
        onChange={onChangeRawValue}
        value={rawValue}
      />
    </ConverterField>
  );
}

export function PairToField({
  readoutValue,
  toUnit,
  toUnitControlId,
  toValueControlId,
}: Readonly<{
  readoutValue: string;
  toUnit: UnitKey;
  toUnitControlId: string;
  toValueControlId: string;
}>) {
  return (
    <ConverterField htmlFor={toValueControlId} label="to">
      <div
        aria-label="To unit"
        className="input-surface px-3 py-3 text-sm text-[color:var(--text)]"
        id={toUnitControlId}
      >
        {units[toUnit].pluralLabel}
      </div>
      <ConverterReadout
        ariaLabel={`Converted value in ${units[toUnit].pluralLabel.toLowerCase()}`}
        className={!readoutValue ? "border-[color:var(--border)] bg-[color:var(--surface)]" : undefined}
        id={toValueControlId}
        unit={units[toUnit].shortLabel}
        value={readoutValue || "—"}
      />
    </ConverterField>
  );
}
