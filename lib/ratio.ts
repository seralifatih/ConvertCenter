export type SimplifiedRatio = {
  left: number;
  right: number;
};

export type ProportionResult = {
  missingValue: number;
  ratio: SimplifiedRatio;
};

export function greatestCommonDivisor(a: number, b: number): number {
  let left = Math.abs(Math.trunc(a));
  let right = Math.abs(Math.trunc(b));

  while (right !== 0) {
    const remainder = left % right;
    left = right;
    right = remainder;
  }

  return left || 1;
}

export function simplifyRatio(left: number, right: number): SimplifiedRatio | null {
  if (!Number.isFinite(left) || !Number.isFinite(right) || left === 0 || right === 0) {
    return null;
  }

  if (!Number.isInteger(left) || !Number.isInteger(right)) {
    return null;
  }

  const divisor = greatestCommonDivisor(left, right);

  return {
    left: left / divisor,
    right: right / divisor,
  };
}

export function solveProportion(leftA: number, rightA: number, leftB: number): ProportionResult | null {
  if (
    !Number.isFinite(leftA) ||
    !Number.isFinite(rightA) ||
    !Number.isFinite(leftB) ||
    leftA === 0
  ) {
    return null;
  }

  const missingValue = (rightA * leftB) / leftA;

  if (!Number.isFinite(missingValue)) {
    return null;
  }

  const ratio = simplifyRatio(leftA, rightA);

  return {
    missingValue,
    ratio: ratio ?? { left: leftA, right: rightA },
  };
}
