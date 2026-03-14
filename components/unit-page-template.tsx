import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { RelatedLinks } from "@/components/related-links";
import { StructuredData } from "@/components/structured-data";
import { UnitConverter } from "@/components/unit-converter";
import { UtilityCard } from "@/components/utility-card";
import { getBrowseCategory } from "@/lib/content/categories";
import {
  getPageHref,
  getRelatedUnitPages,
  getReverseUnitPageSlug,
  getUnitPageDescription,
  getUnitPageExample,
  getUnitPageFaqs,
  getUnitPageIntro,
  getUnitPageTitle,
  getUnitTableRows,
  type UnitPageDefinition,
} from "@/lib/content/pages";
import { getUnitFormula, units } from "@/lib/conversion/units";
import { makeBreadcrumbSchema, makeFaqSchema } from "@/lib/seo";

export function UnitPageTemplate({ page }: { page: UnitPageDefinition }) {
  const category = getBrowseCategory(page.category);
  const faqs = getUnitPageFaqs(page);
  const reverseSlug = getReverseUnitPageSlug(page);
  const relatedPages = getRelatedUnitPages(page);
  const formulaLabel = page.formulaLabel ?? getUnitFormula(page.from, page.to);

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: category?.title ?? page.category, path: category?.route ?? "/" },
          { name: getUnitPageTitle(page), path: getPageHref(page) },
        ])}
      />
      <StructuredData data={makeFaqSchema(faqs)} />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">seo page</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              ...(category ? [{ label: category.title, href: category.route }] : []),
              { label: page.slug },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              {getUnitPageTitle(page)}
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {getUnitPageDescription(page)}
            </p>
          </div>
        </div>
      </section>

      <UnitConverter
        category={page.category}
        defaultFrom={page.from}
        defaultTo={page.to}
        defaultValue={page.exampleValue}
        swapHref={reverseSlug ? `/${reverseSlug}` : undefined}
        variant="pair"
      />

      <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <UtilityCard>
          <div className="mb-4 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="section-title">Formula</h2>
              <span className="section-badge">live reference</span>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Use the same conversion rule shown below in the widget, examples, and table on this
              page.
            </p>
          </div>
          <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
            <div className="mono-kicker mb-2">formula</div>
            <p className="font-mono text-sm text-[color:var(--text)]">{formulaLabel}</p>
          </div>
          <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] p-4">
            <div className="mono-kicker mb-2">example</div>
            <p className="font-mono text-sm text-[color:var(--text)]">{getUnitPageExample(page)}</p>
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="mb-4 space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="section-title">Example conversions</h2>
              <span className="section-badge">{page.sampleValues.length} presets</span>
            </div>
            <p className="text-sm leading-7 text-[color:var(--muted)]">
              Quick reference values for the most common {units[page.from].pluralLabel.toLowerCase()}{" "}
              to {units[page.to].pluralLabel.toLowerCase()} lookups.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {getUnitTableRows(page).map((row) => (
              <div
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-3"
                key={row.from}
              >
                <div className="mono-kicker mb-1">sample</div>
                <p className="font-mono text-sm text-[color:var(--text)]">{row.from}</p>
                <p className="mt-1 font-mono text-sm text-[color:var(--accent-text)]">{row.to}</p>
              </div>
            ))}
          </div>
        </UtilityCard>
      </section>

      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Conversion table</h2>
            <span className="section-badge">{page.sampleValues.length} rows</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-[color:var(--border)]">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-[color:var(--surface)] font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
                <tr>
                  <th className="px-4 py-3 text-left">{units[page.from].shortLabel}</th>
                  <th className="px-4 py-3 text-left">{units[page.to].shortLabel}</th>
                </tr>
              </thead>
              <tbody>
                {getUnitTableRows(page).map((row) => (
                  <tr className="border-t border-[color:var(--border)]" key={row.from}>
                    <td className="px-4 py-3 font-mono text-[color:var(--text)]">{row.from}</td>
                    <td className="px-4 py-3 font-mono text-[color:var(--muted)]">{row.to}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">About this converter</h2>
            <span className="section-badge">tool notes</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            {getUnitPageIntro(page)}
          </p>
          <div className="mt-5 space-y-4">
            {faqs.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-medium text-[color:var(--text)]">{item.question}</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </UtilityCard>
      </section>

      <RelatedLinks
        links={[
          ...relatedPages.map((related) => ({
            href: getPageHref(related),
            label: `${units[related.from].shortLabel.toLowerCase()} to ${units[
              related.to
            ].shortLabel.toLowerCase()}`,
          })),
          ...(category ? [{ href: category.route, label: `all ${category.label}` }] : []),
          { href: "/", label: "all converters" },
        ]}
        title="Related conversions"
      />

      <RelatedLinks
        links={[
          ...(category ? [{ href: category.route, label: category.title }] : []),
          ...relatedPages.slice(0, 3).map((related) => ({
            href: getPageHref(related),
            label: getUnitPageTitle(related),
          })),
          { href: "/", label: "Browse all converters" },
        ]}
        title="Keep exploring"
      />
    </PageContainer>
  );
}
