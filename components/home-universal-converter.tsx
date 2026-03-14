"use client";

import { useState } from "react";
import { FreeUnitConverter } from "@/components/free-unit-converter";
import { PillButton } from "@/components/pill";
import {
  getCategoryConfig,
  homepageConfig,
  type NumericCategoryKey,
} from "@/lib/config/conversion-registry";
import { getUnitPage } from "@/lib/content/pages";

const numericHomeCategories = homepageConfig.filterCategoryKeys.filter(
  (categoryKey): categoryKey is NumericCategoryKey => categoryKey !== "text",
);

export function HomeUniversalConverter() {
  const [activeCategory, setActiveCategory] = useState<NumericCategoryKey>(
    homepageConfig.featuredConverter.categoryKey,
  );

  const category = getCategoryConfig(activeCategory);
  const featuredPage =
    category.kind === "numeric" ? getUnitPage(category.featuredSlug) : undefined;

  if (!featuredPage) {
    return null;
  }

  return (
    <div className="space-y-2.5">
      <FreeUnitConverter
        category={featuredPage.category}
        compact
        defaultFrom={featuredPage.from}
        defaultTo={featuredPage.to}
        defaultValue={featuredPage.exampleValue}
      />
      <div className="flex flex-wrap gap-2">
        {numericHomeCategories.map((categoryKey) => {
          const item = getCategoryConfig(categoryKey);
          return (
            <PillButton
              active={activeCategory === categoryKey}
              className="text-[11px]"
              key={categoryKey}
              onClick={() => setActiveCategory(categoryKey)}
            >
              {item.label}
            </PillButton>
          );
        })}
      </div>
    </div>
  );
}
