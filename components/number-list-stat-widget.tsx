"use client";

import { useId, useMemo, useState } from "react";
import { calculateAverage, parseNumberList } from "@/lib/average";
import { formatMathValue } from "@/lib/math-format";
import {
  calculateMedian,
  calculateMode,
  calculatePopulationStandardDeviation,
  calculateRange,
  type NumberListMetric,
} from "@/lib/statistics";

const metricCopy: Record<
  NumberListMetric,
  {
    description: string;
    label: string;
  }
> = {
  average: {
    description:
      "Enter numbers separated by commas or line breaks to calculate the arithmetic mean.",
    label: "average",
  },
  median: {
    description:
      "Enter numbers separated by commas or line breaks to sort the list and find the middle value.",
    label: "median",
  },
  mode: {
    description:
      "Enter numbers separated by commas or line breaks to find the most frequent value in the list.",
    label: "mode",
  },
  range: {
    description:
      "Enter numbers separated by commas or line breaks to calculate the difference between the maximum and minimum values.",
    label: "range",
  },
  standardDeviation: {
    description:
      "Enter numbers separated by commas or line breaks to calculate the population standard deviation of the list.",
    label: "std. deviation",
  },
};

type NumberListStatWidgetProps = {
  defaultValue: string;
  metric: NumberListMetric;
};

export function NumberListStatWidget({
  defaultValue,
  metric,
}: NumberListStatWidgetProps) {
  const inputId = useId();
  const [input, setInput] = useState(defaultValue);
  const values = useMemo(() => parseNumberList(input), [input]);
  const average = calculateAverage(values);
  const median = calculateMedian(values);
  const mode = calculateMode(values);
  const range = calculateRange(values);
  const standardDeviation = calculatePopulationStandardDeviation(values);
  const hasValues = values.length > 0;

  const resultLabel =
    metric === "average"
      ? average
        ? formatMathValue(average.average)
        : null
      : metric === "median"
        ? median !== null
          ? formatMathValue(median)
          : null
        : metric === "mode"
          ? mode?.hasMode
            ? mode.values.map((value) => formatMathValue(value)).join(", ")
            : hasValues
              ? "No mode"
              : null
          : metric === "range"
            ? range !== null
              ? formatMathValue(range)
              : null
            : standardDeviation
              ? formatMathValue(standardDeviation.standardDeviation)
              : null;

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={inputId}>
              numbers
            </label>
            <textarea
              className="input-surface min-h-40 w-full resize-y px-3 py-3 font-mono text-sm"
              id={inputId}
              onChange={(event) => setInput(event.target.value)}
              placeholder={"10, 20, 30\n40"}
              value={input}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {metricCopy[metric].description}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">
              {metricCopy[metric].label}
            </span>
            <span className="section-badge">live</span>
          </div>

          {resultLabel ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {resultLabel}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {metric === "mode" && mode?.hasMode
                    ? `${mode.frequency} occurrences`
                    : metric === "standardDeviation"
                      ? "population standard deviation"
                      : metric === "average"
                        ? "mean value"
                        : `${values.length} value${values.length === 1 ? "" : "s"} entered`}
                </div>
              </div>

              <div className={`grid gap-3 ${metric === "average" ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">count</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">{values.length}</p>
                </div>
                {metric === "average" ? (
                  <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                    <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">sum</div>
                    <p className="font-mono text-sm text-[color:var(--accent)]">
                      {average ? formatMathValue(average.sum) : "-"}
                    </p>
                  </div>
                ) : null}
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                    {metric === "average" || metric === "standardDeviation" ? "mean" : "spread"}
                  </div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {metric === "average"
                      ? average
                        ? formatMathValue(average.average)
                        : "-"
                      : metric === "standardDeviation"
                        ? standardDeviation
                          ? formatMathValue(standardDeviation.mean)
                          : "-"
                        : values.length
                          ? `${formatMathValue(Math.min(...values))} to ${formatMathValue(Math.max(...values))}`
                          : "-"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter at least one valid number separated by commas or line breaks to calculate the
              {` ${metricCopy[metric].label}`}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
