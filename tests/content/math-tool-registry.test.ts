import { describe, expect, it } from "vitest";
import {
  getMathToolPage,
  getMathToolRelatedPages,
  mathToolPages,
} from "../../lib/content/math-tools";

describe("math tool registry", () => {
  it("keeps the initial rollout limited to the four requested calculators", () => {
    expect(mathToolPages.map((page) => page.slug)).toEqual([
      "percentage-calculator",
      "percentage-change",
      "average-calculator",
      "ratio-calculator",
    ]);
  });

  it("keeps slugs and routes unique", () => {
    const slugs = new Set(mathToolPages.map((page) => page.slug));
    const routes = new Set(mathToolPages.map((page) => page.route));

    expect(slugs.size).toBe(mathToolPages.length);
    expect(routes.size).toBe(mathToolPages.length);
  });

  it("provides examples, FAQs, and keywords for every math tool page", () => {
    for (const page of mathToolPages) {
      expect(page.examples.length, `Expected examples for ${page.slug}`).toBeGreaterThanOrEqual(3);
      expect(page.faq.length, `Expected FAQs for ${page.slug}`).toBeGreaterThanOrEqual(3);
      expect(page.keywords.length, `Expected keywords for ${page.slug}`).toBeGreaterThan(0);
      expect(page.longDescription.sections.length, `Expected longDescription for ${page.slug}`).toBe(2);
    }
  });

  it("resolves related math pages from config", () => {
    const page = getMathToolPage("average-calculator");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getMathToolRelatedPages(page).map((entry) => entry.slug)).toEqual(
      expect.arrayContaining(["percentage-calculator", "percentage-change", "ratio-calculator"]),
    );
  });
});
