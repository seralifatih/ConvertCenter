import { describe, expect, it } from "vitest";
import {
  getCrossLinkEntries,
  getTextPage,
  getUnitPage,
} from "../../lib/content/pages";

describe("cross-category internal links", () => {
  it("resolves numeric-page crossLinks to standalone cooking pages", () => {
    const page = getUnitPage("cups-to-ml");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/cooking-converter", label: "Cooking Converter" },
        { href: "/cups-to-grams-flour", label: "Cups to Grams Flour Converter" },
        { href: "/cups-to-grams-sugar", label: "Cups to Grams Sugar Converter" },
      ]),
    );
  });

  it("resolves additional cooking crossLinks for tablespoon-focused pages", () => {
    const page = getUnitPage("tbsp-to-ml");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/cooking-converter", label: "Cooking Converter" },
        { href: "/tbsp-to-grams-sugar", label: "Tablespoons to Grams Sugar Converter" },
      ]),
    );
  });

  it("resolves text-page crossLinks across launch categories", () => {
    const page = getTextPage("slug-generator");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/url-encode", label: "URL Encoder – Encode URLs and query parameters" },
        { href: "/markdown-to-html", label: "Markdown to HTML Converter" },
      ]),
    );
  });

  it("resolves text cleanup crossLinks across related text tools", () => {
    const page = getTextPage("remove-duplicate-lines");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/remove-empty-lines", label: "Remove Empty Lines Tool" },
        { href: "/sort-lines", label: "Sort Lines Alphabetically Tool" },
      ]),
    );
  });

  it("resolves text crossLinks from transform pages to richer interactive text tools", () => {
    const page = getTextPage("shuffle-lines");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/sort-lines", label: "Sort Lines Alphabetically Tool" },
        { href: "/text-compare-tool", label: "Text Compare Tool" },
      ]),
    );
  });

  it("deduplicates crossLinks by href when the same target appears more than once", () => {
    const page = getTextPage("json-to-yaml");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    const links = getCrossLinkEntries(page);
    const uniqueHrefs = new Set(links.map((entry) => entry.href));

    expect(uniqueHrefs.size).toBe(links.length);
  });

  it("resolves dev-data format crossLinks across the shared data-tool set", () => {
    const page = getTextPage("json-to-csv");

    expect(page).toBeDefined();

    if (!page) {
      return;
    }

    expect(getCrossLinkEntries(page)).toEqual(
      expect.arrayContaining([
        { href: "/csv-to-json", label: "CSV to JSON Converter" },
        { href: "/json-formatter", label: "JSON Formatter \u2013 Format and validate JSON" },
      ]),
    );
  });
});
