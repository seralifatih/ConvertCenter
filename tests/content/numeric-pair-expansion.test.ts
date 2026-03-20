import { describe, expect, it } from "vitest";
import sitemap from "../../app/sitemap";
import { launchToolRegistry } from "../../lib/config/conversion-registry";

const expectedNewNumericSlugs = [
  "kg-to-grams",
  "grams-to-kg",
  "meters-to-cm",
  "cm-to-meters",
  "km-to-meters",
  "meters-to-km",
  "yards-to-meters",
  "meters-to-yards",
  "liters-to-ml",
  "ml-to-liters",
  "cups-to-tbsp",
  "tbsp-to-cups",
  "celsius-to-kelvin",
  "kelvin-to-celsius",
  "mph-to-kmh",
  "kmh-to-mph",
  "knots-to-kmh",
  "kmh-to-knots",
  "hpa-to-mmhg",
  "mmhg-to-hpa",
  "bar-to-psi",
  "psi-to-bar",
  "mm-to-inches-rain",
  "inches-rain-to-mm",
] as const;

describe("numeric pair expansion coverage", () => {
  it("keeps the registry at 50+ numeric pair pages", () => {
    const numericPairPages = launchToolRegistry.filter((page) => page.kind === "numeric-pair");

    expect(numericPairPages.length).toBeGreaterThanOrEqual(50);
  });

  it("includes the new numeric pair pages in the launch registry", () => {
    const slugs = new Set(
      launchToolRegistry
        .filter((page) => page.kind === "numeric-pair")
        .map((page) => page.slug),
    );

    for (const slug of expectedNewNumericSlugs) {
      expect(slugs.has(slug), `Expected ${slug} in numeric pair registry`).toBe(true);
    }
  });

  it("emits the new numeric pair pages in the sitemap", () => {
    const sitemapUrls = new Set(sitemap().map((entry) => entry.url));

    for (const slug of expectedNewNumericSlugs) {
      expect(sitemapUrls.has(`https://convertcenter.org/${slug}`), `Expected ${slug} in sitemap`).toBe(true);
    }
  });
});
