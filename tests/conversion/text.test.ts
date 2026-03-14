import { describe, expect, it } from "vitest";
import {
  countCharacters,
  countWords,
  generateSlug,
  htmlToMarkdown,
  jsonToYaml,
  markdownToHtml,
  removeExtraSpaces,
  removeLineBreaks,
  reverseText,
  transformText,
  yamlToJson,
} from "../../lib/conversion/text";

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

  it("reverses text characters", () => {
    expect(transformText("reverse", "ConvertCenter")).toBe("retneCtrevnoC");
    expect(reverseText("abc 123")).toBe("321 cba");
  });

  it("removes line breaks and replaces them with spaces", () => {
    expect(transformText("removeLineBreaks", "First line\nSecond line\r\nThird line")).toBe(
      "First line Second line Third line",
    );
    expect(removeLineBreaks("Alpha\nBeta")).toBe("Alpha Beta");
  });

  it("removes extra spaces and trims the result", () => {
    expect(transformText("removeExtraSpaces", "  Too    many   spaces    here  ")).toBe(
      "Too many spaces here",
    );
    expect(removeExtraSpaces("One   two\t\tthree")).toBe("One two three");
  });

  it("counts words and characters", () => {
    expect(transformText("wordCount", "Count how many words")).toBe("4");
    expect(countWords(" One   two\tthree ")).toBe(3);
    expect(transformText("characterCount", "abc 123")).toBe("7");
    expect(countCharacters("abc 123")).toBe(7);
  });

  it("generates clean slugs", () => {
    expect(transformText("slug", "ConvertCenter Slug Generator Example")).toBe(
      "convertcenter-slug-generator-example",
    );
    expect(generateSlug("  Hello, World!  ")).toBe("hello-world");
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

  it("converts markdown into html", () => {
    expect(markdownToHtml("# Hello").trim()).toBe("<h1>Hello</h1>");
    expect(transformText("markdownToHtml", "**Bold**").trim()).toBe("<p><strong>Bold</strong></p>");
  });

  it("converts html into markdown", () => {
    expect(htmlToMarkdown("<h1>Hello</h1>").trim()).toBe("# Hello");
    expect(transformText("htmlToMarkdown", "<p><strong>Bold</strong></p>").trim()).toBe("**Bold**");
  });

  it("converts json into yaml", () => {
    expect(jsonToYaml('{"name":"test"}')).toBe("name: test");
    expect(transformText("jsonToYaml", '{\n  "name": "test"\n}')).toBe("name: test");
    expect(jsonToYaml("{invalid")).toBe("Invalid JSON");
  });

  it("converts yaml into json", () => {
    expect(yamlToJson("name: test")).toBe('{\n  "name": "test"\n}');
    expect(transformText("yamlToJson", "name: test")).toBe('{\n  "name": "test"\n}');
    expect(yamlToJson(": invalid")).toBe("Invalid YAML");
  });
});
