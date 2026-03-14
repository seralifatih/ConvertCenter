export type AverageResult = {
  average: number;
  count: number;
  sum: number;
  values: number[];
};

export function parseNumberList(input: string) {
  return input
    .split(/[\n,]+/)
    .map((value) => value.trim())
    .filter(Boolean)
    .map(Number)
    .filter((value) => Number.isFinite(value));
}

export function calculateAverage(values: number[]) {
  if (!values.length || values.some((value) => !Number.isFinite(value))) {
    return null;
  }

  const sum = values.reduce((accumulator, value) => accumulator + value, 0);

  return {
    average: sum / values.length,
    count: values.length,
    sum,
    values,
  } satisfies AverageResult;
}
