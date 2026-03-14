import { AgeCalculatorWidget } from "@/components/age-calculator-widget";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Age Calculator – Calculate your age instantly",
  description: "Calculate your exact age in years, months, and days using this free age calculator.",
  path: "/age-calculator",
  keywords: [
    "age calculator",
    "calculate age",
    "birthday calculator",
    "age in years months days",
  ],
});

export default function AgeCalculatorPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Age Calculator", path: "/age-calculator" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">date tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "age-calculator" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Age Calculator
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Calculate your exact age in years, months, and days using this free age calculator.
            </p>
          </div>
        </div>
      </section>

      <AgeCalculatorWidget defaultBirthDate="1990-01-01" />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">calendar math</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            This calculator compares the selected birthdate with today&apos;s date, then breaks the
            difference into calendar years, months, and days. It also shows total days plus simple
            week and month approximations for quicker planning.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">quick reference</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Check exact age for forms, applications, and eligibility requirements.</p>
            <p>Compare birthdays with a clean years-months-days breakdown.</p>
            <p>Estimate age in total days or weeks for milestone tracking and planning.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
