"use client";

import { PillButton } from "@/components/pill";
import { useConversionHistory } from "@/hooks/use-conversion-history";

export function RecentConversionsSection() {
  const { clearHistory, dismissEntry, history } = useConversionHistory();
  const recentEntries = history.slice(0, 5);

  if (!recentEntries.length) {
    return null;
  }

  return (
    <section className="space-y-3" id="recent-conversions">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Recent conversions</h2>
          <span className="section-badge">{recentEntries.length} this session</span>
        </div>
        <PillButton aria-label="Clear recent conversion history" onClick={clearHistory}>
          clear history
        </PillButton>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {recentEntries.map((entry) => (
          <div
            className="flex items-start justify-between gap-3 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3"
            key={`${entry.timestamp}-${entry.tool}-${entry.value}`}
          >
            <div className="min-w-0">
              <p className="truncate font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--muted-strong)]">
                {entry.tool}
              </p>
              <p className="mt-1 text-sm text-[color:var(--text)]">
                {entry.value} {entry.from} {"\u2192"} {entry.result} {entry.to}
              </p>
            </div>
            <button
              aria-label={`Dismiss ${entry.tool} history entry`}
              className="shrink-0 text-xs text-[color:var(--muted)] motion-safe:transition hover:text-[color:var(--text)]"
              onClick={() => dismissEntry(entry)}
              type="button"
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
