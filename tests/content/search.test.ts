import { describe, expect, it } from "vitest";
import { getSearchEntries } from "../../lib/content/pages";
import { findExactSearchMatch, rankSearchEntries } from "../../lib/search";

describe("search ranking", () => {
  const searchEntries = getSearchEntries();

  it("ranks exact matches highly", () => {
    const results = rankSearchEntries(searchEntries, "kg to lbs");

    expect(results[0]?.entry.href).toBe("/kg-to-lbs");
    expect(results[0]?.entry.entryType).toBe("page");
  });

  it("finds standalone cooking and color tools", () => {
    expect(findExactSearchMatch(searchEntries, "cups to grams")?.href).toBe("/cups-to-grams");
    expect(findExactSearchMatch(searchEntries, "tbsp to grams sugar")?.href).toBe(
      "/tbsp-to-grams-sugar",
    );
    expect(findExactSearchMatch(searchEntries, "hex to rgb")?.href).toBe("/hex-to-rgb");
  });

  it("finds math-tool registry pages via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "average calculator")?.href).toBe(
      "/average-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "ratio calculator")?.href).toBe(
      "/ratio-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "loan calculator")?.href).toBe(
      "/loan-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "simple interest calculator")?.href).toBe(
      "/simple-interest-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "compound interest calculator")?.href).toBe(
      "/compound-interest-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "mortgage calculator")?.href).toBe(
      "/mortgage-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "savings calculator")?.href).toBe(
      "/savings-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "molarity calculator")?.href).toBe(
      "/molarity-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "ph calculator")?.href).toBe(
      "/ph-calculator",
    );
  });

  it("finds the new numeric expansion pages and category hubs via search intent", () => {
    expect(findExactSearchMatch(searchEntries, "mph to kmh")?.href).toBe("/mph-to-kmh");
    expect(findExactSearchMatch(searchEntries, "hpa to mmhg")?.href).toBe("/hpa-to-mmhg");
    expect(findExactSearchMatch(searchEntries, "mm to inches rain")?.href).toBe(
      "/mm-to-inches-rain",
    );
    expect(findExactSearchMatch(searchEntries, "pressure converter")?.href).toBe(
      "/pressure-converter",
    );
  });

  it("finds the expanded text tools via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "normalize unicode")?.href).toBe(
      "/normalize-unicode",
    );
    expect(findExactSearchMatch(searchEntries, "shuffle lines")?.href).toBe("/shuffle-lines");
    expect(findExactSearchMatch(searchEntries, "readability checker")?.href).toBe(
      "/readability-checker",
    );
    expect(findExactSearchMatch(searchEntries, "text diff")?.href).toBe("/text-compare-tool");
  });

  it("finds the generator family via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "random number generator")?.href).toBe(
      "/random-number-generator",
    );
    expect(findExactSearchMatch(searchEntries, "random name generator")?.href).toBe(
      "/random-name-generator",
    );
    expect(findExactSearchMatch(searchEntries, "random password generator")?.href).toBe(
      "/random-password-generator",
    );
    expect(findExactSearchMatch(searchEntries, "random color generator")?.href).toBe(
      "/random-color-generator",
    );
    expect(findExactSearchMatch(searchEntries, "random team generator")?.href).toBe(
      "/random-team-generator",
    );
    expect(findExactSearchMatch(searchEntries, "random text generator")?.href).toBe(
      "/random-text-generator",
    );
    expect(findExactSearchMatch(searchEntries, "lorem ipsum generator")?.href).toBe(
      "/lorem-ipsum-generator",
    );
    expect(findExactSearchMatch(searchEntries, "generator tools")?.href).toBe("/generator-tools");
  });

  it("finds the new developer format and helper tools via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "html encode")?.href).toBe("/html-encode");
    expect(findExactSearchMatch(searchEntries, "html decode")?.href).toBe("/html-decode");
    expect(findExactSearchMatch(searchEntries, "json to csv")?.href).toBe("/json-to-csv");
    expect(findExactSearchMatch(searchEntries, "csv to json")?.href).toBe("/csv-to-json");
    expect(findExactSearchMatch(searchEntries, "xml to json")?.href).toBe("/xml-to-json");
    expect(findExactSearchMatch(searchEntries, "json to xml")?.href).toBe("/json-to-xml");
    expect(findExactSearchMatch(searchEntries, "uuid generator")?.href).toBe("/uuid-generator");
    expect(findExactSearchMatch(searchEntries, "regex tester")?.href).toBe("/regex-tester");
    expect(findExactSearchMatch(searchEntries, "jwt decoder")?.href).toBe("/jwt-decoder");
    expect(findExactSearchMatch(searchEntries, "cron expression generator")?.href).toBe(
      "/cron-expression-generator",
    );
    expect(findExactSearchMatch(searchEntries, "hash generator")?.href).toBe("/hash-generator");
  });

  it("finds science, pressure, and weather tools via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "general pressure converter")?.href).toBe(
      "/pressure-unit-converter",
    );
    expect(findExactSearchMatch(searchEntries, "watts to amps")?.href).toBe("/watts-to-amps");
    expect(findExactSearchMatch(searchEntries, "uv index calculator")?.href).toBe(
      "/uv-index-calculator",
    );
    expect(findExactSearchMatch(searchEntries, "what uv index is dangerous")?.href).toBe(
      "/what-uv-index-is-dangerous",
    );
    expect(findExactSearchMatch(searchEntries, "science calculators")?.href).toBe(
      "/science-calculators",
    );
    expect(findExactSearchMatch(searchEntries, "weather tools")?.href).toBe("/weather-tools");
  });

  it("finds the new image and file utility tools via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "png to jpg")?.href).toBe("/png-to-jpg");
    expect(findExactSearchMatch(searchEntries, "image resizer")?.href).toBe("/image-resizer");
    expect(findExactSearchMatch(searchEntries, "favicon generator")?.href).toBe(
      "/favicon-generator",
    );
    expect(findExactSearchMatch(searchEntries, "pdf to text")?.href).toBe("/pdf-to-text");
    expect(findExactSearchMatch(searchEntries, "merge pdf")?.href).toBe("/merge-pdf");
    expect(findExactSearchMatch(searchEntries, "split pdf")?.href).toBe("/split-pdf");
    expect(findExactSearchMatch(searchEntries, "image tools")?.href).toBe("/image-tools");
    expect(findExactSearchMatch(searchEntries, "file tools")?.href).toBe("/file-tools");
  });

  it("finds the new SEO, social, and micro utility tools via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "meta tag generator")?.href).toBe(
      "/meta-tag-generator",
    );
    expect(findExactSearchMatch(searchEntries, "utm builder")?.href).toBe("/utm-builder");
    expect(findExactSearchMatch(searchEntries, "utm parser")?.href).toBe("/utm-parser");
    expect(findExactSearchMatch(searchEntries, "hashtag generator")?.href).toBe(
      "/hashtag-generator",
    );
    expect(findExactSearchMatch(searchEntries, "instagram font generator")?.href).toBe(
      "/instagram-font-generator",
    );
    expect(findExactSearchMatch(searchEntries, "color contrast checker")?.href).toBe(
      "/color-contrast-checker",
    );
    expect(findExactSearchMatch(searchEntries, "css gradient generator")?.href).toBe(
      "/css-gradient-generator",
    );
    expect(findExactSearchMatch(searchEntries, "password strength checker")?.href).toBe(
      "/password-strength-checker",
    );
    expect(findExactSearchMatch(searchEntries, "box shadow generator")?.href).toBe(
      "/box-shadow-generator",
    );
    expect(findExactSearchMatch(searchEntries, "seo marketing tools")?.href).toBe(
      "/seo-marketing-tools",
    );
    expect(findExactSearchMatch(searchEntries, "social media tools")?.href).toBe(
      "/social-media-tools",
    );
    expect(findExactSearchMatch(searchEntries, "micro utilities")?.href).toBe(
      "/micro-utilities",
    );
  });

  it("finds the math calculator hub and initial math pages", () => {
    expect(findExactSearchMatch(searchEntries, "math calculators")?.href).toBe("/math-calculators");
    expect(findExactSearchMatch(searchEntries, "percentage calculator")?.href).toBe(
      "/percentage-calculator",
    );
  });

  it("ranks partial and intent-style matches correctly", () => {
    const results = rankSearchEntries(searchEntries, "kilogram pound");

    expect(results[0]?.entry.href).toBe("/kg-to-lbs");
  });

  it("keeps page and category entries behaving as expected", () => {
    const textCategoryResults = rankSearchEntries(searchEntries, "text converter");
    const uppercaseResults = rankSearchEntries(searchEntries, "uppercase");
    const duplicateLineResults = rankSearchEntries(searchEntries, "remove duplicate lines");

    expect(textCategoryResults[0]?.entry.href).toBe("/text-converter");
    expect(textCategoryResults[0]?.entry.entryType).toBe("category");
    expect(uppercaseResults[0]?.entry.href).toBe("/uppercase-converter");
    expect(uppercaseResults[0]?.entry.entryType).toBe("page");
    expect(duplicateLineResults[0]?.entry.href).toBe("/remove-duplicate-lines");
    expect(duplicateLineResults[0]?.entry.entryType).toBe("page");
  });

  it("handles fuzzy-ish wording without regressing badly", () => {
    const results = rankSearchEntries(searchEntries, "json format");

    expect(results.some((result) => result.entry.href === "/json-formatter")).toBe(true);
    expect(findExactSearchMatch(searchEntries, "json formatter")?.href).toBe("/json-formatter");
  });
});
