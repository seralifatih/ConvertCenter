"use client";

import { useId, useMemo, useState } from "react";
import {
  ConverterActions,
  SwapButton,
} from "@/components/unit-converter-shared";
import {
  ConverterField,
  ConverterNumberInput,
  ConverterReadout,
  ConverterSelect,
} from "@/components/converter-controls";
import {
  convertMeasurementValue,
  formatMeasurementValue,
  getMeasurementFamily,
  getMeasurementReferenceLine,
  type MeasurementFamilyKey,
  type MeasurementUnitKey,
} from "@/lib/conversion/measurement-families";
import {
  getConverterInputMessage,
  getConverterInputState,
} from "@/lib/conversion/converter-input";

type MeasurementFamilyConverterWidgetProps = {
  defaultFromUnitKey: MeasurementUnitKey;
  defaultToUnitKey: MeasurementUnitKey;
  defaultValue: number;
  familyKey: MeasurementFamilyKey;
};

export function MeasurementFamilyConverterWidget({
  defaultFromUnitKey,
  defaultToUnitKey,
  defaultValue,
  familyKey,
}: MeasurementFamilyConverterWidgetProps) {
  const fromUnitId = useId();
  const fromValueId = useId();
  const toUnitId = useId();
  const toValueId = useId();
  const family = getMeasurementFamily(familyKey);
  const [fromUnitKey, setFromUnitKey] = useState(defaultFromUnitKey);
  const [toUnitKey, setToUnitKey] = useState(defaultToUnitKey);
  const [rawValue, setRawValue] = useState(String(defaultValue));
  const inputState = getConverterInputState(rawValue);
  const options = useMemo(
    () =>
      family.units.map((unit) => ({
        label: `${unit.label} (${unit.symbol})`,
        value: unit.key,
      })),
    [family.units],
  );
  const result =
    inputState.kind === "valid"
      ? convertMeasurementValue(fromUnitKey, toUnitKey, inputState.numericValue)
      : null;
  const formattedResult = result === null ? "" : formatMeasurementValue(familyKey, result);
  const helperMessage =
    inputState.kind === "valid" ? undefined : getConverterInputMessage(inputState);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-3 min-[520px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[520px]:items-end">
        <ConverterField htmlFor={fromUnitId} label="from">
          <ConverterSelect
            ariaLabel="From unit"
            id={fromUnitId}
            onChange={setFromUnitKey}
            options={options}
            value={fromUnitKey}
          />
          <ConverterNumberInput
            ariaLabel="From value"
            id={fromValueId}
            onChange={setRawValue}
            value={rawValue}
          />
        </ConverterField>

        <SwapButton
          onClick={() => {
            setFromUnitKey(toUnitKey);
            setToUnitKey(fromUnitKey);
          }}
        />

        <ConverterField htmlFor={toUnitId} label="to">
          <ConverterSelect
            ariaLabel="To unit"
            id={toUnitId}
            onChange={setToUnitKey}
            options={options}
            value={toUnitKey}
          />
          <ConverterReadout
            ariaLabel="Converted value"
            className={!formattedResult ? "border-[color:var(--border)] bg-[color:var(--surface)]" : undefined}
            id={toValueId}
            unit={family.units.find((unit) => unit.key === toUnitKey)?.symbol ?? ""}
            value={formattedResult || "—"}
          />
        </ConverterField>
      </div>

      <ConverterActions
        copyText={formattedResult || undefined}
        defaultValue={String(defaultValue)}
        formulaLine={getMeasurementReferenceLine(fromUnitKey, toUnitKey)}
        helperMessage={helperMessage}
        onClear={() => setRawValue(String(defaultValue))}
      />
    </section>
  );
}
