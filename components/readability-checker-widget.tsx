"use client";

import { useId, useState } from "react";
import { PillButton } from "@/components/pill";
import { analyzeReadability } from "@/lib/conversion/readability";

type ReadabilityCheckerWidgetProps = {
  defaultText: string;
};

export function ReadabilityCheckerWidget({
  defaultText,
}: ReadabilityCheckerWidgetProps) {
  const inputId = useId();
  const [input, setInput] = useState(defaultText);
  const analysis = analyzeReadability(input);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label className="mono-kicker" htmlFor={inputId}>
              text sample
            </label>
            <span className="section-badge">flesch reading ease</span>
          </div>
          <textarea
            className="input-surface min-h-56 w-full resize-y px-3 py-3 font-mono text-sm"
            id={inputId}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste a paragraph or article excerpt here..."
            value={input}
          />
          <div className="flex flex-wrap gap-2">
            <PillButton
              aria-label="Reset readability sample text"
              onClick={() => setInput(defaultText)}
            >
              reset sample
            </PillButton>
            <PillButton aria-label="Clear readability text" onClick={() => setInput("")}>
              clear
            </PillButton>
          </div>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            This score estimates how easy the passage is to read by looking at sentence length and
            syllable density. It is a quick editorial signal, not a full quality judgment.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {analysis ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {analysis.score}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">
                  {analysis.label}
                </div>
                <p className="mt-3 text-sm leading-7 text-[color:var(--accent-text)]">
                  {analysis.explanation}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">grade</div>
                  <p className="font-mono text-lg text-[color:var(--accent)]">
                    {analysis.gradeLevel}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">avg sentence</div>
                  <p className="font-mono text-lg text-[color:var(--accent)]">
                    {analysis.averageSentenceLength} words
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">words</div>
                  <p className="font-mono text-lg text-[color:var(--accent)]">
                    {analysis.wordCount}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">sentences</div>
                  <p className="font-mono text-lg text-[color:var(--accent)]">
                    {analysis.sentenceCount}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Paste a sentence or paragraph to calculate a readability score and quick explanation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
