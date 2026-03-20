import { describe, expect, it } from "vitest";
import { generateStaticParams } from "../../app/[category]/page";
import { interactiveToolPages } from "../../lib/content/interactive-tools";
import { launchPages } from "../../lib/content/pages";
import { mathToolPages } from "../../lib/content/math-tools";

describe("dynamic route generation", () => {
  it("includes every math tool slug in static params", () => {
    const params = generateStaticParams();
    const generatedSlugs = new Set(params.map((entry) => entry.category));

    for (const page of mathToolPages) {
      expect(generatedSlugs.has(page.slug), `Expected static param for ${page.slug}`).toBe(true);
    }
  });

  it("includes every interactive tool and new interactive hub route in static params", () => {
    const params = generateStaticParams();
    const generatedSlugs = new Set(params.map((entry) => entry.category));

    expect(generatedSlugs.has("generator-tools")).toBe(true);
    expect(generatedSlugs.has("seo-marketing-tools")).toBe(true);
    expect(generatedSlugs.has("social-media-tools")).toBe(true);
    expect(generatedSlugs.has("micro-utilities")).toBe(true);
    expect(generatedSlugs.has("science-calculators")).toBe(true);
    expect(generatedSlugs.has("weather-tools")).toBe(true);
    expect(generatedSlugs.has("image-tools")).toBe(true);
    expect(generatedSlugs.has("file-tools")).toBe(true);

    for (const page of interactiveToolPages) {
      expect(generatedSlugs.has(page.slug), `Expected static param for ${page.slug}`).toBe(true);
    }
  });

  it("includes new launch-page slugs in static params", () => {
    const params = generateStaticParams();
    const generatedSlugs = new Set(params.map((entry) => entry.category));
    const expectedLaunchSlugs = [
      "mph-to-kmh",
      "html-encode",
      "json-to-csv",
      "remove-duplicate-lines",
      "normalize-unicode",
      "shuffle-lines",
      "sentence-counter",
      "readability-checker",
      "random-number-generator",
      "random-password-generator",
      "random-color-generator",
      "random-team-generator",
      "random-text-generator",
      "lorem-ipsum-generator",
      "text-compare-tool",
      "regex-tester",
      "jwt-decoder",
      "uuid-generator",
      "hash-generator",
      "cron-expression-generator",
      "meta-tag-generator",
      "utm-builder",
      "hashtag-generator",
      "instagram-font-generator",
      "color-contrast-checker",
      "css-gradient-generator",
      "password-strength-checker",
      "box-shadow-generator",
      "pressure-unit-converter",
      "uv-index-calculator",
      "png-to-jpg",
      "image-resizer",
      "favicon-generator",
      "pdf-to-text",
      "merge-pdf",
    ];

    for (const slug of expectedLaunchSlugs) {
      expect(generatedSlugs.has(slug), `Expected static param for ${slug}`).toBe(true);
    }

    for (const page of launchPages) {
      expect(generatedSlugs.has(page.slug), `Expected static param for ${page.slug}`).toBe(true);
    }
  });
});
