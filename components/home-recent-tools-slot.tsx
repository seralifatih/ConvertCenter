"use client";

import dynamic from "next/dynamic";

const RecentToolsSection = dynamic(
  () => import("@/components/recent-tools-section").then((module) => module.RecentToolsSection),
  { ssr: false },
);

export function HomeRecentToolsSlot() {
  return <RecentToolsSection />;
}
