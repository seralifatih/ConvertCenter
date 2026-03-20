import {
  formatRandomColor,
  generateRandomColors,
  generateRandomNames,
  generateRandomNumbers,
  generateRandomPasswords,
  generateRandomTeams,
  type RandomColorFormat,
  type RandomNameStyle,
} from "@/lib/conversion/generator-tools";
import { generateText, type TextGeneratorMode, type TextGeneratorUnit } from "@/lib/conversion/text-generators";
import type {
  GeneratorOutput,
  GeneratorToolDefinition,
  GeneratorToolField,
  GeneratorToolId,
} from "@/lib/generator-tools/types";

function getString(values: Record<string, boolean | string>, id: string, fallback = "") {
  const value = values[id];
  return typeof value === "string" ? value : fallback;
}

function getBoolean(values: Record<string, boolean | string>, id: string, fallback = false) {
  const value = values[id];
  return typeof value === "boolean" ? value : fallback;
}

function getNumber(
  values: Record<string, boolean | string>,
  id: string,
  options?: { max?: number; min?: number },
) {
  const rawValue = getString(values, id).trim();
  const parsed = Number(rawValue);

  if (!rawValue || !Number.isFinite(parsed)) {
    throw new Error(`Enter a valid number for ${id}.`);
  }

  if (options?.min !== undefined && parsed < options.min) {
    throw new Error(`${id} must be at least ${options.min}.`);
  }

  if (options?.max !== undefined && parsed > options.max) {
    throw new Error(`${id} must be ${options.max} or less.`);
  }

  return parsed;
}

function createField(field: GeneratorToolField) {
  return field;
}

function createOutputs(...outputs: GeneratorOutput[]) {
  return outputs;
}

function getGeneratorCopy(mode: TextGeneratorMode) {
  return mode === "lorem" ? "Generated lorem ipsum output." : "Generated repeatable random text output.";
}

function buildTextGeneratorDefinition(
  id: GeneratorToolId,
  mode: TextGeneratorMode,
  title: string,
  hint: string,
  defaultSeed: number,
  defaultCount: number,
) {
  return {
    actionLabel: "generate text",
    defaultSeed,
    fields: [
      createField({
        defaultValue: String(defaultCount),
        id: "count",
        label: "count",
        max: mode === "lorem" ? 12 : 12,
        min: 1,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "paragraphs",
        id: "unit",
        label: "unit",
        options: [
          { label: "paragraphs", value: "paragraphs" },
          { label: "sentences", value: "sentences" },
          { label: "words", value: "words" },
        ],
        type: "select",
      }),
    ],
    hint,
    id,
    run({ random, seed, values }) {
      const count = getNumber(values, "count", { max: 200, min: 1 });
      const unit = getString(values, "unit", "paragraphs") as TextGeneratorUnit;
      const output = generateText(
        mode,
        {
          count,
          seed,
          unit,
        },
        random,
      );

      return {
        metrics: [
          { label: "seed", value: String(seed) },
          { label: "unit", value: unit },
          { label: "count", value: String(count) },
        ],
        outputs: createOutputs({
          label: "generated text",
          value: output,
        }),
        summary: getGeneratorCopy(mode),
      };
    },
    title,
  } satisfies GeneratorToolDefinition;
}

const generatorTools: readonly GeneratorToolDefinition[] = [
  {
    actionLabel: "generate numbers",
    defaultSeed: 17,
    fields: [
      createField({
        defaultValue: "1",
        id: "min",
        label: "minimum",
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "100",
        id: "max",
        label: "maximum",
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "5",
        id: "count",
        label: "count",
        max: 24,
        min: 1,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "0",
        id: "decimals",
        label: "decimal places",
        max: 6,
        min: 0,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: false,
        helpText: "Unique values are available for whole-number output only.",
        id: "unique",
        label: "unique values",
        type: "checkbox",
      }),
    ],
    hint: "Generate one or more random numbers with range, precision, and uniqueness controls.",
    id: "random-number-generator",
    run({ random, values }) {
      const min = getNumber(values, "min");
      const max = getNumber(values, "max");
      const count = getNumber(values, "count", { max: 24, min: 1 });
      const decimals = getNumber(values, "decimals", { max: 6, min: 0 });
      const unique = getBoolean(values, "unique");
      const numbers = generateRandomNumbers(
        {
          count,
          decimals,
          max,
          min,
          unique,
        },
        random,
      );

      return {
        metrics: [
          { label: "range", value: `${min} to ${max}` },
          { label: "generated values", value: String(numbers.length) },
          { label: "precision", value: decimals === 0 ? "whole numbers" : `${decimals} decimals` },
        ],
        outputs: createOutputs({
          label: numbers.length === 1 ? "random number" : "random numbers",
          value: numbers.join("\n"),
        }),
        summary: `Generated ${numbers.length} random number${numbers.length === 1 ? "" : "s"}.`,
      };
    },
    title: "Random Number Generator",
  },
  {
    actionLabel: "generate names",
    defaultSeed: 23,
    fields: [
      createField({
        defaultValue: "6",
        id: "count",
        label: "count",
        max: 20,
        min: 1,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "full",
        id: "style",
        label: "name style",
        options: [
          { label: "full name", value: "full" },
          { label: "first name only", value: "first" },
        ],
        type: "select",
      }),
    ],
    hint: "Generate quick placeholder names for mockups, rosters, demos, and test data.",
    id: "random-name-generator",
    run({ random, values }) {
      const count = getNumber(values, "count", { max: 20, min: 1 });
      const style = getString(values, "style", "full") as RandomNameStyle;
      const names = generateRandomNames({ count, style }, random);

      return {
        metrics: [
          { label: "name style", value: style === "full" ? "full name" : "first name" },
          { label: "ideas", value: String(names.length) },
        ],
        outputs: createOutputs({
          label: "generated names",
          value: names.join("\n"),
        }),
        summary: `Generated ${names.length} placeholder name${names.length === 1 ? "" : "s"}.`,
      };
    },
    title: "Random Name Generator",
  },
  {
    actionLabel: "generate passwords",
    defaultSeed: 41,
    fields: [
      createField({
        defaultValue: "16",
        id: "length",
        label: "password length",
        max: 64,
        min: 4,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "3",
        id: "count",
        label: "password count",
        max: 10,
        min: 1,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: true,
        id: "includeUppercase",
        label: "uppercase letters",
        type: "checkbox",
      }),
      createField({
        defaultValue: true,
        id: "includeLowercase",
        label: "lowercase letters",
        type: "checkbox",
      }),
      createField({
        defaultValue: true,
        id: "includeNumbers",
        label: "numbers",
        type: "checkbox",
      }),
      createField({
        defaultValue: true,
        id: "includeSymbols",
        label: "symbols",
        type: "checkbox",
      }),
    ],
    hint: "Generate local passwords with configurable character sets plus estimated strength and entropy feedback.",
    id: "random-password-generator",
    run({ random, values }) {
      const length = getNumber(values, "length", { max: 64, min: 4 });
      const count = getNumber(values, "count", { max: 10, min: 1 });
      const result = generateRandomPasswords(
        {
          count,
          includeLowercase: getBoolean(values, "includeLowercase", true),
          includeNumbers: getBoolean(values, "includeNumbers", true),
          includeSymbols: getBoolean(values, "includeSymbols", true),
          includeUppercase: getBoolean(values, "includeUppercase", true),
          length,
        },
        random,
      );

      return {
        metrics: [
          { label: "password length", value: String(length) },
          { label: "estimated entropy", value: `${result.entropyBits.toFixed(1)} bits` },
          { label: "strength", value: result.strength.label },
        ],
        notes: result.strength.suggestions,
        outputs: createOutputs({
          label: result.passwords.length === 1 ? "generated password" : "generated passwords",
          value: result.passwords.join("\n"),
        }),
        status: "Passwords are generated locally in the browser.",
        summary: `Generated ${result.passwords.length} password${result.passwords.length === 1 ? "" : "s"}.`,
      };
    },
    title: "Random Password Generator",
  },
  {
    actionLabel: "generate colors",
    defaultSeed: 57,
    fields: [
      createField({
        defaultValue: "5",
        id: "count",
        label: "palette size",
        max: 8,
        min: 1,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "hex",
        id: "format",
        label: "output format",
        options: [
          { label: "HEX", value: "hex" },
          { label: "RGB", value: "rgb" },
          { label: "HSL", value: "hsl" },
        ],
        type: "select",
      }),
    ],
    hint: "Generate a random color palette with copy-ready values and live swatches.",
    id: "random-color-generator",
    run({ random, values }) {
      const count = getNumber(values, "count", { max: 8, min: 1 });
      const format = getString(values, "format", "hex") as RandomColorFormat;
      const colors = generateRandomColors({ count }, random);

      return {
        metrics: [
          { label: "palette size", value: String(colors.length) },
          { label: "format", value: format.toUpperCase() },
        ],
        outputs: createOutputs({
          label: "generated palette",
          value: colors.map((color) => formatRandomColor(color, format)).join("\n"),
        }),
        preview: {
          colors: colors.map((color, index) => ({
            label: `Color ${index + 1}`,
            swatch: color.hex,
            value: formatRandomColor(color, format),
          })),
          kind: "color-palette",
        },
        summary: `Generated ${colors.length} random color${colors.length === 1 ? "" : "s"}.`,
      };
    },
    title: "Random Color Generator",
  },
  {
    actionLabel: "generate teams",
    defaultSeed: 73,
    fields: [
      createField({
        defaultValue: "4",
        id: "teamCount",
        label: "team count",
        max: 12,
        min: 2,
        step: 1,
        type: "number",
      }),
      createField({
        defaultValue: "Ayla\nCem\nDerya\nElif\nEmre\nKaan\nLina\nMert",
        id: "names",
        label: "participants",
        placeholder: "Enter one name per line",
        rows: 10,
        type: "textarea",
      }),
    ],
    hint: "Shuffle a participant list into balanced random teams without leaving the browser.",
    id: "random-team-generator",
    run({ random, values }) {
      const teamCount = getNumber(values, "teamCount", { max: 12, min: 2 });
      const teams = generateRandomTeams(
        {
          names: getString(values, "names"),
          teamCount,
        },
        random,
      );

      return {
        metrics: [
          { label: "teams", value: String(teams.length) },
          {
            label: "participants",
            value: String(teams.reduce((total, team) => total + team.members.length, 0)),
          },
        ],
        outputs: teams.map((team) => ({
          label: team.label,
          value: team.members.join("\n"),
        })),
        summary: `Generated ${teams.length} random team${teams.length === 1 ? "" : "s"}.`,
      };
    },
    title: "Random Team Generator",
  },
  buildTextGeneratorDefinition(
    "random-text-generator",
    "random",
    "Random Text Generator",
    "Generate repeatable random words, sentences, or paragraphs for mockups, demos, and filler states.",
    7,
    3,
  ),
  buildTextGeneratorDefinition(
    "lorem-ipsum-generator",
    "lorem",
    "Lorem Ipsum Generator",
    "Generate classic lorem ipsum filler text with shared generator controls and repeatable output.",
    11,
    2,
  ),
];

const toolMap = new Map(generatorTools.map((tool) => [tool.id, tool] as const));

export function getGeneratorToolDefinition(toolId: GeneratorToolId) {
  return toolMap.get(toolId);
}

export function getGeneratorToolDefinitions() {
  return [...generatorTools];
}

export function getDefaultGeneratorToolValues(tool: GeneratorToolDefinition) {
  return Object.fromEntries(tool.fields.map((field) => [field.id, field.defaultValue])) as Record<
    string,
    boolean | string
  >;
}
