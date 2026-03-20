"use client";

import { useCallback, useEffect, useState } from "react";

export const CONVERSION_HISTORY_STORAGE_KEY = "cc_history";
const CONVERSION_HISTORY_EVENT = "cc-history-updated";
const MAX_CONVERSION_HISTORY_ENTRIES = 10;

export type ConversionHistoryEntry = {
  from: string;
  result: string;
  timestamp: number;
  to: string;
  tool: string;
  value: string;
};

function isConversionHistoryEntry(value: unknown): value is ConversionHistoryEntry {
  return Boolean(
    value &&
      typeof value === "object" &&
      "from" in value &&
      "result" in value &&
      "timestamp" in value &&
      "to" in value &&
      "tool" in value &&
      "value" in value &&
      typeof value.from === "string" &&
      typeof value.result === "string" &&
      typeof value.timestamp === "number" &&
      Number.isFinite(value.timestamp) &&
      typeof value.to === "string" &&
      typeof value.tool === "string" &&
      typeof value.value === "string",
  );
}

function readStoredHistory() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawValue = window.sessionStorage.getItem(CONVERSION_HISTORY_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsedValue = JSON.parse(rawValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(isConversionHistoryEntry).slice(0, MAX_CONVERSION_HISTORY_ENTRIES);
  } catch {
    return [];
  }
}

function broadcastHistoryChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(CONVERSION_HISTORY_EVENT));
}

function persistHistory(entries: ConversionHistoryEntry[]) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(
      CONVERSION_HISTORY_STORAGE_KEY,
      JSON.stringify(entries.slice(0, MAX_CONVERSION_HISTORY_ENTRIES)),
    );
    broadcastHistoryChange();
  } catch {
    // Ignore sessionStorage failures so conversion flows never break.
  }
}

export function useConversionHistory() {
  const [history, setHistory] = useState<ConversionHistoryEntry[]>(() => readStoredHistory());

  useEffect(() => {
    function syncHistory() {
      setHistory(readStoredHistory());
    }

    window.addEventListener(CONVERSION_HISTORY_EVENT, syncHistory);
    window.addEventListener("storage", syncHistory);

    return () => {
      window.removeEventListener(CONVERSION_HISTORY_EVENT, syncHistory);
      window.removeEventListener("storage", syncHistory);
    };
  }, []);

  const pushEntry = useCallback(
    (entry: Omit<ConversionHistoryEntry, "timestamp"> & { timestamp?: number }) => {
      const nextHistory = [
        {
          ...entry,
          timestamp: entry.timestamp ?? Date.now(),
        },
        ...readStoredHistory(),
      ].slice(0, MAX_CONVERSION_HISTORY_ENTRIES);

      setHistory(nextHistory);
      persistHistory(nextHistory);
    },
    [],
  );

  const dismissEntry = useCallback((entry: ConversionHistoryEntry) => {
    const nextHistory = readStoredHistory().filter(
      (item) =>
        !(
          item.timestamp === entry.timestamp &&
          item.tool === entry.tool &&
          item.from === entry.from &&
          item.to === entry.to &&
          item.value === entry.value &&
          item.result === entry.result
        ),
    );

    setHistory(nextHistory);
    persistHistory(nextHistory);
  }, []);

  const clearHistory = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(CONVERSION_HISTORY_STORAGE_KEY);
        broadcastHistoryChange();
      } catch {
        // Ignore sessionStorage failures so conversion flows never break.
      }
    }

    setHistory([]);
  }, []);

  return {
    clearHistory,
    dismissEntry,
    history,
    pushEntry,
  };
}
