# Adding New Math Calculators

The math calculator system uses a scalable registry model. You can add new calculators without creating new React components.

## Process

1.  **Open** `lib/math/calculator-registry.ts`.
2.  **Define** your calculator using the `MathCalculatorDef` schema.

### Example Config (Standard Deviation)

```typescript
const stdDevCalculator: MathCalculatorDef = {
  id: "standard-deviation",
  title: "Standard Deviation Calculator",
  description: "Calculate population standard deviation.",
  variants: [
    {
      id: "population",
      label: "Standard Deviation",
      fields: [
        { id: "values", label: "Values", type: "number-list" },
      ],
      outputs: [
        { id: "stdDev", label: "Result", type: "number" },
      ],
      calculate: ({ values }) => {
        // logic here...
        return { stdDev: 1.23 };
      },
    },
  ],
};
```

3.  **Register** the variable in the exported `registry` object at the bottom of the file.
4.  **Create Content** in `lib/content/math-tools.ts`. Add a new entry to `mathToolSeeds`:

```typescript
{
  slug: "standard-deviation-calculator",
  title: "Standard Deviation Calculator",
  // ... SEO metadata ...
  widget: {
    kind: "generic",
    calculatorId: "standard-deviation"
  }
}
```

## Guidance for Future Tools

-   The shared UI lives in `components/generic-math-calculator.tsx`, so `kind: "generic"` pages automatically get variant tabs, validation, reset/clear actions, and formatted outputs.
-   Use `formatOptions` on outputs for currency, percentage, or unit suffix formatting instead of creating page-specific result markup.
-   Prefer multiple `variants` over one-off custom widgets when a calculator has a few related modes, such as `molarity` or `pH`.

-   **Exponent**: Use `fields: [{id: "base"}, {id: "exponent"}]`. Formula: `Math.pow(base, exponent)`.
-   **Square Root**: Use `fields: [{id: "number"}]`. Formula: `Math.sqrt(number)`.
-   **Median/Mode**: Use `type: "number-list"`. Parse list, sort, and find middle/frequency.
-   **Fraction**: Use `variants` for "Simplify", "Add", "Subtract". Inputs can be `numerator1`, `denominator1`, etc.
