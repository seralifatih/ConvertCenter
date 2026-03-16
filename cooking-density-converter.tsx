"use client";

import { useState, useMemo } from "react";
import { convertCookingUnit } from "@/lib/cooking/conversions";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { CookingIngredient as Ingredient } from "@/lib/cooking/ingredients";

export type CookingDensityConverterProps = {
    fromUnit: "cup" | "gram";
    toUnit: "cup" | "gram";
    ingredients: Ingredient[];
};

export function CookingDensityConverter({
    fromUnit,
    toUnit,
    ingredients,
}: CookingDensityConverterProps) {
    const [value, setValue] = useState<string | number>(1);
    const [selectedIngredientId, setSelectedIngredientId] = useState(
        ingredients[0]?.id || ""
    );

    const selectedIngredient = useMemo(
        () => ingredients.find((i) => i.id === selectedIngredientId),
        [ingredients, selectedIngredientId]
    );

    const result = useMemo(() => {
        const numValue = Number(value);
        if (!selectedIngredient) return 0;
        return convertCookingUnit({ value: numValue, from: fromUnit, to: toUnit, ingredient: selectedIngredient });
    }, [value, selectedIngredient, fromUnit, toUnit]);

    const fromLabel = fromUnit === "cup" ? "Cups" : "Grams";
    const toLabel = toUnit === "cup" ? "Cups" : "Grams";

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[color:var(--muted-strong)]">
                        {fromLabel}
                    </label>
                    <Input
                        type="number"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder={`Enter ${fromLabel.toLowerCase()}`}
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[color:var(--muted-strong)]">
                        Ingredient
                    </label>
                    <Select
                        value={selectedIngredientId}
                        onValueChange={setSelectedIngredientId}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select ingredient" />
                        </SelectTrigger>
                        <SelectContent>
                            {ingredients.map((ing) => (
                                <SelectItem key={ing.id} value={ing.id}>
                                    {ing.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm">
                <span className="text-xs font-medium uppercase tracking-wider text-[color:var(--muted)]">
                    {toLabel}
                </span>
                <p className="text-2xl font-semibold text-[color:var(--foreground)] sm:text-3xl">
                    {result.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                {selectedIngredient && (
                    <p className="mt-2 text-xs text-[color:var(--muted)]">
                        Note: {selectedIngredient.approximationNote}
                    </p>
                )}
            </div>
        </div>
    );
}