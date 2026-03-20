import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookingIngredientConverterWidget } from "@/components/cooking-ingredient-converter-widget";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Teaspoons to Grams Converter",
  description:
    "Convert teaspoons to grams for flour, sugar, butter, water, and other common cooking ingredients.",
  path: "/teaspoons-to-grams",
  keywords: ["teaspoons to grams", "tsp to grams", "baking conversion", "kitchen converter"],
});

export default function TeaspoonsToGramsPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Teaspoons to Grams Converter", path: "/teaspoons-to-grams" },
        ])}
      />
      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">cooking tool</span>
          <Breadcrumbs
            items={[{ label: "ConvertCenter", href: "/" }, { label: "teaspoons-to-grams" }]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Teaspoons to Grams Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert teaspoons to grams for flour, sugar, butter, water, and other common cooking
              ingredients.
            </p>
          </div>
        </div>
      </section>
      <CookingIngredientConverterWidget
        defaultIngredient="butter"
        defaultValue="3"
        mode="teaspoonsToGrams"
        toolLabel="Teaspoons to Grams Converter"
      />
      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <h2 className="section-title">Small spoon conversions</h2>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Teaspoons are common in recipes, but grams are more precise. Since ingredients do not
            all weigh the same per teaspoon, this converter keeps the result ingredient-specific
            instead of treating every spoon the same.
          </p>
        </UtilityCard>
        <UtilityCard>
          <h2 className="section-title">Common uses</h2>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Convert small baking measurements into grams for better consistency.</p>
            <p>Translate teaspoon-based recipes for ingredient prep on a kitchen scale.</p>
            <p>Check syrup, seasoning, and topping amounts with less guesswork.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
