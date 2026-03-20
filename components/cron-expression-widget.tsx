"use client";

import { useId, useMemo, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  buildCronExpression,
  describeCronSchedule,
  normalizeCronSchedule,
  type CronPreset,
} from "@/lib/conversion/developer-helpers";

type CronExpressionWidgetProps = {
  defaultDayOfMonth: number;
  defaultDayOfWeek: number;
  defaultHour: number;
  defaultMinute: number;
  defaultPreset: CronPreset;
};

const weekdayOptions = [
  { label: "Sunday", value: "0" },
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
] as const;

export function CronExpressionWidget({
  defaultDayOfMonth,
  defaultDayOfWeek,
  defaultHour,
  defaultMinute,
  defaultPreset,
}: CronExpressionWidgetProps) {
  const presetId = useId();
  const minuteId = useId();
  const hourId = useId();
  const dayOfWeekId = useId();
  const dayOfMonthId = useId();
  const [preset, setPreset] = useState<CronPreset>(defaultPreset);
  const [minute, setMinute] = useState(String(defaultMinute));
  const [hour, setHour] = useState(String(defaultHour));
  const [dayOfWeek, setDayOfWeek] = useState(String(defaultDayOfWeek));
  const [dayOfMonth, setDayOfMonth] = useState(String(defaultDayOfMonth));

  const schedule = useMemo(
    () =>
      normalizeCronSchedule({
        dayOfMonth: Number(dayOfMonth),
        dayOfWeek: Number(dayOfWeek),
        hour: Number(hour),
        minute: Number(minute),
        preset,
      }),
    [dayOfMonth, dayOfWeek, hour, minute, preset],
  );
  const expression = buildCronExpression(schedule);
  const description = describeCronSchedule(schedule);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label className="mono-kicker" htmlFor={presetId}>
              schedule preset
            </label>
            <select
              className="input-surface px-3 py-3 text-sm"
              id={presetId}
              onChange={(event) => setPreset(event.target.value as CronPreset)}
              value={preset}
            >
              <option value="everyMinute">every minute</option>
              <option value="hourly">hourly</option>
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={minuteId}>
              minute
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={minuteId}
              max="59"
              min="0"
              onChange={(event) => setMinute(event.target.value)}
              step="1"
              type="number"
              value={minute}
            />
          </div>

          {preset !== "everyMinute" ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={hourId}>
                hour
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={hourId}
                max="23"
                min="0"
                onChange={(event) => setHour(event.target.value)}
                step="1"
                type="number"
                value={hour}
              />
            </div>
          ) : null}

          {preset === "weekly" ? (
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="mono-kicker" htmlFor={dayOfWeekId}>
                day of week
              </label>
              <select
                className="input-surface px-3 py-3 text-sm"
                id={dayOfWeekId}
                onChange={(event) => setDayOfWeek(event.target.value)}
                value={dayOfWeek}
              >
                {weekdayOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {preset === "monthly" ? (
            <div className="flex flex-col gap-2 sm:col-span-2">
              <label className="mono-kicker" htmlFor={dayOfMonthId}>
                day of month
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={dayOfMonthId}
                max="31"
                min="1"
                onChange={(event) => setDayOfMonth(event.target.value)}
                step="1"
                type="number"
                value={dayOfMonth}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <PillButton
              aria-label="Reset cron schedule fields"
              onClick={() => {
                setPreset(defaultPreset);
                setMinute(String(defaultMinute));
                setHour(String(defaultHour));
                setDayOfWeek(String(defaultDayOfWeek));
                setDayOfMonth(String(defaultDayOfMonth));
              }}
            >
              reset sample
            </PillButton>
          </div>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">generated cron</span>
            <span className="section-badge">5-field</span>
          </div>

          <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-4 py-4">
            <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
              {expression}
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--accent-text)]">{description}</p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
              <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">minute</div>
              <p className="font-mono text-sm text-[color:var(--accent)]">{schedule.minute}</p>
            </div>
            <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
              <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">hour</div>
              <p className="font-mono text-sm text-[color:var(--accent)]">
                {preset === "everyMinute" ? "*" : schedule.hour}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <CopyButton text={expression} />
          </div>
        </div>
      </div>
    </section>
  );
}
