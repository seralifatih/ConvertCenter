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
});
