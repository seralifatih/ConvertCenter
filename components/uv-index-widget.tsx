"use client";

import { useId, useMemo, useState } from "react";
import {
  getUvRiskLevel,
  getUvRiskLevels,
  isDangerousUvIndex,
} from "@/lib/conversion/uv";

type UvIndexWidgetProps = {
  defaultValue: number;
  mode?: "calculator" | "guide";
};

function getToneClasses(label: string) {
  if (label === "Low") {
    return "border-[color:var(--accent)] bg-[color:var(--accent-surface)] text-[color:var(--accent)]";
  }

  if (label === "Moderate") {
    return "border-amber-300 bg-amber-50 text-amber-800";
  }

  if (label === "High" || label === "Very High") {
    return "border-rose-300 bg-rose-50 text-rose-800";
  }

  return "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800";
}

export function UvIndexWidget({
  defaultValue,
  mode = "calculator",
}: UvIndexWidgetProps) {
  const inputId = useId();
  const [rawValue, setRawValue] = useState(String(defaultValue));
  const indexValue = Number(rawValue);
  const riskLevel = useMemo(() => getUvRiskLevel(indexValue), [indexValue]);
  const dangerous = isDangerousUvIndex(indexValue);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={inputId}>
              uv index
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={inputId}
              min="0"
              onChange={(event) => setRawValue(event.target.value)}
              step="0.1"
              type="number"
              value={rawValue}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "calculator"
              ? "Enter a UV index value to see its standard risk category and what level of sun protection usually makes sense."
              : "Use this scale to interpret UV index ranges quickly. In practical outdoor guidance, values from 6 and up are usually treated as dangerous enough to need deliberate protection."}
          </p>

          <div className="grid gap-2">
            {getUvRiskLevels().map((level) => (
              <div
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-3 py-3"
                key={level.label}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-sm text-[color:var(--text)]">{level.label}</span>
                  <span className="section-badge">{level.rangeLabel}</span>
                </div>
                <p className="mt-2 text-xs leading-6 text-[color:var(--muted)]">{level.advice}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">{dangerous ? "protect" : "lower risk"}</span>
          </div>

          {riskLevel ? (
            <div className="space-y-4">
              <div
                className={`rounded-2xl border px-4 py-4 ${getToneClasses(riskLevel.label)}`}
              >
                <div className="font-mono text-3xl font-medium">{riskLevel.label}</div>
                <div className="mt-1 text-sm">
                  UV {Number.isFinite(indexValue) ? indexValue.toFixed(1).replace(/\.0$/, "") : rawValue} falls in the {riskLevel.rangeLabel} range.
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="mono-kicker mb-2 text-[color:var(--accent-text)]">
                  guidance
                </div>
                <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                  {riskLevel.advice}
                </p>
              </div>

              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                {dangerous
                  ? "Dangerous UV conditions usually begin at index 6 and above, when unprotected skin can be damaged much faster."
                  : "Low and moderate UV values still deserve awareness, but the more dangerous range usually begins at 6 or higher."}
              </p>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter a valid UV index value greater than or equal to zero.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
