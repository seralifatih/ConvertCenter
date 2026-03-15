import { parseNumberList } from "@/lib/average";

export type NumberListMetric =
  | "average"
  | "median"
  | "mode"
  | "range"
  | "standardDeviation";

export type NumberListStats = {
  count: number;
  max: number;
  min: number;
  sortedValues: number[];
  values: number[];
};

export function getNumberListStats(values: number[]): NumberListStats | null {
  if (!values.length || values.some((value) => !Number.isFinite(value))) {
    return null;
  }

  const sortedValues = [...values].sort((left, right) => left - right);

  return {
    count: values.length,
    max: sortedValues[sortedValues.length - 1],
    min: sortedValues[0],
    sortedValues,
    values,
  };
}

export function calculateMedian(values: number[]) {
  const stats = getNumberListStats(values);

  if (!stats) {
    return null;
  }

  const middleIndex = Math.floor(stats.sortedValues.length / 2);

  if (stats.sortedValues.length % 2 === 0) {
    return (stats.sortedValues[middleIndex - 1] + stats.sortedValues[middleIndex]) / 2;
  }

  return stats.sortedValues[middleIndex];
}

export function calculateMode(values: number[]) {
  const stats = getNumberListStats(values);

  if (!stats) {
    return null;
  }

  const counts = new Map<number, number>();
  let highestFrequency = 0;

  for (const value of stats.values) {
    const nextCount = (counts.get(value) ?? 0) + 1;
    counts.set(value, nextCount);
    highestFrequency = Math.max(highestFrequency, nextCount);
  }

  if (highestFrequency <= 1) {
    return {
      frequency: 1,
      hasMode: false,
      values: [],
    };
  }

  return {
    frequency: highestFrequency,
    hasMode: true,
    values: [...counts.entries()]
      .filter(([, count]) => count === highestFrequency)
      .map(([value]) => value)
      .sort((left, right) => left - right),
  };
}

export function calculateRange(values: number[]) {
  const stats = getNumberListStats(values);

  if (!stats) {
    return null;
  }

  return stats.max - stats.min;
}

export function calculatePopulationStandardDeviation(values: number[]) {
  const stats = getNumberListStats(values);

  if (!stats) {
    return null;
  }

  const mean = stats.values.reduce((sum, value) => sum + value, 0) / stats.count;
  const variance =
    stats.values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / stats.count;

  return {
    mean,
    standardDeviation: Math.sqrt(variance),
    variance,
  };
}

export function parseStatsInput(input: string) {
  return parseNumberList(input);
}
