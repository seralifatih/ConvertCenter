import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

const mathTools = [
  {
    href: "/percentage-calculator",
    label: "percentage calculator",
    summary: "Handle percent-of, what-percent, and percentage change in one place.",
  },
  {
    href: "/percentage-change",
    label: "percentage change",
    summary: "Compare an old number and a new number to measure increase or decrease.",
  },
  {
    href: "/average-calculator",
    label: "average calculator",
    summary: "Find the mean of comma- or line-separated values instantly.",
  },
  {
    href: "/ratio-calculator",
    label: "ratio calculator",
    summary: "Reduce ratios and solve basic proportions for scaling and comparisons.",
  },
] as const;

export const metadata = buildMetadata({
  title: "Math Tools",
  description:
    "Math calculator hub for percentages, averages, ratios, and quick number comparisons.",
  path: "/math-tools",
  keywords: [
    "math tools",
    "math calculators",
    "percentage calculator",
    "average calculator",
    "ratio calculator",
  ],
});

export default function MathToolsPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Math Tools", path: "/math-tools" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math hub</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "math-tools" },
            ]}
          />
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">Math Tools</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Math tools work best when they remove friction instead of adding another layer of
              setup. This hub brings together the small calculators people reach for most often:
              percentages for discounts and growth, averages for lists of values, and ratios for
              simplified comparisons or quick proportions. Whether you are checking a sale price,
              summarizing scores, comparing performance numbers, or scaling a recipe or drawing,
              these pages are built for direct input and immediate answers. Each tool keeps the
              interface lightweight, highlights the result clearly, and stays focused on common
              everyday calculations rather than heavy spreadsheet-style workflows.
            </p>
          </div>
        </div>
      </section>

      <UtilityCard>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="section-title">Core calculators</h2>
          <span className="section-badge">{mathTools.length} tools</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {mathTools.map((tool) => (
            <Link className="link-tile" href={tool.href} key={tool.href}>
              <span className="font-mono text-sm text-[color:var(--text)]">{tool.label}</span>
              <span className="text-xs leading-6 text-[color:var(--muted)]">{tool.summary}</span>
            </Link>
          ))}
        </div>
      </UtilityCard>

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Typical use cases</h2>
            <span className="section-badge">everyday math</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Check discounts, tax values, price changes, and growth rates with percentage tools.</p>
            <p>Summarize grades, survey scores, expenses, or measurements with a quick average.</p>
            <p>Reduce ratios and solve proportions for scaling recipes, drawings, and comparisons.</p>
          </div>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Best starting points</h2>
            <span className="section-badge">popular</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>
              Start with the percentage calculator when you need flexible percentage math in one
              tool.
            </p>
            <p>Use percentage change for before-and-after comparisons with a clear increase or decrease result.</p>
            <p>Use average or ratio tools when you already have a small list or pair of numbers.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
