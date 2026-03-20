"use client";

import { useId, useMemo, useState } from "react";
import { PillButton } from "@/components/pill";
import { testRegexPattern } from "@/lib/conversion/developer-helpers";

type RegexTesterWidgetProps = {
  defaultFlags: string;
  defaultPattern: string;
  defaultSampleText: string;
};

export function RegexTesterWidget({
  defaultFlags,
  defaultPattern,
  defaultSampleText,
}: RegexTesterWidgetProps) {
  const patternId = useId();
  const flagsId = useId();
  const sampleId = useId();
  const [pattern, setPattern] = useState(defaultPattern);
  const [flags, setFlags] = useState(defaultFlags);
  const [sampleText, setSampleText] = useState(defaultSampleText);
  const result = useMemo(() => testRegexPattern(pattern, flags, sampleText), [flags, pattern, sampleText]);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_110px]">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={patternId}>
                pattern
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-sm"
                id={patternId}
                onChange={(event) => setPattern(event.target.value)}
                placeholder="\\b(error|warning)\\b"
                value={pattern}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={flagsId}>
                flags
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-sm"
                id={flagsId}
                onChange={(event) => setFlags(event.target.value)}
                placeholder="gi"
                value={flags}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={sampleId}>
              test text
            </label>
            <textarea
              className="input-surface min-h-56 w-full resize-y px-3 py-3 font-mono text-sm"
              id={sampleId}
              onChange={(event) => setSampleText(event.target.value)}
              placeholder="Paste text to test against the pattern..."
              value={sampleText}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <PillButton
              aria-label="Reset regex tester sample"
              onClick={() => {
                setPattern(defaultPattern);
                setFlags(defaultFlags);
                setSampleText(defaultSampleText);
              }}
            >
              reset sample
            </PillButton>
            <PillButton
              aria-label="Clear regex tester fields"
              onClick={() => {
                setPattern("");
                setFlags("");
                setSampleText("");
              }}
            >
              clear
            </PillButton>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">results</span>
            <span className="section-badge">live</span>
          </div>

          {"error" in result ? (
            <p className="text-sm leading-7 text-[color:#f6b3a8]">{result.error}</p>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">matches</div>
                  <p className="font-mono text-2xl text-[color:var(--accent)]">{result.totalMatches}</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">mode</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {flags.includes("g") ? "global scan" : "first match only"}
                  </p>
                </div>
              </div>

              {result.matches.length ? (
                <div className="space-y-2">
                  {result.matches.map((match) => (
                    <div
                      className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-3"
                      key={`${match.index}-${match.fullMatch}`}
                    >
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <span className="utility-chip font-mono">index {match.index}</span>
                        <span className="utility-chip font-mono">len {match.fullMatch.length}</span>
                      </div>
                      <p className="font-mono text-sm text-[color:var(--accent)]">{match.fullMatch}</p>
                      {match.captures.length ? (
                        <p className="mt-2 font-mono text-xs text-[color:var(--accent-text)]">
                          captures: {match.captures.join(" | ")}
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                  No matches yet. Adjust the pattern, flags, or sample text to test again.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
