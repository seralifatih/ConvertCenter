type PdfPageSize = "a4" | "letter";

export type CreatedPdf = {
  bytes: Uint8Array;
  pageCount: number;
};

export type ExtractedPdfText = {
  pageCount: number;
  text: string;
};

export type SplitPdfOutput = {
  bytes: Uint8Array;
  label: string;
  pageNumbers: number[];
};

type EmbeddedFont = {
  heightAtSize: (size: number) => number;
  widthOfTextAtSize: (text: string, size: number) => number;
};

async function loadPdfLib() {
  return import("pdf-lib");
}

async function loadPdfJs() {
  return import("pdfjs-dist/legacy/build/pdf.mjs");
}

function getPageDimensions(pageSize: PdfPageSize) {
  if (pageSize === "a4") {
    return { height: 841.89, width: 595.28 };
  }

  return { height: 792, width: 612 };
}

function normalizeTextInput(value: string) {
  return value.replace(/\r\n/g, "\n").trim();
}

function splitWordToFit(word: string, font: EmbeddedFont, fontSize: number, maxWidth: number) {
  const parts: string[] = [];
  let current = "";

  for (const character of word) {
    const next = `${current}${character}`;

    if (current && font.widthOfTextAtSize(next, fontSize) > maxWidth) {
      parts.push(current);
      current = character;
      continue;
    }

    current = next;
  }

  if (current) {
    parts.push(current);
  }

  return parts;
}

function wrapTextLine(input: string, font: EmbeddedFont, fontSize: number, maxWidth: number) {
  if (!input.trim()) {
    return [""];
  }

  const words = input.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
      const splitWord = splitWordToFit(word, font, fontSize, maxWidth);

      if (currentLine) {
        lines.push(currentLine);
        currentLine = "";
      }

      lines.push(...splitWord.slice(0, -1));
      currentLine = splitWord.at(-1) ?? "";
      continue;
    }

    const nextLine = currentLine ? `${currentLine} ${word}` : word;

    if (font.widthOfTextAtSize(nextLine, fontSize) <= maxWidth) {
      currentLine = nextLine;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    currentLine = word;
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.length ? lines : [""];
}

function buildWrappedLines(
  input: string,
  font: EmbeddedFont,
  fontSize: number,
  maxWidth: number,
) {
  const normalized = input.replace(/\r\n/g, "\n");
  const paragraphs = normalized.split("\n");
  const lines: string[] = [];

  paragraphs.forEach((paragraph, index) => {
    lines.push(...wrapTextLine(paragraph, font, fontSize, maxWidth));

    if (index < paragraphs.length - 1) {
      lines.push("");
    }
  });

  return lines;
}

function formatPageRangeLabel(pageNumbers: number[]) {
  if (pageNumbers.length === 1) {
    return `page ${pageNumbers[0]}`;
  }

  return `pages ${pageNumbers[0]}-${pageNumbers[pageNumbers.length - 1]}`;
}

export function parsePdfPageSelection(selection: string, totalPages: number) {
  const trimmed = selection.trim();

  if (!trimmed) {
    return Array.from({ length: totalPages }, (_, index) => [index + 1]);
  }

  const groups = trimmed
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

  if (!groups.length) {
    throw new Error("Enter page numbers like 1, 3-5, or leave the field blank.");
  }

  const usedPages = new Set<number>();

  return groups.map((group) => {
    const rangeMatch = group.match(/^(\d+)-(\d+)$/);

    if (rangeMatch) {
      const start = Number(rangeMatch[1]);
      const end = Number(rangeMatch[2]);

      if (start < 1 || end > totalPages || start > end) {
        throw new Error(`"${group}" is outside the document page range.`);
      }

      const pages = Array.from({ length: end - start + 1 }, (_, index) => start + index);

      pages.forEach((pageNumber) => {
        if (usedPages.has(pageNumber)) {
          throw new Error("Page selections must not overlap.");
        }

        usedPages.add(pageNumber);
      });

      return pages;
    }

    const pageNumber = Number(group);

    if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      throw new Error(`"${group}" is not a valid page number.`);
    }

    if (usedPages.has(pageNumber)) {
      throw new Error("Page selections must not overlap.");
    }

    usedPages.add(pageNumber);
    return [pageNumber];
  });
}

export async function createPdfFromText(
  text: string,
  options?: {
    fontSize?: number;
    pageSize?: PdfPageSize;
    title?: string;
  },
) {
  const normalizedText = normalizeTextInput(text);

  if (!normalizedText) {
    throw new Error("Enter some text before creating a PDF.");
  }

  const { PDFDocument, StandardFonts, rgb } = await loadPdfLib();
  const pdf = await PDFDocument.create();
  const pageSize = options?.pageSize ?? "letter";
  const fontSize = options?.fontSize ?? 12;
  const { width, height } = getPageDimensions(pageSize);
  const margin = 48;
  const maxWidth = width - margin * 2;
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const lineHeight = Math.max(fontSize * 1.45, font.heightAtSize(fontSize) * 1.35);
  const lines = buildWrappedLines(normalizedText, font, fontSize, maxWidth);
  let page = pdf.addPage([width, height]);
  let cursorY = height - margin;
  let pageCount = 1;

  if (options?.title?.trim()) {
    pdf.setTitle(options.title.trim());
  }

  for (const line of lines) {
    if (cursorY - lineHeight < margin) {
      page = pdf.addPage([width, height]);
      cursorY = height - margin;
      pageCount += 1;
    }

    if (line) {
      page.drawText(line, {
        color: rgb(0.09, 0.11, 0.16),
        font,
        size: fontSize,
        x: margin,
        y: cursorY,
      });
    }

    cursorY -= lineHeight;
  }

  return {
    bytes: await pdf.save(),
    pageCount,
  } satisfies CreatedPdf;
}

export async function mergePdfBytes(documents: Uint8Array[]) {
  if (documents.length < 2) {
    throw new Error("Select at least two PDF files to merge.");
  }

  const { PDFDocument } = await loadPdfLib();
  const mergedPdf = await PDFDocument.create();
  let pageCount = 0;

  for (const documentBytes of documents) {
    const sourcePdf = await PDFDocument.load(documentBytes);
    const copiedPages = await mergedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());

    copiedPages.forEach((page) => {
      mergedPdf.addPage(page);
      pageCount += 1;
    });
  }

  return {
    bytes: await mergedPdf.save(),
    pageCount,
  } satisfies CreatedPdf;
}

export async function splitPdfBytes(documentBytes: Uint8Array, selection: string) {
  const { PDFDocument } = await loadPdfLib();
  const sourcePdf = await PDFDocument.load(documentBytes);
  const totalPages = sourcePdf.getPageCount();
  const groups = parsePdfPageSelection(selection, totalPages);
  const outputs: SplitPdfOutput[] = [];

  for (const group of groups) {
    const nextPdf = await PDFDocument.create();
    const copiedPages = await nextPdf.copyPages(
      sourcePdf,
      group.map((pageNumber) => pageNumber - 1),
    );

    copiedPages.forEach((page) => {
      nextPdf.addPage(page);
    });

    outputs.push({
      bytes: await nextPdf.save(),
      label: formatPageRangeLabel(group),
      pageNumbers: group,
    });
  }

  return {
    outputs,
    totalPages,
  };
}

export async function extractPdfText(documentBytes: Uint8Array) {
  const pdfjs = await loadPdfJs();
  const loadingTask = pdfjs.getDocument({
    data: documentBytes,
    disableWorker: true,
  } as unknown as Parameters<typeof pdfjs.getDocument>[0]);
  const document = await loadingTask.promise;
  const pages: string[] = [];

  for (let pageIndex = 1; pageIndex <= document.numPages; pageIndex += 1) {
    const page = await document.getPage(pageIndex);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    pages.push(pageText ? `Page ${pageIndex}\n${pageText}` : `Page ${pageIndex}`);
  }

  return {
    pageCount: document.numPages,
    text: pages.join("\n\n"),
  } satisfies ExtractedPdfText;
}
