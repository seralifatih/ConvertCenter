export type TextDiffEntry = {
  kind: "added" | "removed" | "same";
  leftLineNumber?: number;
  rightLineNumber?: number;
  value: string;
};

export type TextDiffResult = {
  addedLineCount: number;
  entries: TextDiffEntry[];
  leftLineCount: number;
  matchingLineCount: number;
  removedLineCount: number;
  rightLineCount: number;
  similarity: number;
};

function splitComparisonLines(value: string) {
  const normalized = value.replace(/\r\n?/g, "\n");
  return normalized ? normalized.split("\n") : [];
}

export function compareTextByLine(leftValue: string, rightValue: string): TextDiffResult {
  const leftLines = splitComparisonLines(leftValue);
  const rightLines = splitComparisonLines(rightValue);
  const matrix = Array.from({ length: leftLines.length + 1 }, () =>
    Array.from({ length: rightLines.length + 1 }, () => 0),
  );

  for (let leftIndex = 1; leftIndex <= leftLines.length; leftIndex += 1) {
    for (let rightIndex = 1; rightIndex <= rightLines.length; rightIndex += 1) {
      matrix[leftIndex][rightIndex] =
        leftLines[leftIndex - 1] === rightLines[rightIndex - 1]
          ? matrix[leftIndex - 1][rightIndex - 1] + 1
          : Math.max(matrix[leftIndex - 1][rightIndex], matrix[leftIndex][rightIndex - 1]);
    }
  }

  const entries: TextDiffEntry[] = [];
  let leftIndex = leftLines.length;
  let rightIndex = rightLines.length;

  while (leftIndex > 0 && rightIndex > 0) {
    if (leftLines[leftIndex - 1] === rightLines[rightIndex - 1]) {
      entries.push({
        kind: "same",
        leftLineNumber: leftIndex,
        rightLineNumber: rightIndex,
        value: leftLines[leftIndex - 1],
      });
      leftIndex -= 1;
      rightIndex -= 1;
      continue;
    }

    if (matrix[leftIndex - 1][rightIndex] >= matrix[leftIndex][rightIndex - 1]) {
      entries.push({
        kind: "removed",
        leftLineNumber: leftIndex,
        value: leftLines[leftIndex - 1],
      });
      leftIndex -= 1;
      continue;
    }

    entries.push({
      kind: "added",
      rightLineNumber: rightIndex,
      value: rightLines[rightIndex - 1],
    });
    rightIndex -= 1;
  }

  while (leftIndex > 0) {
    entries.push({
      kind: "removed",
      leftLineNumber: leftIndex,
      value: leftLines[leftIndex - 1],
    });
    leftIndex -= 1;
  }

  while (rightIndex > 0) {
    entries.push({
      kind: "added",
      rightLineNumber: rightIndex,
      value: rightLines[rightIndex - 1],
    });
    rightIndex -= 1;
  }

  entries.reverse();

  const matchingLineCount = entries.filter((entry) => entry.kind === "same").length;
  const addedLineCount = entries.filter((entry) => entry.kind === "added").length;
  const removedLineCount = entries.filter((entry) => entry.kind === "removed").length;
  const baseLineCount = Math.max(leftLines.length, rightLines.length);

  return {
    addedLineCount,
    entries,
    leftLineCount: leftLines.length,
    matchingLineCount,
    removedLineCount,
    rightLineCount: rightLines.length,
    similarity:
      baseLineCount === 0 ? 100 : Number(((matchingLineCount / baseLineCount) * 100).toFixed(1)),
  };
}
