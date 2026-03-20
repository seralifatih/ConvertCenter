"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import { generateUuidList } from "@/lib/conversion/developer-helpers";

type UuidGeneratorWidgetProps = {
  defaultCount: number;
};

export function UuidGeneratorWidget({ defaultCount }: UuidGeneratorWidgetProps) {
  const countId = useId();
  const [count, setCount] = useState(String(defaultCount));
  const [uuids, setUuids] = useState(() => generateUuidList(defaultCount));

  function regenerate(nextCount = Number(count)) {
    setUuids(generateUuidList(nextCount));
  }

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={countId}>
              how many UUIDs
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={countId}
              max="25"
              min="1"
              onChange={(event) => setCount(event.target.value)}
              step="1"
              type="number"
              value={count}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Generate RFC 4122 version 4 UUIDs locally in the browser. Use them for fixtures, mock
            records, IDs, and quick developer setup tasks.
          </p>

          <div className="flex flex-wrap gap-2">
            <PillButton aria-label="Generate new UUID values" onClick={() => regenerate()}>
              generate new set
            </PillButton>
            <PillButton
              aria-label="Reset UUID count"
              onClick={() => {
                setCount(String(defaultCount));
                regenerate(defaultCount);
              }}
            >
              reset
            </PillButton>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">generated UUIDs</span>
            <span className="section-badge">{uuids.length} values</span>
          </div>

          <div className="space-y-2">
            {uuids.map((uuid) => (
              <div
                className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-3"
                key={uuid}
              >
                <p className="break-all font-mono text-sm text-[color:var(--accent)]">{uuid}</p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <CopyButton text={uuids.join("\n")} idleLabel="copy all" />
          </div>
        </div>
      </div>
    </section>
  );
}
