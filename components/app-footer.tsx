import Link from "next/link";
import { bestOfPages } from "@/lib/content/best-of-pages";
import { browseCategories } from "@/lib/content/categories";
import { comparisonPages } from "@/lib/content/comparison-pages";

export function AppFooter() {
  return (
    <footer className="mt-6 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-4 text-sm text-[color:var(--muted)] sm:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <p className="text-sm leading-7">
              Free calculators, converters, and developer tools — no sign-up, no ads, instant
              results.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
            <Link className="utility-chip font-mono uppercase tracking-[0.14em]" href="/">
              home
            </Link>
            <Link className="utility-chip font-mono uppercase tracking-[0.14em]" href="/math-calculators">
              math
            </Link>
            {browseCategories.map((category) => (
              <Link
                className="utility-chip font-mono uppercase tracking-[0.14em]"
                href={category.route}
                key={category.route}
              >
                {category.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex flex-wrap gap-2 border-t border-[color:var(--border)] pt-4">
          {comparisonPages.map((page) => (
            <Link
              className="utility-chip font-mono text-[11px] uppercase tracking-[0.14em]"
              href={page.route}
              key={page.route}
            >
              {page.title}
            </Link>
          ))}
          {bestOfPages.map((page) => (
            <Link
              className="utility-chip font-mono text-[11px] uppercase tracking-[0.14em]"
              href={page.route}
              key={page.route}
            >
              {page.title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
