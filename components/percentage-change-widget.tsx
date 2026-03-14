"use client";

import { useId, useState } from "react";
import { calculatePercentageChange } from "@/lib/percentage";

function formatValue(value: number, maximumFractionDigits = 2) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

type PercentageChangeWidgetProps = {
  defaultNewValue: number;
  defaultOldValue: number;
};

export function PercentageChangeWidget({
  defaultNewValue,
  defaultOldValue,
}: PercentageChangeWidgetProps) {
  const oldValueId = useId();
  const newValueId = useId();
  const [oldValue, setOldValue] = useState(String(defaultOldValue));
  const [newValue, setNewValue] = useState(String(defaultNewValue));
  const result = calculatePercentageChange(Number(oldValue), Number(newValue));

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={oldValueId}>
              old value
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={oldValueId}
              onChange={(event) => setOldValue(event.target.value)}
              step="any"
              type="number"
              value={oldValue}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={newValueId}>
              new value
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={newValueId}
              onChange={(event) => setNewValue(event.target.value)}
              step="any"
              type="number"
              value={newValue}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Enter the original number and the updated number to see the percentage increase or
            decrease instantly.
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
                  {formatValue(result.percentage)}%
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {result.direction === "no-change"
                    ? "no percentage change"
                    : `percentage ${result.direction}`}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">difference</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {result.difference > 0 ? "+" : ""}
                    {formatValue(result.difference, 4)}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    ((new - old) / old) x 100
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid numbers, and make sure the old value is not zero before calculating the
              percentage change.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
