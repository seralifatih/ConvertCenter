"use client";

import { useId, useState } from "react";
import { convertTimeBetweenZones, getTimeZoneOptions } from "@/lib/time-zone";

const TIME_ZONE_OPTIONS = getTimeZoneOptions();

type TimeZoneConverterWidgetProps = {
  defaultTime: string;
  defaultFromTimeZone: string;
  defaultToTimeZone: string;
};

export function TimeZoneConverterWidget({
  defaultTime,
  defaultFromTimeZone,
  defaultToTimeZone,
}: TimeZoneConverterWidgetProps) {
  const timeId = useId();
  const fromId = useId();
  const toId = useId();
  const [timeValue, setTimeValue] = useState(defaultTime);
  const [fromTimeZone, setFromTimeZone] = useState(defaultFromTimeZone);
  const [toTimeZone, setToTimeZone] = useState(defaultToTimeZone);

  const result = convertTimeBetweenZones(timeValue, fromTimeZone, toTimeZone);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={timeId}>
              time input
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={timeId}
              onChange={(event) => setTimeValue(event.target.value)}
              type="time"
              value={timeValue}
            />
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Enter a time and convert it between time zones using today&apos;s date for DST-aware
              offsets.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={fromId}>
                from timezone
              </label>
              <select
                className="input-surface px-3 py-3 text-sm"
                id={fromId}
                onChange={(event) => setFromTimeZone(event.target.value)}
                value={fromTimeZone}
              >
                {TIME_ZONE_OPTIONS.map((timeZone) => (
                  <option key={timeZone} value={timeZone}>
                    {timeZone}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={toId}>
                to timezone
              </label>
              <select
                className="input-surface px-3 py-3 text-sm"
                id={toId}
                onChange={(event) => setToTimeZone(event.target.value)}
                value={toTimeZone}
              >
                {TIME_ZONE_OPTIONS.map((timeZone) => (
                  <option key={timeZone} value={timeZone}>
                    {timeZone}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">converted time</span>
            <span className="section-badge">live</span>
          </div>

          {result ? (
            <div className="space-y-3">
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">result panel</div>
                <p className="font-mono text-base text-[color:var(--accent)] break-all">
                  {result.convertedDateTime}
                </p>
              </div>

              <p className="text-sm leading-7 text-[color:var(--accent-text)]">
                Calculated from the current date in <span className="font-mono">{fromTimeZone}</span>
                , which is <span className="font-mono">{result.sourceDateLabel}</span>.
              </p>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter a valid time and choose both time zones to calculate the converted time.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

