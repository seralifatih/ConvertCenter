import { describe, expect, it } from "vitest";
import {
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
  csvToJson,
  generateSlug,
  htmlDecode,
  htmlEncode,
  htmlToMarkdown,
  joinLines,
  jsonToCsv,
  jsonToXml,
  jsonToYaml,
  markdownToHtml,
  normalizeUnicode,
  removeDiacritics,
  removeDuplicateLines,
  removeEmptyLines,
  removeEmojis,
  removeExtraSpaces,
  removeLineBreaks,
  removeNonAscii,
  removePunctuation,
  reverseText,
  shuffleLines,
  sortLinesAlphabetically,
  splitTextIntoLines,
  stripHtmlTags,
  transformText,
  xmlToJson,
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

  it("cleans repeated and empty lines", () => {
    expect(transformText("removeDuplicateLines", "alpha\nbeta\nalpha\ngamma\nbeta")).toBe(
      "alpha\nbeta\ngamma",
    );
    expect(removeDuplicateLines("one\none\ntwo")).toBe("one\ntwo");
    expect(transformText("removeEmptyLines", "First\n\nSecond\n   \nThird")).toBe(
      "First\nSecond\nThird",
    );
    expect(removeEmptyLines("A\n\n\nB")).toBe("A\nB");
  });

  it("removes punctuation, html tags, emojis, and non-ascii characters", () => {
    expect(transformText("removePunctuation", "Hello, world! Ready-to-go? Yes.")).toBe(
      "Hello world Ready to go Yes",
    );
    expect(removePunctuation("Hi, there.")).toBe("Hi there");
    expect(transformText("stripHtmlTags", "<p>Hello <strong>world</strong></p>")).toBe(
      "Hello world",
    );
    expect(stripHtmlTags("<div>Alpha <em>Beta</em></div>")).toBe("Alpha Beta");
    expect(transformText("removeEmojis", "Ship it 🚀 Ready ✅")).toBe("Ship it Ready");
    expect(removeEmojis("Done 🎉 now")).toBe("Done now");
    expect(transformText("removeNonAscii", "Cafe deja vu - año")).toBe("Cafe deja vu - ao");
    expect(removeNonAscii("naïve façade")).toBe("nave faade");
  });

  it("normalizes unicode text into a consistent compatibility form", () => {
    expect(transformText("normalizeUnicode", "Cafe\u0301 \uFF21\uFF22\uFF23 \uFB01")).toBe(
      "Caf\u00E9 ABC fi",
    );
    expect(normalizeUnicode("Cafe\u0301")).toBe("Caf\u00E9");
  });

  it("removes diacritics without dropping the base letters", () => {
    expect(transformText("removeDiacritics", "Crème brûlée déjà vu")).toBe(
      "Creme brulee deja vu",
    );
    expect(removeDiacritics("São Paulo")).toBe("Sao Paulo");
  });

  it("sorts, joins, splits, and comma-joins lines", () => {
    expect(transformText("sortLines", "banana\nApple\ncherry")).toBe("Apple\nbanana\ncherry");
    expect(sortLinesAlphabetically("gamma\nBeta\nalpha")).toBe("alpha\nBeta\ngamma");
    const shuffled = shuffleLines("alpha\nbeta\ngamma\ndelta");
    expect(transformText("shuffleLines", "alpha\nbeta\ngamma\ndelta")).toBe(shuffled);
    expect(shuffleLines("alpha\nbeta\ngamma\ndelta")).toBe(shuffled);
    expect(shuffled.split("\n").sort()).toEqual(["alpha", "beta", "delta", "gamma"]);
    expect(transformText("joinLines", "First item\nSecond item\nThird item")).toBe(
      "First item Second item Third item",
    );
    expect(joinLines("One\n\nTwo\n Three ")).toBe("One Two Three");
    expect(transformText("splitText", "apples, oranges, pears")).toBe(
      "apples\noranges\npears",
    );
    expect(splitTextIntoLines("alpha beta gamma")).toBe("alpha\nbeta\ngamma");
    expect(transformText("lineBreaksToCommas", "red\nblue\ngreen")).toBe("red, blue, green");
  });

  it("counts words and characters", () => {
    expect(transformText("wordCount", "Count how many words")).toBe("4");
    expect(countWords(" One   two\tthree ")).toBe(3);
    expect(transformText("characterCount", "abc 123")).toBe("7");
    expect(countCharacters("abc 123")).toBe(7);
  });

  it("counts sentences and paragraphs", () => {
    expect(transformText("sentenceCount", "One. Two! Is this three?")).toBe("3");
    expect(countSentences("Hello world. Another sentence!")).toBe(2);
    expect(transformText("paragraphCount", "First.\n\nSecond.\nStill second.\n\nThird.")).toBe(
      "3",
    );
    expect(countParagraphs("Alpha\n\nBeta")).toBe(2);
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

  it("handles the new developer format transforms", () => {
    expect(transformText("htmlEncode", '<div class="note">Fish & chips</div>')).toBe(
      "&lt;div class=&quot;note&quot;&gt;Fish &amp; chips&lt;/div&gt;",
    );
    expect(htmlEncode("<p>Test</p>")).toBe("&lt;p&gt;Test&lt;/p&gt;");
    expect(transformText("htmlDecode", "&lt;strong&gt;Hi&lt;/strong&gt; &amp; bye")).toBe(
      "<strong>Hi</strong> & bye",
    );
    expect(htmlDecode("&lt;p&gt;Test&lt;/p&gt;")).toBe("<p>Test</p>");
    expect(transformText("jsonToCsv", '[{"name":"Ada","score":42}]')).toBe("name,score\nAda,42");
    expect(jsonToCsv('[{"name":"Ada","score":42}]')).toBe("name,score\nAda,42");
    expect(transformText("csvToJson", "name,score\nAda,42")).toBe(
      '[\n  {\n    "name": "Ada",\n    "score": 42\n  }\n]',
    );
    expect(csvToJson("name,score\nAda,42")).toBe('[\n  {\n    "name": "Ada",\n    "score": 42\n  }\n]');
    expect(transformText("xmlToJson", "<person><name>Ada</name></person>")).toBe(
      '{\n  "person": {\n    "name": "Ada"\n  }\n}',
    );
    expect(xmlToJson("<person><name>Ada</name></person>")).toBe(
      '{\n  "person": {\n    "name": "Ada"\n  }\n}',
    );
    expect(transformText("jsonToXml", '{"person":{"name":"Ada"}}')).toBe(
      "<person>\n  <name>Ada</name>\n</person>",
    );
    expect(jsonToXml('{"person":{"name":"Ada"}}')).toBe("<person>\n  <name>Ada</name>\n</person>");
  });
});
