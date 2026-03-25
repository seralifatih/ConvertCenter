"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PillLink } from "@/components/pill";
import { browseCategories } from "@/lib/content/categories";
import { launchToolRegistry } from "@/lib/config/conversion-registry";

const categoryHubPaths = new Set<string>(browseCategories.map((category) => category.route));
const textCategoryRoute = browseCategories.find((category) => category.key === "text")?.route ?? "/text-converter";
const textToolPaths = new Set<string>([
  textCategoryRoute,
  ...launchToolRegistry
    .filter((tool) => tool.kind === "text-transform" && tool.categoryKey === "text")
    .map((tool) => `/${tool.slug}` as const),
]);

const navItems = [
  {
    href: "/math-calculators",
    label: "math",
    match: (pathname: string) => pathname === "/math-calculators",
  },
  {
    href: "/text-converter",
    label: "text",
    match: (pathname: string) => textToolPaths.has(pathname),
  },
  {
    href: "/developer-tools",
    label: "dev tools",
    match: (pathname: string) => pathname === "/developer-tools",
  },
] as const;

export function SiteNav() {
  const pathname = usePathname();
  const router = useRouter();

  function handleSearchClick() {
    // Focus or navigate to home search
    if (pathname !== "/") {
      router.push("/?search=1");
    } else {
      const input = document.querySelector<HTMLInputElement>(".hero-search-input");
      if (input) {
        input.focus();
        input.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("convertcenter-theme", nextTheme);
  }

  return (
    <header className="shell-card mb-3 min-h-14 px-4 py-3 sm:px-5">
      <div className="flex items-center justify-between gap-3">
        <Link
          className="font-mono text-sm tracking-[-0.03em] text-[color:var(--text)] shrink-0"
          href="/"
        >
          convert<span className="text-[color:var(--accent)]">center</span>
        </Link>
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          <button
            aria-label="Search converters"
            className="shrink-0 flex items-center justify-center rounded-[12px] border border-[color:var(--border)] bg-[color:var(--input)] p-2 text-[color:var(--muted-strong)] hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
            onClick={handleSearchClick}
            type="button"
          >
            <svg aria-hidden="true" fill="none" height="14" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="14">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
          <div className="-mx-1 flex min-w-0 items-center gap-1.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:overflow-visible sm:px-0 sm:pb-0">
            {navItems.map((item) => {
              const active = item.match(pathname);

              return (
                <PillLink
                  key={item.href}
                  active={active}
                  className="shrink-0 whitespace-nowrap rounded-[12px] px-2.5 py-1 text-[11px]"
                  href={item.href}
                  mono={false}
                >
                  {item.label}
                </PillLink>
              );
            })}
          </div>
          <button
            aria-label="Toggle color theme"
            className="theme-toggle ml-1 shrink-0 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--input)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]"
            onClick={toggleTheme}
            type="button"
          >
            <span aria-hidden="true">light</span>
            <span
              aria-hidden="true"
              className="theme-toggle-track relative inline-flex h-[18px] w-8 rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)]"
            >
              <span
                className="theme-toggle-thumb absolute top-[2px] h-[12px] w-[12px] rounded-full bg-[color:var(--accent)] motion-safe:transition-transform"
              />
            </span>
            <span aria-hidden="true">dark</span>
          </button>
        </div>
      </div>
    </header>
  );
}
