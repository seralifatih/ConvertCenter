"use client";

import { useId, useState } from "react";
import { calculateAge } from "@/lib/date";

function formatResultLabel(value: number, singular: string, plural: string) {
  return `${value} ${value === 1 ? singular : plural}`;
}

type AgeCalculatorWidgetProps = {
  defaultBirthDate: string;
};

export function AgeCalculatorWidget({ defaultBirthDate }: AgeCalculatorWidgetProps) {
  const birthDateId = useId();
  const [birthDate, setBirthDate] = useState(defaultBirthDate);
  const result = calculateAge(birthDate);

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="flex flex-col gap-2">
          <label className="mono-kicker" htmlFor={birthDateId}>
            birth date
          </label>
          <input
            className="input-surface px-3 py-3 font-mono text-base"
            id={birthDateId}
            max={new Date().toISOString().slice(0, 10)}
            onChange={(event) => setBirthDate(event.target.value)}
            type="date"
            value={birthDate}
          />
          <p className="text-sm leading-7 text-[color:var(--muted)]">
            Pick a birthdate to calculate the age difference from today.
          </p>
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">result</span>
            <span className="section-badge">today</span>
          </div>

          {result ? (
            <div className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {result.years}
                  </div>
                  <div className="text-sm text-[color:var(--accent-text)]">years</div>
                </div>
                <div>
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {result.months}
                  </div>
                  <div className="text-sm text-[color:var(--accent-text)]">months</div>
                </div>
                <div>
                  <div className="font-mono text-3xl font-medium text-[color:var(--accent)]">
                    {result.days}
                  </div>
                  <div className="text-sm text-[color:var(--accent-text)]">days</div>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">total days</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {formatResultLabel(result.totalDays, "day", "days")}
                  </p>
                </div>
                <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                  <div className="mono-kicker mb-1 text-[color:var(--accent-text)]">approximate</div>
                  <p className="font-mono text-sm text-[color:var(--accent)]">
                    {formatResultLabel(result.totalWeeks, "week", "weeks")}
                  </p>
                  <p className="mt-1 font-mono text-sm text-[color:var(--accent)]">
                    {formatResultLabel(result.approxMonths, "month", "months")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-sm leading-7 text-[color:var(--accent-text)]">
              Enter a valid birthdate on or before today to calculate age in years, months, and
              days.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
