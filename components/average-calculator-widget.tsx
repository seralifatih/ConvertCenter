"use client";

import { useId, useMemo, useState } from "react";
import { calculateAverage, parseNumberList } from "@/lib/average";

function formatValue(value: number, maximumFractionDigits = 4) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value);
}

type AverageCalculatorWidgetProps = {
  defaultValue: string;
};

export function AverageCalculatorWidget({ defaultValue }: AverageCalculatorWidgetProps) {
  const inputId = useId();
  const [input, setInput] = useState(defaultValue);
  const parsedValues = useMemo(() => parseNumberList(input), [input]);
  const result = calculateAverage(parsedValues);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={inputId}>
              numbers
            </label>
            <textarea
              id={inputId}
              className="input-surface min-h-40 w-full resize-y px-3 py-3 font-mono text-sm"
              onChange={(event) => setInput(event.target.value)}
              placeholder={"10, 20, 30\n40"}
              value={input}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Enter numbers separated by commas or line breaks to calculate the arithmetic mean.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">average</span>
            <span className="section-badge">live</span>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {formatValue(result.average)}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">mean value</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">count</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">{result.count}</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">sum</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">{formatValue(result.sum)}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter at least one valid number separated by commas or line breaks to calculate the
              average.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
