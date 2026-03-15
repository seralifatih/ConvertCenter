import { greatestCommonDivisor } from "@/lib/ratio";

export function leastCommonMultiple(left: number, right: number) {
  if (
    !Number.isFinite(left) ||
    !Number.isFinite(right) ||
    !Number.isInteger(left) ||
    !Number.isInteger(right) ||
    left === 0 ||
    right === 0
  ) {
    return null;
  }

  return Math.abs(left * right) / greatestCommonDivisor(left, right);
}
