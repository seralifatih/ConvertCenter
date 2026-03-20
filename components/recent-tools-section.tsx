"use client";

import Link from "next/link";
import { useState } from "react";
import { readRecentTools, type RecentToolEntry } from "@/lib/recent-tools";

export function RecentToolsSection() {
  const [recentTools] = useState<RecentToolEntry[]>(() => readRecentTools());

  if (!recentTools.length) {
    return null;
  }

  return (
    <section className="space-y-3" id="recently-used">
      <div className="flex items-center gap-3">
        <h2 className="section-title">Recently used</h2>
        <span className="section-badge">{recentTools.length} recent tools</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {recentTools.map((tool) => (
          <Link className="link-tile-popular" href={tool.href} key={tool.href}>
            <span className="text-[13px] leading-5 text-[color:var(--text)] sm:text-sm">
              {tool.title}
            </span>
            <span className="text-xs text-[color:var(--muted)]">Open this recently viewed tool</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
