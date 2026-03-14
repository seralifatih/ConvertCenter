import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookingIngredientConverterWidget } from "@/components/cooking-ingredient-converter-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cups to Grams Converter",
  description:
    "Convert cups to grams for flour, sugar, butter, water, and other common cooking ingredients.",
  path: "/cups-to-grams",
  keywords: ["cups to grams", "cup to gram", "baking conversion", "kitchen converter"],
});

export default function CupsToGramsPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Cups to Grams Converter", path: "/cups-to-grams" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">cooking tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "cups-to-grams" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Cups to Grams Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert cups to grams for flour, sugar, butter, water, and other common cooking
              ingredients.
            </p>
          </div>
        </div>
      </section>
      <CookingIngredientConverterWidget defaultIngredient="flour" defaultValue="1" mode="cupsToGrams" />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">Why ingredient matters</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Cups measure volume, while grams measure weight. That means a cup of flour does not
            weigh the same as a cup of sugar or butter. This page keeps the conversion practical by
            letting you choose the ingredient before converting.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Translate US recipe cups into gram-based baking measurements.</p>
            <p>Scale recipes more accurately when working with a kitchen scale.</p>
            <p>Compare ingredient weights across international recipe sources.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}

