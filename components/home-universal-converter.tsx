"use client";

import { useState } from "react";
import { PillButton } from "@/components/pill";
import { UnitConverter } from "@/components/unit-converter";
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
    <div className="space-y-3">
      <UnitConverter
        category={featuredPage.category}
        defaultFrom={featuredPage.from}
        defaultTo={featuredPage.to}
        defaultValue={featuredPage.exampleValue}
        key={featuredPage.slug}
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
