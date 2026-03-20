"use client";

import { useId, useMemo, useState } from "react";
import {
  formatScienceNumber,
  voltsToWatts,
  wattsToAmps,
} from "@/lib/conversion/science";

type ElectricalPowerWidgetProps = {
  defaultAmps?: number;
  defaultPowerFactor?: number;
  defaultVolts: number;
  defaultWatts?: number;
  mode: "voltsToWatts" | "wattsToAmps";
};

export function ElectricalPowerWidget({
  defaultAmps = 5,
  defaultPowerFactor = 1,
  defaultVolts,
  defaultWatts = 1200,
  mode,
}: ElectricalPowerWidgetProps) {
  const firstId = useId();
  const secondId = useId();
  const factorId = useId();
  const [primaryValue, setPrimaryValue] = useState(
    mode === "wattsToAmps" ? String(defaultWatts) : String(defaultVolts),
  );
  const [secondaryValue, setSecondaryValue] = useState(
    mode === "wattsToAmps" ? String(defaultVolts) : String(defaultAmps),
  );
  const [powerFactorValue, setPowerFactorValue] = useState(String(defaultPowerFactor));
  const result = useMemo(() => {
    const primary = Number(primaryValue);
    const secondary = Number(secondaryValue);
    const powerFactor = Number(powerFactorValue);

    return mode === "wattsToAmps"
      ? wattsToAmps(primary, secondary, powerFactor)
      : voltsToWatts(primary, secondary, powerFactor);
  }, [mode, powerFactorValue, primaryValue, secondaryValue]);

  const firstLabel = mode === "wattsToAmps" ? "power (watts)" : "voltage (volts)";
  const secondLabel = mode === "wattsToAmps" ? "voltage (volts)" : "current (amps)";
  const resultLabel = mode === "wattsToAmps" ? "current" : "power";
  const formula =
    mode === "wattsToAmps"
      ? "amps = watts / (volts × power factor)"
      : "watts = volts × amps × power factor";

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={firstId}>
                {firstLabel}
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={firstId}
                onChange={(event) => setPrimaryValue(event.target.value)}
                step="any"
                type="number"
                value={primaryValue}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={secondId}>
                {secondLabel}
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={secondId}
                onChange={(event) => setSecondaryValue(event.target.value)}
                step="any"
                type="number"
                value={secondaryValue}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={factorId}>
              power factor
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={factorId}
              max="1"
              min="0"
              onChange={(event) => setPowerFactorValue(event.target.value)}
              step="0.01"
              type="number"
              value={powerFactorValue}
            />
          </div>

          <p className="text-sm leading-7 text-[color:var(--muted)]">
            This calculator uses the single-phase relationship between power, voltage, and current.
            Leave power factor at 1 for simple DC or resistive-load estimates.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">live</span>
          </div>

          {result !== null ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
                <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                  {formatScienceNumber(result, 6)} {mode === "wattsToAmps" ? "A" : "W"}
                </div>
                <div className="mt-1 text-sm text-[color:var(--accent-text)]">{resultLabel}</div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">formula</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">{formula}</p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">input model</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    PF = {formatScienceNumber(Number(powerFactorValue), 2)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter valid values. Voltage and power factor must both be greater than zero for a
              watts-to-amps calculation.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
