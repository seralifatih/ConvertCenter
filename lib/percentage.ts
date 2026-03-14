export type PercentageChangeResult = {
  direction: "decrease" | "increase" | "no-change";
  difference: number;
  percentage: number;
};

export function calculatePercentageChange(oldValue: number, newValue: number) {
  if (!Number.isFinite(oldValue) || !Number.isFinite(newValue) || oldValue === 0) {
    return null;
  }

  const difference = newValue - oldValue;
  const percentage = (difference / oldValue) * 100;

  if (difference === 0) {
    return {
      difference,
      direction: "no-change",
      percentage: 0,
    } satisfies PercentageChangeResult;
  }

  return {
    difference,
    direction: difference > 0 ? "increase" : "decrease",
    percentage: Math.abs(percentage),
  } satisfies PercentageChangeResult;
}
