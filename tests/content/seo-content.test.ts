import { describe, expect, it } from "vitest";
import { buildNumericPairLongDescription } from "../../lib/config/registry/registry-helpers";
import {
  getTextPage,
  getTextPageFaqs,
  getUnitPage,
  getUnitPageFaqs,
} from "../../lib/content/pages";
import { makeFaqSchemaIfPresent } from "../../lib/seo";

describe("long-form SEO content", () => {
  it("builds generated fallback content for long-tail numeric pages", () => {
    const page = getUnitPage("grams-to-ounces");

    expect(page?.longDescription).toBeDefined();
    expect(page?.longDescription?.title).toBe("About converting grams to ounces");
    expect(page?.longDescription?.sections.length).toBeGreaterThanOrEqual(3);
    expect(page?.longDescription?.sections[0]?.heading).toBe("Conversion formula");
  });

  it("uses custom long descriptions instead of the generated fallback when provided", () => {
    const page = getUnitPage("kg-to-lbs");
    const generatedFallback = buildNumericPairLongDescription("weight", "kg", "lb");

    expect(page?.longDescription).toBeDefined();
    expect(page?.longDescription?.title).toBe("About converting kilograms to pounds");
    expect(page?.longDescription?.sections[0]?.heading).toBe("Why this conversion comes up so often");
    expect(page?.longDescription).not.toEqual(generatedFallback);
  });
});

describe("FAQ schema helpers", () => {
  it("returns no FAQ schema when a page does not define FAQs", () => {
    const page = getTextPage("lowercase-converter");
    const faqs = page ? getTextPageFaqs(page) : [];

    expect(faqs).toHaveLength(0);
    expect(makeFaqSchemaIfPresent(faqs)).toBeNull();
  });

  it("includes custom FAQ entries when they exist", () => {
    const page = getUnitPage("kg-to-lbs");
    const faqs = page ? getUnitPageFaqs(page) : [];
    const schema = makeFaqSchemaIfPresent(faqs);

    expect(faqs).toHaveLength(3);
    expect(schema).not.toBeNull();
    expect(schema?.["@type"]).toBe("FAQPage");
    expect(schema?.mainEntity).toHaveLength(3);
    expect(schema?.mainEntity[0]?.name).toBe("How many pounds are in 1 kilogram?");
    expect(schema?.mainEntity[1]?.acceptedAnswer.text).toContain("2.20462");
  });
});
