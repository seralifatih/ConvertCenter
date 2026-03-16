export type PercentageChangeResult = {
  baselineType: "negative" | "positive";
  direction: "decrease" | "increase" | "no-change";
  difference: number;
  percentage: number;
};

export type PercentageAdjustmentMode = "decrease" | "increase";

export type PercentageAdjustmentResult = {
  delta: number;
  direction: PercentageAdjustmentMode;
  percentage: number;
  result: number;
};

export type PercentageChangeState =
  | { kind: "invalid" }
  | { difference: number; kind: "zero-baseline" }
  | { kind: "result"; result: PercentageChangeResult };

export function percentOf(x: number, y: number) {
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    return null;
  }

  return (x / 100) * y;
}

export function whatPercentOf(x: number, y: number) {
  if (!Number.isFinite(x) || !Number.isFinite(y) || y === 0) {
    return null;
  }

  return (x / y) * 100;
}

export function applyPercentageAdjustment(
  baseValue: number,
  percentage: number,
  direction: PercentageAdjustmentMode,
) {
  if (!Number.isFinite(baseValue) || !Number.isFinite(percentage)) {
    return null;
  }

  const normalizedPercentage = Math.abs(percentage);
  const multiplier =
    direction === "increase"
      ? 1 + normalizedPercentage / 100
      : 1 - normalizedPercentage / 100;
  const result = baseValue * multiplier;
  const delta = result - baseValue;

  return {
    delta,
    direction,
    percentage: normalizedPercentage,
    result,
  } satisfies PercentageAdjustmentResult;
}

export function getPercentageChangeState(oldValue: number, newValue: number): PercentageChangeState {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue)) {
    return { kind: "invalid" };
  }

  const difference = newValue - oldValue;

  if (oldValue === 0) {
    return {
      difference,
      kind: "zero-baseline",
    };
  }

  const percentage = (difference / Math.abs(oldValue)) * 100;

  if (difference === 0) {
    return {
      kind: "result",
      result: {
        baselineType: oldValue < 0 ? "negative" : "positive",
        difference,
        direction: "no-change",
        percentage: 0,
      },
    };
  }

  return {
    kind: "result",
    result: {
      baselineType: oldValue < 0 ? "negative" : "positive",
      difference,
      direction: difference > 0 ? "increase" : "decrease",
      percentage: Math.abs(percentage),
    },
  };
}

export function calculatePercentageChange(oldValue: number, newValue: number) {
  const state = getPercentageChangeState(oldValue, newValue);

  return state.kind === "result" ? state.result : null;
}
