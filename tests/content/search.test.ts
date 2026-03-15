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
    expect(findExactSearchMatch(searchEntries, "hex to rgb")?.href).toBe("/hex-to-rgb");
  });

  it("finds math-tool registry pages via exact search intent", () => {
    expect(findExactSearchMatch(searchEntries, "median calculator")?.href).toBe("/median-calculator");
    expect(findExactSearchMatch(searchEntries, "fraction to decimal calculator")?.href).toBe(
      "/fraction-to-decimal",
    );
  });

  it("ranks partial and intent-style matches correctly", () => {
    const results = rankSearchEntries(searchEntries, "kilogram pound");

    expect(results[0]?.entry.href).toBe("/kg-to-lbs");
  });

  it("keeps page and category entries behaving as expected", () => {
    const textCategoryResults = rankSearchEntries(searchEntries, "text converter");
    const uppercaseResults = rankSearchEntries(searchEntries, "uppercase");

    expect(textCategoryResults[0]?.entry.href).toBe("/text-converter");
    expect(textCategoryResults[0]?.entry.entryType).toBe("category");
    expect(uppercaseResults[0]?.entry.href).toBe("/uppercase-converter");
    expect(uppercaseResults[0]?.entry.entryType).toBe("page");
  });

  it("handles fuzzy-ish wording without regressing badly", () => {
    const results = rankSearchEntries(searchEntries, "json format");

    expect(results.some((result) => result.entry.href === "/json-formatter")).toBe(true);
    expect(findExactSearchMatch(searchEntries, "json formatter")?.href).toBe("/json-formatter");
  });
});
