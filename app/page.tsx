import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import faviconIco from "@/app/assets/favicon.ico";
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
  getLaunchPage,
  getLaunchPageLabel,
  getPageHref,
  getSearchEntries,
  launchPages,
} from "@/lib/content/pages";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Unit Converter, Text Case Converter & Data Size Calculator",
  description:
    "Universal conversion hub for units, text case, data sizes, and lightweight developer-friendly transforms with fast static pages and clean converter widgets.",
  path: "/",
  keywords: [
    "convert anything instantly",
    "conversion hub",
    "unit conversion hub",
    "text conversion tools",
    "data size converter",
    "developer utility tools",
  ],
});

export default function Home() {
  return (
    <PageContainer className="space-y-5 pb-4">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ConvertCenter",
          url: "https://convertcenter.org",
          description:
            "Universal conversion hub for units, text case, data sizes, and lightweight developer-friendly transforms.",
        }}
      />

      <section className="shell-card px-5 py-6 text-center sm:px-8 sm:py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--muted-strong)]">
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
          <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-[58px]">
            Convert anything, instantly
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Units, text, data. Paste, convert, copy.
          </p>
        </div>
        <div className="mx-auto mt-4 max-w-4xl text-left">
          <HomeSearch
            quickSearches={homeQuickSearches}
            searchEntries={getSearchEntries()}
          />
          <HomeUniversalConverter />
        </div>
      </section>

      <div className="flex flex-wrap gap-2 px-1">
        <PillLink active href="#popular">
          all
        </PillLink>
        {browseCategories.map((category) => (
          <PillLink href={category.route} key={category.route}>
            {category.label}
          </PillLink>
        ))}
      </div>

      <section className="space-y-4" id="popular">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Popular conversions</h2>
          <span className="section-badge">{launchPages.length} pages</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {homePopularSlugs.map((slug) => {
            const page = getLaunchPage(slug);

            if (!page) {
              return null;
            }

            return (
              <Link className="link-tile" href={getPageHref(page)} key={page.slug}>
                <span className="font-mono text-sm text-[color:var(--text)]">
                  {getLaunchPageLabel(page)}
                </span>
                <span className="text-xs text-[color:var(--muted)]">
                  Open the dedicated {page.category} page
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="space-y-4" id="category-hubs">
        <div className="flex items-center gap-3">
          <h2 className="section-title">Category hubs</h2>
          <span className="section-badge">{browseCategories.length} hubs</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {browseCategories.map((category) => (
            <Link className="link-tile" href={category.route} key={category.route}>
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
