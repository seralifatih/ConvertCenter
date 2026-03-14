import { describe, expect, it } from "vitest";
import { transformText } from "../../lib/conversion/text";

describe("text transformations", () => {
  const sample = "The quick brown fox jumps over the lazy dog";

  it("converts text to uppercase", () => {
    expect(transformText("uppercase", sample)).toBe(
      "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG",
    );
  });

  it("creates camelCase text", () => {
    expect(transformText("camel", sample)).toBe("theQuickBrownFoxJumpsOverTheLazyDog");
  });

  it("creates snake_case text", () => {
    expect(transformText("snake", sample)).toBe("the_quick_brown_fox_jumps_over_the_lazy_dog");
  });

  it("creates kebab-case text", () => {
    expect(transformText("kebab", sample)).toBe("the-quick-brown-fox-jumps-over-the-lazy-dog");
  });

  it("creates sentence case text", () => {
    expect(transformText("sentence", "hELLO WORLD. tHIS is fine!")).toBe(
      "Hello world. This is fine!",
    );
  });

  it("creates title case from separator-based text", () => {
    expect(transformText("title", "customer_account-status history")).toBe(
      "Customer Account Status History",
    );
  });

  it("creates camelCase from mixed separators and capitals", () => {
    expect(transformText("camel", "customer_account-status History")).toBe(
      "customerAccountStatusHistory",
    );
  });
});
