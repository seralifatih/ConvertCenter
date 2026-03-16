"use client";

import { useId, useMemo, useState } from "react";
import { formatPercentValue, formatSignedMathValue } from "@/lib/math-format";
import { getPercentageChangeState } from "@/lib/percentage";

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
  const [showAbsoluteDelta, setShowAbsoluteDelta] = useState(true);
  const [oldValue, setOldValue] = useState(String(defaultOldValue));
  const [newValue, setNewValue] = useState(String(defaultNewValue));
  const numericOldValue = Number(oldValue);
  const numericNewValue = Number(newValue);
  const result = getPercentageChangeState(numericOldValue, numericNewValue);
  const absoluteDelta = useMemo(() => {
    if (!Number.isFinite(numericOldValue) || !Number.isFinite(numericNewValue)) {
      return null;
    }

    return numericNewValue - numericOldValue;
  }, [numericNewValue, numericOldValue]);

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

          <label className="flex items-center gap-2 text-sm text-[color:var(--muted)]">
            <input
              checked={showAbsoluteDelta}
              className="h-4 w-4 accent-[color:var(--accent)]"
              onChange={(event) => setShowAbsoluteDelta(event.target.checked)}
              type="checkbox"
            />
            show absolute delta
          </label>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {result.kind === "result" ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {formatPercentValue(result.result.percentage, 2)}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {result.result.direction === "no-change"
                    ? "no percentage change"
                    : `percentage ${result.result.direction}`}
                </div>
              </div>

              <div className={`grid gap-3 ${showAbsoluteDelta ? "sm:grid-cols-2" : ""}`}>
                {showAbsoluteDelta ? (
                  <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                    <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">delta</div>
                    <p className="font-mono text-sm text-[color:var(--accent)]">
                      {formatSignedMathValue(result.result.difference, 4)}
                    </p>
                  </div>
                ) : null}
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    ((new - old) / |old|) x 100
                  </p>
                </div>
              </div>

              {result.result.baselineType === "negative" ? (
                <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                  Negative baselines use the absolute size of the old value so the percentage stays
                  readable while the delta keeps the signed change.
                </p>
              ) : null}
            </div>
          ) : result.kind === "zero-baseline" ? (
            <div className="space-y-4">
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Percentage change is undefined when the old value is 0. Enter a non-zero baseline
                to calculate a percentage.
              </p>
              {showAbsoluteDelta && absoluteDelta !== null ? (
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">delta</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {formatSignedMathValue(absoluteDelta, 4)}
                  </p>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid numbers to calculate the percentage change between two values.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
