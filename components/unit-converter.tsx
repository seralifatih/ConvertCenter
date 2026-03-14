"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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

  const numericValue = Number(rawValue || 0);
  const result = convertValue(fromUnit, toUnit, numericValue);
  const formulaLine = getUnitReferenceLine(fromUnit, toUnit, variant === "pair" ? "formula" : "auto");
  const selectOptions = categoryUnits[category].map((unit) => ({
    value: unit,
    label: `${units[unit].pluralLabel} (${units[unit].shortLabel})`,
  }));

  function handleSwap() {
    if (variant === "pair" && swapHref) {
      router.push(swapHref);
      return;
    }

    setFromUnit(toUnit);
    setToUnit(fromUnit);
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-3 min-[480px]:grid-cols-[1fr_auto_1fr] min-[480px]:items-end">
        <ConverterField label="from">
          {variant === "free" ? (
            <ConverterSelect onChange={setFromUnit} options={selectOptions} value={fromUnit} />
          ) : (
            <div className="input-surface px-3 py-3 text-sm text-[color:var(--text)]">
              {units[fromUnit].pluralLabel}
            </div>
          )}
          <ConverterNumberInput onChange={setRawValue} value={rawValue} />
        </ConverterField>

        <button
          aria-label="Swap units"
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] text-lg text-[color:var(--muted)] hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)] hover:text-[color:var(--accent)] min-[480px]:mt-6"
          onClick={handleSwap}
          type="button"
        >
          {"\u2194"}
        </button>

        <ConverterField label="to">
          {variant === "free" ? (
            <ConverterSelect onChange={setToUnit} options={selectOptions} value={toUnit} />
          ) : (
            <div className="input-surface px-3 py-3 text-sm text-[color:var(--text)]">
              {units[toUnit].pluralLabel}
            </div>
          )}
          <ConverterReadout
            unit={units[toUnit].shortLabel}
            value={formatNumber(result, category === "data" ? 6 : 4)}
          />
        </ConverterField>
      </div>

      <div className="mt-3 flex flex-col gap-3 rounded-[14px] bg-[color:var(--surface)] px-4 py-3 text-sm text-[color:var(--muted)] sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-xs">{formulaLine}</span>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={formatNumber(result, category === "data" ? 6 : 4)} />
          <PillButton onClick={() => setRawValue("")}>clear</PillButton>
        </div>
      </div>
    </section>
  );
}
