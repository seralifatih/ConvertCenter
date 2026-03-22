import { describe, expect, it } from "vitest";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import { getCoreSitemapRoutes } from "../../lib/content/core-sitemap";
import { siteConfig } from "../../lib/site";

describe("sitemap and robots readiness", () => {
  it("includes every core route in the sitemap exactly once", () => {
    const sitemapEntries = sitemap();
    const expectedUrls = new Set(
      getCoreSitemapRoutes().map((route) =>
        route === "/" ? siteConfig.url : `${siteConfig.url}${route}`,
      ),
    );

    expect(sitemapEntries).toHaveLength(expectedUrls.size);
    expect(new Set(sitemapEntries.map((entry) => entry.url)).size).toBe(sitemapEntries.length);
    expect(new Set(sitemapEntries.map((entry) => entry.url))).toEqual(expectedUrls);
  });

  it("keeps homepage and core tool routes prioritized as indexable URLs", () => {
    const sitemapEntries = sitemap();
    const homepage = sitemapEntries.find((entry) => entry.url === siteConfig.url);
    const sampleTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/kg-to-lbs`);
    const newTextTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/normalize-unicode`,
    );
    const textInteractiveTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/readability-checker`,
    );
    const devDataFormatTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/json-to-csv`,
    );
    const devDataInteractiveTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/regex-tester`,
    );
    const newCookingTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/tbsp-to-grams-sugar`,
    );
    const scienceTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/watts-to-amps`,
    );
    const generatorTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/random-password-generator`,
    );
    const imageTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/png-to-jpg`);
    const fileTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/pdf-to-text`);
    const seoTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/meta-tag-generator`,
    );
    const socialTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/hashtag-generator`,
    );
    const utilityTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/color-contrast-checker`,
    );

    expect(homepage?.priority).toBe(1);
    expect(homepage?.changeFrequency).toBe("daily");
    expect(sampleTool?.priority).toBe(0.8);
    expect(sampleTool?.changeFrequency).toBe("weekly");
    expect(newTextTool?.priority).toBe(0.8);
    expect(textInteractiveTool?.priority).toBe(0.8);
    expect(devDataFormatTool?.priority).toBe(0.8);
    expect(devDataInteractiveTool?.priority).toBe(0.8);
    expect(newCookingTool?.priority).toBe(0.8);
    expect(scienceTool?.priority).toBe(0.8);
    expect(generatorTool?.priority).toBe(0.8);
    expect(imageTool?.priority).toBe(0.8);
    expect(fileTool?.priority).toBe(0.8);
    expect(seoTool?.priority).toBe(0.8);
    expect(socialTool?.priority).toBe(0.8);
    expect(utilityTool?.priority).toBe(0.8);
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
