# File Tool Framework

ConvertCenter's file and image utilities live on the shared interactive-tool path instead of bespoke routes.

## Architecture

- Page content stays in `lib/content/file-tool-pages.ts`
- Runtime tool definitions live in `lib/file-tools/registry.ts`
- Browser-side image helpers live in `lib/file-tools/image.ts`
- Browser-side PDF helpers live in `lib/file-tools/pdf.ts`
- The reusable UI lives in `components/file-tool-widget.tsx`

Each tool is defined by:

- a `toolId`
- one source model (`file`, `multiple file`, or `text`)
- optional controls
- a shared result shape for preview, downloads, copy text, metrics, and warnings

That lets new tools plug into:

- dynamic routes
- metadata and Open Graph images
- search suggestions
- category hubs
- sitemap coverage

## Browser Limits

- Image conversion uses Canvas and browser file APIs, so image processing is client-side only.
- PDF text extraction uses client-side parsing and does not perform OCR.
- Scanned PDFs without embedded text may return little or no useful text.
- Large files can take noticeably longer because processing stays in the browser.

## Extension Notes

- Prefer adding new tools as registry entries before creating any new widget type.
- Only introduce a new widget family when the shared file widget can no longer express the source, controls, or result shape cleanly.
- If future tools need multiple named sources instead of a single source area, extend the source schema rather than creating page-specific state flows.
