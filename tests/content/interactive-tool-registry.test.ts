import { describe, expect, it } from "vitest";
import { getBrowseCategory } from "../../lib/content/categories";
import {
  getInteractiveToolPage,
  interactiveToolPages,
} from "../../lib/content/interactive-tools";

describe("interactive tool registry", () => {
  it("registers the interactive browse categories", () => {
    expect(getBrowseCategory("/generator-tools")?.title).toBe("Generator Tools");
    expect(getBrowseCategory("/seo-marketing-tools")?.title).toBe("SEO & Marketing Tools");
    expect(getBrowseCategory("/social-media-tools")?.title).toBe("Social Media Tools");
    expect(getBrowseCategory("/micro-utilities")?.title).toBe("Micro Design & Utility Tools");
    expect(getBrowseCategory("/science-calculators")?.title).toBe("Science & Engineering Tools");
    expect(getBrowseCategory("/weather-tools")?.title).toBe("Weather & UV Tools");
    expect(getBrowseCategory("/image-tools")?.title).toBe("Image Tools");
    expect(getBrowseCategory("/file-tools")?.title).toBe("File Tools");
  });

  it("keeps slugs and routes unique", () => {
    const slugs = new Set(interactiveToolPages.map((page) => page.slug));
    const routes = new Set(interactiveToolPages.map((page) => page.route));

    expect(slugs.size).toBe(interactiveToolPages.length);
    expect(routes.size).toBe(interactiveToolPages.length);
  });

  it("provides examples, FAQs, keywords, and long descriptions for every interactive page", () => {
    for (const page of interactiveToolPages) {
      expect(page.examples.length, `Expected examples for ${page.slug}`).toBeGreaterThanOrEqual(3);
      expect(page.faq.length, `Expected FAQs for ${page.slug}`).toBeGreaterThanOrEqual(3);
      expect(page.keywords.length, `Expected keywords for ${page.slug}`).toBeGreaterThan(0);
      expect(page.longDescription.sections.length, `Expected longDescription for ${page.slug}`).toBe(2);
    }
  });

  it("exposes the pressure, science, and weather tools via slug lookup", () => {
    expect(getInteractiveToolPage("pressure-unit-converter")?.categoryKey).toBe("pressure");
    expect(getInteractiveToolPage("torque-converter")?.categoryKey).toBe("science");
    expect(getInteractiveToolPage("uv-index-calculator")?.categoryKey).toBe("weather");
  });

  it("registers richer text tools in the existing text category", () => {
    expect(getInteractiveToolPage("readability-checker")?.categoryKey).toBe("text");
    expect(getInteractiveToolPage("text-compare-tool")?.categoryKey).toBe("text");
  });

  it("registers the generator family through the shared interactive registry", () => {
    expect(getInteractiveToolPage("random-number-generator")?.categoryKey).toBe("generator");
    expect(getInteractiveToolPage("random-password-generator")?.categoryKey).toBe("generator");
    expect(getInteractiveToolPage("random-color-generator")?.categoryKey).toBe("generator");
    expect(getInteractiveToolPage("random-text-generator")?.categoryKey).toBe("generator");
    expect(getInteractiveToolPage("lorem-ipsum-generator")?.categoryKey).toBe("generator");
  });

  it("registers the new developer helper tools in the shared dev-data category", () => {
    expect(getInteractiveToolPage("uuid-generator")?.categoryKey).toBe("dev-data");
    expect(getInteractiveToolPage("regex-tester")?.categoryKey).toBe("dev-data");
    expect(getInteractiveToolPage("jwt-decoder")?.categoryKey).toBe("dev-data");
    expect(getInteractiveToolPage("cron-expression-generator")?.categoryKey).toBe("dev-data");
    expect(getInteractiveToolPage("hash-generator")?.categoryKey).toBe("dev-data");
  });

  it("registers the image and file utility pages through the shared interactive registry", () => {
    expect(getInteractiveToolPage("png-to-jpg")?.categoryKey).toBe("image");
    expect(getInteractiveToolPage("favicon-generator")?.categoryKey).toBe("image");
    expect(getInteractiveToolPage("pdf-to-text")?.categoryKey).toBe("file");
    expect(getInteractiveToolPage("split-pdf")?.categoryKey).toBe("file");
  });

  it("registers the new SEO, social, and micro-utility pages through the shared interactive registry", () => {
    expect(getInteractiveToolPage("meta-tag-generator")?.categoryKey).toBe("seo");
    expect(getInteractiveToolPage("utm-builder")?.categoryKey).toBe("seo");
    expect(getInteractiveToolPage("hashtag-generator")?.categoryKey).toBe("social");
    expect(getInteractiveToolPage("instagram-font-generator")?.categoryKey).toBe("social");
    expect(getInteractiveToolPage("color-contrast-checker")?.categoryKey).toBe("utility");
    expect(getInteractiveToolPage("border-radius-generator")?.categoryKey).toBe("utility");
  });
});
