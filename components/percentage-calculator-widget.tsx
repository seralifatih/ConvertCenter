"use client";

import { useId, useMemo, useState } from "react";
import clsx from "clsx";
import { calculatePercentageChange, percentOf, whatPercentOf } from "@/lib/percentage";

type PercentageMode = "change" | "percentOf" | "whatPercent";

function formatValue(value: number, maximumFractionDigits = 4) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

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
  const [primaryValue, setPrimaryValue] = useState(String(defaultPrimary));
  const [secondaryValue, setSecondaryValue] = useState(String(defaultSecondary));

  const primary = Number(primaryValue);
  const secondary = Number(secondaryValue);

  const result = useMemo(() => {
    if (mode === "percentOf") {
      const value = percentOf(primary, secondary);
      return value === null ? null : { label: "result", value };
    }

    if (mode === "whatPercent") {
      const value = whatPercentOf(primary, secondary);
      return value === null ? null : { label: "percent", value };
    }

    const value = calculatePercentageChange(primary, secondary);

    if (!value) {
      return null;
    }

    return {
      detail: value.direction,
      label: "change",
      value: value.percentage,
    };
  }, [mode, primary, secondary]);

  const primaryLabel =
    mode === "percentOf" ? "percent value" : mode === "whatPercent" ? "part value" : "old value";
  const secondaryLabel =
    mode === "percentOf" ? "base value" : mode === "whatPercent" ? "whole value" : "new value";

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "what is x% of y", value: "percentOf" },
              { label: "x is what percent of y", value: "whatPercent" },
              { label: "percentage change", value: "change" },
            ].map((option) => (
              <button
                key={option.value}
                aria-pressed={mode === option.value}
                className={clsx(
                  "rounded-full border px-3 py-2 text-sm transition",
                  mode === option.value
                    ? "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]"
                    : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted)] hover:border-[color:var(--border-strong)] hover:text-[color:var(--foreground)]",
                )}
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

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "percentOf"
              ? "Use this mode to calculate a percentage of a number, such as 15% of 240."
              : mode === "whatPercent"
                ? "Use this mode to find what percentage one value is of another, such as 45 out of 60."
                : "Use this mode to calculate percentage increase or decrease between an old value and a new value."}
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
                  {formatValue(result.value)}
                  {result.label === "percent" || result.label === "change" ? "%" : ""}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {mode === "percentOf"
                    ? `${formatValue(primary)}% of ${formatValue(secondary)}`
                    : mode === "whatPercent"
                      ? `${formatValue(primary)} is what percent of ${formatValue(secondary)}`
                      : `percentage ${result.detail}`}
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                <p className="font-mono text-sm text-[color:var(--accent)]">
                  {mode === "percentOf"
                    ? "(x / 100) × y"
                    : mode === "whatPercent"
                      ? "(x / y) × 100"
                      : "((new - old) / old) × 100"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid numbers to calculate percentages. For percentage change and “what percent”
              mode, the base value cannot be zero.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
