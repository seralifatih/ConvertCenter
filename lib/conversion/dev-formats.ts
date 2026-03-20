type JsonRecord = Record<string, unknown>;

type XmlNode = {
  attributes: Record<string, string>;
  children: XmlNode[];
  name: string;
  textParts: string[];
};

const htmlEntityMap: Record<string, string> = {
  amp: "&",
  apos: "'",
  gt: ">",
  lt: "<",
  nbsp: " ",
  quot: '"',
};

function formatError(prefix: string, error: unknown) {
  const message = error instanceof Error ? error.message : "Unable to process the input.";
  return `${prefix}: ${message}`;
}

function isPlainObject(value: unknown): value is JsonRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function csvEscape(value: unknown) {
  const stringValue =
    value === null || value === undefined
      ? ""
      : isPlainObject(value) || Array.isArray(value)
        ? JSON.stringify(value)
        : String(value);

  return /[",\n\r]/.test(stringValue)
    ? `"${stringValue.replace(/"/g, '""')}"`
    : stringValue;
}

function parseCsvValue(value: string): unknown {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (trimmed === "null") {
    return null;
  }

  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) {
    return Number(trimmed);
  }

  return value;
}

function normalizeJsonRecords(value: unknown): JsonRecord[] {
  if (Array.isArray(value)) {
    if (!value.length) {
      return [];
    }

    if (value.every(isPlainObject)) {
      return value;
    }

    if (value.every((entry) => !isPlainObject(entry) && !Array.isArray(entry))) {
      return value.map((entry) => ({ value: entry }));
    }

    throw new Error("Use a JSON array of objects, a single object, or a flat array of values.");
  }

  if (isPlainObject(value)) {
    return [value];
  }

  if (value === null || ["string", "number", "boolean"].includes(typeof value)) {
    return [{ value }];
  }

  throw new Error("Use a JSON object or array as the input.");
}

function parseCsv(input: string) {
  const rows: string[][] = [];
  let currentField = "";
  let currentRow: string[] = [];
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];
    const nextCharacter = input[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        currentField += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }

      continue;
    }

    if (character === "," && !inQuotes) {
      currentRow.push(currentField);
      currentField = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !inQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      currentRow.push(currentField);
      rows.push(currentRow);
      currentField = "";
      currentRow = [];
      continue;
    }

    currentField += character;
  }

  if (inQuotes) {
    throw new Error("Unclosed quoted field.");
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

function escapeXmlText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function sanitizeXmlName(value: string, fallback = "item") {
  const normalized = value
    .trim()
    .replace(/^[^A-Za-z_]+/, "")
    .replace(/[^A-Za-z0-9_.:-]+/g, "-");

  return normalized || fallback;
}

function parseXmlAttributes(rawAttributes: string) {
  const attributes: Record<string, string> = {};
  const attributePattern = /([A-Za-z_][\w.:-]*)\s*=\s*("([^"]*)"|'([^']*)')/g;

  for (const match of rawAttributes.matchAll(attributePattern)) {
    const [, key, , doubleQuotedValue, singleQuotedValue] = match;
    attributes[key] = doubleQuotedValue ?? singleQuotedValue ?? "";
  }

  const leftover = rawAttributes.replace(attributePattern, "").trim();

  if (leftover) {
    throw new Error(`Unsupported attribute syntax: ${leftover}`);
  }

  return attributes;
}

function attachXmlNode(stack: XmlNode[], rootNodes: XmlNode[], node: XmlNode) {
  if (stack.length) {
    stack[stack.length - 1]?.children.push(node);
    return;
  }

  rootNodes.push(node);
}

function parseXml(input: string): XmlNode {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    throw new Error("Paste XML to continue.");
  }

  const tokenPattern = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\?[\s\S]*?\?>|<\/?[A-Za-z_][\w.:-]*(?:\s+[^<>]*?)?\/?>|[^<]+/g;
  const stack: XmlNode[] = [];
  const rootNodes: XmlNode[] = [];
  let coveredLength = 0;

  for (const match of trimmedInput.matchAll(tokenPattern)) {
    const token = match[0];
    coveredLength += token.length;

    if (token.startsWith("<?") || token.startsWith("<!--")) {
      continue;
    }

    if (token.startsWith("<![CDATA[")) {
      const textValue = token.slice(9, -3);

      if (!stack.length) {
        throw new Error("CDATA content must be inside an element.");
      }

      stack[stack.length - 1]?.textParts.push(textValue);
      continue;
    }

    if (token.startsWith("</")) {
      const closingName = token.slice(2, -1).trim();
      const currentNode = stack.pop();

      if (!currentNode || currentNode.name !== closingName) {
        throw new Error(`Unexpected closing tag: ${closingName}`);
      }

      attachXmlNode(stack, rootNodes, currentNode);
      continue;
    }

    if (token.startsWith("<")) {
      const selfClosing = token.endsWith("/>");
      const rawTagContent = token.slice(1, selfClosing ? -2 : -1).trim();
      const nameMatch = rawTagContent.match(/^([A-Za-z_][\w.:-]*)([\s\S]*)$/);

      if (!nameMatch) {
        throw new Error(`Invalid tag: ${token}`);
      }

      const [, rawName, rawAttributes = ""] = nameMatch;
      const node: XmlNode = {
        attributes: parseXmlAttributes(rawAttributes),
        children: [],
        name: rawName,
        textParts: [],
      };

      if (selfClosing) {
        attachXmlNode(stack, rootNodes, node);
      } else {
        stack.push(node);
      }

      continue;
    }

    if (token.trim()) {
      if (!stack.length) {
        throw new Error("Text content outside the root element is not supported.");
      }

      stack[stack.length - 1]?.textParts.push(token.trim());
    }
  }

  if (coveredLength !== trimmedInput.length) {
    throw new Error("The XML contains unsupported or malformed markup.");
  }

  if (stack.length) {
    throw new Error(`Missing closing tag for <${stack[stack.length - 1]?.name}>.`);
  }

  if (rootNodes.length !== 1) {
    throw new Error("XML must contain exactly one root element.");
  }

  return rootNodes[0];
}

function xmlNodeToJson(node: XmlNode): unknown {
  const textValue = node.textParts.join(" ").trim();

  if (!node.children.length && !Object.keys(node.attributes).length) {
    return textValue || "";
  }

  const result: JsonRecord = {};

  if (Object.keys(node.attributes).length) {
    result["@attributes"] = node.attributes;
  }

  if (textValue) {
    result["#text"] = textValue;
  }

  for (const child of node.children) {
    const existingValue = result[child.name];
    const childValue = xmlNodeToJson(child);

    if (existingValue === undefined) {
      result[child.name] = childValue;
      continue;
    }

    result[child.name] = Array.isArray(existingValue)
      ? [...existingValue, childValue]
      : [existingValue, childValue];
  }

  return result;
}

function renderXmlNode(name: string, value: unknown, depth: number): string {
  const indent = "  ".repeat(depth);
  const tagName = sanitizeXmlName(name);

  if (Array.isArray(value)) {
    return value.map((item) => renderXmlNode(tagName, item, depth)).join("\n");
  }

  if (value === null || value === undefined) {
    return `${indent}<${tagName} />`;
  }

  if (!isPlainObject(value)) {
    return `${indent}<${tagName}>${escapeXmlText(String(value))}</${tagName}>`;
  }

  const attributesSource = value["@attributes"];
  const textSource = value["#text"];
  const attributes =
    isPlainObject(attributesSource)
      ? Object.entries(attributesSource)
          .map(
            ([key, attributeValue]) =>
              ` ${sanitizeXmlName(key, "attr")}="${escapeXmlText(String(attributeValue ?? ""))}"`,
          )
          .join("")
      : "";
  const textValue =
    textSource === undefined || textSource === null ? "" : escapeXmlText(String(textSource));
  const childEntries = Object.entries(value).filter(
    ([key]) => key !== "@attributes" && key !== "#text",
  );

  if (!childEntries.length) {
    return textValue
      ? `${indent}<${tagName}${attributes}>${textValue}</${tagName}>`
      : `${indent}<${tagName}${attributes} />`;
  }

  const childXml = childEntries
    .flatMap(([childName, childValue]) =>
      Array.isArray(childValue)
        ? childValue.map((entry) => renderXmlNode(childName, entry, depth + 1))
        : [renderXmlNode(childName, childValue, depth + 1)],
    )
    .join("\n");
  const textBlock = textValue ? `${"  ".repeat(depth + 1)}${textValue}\n` : "";

  return `${indent}<${tagName}${attributes}>\n${textBlock}${childXml}\n${indent}</${tagName}>`;
}

export function htmlEncode(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function htmlDecode(input: string) {
  return input.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, value) => {
    const normalized = String(value).toLowerCase();

    if (normalized.startsWith("#x")) {
      const codePoint = Number.parseInt(normalized.slice(2), 16);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    if (normalized.startsWith("#")) {
      const codePoint = Number.parseInt(normalized.slice(1), 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    return htmlEntityMap[normalized] ?? entity;
  });
}

export function jsonToCsv(input: string) {
  try {
    const parsed = JSON.parse(input);
    const records = normalizeJsonRecords(parsed);

    if (!records.length) {
      return "";
    }

    const headers = records.reduce<string[]>((allHeaders, record) => {
      for (const key of Object.keys(record)) {
        if (!allHeaders.includes(key)) {
          allHeaders.push(key);
        }
      }

      return allHeaders;
    }, []);
    const lines = [
      headers.map(csvEscape).join(","),
      ...records.map((record) =>
        headers.map((header) => csvEscape(record[header])).join(","),
      ),
    ];

    return lines.join("\n");
  } catch (error) {
    return formatError("Invalid JSON", error);
  }
}

export function csvToJson(input: string) {
  try {
    const rows = parseCsv(input);

    if (!rows.length) {
      throw new Error("CSV must include a header row.");
    }

    const [headerRow, ...dataRows] = rows;
    const headers = headerRow.map((header) => header.trim());

    if (!headers.some(Boolean)) {
      throw new Error("CSV header row cannot be empty.");
    }

    const records = dataRows.map((row, rowIndex) => {
      if (row.length !== headers.length) {
        throw new Error(
          `Row ${rowIndex + 2} has ${row.length} fields, but the header has ${headers.length}.`,
        );
      }

      return headers.reduce<Record<string, unknown>>((record, header, columnIndex) => {
        record[header || `column_${columnIndex + 1}`] = parseCsvValue(row[columnIndex] ?? "");
        return record;
      }, {});
    });

    return JSON.stringify(records, null, 2);
  } catch (error) {
    return formatError("Invalid CSV", error);
  }
}

export function xmlToJson(input: string) {
  try {
    const rootNode = parseXml(input);

    return JSON.stringify(
      {
        [rootNode.name]: xmlNodeToJson(rootNode),
      },
      null,
      2,
    );
  } catch (error) {
    return formatError("Invalid XML", error);
  }
}

export function jsonToXml(input: string) {
  try {
    const parsed = JSON.parse(input);

    if (isPlainObject(parsed) && Object.keys(parsed).length === 1) {
      const [rootName, rootValue] = Object.entries(parsed)[0] ?? ["root", parsed];
      return renderXmlNode(rootName, rootValue, 0);
    }

    if (Array.isArray(parsed)) {
      const childXml = parsed.map((entry) => renderXmlNode("item", entry, 1)).join("\n");
      return `<root>\n${childXml}\n</root>`;
    }

    return renderXmlNode("root", parsed, 0);
  } catch (error) {
    return formatError("Invalid JSON", error);
  }
}
