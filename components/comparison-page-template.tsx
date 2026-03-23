import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSchema } from "@/components/seo/faq-schema";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import type { ComparisonPage } from "@/lib/content/comparison-pages";
import { getSiteToolPage, getPageHref, getLaunchPageLabel } from "@/lib/content/pages";
import { makeBreadcrumbSchema } from "@/lib/seo";

export function ComparisonPageTemplate({ page }: { page: ComparisonPage }) {
  const relatedPages = page.relatedSlugs
    .map((slug) => getSiteToolPage(slug))
    .filter((p): p is NonNullable<ReturnType<typeof getSiteToolPage>> => Boolean(p));

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Compare", path: `/${page.slug}` },
          { name: page.title, path: page.route },
        ])}
      />
      <FaqSchema
        items={page.faq.map((entry) => ({
          q: entry.q ?? entry.question ?? "",
          a: entry.a ?? entry.answer ?? "",
        }))}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">comparison</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: page.title },
            ]}
          />
          <div className="max-w-3xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              {page.title}
            </h1>
            <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {page.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Why ConvertCenter</h2>
            <span className="section-badge">{page.advantages.length} advantages</span>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
            {page.advantages.map((advantage) => (
              <li key={advantage}>{advantage}</li>
            ))}
          </ul>
        </UtilityCard>

        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">What both offer</h2>
            <span className="section-badge">shared</span>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
            {page.sharedFeatures.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </UtilityCard>
      </section>

      {page.faq.length > 0 ? (
        <section>
          <UtilityCard>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="section-title">Frequently asked questions</h2>
              <span className="section-badge">{page.faq.length} questions</span>
            </div>
            <dl className="space-y-4">
              {page.faq.map((entry) => {
                const question = entry.q ?? entry.question ?? "";
                const answer = entry.a ?? entry.answer ?? "";
                return (
                  <div key={question}>
                    <dt className="text-sm font-medium text-[color:var(--text)]">{question}</dt>
                    <dd className="mt-1 text-sm leading-7 text-[color:var(--muted)]">{answer}</dd>
                  </div>
                );
              })}
            </dl>
          </UtilityCard>
        </section>
      ) : null}

      {relatedPages.length > 0 ? (
        <section>
          <UtilityCard>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="section-title">Related tools</h2>
              <span className="section-badge">{relatedPages.length} tools</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPages.map((relatedPage) => (
                <Link className="link-tile" href={getPageHref(relatedPage)} key={relatedPage.slug}>
                  <span className="font-mono text-sm text-[color:var(--text)]">
                    {getLaunchPageLabel(relatedPage)}
                  </span>
                </Link>
              ))}
            </div>
          </UtilityCard>
        </section>
      ) : null}
    </PageContainer>
  );
}
