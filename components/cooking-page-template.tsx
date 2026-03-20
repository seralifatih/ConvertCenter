import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookingIngredientConverterWidget } from "@/components/cooking-ingredient-converter-widget";
import { PageContainer } from "@/components/page-container";
import { RecentToolTracker } from "@/components/recent-tool-tracker";
import { RelatedLinks } from "@/components/related-links";
import { FaqSchema } from "@/components/seo/faq-schema";
import { StructuredContentView } from "@/components/structured-content";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { cookingIngredients } from "@/lib/cooking";
import { ingredientCookingPages, type CookingPageDefinition } from "@/lib/cooking-pages";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export function getCookingPageMetadata(page: CookingPageDefinition) {
  return buildMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
  });
}

export function CookingPageTemplate({ page }: { page: CookingPageDefinition }) {
  const ingredient = cookingIngredients[page.ingredient];
  const relatedPages = ingredientCookingPages
    .filter((entry) => entry.slug !== page.slug && entry.ingredient === page.ingredient)
    .slice(0, 4);
  const faqItems = (page.faq ?? []).map((item) => ({ a: item.answer, q: item.question }));

  return (
    <PageContainer className="space-y-5 pb-4">
      <RecentToolTracker href={page.path} title={page.title} />
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: page.title, path: page.path },
        ])}
      />
      <FaqSchema items={faqItems} />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">ingredient-specific cooking tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: page.slug }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{page.title}</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">{page.description}</p>
          </div>
        </div>
      </section>

      <CookingIngredientConverterWidget
        defaultIngredient={page.ingredient}
        defaultValue={page.defaultValue}
        fixedIngredient={page.ingredient}
        mode={page.mode}
        toolLabel={page.title}
      />

      {page.longDescription ? (
        <UtilityCard>
          <StructuredContentView content={page.longDescription} />
        </UtilityCard>
      ) : null}

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Ingredient assumption</h2>
            <span className="section-badge">{ingredient.slug}</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>{page.intro}</p>
            <p>
              Density note: {ingredient.densityDescription}. This is an approximate kitchen
              reference, not a universal volume-to-weight rule for every ingredient.
            </p>
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">When to use it</h2>
            <span className="section-badge">kitchen context</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            {page.useCases.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </UtilityCard>
      </section>

      <UtilityCard>
        <div className="flex items-center gap-3">
          <h2 className="section-title">Important note</h2>
          <span className="section-badge">approximate</span>
        </div>
        <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
          Cooking conversions like cups to grams and grams to teaspoons depend on ingredient
          density, packing, humidity, and how the ingredient is measured. This page is locked to{" "}
          {ingredient.label.toLowerCase()} so the assumption stays clear and the result is less
          misleading than a universal converter.
        </p>
      </UtilityCard>

      {page.faq?.length ? (
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common questions</h2>
            <span className="section-badge">{page.faq.length} answers</span>
          </div>
          <div className="mt-4 space-y-4">
            {page.faq.map((item) => (
              <div key={item.question}>
                <h3 className="text-sm font-medium text-[color:var(--text)]">{item.question}</h3>
                <p className="mt-1 text-sm leading-7 text-[color:var(--muted)]">{item.answer}</p>
              </div>
            ))}
          </div>
        </UtilityCard>
      ) : null}

      <RelatedLinks
        links={[
          ...relatedPages.map((related) => ({
            href: related.path,
            label: related.title,
          })),
          { href: "/cooking-converter", label: "cooking conversion hub" },
          { href: "/cups-to-grams", label: "general cups to grams tool" },
          { href: "/grams-to-cups", label: "general grams to cups tool" },
          { href: "/", label: "all converters" },
        ]}
        title="Related cooking converters"
      />
    </PageContainer>
  );
}
