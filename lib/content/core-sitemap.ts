import { topPriorityNumericSlugs } from "@/lib/config/registry/priority-numeric-content";
import { homePopularSlugs } from "@/lib/content/categories";
import { interactiveToolPages } from "@/lib/content/interactive-tools";
import { mathToolPages } from "@/lib/content/math-tools";
import { getPageHref, getSiteToolPage } from "@/lib/content/pages";
import { standaloneToolPages } from "@/lib/content/standalone-pages";

const featuredInteractiveSlugs = [
  "readability-checker",
  "regex-tester",
  "jwt-decoder",
  "uuid-generator",
  "cron-expression-generator",
  "pressure-unit-converter",
  "watts-to-amps",
  "uv-index-calculator",
  "png-to-jpg",
  "image-resizer",
  "pdf-to-text",
  "merge-pdf",
  "random-number-generator",
  "random-password-generator",
  "lorem-ipsum-generator",
  "meta-tag-generator",
  "utm-builder",
  "hashtag-generator",
  "color-contrast-checker",
] as const;

function uniqueRoutes(routes: readonly `/${string}`[]) {
  return [...new Set(routes)];
}

export function getCoreSitemapRoutes() {
  const priorityToolRoutes = uniqueRoutes(
    [...homePopularSlugs, ...topPriorityNumericSlugs, ...featuredInteractiveSlugs]
      .map((slug) => getSiteToolPage(slug))
      .filter((page): page is NonNullable<ReturnType<typeof getSiteToolPage>> => Boolean(page))
      .map((page) => getPageHref(page)),
  );

  return uniqueRoutes([
    "/",
    ...standaloneToolPages.map((page) => page.route),
    ...mathToolPages.map((page) => page.route),
    ...interactiveToolPages
      .filter((page) =>
        featuredInteractiveSlugs.includes(page.slug as (typeof featuredInteractiveSlugs)[number]),
      )
      .map((page) => page.route),
    ...priorityToolRoutes,
  ]);
}
