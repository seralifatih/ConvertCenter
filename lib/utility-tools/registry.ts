import {
  analyzeKeywordDensity,
  buildUtmUrl,
  formatKeywordDensityOutput,
  formatSeoStatsOutput,
  formatUrlDetailsOutput,
  generateMetaTags,
  generateRobotsTxt,
  generateSitemapXml,
  getSeoWordStats,
  parseUtmUrl,
} from "@/lib/conversion/marketing";
import {
  checkPasswordStrength,
} from "@/lib/conversion/micro-utilities";
import {
  formatBioText,
  generateHashtags,
  generateInstagramFontVariants,
  generateUsernames,
  getTweetLengthStats,
} from "@/lib/conversion/social";
import type {
  UtilityFormToolDefinition,
  UtilityResult,
  UtilityToolDefinition,
  UtilityToolField,
  UtilityToolId,
} from "@/lib/utility-tools/types";

function getString(values: Record<string, boolean | string>, id: string, fallback = "") {
  const value = values[id];
  return typeof value === "string" ? value : fallback;
}

function getBoolean(values: Record<string, boolean | string>, id: string, fallback = false) {
  const value = values[id];
  return typeof value === "boolean" ? value : fallback;
}

function getNumber(
  values: Record<string, boolean | string>,
  id: string,
  options?: { max?: number; min?: number },
) {
  const rawValue = getString(values, id).trim();
  const parsed = Number(rawValue);

  if (!rawValue || !Number.isFinite(parsed)) {
    throw new Error(`Enter a valid number for ${id}.`);
  }

  if (options?.min !== undefined && parsed < options.min) {
    throw new Error(`${id} must be at least ${options.min}.`);
  }

  if (options?.max !== undefined && parsed > options.max) {
    throw new Error(`${id} must be ${options.max} or less.`);
  }

  return parsed;
}

function createField(field: UtilityToolField) {
  return field;
}

function createOutputs(...outputs: NonNullable<UtilityResult["outputs"]>) {
  return outputs;
}

const formTools: readonly UtilityFormToolDefinition[] = [
  {
    actionLabel: "generate tags",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue: "ConvertCenter - Fast browser-based tool hub",
        id: "title",
        label: "page title",
        max: 70,
        placeholder: "ConvertCenter - Fast browser-based tool hub",
        type: "text",
      }),
      createField({
        defaultValue:
          "Free browser-based calculators, converters, and utilities for text, data, files, color, SEO, and quick developer workflows.",
        id: "description",
        label: "meta description",
        placeholder: "Write a clear summary for search results...",
        rows: 4,
        type: "textarea",
      }),
      createField({
        defaultValue: "https://convertcenter.org/seo-tools",
        id: "canonicalUrl",
        label: "canonical URL",
        placeholder: "https://example.com/page",
        type: "text",
      }),
      createField({
        defaultValue: "ConvertCenter",
        id: "siteName",
        label: "site name",
        placeholder: "ConvertCenter",
        type: "text",
      }),
      createField({
        defaultValue: "https://convertcenter.org/og-image.png",
        id: "imageUrl",
        label: "Open Graph image URL",
        placeholder: "https://example.com/social-preview.png",
        type: "text",
      }),
      createField({
        defaultValue: "index, follow",
        id: "robots",
        label: "robots directive",
        options: [
          { label: "index, follow", value: "index, follow" },
          { label: "noindex, follow", value: "noindex, follow" },
          { label: "noindex, nofollow", value: "noindex, nofollow" },
        ],
        type: "select",
      }),
    ],
    hint: "Generate a copy-ready set of core SEO, Open Graph, and Twitter meta tags from a few page fields.",
    id: "meta-tag-generator",
    kind: "form",
    run({ values }) {
      const result = generateMetaTags({
        canonicalUrl: getString(values, "canonicalUrl"),
        description: getString(values, "description"),
        imageUrl: getString(values, "imageUrl"),
        robots: getString(values, "robots"),
        siteName: getString(values, "siteName"),
        title: getString(values, "title"),
      });

      return {
        metrics: [
          { label: "title length", value: `${result.titleLength} characters` },
          { label: "description length", value: `${result.descriptionLength} characters` },
        ],
        outputs: createOutputs({
          label: "meta tag markup",
          value: result.markup,
        }),
        status:
          result.titleLength <= 60 && result.descriptionLength <= 160
            ? "Lengths look search-friendly."
            : "Review the title or description length before publishing.",
        summary: "Generated a share-ready head snippet for your page.",
      };
    },
    title: "Meta Tag Generator",
  },
  {
    actionLabel: "generate robots.txt",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue: "*",
        id: "userAgent",
        label: "user agent",
        placeholder: "*",
        type: "text",
      }),
      createField({
        defaultValue: "/\n/search\n/admin",
        id: "disallowPaths",
        label: "disallow paths",
        placeholder: "/private\n/search",
        rows: 5,
        type: "textarea",
      }),
      createField({
        defaultValue: "/assets\n/help",
        id: "allowPaths",
        label: "allow paths",
        placeholder: "/blog\n/docs",
        rows: 5,
        type: "textarea",
      }),
      createField({
        defaultValue: "https://convertcenter.org/sitemap.xml",
        id: "sitemapUrl",
        label: "sitemap URL",
        placeholder: "https://example.com/sitemap.xml",
        type: "text",
      }),
    ],
    hint: "Create a simple robots.txt file with allow, disallow, and sitemap lines for a site launch or audit.",
    id: "robots-txt-generator",
    kind: "form",
    run({ values }) {
      const allowPaths = getString(values, "allowPaths")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
      const disallowPaths = getString(values, "disallowPaths")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
      const robotsTxt = generateRobotsTxt({
        allowPaths,
        disallowPaths,
        sitemapUrl: getString(values, "sitemapUrl"),
        userAgent: getString(values, "userAgent"),
      });

      return {
        metrics: [
          { label: "allow rules", value: `${allowPaths.length}` },
          { label: "disallow rules", value: `${disallowPaths.length}` },
        ],
        outputs: createOutputs({
          label: "robots.txt",
          value: robotsTxt,
        }),
        summary: "Generated a robots.txt file you can paste into the site root.",
      };
    },
    title: "Robots.txt Generator",
  },
  {
    actionLabel: "generate sitemap",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue: "https://convertcenter.org",
        id: "siteUrl",
        label: "site URL",
        placeholder: "https://example.com",
        type: "text",
      }),
      createField({
        defaultValue: "/\n/seo-marketing-tools\n/social-media-tools\n/micro-utilities",
        id: "paths",
        label: "paths or full URLs",
        placeholder: "/\n/blog\n/pricing",
        rows: 6,
        type: "textarea",
      }),
      createField({
        defaultValue: true,
        id: "includeLastModified",
        label: "include lastmod timestamps",
        type: "checkbox",
      }),
    ],
    hint: "Build a lightweight XML sitemap from a base URL and a list of important routes.",
    id: "sitemap-generator",
    kind: "form",
    run({ values }) {
      const paths = getString(values, "paths")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
      const xml = generateSitemapXml({
        includeLastModified: getBoolean(values, "includeLastModified"),
        paths,
        siteUrl: getString(values, "siteUrl"),
      });

      return {
        metrics: [{ label: "URL entries", value: `${paths.length}` }],
        outputs: createOutputs({
          label: "sitemap.xml",
          value: xml,
        }),
        summary: "Generated an XML sitemap from the paths you supplied.",
      };
    },
    title: "Sitemap Generator",
  },
  {
    actionLabel: "analyze density",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue:
          "ConvertCenter helps teams clean text, convert units, analyze SEO copy, and publish browser-based tools without extra setup. The SEO tools are especially useful for quick audits and campaign preparation.",
        id: "text",
        label: "page or article text",
        placeholder: "Paste page copy, article copy, or draft content here...",
        rows: 12,
        type: "textarea",
      }),
      createField({
        defaultValue: "8",
        id: "maxResults",
        label: "max keywords",
        max: 20,
        min: 3,
        type: "number",
      }),
    ],
    hint: "Check the most repeated non-trivial terms in a draft to spot keyword clustering or missed focus.",
    id: "keyword-density-checker",
    kind: "form",
    run({ values }) {
      const density = analyzeKeywordDensity(
        getString(values, "text"),
        getNumber(values, "maxResults", { max: 20, min: 3 }),
      );

      return {
        metrics: [
          { label: "total words", value: `${density.totalWords}` },
          { label: "unique keywords", value: `${density.uniqueKeywordCount}` },
          {
            label: "top keyword",
            value: density.topKeyword
              ? `${density.topKeyword.keyword} (${density.topKeyword.count})`
              : "none yet",
          },
        ],
        outputs: createOutputs({
          label: "top keyword matches",
          value: formatKeywordDensityOutput(density.keywords),
        }),
        summary: "Calculated keyword density from the current draft.",
      };
    },
    title: "Keyword Density Checker",
  },
  {
    actionLabel: "count SEO stats",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue:
          "ConvertCenter keeps calculator, SEO, social, and design helpers in one fast browser workflow so teams can publish, audit, and share content more easily.",
        id: "text",
        label: "SEO copy or draft text",
        placeholder: "Paste article copy, landing page text, or a campaign draft...",
        rows: 10,
        type: "textarea",
      }),
    ],
    hint: "Measure the basic length signals marketers and editors check before publishing a page or campaign draft.",
    id: "seo-word-counter",
    kind: "form",
    run({ values }) {
      const text = getString(values, "text");
      const stats = getSeoWordStats(text);

      return {
        metrics: [
          { label: "words", value: `${stats.words}` },
          { label: "characters", value: `${stats.characters}` },
          { label: "sentences", value: `${stats.sentences}` },
          { label: "paragraphs", value: `${stats.paragraphs}` },
        ],
        outputs: createOutputs({
          label: "full SEO count breakdown",
          value: formatSeoStatsOutput(text),
        }),
        summary: "Counted the main SEO-friendly length metrics for this draft.",
      };
    },
    title: "SEO Word Counter",
  },
  {
    actionLabel: "parse URL",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue:
          "https://convertcenter.org/seo-marketing-tools?utm_source=newsletter&utm_medium=email#examples",
        id: "url",
        label: "URL to parse",
        placeholder: "https://example.com/path?utm_source=newsletter",
        type: "text",
      }),
    ],
    hint: "Break a URL into origin, path, query parameters, segments, and hash without leaving the browser.",
    id: "url-parser",
    kind: "form",
    run({ values }) {
      const parsedOutput = formatUrlDetailsOutput(getString(values, "url"));

      return {
        outputs: createOutputs({
          label: "parsed URL details",
          value: parsedOutput,
        }),
        summary: "Parsed the URL into path, query, and origin details.",
      };
    },
    title: "URL Parser",
  },
  {
    actionLabel: "build UTM URL",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue: "https://convertcenter.org/seo-marketing-tools",
        id: "baseUrl",
        label: "base URL",
        placeholder: "https://example.com/landing-page",
        type: "text",
      }),
      createField({
        defaultValue: "newsletter",
        id: "source",
        label: "utm_source",
        placeholder: "newsletter",
        type: "text",
      }),
      createField({
        defaultValue: "email",
        id: "medium",
        label: "utm_medium",
        placeholder: "email",
        type: "text",
      }),
      createField({
        defaultValue: "spring-launch",
        id: "campaign",
        label: "utm_campaign",
        placeholder: "spring-launch",
        type: "text",
      }),
      createField({
        defaultValue: "seo-tools",
        id: "term",
        label: "utm_term",
        placeholder: "optional",
        type: "text",
      }),
      createField({
        defaultValue: "hero-button",
        id: "content",
        label: "utm_content",
        placeholder: "optional",
        type: "text",
      }),
    ],
    hint: "Build campaign-tagged URLs for email, social, paid, or internal marketing links.",
    id: "utm-builder",
    kind: "form",
    run({ values }) {
      const url = buildUtmUrl({
        baseUrl: getString(values, "baseUrl"),
        campaign: getString(values, "campaign"),
        content: getString(values, "content"),
        medium: getString(values, "medium"),
        source: getString(values, "source"),
        term: getString(values, "term"),
      });

      return {
        outputs: createOutputs({
          label: "campaign URL",
          value: url,
        }),
        summary: "Built a UTM-tagged campaign URL.",
      };
    },
    title: "UTM Builder",
  },
  {
    actionLabel: "parse UTM tags",
    categoryKey: "seo",
    fields: [
      createField({
        defaultValue:
          "https://convertcenter.org/seo-marketing-tools?utm_source=linkedin&utm_medium=social&utm_campaign=q2-growth&utm_content=carousel",
        id: "url",
        label: "UTM URL",
        placeholder: "https://example.com/?utm_source=...",
        type: "text",
      }),
    ],
    hint: "Read UTM parameters back out of a campaign link and separate them from the base URL.",
    id: "utm-parser",
    kind: "form",
    run({ values }) {
      const parsed = parseUtmUrl(getString(values, "url"));

      return {
        outputs: createOutputs(
          {
            label: "UTM values",
            value: JSON.stringify(parsed.utmEntries, null, 2),
          },
          {
            label: "clean URL",
            value: parsed.cleanUrl,
          },
          {
            label: "extra non-UTM params",
            value: JSON.stringify(parsed.extraParams, null, 2),
          },
        ),
        summary: "Parsed the UTM tags out of the current campaign URL.",
      };
    },
    title: "UTM Parser",
  },
  {
    actionLabel: "generate hashtags",
    categoryKey: "social",
    fields: [
      createField({
        defaultValue: "seo tools launch",
        id: "topic",
        label: "topic or phrase",
        placeholder: "summer sale campaign",
        type: "text",
      }),
      createField({
        defaultValue: "8",
        id: "count",
        label: "number of hashtags",
        max: 20,
        min: 3,
        type: "number",
      }),
    ],
    hint: "Generate a tight list of reusable hashtags from a topic, product, or campaign phrase.",
    id: "hashtag-generator",
    kind: "form",
    run({ values }) {
      const hashtags = generateHashtags(
        getString(values, "topic"),
        getNumber(values, "count", { max: 20, min: 3 }),
      );

      return {
        metrics: [{ label: "hashtags", value: `${hashtags.length}` }],
        outputs: createOutputs({
          label: "hashtag list",
          value: hashtags.join(" "),
        }),
        summary: "Generated a fresh hashtag list for your topic.",
      };
    },
    title: "Hashtag Generator",
  },
  {
    actionLabel: "generate usernames",
    categoryKey: "social",
    fields: [
      createField({
        defaultValue: "convert center",
        id: "seed",
        label: "name or keyword",
        placeholder: "creator studio",
        type: "text",
      }),
      createField({
        defaultValue: "10",
        id: "count",
        label: "number of ideas",
        max: 24,
        min: 4,
        type: "number",
      }),
      createField({
        defaultValue: ".",
        id: "separator",
        label: "separator",
        options: [
          { label: "dot", value: "." },
          { label: "underscore", value: "_" },
          { label: "none", value: "" },
        ],
        type: "select",
      }),
    ],
    hint: "Create username ideas from a brand, creator name, or topic with small style variations.",
    id: "username-generator",
    kind: "form",
    run({ values }) {
      const usernames = generateUsernames(
        getString(values, "seed"),
        getNumber(values, "count", { max: 24, min: 4 }),
        getString(values, "separator"),
      );

      return {
        metrics: [{ label: "username ideas", value: `${usernames.length}` }],
        outputs: createOutputs({
          label: "username suggestions",
          value: usernames.join("\n"),
        }),
        summary: "Generated username ideas for the current seed phrase.",
      };
    },
    title: "Username Generator",
  },
  {
    actionLabel: "generate fonts",
    categoryKey: "social",
    fields: [
      createField({
        defaultValue: "ConvertCenter creator tools",
        id: "text",
        label: "text to stylize",
        placeholder: "social launch today",
        rows: 4,
        type: "textarea",
      }),
    ],
    hint: "Create multiple copy-ready Unicode text styles for Instagram bios, captions, and profile labels.",
    id: "instagram-font-generator",
    kind: "form",
    run({ values }) {
      const variants = generateInstagramFontVariants(getString(values, "text"));

      return {
        metrics: [{ label: "font variants", value: `${variants.length}` }],
        outputs: variants.map((variant) => ({
          label: variant.label,
          value: variant.value,
        })),
        summary: "Generated several Instagram-friendly Unicode text styles.",
      };
    },
    title: "Instagram Font Generator",
  },
  {
    actionLabel: "format bio",
    categoryKey: "social",
    fields: [
      createField({
        defaultValue: "ConvertCenter",
        id: "name",
        label: "name or brand",
        type: "text",
      }),
      createField({
        defaultValue: "SEO tools and fast browser utilities",
        id: "role",
        label: "role or value line",
        type: "text",
      }),
      createField({
        defaultValue: "Helping teams publish faster with practical toolkits",
        id: "proofPoint",
        label: "proof point",
        type: "text",
      }),
      createField({
        defaultValue: "Explore the full tool hub below",
        id: "callToAction",
        label: "call to action",
        type: "text",
      }),
    ],
    hint: "Turn a few profile ingredients into ready-to-paste social bio variations with clean line breaks.",
    id: "bio-text-formatter",
    kind: "form",
    run({ values }) {
      const bios = formatBioText({
        callToAction: getString(values, "callToAction"),
        name: getString(values, "name"),
        proofPoint: getString(values, "proofPoint"),
        role: getString(values, "role"),
      });

      return {
        outputs: bios.map((bio) => ({
          label: bio.label,
          value: bio.value,
        })),
        summary: "Formatted your profile ingredients into social-ready bio options.",
      };
    },
    title: "Bio Text Formatter",
  },
  {
    actionLabel: "count tweet length",
    categoryKey: "social",
    fields: [
      createField({
        defaultValue:
          "Launching new SEO, social, and micro utility tools on ConvertCenter today. Fast browser-based workflows, no signup, and plenty more coming soon.",
        id: "text",
        label: "tweet draft",
        placeholder: "Write or paste the post you want to check...",
        rows: 6,
        type: "textarea",
      }),
    ],
    hint: "Count tweet length with a URL-aware estimate so you can trim a post before publishing.",
    id: "tweet-length-counter",
    kind: "form",
    run({ values }) {
      const stats = getTweetLengthStats(getString(values, "text"));

      return {
        metrics: [
          { label: "weighted length", value: `${stats.weightedLength} / 280` },
          { label: "raw characters", value: `${stats.rawLength}` },
          { label: "remaining", value: `${stats.remaining}` },
        ],
        status: stats.statusLabel,
        summary: "Checked how close this post is to the current tweet limit.",
      };
    },
    title: "Tweet Length Counter",
  },
  {
    actionLabel: "check password",
    categoryKey: "utility",
    fields: [
      createField({
        defaultValue: "ConvertCenter!2026",
        id: "password",
        label: "password",
        placeholder: "Enter a password to score",
        type: "password",
      }),
    ],
    hint: "Get a quick strength score, label, and improvement suggestions for a password draft.",
    id: "password-strength-checker",
    kind: "form",
    run({ values }) {
      const password = getString(values, "password");

      if (!password) {
        throw new Error("Enter a password to evaluate.");
      }

      const strength = checkPasswordStrength(password);

      return {
        metrics: [{ label: "strength score", value: `${strength.score} / 100` }],
        notes: strength.suggestions,
        status: strength.label,
        summary: "Checked the current password against common strength signals.",
      };
    },
    title: "Password Strength Checker",
  },
];

const styleTools: readonly UtilityToolDefinition[] = [
  {
    categoryKey: "utility",
    hint: "Check WCAG contrast ratio and pass or fail levels between two colors with a live sample preview.",
    id: "color-contrast-checker",
    kind: "style",
    mode: "contrast",
    title: "Color Contrast Checker",
  },
  {
    categoryKey: "utility",
    hint: "Build a clean linear gradient with an angle, live preview, and copy-ready CSS output.",
    id: "css-gradient-generator",
    kind: "style",
    mode: "gradient",
    title: "CSS Gradient Generator",
  },
  {
    categoryKey: "utility",
    hint: "Generate box-shadow CSS with offsets, blur, spread, color, opacity, and an inset option.",
    id: "box-shadow-generator",
    kind: "style",
    mode: "boxShadow",
    title: "Box Shadow Generator",
  },
  {
    categoryKey: "utility",
    hint: "Tune each corner radius with a live preview and copy-ready CSS shorthand.",
    id: "border-radius-generator",
    kind: "style",
    mode: "borderRadius",
    title: "Border Radius Generator",
  },
];

const utilityTools: readonly UtilityToolDefinition[] = [...formTools, ...styleTools];
const toolMap = new Map(utilityTools.map((tool) => [tool.id, tool] as const));

export function getUtilityToolDefinition(toolId: UtilityToolId) {
  return toolMap.get(toolId);
}

export function getUtilityToolDefinitions() {
  return [...utilityTools];
}

export function getDefaultUtilityToolValues(tool: UtilityFormToolDefinition) {
  return Object.fromEntries(tool.fields.map((field) => [field.id, field.defaultValue])) as Record<
    string,
    boolean | string
  >;
}
