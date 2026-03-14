import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { RatioCalculatorWidget } from "@/components/ratio-calculator-widget";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Ratio Calculator",
  description: "Simplify ratios and solve proportions instantly with this free ratio calculator.",
  path: "/ratio-calculator",
  keywords: [
    "ratio calculator",
    "simplify ratio",
    "proportion calculator",
    "ratio simplifier",
  ],
});

export default function RatioCalculatorPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Ratio Calculator", path: "/ratio-calculator" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "ratio-calculator" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Ratio Calculator
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Simplify ratios and solve proportions instantly with this free ratio calculator.
            </p>
          </div>
        </div>
      </section>

      <RatioCalculatorWidget defaultLeft={4} defaultRight={8} defaultThird={6} />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">ratio math</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            In simplify mode, the calculator finds the greatest common divisor of both numbers and
            reduces the ratio to its lowest terms. In proportion mode, it solves a:b = c:x using
            cross multiplication, which makes quick scale calculations and missing-value checks much
            easier.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">quick reference</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Simplify ratios for recipes, classroom math, and visual scale comparisons.</p>
            <p>Solve proportions when resizing designs, maps, drawings, and ingredient amounts.</p>
            <p>Check equivalent ratios quickly without working through each step by hand.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
