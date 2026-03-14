import { describe, expect, it } from "vitest";
import {
  getConverterInputMessage,
  getConverterInputState,
} from "../../lib/conversion/converter-input";

describe("converter input state", () => {
  it("treats clearing input as a normal empty state", () => {
    const inputState = getConverterInputState("");

    expect(inputState).toEqual({
      kind: "empty",
      rawValue: "",
    });
    expect(getConverterInputMessage(inputState)).toBe("Enter a value to convert.");
  });

  it("treats partial numeric input as inline-invalid rather than exceptional", () => {
    const inputState = getConverterInputState("1e");

    expect(inputState).toEqual({
      kind: "invalid",
      rawValue: "1e",
      reason: "partial",
    });
    expect(getConverterInputMessage(inputState)).toBe(
      "Finish typing the number to keep converting.",
    );
  });

  it("treats invalid characters as an inline invalid state", () => {
    const inputState = getConverterInputState("12abc");

    expect(inputState).toEqual({
      kind: "invalid",
      rawValue: "12abc",
      reason: "invalid",
    });
    expect(getConverterInputMessage(inputState)).toBe("Use numbers only in this field.");
  });

  it("returns valid numeric state when parsing succeeds", () => {
    expect(getConverterInputState(" 42.5 ")).toEqual({
      kind: "valid",
      numericValue: 42.5,
      rawValue: " 42.5 ",
    });
  });
});
