import type { CategoryKey, FaqEntry, StructuredContent } from "@/lib/config/registry/conversion-types";
import type { InteractiveToolPageDefinition } from "@/lib/content/interactive-tools";
import type { FileToolId } from "@/lib/file-tools/types";

type FileToolExample = {
  expression: string;
  note?: string;
  result: string;
};

type FileToolPageSeed = {
  aliases: readonly string[];
  categoryKey: CategoryKey;
  description: string;
  examples: readonly FileToolExample[];
  faq: readonly FaqEntry[];
  keywords: readonly string[];
  metaDescription?: string;
  overview: readonly string[];
  relatedSlugs: readonly string[];
  slug: string;
  supportingNotes: readonly string[];
  title: string;
  toolId: FileToolId;
  useCases: readonly string[];
};

function buildLongDescription(
  title: string,
  overview: readonly string[],
  supportingNotes: readonly string[],
  useCases: readonly string[],
): StructuredContent {
  return {
    sections: [
      {
        heading: "How this tool works",
        paragraphs: overview,
      },
      {
        heading: "Where it is useful",
        listItems: useCases,
        paragraphs: supportingNotes,
      },
    ],
    title: `About the ${title.toLowerCase()}`,
  };
}

const fileToolSeeds: readonly FileToolPageSeed[] = [
  {
    aliases: ["png to jpg", "convert png to jpg", "png to jpeg"],
    categoryKey: "image",
    description:
      "Convert PNG files into JPG images locally with a white background fill for transparent areas.",
    examples: [
      { expression: "Product image PNG", result: "Smaller JPG download for marketplaces" },
      { expression: "Screenshot with transparency", result: "Flat JPG export on a white background" },
      { expression: "Large design asset", result: "Quick JPG version for email or docs" },
    ],
    faq: [
      {
        answer: "Transparent pixels are filled with white because JPG does not support transparency.",
        question: "What happens to transparency when I convert PNG to JPG?",
      },
      {
        answer: "Yes. The conversion happens in the browser and does not upload your image anywhere.",
        question: "Does the PNG to JPG tool run locally?",
      },
      {
        answer: "It is useful when you need a lighter image for uploads, docs, listings, or email attachments.",
        question: "Why would I convert PNG to JPG?",
      },
    ],
    keywords: ["png to jpg", "png to jpeg", "image converter", "browser image conversion"],
    metaDescription:
      "Convert PNG to JPG in your browser with instant download, preview, and white-background transparency handling.",
    overview: [
      "PNG files are great for transparency, but JPG is often easier to share when you need a smaller flat image. This tool handles that conversion in a single browser workflow.",
      "It is especially useful for product photos, docs, email attachments, and other cases where a lightweight JPG is more practical than the original PNG.",
    ],
    relatedSlugs: ["jpg-to-png", "image-compressor", "image-resizer"],
    slug: "png-to-jpg",
    supportingNotes: [
      "The result panel gives you an image preview, file-size feedback, and a direct download action without leaving the page.",
      "Because it is powered by the shared file-tool registry, the same upload and result framework can also handle later image utilities without bespoke routes.",
    ],
    title: "PNG to JPG",
    toolId: "png-to-jpg",
    useCases: [
      "Create lighter product images for uploads and listings.",
      "Flatten screenshots or transparent graphics into a simple JPG.",
      "Convert one-off design exports before sending them in docs or email.",
    ],
  },
  {
    aliases: ["jpg to png", "jpeg to png", "convert jpg to png"],
    categoryKey: "image",
    description:
      "Convert JPG and JPEG files into PNG format locally with a quick preview and download.",
    examples: [
      { expression: "Photo JPG", result: "PNG export for editing or annotation" },
      { expression: "Compressed screenshot", result: "PNG version for cleaner markup workflows" },
      { expression: "Attachment image", result: "Lossless PNG copy for docs" },
    ],
    faq: [
      {
        answer: "The original JPG compression is still baked into the source, but the output is saved as a PNG file.",
        question: "Does converting JPG to PNG restore lost quality?",
      },
      {
        answer: "Use it when you need PNG compatibility for design tools, editing, or markup workflows.",
        question: "When is JPG to PNG useful?",
      },
      {
        answer: "Yes. The source image stays in the browser during the conversion.",
        question: "Is the JPG to PNG conversion private?",
      },
    ],
    keywords: ["jpg to png", "jpeg to png", "convert jpeg to png", "image format converter"],
    overview: [
      "JPG and PNG solve different problems. This page is for the moments when you already have a JPG but need a PNG file to match the next tool or workflow.",
      "It keeps the flow simple: upload, preview, download, and move on without opening a design app or writing a script.",
    ],
    relatedSlugs: ["png-to-jpg", "image-resizer", "image-to-base64"],
    slug: "jpg-to-png",
    supportingNotes: [
      "The shared widget shows the output dimensions and size right next to the preview so you can verify the result quickly.",
      "Because the processing happens on the client, it is also a comfortable choice for internal or private images.",
    ],
    title: "JPG to PNG",
    toolId: "jpg-to-png",
    useCases: [
      "Create PNG copies for docs, design notes, or annotations.",
      "Convert attachments into a format that fits your next tool.",
      "Save a browser-friendly PNG without leaving the page.",
    ],
  },
  {
    aliases: ["webp to png", "convert webp to png"],
    categoryKey: "image",
    description:
      "Convert WEBP images into PNG for editors, presentations, and workflows that still expect PNG files.",
    examples: [
      { expression: "Downloaded WEBP hero image", result: "PNG version for slides or docs" },
      { expression: "Marketing asset from a CDN", result: "PNG export for editing" },
      { expression: "WEBP screenshot", result: "PNG file for a broader compatibility workflow" },
    ],
    faq: [
      {
        answer: "WEBP is widely supported, but some editors, docs, and internal workflows still prefer PNG.",
        question: "Why convert WEBP to PNG?",
      },
      {
        answer: "Yes. The result is a PNG file and can be downloaded or reused immediately.",
        question: "Does this tool keep the result as PNG?",
      },
      {
        answer: "Yes. The conversion runs locally in the browser with no file upload requirement.",
        question: "Is WEBP to PNG processed locally?",
      },
    ],
    keywords: ["webp to png", "convert webp to png", "webp converter"],
    overview: [
      "WEBP is a strong web-delivery format, but it is not always the easiest file type to reuse in docs, screenshots, or editor workflows. This converter bridges that gap quickly.",
      "The page is built for practical browser-side use, not bulk asset pipelines, so the workflow stays simple and private.",
    ],
    relatedSlugs: ["jpg-to-png", "svg-to-png", "image-compressor"],
    slug: "webp-to-png",
    supportingNotes: [
      "The shared file widget makes it easy to compare size and dimensions at a glance before downloading the new image.",
      "It also gives the image hub a reusable path for later format and optimization tools without route sprawl.",
    ],
    title: "WEBP to PNG",
    toolId: "webp-to-png",
    useCases: [
      "Convert downloaded WEBP assets into a more familiar PNG format.",
      "Prepare images for editors or docs that expect PNG output.",
      "Quickly re-export browser assets without extra software.",
    ],
  },
  {
    aliases: ["svg to png", "convert svg to png"],
    categoryKey: "image",
    description: "Turn SVG artwork into PNG with a browser-based raster export workflow.",
    examples: [
      { expression: "Logo SVG", result: "PNG copy for slides and docs" },
      { expression: "Illustration asset", result: "Raster image for upload fields" },
      { expression: "Simple icon", result: "PNG file for platforms that reject SVG" },
    ],
    faq: [
      {
        answer: "It rasterizes the SVG into a PNG image so you can use it in places that do not accept vector files.",
        question: "What does SVG to PNG actually change?",
      },
      {
        answer: "It is useful for presentation decks, upload forms, CMS fields, and other workflows that still expect bitmap files.",
        question: "When would I need an SVG to PNG converter?",
      },
      {
        answer: "Yes. The SVG is processed locally in the browser and then turned into a downloadable PNG.",
        question: "Does the conversion happen locally?",
      },
    ],
    keywords: ["svg to png", "convert svg to png", "vector to png"],
    overview: [
      "SVG is ideal for crisp vector artwork, but many everyday tools still ask for PNG. This page helps you make that jump without opening a graphics editor.",
      "It is a practical fit for logos, icons, simple illustrations, and UI assets that need a fast raster version.",
    ],
    relatedSlugs: ["png-to-jpg", "favicon-generator", "image-resizer"],
    slug: "svg-to-png",
    supportingNotes: [
      "Because the tool uses the shared image framework, you get the same upload, preview, and download actions as the other image utilities.",
      "That consistency matters as the image category grows into more resizing, favicon, and optimization tasks.",
    ],
    title: "SVG to PNG",
    toolId: "svg-to-png",
    useCases: [
      "Export logos and icons for upload fields that reject SVG.",
      "Create raster copies for decks, docs, or screenshots.",
      "Bridge vector assets into a bitmap-only workflow quickly.",
    ],
  },
  {
    aliases: ["image resizer", "resize image online", "photo resizer"],
    categoryKey: "image",
    description:
      "Resize an image by width, height, or both with instant preview and output dimensions.",
    examples: [
      { expression: "Set width to 1200 px", result: "Proportional resize for a web banner" },
      { expression: "Set height only", result: "Scaled image that keeps the original ratio" },
      { expression: "Set width and height", result: "Exact-size export for a fixed slot" },
    ],
    faq: [
      {
        answer: "Yes. Leave one side blank and the tool scales the other dimension proportionally.",
        question: "Can I resize with only one dimension?",
      },
      {
        answer: "Yes. The tool lets you keep the original format when practical or export to PNG, JPG, or WEBP.",
        question: "Can I change the output format while resizing?",
      },
      {
        answer: "It is useful for blog images, CMS uploads, emails, decks, and other size-constrained layouts.",
        question: "What is the image resizer best for?",
      },
    ],
    keywords: ["image resizer", "resize image", "change image dimensions"],
    overview: [
      "Image resizing is one of the most common browser-side tasks because file slots, article layouts, and CMS rules rarely use the same dimensions. This tool keeps that workflow fast and local.",
      "Instead of opening a heavy editor for a one-off resize, you can upload the image, adjust the target size, and download the result immediately.",
    ],
    relatedSlugs: ["image-compressor", "crop-image", "rotate-image"],
    slug: "image-resizer",
    supportingNotes: [
      "The result panel shows the output width, height, and size so you can confirm the resized image before saving it.",
      "The same registry-based widget also supports later image operations, which keeps the category scalable without custom page logic.",
    ],
    title: "Image Resizer",
    toolId: "image-resizer",
    useCases: [
      "Prepare images for CMS, blog, or marketplace upload limits.",
      "Resize screenshots or graphics for docs and presentations.",
      "Match fixed design slots without opening a full editor.",
    ],
  },
  {
    aliases: ["image compressor", "compress image online", "reduce image size"],
    categoryKey: "image",
    description:
      "Compress an image locally by adjusting quality and optional width limits in one shared browser tool.",
    examples: [
      { expression: "JPG quality at 80%", result: "Smaller upload-friendly image" },
      { expression: "WEBP output with a max width", result: "More aggressive size reduction" },
      { expression: "PNG output", result: "Lossless format choice when you want compatibility" },
    ],
    faq: [
      {
        answer: "Lower quality settings usually reduce file size more, but they can introduce visible artifacts in lossy formats like JPG and WEBP.",
        question: "How does the quality setting affect compression?",
      },
      {
        answer: "Often yes. Lowering quality helps, and capping the width can reduce large images even further.",
        question: "Should I also shrink the width when compressing?",
      },
      {
        answer: "It is useful for uploads, email attachments, CMS media libraries, and any workflow where image size matters.",
        question: "When should I use an image compressor?",
      },
    ],
    keywords: ["image compressor", "compress image", "reduce image size"],
    overview: [
      "Image compression is more useful when it shows the size change clearly instead of just handing back a new file. This page focuses on that before-and-after workflow.",
      "It lets you control format, quality, and optional width reduction in the same shared interface, which covers most everyday compression tasks.",
    ],
    relatedSlugs: ["image-resizer", "png-to-jpg", "rotate-image"],
    slug: "image-compressor",
    supportingNotes: [
      "Because everything happens in the browser, it is a good fit for private images and quick one-off upload prep.",
      "The registry-first architecture also means future file tools can reuse the same result and validation model instead of inventing new page logic.",
    ],
    title: "Image Compressor",
    toolId: "image-compressor",
    useCases: [
      "Reduce large image uploads before publishing or sending them.",
      "Shrink screenshots and marketing assets for docs and email.",
      "Test JPG, WEBP, and PNG output sizes without extra software.",
    ],
  },
  {
    aliases: ["crop image", "image crop tool", "crop photo online"],
    categoryKey: "image",
    description:
      "Crop an image by pixel coordinates using a reusable browser-side file tool workflow.",
    examples: [
      { expression: "Trim margins from a screenshot", result: "Focused crop for docs or bug reports" },
      { expression: "Cut a square out of a banner", result: "Targeted image for an avatar or card" },
      { expression: "Crop from a fixed x and y point", result: "Consistent export for repeated assets" },
    ],
    faq: [
      {
        answer: "The crop values use pixel coordinates measured from the top-left corner of the source image.",
        question: "How do the crop coordinates work?",
      },
      {
        answer: "Yes. If width or height is blank, the tool keeps the remaining area from that starting position.",
        question: "Can I leave crop width or height empty?",
      },
      {
        answer: "It is useful for screenshots, profile images, tight product crops, and one-off content cleanup.",
        question: "When is a basic crop tool enough?",
      },
    ],
    keywords: ["crop image", "image crop tool", "crop photo"],
    overview: [
      "Not every crop job needs a full editor. Many times you already know the rough area you want and just need a fast browser-side way to cut it out.",
      "This page uses the shared file-tool framework to handle upload, validation, preview, and export while keeping the crop inputs explicit and predictable.",
    ],
    relatedSlugs: ["image-resizer", "rotate-image", "favicon-generator"],
    slug: "crop-image",
    supportingNotes: [
      "A coordinate-based crop tool is also a good foundation for richer future interfaces because the processing logic is already centralized in the shared image layer.",
      "That means the roadmap can grow into more advanced image editing without rebuilding the route and result model from scratch.",
    ],
    title: "Crop Image",
    toolId: "crop-image",
    useCases: [
      "Trim screenshots before sharing them in docs or tickets.",
      "Create focused crops for cards, avatars, and product snippets.",
      "Repeat predictable crops across similar images.",
    ],
  },
  {
    aliases: ["rotate image", "rotate photo online", "turn image 90 degrees"],
    categoryKey: "image",
    description:
      "Rotate an image locally by 90, 180, or 270 degrees with instant preview and download.",
    examples: [
      { expression: "Rotate 90 degrees", result: "Portrait screenshot corrected for sharing" },
      { expression: "Rotate 180 degrees", result: "Upside-down photo fixed quickly" },
      { expression: "Rotate and export as PNG", result: "Fresh file in the format you need next" },
    ],
    faq: [
      {
        answer: "It supports 90, 180, and 270 degree turns because those are the most common quick-fix rotations.",
        question: "Which rotations does this image tool support?",
      },
      {
        answer: "Yes. You can keep the original format when possible or export to PNG, JPG, or WEBP.",
        question: "Can I rotate and change format at the same time?",
      },
      {
        answer: "It is especially handy for screenshots, photos, scans, and quick file clean-up before sharing.",
        question: "When would I use the rotate image tool?",
      },
    ],
    keywords: ["rotate image", "rotate photo", "turn image"],
    overview: [
      "Rotation is one of those tiny tasks that still breaks flow when you have to open a full editor for it. This page keeps the fix small and immediate.",
      "The shared file-tool widget handles the upload and download pieces, while the image processor focuses on rotating the canvas cleanly.",
    ],
    relatedSlugs: ["crop-image", "image-resizer", "png-to-jpg"],
    slug: "rotate-image",
    supportingNotes: [
      "Because the result panel shows the rotated preview before download, it is easy to confirm orientation without trial and error.",
      "That same preview and action model also makes the image category feel consistent across every file-based tool added later.",
    ],
    title: "Rotate Image",
    toolId: "rotate-image",
    useCases: [
      "Fix sideways screenshots or phone photos quickly.",
      "Rotate scans and attachments before sending them on.",
      "Export the corrected image in the format your next tool expects.",
    ],
  },
  {
    aliases: ["image to base64", "convert image to base64", "image base64 encoder"],
    categoryKey: "image",
    description:
      "Encode an image as Base64 or a data URL directly in the browser with copy and download actions.",
    examples: [
      { expression: "Small icon PNG", result: "Copy-ready Base64 for tests or inline markup" },
      { expression: "Choose data URL mode", result: "Paste directly into HTML or CSS" },
      { expression: "Choose raw Base64 mode", result: "Use the payload without the data prefix" },
    ],
    faq: [
      {
        answer: "Data URL mode includes the leading data:image/...;base64, prefix, while raw Base64 mode gives you only the encoded payload.",
        question: "What is the difference between data URL and raw Base64 output?",
      },
      {
        answer: "It is useful for inline HTML, CSS, test fixtures, JSON samples, and other browser-side developer workflows.",
        question: "When would I convert an image to Base64?",
      },
      {
        answer: "Yes. The encoding happens locally and the output can be copied or downloaded immediately.",
        question: "Does the image to Base64 encoder run in the browser?",
      },
    ],
    keywords: ["image to base64", "base64 image encoder", "data url generator"],
    overview: [
      "Encoding an image to Base64 is a common bridge between design assets and developer workflows. This page keeps that bridge small, local, and copy-friendly.",
      "You can choose either a full data URL or the raw payload, which covers most markup, CSS, JSON, and test-fixture use cases.",
    ],
    relatedSlugs: ["base64-to-image", "svg-to-png", "jpg-to-png"],
    slug: "image-to-base64",
    supportingNotes: [
      "The result panel is designed to surface the long output cleanly while still giving you a download fallback if you do not want to copy it directly.",
      "This same pattern should scale well into later developer-facing file utilities because the output model is already structured for copy and download actions.",
    ],
    title: "Image to Base64",
    toolId: "image-to-base64",
    useCases: [
      "Generate inline image strings for HTML, CSS, or email templates.",
      "Create test fixtures from small icons and screenshots.",
      "Copy either raw Base64 or a full data URL without extra tooling.",
    ],
  },
  {
    aliases: ["base64 to image", "decode base64 image", "data url to image"],
    categoryKey: "image",
    description:
      "Decode a Base64 string or image data URL back into a downloadable image file.",
    examples: [
      { expression: "Paste a PNG data URL", result: "Immediate image preview and download" },
      { expression: "Paste raw Base64 with PNG fallback", result: "Decoded PNG file" },
      { expression: "Paste raw Base64 with JPG fallback", result: "Decoded JPG file" },
    ],
    faq: [
      {
        answer: "Use the fallback format only when the pasted value does not already include a data URL header with its own image type.",
        question: "Why does the Base64 to image tool ask for a fallback format?",
      },
      {
        answer: "Yes. If the input is malformed or the file type cannot be supported, the page shows a clear error instead of failing silently.",
        question: "Does the decoder handle invalid Base64 input?",
      },
      {
        answer: "It is useful when someone shares an inline asset, a test fixture, or a long image payload that you need to turn back into a normal file.",
        question: "When would I decode Base64 back into an image?",
      },
    ],
    keywords: ["base64 to image", "decode image data url", "base64 image decoder"],
    overview: [
      "Base64 strings are convenient for transport, but they are awkward to reuse as normal image files. This page reverses that process and keeps the result easy to preview and download.",
      "It supports both full data URLs and raw Base64 payloads, which makes it practical for developer samples and copied browser data alike.",
    ],
    relatedSlugs: ["image-to-base64", "png-to-jpg", "jpg-to-png"],
    slug: "base64-to-image",
    supportingNotes: [
      "The shared file-tool framework makes room for parser errors, preview output, and download actions in one consistent layout.",
      "That reusable error and result model will matter even more as later binary and file tools join the site.",
    ],
    title: "Base64 to Image",
    toolId: "base64-to-image",
    useCases: [
      "Turn copied data URLs back into normal image files.",
      "Decode inline assets from tests, JSON samples, or templates.",
      "Preview a Base64 image before downloading it.",
    ],
  },
  {
    aliases: ["favicon generator", "generate favicon", "website favicon generator"],
    categoryKey: "image",
    description:
      "Generate a starter favicon pack from one source image with preview, downloads, and copy-ready HTML tags.",
    examples: [
      { expression: "Upload a square logo", result: "Common favicon PNG sizes plus web manifest" },
      { expression: "Upload a rectangular logo", result: "Centered square crop for favicon output" },
      { expression: "Copy the generated tag snippet", result: "Quick install into a site head section" },
    ],
    faq: [
      {
        answer: "The generator creates several common PNG sizes plus a simple site.webmanifest file and a copy-ready tag snippet.",
        question: "What files does the favicon generator create?",
      },
      {
        answer: "Yes. A centered square crop is used so a rectangular source can still become a usable favicon set.",
        question: "Can I use a non-square source image for favicon generation?",
      },
      {
        answer: "It is a practical starting pack for small sites, prototypes, and landing pages that need quick favicon coverage.",
        question: "Who is the favicon generator best for?",
      },
    ],
    keywords: ["favicon generator", "website icon generator", "generate favicon pack"],
    overview: [
      "Favicon setup is one of those small website tasks that is repetitive enough to deserve a dedicated shared tool. This page takes a single source image and produces a practical starter pack.",
      "It also demonstrates why a reusable file-tool framework matters: the same upload, preview, and multi-download flow can support many later site-asset utilities.",
    ],
    relatedSlugs: ["svg-to-png", "image-resizer", "png-to-jpg"],
    slug: "favicon-generator",
    supportingNotes: [
      "The result panel is built for multi-file output, which is useful here and will also help later tools like sprite or asset generators.",
      "Copy-ready tags and manifest output keep the workflow useful even when you are moving fast on a simple site build.",
    ],
    title: "Favicon Generator",
    toolId: "favicon-generator",
    useCases: [
      "Create a favicon pack for a new site or landing page.",
      "Generate common icon sizes without manual resizing.",
      "Copy install-ready favicon tags in the same workflow.",
    ],
  },
  {
    aliases: ["pdf to text", "extract text from pdf", "pdf text extractor"],
    categoryKey: "file",
    description:
      "Extract text from a PDF locally with copy and download actions in a shared browser-based file tool.",
    examples: [
      { expression: "Upload a short document PDF", result: "Copyable page-by-page text output" },
      { expression: "Export the extracted text as TXT", result: "Simple handoff into cleanup tools" },
      { expression: "Scan a multi-page PDF", result: "One combined text result with page markers" },
    ],
    faq: [
      {
        answer: "It extracts embedded text content. Pure image-only scanned PDFs may not yield useful text without OCR.",
        question: "Does PDF to text work on every PDF?",
      },
      {
        answer: "The page adds page markers in the output so long documents are easier to scan and reuse.",
        question: "How is the extracted PDF text organized?",
      },
      {
        answer: "It is useful for pulling content into notes, docs, text cleanup tools, or quick browser-side review.",
        question: "When would I use a PDF to text tool?",
      },
    ],
    keywords: ["pdf to text", "extract text from pdf", "pdf text extractor"],
    overview: [
      "PDF text extraction is a natural fit for a shared file framework because it needs upload, validation, long-form text output, and copy or download actions in one place.",
      "This page is built for fast reference work, not deep OCR pipelines, so it focuses on client-side extraction from PDFs that already contain text layers.",
    ],
    relatedSlugs: ["text-to-pdf", "merge-pdf", "split-pdf"],
    slug: "pdf-to-text",
    supportingNotes: [
      "The output can be copied immediately or downloaded as a plain text file, which makes it easy to feed into ConvertCenter's text tools afterward.",
      "Browser-only PDF text extraction also keeps the architecture lightweight while still covering a common file utility need.",
    ],
    title: "PDF to Text",
    toolId: "pdf-to-text",
    useCases: [
      "Pull text out of a PDF for editing or cleanup.",
      "Move content from a document into notes or docs quickly.",
      "Save extracted text as TXT without leaving the browser.",
    ],
  },
  {
    aliases: ["text to pdf", "create pdf from text", "text file to pdf"],
    categoryKey: "file",
    description:
      "Create a clean PDF from plain text with simple page-size and font-size controls.",
    examples: [
      { expression: "Paste meeting notes", result: "Simple PDF for sharing or archiving" },
      { expression: "Set A4 page size", result: "PDF sized for an international print workflow" },
      { expression: "Add a document title", result: "Named PDF metadata and cleaner download file" },
    ],
    faq: [
      {
        answer: "Plain text line breaks are preserved and wrapped across pages automatically.",
        question: "How does the text to PDF tool handle line breaks?",
      },
      {
        answer: "Yes. You can pick either US Letter or A4 in the same shared calculator-style widget.",
        question: "Can I choose the PDF page size?",
      },
      {
        answer: "It is useful for notes, outlines, drafts, quick exports, and any simple text handoff that should become a PDF.",
        question: "When is a basic text to PDF tool enough?",
      },
    ],
    keywords: ["text to pdf", "create pdf from text", "plain text to pdf"],
    overview: [
      "Turning text into PDF does not need a bespoke page. It fits neatly into the shared file-tool model because the inputs, validation, and download flow are structured and reusable.",
      "This page focuses on plain-text PDF creation with just enough control for page size, title, and readable typography.",
    ],
    relatedSlugs: ["pdf-to-text", "merge-pdf", "split-pdf"],
    slug: "text-to-pdf",
    supportingNotes: [
      "The result model already supports later document generators too, which makes this a strong foundation for broader file utilities.",
      "Keeping the implementation client-side is especially helpful for quick notes and drafts that should not leave the browser.",
    ],
    title: "Text to PDF",
    toolId: "text-to-pdf",
    useCases: [
      "Turn notes or outlines into a shareable PDF quickly.",
      "Create a clean PDF handoff from plain text content.",
      "Save browser-side drafts without opening a document editor.",
    ],
  },
  {
    aliases: ["merge pdf", "combine pdf files", "join pdf"],
    categoryKey: "file",
    description:
      "Merge several PDF files into one document using the same shared upload, validation, and download workflow.",
    examples: [
      { expression: "Merge 3 short reports", result: "One combined PDF in selected order" },
      { expression: "Reorder files before running", result: "Merged document follows the chosen sequence" },
      { expression: "Download the combined PDF", result: "Single handoff-ready file" },
    ],
    faq: [
      {
        answer: "The merge follows the order shown in the file list, and you can move files up or down before running it.",
        question: "How does the merge PDF tool decide file order?",
      },
      {
        answer: "It is useful for report bundles, invoices, exported pages, handoff packets, and other quick document combinations.",
        question: "When should I use a browser PDF merger?",
      },
      {
        answer: "Yes. The selected PDFs are merged in the browser and the combined file is then offered for download.",
        question: "Does the PDF merger run locally?",
      },
    ],
    keywords: ["merge pdf", "combine pdf files", "join pdf"],
    overview: [
      "Merging PDFs is a strong match for the shared file-tool framework because it needs ordered multi-file input, validation, structured output, and a single download result.",
      "This page keeps that workflow straightforward and browser-based, which is ideal for quick document bundles and internal handoffs.",
    ],
    relatedSlugs: ["split-pdf", "pdf-to-text", "text-to-pdf"],
    slug: "merge-pdf",
    supportingNotes: [
      "The same multi-file upload pattern will also help future utilities like archive packers or batch converters without creating route-specific logic.",
      "Result metrics stay simple and useful here: file count, page count, and final size.",
    ],
    title: "Merge PDF",
    toolId: "merge-pdf",
    useCases: [
      "Combine reports, invoices, or exports into one file.",
      "Bundle multiple small PDFs for a cleaner handoff.",
      "Keep document merging local and browser based.",
    ],
  },
  {
    aliases: ["split pdf", "separate pdf pages", "pdf splitter"],
    categoryKey: "file",
    description:
      "Split one PDF into separate pages or page ranges with a reusable browser-side multi-download result flow.",
    examples: [
      { expression: "Leave selection blank", result: "One output file per page" },
      { expression: "Enter 1, 3-5", result: "Separate files for page 1 and pages 3-5" },
      { expression: "Download the split results", result: "Multiple PDF files from one source document" },
    ],
    faq: [
      {
        answer: "Use a list like 1, 3-5, 8. Each entry becomes its own output file, and a blank field splits every page individually.",
        question: "How do I choose pages in the split PDF tool?",
      },
      {
        answer: "No. Overlapping or repeated page selections are rejected so the output stays predictable.",
        question: "Can I repeat or overlap page ranges?",
      },
      {
        answer: "It is useful for pulling one page out of a contract, splitting a packet into sections, or separating a long export into smaller files.",
        question: "When is a PDF splitter useful?",
      },
    ],
    keywords: ["split pdf", "pdf splitter", "separate pdf pages"],
    overview: [
      "Split PDF workflows are a good reason to design the result model around multiple downloads instead of only one output file. This page uses that shared approach directly.",
      "It keeps the input simple with a page-selection field while still supporting both per-page splits and custom ranges.",
    ],
    relatedSlugs: ["merge-pdf", "pdf-to-text", "text-to-pdf"],
    slug: "split-pdf",
    supportingNotes: [
      "Because the page-selection parser is shared logic, it can support later document tools without being trapped inside a one-off page implementation.",
      "The reusable download list also makes the result area coherent even when one action generates many files.",
    ],
    title: "Split PDF",
    toolId: "split-pdf",
    useCases: [
      "Extract one page or section from a longer document.",
      "Break large PDFs into smaller handoff files.",
      "Split page ranges without installing desktop software.",
    ],
  },
];

export const fileToolPages: InteractiveToolPageDefinition[] = fileToolSeeds.map((page) => ({
  aliases: [...page.aliases],
  categoryKey: page.categoryKey,
  description: page.description,
  examples: [...page.examples],
  faq: [...page.faq],
  kind: "interactive-tool",
  keywords: [...page.keywords],
  longDescription: buildLongDescription(
    page.title,
    page.overview,
    page.supportingNotes,
    page.useCases,
  ),
  metaDescription: page.metaDescription,
  relatedSlugs: [...page.relatedSlugs],
  route: `/${page.slug}`,
  slug: page.slug,
  title: page.title,
  useCases: [...page.useCases],
  widget: {
    kind: "file-tool",
    toolId: page.toolId,
  },
}));
