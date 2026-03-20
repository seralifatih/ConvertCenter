import Link from "next/link";
import { browseCategories } from "@/lib/content/categories";
import { getCategoryPages } from "@/lib/content/pages";

const prioritizedCategories = [...browseCategories]
  .map((category) => ({
    ...category,
    toolCount: getCategoryPages(category.key).length,
  }))
  .sort((left, right) => right.toolCount - left.toolCount || left.title.localeCompare(right.title))
  .slice(0, 8);

export default function NotFound() {
  return (
    <section className="shell-card px-5 py-12 text-center sm:px-8">
      <span className="mono-kicker">404</span>
      <h1 className="mt-4 text-3xl font-medium tracking-[-0.04em]">Page not found</h1>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)]">
        That conversion route is not in the launch set yet. Use the homepage search or jump
        back into one of the category hubs.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link className="utility-chip font-mono uppercase tracking-[0.12em]" href="/">
          home
        </Link>
      </div>
      <div className="mt-6 grid gap-3 text-left sm:grid-cols-2 xl:grid-cols-4">
        {prioritizedCategories.map((category) => (
          <Link
            className="utility-chip flex min-h-24 flex-col items-start justify-between rounded-[18px] px-4 py-4"
            href={category.route}
            key={category.route}
          >
            <span className="text-sm font-medium text-[color:var(--text)]">{category.title}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--muted)]">
              {category.slug}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6">
        <Link className="utility-chip font-mono uppercase tracking-[0.12em]" href="/">
          Browse all tools →
        </Link>
      </div>
    </section>
  );
}
