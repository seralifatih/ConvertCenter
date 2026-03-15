export type ScientificNotationResult = {
  coefficient: number;
  exponent: number;
  normalized: string;
};

export function toScientificNotation(value: number, significantDigits = 6) {
  if (!Number.isFinite(value)) {
    return null;
  }

  if (value === 0) {
    return {
      coefficient: 0,
      exponent: 0,
      normalized: "0 x 10^0",
    } satisfies ScientificNotationResult;
  }

  const exponent = Math.floor(Math.log10(Math.abs(value)));
  const coefficient = value / 10 ** exponent;
  const normalizedCoefficient = Number(coefficient.toPrecision(significantDigits));

  return {
    coefficient: normalizedCoefficient,
    exponent,
    normalized: `${normalizedCoefficient} x 10^${exponent}`,
  } satisfies ScientificNotationResult;
}

export function fromScientificNotation(coefficient: number, exponent: number) {
  if (
    !Number.isFinite(coefficient) ||
    !Number.isFinite(exponent) ||
    !Number.isInteger(exponent)
  ) {
    return null;
  }

  const value = coefficient * 10 ** exponent;
  return Number.isFinite(value) ? value : null;
}
