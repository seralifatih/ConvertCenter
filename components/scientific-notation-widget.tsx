"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { fromScientificNotation, toScientificNotation } from "@/lib/scientific-notation";

type ScientificNotationMode = "decimalToScientific" | "scientificToDecimal";

function formatValue(value: number, maximumFractionDigits = 10) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits,
    useGrouping: false,
  }).format(value);
}

type ScientificNotationWidgetProps = {
  defaultCoefficient: string;
  defaultDecimal: string;
  defaultExponent: string;
  defaultMode?: ScientificNotationMode;
};

export function ScientificNotationWidget({
  defaultCoefficient,
  defaultDecimal,
  defaultExponent,
  defaultMode = "decimalToScientific",
}: ScientificNotationWidgetProps) {
  const decimalId = useId();
  const coefficientId = useId();
  const exponentId = useId();
  const [mode, setMode] = useState<ScientificNotationMode>(defaultMode);
  const [decimalValue, setDecimalValue] = useState(defaultDecimal);
  const [coefficientValue, setCoefficientValue] = useState(defaultCoefficient);
  const [exponentValue, setExponentValue] = useState(defaultExponent);

  const scientificResult = useMemo(
    () => toScientificNotation(Number(decimalValue)),
    [decimalValue],
  );

  const decimalResult = useMemo(
    () => fromScientificNotation(Number(coefficientValue), Number(exponentValue)),
    [coefficientValue, exponentValue],
  );

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "decimal to scientific", value: "decimalToScientific" },
              { label: "scientific to decimal", value: "scientificToDecimal" },
            ].map((option) => (
              <button
                aria-pressed={mode === option.value}
                className={clsx(
                  "rounded-full border px-3 py-2 text-sm transition",
                  mode === option.value
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]"
                    : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]",
                )}
                key={option.value}
                onClick={() => setMode(option.value as ScientificNotationMode)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          {mode === "decimalToScientific" ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={decimalId}>
                decimal value
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={decimalId}
                onChange={(event) => setDecimalValue(event.target.value)}
                placeholder="0.00056"
                type="text"
                value={decimalValue}
              />
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={coefficientId}>
                  coefficient
                </label>
                <input
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={coefficientId}
                  onChange={(event) => setCoefficientValue(event.target.value)}
                  type="text"
                  value={coefficientValue}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="mono-kicker" htmlFor={exponentId}>
                  exponent
                </label>
                <input
                  className="input-surface px-3 py-3 font-mono text-base"
                  id={exponentId}
                  onChange={(event) => setExponentValue(event.target.value)}
                  step="1"
                  type="number"
                  value={exponentValue}
                />
              </div>
            </div>
          )}

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "decimalToScientific"
              ? "Rewrite a decimal value as a coefficient multiplied by a power of ten."
              : "Convert a coefficient and integer exponent back into regular decimal form."}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {mode === "decimalToScientific" ? (
            scientificResult ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {scientificResult.normalized}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                    normalized scientific notation
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Enter a valid decimal value to convert it into scientific notation.
              </p>
            )
          ) : decimalResult !== null ? (
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
              Enter a valid coefficient and a whole-number exponent.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
