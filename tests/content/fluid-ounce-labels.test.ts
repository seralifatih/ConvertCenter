import { describe, expect, it } from "vitest";
import nextConfig from "../../next.config";
import { getLaunchToolConfig } from "../../lib/config/conversion-registry";
import {
  getLaunchPage,
  getUnitPageMetaTitle,
  getUnitPageRelatedLabel,
  getUnitPageTitle,
} from "../../lib/content/pages";

describe("fluid ounce routing and labels", () => {
  it("builds floz-based slugs for fluid ounce volume pages", () => {
    const tool = getLaunchToolConfig("floz-to-ml");

    expect(tool?.slug).toBe("floz-to-ml");
    expect(tool?.kind).toBe("numeric-pair");
  });

  it("keeps legacy ambiguous ounce routes as permanent redirects", async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          source: "/oz-to-ml",
          destination: "/floz-to-ml",
          permanent: true,
        }),
        expect.objectContaining({
          source: "/ml-to-oz",
          destination: "/ml-to-floz",
          permanent: true,
        }),
        expect.objectContaining({
          source: "/cups-to-oz",
          destination: "/cups-to-floz",
          permanent: true,
        }),
        expect.objectContaining({
          source: "/oz-to-cups",
          destination: "/floz-to-cups",
          permanent: true,
        }),
      ]),
    );
  });

  it("uses unambiguous fluid ounce wording in page titles and related labels", () => {
    const fluidOuncePage = getLaunchPage("floz-to-ml");
    const reversePage = getLaunchPage("ml-to-floz");

    expect(fluidOuncePage && fluidOuncePage.kind === "unit").toBe(true);
    expect(reversePage && reversePage.kind === "unit").toBe(true);

    if (!fluidOuncePage || fluidOuncePage.kind !== "unit" || !reversePage || reversePage.kind !== "unit") {
      throw new Error("Expected fluid ounce pages to exist");
    }

    expect(getUnitPageTitle(fluidOuncePage)).toBe("Fluid Ounces to milliliters converter");
    expect(getUnitPageMetaTitle(fluidOuncePage)).toBe("fluid ounces to milliliters converter");
    expect(getUnitPageRelatedLabel(reversePage)).toBe("milliliters to fluid ounces");
  });
});
