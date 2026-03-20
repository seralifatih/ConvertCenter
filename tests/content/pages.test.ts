import { describe, expect, it } from "vitest";
import { launchToolRegistry } from "../../lib/config/conversion-registry";
import { interactiveToolPages } from "../../lib/content/interactive-tools";
import { mathToolPages } from "../../lib/content/math-tools";
import {
  getCategoryPages,
  getLaunchPageCount,
  getSiteToolPage,
  launchPages,
} from "../../lib/content/pages";
import { standaloneToolPages } from "../../lib/content/standalone-pages";

describe("launch page registry", () => {
  it("counts unique live tool pages across registry and standalone tools", () => {
    const uniqueSlugs = new Set([
      ...launchPages.map((page) => page.slug),
      ...interactiveToolPages.map((page) => page.slug),
      ...mathToolPages.map((page) => page.slug),
      ...standaloneToolPages.map((page) => page.slug),
    ]);
    console.log(`ConvertCenter live tool page total: ${uniqueSlugs.size}`);

    expect(getLaunchPageCount()).toBe(uniqueSlugs.size);
    expect(getLaunchPageCount()).toBe(
      launchToolRegistry.length +
        interactiveToolPages.length +
        mathToolPages.length +
        standaloneToolPages.length,
    );
  });

  it("surfaces interactive developer helpers through the shared page registry", () => {
    const devDataPages = getCategoryPages("dev-data");
    const devDataSlugs = new Set(devDataPages.map((page) => page.slug));

    expect(devDataSlugs.has("regex-tester")).toBe(true);
    expect(devDataSlugs.has("jwt-decoder")).toBe(true);
    expect(devDataSlugs.has("uuid-generator")).toBe(true);
    expect(getSiteToolPage("hash-generator")?.kind).toBe("interactive-tool");
  });

  it("surfaces generator pages through the shared page registry", () => {
    const generatorPages = new Set(getCategoryPages("generator").map((page) => page.slug));

    expect(generatorPages.has("random-number-generator")).toBe(true);
    expect(generatorPages.has("random-name-generator")).toBe(true);
    expect(generatorPages.has("random-password-generator")).toBe(true);
    expect(generatorPages.has("random-color-generator")).toBe(true);
    expect(generatorPages.has("random-team-generator")).toBe(true);
    expect(generatorPages.has("random-text-generator")).toBe(true);
    expect(generatorPages.has("lorem-ipsum-generator")).toBe(true);
  });

  it("surfaces image and file utility pages through the shared page registry", () => {
    const imagePages = new Set(getCategoryPages("image").map((page) => page.slug));
    const filePages = new Set(getCategoryPages("file").map((page) => page.slug));

    expect(imagePages.has("png-to-jpg")).toBe(true);
    expect(imagePages.has("favicon-generator")).toBe(true);
    expect(filePages.has("pdf-to-text")).toBe(true);
    expect(filePages.has("merge-pdf")).toBe(true);
    expect(getSiteToolPage("split-pdf")?.kind).toBe("interactive-tool");
  });

  it("surfaces SEO, social, and micro utility pages through the shared page registry", () => {
    const seoPages = new Set(getCategoryPages("seo").map((page) => page.slug));
    const socialPages = new Set(getCategoryPages("social").map((page) => page.slug));
    const utilityPages = new Set(getCategoryPages("utility").map((page) => page.slug));

    expect(seoPages.has("meta-tag-generator")).toBe(true);
    expect(seoPages.has("utm-parser")).toBe(true);
    expect(socialPages.has("hashtag-generator")).toBe(true);
    expect(socialPages.has("tweet-length-counter")).toBe(true);
    expect(utilityPages.has("color-contrast-checker")).toBe(true);
    expect(utilityPages.has("favicon-generator")).toBe(true);
    expect(getSiteToolPage("box-shadow-generator")?.kind).toBe("interactive-tool");
  });
});
