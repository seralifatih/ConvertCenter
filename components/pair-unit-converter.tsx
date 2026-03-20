"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, startTransition, useEffect, useRef, useState } from "react";
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
  return (
    <Suspense
      fallback={
        <PairUnitConverterFallback
          category={category}
          defaultFrom={defaultFrom}
          defaultTo={defaultTo}
          defaultValue={defaultValue}
          swapHref={swapHref}
        />
      }
    >
      <PairUnitConverterClient
        category={category}
        defaultFrom={defaultFrom}
        defaultTo={defaultTo}
        defaultValue={defaultValue}
        swapHref={swapHref}
      />
    </Suspense>
  );
}

function PairUnitConverterFallback({
  category,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
  swapHref,
}: PairUnitConverterProps) {
  return (
    <PairUnitConverterContent
      category={category}
      defaultValue={defaultValue}
      fromUnit={defaultFrom}
      onChangeRawValue={() => {}}
      rawValue={String(defaultValue)}
      routerPush={() => {}}
      searchValue={String(defaultValue)}
      swapHref={swapHref}
      toUnit={defaultTo}
    />
  );
}

function PairUnitConverterClient({
  category,
  defaultFrom,
  defaultTo,
  defaultValue = 10,
  swapHref,
}: PairUnitConverterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryValue = searchParams.get("v");
  const [fromUnit, setFromUnit] = useState(defaultFrom);
  const [toUnit, setToUnit] = useState(defaultTo);
  const [rawValue, setRawValue] = useState(() => queryValue ?? String(defaultValue));
  const hasSyncedInitialUrlRef = useRef(false);

  useEffect(() => {
    if (!hasSyncedInitialUrlRef.current) {
      hasSyncedInitialUrlRef.current = true;
      return;
    }

    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (rawValue.trim()) {
      nextSearchParams.set("v", rawValue);
    } else {
      nextSearchParams.delete("v");
    }

    const nextQuery = nextSearchParams.toString();
    const nextHref = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    const currentHref = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    if (nextHref !== currentHref) {
      startTransition(() => {
        router.replace(nextHref, { scroll: false });
      });
    }
  }, [pathname, rawValue, router, searchParams]);

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
        searchValue={rawValue}
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
  searchValue,
  swapHref,
  toUnit,
}: Readonly<{
  category: NumericCategoryKey;
  defaultValue: number;
  fromUnit: UnitKey;
  onChangeRawValue: (value: string) => void;
  rawValue: string;
  routerPush: (href: string) => void;
  searchValue: string;
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
      const nextSearchParams = new URLSearchParams();

      if (searchValue.trim()) {
        nextSearchParams.set("v", searchValue);
      }

      const nextHref = nextSearchParams.toString()
        ? `${swapHref}?${nextSearchParams.toString()}`
        : swapHref;

      startTransition(() => {
        routerPush(nextHref);
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
