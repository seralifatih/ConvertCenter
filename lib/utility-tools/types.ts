export type UtilityToolId =
  | "meta-tag-generator"
  | "robots-txt-generator"
  | "sitemap-generator"
  | "keyword-density-checker"
  | "seo-word-counter"
  | "url-parser"
  | "utm-builder"
  | "utm-parser"
  | "hashtag-generator"
  | "username-generator"
  | "instagram-font-generator"
  | "bio-text-formatter"
  | "tweet-length-counter"
  | "password-strength-checker"
  | "color-contrast-checker"
  | "css-gradient-generator"
  | "box-shadow-generator"
  | "border-radius-generator";

export type UtilityCategoryKey = "seo" | "social" | "utility";

export type UtilityToolFieldOption = {
  label: string;
  value: string;
};

export type UtilityToolField = {
  defaultValue: boolean | string;
  helpText?: string;
  id: string;
  label: string;
  max?: number;
  min?: number;
  options?: readonly UtilityToolFieldOption[];
  placeholder?: string;
  rows?: number;
  step?: number;
  type: "checkbox" | "number" | "password" | "select" | "text" | "textarea";
};

export type UtilityMetric = {
  label: string;
  value: string;
};

export type UtilityOutput = {
  copyText?: string;
  label: string;
  value: string;
};

export type UtilityResult = {
  metrics?: readonly UtilityMetric[];
  notes?: readonly string[];
  outputs?: readonly UtilityOutput[];
  status?: string;
  summary: string;
};

export type UtilityToolRunContext = {
  values: Record<string, boolean | string>;
};

export type UtilityFormToolDefinition = {
  actionLabel: string;
  categoryKey: UtilityCategoryKey;
  fields: readonly UtilityToolField[];
  hint: string;
  id: UtilityToolId;
  kind: "form";
  run: (context: UtilityToolRunContext) => UtilityResult;
  title: string;
};

export type UtilityStyleToolDefinition =
  | {
      categoryKey: UtilityCategoryKey;
      hint: string;
      id: "color-contrast-checker";
      kind: "style";
      title: string;
      mode: "contrast";
    }
  | {
      categoryKey: UtilityCategoryKey;
      hint: string;
      id: "css-gradient-generator";
      kind: "style";
      title: string;
      mode: "gradient";
    }
  | {
      categoryKey: UtilityCategoryKey;
      hint: string;
      id: "box-shadow-generator";
      kind: "style";
      title: string;
      mode: "boxShadow";
    }
  | {
      categoryKey: UtilityCategoryKey;
      hint: string;
      id: "border-radius-generator";
      kind: "style";
      title: string;
      mode: "borderRadius";
    };

export type UtilityToolDefinition = UtilityFormToolDefinition | UtilityStyleToolDefinition;
