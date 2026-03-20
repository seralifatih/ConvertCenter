"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { decimalToFraction, fractionToDecimal, simplifyFraction } from "@/lib/fraction";

type FractionMode = "decimalToFraction" | "fractionToDecimal" | "simplify";

function formatValue(value: number, maximumFractionDigits = 6) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

type FractionToolWidgetProps = {
  defaultDecimal?: string;
  defaultDenominator: number;
  defaultMode?: FractionMode;
  defaultNumerator: number;
};

export function FractionToolWidget({
  defaultDecimal = "0.75",
  defaultDenominator,
  defaultMode = "simplify",
  defaultNumerator,
}: FractionToolWidgetProps) {
  const numeratorId = useId();
  const denominatorId = useId();
  const decimalId = useId();
  const [mode, setMode] = useState<FractionMode>(defaultMode);
  const [numeratorValue, setNumeratorValue] = useState(String(defaultNumerator));
  const [denominatorValue, setDenominatorValue] = useState(String(defaultDenominator));
  const [decimalValue, setDecimalValue] = useState(defaultDecimal);

  const simplifyResult = useMemo(
    () => simplifyFraction(Number(numeratorValue), Number(denominatorValue)),
    [denominatorValue, numeratorValue],
  );

  const decimalResult = useMemo(
    () => fractionToDecimal(Number(numeratorValue), Number(denominatorValue)),
    [denominatorValue, numeratorValue],
  );

  const fractionFromDecimal = useMemo(
    () => decimalToFraction(decimalValue),
    [decimalValue],
  );

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "simplify fraction", value: "simplify" },
              { label: "fraction to decimal", value: "fractionToDecimal" },
              { label: "decimal to fraction", value: "decimalToFraction" },
            ].map((option) => (
              <button
                aria-pressed={mode === option.value}
                className={clsx(
                  "rounded-full border px-3 py-2 text-sm motion-safe:transition",
                  mode === option.value
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]"
                    : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]",
                )}
                key={option.value}
                onClick={() => setMode(option.value as FractionMode)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          {mode === "decimalToFraction" ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={decimalId}>
                decimal value
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={decimalId}
                onChange={(event) => setDecimalValue(event.target.value)}
                placeholder="0.75"
                type="text"
                value={decimalValue}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={numeratorId}>
                  numerator
                </label>
                <input
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={numeratorId}
                  onChange={(event) => setNumeratorValue(event.target.value)}
                  step="1"
                  type="number"
                  value={numeratorValue}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={denominatorId}>
                  denominator
                </label>
                <input
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={denominatorId}
                  onChange={(event) => setDenominatorValue(event.target.value)}
                  step="1"
                  type="number"
                  value={denominatorValue}
                />
              </div>
            </div>
          )}

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "simplify"
              ? "Reduce a fraction to lowest terms using the greatest common divisor."
              : mode === "fractionToDecimal"
                ? "Divide the numerator by the denominator to turn a fraction into decimal form."
                : "Convert a terminating decimal into a simplified fraction."}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {mode === "simplify" ? (
            simplifyResult ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {simplifyResult.numerator} / {simplifyResult.denominator}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                    simplified fraction
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Enter whole-number numerator and denominator values. The denominator cannot be
                zero.
              </p>
            )
          ) : mode === "fractionToDecimal" ? (
            decimalResult !== null ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {formatValue(decimalResult)}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--accent-text)]">decimal value</div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Enter a valid whole-number numerator and a non-zero whole-number denominator.
              </p>
            )
          ) : fractionFromDecimal ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {fractionFromDecimal.numerator} / {fractionFromDecimal.denominator}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  simplified fraction
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter a valid terminating decimal such as `0.75` or `2.5`.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
