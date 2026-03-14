import Link from "next/link";
import { browseCategories } from "@/lib/content/categories";

export function AppFooter() {
  return (
    <footer className="mt-6 rounded-[24px] border border-[color:var(--border)] bg-[color:var(--card)] px-5 py-4 text-sm text-[color:var(--muted)] sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm leading-7">
            Static-first utility shell for fast conversions, clean SEO pages, and repeatable
            internal navigation.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-2">
          <Link className="utility-chip font-mono uppercase tracking-[0.14em]" href="/">
            home
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
    </footer>
  );
}
