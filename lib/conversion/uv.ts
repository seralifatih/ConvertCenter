export type UvRiskLevel = {
  advice: string;
  colorToken: "accent" | "warning" | "danger" | "extreme";
  dangerous: boolean;
  label: "Low" | "Moderate" | "High" | "Very High" | "Extreme";
  rangeLabel: string;
};

const uvRiskLevels: UvRiskLevel[] = [
  {
    advice: "Minimal protection is usually enough, although sunglasses are still helpful outdoors.",
    colorToken: "accent",
    dangerous: false,
    label: "Low",
    rangeLabel: "0 to 2",
  },
  {
    advice: "Use sunscreen, shade, and sunglasses if you expect longer outdoor exposure.",
    colorToken: "warning",
    dangerous: false,
    label: "Moderate",
    rangeLabel: "3 to 5",
  },
  {
    advice: "Protection becomes important. Midday exposure can cause skin damage more quickly.",
    colorToken: "danger",
    dangerous: true,
    label: "High",
    rangeLabel: "6 to 7",
  },
  {
    advice: "Reduce unprotected sun exposure, especially in the middle of the day.",
    colorToken: "danger",
    dangerous: true,
    label: "Very High",
    rangeLabel: "8 to 10",
  },
  {
    advice: "Unprotected skin can burn quickly. Limit exposure and use full sun protection.",
    colorToken: "extreme",
    dangerous: true,
    label: "Extreme",
    rangeLabel: "11+",
  },
];

export function getUvRiskLevel(index: number): UvRiskLevel | null {
  if (!Number.isFinite(index) || index < 0) {
    return null;
  }

  if (index <= 2) {
    return uvRiskLevels[0];
  }

  if (index <= 5) {
    return uvRiskLevels[1];
  }

  if (index <= 7) {
    return uvRiskLevels[2];
  }

  if (index <= 10) {
    return uvRiskLevels[3];
  }

  return uvRiskLevels[4];
}

export function isDangerousUvIndex(index: number) {
  return getUvRiskLevel(index)?.dangerous ?? false;
}

export function getUvRiskLevels() {
  return [...uvRiskLevels];
}
