import { Breadcrumbs } from "@/components/breadcrumbs";
import { DevToolPageWidget } from "@/components/dev-tool-page-widget";
import { MarkdownToolWidget } from "@/components/markdown-tool-widget";
import { PageContainer } from "@/components/page-container";
import { PillButton } from "@/components/pill";
import { RelatedLinks } from "@/components/related-links";
import { StructuredContentView } from "@/components/structured-content";
import { StructuredData } from "@/components/structured-data";
import { TextTransformWidget } from "@/components/text-transform-widget";
import { UtilityCard } from "@/components/utility-card";
import { getBrowseCategory } from "@/lib/content/categories";
import {
  getCrossLinkEntries,
  getPageHref,
  getRelatedTextPages,
  getTextPageFaqs,
  getTextPageKeywords,
  getTextPageOutput,
  type TextPageDefinition,
} from "@/lib/content/pages";
import { getTextModeOption, textSampleHelpers } from "@/lib/conversion/text";
import { makeBreadcrumbSchema, makeFaqSchemaIfPresent } from "@/lib/seo";

export function TextPageTemplate({ page }: { page: TextPageDefinition }) {
  const faqs = getTextPageFaqs(page);
  const faqSchema = makeFaqSchemaIfPresent(faqs);
  const relatedPages = getRelatedTextPages(page);
  const crossLinkEntries = getCrossLinkEntries(page);
  const modeOption = getTextModeOption(page.mode);
  const category = getBrowseCategory(page.category);
  const categoryTitle = category?.title ?? "Text converter";
  const categoryHref = category?.route ?? "/text-converter";

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: categoryTitle, path: categoryHref },
          { name: page.title, path: getPageHref(page) },
        ])}
      />
      {faqSchema ? <StructuredData data={faqSchema} /> : null}

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">seo page</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: categoryTitle, href: categoryHref },
              { label: page.slug },
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
          <div className="flex flex-wrap gap-2">
            {(modeOption
              ? [modeOption.helperLabel, ...getTextPageKeywords(page)]
              : getTextPageKeywords(page)
            )
              .slice(0, 4)
              .map((keyword) => (
              <PillButton active className="font-mono" key={keyword}>
                {keyword}
              </PillButton>
              ))}
          </div>
        </div>
      </section>

      {page.mode === "markdownToHtml" ? (
        <MarkdownToolWidget defaultValue={page.exampleInput} />
      ) : page.category === "encoding" || page.category === "dev-data" ? (
        <DevToolPageWidget
          actionLabel={page.actionLabel}
          defaultValue={page.exampleInput}
          mode={page.mode}
          outputStyle={page.outputStyle}
          secondaryActionLabel={page.secondaryActionLabel}
          showCharacterCount={page.showCharacterCount}
          title={page.title}
        />
      ) : (
        <TextTransformWidget
          actionLabel={page.actionLabel}
          allowedModes={[page.mode]}
          defaultMode={page.mode}
          defaultValue={page.exampleInput}
          showCharacterCount={page.showCharacterCount}
        />
      )}

      {page.longDescription ? (
        <UtilityCard>
          <StructuredContentView content={page.longDescription} />
        </UtilityCard>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Example transformation</h2>
            {modeOption ? <span className="section-badge">{modeOption.helperLabel}</span> : null}
          </div>
          <div className="mt-4 rounded-2xl border border-[color:var(--border)] bg-[color:var(--page)] p-4">
            <div className="mono-kicker mb-2">input</div>
            <p className="font-mono text-sm text-[color:var(--text)]">{page.exampleInput}</p>
          </div>
          <div className="mt-4 rounded-2xl border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
            <div className="mono-kicker mb-2 text-[color:var(--accent-text)]">output</div>
            <p className="font-mono text-sm text-[color:var(--accent)]">{getTextPageOutput(page)}</p>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {textSampleHelpers.map((item) => (
              <span className="utility-chip font-mono" key={item.label}>
                {item.label}
              </span>
            ))}
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Why use it</h2>
            <span className="section-badge">shared tool</span>
          </div>
          {modeOption ? (
            <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{modeOption.description}</p>
          ) : null}
          {faqs.length ? (
            <div className="mt-4 space-y-4">
              {faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-sm font-medium text-[color:var(--text)]">{item.question}</h3>
                  <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
                </div>
              ))}
            </div>
          ) : null}
        </UtilityCard>
      </section>

      <RelatedLinks
        links={[
          ...crossLinkEntries,
          ...relatedPages.map((related) => ({
            href: getPageHref(related),
            label: related.title,
          })),
          { href: "/", label: "all converters" },
        ]}
        title="Related tools"
      />
    </PageContainer>
  );
}
