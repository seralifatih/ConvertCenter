import { hexToRgb, parseHexColor } from "@/lib/color";

type PasswordStrengthResult = {
  label: string;
  score: number;
  suggestions: string[];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function relativeLuminance(channel: number) {
  const normalized = channel / 255;

  if (normalized <= 0.03928) {
    return normalized / 12.92;
  }

  return ((normalized + 0.055) / 1.055) ** 2.4;
}

function toRgbaString(hex: string, opacity: number) {
  const rgb = hexToRgb(hex);

  if (!rgb) {
    throw new Error("Enter a valid HEX color like #1F2937.");
  }

  return `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, ${opacity.toFixed(2)})`;
}

export function checkPasswordStrength(password: string): PasswordStrengthResult {
  const suggestions: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 20;
  } else {
    suggestions.push("Use at least 8 characters.");
  }

  if (password.length >= 12) {
    score += 15;
  } else {
    suggestions.push("Aim for 12 or more characters for stronger passwords.");
  }

  if (/[a-z]/.test(password)) {
    score += 10;
  } else {
    suggestions.push("Add lowercase letters.");
  }

  if (/[A-Z]/.test(password)) {
    score += 10;
  } else {
    suggestions.push("Add uppercase letters.");
  }

  if (/\d/.test(password)) {
    score += 15;
  } else {
    suggestions.push("Include at least one number.");
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 15;
  } else {
    suggestions.push("Add a symbol like !, @, or #.");
  }

  if (!/(.)\1{2,}/.test(password)) {
    score += 10;
  } else {
    suggestions.push("Avoid repeating the same character several times.");
  }

  if (!/(password|1234|qwerty|admin|welcome)/i.test(password)) {
    score += 5;
  } else {
    suggestions.push("Avoid common password words or patterns.");
  }

  const normalizedScore = clamp(score, 0, 100);

  return {
    label:
      normalizedScore >= 80
        ? "Strong"
        : normalizedScore >= 60
          ? "Good"
          : normalizedScore >= 40
            ? "Fair"
            : "Weak",
    score: normalizedScore,
    suggestions,
  };
}

export function getContrastRatio(foregroundHex: string, backgroundHex: string) {
  const foreground = parseHexColor(foregroundHex).value;
  const background = parseHexColor(backgroundHex).value;

  if (!foreground || !background) {
    throw new Error("Enter valid HEX colors for both foreground and background.");
  }

  const foregroundRgb = hexToRgb(foreground);
  const backgroundRgb = hexToRgb(background);

  if (!foregroundRgb || !backgroundRgb) {
    throw new Error("Enter valid HEX colors for both foreground and background.");
  }

  const foregroundLuminance =
    0.2126 * relativeLuminance(foregroundRgb.red) +
    0.7152 * relativeLuminance(foregroundRgb.green) +
    0.0722 * relativeLuminance(foregroundRgb.blue);
  const backgroundLuminance =
    0.2126 * relativeLuminance(backgroundRgb.red) +
    0.7152 * relativeLuminance(backgroundRgb.green) +
    0.0722 * relativeLuminance(backgroundRgb.blue);

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  const ratio = (lighter + 0.05) / (darker + 0.05);

  return {
    passesAaLarge: ratio >= 3,
    passesAaNormal: ratio >= 4.5,
    passesAaaLarge: ratio >= 4.5,
    passesAaaNormal: ratio >= 7,
    ratio,
  };
}

export function buildCssGradient(config: {
  angle: number;
  endColor: string;
  startColor: string;
}) {
  const start = parseHexColor(config.startColor).value;
  const end = parseHexColor(config.endColor).value;

  if (!start || !end) {
    throw new Error("Enter valid HEX colors for the gradient.");
  }

  const angle = clamp(Math.round(config.angle), 0, 360);

  return {
    css: `background: linear-gradient(${angle}deg, ${start} 0%, ${end} 100%);`,
    style: `linear-gradient(${angle}deg, ${start} 0%, ${end} 100%)`,
  };
}

export function buildBoxShadow(config: {
  blur: number;
  color: string;
  inset: boolean;
  offsetX: number;
  offsetY: number;
  opacity: number;
  spread: number;
}) {
  const color = parseHexColor(config.color).value;

  if (!color) {
    throw new Error("Enter a valid HEX color for the shadow.");
  }

  const opacity = clamp(config.opacity, 0, 1);
  const shadowColor = toRgbaString(color, opacity);
  const css = `${config.inset ? "inset " : ""}${Math.round(config.offsetX)}px ${Math.round(
    config.offsetY,
  )}px ${Math.round(config.blur)}px ${Math.round(config.spread)}px ${shadowColor}`;

  return {
    css: `box-shadow: ${css};`,
    style: css,
  };
}

export function buildBorderRadius(config: {
  bottomLeft: number;
  bottomRight: number;
  topLeft: number;
  topRight: number;
}) {
  const corners = [
    Math.max(0, Math.round(config.topLeft)),
    Math.max(0, Math.round(config.topRight)),
    Math.max(0, Math.round(config.bottomRight)),
    Math.max(0, Math.round(config.bottomLeft)),
  ];
  const cssValue = `${corners[0]}px ${corners[1]}px ${corners[2]}px ${corners[3]}px`;

  return {
    css: `border-radius: ${cssValue};`,
    style: cssValue,
  };
}
