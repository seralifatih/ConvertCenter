type TweetStats = {
  rawLength: number;
  remaining: number;
  statusLabel: string;
  weightedLength: number;
};

const HASHTAG_SUFFIXES = [
  "tips",
  "ideas",
  "guide",
  "daily",
  "community",
  "creator",
  "goals",
  "inspo",
];

const USERNAME_PREFIXES = ["the", "hey", "real", "official", "daily", "studio", "social"];
const USERNAME_SUFFIXES = ["hq", "lab", "media", "works", "daily", "hub", "online", "notes"];

const FONT_MAPS = [
  {
    id: "bold-serif",
    label: "Bold Serif",
    mapLower: "𝐚𝐛𝐜𝐝𝐞𝐟𝐠𝐡𝐢𝐣𝐤𝐥𝐦𝐧𝐨𝐩𝐪𝐫𝐬𝐭𝐮𝐯𝐰𝐱𝐲𝐳",
    mapNumbers: "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗",
    mapUpper: "𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙",
  },
  {
    id: "italic-serif",
    label: "Italic Serif",
    mapLower: "𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧",
    mapNumbers: "0123456789",
    mapUpper: "𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍",
  },
  {
    id: "bold-script",
    label: "Bold Script",
    mapLower: "𝓪𝓫𝓬𝓭𝓮𝓯𝓰𝓱𝓲𝓳𝓴𝓵𝓶𝓷𝓸𝓹𝓺𝓻𝓼𝓽𝓾𝓿𝔀𝔁𝔂𝔃",
    mapNumbers: "0123456789",
    mapUpper: "𝓐𝓑𝓒𝓓𝓔𝓕𝓖𝓗𝓘𝓙𝓚𝓛𝓜𝓝𝓞𝓟𝓠𝓡𝓢𝓣𝓤𝓥𝓦𝓧𝓨𝓩",
  },
  {
    id: "double-struck",
    label: "Double Struck",
    mapLower: "𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫",
    mapNumbers: "𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡",
    mapUpper: "𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ",
  },
  {
    id: "monospace",
    label: "Monospace",
    mapLower: "𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣",
    mapNumbers: "𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿",
    mapUpper: "𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉",
  },
] as const;

function uniqueStrings(values: readonly string[]) {
  return [...new Set(values.filter(Boolean))];
}

function tokenize(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function toPascalCase(input: string) {
  return tokenize(input)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function toSlug(input: string) {
  return tokenize(input).join("");
}

function mapFancyText(input: string, map: (typeof FONT_MAPS)[number]) {
  const lowerCharacters = [...map.mapLower];
  const upperCharacters = [...map.mapUpper];
  const numberCharacters = [...map.mapNumbers];

  return [...input]
    .map((character) => {
      const lowerIndex = character.toLowerCase().charCodeAt(0) - 97;
      const upperIndex = character.charCodeAt(0) - 65;
      const numberIndex = character.charCodeAt(0) - 48;

      if (lowerIndex >= 0 && lowerIndex < 26) {
        return character === character.toUpperCase()
          ? upperCharacters[upperIndex] ?? character
          : lowerCharacters[lowerIndex] ?? character;
      }

      if (numberIndex >= 0 && numberIndex < 10) {
        return numberCharacters[numberIndex] ?? character;
      }

      return character;
    })
    .join("");
}

export function generateHashtags(topic: string, count: number) {
  const normalized = toPascalCase(topic);
  const tokens = tokenize(topic);

  if (!normalized) {
    throw new Error("Enter a topic or phrase to generate hashtags.");
  }

  const baseTags = [`#${normalized}`];

  tokens.forEach((token) => {
    baseTags.push(`#${token}`);
  });

  HASHTAG_SUFFIXES.forEach((suffix) => {
    baseTags.push(`#${normalized}${suffix.charAt(0).toUpperCase()}${suffix.slice(1)}`);
  });

  return uniqueStrings(baseTags).slice(0, Math.max(1, Math.min(20, count)));
}

export function generateUsernames(seed: string, count: number, separator: string) {
  const base = toSlug(seed);

  if (!base) {
    throw new Error("Enter a name, phrase, or keyword to generate usernames.");
  }

  const join = (left: string, right: string) => `${left}${separator}${right}`.replace(/^[._-]+|[._-]+$/g, "");
  const candidates = [
    base,
    ...USERNAME_PREFIXES.map((prefix) => join(prefix, base)),
    ...USERNAME_SUFFIXES.map((suffix) => join(base, suffix)),
    ...USERNAME_SUFFIXES.flatMap((suffix) => USERNAME_PREFIXES.map((prefix) => join(join(prefix, base), suffix))),
    `${base}official`,
    `${base}daily`,
    `${base}media`,
  ];

  return uniqueStrings(candidates).slice(0, Math.max(1, Math.min(24, count)));
}

export function generateInstagramFontVariants(text: string) {
  const normalized = text.trim();

  if (!normalized) {
    throw new Error("Enter some text to generate Instagram font variants.");
  }

  return FONT_MAPS.map((map) => ({
    id: map.id,
    label: map.label,
    value: mapFancyText(normalized, map),
  }));
}

export function formatBioText(config: {
  callToAction: string;
  name: string;
  proofPoint: string;
  role: string;
}) {
  const name = config.name.trim();
  const role = config.role.trim();
  const proofPoint = config.proofPoint.trim();
  const callToAction = config.callToAction.trim();

  if (!name || !role || !proofPoint || !callToAction) {
    throw new Error("Fill in the name, role, proof point, and call to action fields.");
  }

  const concise = [name, role, proofPoint, callToAction].join("\n");
  const emoji = [`${name} | ${role}`, `✨ ${proofPoint}`, `👇 ${callToAction}`].join("\n");
  const creator = [`${name}`, `Helping with ${role.toLowerCase()}`, `${proofPoint}`, `${callToAction}`].join("\n");

  return [
    { label: "Concise bio", value: concise },
    { label: "Emoji-led bio", value: emoji },
    { label: "Creator bio", value: creator },
  ];
}

export function getTweetLengthStats(text: string): TweetStats {
  const trimmed = text.trim();
  const urlMatches = trimmed.match(/https?:\/\/\S+/gi) ?? [];
  const rawLength = trimmed.length;
  const weightedLength = rawLength - urlMatches.reduce((total, url) => total + url.length, 0) + urlMatches.length * 23;
  const remaining = 280 - weightedLength;

  return {
    rawLength,
    remaining,
    statusLabel:
      remaining >= 40 ? "Comfortable" : remaining >= 0 ? "Close to limit" : "Over limit",
    weightedLength,
  };
}
