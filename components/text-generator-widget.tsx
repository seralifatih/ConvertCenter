"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  generateText,
  normalizeGeneratorCount,
  type TextGeneratorMode,
  type TextGeneratorUnit,
} from "@/lib/conversion/text-generators";

type TextGeneratorWidgetProps = {
  defaultCount: number;
  defaultSeed: number;
  defaultUnit: TextGeneratorUnit;
  mode: TextGeneratorMode;
};

function getGeneratorModeCopy(mode: TextGeneratorMode) {
  if (mode === "lorem") {
    return {
      helper: "Generate classic filler copy for mockups, demos, and layout testing.",
      title: "lorem ipsum",
    };
  }

  return {
    helper: "Generate lightweight placeholder text with a less familiar, more varied word bank.",
    title: "random text",
  };
}

export function TextGeneratorWidget({
  defaultCount,
  defaultSeed,
  defaultUnit,
  mode,
}: TextGeneratorWidgetProps) {
  const countId = useId();
  const seedId = useId();
  const unitId = useId();
  const [count, setCount] = useState(String(defaultCount));
  const [seed, setSeed] = useState(String(defaultSeed));
  const [unit, setUnit] = useState<TextGeneratorUnit>(defaultUnit);
  const safeCount = normalizeGeneratorCount(unit, Number(count));
  const safeSeed = Number.isFinite(Number(seed)) ? Math.floor(Number(seed)) : defaultSeed;
  const output = generateText(mode, {
    count: safeCount,
    seed: safeSeed,
    unit,
  });
  const copy = getGeneratorModeCopy(mode);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-4">
          <div>
            <div className="mono-kicker mb-2">{copy.title}</div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">{copy.helper}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={countId}>
                count
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={countId}
                min="1"
                onChange={(event) => setCount(event.target.value)}
                step="1"
                type="number"
                value={count}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={unitId}>
                unit
              </label>
              <select
                className="input-surface px-3 py-3 text-sm"
                id={unitId}
                onChange={(event) => setUnit(event.target.value as TextGeneratorUnit)}
                value={unit}
              >
                <option value="words">words</option>
                <option value="sentences">sentences</option>
                <option value="paragraphs">paragraphs</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={seedId}>
              seed
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={seedId}
              onChange={(event) => setSeed(event.target.value)}
              step="1"
              type="number"
              value={seed}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            The current settings generate {safeCount} {unit}. Keeping the same seed preserves the
            same output, which is handy for repeatable demos and test content.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">generated output</span>
            <span className="section-badge">copy-ready</span>
          </div>
          <textarea
            className="min-h-64 w-full resize-y rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3 font-mono text-sm text-[color:var(--accent)] focus:outline-none"
            readOnly
            value={output}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={output} />
            <PillButton
              aria-label="Generate a new text sample"
              onClick={() => setSeed(String(safeSeed + 1))}
            >
              regenerate
            </PillButton>
            <PillButton
              aria-label="Reset generator settings"
              onClick={() => {
                setCount(String(defaultCount));
                setSeed(String(defaultSeed));
                setUnit(defaultUnit);
              }}
            >
              reset
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
