import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { PillLink } from "@/components/pill";
import { StructuredData } from "@/components/structured-data";
import { TextTransformWidget } from "@/components/text-transform-widget";
import { UnitConverter } from "@/components/unit-converter";
import { UtilityCard } from "@/components/utility-card";
import { getBrowseCategory } from "@/lib/content/categories";
import {
  getCategoryHighlights,
  getCategoryPages,
  getLaunchPageLabel,
  getLaunchPageSummary,
  getPageHref,
  getTextPage,
  getUnitPage,
} from "@/lib/content/pages";
import { makeBreadcrumbSchema } from "@/lib/seo";

export function CategoryPageTemplate({ categoryKey }: { categoryKey: string }) {
  const category = getBrowseCategory(categoryKey);

  if (!category) {
    return null;
  }

  const pages = getCategoryPages(category.key);
  const highlights = getCategoryHighlights(category.key);
  const featuredUnitPage = category.key === "text" ? undefined : getUnitPage(category.featuredSlug);
  const featuredTextPage = category.key === "text" ? getTextPage(category.featuredSlug) : undefined;
  const featuredPage = featuredUnitPage ?? featuredTextPage;

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: category.title, path: category.route },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">category hub</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: category.title },
            ]}
          />
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              {category.title}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {category.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {pages.slice(0, 6).map((page) => (
              <PillLink href={getPageHref(page)} key={page.slug} mono>
                {getLaunchPageLabel(page)}
              </PillLink>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Featured tool</h2>
            <span className="section-badge">start here</span>
          </div>
          {featuredUnitPage ? (
            <UnitConverter
              category={featuredUnitPage.category}
              defaultFrom={featuredUnitPage.from}
              defaultTo={featuredUnitPage.to}
              defaultValue={featuredUnitPage.exampleValue}
            />
          ) : null}
          {featuredTextPage ? (
            <TextTransformWidget
              defaultMode={featuredTextPage.mode}
              defaultValue={featuredTextPage.exampleInput}
            />
          ) : null}
        </UtilityCard>

        <div className="space-y-5">
          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Hub overview</h2>
              <span className="section-badge">{pages.length} tools</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{category.intro}</p>
            {featuredPage ? (
              <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <div className="mono-kicker mb-2">featured route</div>
                <Link
                  className="font-mono text-sm text-[color:var(--text)] hover:text-[color:var(--accent-text)]"
                  href={getPageHref(featuredPage)}
                >
                  {getLaunchPageLabel(featuredPage)}
                </Link>
                <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                  {getLaunchPageSummary(featuredPage)}
                </p>
              </div>
            ) : null}
          </UtilityCard>

          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Related categories</h2>
              <span className="section-badge">{highlights.length} hubs</span>
            </div>
            <div className="mt-4 grid gap-3">
              {highlights.map((item) => (
                <Link className="link-tile" href={item.route} key={item.route}>
                  <span className="font-mono text-sm text-[color:var(--text)]">{item.title}</span>
                  <span className="text-xs text-[color:var(--muted)]">{item.description}</span>
                </Link>
              ))}
            </div>
          </UtilityCard>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.35fr_0.95fr]">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Common tools</h2>
            <span className="section-badge">{pages.length} routes</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {pages.map((page) => (
              <Link className="link-tile" href={getPageHref(page)} key={page.slug}>
                <span className="font-mono text-sm text-[color:var(--text)]">
                  {getLaunchPageLabel(page)}
                </span>
                <span className="text-xs text-[color:var(--muted)]">
                  {getLaunchPageSummary(page)}
                </span>
              </Link>
            ))}
          </div>
        </UtilityCard>

        <div className="space-y-5">
          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Popular links</h2>
              <span className="section-badge">browse fast</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {pages.map((page) => (
                <PillLink href={getPageHref(page)} key={page.slug} mono>
                  {getLaunchPageLabel(page)}
                </PillLink>
              ))}
              <PillLink href="/" mono>
                all converters
              </PillLink>
            </div>
          </UtilityCard>

          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Why this hub exists</h2>
              <span className="section-badge">quick context</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-[color:var(--muted)]">{category.intro}</p>
            <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] p-4">
              <div className="mono-kicker mb-2">internal links</div>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Use this hub to jump between {category.label} converters, then branch into nearby
                categories for related lookups and utilities.
              </p>
            </div>
          </UtilityCard>

          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Browse all in {category.label}</h2>
              <span className="section-badge">full list</span>
            </div>
            <div className="mt-4 space-y-3">
              {pages.map((page) => (
                <Link
                  className="flex items-start justify-between gap-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3 hover:border-[color:var(--accent)] hover:bg-[color:var(--accent-surface)]"
                  href={getPageHref(page)}
                  key={`browse-${page.slug}`}
                >
                  <div>
                    <div className="font-mono text-sm text-[color:var(--text)]">
                      {getLaunchPageLabel(page)}
                    </div>
                    <div className="mt-1 text-xs leading-6 text-[color:var(--muted)]">
                      {getLaunchPageSummary(page)}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
                    open
                  </span>
                </Link>
              ))}
            </div>
          </UtilityCard>
        </div>
      </section>
    </PageContainer>
  );
}
