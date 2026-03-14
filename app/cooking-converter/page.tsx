import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { RelatedLinks } from "@/components/related-links";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

const featuredTools = [
  {
    href: "/cups-to-grams",
    label: "cups to grams",
    summary: "Convert volume to weight with ingredient-aware kitchen references.",
  },
  {
    href: "/grams-to-cups",
    label: "grams to cups",
    summary: "Translate scale-based baking amounts back into cup measures.",
  },
  {
    href: "/tbsp-to-ml",
    label: "tbsp to ml",
    summary: "Useful for sauces, dressings, extracts, and small liquid recipe steps.",
  },
  {
    href: "/tsp-to-ml",
    label: "tsp to ml",
    summary: "Quick spoon-to-metric conversion for syrups, flavorings, and baking prep.",
  },
] as const;

const volumeTools = [
  "/cups-to-ml",
  "/ml-to-cups",
  "/tbsp-to-ml",
  "/ml-to-tbsp",
  "/tsp-to-ml",
  "/ml-to-tsp",
] as const;

const ingredientTools = [
  "/cups-to-grams",
  "/grams-to-cups",
  "/teaspoons-to-grams",
  "/cups-to-grams-flour",
  "/grams-to-cups-flour",
  "/cups-to-grams-sugar",
  "/grams-to-cups-sugar",
  "/tsp-to-grams-sugar",
  "/grams-to-tsp-sugar",
] as const;

export const metadata = buildMetadata({
  title: "Cooking Converter",
  description:
    "Cooking conversion hub for cups, ml, tbsp, tsp, and ingredient-specific baking tools for flour and sugar.",
  path: "/cooking-converter",
  keywords: [
    "cooking converter",
    "recipe converter",
    "kitchen measurement converter",
    "baking conversions",
    "cups to grams",
    "tbsp to ml",
  ],
});

export default function CookingConverterPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Cooking Converter", path: "/cooking-converter" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">cooking hub</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "cooking-converter" },
            ]}
          />
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Cooking Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Recipe conversions are usually less about abstract unit math and more about getting a
              usable kitchen answer quickly. Sometimes you need a pure volume conversion like cups
              to milliliters or tablespoons to ml because the recipe and your measuring tools use
              different systems. Other times you need an ingredient-specific weight conversion like
              cups to grams for flour or sugar, where the result depends on density and should be
              treated as an approximate cooking reference. This hub keeps those tools in one place
              so you can move from baking prep to sauce measurements to small spoon conversions
              without hunting through unrelated utility pages.
            </p>
          </div>
        </div>
      </section>

      <UtilityCard>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="section-title">Featured tools</h2>
          <span className="section-badge">{featuredTools.length} picks</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredTools.map((tool) => (
            <Link className="link-tile" href={tool.href} key={tool.href}>
              <span className="font-mono text-sm text-[color:var(--text)]">{tool.label}</span>
              <span className="text-xs leading-6 text-[color:var(--muted)]">{tool.summary}</span>
            </Link>
          ))}
        </div>
      </UtilityCard>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Volume conversions</h2>
            <span className="section-badge">pure unit math</span>
          </div>
          <p className="mb-4 text-sm leading-7 text-[color:var(--muted)]">
            These pages handle everyday kitchen volume conversions where the relationship is fixed,
            such as cups, milliliters, tablespoons, and teaspoons.
          </p>
          <div className="flex flex-wrap gap-2">
            {volumeTools.map((href) => (
              <Link className="utility-chip font-mono" href={href} key={href}>
                {href.replace("/", "")}
              </Link>
            ))}
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="mb-4 flex items-center gap-3">
            <h2 className="section-title">Ingredient-specific weight conversions</h2>
            <span className="section-badge">density matters</span>
          </div>
          <p className="mb-4 text-sm leading-7 text-[color:var(--muted)]">
            These pages are for baking-style conversions where cups or teaspoons do not map to one
            universal gram value. Each route locks the ingredient and clearly states the assumption
            being used.
          </p>
          <div className="flex flex-wrap gap-2">
            {ingredientTools.map((href) => (
              <Link className="utility-chip font-mono" href={href} key={href}>
                {href.replace("/", "")}
              </Link>
            ))}
          </div>
        </UtilityCard>
      </section>

      <RelatedLinks
        links={[
          { href: "/volume-converter", label: "volume converter" },
          { href: "/weight-converter", label: "weight converter" },
          { href: "/temperature-converter", label: "temperature converter" },
          { href: "/", label: "all converters" },
        ]}
        title="Related categories"
      />
    </PageContainer>
  );
}
