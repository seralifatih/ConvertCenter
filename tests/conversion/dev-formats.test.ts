import { describe, expect, it } from "vitest";
import {
  csvToJson,
  htmlDecode,
  htmlEncode,
  jsonToCsv,
  jsonToXml,
  xmlToJson,
} from "../../lib/conversion/dev-formats";

describe("developer format helpers", () => {
  it("encodes and decodes HTML entities", () => {
    const encoded = htmlEncode('<button class="primary">Fish & chips</button>');

    expect(encoded).toBe(
      "&lt;button class=&quot;primary&quot;&gt;Fish &amp; chips&lt;/button&gt;",
    );
    expect(htmlDecode(encoded)).toBe('<button class="primary">Fish & chips</button>');
    expect(htmlDecode("Price: &#36;10 &amp; tax")).toBe("Price: $10 & tax");
  });

  it("converts JSON records into CSV with stable headers", () => {
    expect(jsonToCsv('[{"name":"Ada","score":42},{"name":"Lin","score":39}]')).toBe(
      "name,score\nAda,42\nLin,39",
    );
    expect(jsonToCsv('["alpha","beta"]')).toBe("value\nalpha\nbeta");
  });

  it("returns a clear error for malformed JSON when converting to CSV or XML", () => {
    expect(jsonToCsv("{oops")).toMatch(/^Invalid JSON:/);
    expect(jsonToXml("{oops")).toMatch(/^Invalid JSON:/);
  });

  it("converts CSV into formatted JSON and preserves quoted fields", () => {
    expect(csvToJson('name,note\nAda,"Hello, world"')).toBe(
      '[\n  {\n    "name": "Ada",\n    "note": "Hello, world"\n  }\n]',
    );
  });

  it("returns a clear error for malformed CSV", () => {
    expect(csvToJson("name,score\nAda")).toMatch(/^Invalid CSV:/);
  });

  it("converts XML into formatted JSON and keeps attributes", () => {
    expect(
      xmlToJson('<person id="1"><name>Ada</name><roles><role>dev</role><role>ops</role></roles></person>'),
    ).toBe(
      '{\n' +
        '  "person": {\n' +
        '    "@attributes": {\n' +
        '      "id": "1"\n' +
        "    },\n" +
        '    "name": "Ada",\n' +
        '    "roles": {\n' +
        '      "role": [\n' +
        '        "dev",\n' +
        '        "ops"\n' +
        "      ]\n" +
        "    }\n" +
        "  }\n" +
        "}",
    );
  });

  it("returns a clear error for malformed XML", () => {
    expect(xmlToJson("<person><name>Ada</person>")).toMatch(/^Invalid XML:/);
  });

  it("converts JSON into XML with root objects and arrays", () => {
    expect(jsonToXml('{"person":{"name":"Ada","score":42}}')).toBe(
      "<person>\n  <name>Ada</name>\n  <score>42</score>\n</person>",
    );
    expect(jsonToXml('[{"name":"Ada"},{"name":"Lin"}]')).toBe(
      "<root>\n  <item>\n    <name>Ada</name>\n  </item>\n  <item>\n    <name>Lin</name>\n  </item>\n</root>",
    );
  });
});
