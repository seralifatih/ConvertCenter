type ImageMimeType =
  | "image/gif"
  | "image/jpeg"
  | "image/png"
  | "image/svg+xml"
  | "image/webp";

export type ImageTransformOptions = {
  backgroundColor?: string;
  crop?: {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  outputMimeType: ImageMimeType;
  quality?: number;
  rotationDegrees?: 0 | 90 | 180 | 270;
  targetHeight?: number;
  targetWidth?: number;
};

export type TransformedImageResult = {
  blob: Blob;
  height: number;
  mimeType: ImageMimeType;
  width: number;
};

export type ParsedBase64Image = {
  bytes: Uint8Array;
  dataUrl: string;
  extension: string;
  mimeType: ImageMimeType;
};

export type FaviconSpec = {
  fileName: string;
  label: string;
  size: number;
};

const faviconSpecs: readonly FaviconSpec[] = [
  { fileName: "favicon-16x16.png", label: "16 x 16 PNG", size: 16 },
  { fileName: "favicon-32x32.png", label: "32 x 32 PNG", size: 32 },
  { fileName: "favicon-48x48.png", label: "48 x 48 PNG", size: 48 },
  { fileName: "apple-touch-icon.png", label: "180 x 180 Apple touch icon", size: 180 },
  { fileName: "android-chrome-192x192.png", label: "192 x 192 Android icon", size: 192 },
  { fileName: "android-chrome-512x512.png", label: "512 x 512 Android icon", size: 512 },
] as const;

function assertBrowserApi() {
  if (typeof document === "undefined") {
    throw new Error("This file tool runs in the browser.");
  }
}

function getMimeTypeExtension(mimeType: ImageMimeType) {
  switch (mimeType) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/svg+xml":
      return "svg";
    case "image/gif":
      return "gif";
    default:
      return "png";
  }
}

function base64ToBytes(base64: string) {
  const normalized = base64.replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");

  if (!normalized) {
    throw new Error("Enter a Base64 string to decode.");
  }

  if (typeof atob === "function") {
    const decoded = atob(normalized);
    const bytes = new Uint8Array(decoded.length);

    for (let index = 0; index < decoded.length; index += 1) {
      bytes[index] = decoded.charCodeAt(index);
    }

    return bytes;
  }

  return Uint8Array.from(Buffer.from(normalized, "base64"));
}

function bytesToBase64(bytes: Uint8Array) {
  if (typeof btoa === "function") {
    let binary = "";

    bytes.forEach((value) => {
      binary += String.fromCharCode(value);
    });

    return btoa(binary);
  }

  return Buffer.from(bytes).toString("base64");
}

function readAsDataUrl(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Unable to read the file."));
        return;
      }

      resolve(reader.result);
    };

    reader.onerror = () => reject(reader.error ?? new Error("Unable to read the file."));
    reader.readAsDataURL(blob);
  });
}

function createCanvas(width: number, height: number) {
  assertBrowserApi();
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));

  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas rendering is not available in this browser.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";

  return { canvas, context };
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: ImageMimeType, quality?: number) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("The browser could not create the output image."));
          return;
        }

        resolve(blob);
      },
      mimeType,
      quality,
    );
  });
}

async function loadImageElement(source: Blob | string) {
  assertBrowserApi();

  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    let objectUrl: string | null = null;

    image.onload = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      resolve(image);
    };

    image.onerror = () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }

      reject(new Error("The browser could not load the selected image."));
    };

    if (typeof source === "string") {
      image.src = source;
      return;
    }

    objectUrl = URL.createObjectURL(source);
    image.src = objectUrl;
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeCrop(
  imageWidth: number,
  imageHeight: number,
  crop?: ImageTransformOptions["crop"],
) {
  const requestedX = crop?.x ?? 0;
  const requestedY = crop?.y ?? 0;
  const requestedWidth = crop?.width ?? imageWidth;
  const requestedHeight = crop?.height ?? imageHeight;
  const x = clamp(Math.round(requestedX), 0, imageWidth - 1);
  const y = clamp(Math.round(requestedY), 0, imageHeight - 1);
  const width = clamp(Math.round(requestedWidth), 1, imageWidth - x);
  const height = clamp(Math.round(requestedHeight), 1, imageHeight - y);

  return { height, width, x, y };
}

function normalizeTargetSize(
  width: number,
  height: number,
  targetWidth?: number,
  targetHeight?: number,
) {
  if (targetWidth && targetHeight) {
    return {
      height: Math.max(1, Math.round(targetHeight)),
      width: Math.max(1, Math.round(targetWidth)),
    };
  }

  if (targetWidth) {
    return {
      height: Math.max(1, Math.round((height * targetWidth) / width)),
      width: Math.max(1, Math.round(targetWidth)),
    };
  }

  if (targetHeight) {
    return {
      height: Math.max(1, Math.round(targetHeight)),
      width: Math.max(1, Math.round((width * targetHeight) / height)),
    };
  }

  return { height, width };
}

function drawRotatedImage(
  context: CanvasRenderingContext2D,
  image: CanvasImageSource,
  crop: ReturnType<typeof normalizeCrop>,
  rotationDegrees: 0 | 90 | 180 | 270,
  width: number,
  height: number,
) {
  switch (rotationDegrees) {
    case 90:
      context.translate(height, 0);
      context.rotate(Math.PI / 2);
      context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
      return;
    case 180:
      context.translate(width, height);
      context.rotate(Math.PI);
      context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
      return;
    case 270:
      context.translate(0, width);
      context.rotate((3 * Math.PI) / 2);
      context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
      return;
    default:
      context.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, width, height);
  }
}

export function detectImageMimeTypeFromBytes(bytes: Uint8Array): ImageMimeType | null {
  if (bytes.length >= 4) {
    if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
      return "image/png";
    }

    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return "image/jpeg";
    }

    if (
      bytes.length >= 12 &&
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return "image/webp";
    }

    if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) {
      return "image/gif";
    }
  }

  return null;
}

export function buildCenteredSquareCrop(width: number, height: number) {
  const size = Math.max(1, Math.min(width, height));

  return {
    height: size,
    width: size,
    x: Math.floor((width - size) / 2),
    y: Math.floor((height - size) / 2),
  };
}

export function getFaviconSpecs() {
  return [...faviconSpecs];
}

export function parseBase64ImageInput(input: string, fallbackMimeType: ImageMimeType = "image/png") {
  const trimmed = input.trim();

  if (!trimmed) {
    throw new Error("Paste a Base64 string or image data URL.");
  }

  const dataUrlMatch = trimmed.match(/^data:(image\/[a-z0-9.+-]+);base64,([\s\S]+)$/i);

  if (dataUrlMatch) {
    const mimeType = dataUrlMatch[1].toLowerCase() as ImageMimeType;

    if (
      mimeType !== "image/jpeg" &&
      mimeType !== "image/png" &&
      mimeType !== "image/webp" &&
      mimeType !== "image/svg+xml" &&
      mimeType !== "image/gif"
    ) {
      throw new Error("The Base64 data URL must point to a supported image type.");
    }

    const bytes = base64ToBytes(dataUrlMatch[2]);

    return {
      bytes,
      dataUrl: `data:${mimeType};base64,${bytesToBase64(bytes)}`,
      extension: getMimeTypeExtension(mimeType),
      mimeType,
    } satisfies ParsedBase64Image;
  }

  const bytes = base64ToBytes(trimmed);
  const mimeType = detectImageMimeTypeFromBytes(bytes) ?? fallbackMimeType;

  return {
    bytes,
    dataUrl: `data:${mimeType};base64,${bytesToBase64(bytes)}`,
    extension: getMimeTypeExtension(mimeType),
    mimeType,
  } satisfies ParsedBase64Image;
}

export async function getImageDimensions(source: Blob | string) {
  const image = await loadImageElement(source);

  return {
    height: image.naturalHeight || image.height,
    width: image.naturalWidth || image.width,
  };
}

export async function imageFileToBase64(file: File) {
  const dataUrl = await readAsDataUrl(file);
  const [, base64Payload = ""] = dataUrl.split(",", 2);

  return {
    base64: base64Payload,
    dataUrl,
  };
}

export async function base64ToImageBlob(input: string, fallbackMimeType?: ImageMimeType) {
  const parsed = parseBase64ImageInput(input, fallbackMimeType);

  return {
    blob: new Blob([parsed.bytes], { type: parsed.mimeType }),
    ...parsed,
  };
}

export async function transformImageSource(
  source: Blob | string,
  options: ImageTransformOptions,
) {
  const image = await loadImageElement(source);
  const sourceWidth = image.naturalWidth || image.width;
  const sourceHeight = image.naturalHeight || image.height;
  const crop = normalizeCrop(sourceWidth, sourceHeight, options.crop);
  const outputSize = normalizeTargetSize(
    crop.width,
    crop.height,
    options.targetWidth,
    options.targetHeight,
  );
  const rotationDegrees = options.rotationDegrees ?? 0;
  const canvasWidth =
    rotationDegrees === 90 || rotationDegrees === 270 ? outputSize.height : outputSize.width;
  const canvasHeight =
    rotationDegrees === 90 || rotationDegrees === 270 ? outputSize.width : outputSize.height;
  const { canvas, context } = createCanvas(canvasWidth, canvasHeight);

  if (options.outputMimeType === "image/jpeg") {
    context.fillStyle = options.backgroundColor ?? "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawRotatedImage(
    context,
    image,
    crop,
    rotationDegrees,
    outputSize.width,
    outputSize.height,
  );

  const blob = await canvasToBlob(canvas, options.outputMimeType, options.quality);

  return {
    blob,
    height: canvas.height,
    mimeType: options.outputMimeType,
    width: canvas.width,
  } satisfies TransformedImageResult;
}

export async function transformImageFile(file: File, options: ImageTransformOptions) {
  return transformImageSource(file, options);
}

export async function generateFaviconImages(file: File) {
  const dimensions = await getImageDimensions(file);
  const squareCrop = buildCenteredSquareCrop(dimensions.width, dimensions.height);

  const outputs = await Promise.all(
    faviconSpecs.map(async (spec) => {
      const result = await transformImageFile(file, {
        crop: squareCrop,
        outputMimeType: "image/png",
        targetHeight: spec.size,
        targetWidth: spec.size,
      });

      return {
        ...spec,
        blob: result.blob,
      };
    }),
  );

  const htmlTags = [
    `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">`,
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">`,
    `<link rel="manifest" href="/site.webmanifest">`,
  ].join("\n");

  const manifest = JSON.stringify(
    {
      icons: [
        {
          purpose: "any",
          sizes: "192x192",
          src: "/android-chrome-192x192.png",
          type: "image/png",
        },
        {
          purpose: "any",
          sizes: "512x512",
          src: "/android-chrome-512x512.png",
          type: "image/png",
        },
      ],
      name: "ConvertCenter app",
      short_name: "ConvertCenter",
      start_url: "/",
      theme_color: "#0f1720",
    },
    null,
    2,
  );

  return {
    htmlTags,
    manifest,
    outputs,
  };
}
