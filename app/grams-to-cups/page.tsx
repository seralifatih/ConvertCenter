import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookingIngredientConverterWidget } from "@/components/cooking-ingredient-converter-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Grams to Cups Converter",
  description:
    "Convert grams to cups for flour, sugar, butter, water, and other common cooking ingredients.",
  path: "/grams-to-cups",
  keywords: ["grams to cups", "gram to cup", "baking conversion", "kitchen converter"],
});

export default function GramsToCupsPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Grams to Cups Converter", path: "/grams-to-cups" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">cooking tool</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: "grams-to-cups" }]} />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Grams to Cups Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert grams to cups for flour, sugar, butter, water, and other common cooking
              ingredients.
            </p>
          </div>
        </div>
      </section>
      <CookingIngredientConverterWidget
        defaultIngredient="sugar"
        defaultValue="200"
        mode="gramsToCups"
        toolLabel="Grams to Cups Converter"
      />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">Weight to volume in the kitchen</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Grams are consistent and precise, but many recipes still list cups. This converter
            bridges that gap by turning a gram amount into an estimated cup measure for the
            ingredient you choose.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Convert scale-based ingredients into US cup measurements.</p>
            <p>Adapt metric recipes for cooks using cups and spoons.</p>
            <p>Quickly compare baking ingredient quantities across recipe formats.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
