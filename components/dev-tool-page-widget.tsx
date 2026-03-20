"use client";

import { DevToolWidget, type DevToolErrorState } from "@/components/dev-tool-widget";
import {
  decodeBase64,
  decodeURL,
  encodeBase64,
  encodeURL,
  csvToJson,
  formatJSON,
  htmlDecode,
  htmlEncode,
  htmlToMarkdown,
  jsonToCsv,
  jsonToXml,
  jsonToYaml,
  minifyJSON,
  validateJSON,
  xmlToJson,
  yamlToJson,
  type TextMode,
} from "@/lib/conversion/text";

type DevToolPageWidgetProps = {
  actionLabel?: string;
  defaultValue: string;
  mode: TextMode;
  outputStyle?: "panel" | "textarea";
  secondaryActionLabel?: string;
  showCharacterCount?: boolean;
  title: string;
};

type SupportedDevMode =
  | "base64Encode"
  | "base64Decode"
  | "urlEncode"
  | "urlDecode"
  | "htmlEncode"
  | "htmlDecode"
  | "jsonFormat"
  | "jsonMinify"
  | "jsonValidate"
  | "jsonToCsv"
  | "csvToJson"
  | "xmlToJson"
  | "jsonToXml"
  | "htmlToMarkdown"
  | "jsonToYaml"
  | "yamlToJson";

type DevToolConfig = {
  description: string;
  errorHandling?: (output: string, input: string) => DevToolErrorState;
  inputLabel: string;
  outputLabel: string;
  secondaryTransformFunction?: (input: string) => string;
  transformFunction: (input: string) => string;
};

function getDecodeErrorState(
  invalidValue: string,
  helperText: string,
): (output: string, input: string) => DevToolErrorState {
  return (output, input) =>
    input.trim() && output === invalidValue
      ? {
          errorMessage: helperText,
          panelTone: "error",
        }
      : { panelTone: "default" };
}

const jsonInvalidState = getDecodeErrorState("Invalid JSON", "Enter valid JSON to continue.");
const yamlInvalidState = getDecodeErrorState("Invalid YAML", "Enter valid YAML to continue.");

function getPrefixedErrorState(
  prefix: string,
  helperText: string,
): (output: string, input: string) => DevToolErrorState {
  return (output, input) =>
    input.trim() && output.startsWith(prefix)
      ? {
          errorMessage: helperText,
          panelTone: "error",
        }
      : { panelTone: "default" };
}

const csvInvalidState = getPrefixedErrorState("Invalid CSV:", "Enter valid CSV with a header row.");
const jsonPrefixInvalidState = getPrefixedErrorState("Invalid JSON:", "Enter valid JSON to continue.");
const xmlInvalidState = getPrefixedErrorState("Invalid XML:", "Enter valid XML to continue.");

const devToolConfigs: Record<SupportedDevMode, DevToolConfig> = {
  base64Decode: {
    description: "Decode Base64 strings in the browser and copy the plain-text result instantly.",
    errorHandling: getDecodeErrorState(
      "Invalid Base64 string",
      "Enter a valid Base64 string to decode.",
    ),
    inputLabel: "base64 input",
    outputLabel: "decoded text",
    transformFunction: decodeBase64,
  },
  base64Encode: {
    description: "Encode plain text as Base64 for transport, quick testing, or browser-based tooling.",
    inputLabel: "plain text",
    outputLabel: "base64 output",
    transformFunction: encodeBase64,
  },
  csvToJson: {
    description: "Convert CSV rows into formatted JSON arrays for APIs, fixtures, spreadsheets, and cleanup work.",
    errorHandling: csvInvalidState,
    inputLabel: "csv input",
    outputLabel: "json output",
    transformFunction: csvToJson,
  },
  htmlDecode: {
    description: "Decode HTML entities back into readable text or markup characters in the browser.",
    inputLabel: "html entities",
    outputLabel: "decoded output",
    transformFunction: htmlDecode,
  },
  htmlEncode: {
    description: "Escape HTML-sensitive characters into safe entities for docs, templates, and snippets.",
    inputLabel: "html or text",
    outputLabel: "encoded output",
    transformFunction: htmlEncode,
  },
  jsonFormat: {
    description: "Format and validate JSON with a readable pretty-printed result for APIs and configs.",
    errorHandling: jsonInvalidState,
    inputLabel: "json input",
    outputLabel: "formatted json",
    secondaryTransformFunction: minifyJSON,
    transformFunction: formatJSON,
  },
  jsonMinify: {
    description: "Minify JSON by stripping whitespace while keeping the data valid and ready for production use.",
    errorHandling: jsonInvalidState,
    inputLabel: "json input",
    outputLabel: "minified json",
    transformFunction: minifyJSON,
  },
  jsonToCsv: {
    description: "Convert JSON records into CSV with automatic headers for spreadsheets, exports, and quick inspections.",
    errorHandling: jsonPrefixInvalidState,
    inputLabel: "json input",
    outputLabel: "csv output",
    transformFunction: jsonToCsv,
  },
  jsonToXml: {
    description: "Convert JSON data into XML for integrations, feeds, and structured developer workflows.",
    errorHandling: jsonPrefixInvalidState,
    inputLabel: "json input",
    outputLabel: "xml output",
    transformFunction: jsonToXml,
  },
  jsonValidate: {
    description: "Check JSON syntax instantly and get a clear valid or invalid result without leaving the page.",
    errorHandling: (output, input) => {
      if (!input.trim()) {
        return {
          output: "Paste JSON to validate it.",
          panelTone: "default",
        };
      }

      if (output === "Valid JSON") {
        return {
          output: "✔ valid JSON",
          panelTone: "success",
        };
      }

      return {
        output: `❌ ${output}`,
        panelTone: "error",
      };
    },
    inputLabel: "json input",
    outputLabel: "validation result",
    transformFunction: validateJSON,
  },
  htmlToMarkdown: {
    description: "Convert raw HTML into cleaner Markdown for docs, notes, migrations, and copy workflows.",
    inputLabel: "html input",
    outputLabel: "markdown output",
    transformFunction: htmlToMarkdown,
  },
  jsonToYaml: {
    description: "Convert JSON objects into YAML for config files, infrastructure tooling, and readable developer output.",
    errorHandling: jsonInvalidState,
    inputLabel: "json input",
    outputLabel: "yaml output",
    transformFunction: jsonToYaml,
  },
  yamlToJson: {
    description: "Convert YAML into formatted JSON for config migrations, API fixtures, and developer tooling.",
    errorHandling: yamlInvalidState,
    inputLabel: "yaml input",
    outputLabel: "json output",
    transformFunction: yamlToJson,
  },
  xmlToJson: {
    description: "Convert XML into formatted JSON for migrations, payload inspection, and structured-data cleanup.",
    errorHandling: xmlInvalidState,
    inputLabel: "xml input",
    outputLabel: "json output",
    transformFunction: xmlToJson,
  },
  urlDecode: {
    description: "Decode percent-encoded URLs and query strings back into readable text.",
    errorHandling: getDecodeErrorState(
      "Invalid encoded URL",
      "Enter a valid encoded URL to decode.",
    ),
    inputLabel: "encoded url",
    outputLabel: "decoded url",
    transformFunction: decodeURL,
  },
  urlEncode: {
    description: "Encode URLs and query parameters safely for links, APIs, and browser requests.",
    inputLabel: "url or text",
    outputLabel: "encoded output",
    transformFunction: encodeURL,
  },
};

function isSupportedDevMode(mode: TextMode): mode is SupportedDevMode {
  return mode in devToolConfigs;
}

export function DevToolPageWidget({
  actionLabel,
  defaultValue,
  mode,
  outputStyle,
  secondaryActionLabel,
  showCharacterCount = false,
  title,
}: DevToolPageWidgetProps) {
  if (!isSupportedDevMode(mode)) {
    return null;
  }

  const config = devToolConfigs[mode];

  return (
    <DevToolWidget
      actionLabel={actionLabel}
      defaultValue={defaultValue}
      description={config.description}
      errorHandling={config.errorHandling}
      inputLabel={config.inputLabel}
      outputLabel={config.outputLabel}
      outputStyle={outputStyle}
      secondaryActionLabel={secondaryActionLabel}
      secondaryTransformFunction={config.secondaryTransformFunction}
      showCharacterCount={showCharacterCount}
      showClearButton
      showCopyButton
      title={title}
      transformFunction={config.transformFunction}
    />
  );
}
