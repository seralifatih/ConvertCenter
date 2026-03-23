import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqSchema } from "@/components/seo/faq-schema";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import type { BestOfPage } from "@/lib/content/best-of-pages";
import { makeBreadcrumbSchema } from "@/lib/seo";

export function BestOfPageTemplate({ page }: { page: BestOfPage }) {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
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
          <span className="mono-kicker">roundup</span>
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

      <section className="space-y-3">
        {page.tools.map((tool, index) => (
          <UtilityCard key={tool.name}>
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--surface-alt)] font-mono text-sm font-medium text-[color:var(--text)]">
                {index + 1}
              </span>
              <div className="min-w-0 flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base font-medium text-[color:var(--text)]">
                    {tool.href.startsWith("/") ? (
                      <Link className="hover:underline" href={tool.href}>
                        {tool.name}
                      </Link>
                    ) : (
                      tool.name
                    )}
                  </h2>
                  {tool.highlight ? (
                    <span className="section-badge">{tool.highlight}</span>
                  ) : null}
                </div>
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  {tool.description}
                </p>
              </div>
            </div>
          </UtilityCard>
        ))}
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
    </PageContainer>
  );
}
