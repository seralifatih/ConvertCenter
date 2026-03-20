import type { CategoryKey, FaqEntry, StructuredContent } from "@/lib/config/registry/conversion-types";
import type { InteractiveToolPageDefinition } from "@/lib/content/interactive-tools";
import type { GeneratorToolId } from "@/lib/generator-tools/types";

type GeneratorToolExample = {
  expression: string;
  note?: string;
  result: string;
};

type GeneratorToolPageSeed = {
  aliases: readonly string[];
  categoryKey: CategoryKey;
  description: string;
  examples: readonly GeneratorToolExample[];
  faq: readonly FaqEntry[];
  keywords: readonly string[];
  metaDescription?: string;
  overview: readonly string[];
  relatedSlugs: readonly string[];
  slug: string;
  supportingNotes: readonly string[];
  title: string;
  toolId: GeneratorToolId;
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

const generatorToolSeeds: readonly GeneratorToolPageSeed[] = [
  {
    aliases: [
      "random number generator",
      "random number tool",
      "generate random numbers",
      "number picker",
    ],
    categoryKey: "generator",
    description:
      "Generate one or more random numbers with range, precision, uniqueness, and reproducible seed controls.",
    examples: [
      { expression: "1 to 100, 5 values", result: "Five whole numbers ready to copy" },
      { expression: "0 to 1, 3 decimals", result: "Decimal output for sampling and demos" },
      { expression: "Unique values from 10 to 20", result: "Non-repeating whole numbers" },
    ],
    faq: [
      {
        answer:
          "Yes. Keeping the same minimum, maximum, count, decimal places, and seed gives you the same result again.",
        question: "Can I reproduce the same random numbers later?",
      },
      {
        answer:
          "Yes, but uniqueness is limited to whole-number generation because decimal output can repeat in less predictable ways.",
        question: "Does the random number generator support unique values?",
      },
      {
        answer:
          "It is useful for quick picks, QA scenarios, mock data, classroom examples, and any workflow that needs copy-ready random values.",
        question: "When should I use a browser-based random number generator?",
      },
    ],
    keywords: [
      "random number generator",
      "random number tool",
      "number picker",
      "generate random values",
    ],
    metaDescription:
      "Generate random numbers with range, decimal, unique-value, and seed controls in a browser-based number generator.",
    overview: [
      "Random number generation is one of those tiny tasks that appears everywhere, from QA fixtures to quick decisions and classroom examples. This page keeps the controls focused on the settings people usually need instead of burying them in a one-off script.",
      "The shared generator pattern also makes the output reproducible when you keep the same seed, which is useful for demos, screenshots, and testing workflows.",
    ],
    relatedSlugs: ["random-password-generator", "random-team-generator", "percentage-calculator"],
    slug: "random-number-generator",
    supportingNotes: [
      "Decimal precision and unique whole-number output cover both lightweight statistical needs and practical picker-style use cases.",
      "Because the result is copy ready, it also fits naturally into spreadsheets, notes, tickets, or sample data flows.",
    ],
    title: "Random Number Generator",
    toolId: "random-number-generator",
    useCases: [
      "Generate quick picks, lottery-style values, or sample IDs during QA work.",
      "Create reproducible numeric fixtures for demos and screenshots.",
      "Produce decimal samples without opening a spreadsheet or terminal.",
    ],
  },
  {
    aliases: [
      "random name generator",
      "name generator",
      "placeholder name generator",
      "generate random names",
    ],
    categoryKey: "generator",
    description:
      "Generate placeholder first names or full names for mockups, rosters, forms, and lightweight test data.",
    examples: [
      { expression: "6 full names", result: "A short copy-ready placeholder roster" },
      { expression: "10 first names", result: "Compact name ideas for UI previews" },
      { expression: "Same seed reused", result: "The same list appears again for repeatable demos" },
    ],
    faq: [
      {
        answer:
          "It is designed for placeholders and mock content rather than culturally accurate naming coverage or real-user identity generation.",
        question: "Is the random name generator meant for realistic global naming data?",
      },
      {
        answer:
          "Yes. You can switch between first-name-only output and full-name output depending on how much space the mockup or fixture needs.",
        question: "Can I generate first names only instead of full names?",
      },
      {
        answer:
          "It is useful for product mockups, sample rosters, onboarding previews, and quick demo data where you need names that feel human without representing real users.",
        question: "When is a random name generator useful?",
      },
    ],
    keywords: [
      "random name generator",
      "placeholder name generator",
      "fake name list",
      "sample name generator",
    ],
    overview: [
      "Name generation is most useful when it stays lightweight. This page focuses on clean placeholder output for mockups, demos, and test scenarios rather than trying to be a heavy data-generation system.",
      "The shared seed control helps keep screenshots, QA fixtures, and sample states stable when you need to revisit the same list later.",
    ],
    relatedSlugs: ["random-team-generator", "username-generator", "bio-text-formatter"],
    slug: "random-name-generator",
    supportingNotes: [
      "Short lists work well for card grids, table rows, form previews, and role-based UI examples.",
      "It also pairs naturally with username and team generators when a workflow needs more than one style of sample identity output.",
    ],
    title: "Random Name Generator",
    toolId: "random-name-generator",
    useCases: [
      "Populate UI mockups and table states with placeholder names.",
      "Create quick roster examples for demos or tutorials.",
      "Generate light test data without exposing real user details.",
    ],
  },
  {
    aliases: [
      "random password generator",
      "password generator",
      "strong password generator",
      "secure password generator",
    ],
    categoryKey: "generator",
    description:
      "Generate local passwords with configurable character sets, reproducible output, and instant strength and entropy feedback.",
    examples: [
      { expression: "16 characters with all sets", result: "Strong mixed-character password output" },
      { expression: "3 passwords at once", result: "A small password batch ready to compare" },
      { expression: "Symbols disabled", result: "Cleaner alphanumeric passwords with lower entropy" },
    ],
    faq: [
      {
        answer:
          "The page estimates entropy from the enabled character pool and password length, then also runs the first password through a lightweight strength checker for practical feedback.",
        question: "What strength feedback does the password generator show?",
      },
      {
        answer:
          "Yes. Passwords are generated locally in the browser and the widget does not need to send the generated values anywhere.",
        question: "Does the random password generator run locally?",
      },
      {
        answer:
          "Use it when you need quick strong-password drafts for account setup, QA checks, security training, or internal documentation examples.",
        question: "When is a password generator more useful than inventing a password manually?",
      },
    ],
    keywords: [
      "random password generator",
      "strong password generator",
      "secure password tool",
      "password entropy generator",
    ],
    metaDescription:
      "Generate random passwords locally with length, character-set, strength, and entropy controls in a browser-based password generator.",
    overview: [
      "Password generators are most useful when they explain the tradeoffs behind the output. This page keeps the workflow practical by combining configurable character sets with entropy estimates and plain-language strength feedback.",
      "Because the result is deterministic for a given seed, it is also easy to demonstrate the same setup again during training, product QA, or documentation work.",
    ],
    relatedSlugs: ["password-strength-checker", "random-number-generator", "random-name-generator"],
    slug: "random-password-generator",
    supportingNotes: [
      "The notes and strength label help the tool stay educational instead of acting like a black box.",
      "Generating a short batch at once is useful when you want to choose the most readable option for a temporary environment or example flow.",
    ],
    title: "Random Password Generator",
    toolId: "random-password-generator",
    useCases: [
      "Create stronger passwords for accounts, staging environments, or shared documentation examples.",
      "Show how character pools and length affect entropy during training.",
      "Generate a few options at once without leaving the browser.",
    ],
  },
  {
    aliases: [
      "random color generator",
      "random color palette generator",
      "generate random colors",
      "color palette generator",
    ],
    categoryKey: "generator",
    description:
      "Generate a random color palette with live swatches and copy-ready HEX, RGB, or HSL output.",
    examples: [
      { expression: "5 colors in HEX", result: "A compact palette with copy-ready swatches" },
      { expression: "3 colors in RGB", result: "RGB palette values for CSS or canvas work" },
      { expression: "Reuse the same seed", result: "The same palette appears again later" },
    ],
    faq: [
      {
        answer:
          "It generates random RGB values, then formats the same colors as HEX, RGB, or HSL so you can copy the version that matches your workflow.",
        question: "Which color formats does the random color generator support?",
      },
      {
        answer:
          "Yes. The seed makes the palette reproducible, which is useful for screenshots, demos, or collaborative review.",
        question: "Can I keep the same random color palette later?",
      },
      {
        answer:
          "It is useful for mood boards, placeholder themes, lightweight design exploration, and quick UI experiments when you want fresh starting points.",
        question: "When should I use a random color generator?",
      },
    ],
    keywords: [
      "random color generator",
      "random color palette",
      "palette generator",
      "random HEX colors",
    ],
    overview: [
      "Color generation becomes much more useful when the result is visual instead of just numeric. This page pairs the shared generator controls with palette swatches so the output stays easy to judge before you copy it.",
      "Because the same colors can be shown in HEX, RGB, or HSL, the page also connects naturally to existing color and CSS workflows inside the repo.",
    ],
    relatedSlugs: ["color-picker", "color-contrast-checker", "css-gradient-generator"],
    slug: "random-color-generator",
    supportingNotes: [
      "Palette-size control helps the same widget work for a tiny accent set or a fuller exploratory group of colors.",
      "It also pairs well with contrast and gradient tools when a random palette becomes the starting point for a real design pass.",
    ],
    title: "Random Color Generator",
    toolId: "random-color-generator",
    useCases: [
      "Generate quick palette ideas while exploring new UI directions.",
      "Create placeholder brand colors for wireframes and sample themes.",
      "Copy random colors in the exact format a CSS or design workflow needs.",
    ],
  },
  {
    aliases: [
      "random team generator",
      "team generator",
      "random team picker",
      "group generator",
    ],
    categoryKey: "generator",
    description:
      "Shuffle a participant list into balanced random teams with copy-ready grouped output and reproducible seeds.",
    examples: [
      { expression: "8 participants into 4 teams", result: "Four balanced two-person groups" },
      { expression: "12 names into 3 teams", result: "Three shuffled participant groups" },
      { expression: "Reuse a seed for the same roster", result: "The same grouping appears again later" },
    ],
    faq: [
      {
        answer:
          "The generator shuffles the participant list first, then distributes names across teams in order so the groups stay as balanced as possible.",
        question: "How does the random team generator balance groups?",
      },
      {
        answer:
          "Yes. Empty lines are ignored and duplicate names are collapsed so the final teams are cleaner and easier to trust.",
        question: "Does the team generator clean up the participant list first?",
      },
      {
        answer:
          "It is useful for classroom groups, workshops, game nights, retrospectives, and any quick situation where manual splitting would slow things down.",
        question: "When should I use a random team generator?",
      },
    ],
    keywords: [
      "random team generator",
      "team picker",
      "group generator",
      "shuffle teams online",
    ],
    overview: [
      "Team splitting is one of those tasks that seems simple until a list changes twice or people want a fresh shuffle. This page keeps the workflow tight: paste names, choose team count, generate, and copy.",
      "The seeded setup also helps when you want a fair draw that can still be reproduced for notes, screenshots, or a rerun of the same activity.",
    ],
    relatedSlugs: ["random-name-generator", "random-number-generator", "username-generator"],
    slug: "random-team-generator",
    supportingNotes: [
      "Balanced team distribution matters because many casual team tools still leave one group much larger than another.",
      "Copy-ready grouped output also makes it easy to paste the result into chat, docs, or event notes.",
    ],
    title: "Random Team Generator",
    toolId: "random-team-generator",
    useCases: [
      "Split classroom, workshop, or event participants into quick groups.",
      "Create balanced teams for games, retrospectives, or pairing sessions.",
      "Reuse the same shuffle later by keeping the same seed and roster.",
    ],
  },
  {
    aliases: [
      "random text generator",
      "random paragraph generator",
      "placeholder text generator",
      "generate random text",
    ],
    categoryKey: "generator",
    description:
      "Generate repeatable random words, sentences, or paragraphs for mockups, demos, and test content.",
    examples: [
      { expression: "12 words, seed 7", result: "A compact random word list for tag and token testing" },
      { expression: "3 sentences, seed 9", result: "Three repeatable filler sentences for UI demos" },
      { expression: "2 paragraphs, seed 5", result: "Two longer blocks for layout and content-state checks" },
    ],
    faq: [
      {
        answer:
          "Yes. Keeping the same unit, count, and seed gives you the same output again, which is useful for repeatable demos or test fixtures.",
        question: "Is the random text generator deterministic?",
      },
      {
        answer:
          "Random text uses a more varied word bank, while lorem ipsum follows the classic filler-copy style many designers already expect.",
        question: "How is this different from a lorem ipsum generator?",
      },
      {
        answer:
          "It is useful for mockups, placeholder states, CMS testing, sample prompts, and other situations where you need filler copy quickly.",
        question: "When should I use random text instead of writing a real sample?",
      },
    ],
    keywords: [
      "random text generator",
      "placeholder paragraph generator",
      "sample text generator",
      "dummy text generator",
    ],
    overview: [
      "Some projects need filler copy that feels less familiar than lorem ipsum. This page generates repeatable random text blocks for those situations.",
      "The seed control keeps the output stable when you want a reusable sample instead of a different paragraph every time.",
    ],
    relatedSlugs: ["lorem-ipsum-generator", "readability-checker", "sentence-counter"],
    slug: "random-text-generator",
    supportingNotes: [
      "It is a good fit for cards, skeleton states, internal demos, and mock content where the text should look varied but stay harmless.",
      "Because the widget can generate words, sentences, or paragraphs, it covers both compact UI states and larger layout tests.",
    ],
    title: "Random Text Generator",
    toolId: "random-text-generator",
    useCases: [
      "Fill UI mockups with stable placeholder copy during design work.",
      "Generate sample content for forms, demos, and QA checks.",
      "Create repeatable text fixtures for screenshots and presentations.",
    ],
  },
  {
    aliases: [
      "lorem ipsum generator",
      "lorem generator",
      "generate lorem ipsum",
      "dummy text generator",
    ],
    categoryKey: "generator",
    description:
      "Generate lorem ipsum words, sentences, or paragraphs with copy-ready output and repeatable defaults.",
    examples: [
      { expression: "20 words, seed 1", result: "A short lorem ipsum phrase block for narrow layouts" },
      { expression: "4 sentences, seed 3", result: "One compact lorem sample for cards and previews" },
      { expression: "2 paragraphs, seed 11", result: "Two longer lorem blocks for wireframes and landing-page mocks" },
    ],
    faq: [
      {
        answer:
          "It supports words, sentences, and paragraphs, so you can match the filler text to a tiny label, a card, or a full content block.",
        question: "What kinds of lorem output can I generate?",
      },
      {
        answer:
          "Yes. The output is deterministic for a given seed, which helps when you want the same placeholder content to stay in screenshots or mockups.",
        question: "Can I keep the same lorem ipsum sample later?",
      },
      {
        answer:
          "Lorem ipsum is still useful when you want familiar filler copy that shows spacing and hierarchy without pretending to be real content.",
        question: "Why do designers still use lorem ipsum?",
      },
    ],
    keywords: [
      "lorem ipsum generator",
      "lorem generator",
      "dummy text generator",
      "placeholder lorem text",
    ],
    overview: [
      "Lorem ipsum remains the default filler text for wireframes, content slots, and layout testing because it shows rhythm without distracting from the design.",
      "This page keeps that workflow simple while still giving you control over size and repeatability.",
    ],
    relatedSlugs: ["random-text-generator", "word-counter", "readability-checker"],
    slug: "lorem-ipsum-generator",
    supportingNotes: [
      "The copy-ready output makes it quick to drop filler text into a design tool, CMS draft, or presentation.",
      "Shared generator widgets also make it easier to grow this family into future marketing and content helpers later on.",
    ],
    title: "Lorem Ipsum Generator",
    toolId: "lorem-ipsum-generator",
    useCases: [
      "Fill empty layouts before the final content is ready.",
      "Stress-test text spacing in cards, tables, and article templates.",
      "Create repeatable lorem samples for demos and screenshots.",
    ],
  },
];

export const generatorToolPages: InteractiveToolPageDefinition[] = generatorToolSeeds.map((page) => ({
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
    kind: "generator-tool",
    toolId: page.toolId,
  },
}));
