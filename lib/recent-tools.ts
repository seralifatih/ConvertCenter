export const RECENT_TOOLS_STORAGE_KEY = "cc_recent_tools";
const MAX_RECENT_TOOLS = 5;

export type RecentToolEntry = {
  href: `/${string}`;
  title: string;
};

function isRecentToolEntry(value: unknown): value is RecentToolEntry {
  return Boolean(
    value &&
      typeof value === "object" &&
      "href" in value &&
      "title" in value &&
      typeof value.href === "string" &&
      value.href.startsWith("/") &&
      typeof value.title === "string" &&
      value.title.trim(),
  );
}

export function readRecentTools() {
  try {
    const rawValue = window.localStorage.getItem(RECENT_TOOLS_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isRecentToolEntry).slice(0, MAX_RECENT_TOOLS);
  } catch {
    return [];
  }
}

export function saveRecentTool(entry: RecentToolEntry) {
  try {
    const recentTools = readRecentTools();
    const nextRecentTools = [entry, ...recentTools.filter((item) => item.href !== entry.href)].slice(
      0,
      MAX_RECENT_TOOLS,
    );

    window.localStorage.setItem(RECENT_TOOLS_STORAGE_KEY, JSON.stringify(nextRecentTools));
  } catch {
    // Ignore storage failures so browsing never breaks.
  }
}
