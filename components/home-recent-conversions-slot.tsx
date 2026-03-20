"use client";

import dynamic from "next/dynamic";

const RecentConversionsSection = dynamic(
  () =>
    import("@/components/recent-conversions-section").then(
      (module) => module.RecentConversionsSection,
    ),
  { ssr: false },
);

export function HomeRecentConversionsSlot() {
  return <RecentConversionsSection />;
}
