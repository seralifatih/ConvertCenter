import Link from "next/link";
import type { Metadata } from "next";
import { HomeSearch } from "@/components/home-search";
import { HomeUniversalConverter } from "@/components/home-universal-converter";
import { PageContainer } from "@/components/page-container";
import { PillLink } from "@/components/pill";
import { StructuredData } from "@/components/structured-data";
import { UtilityCard } from "@/components/utility-card";
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
  title: "Convert anything instantly",
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
          <h1 className="text-4xl font-medium tracking-[-0.05em] sm:text-[58px]">
            Convert anything, instantly
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[color:var(--muted)] sm:text-base">
            Units, text, data. Paste, convert, copy. No sign-up.
          </p>
        </div>
        <div className="mx-auto mt-5 max-w-4xl text-left">
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

      <UtilityCard id="popular">
        <div className="mb-4 flex items-center gap-3">
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
      </UtilityCard>

      <UtilityCard id="category-hubs">
        <div className="mb-4 flex items-center gap-3">
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
      </UtilityCard>
    </PageContainer>
  );
}
