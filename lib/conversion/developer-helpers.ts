export type CronPreset = "daily" | "everyMinute" | "hourly" | "monthly" | "weekly";

export type CronSchedule = {
  dayOfMonth: number;
  dayOfWeek: number;
  hour: number;
  minute: number;
  preset: CronPreset;
};

export type DecodedJwt = {
  expiresAt?: string;
  header: Record<string, unknown>;
  isExpired?: boolean;
  payload: Record<string, unknown>;
  signature: string;
};

export type JwtDecodeResult =
  | {
      error: string;
    }
  | DecodedJwt;

export type RegexTestMatch = {
  captures: string[];
  fullMatch: string;
  index: number;
  namedGroups: Record<string, string>;
};

export type RegexTestResult =
  | {
      error: string;
      matches: [];
      totalMatches: 0;
    }
  | {
      matches: RegexTestMatch[];
      totalMatches: number;
    };

export type HashResult = {
  md5: string;
  sha256: string;
};

const weekdayLabels = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

const md5Shifts = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
] as const;

const md5Constants = Array.from(
  { length: 64 },
  (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 2 ** 32) >>> 0,
);

function clamp(value: number, min: number, max: number, fallback: number) {
  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, Math.floor(value)));
}

function leftRotate(value: number, shift: number) {
  return (value << shift) | (value >>> (32 - shift));
}

function wordToHexLittleEndian(value: number) {
  return Array.from({ length: 4 }, (_, index) =>
    ((value >>> (index * 8)) & 0xff).toString(16).padStart(2, "0"),
  ).join("");
}

function encodeUtf8(value: string) {
  return new TextEncoder().encode(value);
}

function decodeBase64UrlSegment(segment: string) {
  const normalized = segment.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");

  try {
    if (typeof window !== "undefined" && typeof window.atob === "function") {
      return decodeURIComponent(
        Array.from(window.atob(padded))
          .map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, "0")}`)
          .join(""),
      );
    }

    return Buffer.from(padded, "base64").toString("utf8");
  } catch {
    throw new Error("JWT segments must be valid Base64URL strings.");
  }
}

export function normalizeCronSchedule(schedule: Partial<CronSchedule>): CronSchedule {
  return {
    dayOfMonth: clamp(schedule.dayOfMonth ?? 1, 1, 31, 1),
    dayOfWeek: clamp(schedule.dayOfWeek ?? 1, 0, 6, 1),
    hour: clamp(schedule.hour ?? 9, 0, 23, 9),
    minute: clamp(schedule.minute ?? 0, 0, 59, 0),
    preset: schedule.preset ?? "daily",
  };
}

export function buildCronExpression(schedule: Partial<CronSchedule>) {
  const normalized = normalizeCronSchedule(schedule);

  switch (normalized.preset) {
    case "everyMinute":
      return "* * * * *";
    case "hourly":
      return `${normalized.minute} * * * *`;
    case "daily":
      return `${normalized.minute} ${normalized.hour} * * *`;
    case "weekly":
      return `${normalized.minute} ${normalized.hour} * * ${normalized.dayOfWeek}`;
    case "monthly":
      return `${normalized.minute} ${normalized.hour} ${normalized.dayOfMonth} * *`;
  }
}

export function describeCronSchedule(schedule: Partial<CronSchedule>) {
  const normalized = normalizeCronSchedule(schedule);
  const minute = String(normalized.minute).padStart(2, "0");
  const hour = String(normalized.hour).padStart(2, "0");

  switch (normalized.preset) {
    case "everyMinute":
      return "Runs every minute.";
    case "hourly":
      return `Runs at minute ${minute} of every hour.`;
    case "daily":
      return `Runs every day at ${hour}:${minute}.`;
    case "weekly":
      return `Runs every ${weekdayLabels[normalized.dayOfWeek]} at ${hour}:${minute}.`;
    case "monthly":
      return `Runs on day ${normalized.dayOfMonth} of every month at ${hour}:${minute}.`;
  }
}

export function testRegexPattern(
  pattern: string,
  flags: string,
  sampleText: string,
): RegexTestResult {
  if (!pattern.trim()) {
    return {
      error: "Enter a regex pattern to test.",
      matches: [],
      totalMatches: 0,
    };
  }

  try {
    const expression = new RegExp(pattern, flags);
    const matches: RegexTestMatch[] = [];

    if (expression.global) {
      let match = expression.exec(sampleText);

      while (match) {
        matches.push({
          captures: match.slice(1).map((capture) => capture ?? ""),
          fullMatch: match[0] ?? "",
          index: match.index,
          namedGroups: match.groups ?? {},
        });

        if ((match[0] ?? "") === "") {
          expression.lastIndex += 1;
        }

        match = expression.exec(sampleText);
      }
    } else {
      const match = expression.exec(sampleText);

      if (match) {
        matches.push({
          captures: match.slice(1).map((capture) => capture ?? ""),
          fullMatch: match[0] ?? "",
          index: match.index,
          namedGroups: match.groups ?? {},
        });
      }
    }

    return {
      matches,
      totalMatches: matches.length,
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Invalid regular expression.",
      matches: [],
      totalMatches: 0,
    };
  }
}

export function decodeJwt(token: string): JwtDecodeResult {
  const trimmedToken = token.trim();

  if (!trimmedToken) {
    return {
      error: "Paste a JWT to decode.",
    };
  }

  const parts = trimmedToken.split(".");

  if (parts.length !== 3) {
    return {
      error: "JWTs must contain header, payload, and signature segments.",
    };
  }

  try {
    const header = JSON.parse(decodeBase64UrlSegment(parts[0] ?? ""));
    const payload = JSON.parse(decodeBase64UrlSegment(parts[1] ?? ""));

    if (!header || typeof header !== "object" || Array.isArray(header)) {
      throw new Error("The JWT header must decode to a JSON object.");
    }

    if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
      throw new Error("The JWT payload must decode to a JSON object.");
    }

    const expiresAt =
      typeof payload.exp === "number"
        ? new Date(payload.exp * 1000).toISOString()
        : undefined;

    return {
      expiresAt,
      header,
      isExpired:
        typeof payload.exp === "number" ? payload.exp * 1000 < Date.now() : undefined,
      payload,
      signature: parts[2] ?? "",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Unable to decode this JWT.",
    };
  }
}

export function generateUuidV4() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);

  if (globalThis.crypto?.getRandomValues) {
    globalThis.crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export function generateUuidList(count: number) {
  const safeCount = clamp(count, 1, 25, 5);
  return Array.from({ length: safeCount }, () => generateUuidV4());
}

export function md5Hex(input: string) {
  const bytes = Array.from(encodeUtf8(input));
  const originalBitLength = bytes.length * 8;
  const bitLengthLow = originalBitLength >>> 0;
  const bitLengthHigh = Math.floor(originalBitLength / 0x100000000) >>> 0;

  bytes.push(0x80);

  while (bytes.length % 64 !== 56) {
    bytes.push(0);
  }

  for (let index = 0; index < 4; index += 1) {
    bytes.push((bitLengthLow >>> (index * 8)) & 0xff);
  }

  for (let index = 0; index < 4; index += 1) {
    bytes.push((bitLengthHigh >>> (index * 8)) & 0xff);
  }

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const words = Array.from({ length: 16 }, (_, index) => {
      const wordOffset = offset + index * 4;
      return (
        bytes[wordOffset]! |
        (bytes[wordOffset + 1]! << 8) |
        (bytes[wordOffset + 2]! << 16) |
        (bytes[wordOffset + 3]! << 24)
      ) >>> 0;
    });

    let a = a0;
    let b = b0;
    let c = c0;
    let d = d0;

    for (let index = 0; index < 64; index += 1) {
      let mix = 0;
      let wordIndex = 0;

      if (index < 16) {
        mix = (b & c) | (~b & d);
        wordIndex = index;
      } else if (index < 32) {
        mix = (d & b) | (~d & c);
        wordIndex = (5 * index + 1) % 16;
      } else if (index < 48) {
        mix = b ^ c ^ d;
        wordIndex = (3 * index + 5) % 16;
      } else {
        mix = c ^ (b | ~d);
        wordIndex = (7 * index) % 16;
      }

      const nextValue = (a + mix + md5Constants[index]! + words[wordIndex]!) >>> 0;
      a = d;
      d = c;
      c = b;
      b = (b + leftRotate(nextValue, md5Shifts[index]!)) >>> 0;
    }

    a0 = (a0 + a) >>> 0;
    b0 = (b0 + b) >>> 0;
    c0 = (c0 + c) >>> 0;
    d0 = (d0 + d) >>> 0;
  }

  return [a0, b0, c0, d0].map(wordToHexLittleEndian).join("");
}

export async function sha256Hex(input: string) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("SHA-256 is not available in this environment.");
  }

  const digest = await globalThis.crypto.subtle.digest("SHA-256", encodeUtf8(input));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function generateHashes(input: string): Promise<HashResult> {
  const [md5, sha256] = await Promise.all([Promise.resolve(md5Hex(input)), sha256Hex(input)]);

  return {
    md5,
    sha256,
  };
}
