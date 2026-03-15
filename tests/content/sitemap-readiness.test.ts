import { describe, expect, it } from "vitest";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import { browseCategories } from "../../lib/content/categories";
import { mathToolPages } from "../../lib/content/math-tools";
import { launchPages } from "../../lib/content/pages";
import { standaloneToolPages } from "../../lib/content/standalone-pages";
import { siteConfig } from "../../lib/site";

describe("sitemap and robots readiness", () => {
  it("includes every live route in the sitemap exactly once", () => {
    const sitemapEntries = sitemap();
    const expectedRoutes = [
      "",
      ...standaloneToolPages.map((page) => page.route),
      ...browseCategories.map((category) => category.route),
      ...mathToolPages.map((page) => page.route),
      ...launchPages.map((page) => `/${page.slug}`),
    ];
    const expectedUrls = new Set(expectedRoutes.map((route) => `${siteConfig.url}${route}`));

    expect(sitemapEntries).toHaveLength(expectedUrls.size);
    expect(new Set(sitemapEntries.map((entry) => entry.url)).size).toBe(sitemapEntries.length);
    expect(new Set(sitemapEntries.map((entry) => entry.url))).toEqual(expectedUrls);
  });

  it("keeps homepage and tool routes prioritized as indexable URLs", () => {
    const sitemapEntries = sitemap();
    const homepage = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}`);
    const sampleTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/kg-to-lbs`);

    expect(homepage?.priority).toBe(1);
    expect(homepage?.changeFrequency).toBe("daily");
    expect(sampleTool?.priority).toBe(0.8);
    expect(sampleTool?.changeFrequency).toBe("weekly");
  });

  it("keeps robots aligned with the canonical sitemap location", () => {
    const robotsConfig = robots();

    expect(robotsConfig.sitemap).toBe(`${siteConfig.url}/sitemap.xml`);
    expect(robotsConfig.rules).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          userAgent: "*",
          allow: "/",
          disallow: expect.arrayContaining(["/search", "/*?*", "/*&*"]),
        }),
      ]),
    );
  });
});
