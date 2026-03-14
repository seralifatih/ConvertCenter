import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UnixTimestampConverterWidget } from "@/components/unix-timestamp-converter-widget";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Unix Timestamp Converter",
  description: "Convert Unix timestamps to readable dates and vice versa instantly.",
  path: "/unix-timestamp-converter",
  keywords: [
    "unix timestamp converter",
    "timestamp to date",
    "date to unix timestamp",
    "epoch converter",
  ],
});

export default function UnixTimestampConverterPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Unix Timestamp Converter", path: "/unix-timestamp-converter" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">date tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "unix-timestamp-converter" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Unix Timestamp Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert Unix timestamps to readable dates and vice versa instantly.
            </p>
          </div>
        </div>
      </section>

      <UnixTimestampConverterWidget defaultTimestamp="1704067200" />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">seconds to iso</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Unix timestamps count seconds since January 1, 1970 UTC. This tool converts those
            values into readable ISO dates, and it can also take a chosen date and turn it back
            into a Unix timestamp for logs, APIs, and debugging work.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">developer utility</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Decode timestamps from APIs, logs, and database exports.</p>
            <p>Generate Unix seconds for scripts, testing, and data pipelines.</p>
            <p>Verify UTC dates quickly when debugging time-based events.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
