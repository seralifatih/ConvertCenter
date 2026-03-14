import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { PercentageChangeWidget } from "@/components/percentage-change-widget";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Percentage Change Calculator",
  description: "Calculate percentage increase or decrease between two numbers instantly.",
  path: "/percentage-change",
  keywords: [
    "percentage change calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "percent change",
  ],
});

export default function PercentageChangePage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Percentage Change Calculator", path: "/percentage-change" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "percentage-change" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Percentage Change Calculator
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Calculate percentage increase or decrease between two numbers instantly.
            </p>
          </div>
        </div>
      </section>

      <PercentageChangeWidget defaultNewValue={120} defaultOldValue={100} />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">change formula</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            This calculator compares a new number against an original number using the standard
            percentage-change formula: `((new - old) / old) x 100`. The result shows whether the
            change is an increase, a decrease, or no change at all.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">quick checks</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Compare price changes, discounts, and markup between two values.</p>
            <p>Measure revenue, traffic, or growth trends across reporting periods.</p>
            <p>Check increase or decrease percentages for scores, rates, and business metrics.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
