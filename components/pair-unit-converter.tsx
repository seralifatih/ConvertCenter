"use client";

import { useRouter } from "next/navigation";
import { startTransition, useState } from "react";
import { ConverterErrorBoundary } from "@/components/converter-error-boundary";
import {
  ConverterActions,
  formatConverterOutput,
  PairFromField,
  PairToField,
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

type PairUnitConverterProps = {
  category: NumericCategoryKey;
  defaultFrom: UnitKey;
  defaultTo: UnitKey;
  defaultValue?: number;
  swapHref?: string;
};

export function PairUnitConverter({
  category,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
  swapHref,
}: PairUnitConverterProps) {
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
    <ConverterErrorBoundary onReset={resetConverter} resetKeys={[category, fromUnit, toUnit, rawValue]}>
      <PairUnitConverterContent
        category={category}
        defaultValue={defaultValue}
        fromUnit={fromUnit}
        onChangeRawValue={setRawValue}
        rawValue={rawValue}
        routerPush={router.push.bind(router)}
        swapHref={swapHref}
        toUnit={toUnit}
      />
    </ConverterErrorBoundary>
  );
}

function PairUnitConverterContent({
  category,
  defaultValue,
  fromUnit,
  onChangeRawValue,
  rawValue,
  routerPush,
  swapHref,
  toUnit,
}: Readonly<{
  category: NumericCategoryKey;
  defaultValue: number;
  fromUnit: UnitKey;
  onChangeRawValue: (value: string) => void;
  rawValue: string;
  routerPush: (href: string) => void;
  swapHref?: string;
  toUnit: UnitKey;
}>) {
  const fromUnitControlId = `pair-converter-from-unit-${category}`;
  const fromValueControlId = `pair-converter-from-value-${category}`;
  const toUnitControlId = `pair-converter-to-unit-${category}`;
  const toValueControlId = `pair-converter-to-value-${category}`;
  const inputState = getConverterInputState(rawValue);
  const result =
    inputState.kind === "valid"
      ? convertValue(fromUnit, toUnit, inputState.numericValue)
      : null;
  const formattedResult = result === null ? "" : formatConverterOutput(category, result);
  const formulaLine = getUnitReferenceLine(fromUnit, toUnit, "formula");
  const helperMessage =
    inputState.kind === "valid" ? undefined : getConverterInputMessage(inputState);

  function handleSwap() {
    if (swapHref) {
      startTransition(() => {
        routerPush(swapHref);
      });
    }
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-3 min-[520px]:grid-cols-[1fr_auto_1fr] min-[520px]:items-end">
        <PairFromField
          fromUnit={fromUnit}
          fromUnitControlId={fromUnitControlId}
          fromValueControlId={fromValueControlId}
          onChangeRawValue={onChangeRawValue}
          rawValue={rawValue}
        />
        <SwapButton onClick={handleSwap} />
        <PairToField
          readoutValue={formattedResult}
          toUnit={toUnit}
          toUnitControlId={toUnitControlId}
          toValueControlId={toValueControlId}
        />
      </div>
      <ConverterActions
        copyText={formattedResult || undefined}
        defaultValue={String(defaultValue)}
        formulaLine={formulaLine}
        helperMessage={helperMessage}
        onClear={() => onChangeRawValue("")}
      />
    </section>
  );
}
