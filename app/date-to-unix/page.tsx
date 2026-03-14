import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { UnixTimestampConverterWidget } from "@/components/unix-timestamp-converter-widget";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Date to Unix Timestamp Converter",
  description: "Convert dates to Unix timestamps instantly.",
  path: "/date-to-unix",
  keywords: [
    "date to unix timestamp",
    "date to epoch",
    "convert date to unix",
    "unix timestamp from date",
  ],
});

export default function DateToUnixPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Date to Unix Timestamp Converter", path: "/date-to-unix" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">date tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "date-to-unix" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Date to Unix Timestamp Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert dates to Unix timestamps instantly.
            </p>
          </div>
        </div>
      </section>

      <UnixTimestampConverterWidget mode="dateToUnix" />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">date to epoch</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            Unix timestamps represent the number of seconds since January 1, 1970 UTC. Pick a
            date and time, and this tool converts it into Unix seconds for APIs, logs, scripts,
            and database records.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">developer utility</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Create timestamp values for API requests and scheduled jobs.</p>
            <p>Convert product launch times and event dates into backend-friendly Unix seconds.</p>
            <p>Prepare consistent UTC timestamps for testing and log comparisons.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}
