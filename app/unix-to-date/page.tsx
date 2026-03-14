import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UnixTimestampConverterWidget } from "@/components/unix-timestamp-converter-widget";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Unix Timestamp to Date Converter",
  description: "Convert Unix timestamps to human-readable dates instantly.",
  path: "/unix-to-date",
  keywords: [
    "unix timestamp to date",
    "epoch to date",
    "convert unix timestamp",
    "timestamp to readable date",
  ],
});

export default function UnixToDatePage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Unix Timestamp to Date Converter", path: "/unix-to-date" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">date tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "unix-to-date" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Unix Timestamp to Date Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert Unix timestamps to human-readable dates instantly.
            </p>
          </div>
        </div>
      </section>

      <UnixTimestampConverterWidget mode="unixToDate" />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">epoch to utc</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Unix timestamps count seconds from January 1, 1970 UTC. Enter a timestamp and this
            tool turns it into a readable UTC date for debugging, logs, analytics events, and API
            payloads.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">developer utility</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Check timestamps from databases, APIs, and webhook payloads.</p>
            <p>Read event times in logs without converting values manually.</p>
            <p>Confirm UTC timing when debugging scheduled tasks and user activity.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
