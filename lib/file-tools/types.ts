export type FileToolId =
  | "png-to-jpg"
  | "jpg-to-png"
  | "webp-to-png"
  | "svg-to-png"
  | "image-resizer"
  | "image-compressor"
  | "crop-image"
  | "rotate-image"
  | "image-to-base64"
  | "base64-to-image"
  | "favicon-generator"
  | "pdf-to-text"
  | "text-to-pdf"
  | "merge-pdf"
  | "split-pdf";

export type FileToolCategoryKey = "image" | "file";

export type FileToolControlOption = {
  label: string;
  value: string;
};

export type FileToolControlDefinition = {
  defaultValue: boolean | string;
  helpText?: string;
  id: string;
  label: string;
  max?: number;
  min?: number;
  options?: readonly FileToolControlOption[];
  placeholder?: string;
  rows?: number;
  step?: number;
  type: "checkbox" | "number" | "select" | "text" | "textarea";
};

export type FileToolSourceDefinition =
  | {
      accept: string;
      extensions?: readonly string[];
      helperText?: string;
      kind: "file";
      label: string;
      maxFiles?: number;
      maxSizeMb?: number;
      mimeTypes?: readonly string[];
      multiple?: boolean;
      preview?: "image" | "list";
    }
  | {
      defaultValue?: string;
      helperText?: string;
      kind: "text";
      label: string;
      placeholder: string;
      rows?: number;
      spellCheck?: boolean;
    };

export type FileToolMetric = {
  label: string;
  value: string;
};

export type FileToolDownload = {
  blob: Blob;
  fileName: string;
  label: string;
};

export type FileToolPreview =
  | {
      alt: string;
      downloadIndex: number;
      kind: "image";
      label: string;
    }
  | {
      items: readonly {
        alt: string;
        downloadIndex: number;
        label: string;
      }[];
      kind: "image-gallery";
      label: string;
    }
  | {
      items: readonly string[];
      kind: "list";
      label: string;
    }
  | {
      code?: boolean;
      kind: "text";
      label: string;
      text: string;
    };

export type FileToolResult = {
  copyText?: string;
  detail?: string;
  downloads?: readonly FileToolDownload[];
  metrics?: readonly FileToolMetric[];
  preview?: FileToolPreview;
  summary: string;
  warnings?: readonly string[];
};

export type FileToolRunContext = {
  controls: Record<string, boolean | string>;
  files: File[];
  textInput: string;
};

export type FileToolDefinition = {
  actionLabel: string;
  categoryKey: FileToolCategoryKey;
  controls?: readonly FileToolControlDefinition[];
  hint: string;
  id: FileToolId;
  source: FileToolSourceDefinition;
  title: string;
  run: (context: FileToolRunContext) => Promise<FileToolResult>;
};

export type FileToolValidationResult = {
  errors: string[];
  isValid: boolean;
};
