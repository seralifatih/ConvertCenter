"use client";

import { useId, useMemo, useState } from "react";
import {
  dbmToWatts,
  formatScienceNumber,
  wattsToDbm,
} from "@/lib/conversion/science";

type DbmToWattsWidgetProps = {
  defaultDbm: number;
};

export function DbmToWattsWidget({ defaultDbm }: DbmToWattsWidgetProps) {
  const inputId = useId();
  const [dbmValue, setDbmValue] = useState(String(defaultDbm));
  const watts = useMemo(() => dbmToWatts(Number(dbmValue)), [dbmValue]);
  const milliwatts = watts === null ? null : watts * 1000;
  const roundTripDbm = watts === null ? null : wattsToDbm(watts);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={inputId}>
              dBm value
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={inputId}
              onChange={(event) => setDbmValue(event.target.value)}
              step="any"
              type="number"
              value={dbmValue}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            dBm is a logarithmic power level referenced to 1 milliwatt. This page converts that
            reading into watts so RF, networking, and signal power values are easier to compare.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">log scale</span>
          </div>

          {watts !== null ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {formatScienceNumber(watts, 9)} W
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">power in watts</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">milliwatts</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {formatScienceNumber(milliwatts ?? 0, 6)} mW
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    watts = 10^((dBm - 30) / 10)
                  </p>
                </div>
              </div>

              {roundTripDbm !== null ? (
                <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                  Round-trip check: {formatScienceNumber(roundTripDbm, 4)} dBm
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter a valid dBm value to convert it into watts and milliwatts.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
