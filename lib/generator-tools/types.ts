export type GeneratorToolId =
  | "random-number-generator"
  | "random-name-generator"
  | "random-password-generator"
  | "random-color-generator"
  | "random-team-generator"
  | "random-text-generator"
  | "lorem-ipsum-generator";

export type GeneratorFieldOption = {
  label: string;
  value: string;
};

export type GeneratorToolField = {
  defaultValue: boolean | string;
  helpText?: string;
  id: string;
  label: string;
  max?: number;
  min?: number;
  options?: readonly GeneratorFieldOption[];
  placeholder?: string;
  rows?: number;
  step?: number;
  type: "checkbox" | "number" | "select" | "text" | "textarea";
};

export type GeneratorMetric = {
  label: string;
  value: string;
};

export type GeneratorOutput = {
  copyText?: string;
  label: string;
  value: string;
};

export type GeneratorPreview =
  | {
      colors: readonly {
        label: string;
        swatch: string;
        value: string;
      }[];
      kind: "color-palette";
    }
  | {
      kind: "none";
    };

export type GeneratorResult = {
  metrics?: readonly GeneratorMetric[];
  notes?: readonly string[];
  outputs: readonly GeneratorOutput[];
  preview?: GeneratorPreview;
  status?: string;
  summary: string;
};

export type GeneratorToolRunContext = {
  random: () => number;
  seed: number;
  values: Record<string, boolean | string>;
};

export type GeneratorToolDefinition = {
  actionLabel: string;
  defaultSeed: number;
  fields: readonly GeneratorToolField[];
  hint: string;
  id: GeneratorToolId;
  run: (context: GeneratorToolRunContext) => GeneratorResult;
  title: string;
};
