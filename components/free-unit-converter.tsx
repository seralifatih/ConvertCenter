"use client";

import { useState } from "react";
import clsx from "clsx";
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
import {
  getConverterInputMessage,
  getConverterInputState,
} from "@/lib/conversion/converter-input";

type FreeUnitConverterProps = {
  category: NumericCategoryKey;
  compact?: boolean;
  defaultFrom: UnitKey;
  defaultTo: UnitKey;
  defaultValue?: number;
};

export function FreeUnitConverter({
  category,
  compact = false,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
}: FreeUnitConverterProps) {
  const resetKey = `${category}:${defaultFrom}:${defaultTo}:${defaultValue}`;
  const [draftState, setDraftState] = useState({
    key: resetKey,
    fromUnit: defaultFrom,
    toUnit: defaultTo,
    rawValue: String(defaultValue),
  });

  const activeState =
    draftState.key === resetKey
      ? draftState
      : {
          key: resetKey,
          fromUnit: defaultFrom,
          toUnit: defaultTo,
          rawValue: String(defaultValue),
        };

  function resetConverter() {
    setDraftState({
      key: resetKey,
      fromUnit: defaultFrom,
      toUnit: defaultTo,
      rawValue: String(defaultValue),
    });
  }

  return (
    <ConverterErrorBoundary
      onReset={resetConverter}
      resetKeys={[category, activeState.fromUnit, activeState.toUnit, activeState.rawValue]}
    >
      <FreeUnitConverterContent
        category={category}
        compact={compact}
        defaultValue={defaultValue}
        fromUnit={activeState.fromUnit}
        onChangeFromUnit={(value) => setDraftState({ ...activeState, fromUnit: value })}
        onChangeRawValue={(value) => setDraftState({ ...activeState, rawValue: value })}
        onChangeToUnit={(value) => setDraftState({ ...activeState, toUnit: value })}
        rawValue={activeState.rawValue}
        toUnit={activeState.toUnit}
      />
    </ConverterErrorBoundary>
  );
}

function FreeUnitConverterContent({
  category,
  compact,
  defaultValue,
  fromUnit,
  onChangeFromUnit,
  onChangeRawValue,
  onChangeToUnit,
  rawValue,
  toUnit,
}: Readonly<{
  category: NumericCategoryKey;
  compact: boolean;
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
  const inputState = getConverterInputState(rawValue);
  const result =
    inputState.kind === "valid"
      ? convertValue(fromUnit, toUnit, inputState.numericValue)
      : null;
  const formattedResult = result === null ? "" : formatConverterOutput(category, result);
  const formulaLine = getUnitReferenceLine(fromUnit, toUnit, "auto");
  const helperMessage =
    inputState.kind === "valid" ? undefined : getConverterInputMessage(inputState);

  function handleSwap() {
    onChangeFromUnit(toUnit);
    onChangeToUnit(fromUnit);
  }

  return (
    <section className={clsx("shell-card", compact ? "p-3.5 sm:p-4" : "p-4 sm:p-5")}>
      <div
        className={clsx(
          "grid min-[520px]:grid-cols-[1fr_auto_1fr] min-[520px]:items-end",
          compact ? "gap-2.5" : "gap-3",
        )}
      >
        <FreeFromField
          category={category}
          compact={compact}
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
          compact={compact}
          onChangeToUnit={onChangeToUnit}
          readoutValue={formattedResult}
          toUnit={toUnit}
          toUnitControlId={toUnitControlId}
          toValueControlId={toValueControlId}
        />
      </div>
      <ConverterActions
        compact={compact}
        copyText={formattedResult || undefined}
        defaultValue={String(defaultValue)}
        formulaLine={formulaLine}
        helperMessage={helperMessage}
        onClear={() => onChangeRawValue(String(defaultValue))}
      />
    </section>
  );
}
