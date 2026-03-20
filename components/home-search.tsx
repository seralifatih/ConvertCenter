"use client";

import { useRouter } from "next/navigation";
import { useDeferredValue, useEffect, useId, useRef, useState } from "react";
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
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl+K");
  const deferredQuery = useDeferredValue(query);
  const matches = rankSearchEntries(searchEntries, deferredQuery);
  const dropdownIsOpen = isFocused && matches.length > 0;
  const activeOptionId =
    dropdownIsOpen && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  useEffect(() => {
    const updateLabelTimer = window.setTimeout(() => {
      if (navigator.platform.includes("Mac")) {
        setShortcutLabel("⌘K");
      }
    }, 0);

    return () => {
      window.clearTimeout(updateLabelTimer);
    };
  }, []);

  useEffect(() => {
    function isEditableElement(element: Element | null) {
      return (
        element instanceof HTMLElement &&
        (element.isContentEditable ||
          element.tagName === "INPUT" ||
          element.tagName === "TEXTAREA" ||
          element.tagName === "SELECT")
      );
    }

    function handleShortcut(event: KeyboardEvent) {
      const input = inputRef.current;

      if (!input || input.getClientRects().length === 0) {
        return;
      }

      if (event.key === "Escape" && document.activeElement === input) {
        setIsFocused(false);
        setActiveIndex(-1);
        input.blur();
        return;
      }

      if (isEditableElement(document.activeElement)) {
        return;
      }

      const slashShortcut =
        event.key === "/" && !event.metaKey && !event.ctrlKey && !event.altKey;
      const commandPaletteShortcut =
        event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey);

      if (!slashShortcut && !commandPaletteShortcut) {
        return;
      }

      event.preventDefault();
      input.focus();
      setIsFocused(true);
      setActiveIndex(-1);
    }

    window.addEventListener("keydown", handleShortcut);

    return () => {
      window.removeEventListener("keydown", handleShortcut);
    };
  }, []);

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
    <div className="space-y-3">
      <div className="hero-search-card relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[color:var(--muted-strong)]"
        >
          {"\u2315"}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-[color:var(--border)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--muted-strong)] sm:inline-flex"
        >
          {shortcutLabel}
        </span>
        <input
          aria-activedescendant={activeOptionId}
          aria-label="Search converters"
          aria-autocomplete="list"
          aria-controls={dropdownIsOpen ? listboxId : undefined}
          aria-expanded={dropdownIsOpen}
          autoComplete="off"
          className="hero-search-input w-full px-11 py-4 pr-11 text-base placeholder:text-[color:var(--muted-strong)] sm:pr-24"
          ref={inputRef}
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
              event.currentTarget.blur();
            }
          }}
          placeholder="Search converters..."
          role="combobox"
          value={query}
        />
        {dropdownIsOpen ? (
          <div
            className="panel-card absolute inset-x-0 top-[calc(100%+0.5rem)] z-10 overflow-hidden"
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
      <div className="flex flex-wrap items-center gap-2 overflow-hidden pb-1 sm:flex-nowrap sm:overflow-x-auto home-chip-scroll">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted-strong)]">
          try:
        </span>
        {quickSearches.map((item) => (
          <PillButton
            aria-label={`Try search example ${item}`}
            className="shrink-0 whitespace-nowrap font-mono"
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
