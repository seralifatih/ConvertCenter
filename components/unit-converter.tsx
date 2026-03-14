"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { ConverterErrorBoundary } from "@/components/converter-error-boundary";
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
  convertValue,
  formatNumber,
  getUnitReferenceLine,
  type CategoryKey,
  type UnitKey,
  units,
} from "@/lib/conversion/units";

type UnitConverterProps = {
  category: Exclude<CategoryKey, "text">;
  defaultFrom: UnitKey;
  defaultTo: UnitKey;
  defaultValue?: number;
  swapHref?: string;
  variant?: "free" | "pair";
};

export function UnitConverter({
  category,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
  swapHref,
  variant = "free",
}: UnitConverterProps) {
  const router = useRouter();
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [rawValue, setRawValue] = useState(String(defaultValue));

  function resetConverter() {
    setFromUnit(defaultFrom);
    setToUnit(defaultTo);
    setRawValue(String(defaultValue));
  }

  return (
    <ConverterErrorBoundary
      onReset={resetConverter}
      resetKeys={[category, fromUnit, toUnit, rawValue, variant]}
    >
      <UnitConverterContent
        category={category}
        defaultValue={defaultValue}
        fromUnit={fromUnit}
        onChangeFromUnit={setFromUnit}
        onChangeRawValue={setRawValue}
        onChangeToUnit={setToUnit}
        rawValue={rawValue}
        routerPush={router.push.bind(router)}
        swapHref={swapHref}
        toUnit={toUnit}
        variant={variant}
      />
    </ConverterErrorBoundary>
  );
}

type UnitConverterContentProps = {
  category: Exclude<CategoryKey, "text">;
  defaultValue: number;
  fromUnit: UnitKey;
  onChangeFromUnit: (value: UnitKey) => void;
  onChangeRawValue: (value: string) => void;
  onChangeToUnit: (value: UnitKey) => void;
  rawValue: string;
  routerPush: (href: string) => void;
  swapHref?: string;
  toUnit: UnitKey;
  variant: "free" | "pair";
};

function UnitConverterContent({
  category,
  defaultValue,
  fromUnit,
  onChangeFromUnit,
  onChangeRawValue,
  onChangeToUnit,
  rawValue,
  routerPush,
  swapHref,
  toUnit,
  variant,
}: UnitConverterContentProps) {
  const fromUnitControlId = `converter-from-unit-${category}-${variant}`;
  const fromValueControlId = `converter-from-value-${category}-${variant}`;
  const toUnitControlId = `converter-to-unit-${category}-${variant}`;
  const toValueControlId = `converter-to-value-${category}-${variant}`;
  const trimmedValue = rawValue.trim();

  if (!trimmedValue) {
    throw new Error("Enter a valid number.");
  }

  const numericValue = Number(trimmedValue);

  if (!Number.isFinite(numericValue)) {
    throw new Error("Enter a valid number.");
  }

  const result = convertValue(fromUnit, toUnit, numericValue);
  const formulaLine = getUnitReferenceLine(fromUnit, toUnit, variant === "pair" ? "formula" : "auto");
  const selectOptions = categoryUnits[category].map((unit) => ({
    value: unit,
    label: `${units[unit].pluralLabel} (${units[unit].shortLabel})`,
  }));

  function handleSwap() {
    const nextFromUnit = toUnit;
    const nextToUnit = fromUnit;

    onChangeFromUnit(nextFromUnit);
    onChangeToUnit(nextToUnit);

    if (variant === "pair" && swapHref) {
      startTransition(() => {
        routerPush(swapHref);
      });
      return;
    }
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-3 min-[520px]:grid-cols-[1fr_auto_1fr] min-[520px]:items-end">
        <ConverterField htmlFor={variant === "free" ? fromUnitControlId : fromValueControlId} label="from">
          {variant === "free" ? (
            <ConverterSelect
              ariaLabel="From unit"
              id={fromUnitControlId}
              onChange={onChangeFromUnit}
              options={selectOptions}
              value={fromUnit}
            />
          ) : (
            <div
              aria-label="From unit"
              className="input-surface px-3 py-3 text-sm text-[color:var(--text)]"
              id={fromUnitControlId}
            >
              {units[fromUnit].pluralLabel}
            </div>
          )}
          <ConverterNumberInput
            ariaLabel={`Value in ${units[fromUnit].pluralLabel.toLowerCase()}`}
            id={fromValueControlId}
            onChange={onChangeRawValue}
            value={rawValue}
          />
        </ConverterField>

        <button
          aria-label="Swap units"
          className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--input)] text-xl text-[color:var(--text)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent)] min-[520px]:mt-7"
          onClick={handleSwap}
          type="button"
        >
          {"\u2194"}
        </button>

        <ConverterField htmlFor={variant === "free" ? toUnitControlId : toValueControlId} label="to">
          {variant === "free" ? (
            <ConverterSelect
              ariaLabel="To unit"
              id={toUnitControlId}
              onChange={onChangeToUnit}
              options={selectOptions}
              value={toUnit}
            />
          ) : (
            <div
              aria-label="To unit"
              className="input-surface px-3 py-3 text-sm text-[color:var(--text)]"
              id={toUnitControlId}
            >
              {units[toUnit].pluralLabel}
            </div>
          )}
          <ConverterReadout
            ariaLabel={`Converted value in ${units[toUnit].pluralLabel.toLowerCase()}`}
            id={toValueControlId}
            unit={units[toUnit].shortLabel}
            value={formatNumber(result, category === "data" ? 6 : 4)}
          />
        </ConverterField>
      </div>

      <div className="mt-3 flex flex-col gap-3 border-t border-[color:var(--border)] pt-3 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs">{formulaLine}</span>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={formatNumber(result, category === "data" ? 6 : 4)} />
          <PillButton
            aria-label="Clear converter value"
            onClick={() => onChangeRawValue(String(defaultValue))}
          >
            clear
          </PillButton>
        </div>
      </div>
    </section>
  );
}
