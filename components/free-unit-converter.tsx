"use client";

import { useEffect, useState } from "react";
import { ConverterErrorBoundary } from "@/components/converter-error-boundary";
import {
  ConverterActions,
  FreeFromField,
  FreeToField,
  formatConverterOutput,
  SwapButton,
} from "@/components/unit-converter-shared";
import {
  convertValue,
  getUnitReferenceLine,
  type NumericCategoryKey,
  type UnitKey,
} from "@/lib/conversion/units";

type FreeUnitConverterProps = {
  category: NumericCategoryKey;
  defaultFrom: UnitKey;
  defaultTo: UnitKey;
  defaultValue?: number;
};

export function FreeUnitConverter({
  category,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
}: FreeUnitConverterProps) {
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [rawValue, setRawValue] = useState(String(defaultValue));

  useEffect(() => {
    setFromUnit(defaultFrom);
    setToUnit(defaultTo);
    setRawValue(String(defaultValue));
  }, [category, defaultFrom, defaultTo, defaultValue]);

  function resetConverter() {
    setFromUnit(defaultFrom);
    setToUnit(defaultTo);
    setRawValue(String(defaultValue));
  }

  return (
    <ConverterErrorBoundary onReset={resetConverter} resetKeys={[category, fromUnit, toUnit, rawValue]}>
      <FreeUnitConverterContent
        category={category}
        defaultValue={defaultValue}
        fromUnit={fromUnit}
        onChangeFromUnit={setFromUnit}
        onChangeRawValue={setRawValue}
        onChangeToUnit={setToUnit}
        rawValue={rawValue}
        toUnit={toUnit}
      />
    </ConverterErrorBoundary>
  );
}

function FreeUnitConverterContent({
  category,
  defaultValue,
  fromUnit,
  onChangeFromUnit,
  onChangeRawValue,
  onChangeToUnit,
  rawValue,
  toUnit,
}: Readonly<{
  category: NumericCategoryKey;
  defaultValue: number;
  fromUnit: UnitKey;
  onChangeFromUnit: (value: UnitKey) => void;
  onChangeRawValue: (value: string) => void;
  onChangeToUnit: (value: UnitKey) => void;
  rawValue: string;
  toUnit: UnitKey;
}>) {
  const fromUnitControlId = `free-converter-from-unit-${category}`;
  const fromValueControlId = `free-converter-from-value-${category}`;
  const toUnitControlId = `free-converter-to-unit-${category}`;
  const toValueControlId = `free-converter-to-value-${category}`;
  const trimmedValue = rawValue.trim();
  const numericValue = Number(trimmedValue);

  if (!trimmedValue || !Number.isFinite(numericValue)) {
    throw new Error("Enter a valid number.");
  }

  const result = convertValue(fromUnit, toUnit, numericValue);
  const formattedResult = formatConverterOutput(category, result);
  const formulaLine = getUnitReferenceLine(fromUnit, toUnit, "auto");

  function handleSwap() {
    onChangeFromUnit(toUnit);
    onChangeToUnit(fromUnit);
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-3 min-[520px]:grid-cols-[1fr_auto_1fr] min-[520px]:items-end">
        <FreeFromField
          category={category}
          fromUnit={fromUnit}
          fromUnitControlId={fromUnitControlId}
          fromValueControlId={fromValueControlId}
          onChangeFromUnit={onChangeFromUnit}
          onChangeRawValue={onChangeRawValue}
          rawValue={rawValue}
        />
        <SwapButton onClick={handleSwap} />
        <FreeToField
          category={category}
          onChangeToUnit={onChangeToUnit}
          readoutValue={formattedResult}
          toUnit={toUnit}
          toUnitControlId={toUnitControlId}
          toValueControlId={toValueControlId}
        />
      </div>
      <ConverterActions
        copyText={formattedResult}
        defaultValue={String(defaultValue)}
        formulaLine={formulaLine}
        onClear={() => onChangeRawValue(String(defaultValue))}
      />
    </section>
  );
}
