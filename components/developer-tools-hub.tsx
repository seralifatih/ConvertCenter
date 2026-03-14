import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageContainer } from "@/components/page-container";
import { RelatedLinks } from "@/components/related-links";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
import { getBrowseCategory } from "@/lib/content/categories";
import { getLaunchPage, getLaunchPageLabel, getLaunchPageSummary, getPageHref } from "@/lib/content/pages";
import { makeBreadcrumbSchema } from "@/lib/seo";

const dataSizeSlugs = [
  "bytes-to-kb",
  "kb-to-mb",
  "mb-to-gb",
  "gb-to-tb",
] as const;

const formatToolSlugs = [
  "markdown-to-html",
  "html-to-markdown",
  "yaml-to-json",
  "json-to-yaml",
] as const;

const timeTools = [
  {
    description: "Convert dates into Unix timestamps instantly for APIs, logs, and debugging.",
    href: "/date-to-unix",
    label: "Date to Unix Timestamp Converter",
  },
  {
    description: "Convert Unix timestamps into readable dates and back again in one place.",
    href: "/unix-timestamp-converter",
    label: "Unix Timestamp Converter",
  },
  {
    description: "Convert Unix timestamps into human-readable dates instantly.",
    href: "/unix-to-date",
    label: "Unix Timestamp to Date Converter",
  },
  {
    description: "Compare and convert time values across common time zones.",
    href: "/time-zone-converter",
    label: "Time Zone Converter",
  },
] as const;

function ToolGrid({
  items,
  title,
  description,
}: {
  description: string;
  items: ReadonlyArray<{ href: string; label: string; summary: string }>;
  title: string;
}) {
  return (
    <UtilityCard>
      <div className="mb-4 flex items-center gap-3">
        <h2 className="section-title">{title}</h2>
        <span className="section-badge">{items.length} tools</span>
      </div>
      <p className="mb-4 text-sm leading-7 text-[color:var(--muted)]">{description}</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item) => (
          <Link className="link-tile" href={item.href} key={item.href}>
            <span className="font-mono text-sm text-[color:var(--text)]">{item.label}</span>
            <span className="text-xs text-[color:var(--muted)]">{item.summary}</span>
          </Link>
        ))}
      </div>
    </UtilityCard>
  );
}

export function DeveloperToolsHub() {
  const category = getBrowseCategory("dev-data");

  if (!category) {
    return null;
  }

  const dataSizeItems = dataSizeSlugs
    .map((slug) => getLaunchPage(slug))
    .filter((page): page is NonNullable<ReturnType<typeof getLaunchPage>> => Boolean(page))
    .map((page) => ({
      href: getPageHref(page),
      label: getLaunchPageLabel(page),
      summary: getLaunchPageSummary(page),
    }));

  const formatToolItems = formatToolSlugs
    .map((slug) => getLaunchPage(slug))
    .filter((page): page is NonNullable<ReturnType<typeof getLaunchPage>> => Boolean(page))
    .map((page) => ({
      href: getPageHref(page),
      label: getLaunchPageLabel(page),
      summary: getLaunchPageSummary(page),
    }));

  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={makeBreadcrumbSchema([
          { name: "ConvertCenter", path: "/" },
          { name: category.title, path: category.route },
        ])}
      />

      <section className="shell-card px-5 py-6 sm:px-7 sm:py-8">
        <div className="space-y-4">
          <span className="mono-kicker">developer hub</span>
          <Breadcrumbs items={[{ label: "ConvertCenter", href: "/" }, { label: category.title }]} />
          <div className="max-w-4xl space-y-3">
            <h1 className="text-3xl font-medium tracking-[-0.04em] sm:text-4xl">{category.title}</h1>
            <p className="text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Developer workflows regularly involve small conversion jobs that are too specific for a general unit
              converter but too repetitive to keep rebuilding by hand. This hub brings together the utility pages that
              help with raw file sizes, Unix timestamps, time-zone checks, and format conversion between common
              developer-facing syntaxes. The goal is speed and clarity: you should be able to jump from a payload, a
              timestamp, or a block of markup to the output you need without leaving the browser or opening a scratch
              script. It is designed for API debugging, content migration, frontend work, and everyday data cleanup
              tasks where copy-ready output matters.
            </p>
          </div>
        </div>
      </section>

      <ToolGrid
        description="Binary data size pages for bytes, kilobytes, megabytes, gigabytes, and terabytes. Useful when you need exact file-size comparisons instead of rough storage guesses."
        items={dataSizeItems}
        title="Data size conversions"
      />

      <ToolGrid
        description="Time-related developer utilities for timestamps, scheduling, and log inspection. These tools help translate between machine-friendly values and readable date or zone output."
        items={timeTools.map((item) => ({
          href: item.href,
          label: item.label,
          summary: item.description,
        }))}
        title="Time unit conversions"
      />

      <ToolGrid
        description="Format converters for markup, data serialization, and config-friendly output. These pages are useful when content needs to move between publishing, docs, and developer tooling."
        items={formatToolItems}
        title="Format converters"
      />

      <RelatedLinks
        links={[
          { href: "/encoding-tools", label: "encoding tools" },
          { href: "/data-converter", label: "data converter" },
          { href: "/", label: "all converters" },
        ]}
        title="Related hubs"
      />
    </PageContainer>
  );
}
