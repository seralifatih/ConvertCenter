"use client";

import { useRouter } from "next/navigation";
import { useDeferredValue, useId, useState } from "react";
import { PillButton } from "@/components/pill";
import {
  findExactSearchMatch,
  rankSearchEntries,
  type SearchEntry,
} from "@/lib/search";

type HomeSearchProps = {
  quickSearches: readonly string[];
  searchEntries: SearchEntry[];
};

export function HomeSearch({ quickSearches, searchEntries }: HomeSearchProps) {
  const router = useRouter();
  const listboxId = useId();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const deferredQuery = useDeferredValue(query);
  const matches = rankSearchEntries(searchEntries, deferredQuery);
  const dropdownIsOpen = isFocused && matches.length > 0;
  const activeOptionId =
    dropdownIsOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  function handleExampleChip(value: string) {
    const directMatch = findExactSearchMatch(searchEntries, value);

    if (directMatch) {
      router.push(directMatch.href);
      return;
    }

    setQuery(value);
    setIsFocused(true);
    setActiveIndex(-1);
  }

  function handleSubmit(index = activeIndex) {
    const directMatch =
      (index >= 0 ? matches[index]?.entry : undefined) ??
      findExactSearchMatch(searchEntries, query) ??
      matches[0]?.entry;

    if (directMatch) {
      router.push(directMatch.href);
    }
  }

  return (
    <div className="mb-5">
      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[color:var(--muted-strong)]"
        >
          {"\u2315"}
        </span>
        <input
          aria-activedescendant={activeOptionId}
          aria-label="Search converters"
          aria-autocomplete="list"
          aria-controls={dropdownIsOpen ? listboxId : undefined}
          aria-expanded={dropdownIsOpen}
          autoComplete="off"
          className="input-surface w-full px-11 py-4 text-base placeholder:text-[color:var(--muted-strong)]"
          onBlur={() => {
            window.setTimeout(() => setIsFocused(false), 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(-1);
          }}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }

            if (event.key === "ArrowDown" && matches.length > 0) {
              event.preventDefault();
              setIsFocused(true);
              setActiveIndex((current) => (current + 1) % matches.length);
            }

            if (event.key === "ArrowUp" && matches.length > 0) {
              event.preventDefault();
              setIsFocused(true);
              setActiveIndex((current) => (current <= 0 ? matches.length - 1 : current - 1));
            }

            if (event.key === "Escape") {
              setIsFocused(false);
              setActiveIndex(-1);
            }
          }}
          placeholder="Search converters..."
          role="combobox"
          value={query}
        />
        {dropdownIsOpen ? (
          <div
            className="panel-card absolute inset-x-0 top-[calc(100%+0.35rem)] z-10 overflow-hidden"
            id={listboxId}
            role="listbox"
          >
            {matches.map(({ entry }, index) => (
              <button
                aria-selected={activeIndex === index}
                className="flex w-full items-center justify-between border-b border-[color:var(--border)] px-4 py-3 text-left text-xs last:border-b-0 hover:bg-[color:var(--input)]"
                id={`${listboxId}-option-${index}`}
                key={entry.href}
                onMouseDown={(event) => {
                  event.preventDefault();
                  router.push(entry.href);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                role="option"
                type="button"
              >
                <span className="font-mono text-[color:var(--text)]">{entry.title}</span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
                  {entry.category}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-strong)]">
          try:
        </span>
        {quickSearches.map((item) => (
          <PillButton
            aria-label={`Try search example ${item}`}
            className="font-mono"
            key={item}
            onClick={() => handleExampleChip(item)}
          >
            {item}
          </PillButton>
        ))}
      </div>
    </div>
  );
}
