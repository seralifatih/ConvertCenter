"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  getCalculatorDef,
  type MathCalculatorVariant,
  type MathFieldDef,
  type MathResultDef,
} from "@/lib/math/calculator-registry";

type GenericMathCalculatorProps = {
  calculatorId: string;
  defaultValues?: Record<string, string | number>;
  defaultVariant?: string;
};

function getInitialValues(
  variant: MathCalculatorVariant,
  initialValues?: Record<string, string | number>,
) {
  return variant.fields.reduce<Record<string, string | number>>((accumulator, field) => {
    accumulator[field.id] =
      initialValues?.[field.id] !== undefined
        ? initialValues[field.id]
        : field.defaultValue ?? "";
    return accumulator;
  }, {});
}

function getFieldError(field: MathFieldDef, value: string | number | undefined) {
  const rawValue = String(value ?? "").trim();

  if (!rawValue) {
    return "Enter a value.";
  }

  if (field.type === "text") {
    return null;
  }

  if (field.type === "number-list") {
    return rawValue
      .split(/[\n,]+/)
      .some((entry) => entry.trim() && Number.isFinite(Number(entry.trim())))
      ? null
      : "Enter one or more valid numbers.";
  }

  const numericValue = Number(rawValue);

  if (!Number.isFinite(numericValue)) {
    return "Enter a valid number.";
  }

  if (field.constraints?.allowNegative === false && numericValue < 0) {
    return "Use a non-negative value.";
  }

  if (field.constraints?.allowZero === false && numericValue === 0) {
    return "Value cannot be zero.";
  }

  if (field.constraints?.min !== undefined && numericValue < field.constraints.min) {
    return `Use ${field.constraints.min} or more.`;
  }

  if (field.constraints?.max !== undefined && numericValue > field.constraints.max) {
    return `Use ${field.constraints.max} or less.`;
  }

  return null;
}

function formatOutputValue(value: number | string | undefined, output: MathResultDef) {
  if (value === undefined) {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  const formatOptions = output.formatOptions;

  if (!formatOptions) {
    return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(value);
  }

  const maximumFractionDigits = formatOptions.maximumFractionDigits ?? 4;

  if (formatOptions.style === "currency") {
    return new Intl.NumberFormat("en-US", {
      currency: formatOptions.currency ?? "USD",
      maximumFractionDigits,
      style: "currency",
    }).format(value);
  }

  const baseValue = new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
  }).format(value);

  if (formatOptions.style === "percent") {
    return `${baseValue}%`;
  }

  return `${formatOptions.prefix ?? ""}${baseValue}${formatOptions.suffix ?? ""}`;
}

export function GenericMathCalculator({
  calculatorId,
  defaultValues,
  defaultVariant,
}: GenericMathCalculatorProps) {
  const controlId = useId();
  const definition = getCalculatorDef(calculatorId);
  const initialVariant =
    definition?.variants.find((entry) => entry.id === defaultVariant) ?? definition?.variants[0];
  const [activeVariantId, setActiveVariantId] = useState(initialVariant?.id ?? "");

  const variant = useMemo(
    () => definition?.variants.find((entry) => entry.id === activeVariantId) ?? definition?.variants[0],
    [activeVariantId, definition],
  );
  const [values, setValues] = useState<Record<string, string | number>>(() =>
    initialVariant ? getInitialValues(initialVariant, defaultValues) : {},
  );

  const fieldErrors = useMemo(() => {
    if (!variant) {
      return {} as Record<string, string | null>;
    }

    return variant.fields.reduce<Record<string, string | null>>((accumulator, field) => {
      accumulator[field.id] = getFieldError(field, values[field.id]);
      return accumulator;
    }, {});
  }, [values, variant]);
  const hasFieldErrors = Object.values(fieldErrors).some(Boolean);
  const variantError =
    variant && !hasFieldErrors ? variant.validate?.(values) ?? null : null;
  const results =
    variant && !hasFieldErrors && !variantError ? variant.calculate(values) : null;

  if (!definition || !variant) {
    return null;
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="space-y-4">
          {definition.variants.length > 1 ? (
            <div className="flex flex-wrap gap-2">
              {definition.variants.map((entry) => (
                <button
                  aria-pressed={entry.id === variant.id}
                  className={clsx(
                    "rounded-full border px-3 py-2 text-sm motion-safe:transition",
                    entry.id === variant.id
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]"
                      : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]",
                  )}
                  key={entry.id}
                  onClick={() => {
                    setActiveVariantId(entry.id);
                    setValues(getInitialValues(entry, defaultValues));
                  }}
                  type="button"
                >
                  {entry.label}
                </button>
              ))}
            </div>
          ) : null}

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {variant.description ?? definition.description}
          </p>

          <div className="grid gap-4 sm:grid-cols-12">
            {variant.fields.map((field) => {
              const fieldId = `${controlId}-${field.id}`;
              const fieldValue = values[field.id] ?? "";
              const inputPaddingClass = clsx(
                field.prefix ? "pl-8" : "pl-3",
                field.suffix ? "pr-12" : "pr-3",
              );
              const wrapperClass =
                field.width === "third"
                  ? "sm:col-span-4"
                  : field.width === "half"
                    ? "sm:col-span-6"
                    : "sm:col-span-12";

              return (
                <div className={wrapperClass} key={field.id}>
                  <label className="mono-kicker mb-2 block" htmlFor={fieldId}>
                    {field.label}
                  </label>
                  <div className="relative">
                    {field.type === "number-list" ? (
                      <textarea
                        className="input-surface min-h-32 w-full resize-y px-3 py-3 font-mono text-sm"
                        id={fieldId}
                        onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.target.value }))}
                        placeholder={field.placeholder}
                        value={fieldValue}
                      />
                    ) : (
                      <input
                        className={`input-surface w-full py-3 font-mono text-sm ${inputPaddingClass}`}
                        id={fieldId}
                        onChange={(event) => setValues((current) => ({ ...current, [field.id]: event.target.value }))}
                        placeholder={field.placeholder}
                        step={field.type === "number" ? "any" : undefined}
                        type={field.type === "number" ? "number" : "text"}
                        value={fieldValue}
                      />
                    )}
                    {field.prefix ? (
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center font-mono text-sm text-[color:var(--muted)]">
                        {field.prefix}
                      </span>
                    ) : null}
                    {field.suffix && field.type !== "number-list" ? (
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center font-mono text-xs text-[color:var(--muted)]">
                        {field.suffix}
                      </span>
                    ) : null}
                  </div>
                  {fieldErrors[field.id] ? (
                    <p className="mt-2 text-xs leading-6 text-rose-300">{fieldErrors[field.id]}</p>
                  ) : field.helpText ? (
                    <p className="mt-2 text-xs leading-6 text-[color:var(--muted)]">{field.helpText}</p>
                  ) : null}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-2">
            <PillButton
              aria-label={`Reset ${definition.title}`}
              onClick={() => setValues(getInitialValues(variant, defaultValues))}
            >
              reset sample
            </PillButton>
            <PillButton
              aria-label={`Clear ${definition.title}`}
              onClick={() =>
                setValues(
                  variant.fields.reduce<Record<string, string>>((accumulator, field) => {
                    accumulator[field.id] = "";
                    return accumulator;
                  }, {}),
                )
              }
            >
              clear
            </PillButton>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">results</span>
            <span className="section-badge">live</span>
          </div>

          {variantError ? (
            <p className="text-sm leading-7 text-[color:#f6b3a8]">{variantError}</p>
          ) : results ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {variant.outputs.map((output) => {
                const displayValue = formatOutputValue(results[output.id], output);

                return (
                  <div
                    className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4"
                    key={output.id}
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="mono-kicker text-[color:var(--accent-text)]">{output.label}</span>
                      {output.copyable === false ? null : (
                        <CopyButton idleLabel="copy" text={displayValue} />
                      )}
                    </div>
                    <p
                      className={clsx(
                        "break-words font-mono text-[color:var(--accent)]",
                        output.type === "text" ? "text-base" : "text-2xl",
                      )}
                    >
                      {displayValue}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid values for every field to calculate the result.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
