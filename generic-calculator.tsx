"use client";

import { useState, useMemo, useEffect } from "react";
import { getCalculatorDef, MathFieldDef } from "@/lib/math/calculator-registry";

type GenericCalculatorProps = {
    calculatorId: string;
    defaultVariant?: string;
    defaultValues?: Record<string, string | number>;
};

export function GenericMathCalculator({
    calculatorId,
    defaultVariant,
    defaultValues: initialValues,
}: GenericCalculatorProps) {
    const definition = getCalculatorDef(calculatorId);

    const [activeVariantId, setActiveVariantId] = useState(
        defaultVariant || definition?.variants[0]?.id || ""
    );

    const variant = useMemo(
        () => definition?.variants.find((v) => v.id === activeVariantId),
        [definition, activeVariantId]
    );

    const [values, setValues] = useState<Record<string, string | number>>({});

    // Initialize defaults when variant changes
    useEffect(() => {
        if (!variant) return;

        const nextValues: Record<string, string | number> = {};
        variant.fields.forEach((field) => {
            // Use prop default if matches field, else schema default, else empty
            if (initialValues && initialValues[field.id] !== undefined) {
                nextValues[field.id] = initialValues[field.id];
            } else {
                nextValues[field.id] = field.defaultValue ?? "";
            }
        });
        setValues(nextValues);
    }, [variant, initialValues]);

    if (!definition || !variant) {
        return <div className="p-4 text-red-500">Calculator definition not found: {calculatorId}</div>;
    }

    const results = variant.calculate(values);

    const handleInputChange = (id: string, val: string) => {
        setValues((prev) => ({ ...prev, [id]: val }));
    };

    return (
        <div className="w-full space-y-6">
            {/* Variant Selector (Tabs) */}
            {definition.variants.length > 1 && (
                <div className="flex flex-wrap gap-2 border-b border-[color:var(--border)] pb-4">
                    {definition.variants.map((v) => (
                        <button
                            key={v.id}
                            onClick={() => setActiveVariantId(v.id)}
                            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${activeVariantId === v.id
                                ? "bg-[color:var(--primary)] text-[color:var(--primary-foreground)]"
                                : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)]"
                                }`}
                        >
                            {v.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Description */}
            {(definition.description || variant.description) && (
                <p className="text-sm text-[color:var(--muted)]">
                    {variant.description || definition.description}
                </p>
            )}

            {/* Inputs */}
            <div className="grid gap-4 sm:grid-cols-12">
                {variant.fields.map((field) => (
                    <div
                        key={field.id}
                        className={`${field.width === "third"
                            ? "sm:col-span-4"
                            : field.width === "half"
                                ? "sm:col-span-6"
                                : "sm:col-span-12"
                            }`}
                    >
                        <label className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-[color:var(--muted-strong)]">
                            {field.label}
                        </label>
                        <div className="relative">
                            {field.type === "select" ? (
                                <select
                                    className="block w-full rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm shadow-sm focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
                                    value={values[field.id] || ""}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                >
                                    {field.options?.map((option) => (
                                        <option key={String(option.value)} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : field.type === "number-list" ? (
                                <textarea
                                    className="block w-full rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm shadow-sm focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)] min-h-[100px]"
                                    placeholder={field.placeholder}
                                    value={values[field.id] || ""}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                />
                            ) : (
                                <input
                                    type={field.type === "number" ? "number" : "text"}
                                    type={field.type}
                                    className="block w-full rounded-md border border-[color:var(--border)] bg-[color:var(--background)] px-3 py-2 text-sm shadow-sm focus:border-[color:var(--primary)] focus:outline-none focus:ring-1 focus:ring-[color:var(--primary)]"
                                    placeholder={field.placeholder}
                                    value={values[field.id] || ""}
                                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                                />
                            )}
                            {field.suffix && (
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 sm:text-sm">{field.suffix}</span>
                                </div>
                            )}
                            {field.info && (
                                <p className="mt-1.5 text-xs text-[color:var(--muted)]">
                                    {field.info}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Results */}
            <div className="mt-6 rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-sm sm:p-6">
                <div className="grid gap-6 sm:grid-cols-2">
                    {variant.outputs.map((output) => {
                        const rawValue = results[output.id];
                        let displayValue = rawValue?.toString() ?? "—";

                        if (typeof rawValue === "number" && output.formatOptions) {
                            const { maximumFractionDigits, suffix } = output.formatOptions;
                            displayValue = new Intl.NumberFormat("en-US", {
                                maximumFractionDigits: maximumFractionDigits ?? 2,
                            }).format(rawValue);
                            if (suffix) displayValue += suffix;
                        }

                        return (
                            <div key={output.id} className="space-y-1">
                                <span className="text-xs font-medium uppercase tracking-wider text-[color:var(--muted)]">
                                    {output.label}
                                </span>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold text-[color:var(--foreground)] sm:text-2xl">
                                        {displayValue}
                                    </span>
                                    {output.copyable !== false && rawValue !== undefined && (
                                        <button
                                            onClick={() => navigator.clipboard.writeText(displayValue)}
                                            className="ml-2 rounded p-1.5 text-[color:var(--muted)] hover:bg-[color:var(--muted)]/10 hover:text-[color:var(--foreground)]"
                                            title="Copy result"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}