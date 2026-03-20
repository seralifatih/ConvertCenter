import { describe, expect, it } from "vitest";
import robots from "../../app/robots";
import sitemap from "../../app/sitemap";
import { browseCategories } from "../../lib/content/categories";
import { interactiveToolPages } from "../../lib/content/interactive-tools";
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
      ...interactiveToolPages.map((page) => page.route),
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
    const weatherHub = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/weather-tools`,
    );
    const generatorTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/random-password-generator`,
    );
    const generatorHub = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/generator-tools`,
    );
    const imageTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/png-to-jpg`);
    const imageHub = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/image-tools`);
    const fileTool = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/pdf-to-text`);
    const fileHub = sitemapEntries.find((entry) => entry.url === `${siteConfig.url}/file-tools`);
    const seoTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/meta-tag-generator`,
    );
    const seoHub = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/seo-marketing-tools`,
    );
    const socialTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/hashtag-generator`,
    );
    const socialHub = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/social-media-tools`,
    );
    const utilityTool = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/color-contrast-checker`,
    );
    const utilityHub = sitemapEntries.find(
      (entry) => entry.url === `${siteConfig.url}/micro-utilities`,
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
    expect(weatherHub?.priority).toBe(0.8);
    expect(generatorTool?.priority).toBe(0.8);
    expect(generatorHub?.priority).toBe(0.8);
    expect(imageTool?.priority).toBe(0.8);
    expect(imageHub?.priority).toBe(0.8);
    expect(fileTool?.priority).toBe(0.8);
    expect(fileHub?.priority).toBe(0.8);
    expect(seoTool?.priority).toBe(0.8);
    expect(seoHub?.priority).toBe(0.8);
    expect(socialTool?.priority).toBe(0.8);
    expect(socialHub?.priority).toBe(0.8);
    expect(utilityTool?.priority).toBe(0.8);
    expect(utilityHub?.priority).toBe(0.8);
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
