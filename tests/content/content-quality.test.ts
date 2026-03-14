import { describe, expect, it } from "vitest";
import { topPriorityNumericSlugs } from "../../lib/config/registry/priority-numeric-content";
import { buildNumericPairLongDescription } from "../../lib/config/registry/registry-helpers";
import { getUnitPage, getUnitPageFaqs } from "../../lib/content/pages";
import { makeFaqSchemaIfPresent } from "../../lib/seo";

const MAX_DESCRIPTION_SIMILARITY = 0.72;

function flattenStructuredContentText(slug: string) {
  const page = getUnitPage(slug);

  if (!page?.longDescription) {
    throw new Error(`Expected longDescription for ${slug}`);
  }

  return page.longDescription.sections
    .flatMap((section) => [...section.paragraphs, ...(section.listItems ?? [])])
    .join(" ");
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildTrigramSet(text: string) {
  const words = normalizeText(text).split(" ").filter(Boolean);

  if (!words.length) {
    return new Set<string>();
  }

  if (words.length < 3) {
    return new Set([words.join(" ")]);
  }

  const trigrams = new Set<string>();

  for (let index = 0; index <= words.length - 3; index += 1) {
    trigrams.add(words.slice(index, index + 3).join(" "));
  }

  return trigrams;
}

function computeSimilarity(left: string, right: string) {
  const leftTrigrams = buildTrigramSet(left);
  const rightTrigrams = buildTrigramSet(right);

  if (!leftTrigrams.size || !rightTrigrams.size) {
    return 0;
  }

  let sharedCount = 0;

  for (const trigram of leftTrigrams) {
    if (rightTrigrams.has(trigram)) {
      sharedCount += 1;
    }
  }

  return (2 * sharedCount) / (leftTrigrams.size + rightTrigrams.size);
}

describe("priority numeric page content quality", () => {
  it("uses custom long descriptions and 3-4 FAQs for every top-priority page", () => {
    for (const slug of topPriorityNumericSlugs) {
      const page = getUnitPage(slug);

      expect(page, `Expected page for ${slug}`).toBeDefined();

      if (!page) {
        continue;
      }

      const fallback = buildNumericPairLongDescription(page.category, page.from, page.to);
      const faqs = getUnitPageFaqs(page);

      expect(page.longDescription, `Expected longDescription for ${slug}`).toBeDefined();
      expect(page.longDescription).not.toEqual(fallback);
      expect(faqs.length, `Expected 3-4 FAQs for ${slug}`).toBeGreaterThanOrEqual(3);
      expect(faqs.length, `Expected 3-4 FAQs for ${slug}`).toBeLessThanOrEqual(4);
    }
  });

  it("passes each top-priority FAQ set through FAQ schema generation", () => {
    for (const slug of topPriorityNumericSlugs) {
      const page = getUnitPage(slug);

      expect(page, `Expected page for ${slug}`).toBeDefined();

      if (!page) {
        continue;
      }

      const faqs = getUnitPageFaqs(page);
      const schema = makeFaqSchemaIfPresent(faqs);

      expect(schema, `Expected FAQ schema for ${slug}`).not.toBeNull();
      expect(schema?.["@type"]).toBe("FAQPage");
      expect(schema?.mainEntity).toHaveLength(faqs.length);
    }
  });

  it("keeps top-priority long descriptions below the duplicate-content threshold", () => {
    const offenders: string[] = [];

    for (let index = 0; index < topPriorityNumericSlugs.length; index += 1) {
      for (let compareIndex = index + 1; compareIndex < topPriorityNumericSlugs.length; compareIndex += 1) {
        const leftSlug = topPriorityNumericSlugs[index];
        const rightSlug = topPriorityNumericSlugs[compareIndex];
        const similarity = computeSimilarity(
          flattenStructuredContentText(leftSlug),
          flattenStructuredContentText(rightSlug),
        );

        if (similarity > MAX_DESCRIPTION_SIMILARITY) {
          offenders.push(
            `${leftSlug} vs ${rightSlug} similarity ${similarity.toFixed(3)} exceeds ${MAX_DESCRIPTION_SIMILARITY}`,
          );
        }
      }
    }

    if (offenders.length) {
      throw new Error(`Found highly similar long descriptions:\n${offenders.join("\n")}`);
    }
  });
});
