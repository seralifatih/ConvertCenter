const STOP_WORDS = new Set([
  "a",
  "about",
  "after",
  "all",
  "also",
  "an",
  "and",
  "any",
  "are",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "between",
  "both",
  "but",
  "by",
  "can",
  "did",
  "do",
  "does",
  "for",
  "from",
  "had",
  "has",
  "have",
  "how",
  "if",
  "in",
  "into",
  "is",
  "it",
  "its",
  "just",
  "more",
  "most",
  "not",
  "of",
  "on",
  "or",
  "our",
  "out",
  "over",
  "so",
  "than",
  "that",
  "the",
  "their",
  "them",
  "then",
  "there",
  "these",
  "they",
  "this",
  "to",
  "too",
  "up",
  "use",
  "was",
  "we",
  "were",
  "what",
  "when",
  "which",
  "who",
  "with",
  "you",
  "your",
]);

type KeywordEntry = {
  count: number;
  density: number;
  keyword: string;
};

type MetaTagConfig = {
  canonicalUrl: string;
  description: string;
  imageUrl?: string;
  robots: string;
  siteName?: string;
  title: string;
};

type RobotsConfig = {
  allowPaths: string[];
  disallowPaths: string[];
  sitemapUrl?: string;
  userAgent: string;
};

type SitemapConfig = {
  includeLastModified?: boolean;
  paths: string[];
  siteUrl: string;
};

type UtmConfig = {
  baseUrl: string;
  campaign: string;
  content?: string;
  medium: string;
  source: string;
  term?: string;
};

function trimLine(input: string) {
  return input.trim();
}

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeBaseUrl(input: string) {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Enter a valid URL.");
  }

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  return new URL(candidate);
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function cleanPath(path: string) {
  const trimmed = path.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return new URL(trimmed).pathname;
  }

  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function splitInputList(input: string) {
  return uniqueStrings(
    input
      .split(/\r?\n|,/)
      .map(trimLine)
      .filter(Boolean),
  );
}

function formatPct(value: number) {
  return `${value.toFixed(value >= 10 ? 1 : 2)}%`;
}

function stringifyObject(value: unknown) {
  return JSON.stringify(value, null, 2);
}

export function extractSeoWords(text: string) {
  return text
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9'\s-]+/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
}

export function generateMetaTags(config: MetaTagConfig) {
  const title = config.title.trim();
  const description = config.description.trim();
  const canonicalUrl = config.canonicalUrl.trim();

  if (!title || !description || !canonicalUrl) {
    throw new Error("Title, description, and canonical URL are required.");
  }

  const canonical = normalizeBaseUrl(canonicalUrl).toString();
  const siteName = config.siteName?.trim();
  const imageUrl = config.imageUrl?.trim() ? normalizeBaseUrl(config.imageUrl).toString() : "";
  const robots = config.robots.trim() || "index, follow";
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}">`,
    `<link rel="canonical" href="${escapeHtml(canonical)}">`,
    `<meta name="robots" content="${escapeHtml(robots)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:url" content="${escapeHtml(canonical)}">`,
    `<meta name="twitter:card" content="${imageUrl ? "summary_large_image" : "summary"}">`,
    `<meta name="twitter:title" content="${escapeHtml(title)}">`,
    `<meta name="twitter:description" content="${escapeHtml(description)}">`,
  ];

  if (siteName) {
    lines.push(`<meta property="og:site_name" content="${escapeHtml(siteName)}">`);
  }

  if (imageUrl) {
    lines.push(`<meta property="og:image" content="${escapeHtml(imageUrl)}">`);
    lines.push(`<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`);
  }

  return {
    descriptionLength: description.length,
    markup: lines.join("\n"),
    titleLength: title.length,
  };
}

export function generateRobotsTxt(config: RobotsConfig) {
  const userAgent = config.userAgent.trim() || "*";
  const allowPaths = splitInputList(config.allowPaths.join("\n")).map(cleanPath).filter(Boolean);
  const disallowPaths = splitInputList(config.disallowPaths.join("\n")).map(cleanPath);
  const lines = [`User-agent: ${userAgent}`];

  if (allowPaths.length) {
    allowPaths.forEach((path) => {
      lines.push(`Allow: ${path}`);
    });
  }

  if (disallowPaths.length) {
    disallowPaths.forEach((path) => {
      lines.push(`Disallow: ${path || "/"}`);
    });
  } else {
    lines.push("Disallow:");
  }

  if (config.sitemapUrl?.trim()) {
    lines.push("");
    lines.push(`Sitemap: ${normalizeBaseUrl(config.sitemapUrl).toString()}`);
  }

  return lines.join("\n");
}

export function generateSitemapXml(config: SitemapConfig) {
  const siteUrl = normalizeBaseUrl(config.siteUrl);
  const paths = splitInputList(config.paths.join("\n"));

  if (!paths.length) {
    throw new Error("Add at least one path or URL to generate a sitemap.");
  }

  const nowIso = new Date().toISOString();
  const urls = paths.map((path) => {
    const url = path.startsWith("http://") || path.startsWith("https://")
      ? new URL(path)
      : new URL(cleanPath(path), siteUrl);

    const pieces = [
      "  <url>",
      `    <loc>${escapeHtml(url.toString())}</loc>`,
    ];

    if (config.includeLastModified) {
      pieces.push(`    <lastmod>${nowIso}</lastmod>`);
    }

    pieces.push("  </url>");
    return pieces.join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    "</urlset>",
  ].join("\n");
}

export function analyzeKeywordDensity(text: string, maxResults = 10) {
  const words = extractSeoWords(text);
  const filteredWords = words.filter((word) => word.length > 2 && !STOP_WORDS.has(word));
  const counts = new Map<string, number>();

  filteredWords.forEach((word) => {
    counts.set(word, (counts.get(word) ?? 0) + 1);
  });

  const totalWords = words.length;
  const densityEntries: KeywordEntry[] = [...counts.entries()]
    .map(([keyword, count]) => ({
      count,
      density: totalWords ? (count / totalWords) * 100 : 0,
      keyword,
    }))
    .sort((left, right) => right.count - left.count || left.keyword.localeCompare(right.keyword))
    .slice(0, maxResults);

  return {
    keywords: densityEntries,
    topKeyword: densityEntries[0] ?? null,
    totalWords,
    uniqueKeywordCount: counts.size,
  };
}

export function getSeoWordStats(text: string) {
  const normalized = text.replace(/\r\n/g, "\n");
  const words = normalized.trim() ? normalized.trim().split(/\s+/).filter(Boolean) : [];
  const sentences = normalized
    .split(/[.!?]+/)
    .map((segment) => segment.trim())
    .filter(Boolean);
  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((segment) => segment.trim())
    .filter(Boolean);

  return {
    characters: normalized.length,
    charactersNoSpaces: normalized.replace(/\s+/g, "").length,
    paragraphs: paragraphs.length,
    readingMinutes: words.length / 200,
    sentences: sentences.length,
    words: words.length,
  };
}

export function parseUrlDetails(input: string) {
  const url = normalizeBaseUrl(input);
  const params = Object.fromEntries(url.searchParams.entries());
  const segments = url.pathname.split("/").filter(Boolean);

  return {
    baseUrl: `${url.origin}${url.pathname}`,
    hash: url.hash,
    host: url.host,
    hostname: url.hostname,
    href: url.toString(),
    origin: url.origin,
    path: url.pathname,
    protocol: url.protocol,
    queryCount: url.searchParams.size,
    queryParams: params,
    search: url.search,
    segments,
  };
}

export function buildUtmUrl(config: UtmConfig) {
  const url = normalizeBaseUrl(config.baseUrl);

  if (!config.source.trim() || !config.medium.trim() || !config.campaign.trim()) {
    throw new Error("Source, medium, campaign, and base URL are required.");
  }

  url.searchParams.set("utm_source", config.source.trim());
  url.searchParams.set("utm_medium", config.medium.trim());
  url.searchParams.set("utm_campaign", config.campaign.trim());

  if (config.term?.trim()) {
    url.searchParams.set("utm_term", config.term.trim());
  } else {
    url.searchParams.delete("utm_term");
  }

  if (config.content?.trim()) {
    url.searchParams.set("utm_content", config.content.trim());
  } else {
    url.searchParams.delete("utm_content");
  }

  return url.toString();
}

export function parseUtmUrl(input: string) {
  const url = normalizeBaseUrl(input);
  const utmEntries = {
    campaign: url.searchParams.get("utm_campaign") ?? "",
    content: url.searchParams.get("utm_content") ?? "",
    medium: url.searchParams.get("utm_medium") ?? "",
    source: url.searchParams.get("utm_source") ?? "",
    term: url.searchParams.get("utm_term") ?? "",
  };

  const cleanUrl = new URL(url.toString());
  ["utm_campaign", "utm_content", "utm_medium", "utm_source", "utm_term"].forEach((param) => {
    cleanUrl.searchParams.delete(param);
  });

  const extraParams = Object.fromEntries(cleanUrl.searchParams.entries());

  return {
    baseUrl: `${url.origin}${url.pathname}`,
    cleanUrl: cleanUrl.toString(),
    extraParams,
    utmEntries,
  };
}

export function formatKeywordDensityOutput(entries: KeywordEntry[]) {
  if (!entries.length) {
    return "No strong keyword candidates were found yet.";
  }

  return entries
    .map((entry) => `${entry.keyword} - ${entry.count} uses (${formatPct(entry.density)})`)
    .join("\n");
}

export function formatSeoStatsOutput(text: string) {
  const stats = getSeoWordStats(text);

  return stringifyObject({
    characters: stats.characters,
    charactersNoSpaces: stats.charactersNoSpaces,
    paragraphs: stats.paragraphs,
    readingMinutes: Number(stats.readingMinutes.toFixed(2)),
    sentences: stats.sentences,
    words: stats.words,
  });
}

export function formatUrlDetailsOutput(input: string) {
  const parsed = parseUrlDetails(input);

  return stringifyObject({
    baseUrl: parsed.baseUrl,
    hash: parsed.hash,
    host: parsed.host,
    hostname: parsed.hostname,
    origin: parsed.origin,
    path: parsed.path,
    protocol: parsed.protocol,
    queryParams: parsed.queryParams,
    segments: parsed.segments,
  });
}
