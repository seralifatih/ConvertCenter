import type { CategoryKey, FaqEntry, StructuredContent } from "@/lib/config/registry/conversion-types";
import type { InteractiveToolPageDefinition } from "@/lib/content/interactive-tools";
import type { UtilityToolId } from "@/lib/utility-tools/types";

type UtilityToolExample = {
  expression: string;
  note?: string;
  result: string;
};

type UtilityToolPageSeed = {
  aliases: readonly string[];
  categoryKey: CategoryKey;
  description: string;
  examples: readonly UtilityToolExample[];
  faq: readonly FaqEntry[];
  keywords: readonly string[];
  metaDescription?: string;
  overview: readonly string[];
  relatedSlugs: readonly string[];
  slug: string;
  supportingNotes: readonly string[];
  title: string;
  toolId: UtilityToolId;
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

const utilityToolSeeds: UtilityToolPageSeed[] = [];

utilityToolSeeds.push(
  {
    aliases: ["meta tag generator", "seo meta tag generator", "open graph tag generator"],
    categoryKey: "seo",
    description: "Generate core HTML, Open Graph, and Twitter meta tags from a few page details.",
    examples: [
      { expression: "Landing page title and description", result: "Copy-ready title, description, and canonical tags" },
      { expression: "Add social image URL", result: "Open Graph and Twitter image tags included" },
      { expression: "Switch robots to noindex", result: "Updated robots meta tag for staging or gated pages" },
    ],
    faq: [
      {
        answer: "It generates the common title, description, canonical, robots, Open Graph, and Twitter tags most sites start with.",
        question: "What does the meta tag generator include?",
      },
      {
        answer: "Yes. The output is plain HTML you can paste into a head template, CMS field, or framework metadata file.",
        question: "Can I copy the generated tags directly into a site?",
      },
      {
        answer: "It helps, but the real quality still depends on writing a clear title, a concise description, and using the right canonical URL.",
        question: "Does generating tags automatically make a page SEO ready?",
      },
    ],
    keywords: ["meta tag generator", "seo tags", "open graph tags", "twitter meta tags"],
    metaDescription:
      "Generate HTML, Open Graph, and Twitter meta tags in the browser with practical defaults and copy-ready output.",
    overview: [
      "Meta tags are repetitive enough to deserve a focused generator, especially when a page needs canonical, Open Graph, and Twitter fields at the same time.",
      "This page turns a few inputs into a copy-ready head snippet so marketers, founders, and developers can move faster during launches and audits.",
    ],
    relatedSlugs: ["robots-txt-generator", "sitemap-generator", "seo-word-counter"],
    slug: "meta-tag-generator",
    supportingNotes: [
      "The result panel keeps the markup easy to review and copy without forcing you into a one-off code editor flow.",
      "It also fits neatly into a broader SEO toolkit because the same widget pattern can power generators, analyzers, and parsers with consistent UI.",
    ],
    title: "Meta Tag Generator",
    toolId: "meta-tag-generator",
    useCases: [
      "Draft a metadata snippet for a new landing page or blog post.",
      "Create a cleaner social preview setup during a site launch.",
      "Quickly compare title and description lengths before publishing.",
    ],
  },
  {
    aliases: ["robots.txt generator", "robots generator", "generate robots.txt"],
    categoryKey: "seo",
    description: "Create a simple robots.txt file with allow, disallow, and sitemap lines.",
    examples: [
      { expression: "Block search and admin paths", result: "Robots.txt lines ready for deployment" },
      { expression: "Add a sitemap URL", result: "Crawler hint included below the rules" },
      { expression: "Allow a specific directory", result: "Mixed allow and disallow rules in one file" },
    ],
    faq: [
      {
        answer: "Use it when you want search engines to avoid internal paths like search results, admin areas, or private utility routes.",
        question: "Why would I generate a robots.txt file?",
      },
      {
        answer: "No. Robots.txt is a crawler hint, not an access-control system. Sensitive content still needs real authentication.",
        question: "Does robots.txt protect private content?",
      },
      {
        answer: "Yes. Adding the sitemap line gives crawlers a direct pointer to the URLs you do want indexed.",
        question: "Should I include the sitemap URL in robots.txt?",
      },
    ],
    keywords: ["robots.txt generator", "robots file", "seo crawler rules", "robots directives"],
    overview: [
      "Robots.txt setup is usually small, but it is easy to make mistakes when paths, allow rules, and sitemap hints are scattered across docs or old snippets.",
      "This tool keeps that workflow structured so you can produce a clean starter file for launches, audits, or client handoff.",
    ],
    relatedSlugs: ["meta-tag-generator", "sitemap-generator", "url-parser"],
    slug: "robots-txt-generator",
    supportingNotes: [
      "It is especially useful during site setup, migrations, and staging reviews where indexing rules still change quickly.",
      "Because it uses the shared form-and-result widget, it can stay simple without needing route-specific page logic.",
    ],
    title: "Robots.txt Generator",
    toolId: "robots-txt-generator",
    useCases: [
      "Draft crawler rules for a new site or staging environment.",
      "Create a cleaner handoff file for a client or content team.",
      "Review allow and disallow paths before deployment.",
    ],
  },
  {
    aliases: ["sitemap generator", "xml sitemap generator", "generate sitemap.xml"],
    categoryKey: "seo",
    description: "Generate a lightweight XML sitemap from a base URL and a route list.",
    examples: [
      { expression: "Add the main landing pages", result: "Valid XML sitemap output" },
      { expression: "Include lastmod timestamps", result: "Each URL gets a lastmod field" },
      { expression: "Mix paths and full URLs", result: "Normalized sitemap entries" },
    ],
    faq: [
      {
        answer: "An XML sitemap helps search engines discover the important pages on a site more reliably.",
        question: "What is the sitemap generator for?",
      },
      {
        answer: "Yes. Paths are joined to the base URL, while full URLs are preserved as they are.",
        question: "Can I enter both paths and full URLs?",
      },
      {
        answer: "No. It is a practical generator for a route list you already know, not a crawler that scans the whole site automatically.",
        question: "Does this tool crawl my site for me?",
      },
    ],
    keywords: ["sitemap generator", "xml sitemap", "seo sitemap tool", "generate sitemap"],
    overview: [
      "Sitemap generation is often a simple formatting job, but it still needs clean XML, normalized URLs, and a fast way to copy the result.",
      "This tool is designed for that narrow, practical need so teams can publish or update sitemaps without writing one by hand.",
    ],
    relatedSlugs: ["robots-txt-generator", "meta-tag-generator", "utm-builder"],
    slug: "sitemap-generator",
    supportingNotes: [
      "It works especially well for small marketing sites, tool directories, and launch pages where the important route list is already known.",
      "Keeping the output browser based also makes it a comfortable fit for quick audits and operations work.",
    ],
    title: "Sitemap Generator",
    toolId: "sitemap-generator",
    useCases: [
      "Build a sitemap for a new launch or microsite.",
      "Update a route list after adding fresh landing pages.",
      "Create XML output quickly during an SEO audit or migration.",
    ],
  },
  {
    aliases: ["keyword density checker", "seo keyword density", "keyword density tool"],
    categoryKey: "seo",
    description: "Analyze repeated non-trivial terms in a draft and surface the top keyword clusters.",
    examples: [
      { expression: "Paste a landing page draft", result: "Top repeated terms with density percentages" },
      { expression: "Trim max keywords to 5", result: "Shorter density summary for fast review" },
      { expression: "Paste article copy", result: "Word totals and strongest repeated terms" },
    ],
    faq: [
      {
        answer: "It helps you spot whether a draft is overusing a term, missing its focus phrase, or clustering around unexpected wording.",
        question: "What is the keyword density checker useful for?",
      },
      {
        answer: "No. Density is only a signal. The page still needs clear intent, readable writing, and useful information.",
        question: "Is a higher keyword density always better?",
      },
      {
        answer: "Common stop words are filtered so the output focuses on more meaningful terms.",
        question: "Does the tool ignore common filler words?",
      },
    ],
    keywords: ["keyword density checker", "seo copy audit", "keyword analysis", "content density"],
    overview: [
      "Keyword density is best used as a rough editorial signal, not a goal by itself. This tool keeps the output focused on the terms that actually stand out in a draft.",
      "It is a fast way to review landing pages, blog posts, and campaign copy before sharing or publishing them.",
    ],
    relatedSlugs: ["seo-word-counter", "meta-tag-generator", "tweet-length-counter"],
    slug: "keyword-density-checker",
    supportingNotes: [
      "The result panel is intentionally compact so you can spot the big patterns without turning the tool into a full SEO suite.",
      "That also makes it easy to cross-link with writing and social tools where concise copy matters just as much.",
    ],
    title: "Keyword Density Checker",
    toolId: "keyword-density-checker",
    useCases: [
      "Review a landing page before publishing or sending it for approval.",
      "Check whether article copy overuses one phrase too heavily.",
      "Spot unexpected repeated words during a content audit.",
    ],
  },
);

utilityToolSeeds.push(
  {
    aliases: ["color contrast checker", "wcag contrast checker", "contrast ratio tool"],
    categoryKey: "utility",
    description: "Check WCAG contrast ratio between two colors and preview the pair live.",
    examples: [
      { expression: "Dark text on a light background", result: "AA and AAA pass or fail labels" },
      { expression: "Brand accent against white", result: "Contrast ratio plus sample CSS" },
      { expression: "Low-contrast pair", result: "Immediate fail state and clearer guidance" },
    ],
    faq: [
      {
        answer: "It calculates the contrast ratio and then checks that ratio against WCAG AA and AAA thresholds.",
        question: "What does the color contrast checker measure?",
      },
      {
        answer: "Yes. The preview helps you judge the colors visually, while the ratio gives you a more objective accessibility check.",
        question: "Why does this tool include both a ratio and a preview?",
      },
      {
        answer: "Use it for buttons, body text, cards, badges, and any other UI elements where legibility matters.",
        question: "When should I use a contrast checker?",
      },
    ],
    keywords: ["color contrast checker", "wcag contrast", "accessibility contrast", "contrast ratio"],
    overview: [
      "Contrast checking is one of the most practical design utilities because accessibility issues often start with a color pair that looked fine in isolation.",
      "This page keeps the workflow concrete with a ratio, pass or fail states, live preview, and copy-ready CSS output.",
    ],
    relatedSlugs: ["color-picker", "css-gradient-generator", "favicon-generator"],
    slug: "color-contrast-checker",
    supportingNotes: [
      "It is especially helpful during design handoff, UI QA, and small theme changes where a quick browser-side check can prevent regressions.",
      "The shared style widget also makes it easy to add more design helpers later without branching into isolated components.",
    ],
    title: "Color Contrast Checker",
    toolId: "color-contrast-checker",
    useCases: [
      "Check whether a UI color pair passes accessibility thresholds.",
      "Review button, card, and text colors during design QA.",
      "Generate copy-ready CSS while you test contrast options.",
    ],
  },
  {
    aliases: ["css gradient generator", "gradient generator", "linear gradient generator"],
    categoryKey: "utility",
    description: "Build a linear CSS gradient with start and end colors, angle control, preview, and copy output.",
    examples: [
      { expression: "Blue to teal at 135 degrees", result: "Ready-to-paste linear-gradient CSS" },
      { expression: "Swap the end color", result: "Updated preview and CSS in one click" },
      { expression: "Use a shallow angle", result: "A softer directional gradient" },
    ],
    faq: [
      {
        answer: "This page focuses on linear gradients with two color stops because that covers many practical UI and hero-background needs.",
        question: "What kind of gradients does this tool generate?",
      },
      {
        answer: "Yes. The output is plain CSS you can paste into a class, style block, or design token definition.",
        question: "Can I copy the generated gradient CSS directly?",
      },
      {
        answer: "It is useful for hero sections, cards, buttons, badges, backgrounds, and accent blocks.",
        question: "When would I use a CSS gradient generator?",
      },
    ],
    keywords: ["css gradient generator", "linear gradient generator", "background gradient", "gradient css"],
    overview: [
      "Gradient builders are most useful when the preview and CSS stay side by side. This tool keeps that relationship simple and fast.",
      "It is designed for designers and frontend teams who want to iterate on a direction quickly without opening a heavier graphics tool.",
    ],
    relatedSlugs: ["color-contrast-checker", "box-shadow-generator", "border-radius-generator"],
    slug: "css-gradient-generator",
    supportingNotes: [
      "The shared design-widget pattern makes this a natural neighbor to contrast, shadow, and radius tools.",
      "That consistency matters because these visual helpers are often used together during the same UI pass.",
    ],
    title: "CSS Gradient Generator",
    toolId: "css-gradient-generator",
    useCases: [
      "Create background gradients for hero sections and feature cards.",
      "Test brand accent combinations in the browser quickly.",
      "Copy clean gradient CSS without opening a design app.",
    ],
  },
  {
    aliases: ["box shadow generator", "css box shadow generator", "shadow generator"],
    categoryKey: "utility",
    description: "Generate box-shadow CSS with offsets, blur, spread, opacity, and inset control.",
    examples: [
      { expression: "Soft card shadow", result: "Copy-ready box-shadow CSS" },
      { expression: "Inset control enabled", result: "Pressed-style inset shadow output" },
      { expression: "Higher blur with negative spread", result: "Softer floating panel effect" },
    ],
    faq: [
      {
        answer: "You can adjust horizontal offset, vertical offset, blur, spread, color, opacity, and whether the shadow is inset.",
        question: "What settings does the box shadow generator support?",
      },
      {
        answer: "Blur softens the edge of the shadow, while spread grows or shrinks the size of the shadow footprint.",
        question: "What is the difference between blur and spread?",
      },
      {
        answer: "Use it when styling cards, overlays, buttons, menus, and other UI surfaces that need depth.",
        question: "When is a box shadow generator useful?",
      },
    ],
    keywords: ["box shadow generator", "css shadow generator", "box-shadow css", "ui shadow tool"],
    overview: [
      "Shadows are quick to tweak in CSS but awkward to dial in from memory. This tool keeps the most important controls visible in one place with a preview surface.",
      "That makes it useful for everyday interface polish, especially when you are iterating between several surfaces and need repeatable output.",
    ],
    relatedSlugs: ["css-gradient-generator", "border-radius-generator", "color-picker"],
    slug: "box-shadow-generator",
    supportingNotes: [
      "The preview helps you judge whether a shadow still feels too sharp, too flat, or too heavy before you copy it into code.",
      "Because it reuses the same design-widget shell, it stays consistent with the rest of the micro utility family.",
    ],
    title: "Box Shadow Generator",
    toolId: "box-shadow-generator",
    useCases: [
      "Create soft shadows for cards, modals, and menus.",
      "Test inset and raised UI treatments quickly.",
      "Copy a tuned box-shadow value straight into CSS.",
    ],
  },
  {
    aliases: ["border radius generator", "css border radius generator", "rounded corner generator"],
    categoryKey: "utility",
    description: "Generate border-radius CSS with separate corner controls and a live preview.",
    examples: [
      { expression: "All corners equal", result: "Simple rounded-card CSS" },
      { expression: "One larger hero corner", result: "Asymmetric rounded shape" },
      { expression: "Square bottom with round top", result: "Mixed-corner radius output" },
    ],
    faq: [
      {
        answer: "Each corner can be adjusted independently so the output works for both even rounding and more expressive asymmetrical shapes.",
        question: "What does the border radius generator control?",
      },
      {
        answer: "Yes. The output is standard CSS shorthand you can paste directly into a component or stylesheet.",
        question: "Can I copy the generated border-radius CSS directly?",
      },
      {
        answer: "It is useful for cards, avatars, buttons, panels, decorative shapes, and design system token work.",
        question: "When is a border radius generator useful?",
      },
    ],
    keywords: ["border radius generator", "rounded corners css", "css border-radius", "corner radius tool"],
    overview: [
      "Border-radius values are simple, but asymmetric corners are still tedious to build by hand. This tool keeps the controls visual and copy friendly.",
      "It is a lightweight helper for interface polish, especially when one component needs a more intentional or branded corner treatment.",
    ],
    relatedSlugs: ["box-shadow-generator", "css-gradient-generator", "favicon-generator"],
    slug: "border-radius-generator",
    supportingNotes: [
      "The preview is useful because unusual corner combinations are much easier to evaluate visually than by reading the raw shorthand alone.",
      "It also fits neatly beside the other small design helpers in this family, which often get used during the same styling pass.",
    ],
    title: "Border Radius Generator",
    toolId: "border-radius-generator",
    useCases: [
      "Tune card and button corners without trial and error.",
      "Create more distinctive asymmetrical UI shapes.",
      "Copy a clean border-radius shorthand into your stylesheet.",
    ],
  },
);

utilityToolSeeds.push(
  {
    aliases: ["username generator", "social username generator", "brand username ideas"],
    categoryKey: "social",
    description: "Generate username ideas from a brand name, creator name, or topic keyword.",
    examples: [
      { expression: "convert center", result: "Dot, prefix, and suffix username ideas" },
      { expression: "creator studio", result: "Brand-style handles for social profiles" },
      { expression: "travel notes", result: "Simple handle variations for a new account" },
    ],
    faq: [
      {
        answer: "It creates small variations around a seed phrase using separators, prefixes, and suffixes that are common in social handles.",
        question: "How does the username generator create ideas?",
      },
      {
        answer: "No. It is an idea generator, so availability still depends on the platform you plan to use.",
        question: "Does the tool check whether a username is available?",
      },
      {
        answer: "It is helpful when launching a new profile, renaming a brand account, or brainstorming a more memorable handle.",
        question: "When should I use a username generator?",
      },
    ],
    keywords: ["username generator", "social handle ideas", "brand username ideas", "instagram username"],
    overview: [
      "Finding a handle that feels available, readable, and on-brand can take longer than it should. This tool shortens that first brainstorming pass.",
      "It keeps the output list easy to scan so you can quickly keep the options you like and discard the rest.",
    ],
    relatedSlugs: ["hashtag-generator", "bio-text-formatter", "instagram-font-generator"],
    slug: "username-generator",
    supportingNotes: [
      "It is designed for idea generation, not account lookup, which keeps the tool lightweight and browser safe.",
      "The same small-form widget also works well for future generator-style utilities where the output is mostly text.",
    ],
    title: "Username Generator",
    toolId: "username-generator",
    useCases: [
      "Brainstorm new handles for a creator or brand account.",
      "Generate variations around an existing project name.",
      "Prepare a shortlist before checking availability on platforms.",
    ],
  },
  {
    aliases: ["instagram font generator", "social font generator", "unicode font generator"],
    categoryKey: "social",
    description: "Generate copy-ready Unicode text styles for Instagram bios, captions, and profile labels.",
    examples: [
      { expression: "creator tools", result: "Several bold, script, and monospace variants" },
      { expression: "launch today", result: "Stylized text for a bio or caption hook" },
      { expression: "brand name 2026", result: "Unicode styles that keep numbers too" },
    ],
    faq: [
      {
        answer: "It maps normal text into Unicode lookalike characters so the result can be copied into supported social fields.",
        question: "How does the Instagram font generator work?",
      },
      {
        answer: "Not always. These are Unicode variants, so support depends on the platform, device, and font rendering.",
        question: "Do Instagram-style fonts work everywhere?",
      },
      {
        answer: "Use them sparingly. A short stylized name or heading usually reads better than a whole dense paragraph in fancy text.",
        question: "What is the best way to use social font variants?",
      },
    ],
    keywords: ["instagram font generator", "unicode font generator", "social media fonts", "fancy text"],
    overview: [
      "Stylized Unicode text is popular for bios and profile labels because it helps a short line stand out without requiring image editing.",
      "This tool keeps the workflow practical by generating several readable styles at once and letting you copy the one that fits best.",
    ],
    relatedSlugs: ["bio-text-formatter", "username-generator", "color-contrast-checker"],
    slug: "instagram-font-generator",
    supportingNotes: [
      "The output is best for short labels, names, and emphasis rather than long captions, which can become hard to read quickly.",
      "Because it runs locally and returns plain text only, it also fits cleanly into the shared utility-tool framework.",
    ],
    title: "Instagram Font Generator",
    toolId: "instagram-font-generator",
    useCases: [
      "Style a short bio line or profile name.",
      "Generate alternatives for a caption hook or highlight label.",
      "Compare a few social-friendly Unicode styles quickly.",
    ],
  },
  {
    aliases: ["bio text formatter", "social bio formatter", "instagram bio generator"],
    categoryKey: "social",
    description: "Format a few profile ingredients into copy-ready bio variations with clean line breaks.",
    examples: [
      { expression: "Brand name plus role and CTA", result: "Several short bio layouts" },
      { expression: "Creator bio with proof point", result: "Readable multi-line profile text" },
      { expression: "Launch bio refresh", result: "Fresh social bio options ready to paste" },
    ],
    faq: [
      {
        answer: "It takes a name, role, proof point, and call to action, then turns them into a few short bio layouts.",
        question: "What inputs does the bio text formatter use?",
      },
      {
        answer: "Yes. The point is to create a better starting point that you can trim or personalize before publishing.",
        question: "Can I edit the generated bio variants afterward?",
      },
      {
        answer: "It is most useful when you want quick structure, especially for a new profile, a relaunch, or a campaign-focused update.",
        question: "When is a bio formatter more useful than writing from scratch?",
      },
    ],
    keywords: ["bio text formatter", "instagram bio generator", "social bio tool", "profile bio formatter"],
    overview: [
      "Social bios are short, but they still need structure. This tool turns a few profile building blocks into clearer, easier-to-scan layouts.",
      "That makes it useful for creators, small teams, and marketers who want faster profile updates without overthinking the first draft.",
    ],
    relatedSlugs: ["instagram-font-generator", "username-generator", "tweet-length-counter"],
    slug: "bio-text-formatter",
    supportingNotes: [
      "The variations are intentionally simple so the output is easy to edit and still feels human once you personalize it.",
      "It also pairs well with font and username tools, which often get used during the same profile setup flow.",
    ],
    title: "Bio Text Formatter",
    toolId: "bio-text-formatter",
    useCases: [
      "Refresh a creator or brand bio quickly.",
      "Generate profile copy options for a new account launch.",
      "Turn rough notes into a cleaner multi-line social bio.",
    ],
  },
  {
    aliases: ["tweet length counter", "x post length counter", "twitter character counter"],
    categoryKey: "social",
    description: "Estimate weighted tweet length with URL handling and remaining-character feedback.",
    examples: [
      { expression: "Short launch post", result: "Comfortable distance from the limit" },
      { expression: "Draft with a URL", result: "Weighted count reflects shortened-link behavior" },
      { expression: "Long thread opener", result: "Remaining characters or over-limit status" },
    ],
    faq: [
      {
        answer: "It applies a URL-aware estimate so pasted links count more like platform-shortened URLs instead of raw character length.",
        question: "Why does the tweet length counter treat URLs differently?",
      },
      {
        answer: "The tool is a practical estimate for writing and trimming drafts quickly, even though platform behavior can still change over time.",
        question: "Is the count perfectly identical to what the platform will show?",
      },
      {
        answer: "It is useful whenever you want to tighten a post before publishing, especially if the copy includes one or more links.",
        question: "When should I use a tweet length counter?",
      },
    ],
    keywords: ["tweet length counter", "twitter character counter", "x post counter", "social post length"],
    overview: [
      "Short-form social copy often fails at the last minute because a pasted link changes the real character count. This tool gives you a fast, more realistic estimate before posting.",
      "It is built for practical draft cleanup rather than advanced scheduling, which keeps the workflow quick and easy to trust.",
    ],
    relatedSlugs: ["hashtag-generator", "seo-word-counter", "bio-text-formatter"],
    slug: "tweet-length-counter",
    supportingNotes: [
      "The remaining-character metric is especially useful when you are tightening a callout, launch post, or thread opener in a hurry.",
      "It also creates a natural bridge between SEO copy review and social publishing tools inside the same family.",
    ],
    title: "Tweet Length Counter",
    toolId: "tweet-length-counter",
    useCases: [
      "Trim a post before publishing on X or repurposing it elsewhere.",
      "Check whether a URL pushes your draft too close to the limit.",
      "Compare shorter and longer social copy versions quickly.",
    ],
  },
  {
    aliases: ["password strength checker", "password checker", "password score tool"],
    categoryKey: "utility",
    description: "Check a password draft against common strength signals and get practical improvement suggestions.",
    examples: [
      { expression: "Short lowercase password", result: "Weak score with targeted suggestions" },
      { expression: "Mixed-case password with numbers", result: "Improved score and label" },
      { expression: "Longer password with symbols", result: "Higher score and stronger label" },
    ],
    faq: [
      {
        answer: "It looks at length, character variety, repetition, and a few common weak patterns to create a practical score.",
        question: "How does the password strength checker score a password?",
      },
      {
        answer: "No. It is a helpful front-end check, but strong password hygiene still depends on uniqueness and safe storage too.",
        question: "Does a strong score guarantee the password is secure?",
      },
      {
        answer: "It is useful during signup design, onboarding content, internal training, or any quick password-quality review.",
        question: "When would I use a password strength checker?",
      },
    ],
    keywords: ["password strength checker", "password score", "password quality tool", "strong password"],
    overview: [
      "Password feedback is more useful when it explains how to improve the draft instead of only printing a vague score.",
      "This tool is built around that practical guidance so the result can support product UX, internal training, or personal checks.",
    ],
    relatedSlugs: ["color-contrast-checker", "meta-tag-generator", "regex-tester"],
    slug: "password-strength-checker",
    supportingNotes: [
      "The scoring model stays intentionally simple so the tool remains easy to understand and fast to use in the browser.",
      "That simplicity also makes it a good fit for a shared micro-utility family rather than a one-off security page.",
    ],
    title: "Password Strength Checker",
    toolId: "password-strength-checker",
    useCases: [
      "Review a password draft before using it in a new account.",
      "Add clearer password advice to onboarding or support content.",
      "Demonstrate why length and variety matter during training.",
    ],
  },
);

utilityToolSeeds.push(
  {
    aliases: ["seo word counter", "seo content counter", "seo length checker"],
    categoryKey: "seo",
    description: "Count words, characters, sentences, paragraphs, and reading time for SEO-friendly draft review.",
    examples: [
      { expression: "Paste a short product page", result: "Word, character, sentence, and paragraph totals" },
      { expression: "Check reading time", result: "Estimated minutes surfaced in the result panel" },
      { expression: "Paste long-form content", result: "Full copy metrics in one structured output" },
    ],
    faq: [
      {
        answer: "It counts the simple length signals editors and marketers check often: words, characters, sentences, paragraphs, and reading time.",
        question: "What does the SEO word counter measure?",
      },
      {
        answer: "Not by itself. It is a fast diagnostic tool for copy length and structure, not a ranking predictor.",
        question: "Does this tool tell me whether the content will rank?",
      },
      {
        answer: "It is useful whenever you want quick length checks before handing a draft to design, content, or SEO review.",
        question: "When should I use the SEO word counter instead of a plain word counter?",
      },
    ],
    keywords: ["seo word counter", "content length checker", "reading time tool", "seo copy stats"],
    overview: [
      "Editors and marketers often need more than a plain word count. They need a quick sense of copy length, structure, and reading time before the page moves forward.",
      "This tool keeps those practical checks together in one compact output so content review feels faster and more consistent.",
    ],
    relatedSlugs: ["keyword-density-checker", "meta-tag-generator", "tweet-length-counter"],
    slug: "seo-word-counter",
    supportingNotes: [
      "It pairs especially well with metadata and social tools because length constraints and clarity tend to affect those workflows together.",
      "The output is also copy friendly, which helps when metrics need to move into briefs or review notes.",
    ],
    title: "SEO Word Counter",
    toolId: "seo-word-counter",
    useCases: [
      "Check landing page copy before design or stakeholder review.",
      "Estimate reading time for article drafts and resource pages.",
      "Capture structured content metrics during an audit.",
    ],
  },
  {
    aliases: ["url parser", "parse url", "url breakdown tool"],
    categoryKey: "seo",
    description: "Break a URL into origin, path, segments, query parameters, and hash values.",
    examples: [
      { expression: "Paste a campaign URL", result: "Clean path and query parameters parsed out" },
      { expression: "Paste a long docs URL", result: "Host, path, hash, and segments surfaced" },
      { expression: "Paste a UTM URL", result: "Parameters separated for easier inspection" },
    ],
    faq: [
      {
        answer: "It surfaces the origin, hostname, path, query parameters, path segments, and hash so the URL is easier to inspect.",
        question: "What does the URL parser show?",
      },
      {
        answer: "Yes. If a protocol is missing, the tool normalizes the value so you still get a useful parse.",
        question: "Can the URL parser handle incomplete pasted URLs?",
      },
      {
        answer: "It is especially useful for campaign links, debugging redirects, analytics review, and general URL cleanup work.",
        question: "When is a URL parser helpful?",
      },
    ],
    keywords: ["url parser", "parse url", "query parameter parser", "url breakdown"],
    overview: [
      "URLs often carry campaign tags, redirect clues, and path details that are hard to read in one long string. This tool breaks them into a friendlier structure.",
      "It is practical for marketers, developers, and operators who just want to inspect a link without opening DevTools or a custom script.",
    ],
    relatedSlugs: ["utm-builder", "utm-parser", "meta-tag-generator"],
    slug: "url-parser",
    supportingNotes: [
      "Because the result stays structured and copy ready, it also works well for documentation, QA notes, and analytics debugging.",
      "That structured output pattern can support more parser-style utilities later without changing the page architecture.",
    ],
    title: "URL Parser",
    toolId: "url-parser",
    useCases: [
      "Inspect long campaign links before sharing them.",
      "Check path segments and parameters during analytics review.",
      "Debug copied URLs without switching to a developer tool.",
    ],
  },
  {
    aliases: ["utm builder", "campaign url builder", "utm link builder"],
    categoryKey: "seo",
    description: "Build campaign-tagged URLs with utm_source, utm_medium, utm_campaign, and optional extra fields.",
    examples: [
      { expression: "Newsletter campaign link", result: "Tagged URL ready to paste into email" },
      { expression: "Paid social URL with term", result: "Campaign, medium, source, and term added" },
      { expression: "Reuse a base landing page", result: "Fresh UTM parameters layered onto the URL" },
    ],
    faq: [
      {
        answer: "It appends the common UTM campaign parameters to a base URL so analytics tools can group the traffic source more clearly.",
        question: "What does the UTM builder do?",
      },
      {
        answer: "Source, medium, and campaign are the usual baseline because they identify where the click came from and why the link exists.",
        question: "Why are source, medium, and campaign required?",
      },
      {
        answer: "Yes. If the base URL already has parameters, the tool preserves them and adds the UTM values on top.",
        question: "Can I use the UTM builder with a URL that already has query parameters?",
      },
    ],
    keywords: ["utm builder", "campaign url builder", "utm link generator", "marketing url tags"],
    overview: [
      "Campaign tagging is simple in theory, but it still creates a lot of repetitive work when links need to be clean and consistent across email, social, and paid channels.",
      "This page turns that into a quick browser-side workflow with practical defaults and copy-ready output.",
    ],
    relatedSlugs: ["utm-parser", "url-parser", "hashtag-generator"],
    slug: "utm-builder",
    supportingNotes: [
      "It is especially helpful when campaign links are shared by non-technical teammates who still need a reliable result.",
      "The same structured form pattern also makes it easy to expand into future marketing utilities later.",
    ],
    title: "UTM Builder",
    toolId: "utm-builder",
    useCases: [
      "Create campaign links for newsletters, paid ads, or partner posts.",
      "Standardize UTM naming before launching a campaign.",
      "Build share-ready URLs without touching a spreadsheet.",
    ],
  },
  {
    aliases: ["utm parser", "parse utm url", "utm tag parser"],
    categoryKey: "seo",
    description: "Read UTM tags back out of a campaign URL and separate them from the clean base link.",
    examples: [
      { expression: "Paste a social campaign URL", result: "UTM fields split from the base URL" },
      { expression: "Parse a messy analytics link", result: "Extra non-UTM params kept separate" },
      { expression: "Inspect a shared partner URL", result: "Campaign tags turned into a readable object" },
    ],
    faq: [
      {
        answer: "It extracts the common UTM fields, shows any extra non-UTM parameters, and gives you a cleaned base URL.",
        question: "What does the UTM parser return?",
      },
      {
        answer: "Yes. The tool keeps non-UTM parameters in a separate output block so they are easier to review.",
        question: "Will it keep non-UTM query parameters too?",
      },
      {
        answer: "It is useful for campaign audits, QA checks, partner links, and analytics cleanup where you need to inspect a tagged URL quickly.",
        question: "When should I use a UTM parser?",
      },
    ],
    keywords: ["utm parser", "campaign url parser", "parse utm tags", "utm analyzer"],
    overview: [
      "UTM links are easy to build, but they are not always easy to read later when you are reviewing campaigns or validating shared URLs.",
      "This tool turns those parameters back into a clear structure so the link is easier to debug, document, or standardize.",
    ],
    relatedSlugs: ["utm-builder", "url-parser", "keyword-density-checker"],
    slug: "utm-parser",
    supportingNotes: [
      "It is a useful companion to the UTM builder because teams often need both creation and inspection in the same workflow family.",
      "Keeping the outputs separate also makes it easier to paste just the clean URL or just the tags into notes and reviews.",
    ],
    title: "UTM Parser",
    toolId: "utm-parser",
    useCases: [
      "Audit shared campaign links before a launch goes live.",
      "Inspect partner or affiliate URLs quickly.",
      "Pull the clean landing page URL out of a long tagged link.",
    ],
  },
  {
    aliases: ["hashtag generator", "instagram hashtag generator", "social hashtag ideas"],
    categoryKey: "social",
    description: "Generate a compact hashtag set from a topic, campaign phrase, or product name.",
    examples: [
      { expression: "seo tools launch", result: "Reusable hashtag set for social posts" },
      { expression: "summer sale campaign", result: "Hashtag variants built from the phrase" },
      { expression: "creator growth tips", result: "Hashtags suited to an educational post" },
    ],
    faq: [
      {
        answer: "It turns a seed phrase into a small, readable hashtag list with both root tags and variation tags.",
        question: "How does the hashtag generator work?",
      },
      {
        answer: "Not automatically. It is a starting list that still benefits from platform context and your audience knowledge.",
        question: "Are generated hashtags always the best ones to publish?",
      },
      {
        answer: "It is useful when you need a quick first pass for captions, short-form launches, or a campaign brainstorm.",
        question: "When is a hashtag generator most helpful?",
      },
    ],
    keywords: ["hashtag generator", "social hashtags", "instagram hashtags", "campaign hashtags"],
    overview: [
      "Hashtag selection is one of those repetitive social tasks where a quick first draft is often more useful than a blank input.",
      "This tool focuses on that fast starting point so social and marketing teams can generate ideas without losing momentum.",
    ],
    relatedSlugs: ["username-generator", "instagram-font-generator", "utm-builder"],
    slug: "hashtag-generator",
    supportingNotes: [
      "The output stays compact on purpose so the result is easy to copy into a caption draft or planning doc.",
      "It also connects naturally to campaign tooling like UTM builders, where social publishing and tracking often overlap.",
    ],
    title: "Hashtag Generator",
    toolId: "hashtag-generator",
    useCases: [
      "Build a starter hashtag set for a launch post or carousel.",
      "Create quick social caption ideas during campaign planning.",
      "Generate reusable topic tags without opening another app.",
    ],
  },
);

export const utilityToolPages: InteractiveToolPageDefinition[] = utilityToolSeeds.map((page) => ({
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
    kind: "utility-tool",
    toolId: page.toolId,
  },
}));
