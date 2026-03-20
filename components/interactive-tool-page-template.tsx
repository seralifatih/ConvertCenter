import { Breadcrumbs } from "@/components/breadcrumbs";
import { InteractiveToolRenderer } from "@/components/interactive-tool-renderer";
import { PageContainer } from "@/components/page-container";
import { RelatedLinks } from "@/components/related-links";
import { StructuredContentView } from "@/components/structured-content";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import type { InteractiveToolPageDefinition } from "@/lib/content/interactive-tools";
import { getBrowseCategory } from "@/lib/content/categories";
import { getRelatedPageLinks } from "@/lib/content/pages";
import {
  makeBreadcrumbSchema,
  makeFaqSchemaIfPresent,
  makeSoftwareApplicationSchema,
} from "@/lib/seo";

export function InteractiveToolPageTemplate({
  page,
}: {
  page: InteractiveToolPageDefinition;
}) {
  const category = getBrowseCategory(page.categoryKey);
  const faqSchema = makeFaqSchemaIfPresent([...page.faq]);
  const relatedLinks = getRelatedPageLinks(page.relatedSlugs);

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          ...(category ? [{ name: category.title, path: category.route }] : []),
          { name: page.title, path: page.route },
        ])}
      />
      <StructuredData
        data={makeSoftwareApplicationSchema({
          applicationCategory: "UtilitiesApplication",
          description: page.metaDescription ?? page.description,
          name: page.title,
          path: page.route,
        })}
      />
      {faqSchema ? <StructuredData data={faqSchema} /> : null}

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">
            {category ? `${category.label} tool` : "interactive tool"}
          </span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              ...(category ? [{ label: category.title, href: category.route }] : []),
              { label: page.title },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              {page.title}
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {page.description}
            </p>
          </div>
        </div>
      </section>

      <InteractiveToolRenderer widget={page.widget} />

      <UtilityCard>
        <StructuredContentView content={page.longDescription} />
      </UtilityCard>

      <section className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Example workflows</h2>
            <span className="section-badge">{page.examples.length} examples</span>
          </div>
          <div className="grid gap-3">
            {page.examples.map((example) => (
              <div
                className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4"
                key={`${example.expression}-${example.result}`}
              >
                <div className="mono-kicker mb-2">example</div>
                <p className="font-mono text-sm text-[color:var(--text)]">{example.expression}</p>
                <p className="mt-1 font-mono text-sm text-[color:var(--accent-text)]">
                  {example.result}
                </p>
                {example.note ? (
                  <p className="mt-2 text-xs leading-6 text-[color:var(--muted)]">
                    {example.note}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">{page.useCases.length} ideas</span>
          </div>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
            {page.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </UtilityCard>
      </section>

      {page.faq.length ? (
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">FAQ</h2>
            <span className="section-badge">{page.faq.length} answers</span>
          </div>
          <div className="space-y-4">
            {page.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-medium text-[color:var(--text)]">{item.question}</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </UtilityCard>
      ) : null}

      <RelatedLinks
        links={[
          ...relatedLinks,
          ...(category ? [{ href: category.route, label: category.title }] : []),
          { href: "/", label: "Browse all tools" },
        ]}
        title="Related tools"
      />
    </PageContainer>
  );
}
