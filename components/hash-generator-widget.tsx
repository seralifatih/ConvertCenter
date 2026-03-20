"use client";

import { useEffect, useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { generateHashes } from "@/lib/conversion/developer-helpers";

type HashGeneratorWidgetProps = {
  defaultText: string;
};

export function HashGeneratorWidget({ defaultText }: HashGeneratorWidgetProps) {
  const inputId = useId();
  const [input, setInput] = useState(defaultText);
  const [hashes, setHashes] = useState<{
    md5: string;
    sha256: string;
  }>({
    md5: "",
    sha256: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    generateHashes(input)
      .then((nextHashes) => {
        if (cancelled) {
          return;
        }

        setHashes(nextHashes);
        setError(null);
      })
      .catch((nextError) => {
        if (cancelled) {
          return;
        }

        setError(nextError instanceof Error ? nextError.message : "Unable to generate hashes.");
      });

    return () => {
      cancelled = true;
    };
  }, [input]);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <label className="mono-kicker" htmlFor={inputId}>
              source text
            </label>
            <span className="section-badge">{input.length} chars</span>
          </div>
          <textarea
            className="input-surface min-h-48 w-full resize-y px-3 py-3 font-mono text-sm"
            id={inputId}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Paste text to hash..."
            value={input}
          />
          <div className="flex flex-wrap gap-2">
            <PillButton aria-label="Reset hash generator sample text" onClick={() => setInput(defaultText)}>
              reset sample
            </PillButton>
            <PillButton aria-label="Clear hash generator text" onClick={() => setInput("")}>
              clear
            </PillButton>
          </div>
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Hashes update locally as you type. This tool is useful for fixtures, quick checks, and
            comparing whether two inputs produce the same digest.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">digest output</span>
            <span className="section-badge">md5 + sha-256</span>
          </div>

          {error ? (
            <p className="text-sm leading-7 text-[color:#f6b3a8]">{error}</p>
          ) : (
            <div className="space-y-4">
              {[
                { label: "md5", value: hashes.md5 },
                { label: "sha-256", value: hashes.sha256 },
              ].map((item) => (
                <div
                  className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4"
                  key={item.label}
                >
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <span className="mono-kicker text-[color:var(--accent-text)]">{item.label}</span>
                    <CopyButton text={item.value} />
                  </div>
                  <p className="break-all font-mono text-sm text-[color:var(--accent)]">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
