function getNumberFormatter(maximumFractionDigits: number) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits });
}

export function formatMathValue(value: number, maximumFractionDigits = 4) {
  return getNumberFormatter(maximumFractionDigits).format(value);
}

export function formatSignedMathValue(value: number, maximumFractionDigits = 4) {
  if (value === 0) {
    return formatMathValue(0, maximumFractionDigits);
  }

  return `${value > 0 ? "+" : "-"}${formatMathValue(Math.abs(value), maximumFractionDigits)}`;
}

export function formatPercentValue(value: number, maximumFractionDigits = 4) {
  return `${formatMathValue(value, maximumFractionDigits)}%`;
}
