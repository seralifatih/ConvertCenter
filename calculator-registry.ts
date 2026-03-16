export type MathFieldType = "number" | "text" | "number-list";

export interface MathFieldDef {
    id: string;
    label: string;
    type: MathFieldType;
    defaultValue?: string | number;
    placeholder?: string;
    suffix?: string;
    width?: "full" | "half" | "third";
    constraints?: {
        min?: number;
        max?: number;
        allowNegative?: boolean; // default true
        allowZero?: boolean; // default true
    };
}

export interface MathResultDef {
    id: string;
    label: string;
    type: "number" | "text";
    formatOptions?: {
        style?: "percent" | "decimal" | "unit";
        maximumFractionDigits?: number;
        suffix?: string;
    };
    copyable?: boolean; // default true
}

export interface MathCalculatorVariant {
    id: string;
    label: string;
    description?: string;
    fields: MathFieldDef[];
    outputs: MathResultDef[];
    calculate: (inputs: Record<string, any>) => Record<string, any>;
}

export interface MathCalculatorDef {
    id: string;
    title: string;
    description: string;
    variants: MathCalculatorVariant[];
}

// --- Helper Functions ---

function parseNumberList(input: string): number[] {
    if (!input) return [];
    return input
        .split(/[\n,]+/)
        .map((s) => parseFloat(s.trim()))
        .filter((n) => !isNaN(n));
}

function gcd(a: number, b: number): number {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        const t = b;
        b = a % b;
        a = t;
    }
    return a;
}

// --- Calculator Implementations ---

const percentageCalculator: MathCalculatorDef = {
    id: "percentage",
    title: "Percentage Calculator",
    description: "Calculate percentages, percent-of values, and changes.",
    variants: [
        {
            id: "percent-of",
            label: "Find Percent Of",
            description: "Find x% of y",
            fields: [
                { id: "percent", label: "Percentage", type: "number", suffix: "%", width: "half", defaultValue: 25 },
                { id: "number", label: "Number", type: "number", width: "half", defaultValue: 200 },
            ],
            outputs: [{ id: "result", label: "Result", type: "number" }],
            calculate: ({ percent, number }) => ({
                result: (Number(percent) / 100) * Number(number),
            }),
        },
        {
            id: "what-percent",
            label: "What Percent Is",
            description: "x is what percent of y?",
            fields: [
                { id: "part", label: "Part (X)", type: "number", width: "half" },
                { id: "whole", label: "Whole (Y)", type: "number", width: "half" },
            ],
            outputs: [{ id: "result", label: "Percentage", type: "number", formatOptions: { suffix: "%", maximumFractionDigits: 2 } }],
            calculate: ({ part, whole }) => {
                if (Number(whole) === 0) return { result: 0 };
                return { result: (Number(part) / Number(whole)) * 100 };
            },
        },
        {
            id: "increase-decrease",
            label: "Increase/Decrease",
            description: "Increase or decrease x by y%",
            fields: [
                { id: "number", label: "Start Value", type: "number", width: "half" },
                { id: "percent", label: "Percentage", type: "number", suffix: "%", width: "half" },
            ],
            outputs: [{ id: "result", label: "New Value", type: "number" }],
            calculate: ({ number, percent }) => ({
                result: Number(number) * (1 + Number(percent) / 100),
            }),
        },
    ],
};

const percentageChangeCalculator: MathCalculatorDef = {
    id: "percentage-change",
    title: "Percentage Change",
    description: "Calculate the percent difference between two values.",
    variants: [
        {
            id: "default",
            label: "Percentage Change",
            fields: [
                { id: "oldVal", label: "Old Value", type: "number", width: "half", defaultValue: 100 },
                { id: "newVal", label: "New Value", type: "number", width: "half", defaultValue: 120 },
            ],
            outputs: [
                { id: "percentChange", label: "Change", type: "number", formatOptions: { suffix: "%", maximumFractionDigits: 2 } },
                { id: "difference", label: "Difference", type: "number" },
                { id: "type", label: "Result Type", type: "text" },
            ],
            calculate: ({ oldVal, newVal }) => {
                const oldN = Number(oldVal);
                const newN = Number(newVal);
                if (oldN === 0) return { percentChange: 0, difference: newN, type: "Undefined (start is 0)" };

                const diff = newN - oldN;
                const change = (diff / oldN) * 100;

                return {
                    percentChange: change,
                    difference: diff,
                    type: change > 0 ? "Increase" : change < 0 ? "Decrease" : "No Change",
                };
            },
        },
    ],
};

const averageCalculator: MathCalculatorDef = {
    id: "average",
    title: "Average Calculator",
    description: "Calculate the mean of a list of numbers.",
    variants: [
        {
            id: "mean",
            label: "Average (Mean)",
            fields: [
                {
                    id: "values",
                    label: "Numbers (comma or line separated)",
                    type: "number-list",
                    defaultValue: "10, 20, 30, 40",
                    placeholder: "e.g. 10, 20, 30"
                },
            ],
            outputs: [
                { id: "mean", label: "Average", type: "number", formatOptions: { maximumFractionDigits: 4 } },
                { id: "count", label: "Count", type: "number" },
                { id: "sum", label: "Sum", type: "number" },
            ],
            calculate: ({ values }) => {
                const list = parseNumberList(String(values));
                if (list.length === 0) return { mean: 0, count: 0, sum: 0 };
                const sum = list.reduce((a, b) => a + b, 0);
                return {
                    mean: sum / list.length,
                    count: list.length,
                    sum,
                };
            },
        },
    ],
};

const ratioCalculator: MathCalculatorDef = {
    id: "ratio",
    title: "Ratio Calculator",
    description: "Simplify ratios or solve proportions.",
    variants: [
        {
            id: "simplify",
            label: "Simplify Ratio",
            fields: [
                { id: "a", label: "Left", type: "number", width: "half", defaultValue: 4, constraints: { allowZero: false } },
                { id: "b", label: "Right", type: "number", width: "half", defaultValue: 8, constraints: { allowZero: false } },
            ],
            outputs: [
                { id: "ratio", label: "Simplified Ratio", type: "text" },
            ],
            calculate: ({ a, b }) => {
                const valA = Number(a);
                const valB = Number(b);
                if (valA === 0 || valB === 0) return { ratio: "Invalid" };
                const divisor = gcd(valA, valB);
                return { ratio: `${valA / divisor} : ${valB / divisor}` };
            },
        },
        {
            id: "proportion",
            label: "Solve Proportion",
            description: "Solve for x in A : B = C : x",
            fields: [
                { id: "a", label: "A", type: "number", width: "third", defaultValue: 2 },
                { id: "b", label: "B", type: "number", width: "third", defaultValue: 5 },
                { id: "c", label: "C", type: "number", width: "third", defaultValue: 8 },
            ],
            outputs: [
                { id: "x", label: "Result (x)", type: "number", formatOptions: { maximumFractionDigits: 4 } },
            ],
            calculate: ({ a, b, c }) => {
                const valA = Number(a);
                const valB = Number(b);
                const valC = Number(c);
                if (valA === 0) return { x: 0 }; // Avoid div by zero
                return { x: (valB * valC) / valA };
            },
        },
    ],
};

const registry: Record<string, MathCalculatorDef> = {
    [percentageCalculator.id]: percentageCalculator,
    [percentageChangeCalculator.id]: percentageChangeCalculator,
    [averageCalculator.id]: averageCalculator,
    [ratioCalculator.id]: ratioCalculator,
};

export function getCalculatorDef(id: string): MathCalculatorDef | undefined {
    return registry[id];
}

export function getAllCalculatorIds(): string[] {
    return Object.keys(registry);
}