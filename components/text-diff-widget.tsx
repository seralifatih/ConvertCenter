"use client";

import { useId, useState } from "react";
import { PillButton } from "@/components/pill";
import { compareTextByLine } from "@/lib/conversion/text-diff";

type TextDiffWidgetProps = {
  defaultLeftText: string;
  defaultRightText: string;
};

export function TextDiffWidget({
  defaultLeftText,
  defaultRightText,
}: TextDiffWidgetProps) {
  const leftId = useId();
  const rightId = useId();
  const [leftText, setLeftText] = useState(defaultLeftText);
  const [rightText, setRightText] = useState(defaultRightText);
  const diff = compareTextByLine(leftText, rightText);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <label className="mono-kicker" htmlFor={leftId}>
            left text
          </label>
          <textarea
            className="input-surface min-h-48 w-full resize-y px-3 py-3 font-mono text-sm"
            id={leftId}
            onChange={(event) => setLeftText(event.target.value)}
            placeholder="Paste the original text here..."
            value={leftText}
          />
        </div>

        <div className="space-y-2">
          <label className="mono-kicker" htmlFor={rightId}>
            right text
          </label>
          <textarea
            className="input-surface min-h-48 w-full resize-y px-3 py-3 font-mono text-sm"
            id={rightId}
            onChange={(event) => setRightText(event.target.value)}
            placeholder="Paste the revised text here..."
            value={rightText}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <PillButton
          aria-label="Swap left and right text"
          onClick={() => {
            setLeftText(rightText);
            setRightText(leftText);
          }}
        >
          swap sides
        </PillButton>
        <PillButton
          aria-label="Reset compared text"
          onClick={() => {
            setLeftText(defaultLeftText);
            setRightText(defaultRightText);
          }}
        >
          reset sample
        </PillButton>
        <PillButton
          aria-label="Clear both compared text areas"
          onClick={() => {
            setLeftText("");
            setRightText("");
          }}
        >
          clear
        </PillButton>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
          <div className="mono-kicker mb-1">matching lines</div>
          <p className="font-mono text-2xl text-[color:var(--text)]">{diff.matchingLineCount}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
          <div className="mono-kicker mb-1">only on left</div>
          <p className="font-mono text-2xl text-[color:var(--text)]">{diff.removedLineCount}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
          <div className="mono-kicker mb-1">only on right</div>
          <p className="font-mono text-2xl text-[color:var(--text)]">{diff.addedLineCount}</p>
        </div>
        <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
          <div className="mono-kicker mb-1">similarity</div>
          <p className="font-mono text-2xl text-[color:var(--text)]">{diff.similarity}%</p>
        </div>
      </div>

      <div className="mt-4 rounded-[20px] border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="section-title">Line-by-line diff</h2>
          <span className="section-badge">
            {diff.leftLineCount} to {diff.rightLineCount} lines
          </span>
        </div>

        {diff.entries.length ? (
          <div className="space-y-2">
            {diff.entries.map((entry, index) => {
              const toneClass =
                entry.kind === "same"
                  ? "border-[color:var(--border)] bg-[color:var(--page)]"
                  : entry.kind === "removed"
                    ? "border-rose-400/30 bg-rose-500/10"
                    : "border-emerald-400/30 bg-emerald-500/10";
              const badgeLabel =
                entry.kind === "same" ? "match" : entry.kind === "removed" ? "left only" : "right only";

              return (
                <div className={`rounded-2xl border px-4 py-3 ${toneClass}`} key={`${index}-${entry.kind}`}>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="utility-chip font-mono">{badgeLabel}</span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[color:var(--muted-strong)]">
                      L{entry.leftLineNumber ?? "-"} / R{entry.rightLineNumber ?? "-"}
                    </span>
                  </div>
                  <p className="font-mono text-sm text-[color:var(--text)]">
                    {entry.value || "(blank line)"}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Add text on either side to compare the two versions line by line.
          </p>
        )}
      </div>
    </section>
  );
}
