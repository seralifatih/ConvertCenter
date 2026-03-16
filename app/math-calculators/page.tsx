import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import {
  mathHubConfig,
  mathToolPages,
} from "@/lib/content/math-tools";
import { buildMetadata, makeBreadcrumbSchema, makeSoftwareApplicationSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: mathHubConfig.title,
  description: mathHubConfig.description,
  path: mathHubConfig.route,
  keywords: [...mathHubConfig.keywords],
});

export default function MathCalculatorsPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: mathHubConfig.title, path: mathHubConfig.route },
        ])}
      />
      <StructuredData
        data={makeSoftwareApplicationSchema({
          applicationCategory: "CalculatorApplication",
          description: mathHubConfig.description,
          name: mathHubConfig.title,
          path: mathHubConfig.route,
        })}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">math hub</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: mathHubConfig.title },
            ]}
          />
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              {mathHubConfig.title}
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              {mathHubConfig.intro}
            </p>
          </div>
        </div>
      </section>

      <UtilityCard>
        <div className="mb-4 flex items-center gap-3">
          <h2 className="section-title">Core calculators</h2>
          <span className="section-badge">{mathToolPages.length} tools</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {mathToolPages.map((tool) => (
            <Link className="link-tile" href={tool.route} key={tool.slug}>
              <span className="font-mono text-sm text-[color:var(--text)]">{tool.title}</span>
              <span className="text-xs leading-6 text-[color:var(--muted)]">
                {tool.description}
              </span>
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
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[color:var(--muted)]">
            {mathHubConfig.useCases.map((useCase) => (
              <li key={useCase}>{useCase}</li>
            ))}
          </ul>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Start here</h2>
            <span className="section-badge">recommended</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Use the percentage calculator for percent-of, what-percent, and flexible percentage math.</p>
            <p>Use percentage change for before-and-after comparisons with a clear increase or decrease result.</p>
            <p>Use average and ratio tools when you already have a list or pair of values ready to compare.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
