import { describe, expect, it } from "vitest";
import { PDFDocument } from "pdf-lib";
import {
  buildCenteredSquareCrop,
  detectImageMimeTypeFromBytes,
  getFaviconSpecs,
  parseBase64ImageInput,
} from "../../lib/file-tools/image";
import {
  createPdfFromText,
  mergePdfBytes,
  parsePdfPageSelection,
  splitPdfBytes,
} from "../../lib/file-tools/pdf";
import {
  getDefaultFileToolControlValues,
  getFileToolDefinition,
  getFileToolDefinitions,
  validateFileToolInput,
} from "../../lib/file-tools/registry";

const tinyPngBase64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO7+Q3EAAAAASUVORK5CYII=";

describe("file tool helpers", () => {
  it("registers the initial image and file tool set", () => {
    const toolIds = new Set(getFileToolDefinitions().map((tool) => tool.id));

    expect(toolIds).toEqual(
      new Set([
        "png-to-jpg",
        "jpg-to-png",
        "webp-to-png",
        "svg-to-png",
        "image-resizer",
        "image-compressor",
        "crop-image",
        "rotate-image",
        "image-to-base64",
        "base64-to-image",
        "favicon-generator",
        "pdf-to-text",
        "text-to-pdf",
        "merge-pdf",
        "split-pdf",
      ]),
    );
  });

  it("parses Base64 image input from both data URLs and raw payloads", () => {
    const dataUrl = `data:image/png;base64,${tinyPngBase64}`;
    const fromDataUrl = parseBase64ImageInput(dataUrl);
    const fromRaw = parseBase64ImageInput(tinyPngBase64);

    expect(fromDataUrl.mimeType).toBe("image/png");
    expect(fromRaw.mimeType).toBe("image/png");
    expect(detectImageMimeTypeFromBytes(fromRaw.bytes)).toBe("image/png");
    expect(fromRaw.dataUrl.startsWith("data:image/png;base64,")).toBe(true);
  });

  it("builds centered square crops and favicon size definitions", () => {
    expect(buildCenteredSquareCrop(1200, 800)).toEqual({
      height: 800,
      width: 800,
      x: 200,
      y: 0,
    });
    expect(getFaviconSpecs().map((spec) => spec.size)).toEqual([16, 32, 48, 180, 192, 512]);
  });

  it("validates file tool input against type and count rules", () => {
    const pngTool = getFileToolDefinition("png-to-jpg");
    const mergeTool = getFileToolDefinition("merge-pdf");

    expect(pngTool).toBeDefined();
    expect(mergeTool).toBeDefined();

    if (!pngTool || !mergeTool) {
      return;
    }

    const jpgFile = new File([Uint8Array.from([1, 2, 3])], "photo.jpg", { type: "image/jpeg" });
    const pdfFiles = Array.from({ length: 11 }, (_, index) =>
      new File([Uint8Array.from([index + 1])], `file-${index + 1}.pdf`, { type: "application/pdf" }),
    );

    expect(validateFileToolInput(pngTool, { files: [], textInput: "" }).isValid).toBe(false);
    expect(validateFileToolInput(pngTool, { files: [jpgFile], textInput: "" }).isValid).toBe(false);
    expect(validateFileToolInput(mergeTool, { files: pdfFiles, textInput: "" }).isValid).toBe(false);
    expect(getDefaultFileToolControlValues(mergeTool)).toEqual({});
  });

  it("parses split-page selections into distinct groups", () => {
    expect(parsePdfPageSelection("1, 3-4", 5)).toEqual([[1], [3, 4]]);
    expect(parsePdfPageSelection("", 3)).toEqual([[1], [2], [3]]);
    expect(() => parsePdfPageSelection("2-1", 5)).toThrow();
    expect(() => parsePdfPageSelection("1, 1-2", 5)).toThrow();
  });

  it("creates, merges, and splits PDFs with reusable helpers", async () => {
    const created = await createPdfFromText("Hello ConvertCenter");
    const merged = await mergePdfBytes([created.bytes, created.bytes]);
    const split = await splitPdfBytes(merged.bytes, "1, 2");
    const mergedDocument = await PDFDocument.load(merged.bytes);
    const firstSplitDocument = await PDFDocument.load(split.outputs[0].bytes);

    expect(created.pageCount).toBe(1);
    expect(merged.pageCount).toBe(2);
    expect(mergedDocument.getPageCount()).toBe(2);
    expect(split.totalPages).toBe(2);
    expect(split.outputs).toHaveLength(2);
    expect(firstSplitDocument.getPageCount()).toBe(1);
  });
});
