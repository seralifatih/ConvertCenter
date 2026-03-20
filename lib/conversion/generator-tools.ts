import {
  formatHslString,
  formatRgbString,
  rgbToHex,
  rgbToHsl,
} from "@/lib/color";
import { checkPasswordStrength } from "@/lib/conversion/micro-utilities";
import { shuffleWithRandom, type RandomSource } from "@/lib/conversion/random-source";

export type RandomNameStyle = "first" | "full";
export type RandomColorFormat = "hex" | "hsl" | "rgb";

export type RandomColorEntry = {
  hex: string;
  hsl: string;
  rgb: string;
};

export type RandomTeam = {
  label: string;
  members: string[];
};

const FIRST_NAMES = [
  "Ayla",
  "Cem",
  "Derya",
  "Elif",
  "Emre",
  "Iris",
  "Jules",
  "Kaan",
  "Lina",
  "Mert",
  "Mina",
  "Noah",
  "Ozan",
  "Sena",
  "Tara",
  "Yaren",
] as const;

const LAST_NAMES = [
  "Aydin",
  "Bennett",
  "Cole",
  "Demir",
  "Ersoy",
  "Foster",
  "Kaya",
  "Lang",
  "Miller",
  "Navarro",
  "Parker",
  "Quinn",
  "Reed",
  "Stone",
  "Taylor",
  "Yilmaz",
] as const;

const SYMBOLS = "!@#$%^&*()_-+=[]{}<>?";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function normalizeCount(value: number, max: number) {
  return clamp(Math.floor(Number.isFinite(value) ? value : 1), 1, max);
}

function pickValue<T>(items: readonly T[], random: RandomSource) {
  return items[Math.floor(random() * items.length)] ?? items[0];
}

function randomFloat(random: RandomSource, min: number, max: number, decimals: number) {
  const nextValue = min + random() * (max - min);
  return Number(nextValue.toFixed(decimals));
}

function randomInt(random: RandomSource, min: number, max: number) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function uniqueNonEmptyLines(input: string) {
  return [...new Set(input.split(/\r?\n/).map((line) => line.trim()).filter(Boolean))];
}

function formatGeneratedValue(value: number, decimals: number) {
  return decimals > 0 ? value.toFixed(decimals) : String(Math.trunc(value));
}

export function generateRandomNumbers(
  options: {
    count: number;
    decimals: number;
    max: number;
    min: number;
    unique: boolean;
  },
  random: RandomSource,
) {
  const min = Number(options.min);
  const max = Number(options.max);
  const decimals = clamp(Math.floor(options.decimals), 0, 6);
  const count = normalizeCount(options.count, 24);

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("Enter valid minimum and maximum values.");
  }

  if (max < min) {
    throw new Error("Maximum must be greater than or equal to minimum.");
  }

  if (options.unique && decimals > 0) {
    throw new Error("Unique output is only available for whole numbers.");
  }

  if (options.unique && max - min + 1 < count) {
    throw new Error("The integer range is too small for that many unique values.");
  }

  if (options.unique) {
    const pool = shuffleWithRandom(
      Array.from({ length: max - min + 1 }, (_, index) => min + index),
      random,
    );

    return pool.slice(0, count).map((value) => formatGeneratedValue(value, 0));
  }

  return Array.from({ length: count }, () =>
    formatGeneratedValue(
      decimals > 0 ? randomFloat(random, min, max, decimals) : randomInt(random, min, max),
      decimals,
    ),
  );
}

export function generateRandomNames(
  options: {
    count: number;
    style: RandomNameStyle;
  },
  random: RandomSource,
) {
  const count = normalizeCount(options.count, 20);

  return Array.from({ length: count }, () => {
    const firstName = pickValue(FIRST_NAMES, random);

    if (options.style === "first") {
      return firstName;
    }

    return `${firstName} ${pickValue(LAST_NAMES, random)}`;
  });
}

export function estimatePasswordEntropy(length: number, poolSize: number) {
  if (length <= 0 || poolSize <= 0) {
    return 0;
  }

  return length * Math.log2(poolSize);
}

export function generateRandomPasswords(
  options: {
    count: number;
    includeLowercase: boolean;
    includeNumbers: boolean;
    includeSymbols: boolean;
    includeUppercase: boolean;
    length: number;
  },
  random: RandomSource,
) {
  const count = normalizeCount(options.count, 10);
  const length = clamp(Math.floor(options.length), 4, 64);
  const activePools = [
    options.includeUppercase ? UPPERCASE : "",
    options.includeLowercase ? LOWERCASE : "",
    options.includeNumbers ? NUMBERS : "",
    options.includeSymbols ? SYMBOLS : "",
  ].filter(Boolean);

  if (!activePools.length) {
    throw new Error("Select at least one character set for password generation.");
  }

  if (length < activePools.length) {
    throw new Error("Password length must be at least the number of enabled character sets.");
  }

  const combinedPool = activePools.join("");
  const passwords = Array.from({ length: count }, () => {
    const seededCharacters = activePools.map((pool) => pickValue([...pool], random));

    while (seededCharacters.length < length) {
      seededCharacters.push(pickValue([...combinedPool], random));
    }

    return shuffleWithRandom(seededCharacters, random).join("");
  });

  const entropyBits = estimatePasswordEntropy(length, combinedPool.length);
  const strength = checkPasswordStrength(passwords[0] ?? "");

  return {
    entropyBits,
    passwords,
    strength,
  };
}

export function generateRandomColors(
  options: {
    count: number;
  },
  random: RandomSource,
) {
  const count = normalizeCount(options.count, 8);

  return Array.from({ length: count }, () => {
    const red = randomInt(random, 0, 255);
    const green = randomInt(random, 0, 255);
    const blue = randomInt(random, 0, 255);
    const hex = rgbToHex(red, green, blue);
    const hsl = rgbToHsl(red, green, blue);

    if (!hex || !hsl) {
      throw new Error("Color generation failed. Try again.");
    }

    return {
      hex,
      hsl: formatHslString(hsl),
      rgb: formatRgbString({ blue, green, red }),
    } satisfies RandomColorEntry;
  });
}

export function formatRandomColor(entry: RandomColorEntry, format: RandomColorFormat) {
  if (format === "rgb") {
    return entry.rgb;
  }

  if (format === "hsl") {
    return entry.hsl;
  }

  return entry.hex;
}

export function generateRandomTeams(
  options: {
    names: string;
    teamCount: number;
  },
  random: RandomSource,
) {
  const members = uniqueNonEmptyLines(options.names);
  const teamCount = clamp(Math.floor(options.teamCount), 2, 12);

  if (members.length < 2) {
    throw new Error("Add at least two names to create random teams.");
  }

  if (teamCount > members.length) {
    throw new Error("Team count cannot be greater than the number of participants.");
  }

  const shuffledMembers = shuffleWithRandom(members, random);
  const teams = Array.from({ length: teamCount }, (_, index) => ({
    label: `Team ${index + 1}`,
    members: [] as string[],
  }));

  shuffledMembers.forEach((member, index) => {
    teams[index % teamCount]?.members.push(member);
  });

  return teams satisfies RandomTeam[];
}
