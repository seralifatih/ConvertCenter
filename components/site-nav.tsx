"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  { href: "/", label: "home", match: (pathname: string) => pathname === "/" },
  {
    href: "/math-calculators",
    label: "math",
    match: (pathname: string) => pathname === "/math-calculators",
  },
  {
    href: "/weight-converter",
    label: "category hubs",
    match: (pathname: string) => categoryHubPaths.has(pathname),
  },
  {
    href: "/text-converter",
    label: "text tools",
    match: (pathname: string) => textToolPaths.has(pathname),
  },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  function toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", nextTheme);
    document.documentElement.style.colorScheme = nextTheme;
    window.localStorage.setItem("convertcenter-theme", nextTheme);
  }

  return (
    <header className="shell-card mb-3 min-h-20 px-4 py-3 sm:min-h-14 sm:px-5">
      <div className="grid gap-3 sm:flex sm:items-center sm:justify-between">
        <Link
          className="font-mono text-sm tracking-[-0.03em] text-[color:var(--text)]"
          href="/"
        >
          convert<span className="text-[color:var(--accent)]">center</span>
        </Link>
        <div className="-mx-1 flex min-w-0 items-center gap-1.5 overflow-x-auto px-1 pb-1 sm:mx-0 sm:justify-end sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0">
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
