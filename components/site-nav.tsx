"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PillLink } from "@/components/pill";

const textToolPaths = new Set([
  "/text-converter",
  "/uppercase-converter",
  "/lowercase-converter",
  "/title-case-converter",
  "/sentence-case-converter",
  "/camelcase-converter",
  "/snake-case-converter",
  "/kebab-case-converter",
]);

const navItems = [
  { href: "/", label: "home", match: (pathname: string) => pathname === "/" },
  {
    href: "/weight-converter",
    label: "category hubs",
    match: (pathname: string) =>
      [
        "/weight-converter",
        "/length-converter",
        "/volume-converter",
        "/temperature-converter",
        "/data-converter",
      ].includes(pathname),
  },
  {
    href: "/text-converter",
    label: "text tools",
    match: (pathname: string) => textToolPaths.has(pathname),
  },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    }

    return "dark";
  });

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("convertcenter-theme", nextTheme);
    setTheme(nextTheme);
  }

  return (
    <header className="shell-card mb-3 px-4 py-3 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          className="font-mono text-sm tracking-[-0.03em] text-[color:var(--text)]"
          href="/"
        >
          convert<span className="text-[color:var(--accent)]">center</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const active = item.match(pathname);

            return (
              <PillLink
                key={item.href}
                active={active}
                className="rounded-[12px] px-2.5 py-1 text-[11px]"
                href={item.href}
                mono={false}
              >
                {item.label}
              </PillLink>
            );
          })}
          <button
            aria-label={`Activate ${theme === "dark" ? "light" : "dark"} theme`}
            aria-pressed={theme === "light"}
            className="ml-1 flex items-center gap-1.5 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--input)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]"
            onClick={toggleTheme}
            type="button"
          >
            <span aria-hidden="true">light</span>
            <span
              aria-hidden="true"
              className="relative inline-flex h-[18px] w-8 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]"
            >
              <span
                className={`absolute top-[2px] h-[12px] w-[12px] rounded-full bg-[color:var(--accent)] transition-transform ${
                  theme === "dark" ? "translate-x-[16px]" : "translate-x-[2px]"
                }`}
              />
            </span>
            <span aria-hidden="true">dark</span>
          </button>
        </div>
      </div>
    </header>
  );
}
