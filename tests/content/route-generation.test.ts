import { describe, expect, it } from "vitest";
import { generateStaticParams } from "../../app/[category]/page";
import { mathToolPages } from "../../lib/content/math-tools";

describe("dynamic route generation", () => {
  it("includes every math tool slug in static params", () => {
    const params = generateStaticParams();
    const generatedSlugs = new Set(params.map((entry) => entry.category));

    for (const page of mathToolPages) {
      expect(generatedSlugs.has(page.slug), `Expected static param for ${page.slug}`).toBe(true);
    }
  });
});
