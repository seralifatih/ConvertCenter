import {
  base64ToImageBlob,
  generateFaviconImages,
  getImageDimensions,
  imageFileToBase64,
  transformImageFile,
} from "@/lib/file-tools/image";
import {
  createPdfFromText,
  extractPdfText,
  mergePdfBytes,
  splitPdfBytes,
} from "@/lib/file-tools/pdf";
import type {
  FileToolControlDefinition,
  FileToolDefinition,
  FileToolDownload,
  FileToolId,
  FileToolResult,
  FileToolSourceDefinition,
  FileToolValidationResult,
} from "@/lib/file-tools/types";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function formatBytes(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function stripExtension(fileName: string) {
  return fileName.replace(/\.[^.]+$/, "");
}

function sanitizeBaseName(fileName: string) {
  const cleaned = stripExtension(fileName).toLowerCase().replace(/[^a-z0-9-]+/g, "-");
  return cleaned.replace(/^-+|-+$/g, "") || "converted-file";
}

function buildFileName(fileName: string, suffix: string, extension: string) {
  return `${sanitizeBaseName(fileName)}-${suffix}.${extension}`;
}

function toBlobPart(bytes: Uint8Array) {
  return Uint8Array.from(bytes);
}

function fileExtension(fileName: string) {
  const match = fileName.toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? `.${match[1]}` : "";
}

function matchesAllowedFile(source: Extract<FileToolSourceDefinition, { kind: "file" }>, file: File) {
  const lowerType = file.type.toLowerCase();
  const lowerExtension = fileExtension(file.name);
  const mimeMatches =
    !source.mimeTypes?.length ||
    source.mimeTypes.some((mimeType) => lowerType === mimeType || lowerType.startsWith(`${mimeType}/`));
  const extensionMatches =
    !source.extensions?.length || source.extensions.includes(lowerExtension);

  return mimeMatches || extensionMatches;
}

function getRequiredFilesMessage(source: Extract<FileToolSourceDefinition, { kind: "file" }>) {
  if (source.multiple) {
    return "Select one or more files before running the tool.";
  }

  return "Select a file before running the tool.";
}

function getControlString(
  controls: Record<string, boolean | string>,
  controlId: string,
  fallback = "",
) {
  const value = controls[controlId];
  return typeof value === "string" ? value : fallback;
}

function getControlNumber(
  controls: Record<string, boolean | string>,
  controlId: string,
  options?: {
    integer?: boolean;
    max?: number;
    min?: number;
    optional?: boolean;
  },
) {
  const rawValue = getControlString(controls, controlId).trim();

  if (!rawValue) {
    if (options?.optional) {
      return undefined;
    }

    throw new Error(`Enter a value for ${controlId.replace(/([A-Z])/g, " $1").toLowerCase()}.`);
  }

  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed)) {
    throw new Error(`"${rawValue}" is not a valid number.`);
  }

  if (options?.integer && !Number.isInteger(parsed)) {
    throw new Error("This field requires a whole number.");
  }

  if (options?.min !== undefined && parsed < options.min) {
    throw new Error(`Value must be at least ${options.min}.`);
  }

  if (options?.max !== undefined && parsed > options.max) {
    throw new Error(`Value must be ${options.max} or less.`);
  }

  return parsed;
}

function getImageOutputMimeType(
  value: string,
  file: File,
): "image/jpeg" | "image/png" | "image/webp" {
  if (value === "original") {
    if (file.type === "image/jpeg") {
      return "image/jpeg";
    }

    if (file.type === "image/webp") {
      return "image/webp";
    }

    return "image/png";
  }

  if (value === "jpeg") {
    return "image/jpeg";
  }

  if (value === "webp") {
    return "image/webp";
  }

  return "image/png";
}

function getImageExtension(mimeType: "image/jpeg" | "image/png" | "image/webp") {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/webp":
      return "webp";
    default:
      return "png";
  }
}

function buildImageConversionResult(
  file: File,
  blob: Blob,
  fileName: string,
  label: string,
  width: number,
  height: number,
  summary: string,
): FileToolResult {
  return {
    detail: `Source size ${formatBytes(file.size)}. Output size ${formatBytes(blob.size)}.`,
    downloads: [{ blob, fileName, label }],
    metrics: [
      { label: "output dimensions", value: `${width} x ${height}` },
      { label: "output size", value: formatBytes(blob.size) },
    ],
    preview: {
      alt: `${label} preview`,
      downloadIndex: 0,
      kind: "image",
      label: "result preview",
    },
    summary,
  };
}

function buildImageControlDefinitions(...controls: FileToolControlDefinition[]) {
  return controls;
}

const sharedImageSource = {
  accept: "image/png,image/jpeg,image/webp,image/svg+xml,.png,.jpg,.jpeg,.webp,.svg",
  extensions: [".png", ".jpg", ".jpeg", ".svg", ".webp"],
  helperText: "Everything runs locally in your browser. Larger files take longer to process.",
  kind: "file",
  label: "image file",
  maxSizeMb: 25,
  mimeTypes: ["image/jpeg", "image/png", "image/svg+xml", "image/webp"],
  preview: "image",
} satisfies Extract<FileToolSourceDefinition, { kind: "file" }>;

const pdfSource = {
  accept: "application/pdf,.pdf",
  extensions: [".pdf"],
  helperText: "PDF processing stays in the browser. Very large documents may take longer to finish.",
  kind: "file",
  label: "PDF file",
  maxSizeMb: 30,
  mimeTypes: ["application/pdf"],
  preview: "list",
} satisfies Extract<FileToolSourceDefinition, { kind: "file" }>;

const multiPdfSource = {
  ...pdfSource,
  helperText: "The files stay in the order you select here, and that order will be used when merging.",
  label: "PDF files",
  maxFiles: 10,
  multiple: true,
} satisfies Extract<FileToolSourceDefinition, { kind: "file" }>;

const fileToolDefinitions: readonly FileToolDefinition[] = [
  {
    actionLabel: "convert to JPG",
    categoryKey: "image",
    hint: "Convert a transparent PNG into a JPG with a white background fill.",
    id: "png-to-jpg",
    source: {
      ...sharedImageSource,
      accept: "image/png,.png",
      extensions: [".png"],
      mimeTypes: ["image/png"],
    },
    title: "PNG to JPG",
    async run({ files }) {
      const [file] = files;
      const result = await transformImageFile(file, {
        backgroundColor: "#ffffff",
        outputMimeType: "image/jpeg",
        quality: 0.92,
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "converted", "jpg"),
        "download JPG",
        result.width,
        result.height,
        `Converted ${file.name} to JPG.`,
      );
    },
  },
  {
    actionLabel: "convert to PNG",
    categoryKey: "image",
    hint: "Turn a JPG image into a lossless PNG for editing, screenshots, or transparent workflows.",
    id: "jpg-to-png",
    source: {
      ...sharedImageSource,
      accept: "image/jpeg,.jpg,.jpeg",
      extensions: [".jpg", ".jpeg"],
      mimeTypes: ["image/jpeg"],
    },
    title: "JPG to PNG",
    async run({ files }) {
      const [file] = files;
      const result = await transformImageFile(file, {
        outputMimeType: "image/png",
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "converted", "png"),
        "download PNG",
        result.width,
        result.height,
        `Converted ${file.name} to PNG.`,
      );
    },
  },
  {
    actionLabel: "resize image",
    categoryKey: "image",
    controls: buildImageControlDefinitions(
      {
        defaultValue: "",
        helpText: "Leave one side empty to scale proportionally from the other side.",
        id: "width",
        label: "target width (px)",
        min: 1,
        placeholder: "1200",
        type: "number",
      },
      {
        defaultValue: "",
        helpText: "Leave empty to preserve the original aspect ratio.",
        id: "height",
        label: "target height (px)",
        min: 1,
        placeholder: "800",
        type: "number",
      },
      {
        defaultValue: "original",
        id: "format",
        label: "output format",
        options: [
          { label: "keep original when possible", value: "original" },
          { label: "PNG", value: "png" },
          { label: "JPG", value: "jpeg" },
          { label: "WEBP", value: "webp" },
        ],
        type: "select",
      },
    ),
    hint: "Resize an image to a new width or height without creating a custom page just for dimensions.",
    id: "image-resizer",
    source: sharedImageSource,
    title: "Image Resizer",
    async run({ controls, files }) {
      const [file] = files;
      const width = getControlNumber(controls, "width", { min: 1, optional: true });
      const height = getControlNumber(controls, "height", { min: 1, optional: true });

      if (!width && !height) {
        throw new Error("Enter a width, a height, or both before resizing.");
      }

      const mimeType = getImageOutputMimeType(getControlString(controls, "format", "original"), file);
      const result = await transformImageFile(file, {
        outputMimeType: mimeType,
        targetHeight: height,
        targetWidth: width,
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "resized", getImageExtension(mimeType)),
        "download resized image",
        result.width,
        result.height,
        `Resized ${file.name} to ${result.width} x ${result.height}.`,
      );
    },
  },
  {
    actionLabel: "compress image",
    categoryKey: "image",
    controls: buildImageControlDefinitions(
      {
        defaultValue: "80",
        helpText: "Lower values create smaller files but add more compression artifacts.",
        id: "quality",
        label: "quality (%)",
        max: 100,
        min: 1,
        step: 1,
        type: "number",
      },
      {
        defaultValue: "",
        helpText: "Optional. Shrink large images further by capping the maximum width.",
        id: "maxWidth",
        label: "max width (px)",
        min: 1,
        placeholder: "1600",
        type: "number",
      },
      {
        defaultValue: "jpeg",
        id: "format",
        label: "output format",
        options: [
          { label: "JPG", value: "jpeg" },
          { label: "WEBP", value: "webp" },
          { label: "PNG", value: "png" },
        ],
        type: "select",
      },
    ),
    hint: "Compress an image locally by lowering quality, reducing width, or both.",
    id: "image-compressor",
    source: sharedImageSource,
    title: "Image Compressor",
    async run({ controls, files }) {
      const [file] = files;
      const qualityPercent = getControlNumber(controls, "quality", {
        max: 100,
        min: 1,
      }) ?? 80;
      const maxWidth = getControlNumber(controls, "maxWidth", {
        min: 1,
        optional: true,
      });
      const mimeType = getImageOutputMimeType(getControlString(controls, "format", "jpeg"), file);
      const dimensions = await getImageDimensions(file);
      const targetWidth = maxWidth ? Math.min(maxWidth, dimensions.width) : undefined;
      const result = await transformImageFile(file, {
        outputMimeType: mimeType,
        quality: mimeType === "image/png" ? undefined : clamp(qualityPercent / 100, 0.01, 1),
        targetWidth,
      });
      const savedBytes = file.size - result.blob.size;
      const savingsPercent = file.size > 0 ? ((savedBytes / file.size) * 100).toFixed(1) : "0.0";

      return {
        detail: `Original size ${formatBytes(file.size)}. Output size ${formatBytes(result.blob.size)}.`,
        downloads: [
          {
            blob: result.blob,
            fileName: buildFileName(file.name, "compressed", getImageExtension(mimeType)),
            label: "download compressed image",
          },
        ],
        metrics: [
          { label: "output dimensions", value: `${result.width} x ${result.height}` },
          { label: "bytes saved", value: savedBytes > 0 ? formatBytes(savedBytes) : "0 B" },
          {
            label: "size change",
            value: savedBytes > 0 ? `${savingsPercent}% smaller` : "larger or equal",
          },
        ],
        preview: {
          alt: "Compressed image preview",
          downloadIndex: 0,
          kind: "image",
          label: "compressed preview",
        },
        summary: `Compressed ${file.name} into a ${getImageExtension(mimeType).toUpperCase()} file.`,
      };
    },
  },
  {
    actionLabel: "crop image",
    categoryKey: "image",
    controls: buildImageControlDefinitions(
      {
        defaultValue: "0",
        helpText: "Horizontal starting point in pixels from the left edge.",
        id: "x",
        label: "crop x (px)",
        min: 0,
        step: 1,
        type: "number",
      },
      {
        defaultValue: "0",
        helpText: "Vertical starting point in pixels from the top edge.",
        id: "y",
        label: "crop y (px)",
        min: 0,
        step: 1,
        type: "number",
      },
      {
        defaultValue: "",
        helpText: "Leave empty to keep the remaining width from the chosen x position.",
        id: "width",
        label: "crop width (px)",
        min: 1,
        step: 1,
        type: "number",
      },
      {
        defaultValue: "",
        helpText: "Leave empty to keep the remaining height from the chosen y position.",
        id: "height",
        label: "crop height (px)",
        min: 1,
        step: 1,
        type: "number",
      },
      {
        defaultValue: "original",
        id: "format",
        label: "output format",
        options: [
          { label: "keep original when possible", value: "original" },
          { label: "PNG", value: "png" },
          { label: "JPG", value: "jpeg" },
          { label: "WEBP", value: "webp" },
        ],
        type: "select",
      },
    ),
    hint: "Crop an image using pixel coordinates from the top-left corner of the source image.",
    id: "crop-image",
    source: sharedImageSource,
    title: "Crop Image",
    async run({ controls, files }) {
      const [file] = files;
      const dimensions = await getImageDimensions(file);
      const x = getControlNumber(controls, "x", { integer: true, min: 0 }) ?? 0;
      const y = getControlNumber(controls, "y", { integer: true, min: 0 }) ?? 0;
      const width = getControlNumber(controls, "width", {
        integer: true,
        min: 1,
        optional: true,
      });
      const height = getControlNumber(controls, "height", {
        integer: true,
        min: 1,
        optional: true,
      });
      const cropWidth = width ?? Math.max(1, dimensions.width - x);
      const cropHeight = height ?? Math.max(1, dimensions.height - y);
      const mimeType = getImageOutputMimeType(getControlString(controls, "format", "original"), file);
      const result = await transformImageFile(file, {
        crop: { height: cropHeight, width: cropWidth, x, y },
        outputMimeType: mimeType,
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "cropped", getImageExtension(mimeType)),
        "download cropped image",
        result.width,
        result.height,
        `Cropped ${file.name} to ${result.width} x ${result.height}.`,
      );
    },
  },
  {
    actionLabel: "rotate image",
    categoryKey: "image",
    controls: buildImageControlDefinitions(
      {
        defaultValue: "90",
        id: "angle",
        label: "rotation",
        options: [
          { label: "90 degrees clockwise", value: "90" },
          { label: "180 degrees", value: "180" },
          { label: "270 degrees clockwise", value: "270" },
        ],
        type: "select",
      },
      {
        defaultValue: "original",
        id: "format",
        label: "output format",
        options: [
          { label: "keep original when possible", value: "original" },
          { label: "PNG", value: "png" },
          { label: "JPG", value: "jpeg" },
          { label: "WEBP", value: "webp" },
        ],
        type: "select",
      },
    ),
    hint: "Rotate an image locally and export it in the format you need next.",
    id: "rotate-image",
    source: sharedImageSource,
    title: "Rotate Image",
    async run({ controls, files }) {
      const [file] = files;
      const angle = getControlNumber(controls, "angle", {
        integer: true,
        max: 270,
        min: 90,
      }) as 90 | 180 | 270;
      const mimeType = getImageOutputMimeType(getControlString(controls, "format", "original"), file);
      const result = await transformImageFile(file, {
        outputMimeType: mimeType,
        rotationDegrees: angle,
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "rotated", getImageExtension(mimeType)),
        "download rotated image",
        result.width,
        result.height,
        `Rotated ${file.name} by ${angle} degrees.`,
      );
    },
  },
  {
    actionLabel: "encode image",
    categoryKey: "image",
    controls: [
      {
        defaultValue: "data-url",
        id: "mode",
        label: "copy output as",
        options: [
          { label: "full data URL", value: "data-url" },
          { label: "raw Base64 only", value: "raw-base64" },
        ],
        type: "select",
      },
    ],
    hint: "Turn an image file into a Base64 string you can paste into CSS, JSON, HTML, or tests.",
    id: "image-to-base64",
    source: sharedImageSource,
    title: "Image to Base64",
    async run({ controls, files }) {
      const [file] = files;
      const mode = getControlString(controls, "mode", "data-url");
      const encoded = await imageFileToBase64(file);
      const outputText = mode === "raw-base64" ? encoded.base64 : encoded.dataUrl;
      const textBlob = new Blob([outputText], { type: "text/plain;charset=utf-8" });

      return {
        copyText: outputText,
        detail: "The encoded string is ready to copy or download as plain text.",
        downloads: [
          {
            blob: textBlob,
            fileName: buildFileName(file.name, "base64", "txt"),
            label: "download Base64 text",
          },
        ],
        metrics: [
          { label: "source size", value: formatBytes(file.size) },
          { label: "encoded length", value: `${outputText.length} characters` },
        ],
        preview: {
          code: true,
          kind: "text",
          label: "Base64 output",
          text: outputText,
        },
        summary: `Encoded ${file.name} as Base64.`,
      };
    },
  },
  {
    actionLabel: "convert to PNG",
    categoryKey: "image",
    hint: "Convert a WEBP image into PNG for design tools, docs, or older image workflows.",
    id: "webp-to-png",
    source: {
      ...sharedImageSource,
      accept: "image/webp,.webp",
      extensions: [".webp"],
      mimeTypes: ["image/webp"],
    },
    title: "WEBP to PNG",
    async run({ files }) {
      const [file] = files;
      const result = await transformImageFile(file, {
        outputMimeType: "image/png",
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "converted", "png"),
        "download PNG",
        result.width,
        result.height,
        `Converted ${file.name} to PNG.`,
      );
    },
  },
  {
    actionLabel: "convert to PNG",
    categoryKey: "image",
    hint: "Rasterize an SVG into a PNG image you can share, upload, or use in a bitmap-only workflow.",
    id: "svg-to-png",
    source: {
      ...sharedImageSource,
      accept: "image/svg+xml,.svg",
      extensions: [".svg"],
      mimeTypes: ["image/svg+xml"],
    },
    title: "SVG to PNG",
    async run({ files }) {
      const [file] = files;
      const result = await transformImageFile(file, {
        outputMimeType: "image/png",
      });

      return buildImageConversionResult(
        file,
        result.blob,
        buildFileName(file.name, "converted", "png"),
        "download PNG",
        result.width,
        result.height,
        `Converted ${file.name} to PNG.`,
      );
    },
  },
  {
    actionLabel: "decode image",
    categoryKey: "image",
    controls: [
      {
        defaultValue: "png",
        helpText: "Used only when the pasted Base64 does not include an image data URL header.",
        id: "fallbackFormat",
        label: "fallback format",
        options: [
          { label: "PNG", value: "png" },
          { label: "JPG", value: "jpeg" },
          { label: "WEBP", value: "webp" },
        ],
        type: "select",
      },
    ],
    hint: "Paste a Base64 string or data URL and turn it back into a downloadable image file.",
    id: "base64-to-image",
    source: {
      defaultValue: "",
      helperText:
        "Paste a full data URL or a raw Base64 string. Unsupported or malformed input will show a clear error.",
      kind: "text",
      label: "Base64 image input",
      placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
      rows: 12,
      spellCheck: false,
    },
    title: "Base64 to Image",
    async run({ controls, textInput }) {
      const fallbackFormat = getControlString(controls, "fallbackFormat", "png");
      const fallbackMimeType =
        fallbackFormat === "jpeg"
          ? "image/jpeg"
          : fallbackFormat === "webp"
            ? "image/webp"
            : "image/png";
      const decoded = await base64ToImageBlob(textInput, fallbackMimeType);
      const fileName = `decoded-image.${decoded.extension}`;

      return {
        copyText: decoded.dataUrl,
        downloads: [
          {
            blob: decoded.blob,
            fileName,
            label: "download decoded image",
          },
        ],
        metrics: [
          { label: "detected type", value: decoded.mimeType },
          { label: "output size", value: formatBytes(decoded.blob.size) },
        ],
        preview: {
          alt: "Decoded image preview",
          downloadIndex: 0,
          kind: "image",
          label: "decoded image",
        },
        summary: `Decoded the Base64 input into ${fileName}.`,
      };
    },
  },
  {
    actionLabel: "generate favicons",
    categoryKey: "image",
    hint: "Create a starter favicon set from one square or rectangular source image.",
    id: "favicon-generator",
    source: sharedImageSource,
    title: "Favicon Generator",
    async run({ files }) {
      const [file] = files;
      const generated = await generateFaviconImages(file);
      const imageDownloads: FileToolDownload[] = generated.outputs.map((output) => ({
        blob: output.blob,
        fileName: output.fileName,
        label: `download ${output.fileName}`,
      }));
      const downloads: FileToolDownload[] = [
        ...imageDownloads,
        {
          blob: new Blob([generated.manifest], { type: "application/manifest+json" }),
          fileName: "site.webmanifest",
          label: "download site.webmanifest",
        },
        {
          blob: new Blob([generated.htmlTags], { type: "text/plain;charset=utf-8" }),
          fileName: "favicon-tags.txt",
          label: "download HTML tags",
        },
      ];

      return {
        copyText: generated.htmlTags,
        detail: "The generated favicon pack includes common browser, Apple, and Android icon sizes.",
        downloads,
        metrics: [
          { label: "generated files", value: `${downloads.length}` },
          { label: "source size", value: formatBytes(file.size) },
        ],
        preview: {
          items: imageDownloads.map((download, index) => ({
            alt: download.fileName,
            downloadIndex: index,
            label: generated.outputs[index]?.label ?? download.fileName,
          })),
          kind: "image-gallery",
          label: "favicon previews",
        },
        summary: `Generated ${generated.outputs.length} favicon images from ${file.name}.`,
      };
    },
  },
  {
    actionLabel: "extract text",
    categoryKey: "file",
    hint: "Pull text out of a PDF locally so you can copy, clean, or search it in the browser.",
    id: "pdf-to-text",
    source: pdfSource,
    title: "PDF to Text",
    async run({ files }) {
      const [file] = files;
      const bytes = new Uint8Array(await file.arrayBuffer());
      const extracted = await extractPdfText(bytes);
      const textBlob = new Blob([extracted.text], { type: "text/plain;charset=utf-8" });

      return {
        copyText: extracted.text,
        downloads: [
          {
            blob: textBlob,
            fileName: buildFileName(file.name, "text", "txt"),
            label: "download text file",
          },
        ],
        metrics: [
          { label: "pages scanned", value: `${extracted.pageCount}` },
          { label: "text length", value: `${extracted.text.length} characters` },
        ],
        preview: {
          kind: "text",
          label: "extracted text",
          text: extracted.text,
        },
        summary: `Extracted text from ${file.name}.`,
      };
    },
  },
  {
    actionLabel: "create PDF",
    categoryKey: "file",
    controls: [
      {
        defaultValue: "",
        helpText: "Optional. This becomes the PDF document title metadata.",
        id: "title",
        label: "document title",
        placeholder: "Meeting notes",
        type: "text",
      },
      {
        defaultValue: "letter",
        id: "pageSize",
        label: "page size",
        options: [
          { label: "US Letter", value: "letter" },
          { label: "A4", value: "a4" },
        ],
        type: "select",
      },
      {
        defaultValue: "12",
        id: "fontSize",
        label: "font size",
        max: 24,
        min: 8,
        step: 1,
        type: "number",
      },
    ],
    hint: "Turn a plain-text note or draft into a simple downloadable PDF.",
    id: "text-to-pdf",
    source: {
      defaultValue:
        "ConvertCenter makes it easy to turn quick notes, outlines, and drafts into a clean PDF.\n\nThis text stays in the browser until you download the final file.",
      helperText: "Paste plain text. Line breaks are preserved and wrapped across pages automatically.",
      kind: "text",
      label: "text content",
      placeholder: "Paste or type the text you want to save as a PDF...",
      rows: 14,
      spellCheck: true,
    },
    title: "Text to PDF",
    async run({ controls, textInput }) {
      const title = getControlString(controls, "title");
      const pageSize = getControlString(controls, "pageSize", "letter");
      const fontSize = getControlNumber(controls, "fontSize", {
        max: 24,
        min: 8,
      });
      const created = await createPdfFromText(textInput, {
        fontSize,
        pageSize: pageSize === "a4" ? "a4" : "letter",
        title,
      });
      const blob = new Blob([toBlobPart(created.bytes)], { type: "application/pdf" });
      const downloadName = `${sanitizeBaseName(title || "text-document")}.pdf`;

      return {
        downloads: [{ blob, fileName: downloadName, label: "download PDF" }],
        metrics: [
          { label: "pages created", value: `${created.pageCount}` },
          { label: "file size", value: formatBytes(blob.size) },
        ],
        preview: {
          items: [
            `Document title: ${title || "Untitled"}`,
            `Page size: ${pageSize.toUpperCase()}`,
            `Font size: ${fontSize} pt`,
          ],
          kind: "list",
          label: "PDF settings",
        },
        summary: `Created a ${created.pageCount}-page PDF from your text.`,
      };
    },
  },
  {
    actionLabel: "merge PDFs",
    categoryKey: "file",
    hint: "Combine several PDF files in the same order you selected them.",
    id: "merge-pdf",
    source: multiPdfSource,
    title: "Merge PDF",
    async run({ files }) {
      const byteSets = await Promise.all(
        files.map(async (file) => new Uint8Array(await file.arrayBuffer())),
      );
      const merged = await mergePdfBytes(byteSets);
      const blob = new Blob([toBlobPart(merged.bytes)], { type: "application/pdf" });

      return {
        downloads: [
          {
            blob,
            fileName: "merged-document.pdf",
            label: "download merged PDF",
          },
        ],
        metrics: [
          { label: "source files", value: `${files.length}` },
          { label: "merged pages", value: `${merged.pageCount}` },
          { label: "file size", value: formatBytes(blob.size) },
        ],
        preview: {
          items: files.map((file) => file.name),
          kind: "list",
          label: "merged in this order",
        },
        summary: `Merged ${files.length} PDF files into one document.`,
      };
    },
  },
  {
    actionLabel: "split PDF",
    categoryKey: "file",
    controls: [
      {
        defaultValue: "",
        helpText: "Examples: 1, 3-5, 8. Leave blank to split every page into its own file.",
        id: "selection",
        label: "page selection",
        placeholder: "1, 3-5",
        type: "text",
      },
    ],
    hint: "Split one PDF into separate pages or page ranges without leaving the browser.",
    id: "split-pdf",
    source: pdfSource,
    title: "Split PDF",
    async run({ controls, files }) {
      const [file] = files;
      const selection = getControlString(controls, "selection");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const split = await splitPdfBytes(bytes, selection);
      const downloads = split.outputs.map((output) => ({
        blob: new Blob([toBlobPart(output.bytes)], { type: "application/pdf" }),
        fileName: `${sanitizeBaseName(file.name)}-${output.label.replace(/\s+/g, "-")}.pdf`,
        label: `download ${output.label}`,
      }));

      return {
        downloads,
        metrics: [
          { label: "source pages", value: `${split.totalPages}` },
          { label: "new files", value: `${downloads.length}` },
        ],
        preview: {
          items: split.outputs.map((output) => output.label),
          kind: "list",
          label: "split output",
        },
        summary: `Split ${file.name} into ${downloads.length} PDF files.`,
      };
    },
  },
];

const fileToolDefinitionMap = new Map(fileToolDefinitions.map((tool) => [tool.id, tool] as const));

export function getFileToolDefinition(toolId: FileToolId) {
  return fileToolDefinitionMap.get(toolId);
}

export function getFileToolDefinitions() {
  return [...fileToolDefinitions];
}

export function getDefaultFileToolControlValues(tool: FileToolDefinition) {
  return Object.fromEntries(
    (tool.controls ?? []).map((control) => [control.id, control.defaultValue]),
  ) as Record<string, boolean | string>;
}

export function getDefaultFileToolTextInput(tool: FileToolDefinition) {
  return tool.source.kind === "text" ? tool.source.defaultValue ?? "" : "";
}

export function validateFileToolInput(
  tool: FileToolDefinition,
  input: {
    files: File[];
    textInput: string;
  },
): FileToolValidationResult {
  const errors: string[] = [];

  if (tool.source.kind === "text") {
    if (!input.textInput.trim()) {
      errors.push("Enter some text before running the tool.");
    }

    return {
      errors,
      isValid: errors.length === 0,
    };
  }

  const source = tool.source;
  const selectedFiles = input.files;

  if (!selectedFiles.length) {
    errors.push(getRequiredFilesMessage(source));
  }

  if (!source.multiple && selectedFiles.length > 1) {
    errors.push("This tool accepts one file at a time.");
  }

  if (source.multiple && source.maxFiles && selectedFiles.length > source.maxFiles) {
    errors.push(`Select ${source.maxFiles} files or fewer.`);
  }

  selectedFiles.forEach((file) => {
    if (source.maxSizeMb && file.size > source.maxSizeMb * 1024 * 1024) {
      errors.push(`${file.name} is larger than ${source.maxSizeMb} MB.`);
    }

    if (!matchesAllowedFile(source, file)) {
      errors.push(`${file.name} does not match the accepted file type.`);
    }
  });

  return {
    errors,
    isValid: errors.length === 0,
  };
}

export { formatBytes };
