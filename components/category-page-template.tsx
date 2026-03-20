import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DevToolPageWidget } from "@/components/dev-tool-page-widget";
import { FreeUnitConverter } from "@/components/free-unit-converter";
import { InteractiveToolRenderer } from "@/components/interactive-tool-renderer";
import { MarkdownToolWidget } from "@/components/markdown-tool-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { TextTransformWidget } from "@/components/text-transform-widget";
import { UtilityCard } from "@/components/utility-card";
import { getCategoryConfig } from "@/lib/config/conversion-registry";
import { getBrowseCategory } from "@/lib/content/categories";
import {
  getCategoryHighlights,
  getCategoryPages,
  getCategoryStandalonePages,
  getLaunchPageLabel,
  getLaunchPageSummary,
  getSiteToolPage,
  getPageHref,
} from "@/lib/content/pages";
import { makeBreadcrumbSchema } from "@/lib/seo";

export function CategoryPageTemplate({ categoryKey }: { categoryKey: string }) {
  const category = getBrowseCategory(categoryKey);

  if (!category) {
    return null;
  }

  const categoryConfig = getCategoryConfig(category.key);
  const pages = getCategoryPages(category.key);
  const standalonePages = getCategoryStandalonePages(category.key);
  const featuredStandalonePages =
    category.featuredStandaloneSlugs?.length
      ? category.featuredStandaloneSlugs
          .map((slug) => standalonePages.find((page) => page.slug === slug))
          .filter((page): page is (typeof standalonePages)[number] => Boolean(page))
      : standalonePages.slice(0, 2);
  const featuredStandaloneSlugSet = new Set(featuredStandalonePages.map((page) => page.slug));
  const remainingStandalonePages = standalonePages.filter(
    (page) => !featuredStandaloneSlugSet.has(page.slug),
  );
  const highlights = getCategoryHighlights(category.key);
  const relevantHighlights = highlights.slice(0, 2);
  const featuredPage = getSiteToolPage(category.featuredSlug);
  const featuredUnitPage =
    categoryConfig.kind === "numeric" && featuredPage?.kind === "unit" ? featuredPage : undefined;
  const featuredTextPage =
    categoryConfig.kind === "text" && featuredPage?.kind === "text" ? featuredPage : undefined;
  const featuredInteractivePage = featuredPage?.kind === "interactive-tool" ? featuredPage : undefined;

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
            <p className="max-w-3xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {category.intro}
            </p>
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
            <FreeUnitConverter
              category={featuredUnitPage.category}
              defaultFrom={featuredUnitPage.from}
              defaultTo={featuredUnitPage.to}
              defaultValue={featuredUnitPage.exampleValue}
              historyTool={category.title}
            />
          ) : null}
          {featuredTextPage ? (
            featuredTextPage.mode === "markdownToHtml" ? (
              <MarkdownToolWidget defaultValue={featuredTextPage.exampleInput} />
            ) : featuredTextPage.category === "encoding" || featuredTextPage.category === "dev-data" ? (
              <DevToolPageWidget
                actionLabel={featuredTextPage.actionLabel}
                defaultValue={featuredTextPage.exampleInput}
                mode={featuredTextPage.mode}
                outputStyle={featuredTextPage.outputStyle}
                secondaryActionLabel={featuredTextPage.secondaryActionLabel}
                showCharacterCount={featuredTextPage.showCharacterCount}
                title={featuredTextPage.title}
              />
            ) : (
              <TextTransformWidget
                defaultMode={featuredTextPage.mode}
                defaultValue={featuredTextPage.exampleInput}
              />
            )
          ) : null}
          {featuredInteractivePage ? (
            <InteractiveToolRenderer widget={featuredInteractivePage.widget} />
          ) : null}
          {!featuredUnitPage && !featuredTextPage && !featuredInteractivePage ? (
            featuredStandalonePages.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {featuredStandalonePages.map((page) => (
                  <Link className="link-tile" href={page.route} key={page.route}>
                    <span className="font-mono text-sm text-[color:var(--text)]">{page.title}</span>
                    <span className="text-xs text-[color:var(--muted)]">{page.description}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-4">
                <div className="mono-kicker mb-2">coming soon</div>
                <p className="text-sm leading-7 text-[color:var(--muted)]">{category.intro}</p>
              </div>
            )
          ) : null}
        </UtilityCard>

        <div className="space-y-5">
          <UtilityCard>
            <div className="flex items-center gap-3">
              <h2 className="section-title">Common use cases</h2>
              <span className="section-badge">
                {category.useCases?.length ?? 0} examples
              </span>
            </div>
            {category.useCases?.length ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
                {category.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">{category.description}</p>
            )}
          </UtilityCard>

          {category.relatedTopics?.length ? (
            <UtilityCard>
              <div className="flex items-center gap-3">
                <h2 className="section-title">Related topics</h2>
                <span className="section-badge">{category.relatedTopics.length} angles</span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.relatedTopics.map((topic) => (
                  <span className="utility-chip font-mono" key={topic}>
                    {topic}
                  </span>
                ))}
              </div>
            </UtilityCard>
          ) : null}
        </div>
      </section>

      {pages.length > 0 || remainingStandalonePages.length > 0 || (categoryConfig.kind === "text" && categoryConfig.futureTools.length > 0) ? (
        <section>
          <UtilityCard>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="section-title">Common tools</h2>
              <span className="section-badge">{pages.length + remainingStandalonePages.length} routes</span>
            </div>
            {pages.length > 0 || remainingStandalonePages.length > 0 ? (
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
                {remainingStandalonePages.map((page) => (
                  <Link className="link-tile" href={page.route} key={page.route}>
                    <span className="font-mono text-sm text-[color:var(--text)]">{page.title}</span>
                    <span className="text-xs text-[color:var(--muted)]">{page.description}</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm leading-7 text-[color:var(--muted)]">
                  This hub is ready, but the first live tools have not launched yet.
                </p>
                {categoryConfig.kind === "text" && categoryConfig.futureTools.length > 0 ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    {categoryConfig.futureTools.map((tool) => (
                      <div className="link-tile" key={tool.slug}>
                        <span className="font-mono text-sm text-[color:var(--text)]">
                          {tool.title}
                        </span>
                        <span className="text-xs text-[color:var(--muted)]">
                          {tool.description}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            )}
          </UtilityCard>
        </section>
      ) : null}

      {relevantHighlights.length ? (
        <section>
          <UtilityCard>
            <div className="mb-4 flex items-center gap-3">
              <h2 className="section-title">Explore next</h2>
              <span className="section-badge">{relevantHighlights.length} hubs</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {relevantHighlights.map((item) => (
                <Link className="link-tile" href={item.route} key={item.route}>
                  <span className="font-mono text-sm text-[color:var(--text)]">{item.title}</span>
                  <span className="text-xs text-[color:var(--muted)]">{item.description}</span>
                </Link>
              ))}
            </div>
          </UtilityCard>
        </section>
      ) : null}
    </PageContainer>
  );
}
