import { AverageCalculatorWidget } from "@/components/average-calculator-widget";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Average Calculator",
  description: "Calculate the average (mean) of numbers instantly.",
  path: "/average-calculator",
  keywords: [
    "average calculator",
    "mean calculator",
    "calculate average",
    "number average",
  ],
});

export default function AverageCalculatorPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Average Calculator", path: "/average-calculator" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "average-calculator" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Average Calculator
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Calculate the average (mean) of numbers instantly.
            </p>
          </div>
        </div>
      </section>

      <AverageCalculatorWidget defaultValue={"10, 20, 30\n40"} />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">arithmetic mean</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            The calculator adds all valid numbers in your list, then divides that total by the
            number of values entered. It accepts comma-separated or newline-separated input, which
            makes it handy for pasted lists from spreadsheets, notes, and simple datasets.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">quick math</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Average test scores, expenses, ratings, or repeated measurements quickly.</p>
            <p>Check the mean of spreadsheet values without opening a separate calculator.</p>
            <p>Summarize small numeric lists for reports, notes, and lightweight analysis.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
