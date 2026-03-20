import { describe, expect, it } from "vitest";
import {
  analyzeKeywordDensity,
  buildUtmUrl,
  formatUrlDetailsOutput,
  generateMetaTags,
  generateRobotsTxt,
  generateSitemapXml,
  getSeoWordStats,
  parseUtmUrl,
} from "../../lib/conversion/marketing";
import {
  buildBorderRadius,
  buildBoxShadow,
  buildCssGradient,
  checkPasswordStrength,
  getContrastRatio,
} from "../../lib/conversion/micro-utilities";
import {
  formatBioText,
  generateHashtags,
  generateInstagramFontVariants,
  generateUsernames,
  getTweetLengthStats,
} from "../../lib/conversion/social";
import { getUtilityToolDefinition, getUtilityToolDefinitions } from "../../lib/utility-tools/registry";

describe("utility tool conversion logic", () => {
  it("generates meta tags with canonical and social tags", () => {
    const result = generateMetaTags({
      canonicalUrl: "https://convertcenter.org/seo-marketing-tools",
      description: "Fast SEO utilities for browser-side workflows.",
      imageUrl: "https://convertcenter.org/og-image.png",
      robots: "index, follow",
      siteName: "ConvertCenter",
      title: "SEO Tools",
    });

    expect(result.markup).toContain('<link rel="canonical" href="https://convertcenter.org/seo-marketing-tools">');
    expect(result.markup).toContain('<meta property="og:image" content="https://convertcenter.org/og-image.png">');
    expect(result.titleLength).toBe(9);
  });

  it("builds robots and sitemap output from simple inputs", () => {
    const robots = generateRobotsTxt({
      allowPaths: ["/blog"],
      disallowPaths: ["/admin"],
      sitemapUrl: "https://convertcenter.org/sitemap.xml",
      userAgent: "*",
    });
    const sitemap = generateSitemapXml({
      includeLastModified: false,
      paths: ["/", "/seo-marketing-tools"],
      siteUrl: "https://convertcenter.org",
    });

    expect(robots).toContain("Allow: /blog");
    expect(robots).toContain("Disallow: /admin");
    expect(sitemap).toContain("<loc>https://convertcenter.org/seo-marketing-tools</loc>");
  });

  it("analyzes keyword density and SEO stats", () => {
    const density = analyzeKeywordDensity(
      "SEO tools help SEO teams review SEO copy and publish SEO landing pages quickly.",
      3,
    );
    const stats = getSeoWordStats("One short sentence.\n\nA second paragraph is here.");

    expect(density.topKeyword?.keyword).toBe("seo");
    expect(stats.paragraphs).toBe(2);
    expect(stats.sentences).toBe(2);
  });

  it("builds and parses UTM URLs", () => {
    const utmUrl = buildUtmUrl({
      baseUrl: "https://convertcenter.org/seo-marketing-tools?ref=nav",
      campaign: "spring-launch",
      content: "hero",
      medium: "email",
      source: "newsletter",
      term: "seo-tools",
    });
    const parsed = parseUtmUrl(utmUrl);

    expect(utmUrl).toContain("utm_campaign=spring-launch");
    expect(parsed.utmEntries.source).toBe("newsletter");
    expect(parsed.extraParams.ref).toBe("nav");
    expect(parsed.cleanUrl).toContain("ref=nav");
  });

  it("formats parsed URL details into JSON text", () => {
    const output = formatUrlDetailsOutput(
      "https://convertcenter.org/social-media-tools?utm_source=x#bio",
    );

    expect(output).toContain('"hostname": "convertcenter.org"');
    expect(output).toContain('"hash": "#bio"');
  });

  it("generates social helper output", () => {
    const hashtags = generateHashtags("seo tools launch", 6);
    const usernames = generateUsernames("convert center", 6, ".");
    const bioOptions = formatBioText({
      callToAction: "Explore the toolkit below",
      name: "ConvertCenter",
      proofPoint: "Browser-based workflows for launch teams",
      role: "SEO tools and content utilities",
    });

    expect(hashtags[0]).toBe("#SeoToolsLaunch");
    expect(usernames.length).toBe(6);
    expect(bioOptions).toHaveLength(3);
  });

  it("creates readable social variants and tweet stats", () => {
    const fontVariants = generateInstagramFontVariants("Launch 2026");
    const tweetStats = getTweetLengthStats(
      "Launching today https://convertcenter.org/social-media-tools with new creator utilities.",
    );

    expect(fontVariants).toHaveLength(5);
    expect(fontVariants.some((variant) => variant.value !== "Launch 2026")).toBe(true);
    expect(tweetStats.weightedLength).toBeLessThan(tweetStats.rawLength);
    expect(tweetStats.remaining).toBeGreaterThan(0);
  });

  it("checks password strength and design utility formulas", () => {
    const password = checkPasswordStrength("ConvertCenter!2026");
    const contrast = getContrastRatio("#111827", "#F9FAFB");
    const gradient = buildCssGradient({
      angle: 135,
      endColor: "#14B8A6",
      startColor: "#1D4ED8",
    });
    const shadow = buildBoxShadow({
      blur: 24,
      color: "#0F172A",
      inset: false,
      offsetX: 0,
      offsetY: 18,
      opacity: 0.22,
      spread: -12,
    });
    const radius = buildBorderRadius({
      bottomLeft: 24,
      bottomRight: 24,
      topLeft: 24,
      topRight: 64,
    });

    expect(password.score).toBeGreaterThanOrEqual(80);
    expect(contrast.ratio).toBeGreaterThan(10);
    expect(gradient.css).toContain("linear-gradient(135deg");
    expect(shadow.css).toContain("box-shadow:");
    expect(radius.css).toBe("border-radius: 24px 64px 24px 24px;");
  });

  it("registers all utility tools in the shared registry", () => {
    const utilityToolIds = new Set(getUtilityToolDefinitions().map((tool) => tool.id));

    expect(utilityToolIds.has("meta-tag-generator")).toBe(true);
    expect(utilityToolIds.has("utm-builder")).toBe(true);
    expect(utilityToolIds.has("instagram-font-generator")).toBe(true);
    expect(utilityToolIds.has("color-contrast-checker")).toBe(true);
    expect(getUtilityToolDefinition("password-strength-checker")?.kind).toBe("form");
    expect(getUtilityToolDefinition("css-gradient-generator")?.kind).toBe("style");
  });
});
