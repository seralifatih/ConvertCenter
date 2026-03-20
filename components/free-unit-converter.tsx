"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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
  units,
} from "@/lib/conversion/units";
import {
  getConverterInputMessage,
  getConverterInputState,
} from "@/lib/conversion/converter-input";
import { useConversionHistory } from "@/hooks/use-conversion-history";

type FreeUnitConverterProps = {
  category: NumericCategoryKey;
  compact?: boolean;
  defaultFrom: UnitKey;
  defaultTo: UnitKey;
  defaultValue?: number;
  historyTool?: string;
  hubHref?: `/${string}`;
  hubLabel?: string;
};

export function FreeUnitConverter({
  category,
  compact = false,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
  historyTool,
  hubHref,
  hubLabel,
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
        historyTool={historyTool}
        hubHref={hubHref}
        hubLabel={hubLabel}
        isDirty={
          activeState.rawValue.trim() !== String(defaultValue).trim() ||
          activeState.fromUnit !== defaultFrom ||
          activeState.toUnit !== defaultTo
        }
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
  historyTool,
  hubHref,
  hubLabel,
  isDirty,
}: Readonly<{
  category: NumericCategoryKey;
  compact: boolean;
  defaultValue: number;
  fromUnit: UnitKey;
  historyTool?: string;
  isDirty: boolean;
  onChangeFromUnit: (value: UnitKey) => void;
  onChangeRawValue: (value: string) => void;
  onChangeToUnit: (value: UnitKey) => void;
  rawValue: string;
  toUnit: UnitKey;
  hubHref?: `/${string}`;
  hubLabel?: string;
}>) {
  const { pushEntry } = useConversionHistory();
  const lastSavedEntryRef = useRef<string>("");
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

  useEffect(() => {
    if (!historyTool || !formattedResult || inputState.kind !== "valid" || !isDirty) {
      return;
    }

    const entry = {
      from: units[fromUnit].pluralLabel,
      result: formattedResult,
      to: units[toUnit].pluralLabel,
      tool: historyTool,
      value: rawValue.trim(),
    };
    const entryKey = JSON.stringify(entry);

    if (!entry.value || lastSavedEntryRef.current === entryKey) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      pushEntry(entry);
      lastSavedEntryRef.current = entryKey;
    }, 600);

    return () => window.clearTimeout(timeoutId);
  }, [formattedResult, fromUnit, historyTool, inputState.kind, isDirty, pushEntry, rawValue, toUnit]);

  function handleSwap() {
    onChangeFromUnit(toUnit);
    onChangeToUnit(fromUnit);
  }

  return (
    <section className={clsx("shell-card", compact ? "p-4 sm:p-5" : "p-4 sm:p-5")}>
      <div
        className={clsx(
          "grid min-w-0",
          compact
            ? "min-[680px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[680px]:items-end"
            : "min-[520px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[520px]:items-end",
          compact ? "gap-3" : "gap-3",
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
        <SwapButton compact={compact} onClick={handleSwap} />
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
      {formattedResult && hubHref && hubLabel ? (
        <div className="mt-2">
          <Link
            className="text-xs text-[color:var(--muted)] underline-offset-4 hover:text-[color:var(--text)] hover:underline"
            href={hubHref}
          >
            {hubLabel}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
