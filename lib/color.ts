export type HexColor = `#${string}`;

export type RgbColor = {
  blue: number;
  green: number;
  red: number;
};

export type HslColor = {
  hue: number;
  lightness: number;
  saturation: number;
};

function isFiniteNumber(value: number) {
  return Number.isFinite(value);
}

function isRgbChannel(value: number) {
  return isFiniteNumber(value) && value >= 0 && value <= 255;
}

function isValidHsl(color: HslColor) {
  return (
    isFiniteNumber(color.hue) &&
    color.hue >= 0 &&
    color.hue <= 360 &&
    isFiniteNumber(color.saturation) &&
    color.saturation >= 0 &&
    color.saturation <= 100 &&
    isFiniteNumber(color.lightness) &&
    color.lightness >= 0 &&
    color.lightness <= 100
  );
}

function clampChannel(value: number) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function normalizeHex(input: string) {
  const normalized = input.trim().replace(/^#/, "");
  const expanded =
    normalized.length === 3
      ? normalized
          .split("")
          .map((character) => `${character}${character}`)
          .join("")
      : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(expanded)) {
    return null;
  }

  return `#${expanded.toUpperCase()}` as HexColor;
}

export function parseHexColor(input: string) {
  const normalized = normalizeHex(input);

  if (!normalized) {
    return {
      error: "Enter a valid HEX color like #FF6B6B or #F66.",
      value: null,
    };
  }

  return {
    error: null,
    value: normalized,
  };
}

export function parseRgbColor(red: number, green: number, blue: number) {
  if (![red, green, blue].every(isFiniteNumber)) {
    return {
      error: "Enter RGB values for red, green, and blue.",
      value: null,
    };
  }

  if (![red, green, blue].every(isRgbChannel)) {
    return {
      error: "RGB values must stay between 0 and 255.",
      value: null,
    };
  }

  return {
    error: null,
    value: {
      blue,
      green,
      red,
    } satisfies RgbColor,
  };
}

export function parseRgbString(input: string) {
  const normalized = input
    .trim()
    .replace(/^rgb\(/i, "")
    .replace(/\)$/i, "");

  const parts = normalized
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length !== 3) {
    return {
      error: "Enter RGB as three comma-separated values like 255, 0, 0.",
      value: null,
    };
  }

  const [red, green, blue] = parts.map(Number);

  return parseRgbColor(red, green, blue);
}

export function parseHslColor(hue: number, saturation: number, lightness: number) {
  const color = { hue, lightness, saturation };

  if (![hue, saturation, lightness].every(isFiniteNumber)) {
    return {
      error: "Enter HSL values for hue, saturation, and lightness.",
      value: null,
    };
  }

  if (!isValidHsl(color)) {
    return {
      error: "Hue must be 0 to 360, and saturation/lightness must be 0% to 100%.",
      value: null,
    };
  }

  return {
    error: null,
    value: color,
  };
}

export function hexToRgb(input: string) {
  const parsed = parseHexColor(input);

  if (!parsed.value) {
    return null;
  }

  return {
    blue: parseInt(parsed.value.slice(5, 7), 16),
    green: parseInt(parsed.value.slice(3, 5), 16),
    red: parseInt(parsed.value.slice(1, 3), 16),
  } satisfies RgbColor;
}

export function rgbToHex(red: number, green: number, blue: number) {
  const parsed = parseRgbColor(red, green, blue);

  if (!parsed.value) {
    return null;
  }

  const channels = [parsed.value.red, parsed.value.green, parsed.value.blue].map(clampChannel);

  return `#${channels
    .map((channel) => channel.toString(16).padStart(2, "0").toUpperCase())
    .join("")}` as HexColor;
}

export function rgbToHsl(red: number, green: number, blue: number) {
  const parsed = parseRgbColor(red, green, blue);

  if (!parsed.value) {
    return null;
  }

  const r = parsed.value.red / 255;
  const g = parsed.value.green / 255;
  const b = parsed.value.blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let hue = 0;

  if (delta !== 0) {
    if (max === r) {
      hue = ((g - b) / delta) % 6;
    } else if (max === g) {
      hue = (b - r) / delta + 2;
    } else {
      hue = (r - g) / delta + 4;
    }
  }

  hue = Math.round(hue * 60);

  if (hue < 0) {
    hue += 360;
  }

  const lightness = (max + min) / 2;
  const saturation =
    delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

  return {
    hue,
    lightness: Math.round(lightness * 100),
    saturation: Math.round(saturation * 100),
  } satisfies HslColor;
}

export function hslToRgb(hue: number, saturation: number, lightness: number) {
  const parsed = parseHslColor(hue, saturation, lightness);

  if (!parsed.value) {
    return null;
  }

  const h = parsed.value.hue / 360;
  const s = parsed.value.saturation / 100;
  const l = parsed.value.lightness / 100;

  if (s === 0) {
    const gray = Math.round(l * 255);
    return { blue: gray, green: gray, red: gray } satisfies RgbColor;
  }

  const hueToRgb = (p: number, q: number, t: number) => {
    let adjusted = t;

    if (adjusted < 0) {
      adjusted += 1;
    }

    if (adjusted > 1) {
      adjusted -= 1;
    }

    if (adjusted < 1 / 6) {
      return p + (q - p) * 6 * adjusted;
    }

    if (adjusted < 1 / 2) {
      return q;
    }

    if (adjusted < 2 / 3) {
      return p + (q - p) * (2 / 3 - adjusted) * 6;
    }

    return p;
  };

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    blue: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    green: Math.round(hueToRgb(p, q, h) * 255),
    red: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
  } satisfies RgbColor;
}

export function hexToHsl(input: string) {
  const rgb = hexToRgb(input);

  if (!rgb) {
    return null;
  }

  return rgbToHsl(rgb.red, rgb.green, rgb.blue);
}

export function hslToHex(hue: number, saturation: number, lightness: number) {
  const rgb = hslToRgb(hue, saturation, lightness);

  if (!rgb) {
    return null;
  }

  return rgbToHex(rgb.red, rgb.green, rgb.blue);
}

export function formatRgbString(rgb: RgbColor) {
  return `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
}

export function formatHslString(hsl: HslColor) {
  return `hsl(${hsl.hue}, ${hsl.saturation}%, ${hsl.lightness}%)`;
}
