"use client";

import clsx from "clsx";
import { useId, useMemo, useState } from "react";
import { formatMathValue } from "@/lib/math-format";
import { buildEquivalentRatios, solveProportion, simplifyRatio } from "@/lib/ratio";

type RatioMode = "proportion" | "simplify";

type RatioCalculatorWidgetProps = {
  defaultLeft: number;
  defaultMode?: RatioMode;
  defaultRight: number;
  defaultThird: number;
};

export function RatioCalculatorWidget({
  defaultLeft,
  defaultMode = "simplify",
  defaultRight,
  defaultThird,
}: RatioCalculatorWidgetProps) {
  const leftId = useId();
  const rightId = useId();
  const thirdId = useId();
  const [mode, setMode] = useState<RatioMode>(defaultMode);
  const [leftValue, setLeftValue] = useState(String(defaultLeft));
  const [rightValue, setRightValue] = useState(String(defaultRight));
  const [thirdValue, setThirdValue] = useState(String(defaultThird));

  const simplifyResult = useMemo(
    () => simplifyRatio(Number(leftValue), Number(rightValue)),
    [leftValue, rightValue],
  );
  const equivalentRatios = useMemo(
    () => buildEquivalentRatios(Number(leftValue), Number(rightValue)),
    [leftValue, rightValue],
  );
  const proportionResult = useMemo(
    () => solveProportion(Number(leftValue), Number(rightValue), Number(thirdValue)),
    [leftValue, rightValue, thirdValue],
  );

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "simplify ratio", value: "simplify" },
              { label: "solve proportion", value: "proportion" },
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
                onClick={() => setMode(option.value as RatioMode)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={leftId}>
                first value
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={leftId}
                onChange={(event) => setLeftValue(event.target.value)}
                step="any"
                type="number"
                value={leftValue}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={rightId}>
                second value
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={rightId}
                onChange={(event) => setRightValue(event.target.value)}
                step="any"
                type="number"
                value={rightValue}
              />
            </div>
          </div>

          {mode === "proportion" ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={thirdId}>
                third value
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={thirdId}
                onChange={(event) => setThirdValue(event.target.value)}
                step="any"
                type="number"
                value={thirdValue}
              />
            </div>
          ) : null}

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            {mode === "simplify"
              ? "Enter two whole numbers to reduce a ratio using the greatest common divisor."
              : "Enter values for a:b = c:x, and the calculator will solve the missing fourth value instantly."}
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">{mode === "simplify" ? "reduced" : "proportion"}</span>
          </div>

          {mode === "simplify" ? (
            simplifyResult ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {formatMathValue(simplifyResult.left)} : {formatMathValue(simplifyResult.right)}
                  </div>
                  <div className="mt-1 text-sm text-[color:var(--accent-text)]">simplified ratio</div>
                </div>

                {equivalentRatios.length ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    {equivalentRatios.map((ratio) => (
                      <div
                        className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3"
                        key={`${ratio.factor}-${ratio.left}-${ratio.right}`}
                      >
                        <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">
                          {ratio.factor}x scale
                        </div>
                        <p className="font-mono text-sm text-[color:var(--accent)]">
                          {formatMathValue(ratio.left)} : {formatMathValue(ratio.right)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Enter two valid whole numbers greater than zero to simplify the ratio.
              </p>
            )
          ) : proportionResult ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  x = {formatMathValue(proportionResult.missingValue)}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {formatMathValue(Number(leftValue))} : {formatMathValue(Number(rightValue))} ={" "}
                  {formatMathValue(Number(thirdValue))} : x
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">base ratio</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {formatMathValue(proportionResult.ratio.left)} : {formatMathValue(proportionResult.ratio.right)}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">x = (b x c) / a</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid values for a:b = c:x, and make sure the first value is not zero.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
