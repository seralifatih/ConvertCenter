"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { dateToUnix, isoToDateTimeLocal, unixToDate, unixToUtcString } from "@/lib/timestamp";

type UnixTimestampConverterWidgetProps = {
  defaultTimestamp?: string;
  mode?: "both" | "dateToUnix" | "unixToDate";
};

export function UnixTimestampConverterWidget({
  defaultTimestamp = "1704067200",
  mode = "both",
}: UnixTimestampConverterWidgetProps) {
  const timestampId = useId();
  const dateId = useId();
  const [timestampValue, setTimestampValue] = useState(defaultTimestamp);
  const [dateValue, setDateValue] = useState(() => {
    const isoDate = unixToDate(Number(defaultTimestamp));
    return isoDate ? isoToDateTimeLocal(isoDate) : "";
  });

  const parsedTimestamp = Number(timestampValue);
  const isoOutput = timestampValue.trim() ? unixToDate(parsedTimestamp) : null;
  const utcOutput = timestampValue.trim() ? unixToUtcString(parsedTimestamp) : null;
  const unixOutput = dateValue ? dateToUnix(dateValue) : null;
  const showTimestampInput = mode === "both" || mode === "unixToDate";
  const showTimestampToDateOutput = mode === "both";
  const showDateInput = mode === "both" || mode === "dateToUnix";
  const showDateToTimestampOutput = mode === "both" || mode === "dateToUnix";
  const showSingleDateOutput = mode === "unixToDate";

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          {showTimestampInput ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={timestampId}>
                unix timestamp
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={timestampId}
                inputMode="numeric"
                onChange={(event) => setTimestampValue(event.target.value)}
                placeholder="1704067200"
                type="text"
                value={timestampValue}
              />
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                {mode === "unixToDate"
                  ? "Enter a Unix timestamp in seconds to convert it into a readable UTC date."
                  : "Enter a Unix timestamp in seconds to convert it into a readable UTC date."}
              </p>
            </div>
          ) : null}

          {showDateInput ? (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={dateId}>
                {mode === "dateToUnix" ? "date picker" : "date input"}
              </label>
              <input
                className="input-surface px-3 py-3 font-mono text-base"
                id={dateId}
                onChange={(event) => setDateValue(event.target.value)}
                type="datetime-local"
                value={dateValue}
              />
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                {mode === "dateToUnix"
                  ? "Pick a date and time to convert it into a Unix timestamp."
                  : "Pick a date and time to convert it back into a Unix timestamp."}
              </p>
            </div>
          ) : null}
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">
              {mode === "dateToUnix"
                ? "timestamp output"
                : mode === "unixToDate"
                  ? "date output"
                  : "converted values"}
            </span>
            <span className="section-badge">utc</span>
          </div>

          <div className="space-y-3">
            {showTimestampToDateOutput ? (
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="mono-kicker text-[color:var(--accent-text)]">
                    timestamp to date
                  </span>
                  {isoOutput ? <CopyButton text={isoOutput} /> : null}
                </div>
                <p className="font-mono text-sm text-[color:var(--accent)] break-all">
                  {isoOutput ?? "Enter a valid Unix timestamp in seconds."}
                </p>
              </div>
            ) : null}

            {showDateToTimestampOutput ? (
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="mono-kicker text-[color:var(--accent-text)]">
                    date to timestamp
                  </span>
                  {unixOutput !== null ? <CopyButton text={String(unixOutput)} /> : null}
                </div>
                <p className="font-mono text-sm text-[color:var(--accent)] break-all">
                  {unixOutput ?? "Pick a valid date and time to convert it into Unix seconds."}
                </p>
              </div>
            ) : null}

            {showSingleDateOutput ? (
              <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-3">
                <div className="mb-1 flex items-center justify-between gap-3">
                  <span className="mono-kicker text-[color:var(--accent-text)]">
                    unix timestamp to date
                  </span>
                  {utcOutput ? <CopyButton text={utcOutput} /> : null}
                </div>
                <p className="font-mono text-sm text-[color:var(--accent)] break-all">
                  {utcOutput ?? "Enter a valid Unix timestamp in seconds."}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
