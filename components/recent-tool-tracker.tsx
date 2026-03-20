"use client";

import { useEffect } from "react";
import { saveRecentTool, type RecentToolEntry } from "@/lib/recent-tools";

export function RecentToolTracker({ href, title }: RecentToolEntry) {
  useEffect(() => {
    saveRecentTool({ href, title });
  }, [href, title]);

  return null;
}
