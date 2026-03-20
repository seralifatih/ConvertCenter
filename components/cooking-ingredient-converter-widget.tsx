"use client";

import { useId, useState } from "react";
import { CopyButton } from "@/components/copy-button";
import { PillButton } from "@/components/pill";
import {
  convertCookingValue,
  cookingIngredients,
  getCookingModeLabels,
  type CookingConversionMode,
  type CookingIngredientKey,
} from "@/lib/cooking";
import { formatNumber } from "@/lib/conversion/units";

type CookingIngredientConverterWidgetProps = {
  defaultIngredient: CookingIngredientKey;
  defaultValue: string;
  fixedIngredient?: CookingIngredientKey;
  mode: CookingConversionMode;
};

export function CookingIngredientConverterWidget({
  defaultIngredient,
  defaultValue,
  fixedIngredient,
  mode,
}: CookingIngredientConverterWidgetProps) {
  const valueId = useId();
  const ingredientId = useId();
  const [rawValue, setRawValue] = useState(defaultValue);
  const [ingredient, setIngredient] = useState<CookingIngredientKey>(defaultIngredient);
  const resolvedIngredient = fixedIngredient ?? ingredient;
  const numericValue = Number(rawValue);
  const convertedValue = convertCookingValue(numericValue, resolvedIngredient, mode);
  const labels = getCookingModeLabels(mode);
  const gramsPerTablespoon = cookingIngredients[resolvedIngredient].gramsPerTeaspoon * 3;
  const formulaLine =
    mode === "cupsToGrams" || mode === "gramsToCups"
      ? `1 cup ${cookingIngredients[resolvedIngredient].label.toLowerCase()} ~= ${formatNumber(cookingIngredients[resolvedIngredient].gramsPerCup, 3)} g`
      : mode === "tablespoonsToGrams"
        ? `1 tbsp ${cookingIngredients[resolvedIngredient].label.toLowerCase()} ~= ${formatNumber(gramsPerTablespoon, 3)} g`
      : `1 tsp ${cookingIngredients[resolvedIngredient].label.toLowerCase()} ~= ${formatNumber(cookingIngredients[resolvedIngredient].gramsPerTeaspoon, 3)} g`;

  const outputText =
    convertedValue === null
      ? mode === "cupsToGrams"
        ? "Enter a valid cup amount."
        : mode === "tablespoonsToGrams"
          ? "Enter a valid tablespoon amount."
        : mode === "gramsToCups" || mode === "gramsToTeaspoons"
          ? "Enter a valid gram amount."
          : "Enter a valid teaspoon amount."
      : labels.unitHint === "g"
        ? `${formatNumber(convertedValue, 3)} g`
        : labels.unitHint === "cups"
          ? `${formatNumber(convertedValue, 4)} cups`
          : `${formatNumber(convertedValue, 4)} tsp`;

  return (
    <section className="shell-card p-4 sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="mono-kicker" htmlFor={valueId}>
              {labels.inputLabel}
            </label>
            <input
              className="input-surface px-3 py-3 font-mono text-base"
              id={valueId}
              inputMode="decimal"
              onChange={(event) => setRawValue(event.target.value)}
              placeholder={labels.placeholder}
              type="number"
              value={rawValue}
            />
          </div>

          {fixedIngredient ? (
            <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] px-4 py-4">
              <div className="mono-kicker mb-2">ingredient assumption</div>
              <p className="text-sm text-[color:var(--text)]">
                {cookingIngredients[fixedIngredient].label}
              </p>
              <p className="mt-2 text-sm leading-7 text-[color:var(--muted)]">
                This page is ingredient-specific. It uses{" "}
                {cookingIngredients[fixedIngredient].densityDescription.toLowerCase()} and should
                be treated as an approximate kitchen reference.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <label className="mono-kicker" htmlFor={ingredientId}>
                ingredient
              </label>
              <select
                className="input-surface px-3 py-3 text-sm"
                id={ingredientId}
                onChange={(event) => setIngredient(event.target.value as CookingIngredientKey)}
                value={ingredient}
              >
                {Object.entries(cookingIngredients).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value.label}
                  </option>
                ))}
              </select>
              <p className="text-sm leading-7 text-[color:var(--muted)]">
                Cups and grams depend on ingredient density, so choose the ingredient first.
              </p>
            </div>
          )}
        </div>

        <div className="rounded-[20px] border-2 border-[color:var(--accent)] bg-[color:var(--accent-surface)] p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <span className="mono-kicker text-[color:var(--accent-text)]">{labels.outputLabel}</span>
            <span className="section-badge">ingredient aware</span>
          </div>
          <div className="rounded-2xl border border-[color:var(--accent-text)]/20 bg-[color:var(--page)]/30 px-3 py-4">
            <p className="font-mono text-lg text-[color:var(--accent)] break-all">{outputText}</p>
          </div>
          <p className="mt-3 font-mono text-xs text-[color:var(--accent-text)]">{formulaLine}</p>
          <p className="mt-2 text-sm leading-7 text-[color:var(--accent-text)]">
            {cookingIngredients[resolvedIngredient].approximationNote}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton text={outputText} />
            <PillButton
              aria-label="Clear cooking converter values"
              onClick={() => {
                setRawValue("");
                setIngredient(fixedIngredient ?? defaultIngredient);
              }}
            >
              clear
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
