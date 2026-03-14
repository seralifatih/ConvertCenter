export type SearchEntry = {
  title: string;
  href: string;
  category: string;
  entryType: "page" | "category";
  keywords: string[];
};

function normalizeSearchText(value: string) {
  return value.trim().toLowerCase().replace(/[-_/]+/g, " ").replace(/\s+/g, " ");
}

function expandSearchParts(value: string) {
  return normalizeSearchText(value)
    .split(" ")
    .filter(Boolean)
    .flatMap((part) => {
      if (part.length <= 3) {
        return [part];
      }

      const singular =
        part.endsWith("ies") && part.length > 4
          ? `${part.slice(0, -3)}y`
          : part.endsWith("es") && part.length > 4
            ? part.slice(0, -2)
            : part.endsWith("s") && part.length > 4
              ? part.slice(0, -1)
              : part;

      return singular === part ? [part] : [part, singular];
    });
}

export function findExactSearchMatch(searchEntries: SearchEntry[], value: string) {
  const normalizedValue = normalizeSearchText(value);

  if (!normalizedValue) {
    return undefined;
  }

  return searchEntries.find((entry) => {
    const normalizedTitle = normalizeSearchText(entry.title);
    const normalizedKeywords = entry.keywords.map(normalizeSearchText);

    return (
      normalizedTitle === normalizedValue ||
      normalizedKeywords.some((keyword) => keyword === normalizedValue)
    );
  });
}

export function scoreSearchEntry(entry: SearchEntry, query: string) {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return 0;
  }

  const normalizedTitle = normalizeSearchText(entry.title);
  const normalizedKeywords = entry.keywords.map(normalizeSearchText);
  const queryParts = expandSearchParts(query);
  let score = 0;

  if (normalizedTitle === normalizedQuery) {
    score += 120;
  }

  if (normalizedKeywords.some((keyword) => keyword === normalizedQuery)) {
    score += 100;
  }

  if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 55;
  }

  if (normalizedKeywords.some((keyword) => keyword.startsWith(normalizedQuery))) {
    score += 40;
  }

  if (normalizedTitle.includes(normalizedQuery)) {
    score += 25;
  }

  if (normalizedKeywords.some((keyword) => keyword.includes(normalizedQuery))) {
    score += 18;
  }

  if (entry.entryType === "page" && normalizedTitle.includes(normalizedQuery)) {
    score += 12;
  }

  for (const part of queryParts) {
    if (normalizedTitle.includes(part)) {
      score += 9;
    }

    if (normalizedKeywords.some((keyword) => keyword.includes(part))) {
      score += 4;
    }
  }

  if (entry.entryType === "page") {
    score += 4;
  }

  return score;
}

export function rankSearchEntries(
  searchEntries: SearchEntry[],
  query: string,
  limit = 6,
) {
  return searchEntries
    .map((entry) => ({
      entry,
      score: scoreSearchEntry(entry, query),
    }))
    .filter((item) => item.score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      if (left.entry.entryType !== right.entry.entryType) {
        return left.entry.entryType === "page" ? -1 : 1;
      }

      return left.entry.title.localeCompare(right.entry.title);
    })
    .slice(0, limit);
}
