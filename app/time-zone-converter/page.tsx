import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { StructuredData } from "@/components/structured-data";
import { TimeZoneConverterWidget } from "@/components/time-zone-converter-widget";
import { UtilityCard } from "@/components/utility-card";
import { buildMetadata, makeBreadcrumbSchema } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Time Zone Converter – Convert time between zones",
  description: "Convert time between time zones instantly using this free time zone converter.",
  path: "/time-zone-converter",
  keywords: [
    "time zone converter",
    "convert time between zones",
    "world clock converter",
    "timezone calculator",
  ],
});

export default function TimeZoneConverterPage() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: "Time Zone Converter", path: "/time-zone-converter" },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">date tool</span>
          <Breadcrumbs
            items={[
              { label: "ConvertCenter", href: "/" },
              { label: "time-zone-converter" },
            ]}
          />
          <div className="max-w-3xl space-y-2">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
              Time Zone Converter
            </h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Convert time between time zones instantly using this free time zone converter.
            </p>
          </div>
        </div>
      </section>

      <TimeZoneConverterWidget
        defaultFromTimeZone="America/New_York"
        defaultTime="09:00"
        defaultToTimeZone="Europe/London"
      />

      <section className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">How it works</h2>
            <span className="section-badge">intl api</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[color:var(--muted)]">
            This tool uses the browser&apos;s Intl time zone support to interpret a time in one
            zone and format the matching time in another. The conversion uses today&apos;s date so
            daylight-saving offsets stay relevant for current scheduling.
          </p>
        </UtilityCard>

        <UtilityCard>
          <div className="flex items-center gap-3">
            <h2 className="section-title">Common uses</h2>
            <span className="section-badge">planning</span>
          </div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[color:var(--muted)]">
            <p>Plan meetings across cities without guessing time offsets.</p>
            <p>Check customer support or launch times in another region.</p>
            <p>Convert work hours between local, team, and client time zones.</p>
          </div>
        </UtilityCard>
      </section>
    </PageContainer>
  );
}

