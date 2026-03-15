import { describe, expect, it } from "vitest";
import { launchToolRegistry } from "../../lib/config/conversion-registry";
import { mathToolPages } from "../../lib/content/math-tools";
import { getLaunchPageCount, launchPages } from "../../lib/content/pages";
import { standaloneToolPages } from "../../lib/content/standalone-pages";

describe("launch page registry", () => {
  it("counts unique live tool pages across registry and standalone tools", () => {
    const uniqueSlugs = new Set([
      ...launchPages.map((page) => page.slug),
      ...mathToolPages.map((page) => page.slug),
      ...standaloneToolPages.map((page) => page.slug),
    ]);
    console.log(`ConvertCenter live tool page total: ${uniqueSlugs.size}`);

    expect(getLaunchPageCount()).toBe(uniqueSlugs.size);
    expect(getLaunchPageCount()).toBe(
      launchToolRegistry.length + mathToolPages.length + standaloneToolPages.length,
    );
  });
});
