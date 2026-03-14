export type ConverterInputState =
  | {
      kind: "empty";
      rawValue: string;
    }
  | {
      kind: "invalid";
      rawValue: string;
      reason: "invalid" | "partial";
    }
  | {
      kind: "valid";
      numericValue: number;
      rawValue: string;
    };

const PARTIAL_NUMBER_PATTERN = /^[+-]?(?:(?:\d+(?:\.\d*)?)|(?:\.\d*))?(?:[eE][+-]?\d*)?$/;

export function getConverterInputState(rawValue: string): ConverterInputState {
  const trimmedValue = rawValue.trim();

  if (!trimmedValue) {
    return {
      kind: "empty",
      rawValue,
    };
  }

  const numericValue = Number(trimmedValue);

  if (Number.isFinite(numericValue)) {
    return {
      kind: "valid",
      numericValue,
      rawValue,
    };
  }

  return {
    kind: "invalid",
    rawValue,
    reason: PARTIAL_NUMBER_PATTERN.test(trimmedValue) ? "partial" : "invalid",
  };
}

export function getConverterInputMessage(inputState: ConverterInputState) {
  if (inputState.kind === "empty") {
    return "Enter a value to convert.";
  }

  if (inputState.kind === "invalid") {
    return inputState.reason === "partial"
      ? "Finish typing the number to keep converting."
      : "Use numbers only in this field.";
  }

  return "";
}
