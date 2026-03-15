import { FractionToolWidget } from "@/components/fraction-tool-widget";
import { IntegerMathWidget } from "@/components/integer-math-widget";
import { NumberListStatWidget } from "@/components/number-list-stat-widget";
import { PercentageCalculatorWidget } from "@/components/percentage-calculator-widget";
import { PercentageChangeWidget } from "@/components/percentage-change-widget";
import { RatioCalculatorWidget } from "@/components/ratio-calculator-widget";
import { ScientificNotationWidget } from "@/components/scientific-notation-widget";
import type { MathToolWidgetConfig } from "@/lib/content/math-tools";

export function MathToolRenderer({ widget }: { widget: MathToolWidgetConfig }) {
  if (widget.kind === "percentage") {
    return (
      <PercentageCalculatorWidget
        defaultPrimary={widget.defaultPrimary}
        defaultSecondary={widget.defaultSecondary}
      />
    );
  }

  if (widget.kind === "percentage-change") {
    return (
      <PercentageChangeWidget
        defaultNewValue={widget.defaultNewValue}
        defaultOldValue={widget.defaultOldValue}
      />
    );
  }

  if (widget.kind === "ratio") {
    return (
      <RatioCalculatorWidget
        defaultLeft={widget.defaultLeft}
        defaultMode={widget.defaultMode}
        defaultRight={widget.defaultRight}
        defaultThird={widget.defaultThird}
      />
    );
  }

  if (widget.kind === "number-list-stat") {
    return (
      <NumberListStatWidget
        defaultValue={widget.defaultValue}
        metric={widget.metric}
      />
    );
  }

  if (widget.kind === "fraction") {
    return (
      <FractionToolWidget
        defaultDecimal={widget.defaultDecimal}
        defaultDenominator={widget.defaultDenominator}
        defaultMode={widget.defaultMode}
        defaultNumerator={widget.defaultNumerator}
      />
    );
  }

  if (widget.kind === "integer-math") {
    return (
      <IntegerMathWidget
        defaultLeft={widget.defaultLeft}
        defaultMode={widget.defaultMode}
        defaultRight={widget.defaultRight}
      />
    );
  }

  return (
    <ScientificNotationWidget
      defaultCoefficient={widget.defaultCoefficient}
      defaultDecimal={widget.defaultDecimal}
      defaultExponent={widget.defaultExponent}
      defaultMode={widget.defaultMode}
    />
  );
}
