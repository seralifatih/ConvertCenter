import { greatestCommonDivisor } from "@/lib/ratio";

export type SimplifiedFraction = {
  denominator: number;
  numerator: number;
};

function normalizeFractionSign(numerator: number, denominator: number): SimplifiedFraction {
  if (denominator < 0) {
    return {
      denominator: Math.abs(denominator),
      numerator: -numerator,
    };
  }

  return {
    denominator,
    numerator,
  };
}

export function simplifyFraction(numerator: number, denominator: number) {
  if (
    !Number.isFinite(numerator) ||
    !Number.isFinite(denominator) ||
    !Number.isInteger(numerator) ||
    !Number.isInteger(denominator) ||
    denominator === 0
  ) {
    return null;
  }

  if (numerator === 0) {
    return {
      denominator: 1,
      numerator: 0,
    } satisfies SimplifiedFraction;
  }

  const divisor = greatestCommonDivisor(numerator, denominator);
  return normalizeFractionSign(numerator / divisor, denominator / divisor);
}

export function fractionToDecimal(numerator: number, denominator: number) {
  const simplified = simplifyFraction(numerator, denominator);

  if (!simplified) {
    return null;
  }

  return simplified.numerator / simplified.denominator;
}

export function decimalToFraction(input: string) {
  const normalizedInput = input.trim().toLowerCase();

  if (!normalizedInput) {
    return null;
  }

  const match = normalizedInput.match(/^([+-])?(?:(\d+)(?:\.(\d*))?|\.(\d+))(?:e([+-]?\d+))?$/);

  if (!match) {
    return null;
  }

  const sign = match[1] === "-" ? -1 : 1;
  const wholePart = match[2] ?? "0";
  const fractionalPart = match[3] ?? match[4] ?? "";
  const exponent = Number(match[5] ?? "0");
  const digits = `${wholePart}${fractionalPart}`.replace(/^0+(?=\d)/, "") || "0";
  let numerator = Number(digits);
  let denominator = 10 ** fractionalPart.length;

  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return null;
  }

  if (exponent > 0) {
    numerator *= 10 ** exponent;
  } else if (exponent < 0) {
    denominator *= 10 ** Math.abs(exponent);
  }

  return simplifyFraction(sign * numerator, denominator);
}
