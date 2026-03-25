import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import faviconIco from "@/app/assets/favicon.ico";
import { HomeRecentConversionsSlot } from "@/components/home-recent-conversions-slot";
import { HomeRecentToolsSlot } from "@/components/home-recent-tools-slot";
import { HomeSearch } from "@/components/home-search";
import { HomeUniversalConverter } from "@/components/home-universal-converter";
import { PageContainer } from "@/components/page-container";
import { PillLink } from "@/components/pill";
import { StructuredData } from "@/components/structured-data";
import {
  browseCategories,
  homePopularSlugs,
  homeQuickSearches,
} from "@/lib/content/categories";
import {
  getHomepagePopularLabel,
  getPageHref,
  getSearchEntries,
  getSiteToolPage,
} from "@/lib/content/pages";
import { buildMetadata } from "@/lib/seo";

const categoryIconMap: Record<string, string> = {
  weight: "⚖",
  length: "↔",
  volume: "💧",
  temperature: "🌡",
  wind: "💨",
  pressure: "🔵",
  rainfall: "🌧",
  data: "💾",
  text: "✏",
  encoding: "🔤",
  color: "🎨",
  "dev-data": "{ }",
  generator: "✨",
  seo: "🔍",
  social: "🔗",
  utility: "🛠",
  science: "⚗",
  weather: "🌤",
  image: "🖼",
  file: "📄",
};

export const metadata: Metadata = buildMetadata({
  title: "Math Calculators, Unit Converter & Developer Tools",
  description:
    "Free online math calculators, converters, and developer tools. Calculate percentages, averages, ratios, kg to lbs, cm to inches, MB to GB, and more instantly.",
  path: "/",
  keywords: [
    "convert anything instantly",
    "conversion hub",
    "math calculators",
    "unit conversion hub",
    "text conversion tools",
    "data size converter",
    "developer utility tools",
  ],
});

export default function Home() {
  const searchEntries = getSearchEntries();
  const featuredPopularCount = homePopularSlugs.length;

  return (
    <PageContainer className="space-y-4 pb-4">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ConvertCenter",
          url: "https://convertcenter.org",
          description:
            "Universal tool hub for math calculators, unit conversions, text transforms, data sizes, and lightweight developer-friendly utilities.",
        }}
      />

      <section className="homepage-hero shell-card px-5 py-5 sm:px-7 sm:py-6">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,0.92fr)] lg:items-start">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
              <Image
                alt=""
                aria-hidden="true"
                className="h-5 w-5 rounded-[6px]"
                height={20}
                src={faviconIco}
                width={20}
              />
              <span>convertcenter</span>
            </div>
            <h1 className="max-w-full font-medium leading-tight tracking-[-0.02em] [font-size:clamp(1.5rem,5vw,2.5rem)] [overflow-wrap:anywhere] [word-break:break-word] sm:max-w-2xl sm:tracking-[-0.05em] sm:text-[58px]">
              Convert anything, instantly
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
              Search, calculate, convert, copy. No sign-up needed.
            </p>
          </div>

          <div className="space-y-3 text-left">
            <HomeSearch quickSearches={homeQuickSearches} searchEntries={searchEntries} />
            <div className="hero-converter-card">
              <div className="mb-2.5 flex items-center justify-between gap-3">
                <div>
                  <div className="mono-kicker">quick convert</div>
                  <div className="mt-1 text-sm text-[color:var(--muted)]">
                    Fast unit conversion without leaving the homepage.
                  </div>
                </div>
                <span className="section-badge">compact</span>
              </div>
              <HomeUniversalConverter />
            </div>
          </div>
        </div>
      </section>

      <HomeRecentToolsSlot />
      <HomeRecentConversionsSlot />

      <section className="space-y-3" id="popular">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Popular Tools</h2>
          <span className="section-badge">{featuredPopularCount} featured tools</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {homePopularSlugs.map((slug) => {
            const page = getSiteToolPage(slug);

            if (!page) {
              return null;
            }

            const categoryKey = page.kind === "interactive-tool" ? page.categoryKey : page.category;
            const icon = categoryIconMap[categoryKey] ?? "⚙";

            return (
              <Link className="link-tile-popular" href={getPageHref(page)} key={page.slug}>
                <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-[10px] bg-[color:var(--surface)] text-base leading-none">
                  {icon}
                </span>
                <span className="text-[13px] font-medium leading-5 text-[color:var(--text)] sm:text-sm">
                  {getHomepagePopularLabel(page)}
                </span>
                <span className="mt-1 text-xs text-[color:var(--muted)]">
                  Open the dedicated {categoryKey} tool
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <nav
        aria-label="Browse conversion categories"
        className="flex gap-2 overflow-x-auto px-1 pb-1 home-chip-scroll"
      >
        <PillLink active className="shrink-0 whitespace-nowrap" href="/">
          all tools
        </PillLink>
        <PillLink className="shrink-0 whitespace-nowrap" href="/math-calculators">
          math
        </PillLink>
        {browseCategories.map((category) => (
          <PillLink className="shrink-0 whitespace-nowrap" href={category.route} key={category.route}>
            {category.label}
          </PillLink>
        ))}
      </nav>

      <section className="space-y-3" id="category-hubs">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Category hubs</h2>
          <span className="section-badge">{browseCategories.length} hubs</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {browseCategories.map((category, index) => (
            <Link className="link-tile-hub" data-tone={index % 3} href={category.route} key={category.route}>
              <span className="font-mono text-sm text-[color:var(--text)]">
                {category.route}
              </span>
              <span className="text-xs leading-6 text-[color:var(--muted)]">
                {category.description}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
