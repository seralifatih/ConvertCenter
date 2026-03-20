"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { leastCommonMultiple } from "@/lib/number-theory";
import { greatestCommonDivisor } from "@/lib/ratio";

type IntegerMathMode = "gcd" | "lcm";

type IntegerMathWidgetProps = {
  defaultLeft: number;
  defaultMode?: IntegerMathMode;
  defaultRight: number;
};

export function IntegerMathWidget({
  defaultLeft,
  defaultMode = "gcd",
  defaultRight,
}: IntegerMathWidgetProps) {
  const leftId = useId();
  const rightId = useId();
  const [mode, setMode] = useState<IntegerMathMode>(defaultMode);
  const [leftValue, setLeftValue] = useState(String(defaultLeft));
  const [rightValue, setRightValue] = useState(String(defaultRight));

  const gcdResult = useMemo(() => {
    const left = Number(leftValue);
    const right = Number(rightValue);

    if (
      !Number.isFinite(left) ||
      !Number.isFinite(right) ||
      !Number.isInteger(left) ||
      !Number.isInteger(right) ||
      left === 0 ||
      right === 0
    ) {
      return null;
    }

    return greatestCommonDivisor(left, right);
  }, [leftValue, rightValue]);

  const lcmResult = useMemo(
    () => leastCommonMultiple(Number(leftValue), Number(rightValue)),
    [leftValue, rightValue],
  );

  const result = mode === "gcd" ? gcdResult : lcmResult;

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "greatest common divisor", value: "gcd" },
              { label: "least common multiple", value: "lcm" },
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
                onClick={() => setMode(option.value as IntegerMathMode)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={leftId}>
                first integer
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={leftId}
                onChange={(event) => setLeftValue(event.target.value)}
                step="1"
                type="number"
                value={leftValue}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={rightId}>
                second integer
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={rightId}
                onChange={(event) => setRightValue(event.target.value)}
                step="1"
                type="number"
                value={rightValue}
              />
            </div>
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "gcd"
              ? "Find the largest integer that divides both numbers exactly."
              : "Find the smallest positive multiple shared by both integers."}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">
              {mode === "gcd" ? "gcd" : "lcm"}
            </span>
            <span className="section-badge">live</span>
          </div>

          {result !== null ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {result}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {mode === "gcd" ? "greatest common divisor" : "least common multiple"}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid non-zero integers to calculate the {mode === "gcd" ? "GCD" : "LCM"}.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
