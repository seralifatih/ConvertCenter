"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { formatMathValue, formatPercentValue, formatSignedMathValue } from "@/lib/math-format";
import {
  applyPercentageAdjustment,
  type PercentageAdjustmentMode,
  percentOf,
  whatPercentOf,
} from "@/lib/percentage";

type PercentageMode = "adjustBy" | "percentOf" | "whatPercent";

type PercentageCalculatorWidgetProps = {
  defaultPrimary: number;
  defaultSecondary: number;
};

export function PercentageCalculatorWidget({
  defaultPrimary,
  defaultSecondary,
}: PercentageCalculatorWidgetProps) {
  const primaryId = useId();
  const secondaryId = useId();
  const [mode, setMode] = useState<PercentageMode>("percentOf");
  const [adjustmentDirection, setAdjustmentDirection] =
    useState<PercentageAdjustmentMode>("increase");
  const [primaryValue, setPrimaryValue] = useState(String(defaultPrimary));
  const [secondaryValue, setSecondaryValue] = useState(String(defaultSecondary));

  const primary = Number(primaryValue);
  const secondary = Number(secondaryValue);

  const result = useMemo(() => {
    if (mode === "percentOf") {
      const value = percentOf(primary, secondary);
      return value === null ? null : { label: "result" as const, value };
    }

    if (mode === "whatPercent") {
      const value = whatPercentOf(primary, secondary);
      return value === null ? null : { label: "percent" as const, value };
    }

    const value = applyPercentageAdjustment(secondary, primary, adjustmentDirection);
    return value === null ? null : { label: "adjusted" as const, ...value };
  }, [adjustmentDirection, mode, primary, secondary]);
  const adjustmentResult = result?.label === "adjusted" ? result : null;
  const directValue = result && "value" in result ? result.value : null;

  const primaryLabel =
    mode === "percentOf"
      ? "percent value"
      : mode === "whatPercent"
        ? "part value"
        : "percentage";
  const secondaryLabel =
    mode === "percentOf"
      ? "base value"
      : mode === "whatPercent"
        ? "whole value"
        : "starting value";

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "what is x% of y", value: "percentOf" },
              { label: "x is what percent of y", value: "whatPercent" },
              { label: "increase/decrease by %", value: "adjustBy" },
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
                onClick={() => setMode(option.value as PercentageMode)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={primaryId}>
                {primaryLabel}
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={primaryId}
                onChange={(event) => setPrimaryValue(event.target.value)}
                step="any"
                type="number"
                value={primaryValue}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={secondaryId}>
                {secondaryLabel}
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={secondaryId}
                onChange={(event) => setSecondaryValue(event.target.value)}
                step="any"
                type="number"
                value={secondaryValue}
              />
            </div>
          </div>

          {mode === "adjustBy" ? (
            <div className="flex flex-wrap gap-2">
              {[
                { label: "increase", value: "increase" },
                { label: "decrease", value: "decrease" },
              ].map((option) => (
                <button
                  aria-pressed={adjustmentDirection === option.value}
                  className={clsx(
                    "rounded-full border px-3 py-2 text-sm transition",
                    adjustmentDirection === option.value
                      ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]"
                      : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]",
                  )}
                  key={option.value}
                  onClick={() => setAdjustmentDirection(option.value as PercentageAdjustmentMode)}
                  type="button"
                >
                  {option.label}
                </button>
              ))}
            </div>
          ) : null}

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "percentOf"
              ? "Use this mode to calculate a percentage of a number, such as 15% of 240."
              : mode === "whatPercent"
                ? "Use this mode to find what percentage one value is of another, such as 45 out of 60."
                : "Use this mode to increase or decrease a starting value by a chosen percentage."}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {result.label === "percent"
                    ? formatPercentValue(directValue ?? 0)
                    : formatMathValue(adjustmentResult ? adjustmentResult.result : (directValue ?? 0))}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {mode === "percentOf"
                    ? `${formatPercentValue(primary)} of ${formatMathValue(secondary)}`
                    : mode === "whatPercent"
                      ? `${formatMathValue(primary)} is what percent of ${formatMathValue(secondary)}`
                      : `${adjustmentDirection} ${formatMathValue(secondary)} by ${formatPercentValue(primary)}`}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                    {mode === "adjustBy" ? "delta" : "formula"}
                  </div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {mode === "percentOf"
                      ? "(x / 100) x y"
                      : mode === "whatPercent"
                        ? "(x / y) x 100"
                        : formatSignedMathValue(adjustmentResult?.delta ?? 0)}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                    {mode === "adjustBy" ? "formula" : "output"}
                  </div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {mode === "percentOf"
                      ? formatMathValue(directValue ?? 0)
                      : mode === "whatPercent"
                        ? formatPercentValue(directValue ?? 0)
                        : `y x (1 ${adjustmentDirection === "increase" ? "+" : "-"} x/100)`}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid numbers to calculate percentages. For &quot;what percent&quot; mode, the
              whole value cannot be zero.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
