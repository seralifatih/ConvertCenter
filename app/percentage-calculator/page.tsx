import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { PercentageCalculatorWidget } from "@/components/percentage-calculator-widget";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Percentage Calculator",
  description: "Calculate percentages instantly with this free online percentage calculator.",
  path: "/percentage-calculator",
  keywords: [
    "percentage calculator",
    "what is x percent of y",
    "what percent calculator",
    "percentage increase calculator",
  ],
});

export default function PercentageCalculatorPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Percentage Calculator", path: "/percentage-calculator" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "percentage-calculator" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Percentage Calculator
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Calculate percentages instantly with this free online percentage calculator.
            </p>
          </div>
        </div>
      </section>

      <PercentageCalculatorWidget defaultPrimary={25} defaultSecondary={200} />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">What it covers</h2>
            <span className="section-badge">3 modes</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Find what a percentage of a number equals, like 20% of 350.</p>
            <p>Check what percent one value is of another, such as 48 out of 60.</p>
            <p>Measure percentage increase or decrease between an old number and a new one.</p>
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">quick checks</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Work out discounts, markups, tax values, and savings percentages.</p>
            <p>Compare changes in traffic, revenue, scores, and performance metrics.</p>
            <p>Handle everyday school, finance, shopping, and business percentage math faster.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
