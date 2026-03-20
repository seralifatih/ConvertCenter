import type { DevToolPageSchema } from "./conversion-types";
import {
  defineContentSection,
  defineFaq,
  defineFaqs,
  defineStructuredContent,
  defineTextTransformPage,
} from "./registry-helpers";

const uppercaseLongDescription = defineStructuredContent(
  "About converting text to uppercase",
  defineContentSection("What uppercase conversion actually does", [
    'Uppercase conversion changes every alphabetical character in your text to its capital form. The content itself does not become shorter or more complex, but the tone changes immediately. A plain sentence like "system maintenance starts at midnight" becomes "SYSTEM MAINTENANCE STARTS AT MIDNIGHT." That makes the text feel stronger, louder, and more visible at a glance.',
  ]),
  defineContentSection("Where uppercase is genuinely useful", [
    "This transformation is useful when you need emphasis, consistency, or quick cleanup. Teams often use uppercase for short labels, status chips, button copy, warning text, navigation elements, and spreadsheet headers. It is also common in design systems where interface tokens or category labels need a uniform visual style. Instead of retyping a phrase manually, an uppercase converter lets you paste the source text and get a ready-to-use version instantly.",
  ]),
  defineContentSection("A few practical examples", [
    'If you start with "new feature available now," the uppercase result becomes "NEW FEATURE AVAILABLE NOW." A label such as "shipping status" turns into "SHIPPING STATUS." Even small UI strings like "save draft" can be converted into "SAVE DRAFT" when a design calls for that presentation. The change is simple, but it saves time when you are working through many labels or updating content in bulk.',
  ]),
  defineContentSection("Things to keep in mind", [
    "Uppercase is best for short text. It works well for headings, calls to action, and interface elements, but it can hurt readability in long paragraphs. That is why this tool is most helpful when you need fast formatting for compact pieces of copy rather than full documents.",
  ]),
);

const titleCaseLongDescription = defineStructuredContent(
  "About converting text to title case",
  defineContentSection("Why title case is a presentation tool, not just a style trick", [
    'Title case capitalizes the important words in a phrase so the result looks polished and intentional. It is commonly used for article titles, cards, navigation labels, presentation headings, and product names. If you paste in "how to improve api response times," the output becomes "How To Improve Api Response Times" in this tool\'s straightforward title-case style.',
  ]),
  defineContentSection("When title case helps most", [
    "This converter is useful when draft copy comes from inconsistent sources. Maybe a headline was written in all lowercase, maybe it came out of a spreadsheet, or maybe multiple teammates formatted titles differently. Title case gives you a fast cleanup step before publishing. It is especially handy for CMS work, marketing pages, internal dashboards, and content libraries where headings need to look consistent across dozens of entries.",
  ]),
  defineContentSection("Examples and practical use", [
    'A card title like "customer onboarding checklist" becomes "Customer Onboarding Checklist." A knowledge base entry such as "resetting your account password" turns into "Resetting Your Account Password." Even internal labels like "monthly sales summary" become easier to scan once they are normalized into a heading-style format.',
  ]),
  defineContentSection("Why people use a converter instead of editing by hand", [
    "Manually capitalizing title text is easy once or twice, but error-prone when you are working through a long list. A converter is faster, more consistent, and better for repetitive formatting tasks. It helps editors, marketers, and product teams standardize headings without slowing down the rest of the workflow.",
  ]),
);

const snakeCaseLongDescription = defineStructuredContent(
  "About converting text to snake_case",
  defineContentSection("Built for identifiers, not prose", [
    'snake_case is a text format where words are lowercase and joined with underscores. Instead of spaces or punctuation, the underscore acts as the separator: "Customer account status" becomes "customer_account_status". This pattern is common in backend systems, database columns, environment variables, analytics keys, and configuration files where readable but machine-friendly naming matters.',
  ]),
  defineContentSection("Why developers reach for snake_case", [
    "The main advantage of snake_case is clarity. It is easy to read, easy to diff, and works well in places where spaces are not allowed. Some teams prefer it for schema fields and SQL columns because the word boundaries stay visible even in longer names. Compared with camelCase, it can feel more explicit. Compared with kebab-case, it avoids the hyphen characters that may conflict with certain parsers, flags, or code conventions.",
  ]),
  defineContentSection("Example transformations", [
    'Take the phrase "User Profile Image" and convert it to "user_profile_image". A label like "order total amount" becomes "order_total_amount". Even mixed strings such as "customer-account status history" can be normalized into a clean snake_case identifier. That makes the tool useful when source text comes from documentation, spreadsheets, ticket titles, or UI copy rather than from code.',
  ]),
  defineContentSection("When this tool is useful", [
    "This converter is most useful during API design, database work, event naming, and content migration. It saves time when you need to turn human-readable phrases into consistent field names without manually replacing every space and capitalization pattern. For repetitive developer workflows, that small speed gain adds up quickly.",
  ]),
);

export const textTransformPages = [
  defineTextTransformPage(
    "uppercase-converter",
    "uppercase",
    "Uppercase converter",
    "Convert pasted text to uppercase instantly and copy the result with one click.",
    "The quick brown fox jumps over the lazy dog.",
    {
      faq: defineFaqs(
        defineFaq(
          "When should I use uppercase instead of title case?",
          "Uppercase works best for short labels, alerts, buttons, and headings that need strong emphasis. Title case is usually better for polished editorial headings.",
        ),
        defineFaq(
          "Will an uppercase converter change numbers or punctuation?",
          "No. It only changes alphabetic characters to capital letters, so numbers, symbols, and punctuation stay the same.",
        ),
        defineFaq(
          "Why does uppercase text feel harder to read in long paragraphs?",
          "All-caps text removes the usual word shapes readers rely on, so it is fine for short UI strings but tiring for longer blocks of content.",
        ),
      ),
      featured: true,
      longDescription: uppercaseLongDescription,
      popular: true,
    },
  ),
  defineTextTransformPage(
    "lowercase-converter",
    "lowercase",
    "Lowercase converter",
    "Normalize text to lowercase for copy cleanup, imports, and quick formatting passes.",
    "The QUICK Brown Fox Jumps OVER the Lazy Dog.",
  ),
  defineTextTransformPage(
    "title-case-converter",
    "title",
    "Title case converter",
    "Turn messy text into polished title case for headings, cards, and content blocks.",
    "the quick brown fox jumps over the lazy dog",
    {
      faq: defineFaqs(
        defineFaq(
          "What kinds of text are usually converted to title case?",
          "Title case is commonly used for article titles, page headings, cards, presentation slides, and product names that need a cleaner display style.",
        ),
        defineFaq(
          "Does title case follow every editorial style guide?",
          "Not necessarily. Different style guides treat small words differently, so this converter is best for fast cleanup rather than strict publication-specific rules.",
        ),
        defineFaq(
          "Why use a title case converter instead of fixing capitalization by hand?",
          "It is faster and more consistent, especially when you are formatting many headings from spreadsheets, CMS exports, or rough draft copy.",
        ),
      ),
      longDescription: titleCaseLongDescription,
      popular: true,
    },
  ),
  defineTextTransformPage(
    "sentence-case-converter",
    "sentence",
    "Sentence case converter",
    "Convert text into sentence case for readable body copy, emails, and documentation.",
    "tHE QUICK BROWN FOX. jUMPS OVER THE LAZY DOG!",
  ),
  defineTextTransformPage(
    "reverse-text",
    "reverse",
    "Reverse Text Tool – Reverse strings instantly",
    "Reverse text instantly with this free online tool. Flip characters, sentences, or entire paragraphs in seconds.",
    "ConvertCenter reverse text example",
    {
      aliases: [
        "reverse text",
        "text reverser",
        "reverse string",
        "flip text",
      ],
      metaDescription:
        "Reverse text instantly with this free online tool. Flip characters, sentences, or entire paragraphs in seconds.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-line-breaks",
    "removeLineBreaks",
    "Remove Line Breaks – Clean multiline text instantly",
    "Remove line breaks from text quickly. Convert multiline content into a single line for emails, forms, and data processing.",
    "First line\nSecond line\nThird line",
    {
      aliases: [
        "remove line breaks",
        "remove newlines",
        "multiline to single line",
        "strip line breaks",
      ],
      metaDescription:
        "Remove line breaks from text quickly. Convert multiline content into a single line for emails, forms, and data processing.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-extra-spaces",
    "removeExtraSpaces",
    "Remove Extra Spaces – Clean up text spacing",
    "Remove extra spaces from text instantly. Normalize spacing for cleaner documents and code.",
    "Too    many   spaces    here",
    {
      aliases: [
        "remove extra spaces",
        "collapse spaces",
        "clean text spacing",
        "normalize spacing",
      ],
      metaDescription:
        "Remove extra spaces from text instantly. Normalize spacing for cleaner documents and code.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-duplicate-lines",
    "removeDuplicateLines",
    "Remove Duplicate Lines Tool",
    "Remove repeated lines from pasted text while keeping the first occurrence of each line in order.",
    "alpha\nbeta\nalpha\ngamma\nbeta",
    {
      actionLabel: "clean",
      aliases: [
        "remove duplicate lines",
        "dedupe lines",
        "delete duplicate lines",
        "unique lines tool",
      ],
      crossLinks: ["remove-empty-lines", "sort-lines", "join-lines"],
      metaDescription:
        "Remove duplicate lines instantly and keep only the first occurrence of each line for cleaner lists and exports.",
      popular: true,
      relatedSlugs: ["remove-empty-lines", "sort-lines", "join-lines"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-empty-lines",
    "removeEmptyLines",
    "Remove Empty Lines Tool",
    "Strip blank lines from text instantly for cleaner notes, exports, and code snippets.",
    "First line\n\nSecond line\n   \nThird line",
    {
      actionLabel: "clean",
      aliases: [
        "remove empty lines",
        "delete blank lines",
        "strip blank lines",
        "remove blank lines",
      ],
      crossLinks: ["remove-duplicate-lines", "join-lines", "line-breaks-to-commas"],
      metaDescription:
        "Remove empty lines from pasted text instantly to clean up lists, notes, exports, and copied content.",
      popular: true,
      relatedSlugs: ["remove-duplicate-lines", "join-lines", "line-breaks-to-commas"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-punctuation",
    "removePunctuation",
    "Remove Punctuation Tool",
    "Remove punctuation marks from text quickly for cleanup, matching, and plain-text processing.",
    "Hello, world! Ready-to-go? Yes.",
    {
      actionLabel: "clean",
      aliases: [
        "remove punctuation",
        "strip punctuation",
        "delete punctuation",
        "punctuation remover",
      ],
      crossLinks: ["remove-emojis", "remove-diacritics", "remove-non-ascii"],
      metaDescription:
        "Remove punctuation from text instantly for cleanup, parsing, normalization, and simple plain-text workflows.",
      popular: true,
      relatedSlugs: ["remove-emojis", "remove-diacritics", "remove-non-ascii"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "strip-html-tags",
    "stripHtmlTags",
    "Strip HTML Tags Tool",
    "Remove HTML tags and leave behind plain text for cleanup, imports, and text extraction.",
    "<p>Hello <strong>world</strong></p>",
    {
      actionLabel: "strip",
      aliases: [
        "strip html tags",
        "remove html tags",
        "html tag remover",
        "html to plain text",
      ],
      crossLinks: ["html-to-markdown", "remove-line-breaks", "remove-extra-spaces"],
      metaDescription:
        "Strip HTML tags from pasted content instantly and keep the plain-text result for cleanup and reuse.",
      popular: true,
      relatedSlugs: ["remove-line-breaks", "remove-extra-spaces"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-emojis",
    "removeEmojis",
    "Remove Emojis Tool",
    "Remove emoji characters from text for exports, forms, and plain-text cleanup.",
    "Ship it 🚀 Ready ✅",
    {
      actionLabel: "clean",
      aliases: [
        "remove emojis",
        "strip emojis",
        "emoji remover",
        "delete emoji characters",
      ],
      crossLinks: ["remove-punctuation", "remove-non-ascii", "remove-diacritics"],
      metaDescription:
        "Remove emojis from text instantly for plain-text exports, forms, and cleanup workflows.",
      popular: true,
      relatedSlugs: ["remove-non-ascii", "remove-diacritics"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "normalize-unicode",
    "normalizeUnicode",
    "Normalize Unicode Tool",
    "Normalize Unicode text into a consistent compatibility form for matching, cleanup, and safer exports.",
    "Cafe\u0301 \uFF21\uFF22\uFF23 \uFB01",
    {
      actionLabel: "normalize",
      aliases: [
        "normalize unicode",
        "unicode normalizer",
        "unicode normalization tool",
        "normalize unicode text",
      ],
      crossLinks: ["remove-diacritics", "remove-non-ascii", "remove-punctuation"],
      metaDescription:
        "Normalize Unicode text instantly into a consistent compatibility form for cleanup, matching, and safer plain-text workflows.",
      popular: true,
      relatedSlugs: ["remove-diacritics", "remove-non-ascii", "remove-punctuation"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-non-ascii",
    "removeNonAscii",
    "Remove Non-ASCII Characters Tool",
    "Remove characters outside the ASCII range for stricter plain-text output and exports.",
    "Cafe deja vu - año",
    {
      actionLabel: "clean",
      aliases: [
        "remove non ascii characters",
        "remove non-ascii",
        "strip non ascii",
        "ascii cleaner",
      ],
      crossLinks: ["remove-diacritics", "remove-emojis", "slug-generator"],
      metaDescription:
        "Remove non-ASCII characters from text instantly for plain-text exports, legacy systems, and cleanup tasks.",
      popular: true,
      relatedSlugs: ["remove-diacritics", "remove-emojis", "slug-generator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "remove-diacritics",
    "removeDiacritics",
    "Remove Diacritics Tool",
    "Normalize accented characters into plain Latin letters for cleanup, slugs, and text matching.",
    "Crème brûlée déjà vu",
    {
      actionLabel: "normalize",
      aliases: [
        "remove diacritics",
        "strip accents",
        "remove accents",
        "diacritics remover",
      ],
      crossLinks: ["remove-non-ascii", "slug-generator", "remove-punctuation"],
      metaDescription:
        "Remove diacritics and accents from text instantly for slugs, matching, normalization, and cleanup.",
      popular: true,
      relatedSlugs: ["remove-non-ascii", "slug-generator", "remove-punctuation"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "sort-lines",
    "sortLines",
    "Sort Lines Alphabetically Tool",
    "Sort multiline text alphabetically for lists, exports, logs, and quick cleanup tasks.",
    "banana\nApple\ncherry",
    {
      actionLabel: "sort",
      aliases: [
        "sort lines alphabetically",
        "sort lines",
        "alphabetize lines",
        "line sorter",
      ],
      crossLinks: ["remove-duplicate-lines", "join-lines", "split-text"],
      metaDescription:
        "Sort lines alphabetically instantly for lists, exports, copied logs, and general text cleanup.",
      popular: true,
      relatedSlugs: ["remove-duplicate-lines", "join-lines", "split-text"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "shuffle-lines",
    "shuffleLines",
    "Shuffle Lines Tool",
    "Shuffle pasted lines into a deterministic randomized order for prompts, giveaways, and quick list work.",
    "alpha\nbeta\ngamma\ndelta",
    {
      actionLabel: "shuffle",
      aliases: [
        "shuffle lines",
        "randomize lines",
        "random line order",
        "line shuffler",
      ],
      crossLinks: ["sort-lines", "remove-duplicate-lines", "text-compare-tool"],
      metaDescription:
        "Shuffle lines instantly in a deterministic order for randomized lists, prompts, and simple browser-based text workflows.",
      popular: true,
      relatedSlugs: ["sort-lines", "remove-duplicate-lines", "text-compare-tool"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "join-lines",
    "joinLines",
    "Join Lines Tool",
    "Join multiple lines into one clean line with single-space separators.",
    "First item\nSecond item\nThird item",
    {
      actionLabel: "join",
      aliases: [
        "join lines",
        "merge lines",
        "combine lines",
        "multiline joiner",
      ],
      crossLinks: ["split-text", "line-breaks-to-commas", "remove-empty-lines"],
      metaDescription:
        "Join lines into a single clean line instantly for forms, exports, prompts, and copy cleanup.",
      popular: true,
      relatedSlugs: ["split-text", "line-breaks-to-commas", "remove-empty-lines"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "split-text",
    "splitText",
    "Split Text Tool",
    "Split delimited text into separate lines for easier cleanup, scanning, and copy editing.",
    "apples, oranges, pears",
    {
      actionLabel: "split",
      aliases: [
        "split text",
        "text splitter",
        "split comma separated text",
        "split list into lines",
      ],
      crossLinks: ["join-lines", "sort-lines", "remove-duplicate-lines"],
      metaDescription:
        "Split text into separate lines instantly for cleanup, list processing, and copy editing workflows.",
      popular: true,
      relatedSlugs: ["join-lines", "sort-lines", "remove-duplicate-lines"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "line-breaks-to-commas",
    "lineBreaksToCommas",
    "Replace Line Breaks with Commas Tool",
    "Turn multiline text into a comma-separated list instantly for forms, spreadsheets, and inline copy.",
    "red\nblue\ngreen",
    {
      actionLabel: "convert",
      aliases: [
        "replace line breaks with commas",
        "line breaks to commas",
        "new lines to commas",
        "newline to comma",
      ],
      crossLinks: ["join-lines", "remove-line-breaks", "remove-empty-lines"],
      metaDescription:
        "Replace line breaks with commas instantly for forms, spreadsheets, inline lists, and copy cleanup.",
      popular: true,
      relatedSlugs: ["join-lines", "remove-line-breaks", "remove-empty-lines"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "word-counter",
    "wordCount",
    "Word Counter – Count words instantly",
    "Count words instantly with a simple online tool for drafts, essays, forms, and content checks.",
    "Count how many words are in this sentence.",
    {
      aliases: [
        "word counter",
        "count words",
        "word count tool",
        "word count",
      ],
      metaDescription:
        "Count words instantly with a simple online tool for drafts, essays, forms, and content checks.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "character-counter",
    "characterCount",
    "Character Counter – Count characters instantly",
    "Count characters instantly for bios, forms, metadata, and short text limits.",
    "Count every character in this line.",
    {
      aliases: [
        "character counter",
        "count characters",
        "character count tool",
        "character count",
      ],
      metaDescription:
        "Count characters instantly for bios, forms, metadata, and short text limits.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "sentence-counter",
    "sentenceCount",
    "Sentence Counter",
    "Count likely sentences in pasted text instantly for content checks and quick readability review.",
    "One. Two! Is this three?",
    {
      actionLabel: "count",
      aliases: [
        "sentence counter",
        "count sentences",
        "sentence count tool",
        "how many sentences",
      ],
      crossLinks: ["word-counter", "paragraph-counter", "character-counter"],
      metaDescription:
        "Count sentences instantly for drafts, article checks, readability review, and quick content analysis.",
      popular: true,
      relatedSlugs: ["paragraph-counter", "word-counter", "character-counter"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "paragraph-counter",
    "paragraphCount",
    "Paragraph Counter",
    "Count paragraph blocks in pasted text instantly for drafts, essays, and content cleanup.",
    "First paragraph.\n\nSecond paragraph.\nStill second.\n\nThird paragraph.",
    {
      actionLabel: "count",
      aliases: [
        "paragraph counter",
        "count paragraphs",
        "paragraph count tool",
        "how many paragraphs",
      ],
      crossLinks: ["sentence-counter", "word-counter", "character-counter"],
      metaDescription:
        "Count paragraphs instantly for essays, articles, drafts, and general text cleanup workflows.",
      popular: true,
      relatedSlugs: ["sentence-counter", "word-counter", "character-counter"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "slug-generator",
    "slug",
    "Slug Generator – Create clean URL slugs",
    "Generate clean URL slugs from text instantly for CMS entries, blog posts, and filenames.",
    "ConvertCenter Slug Generator Example",
    {
      aliases: [
        "slug generator",
        "generate slug",
        "url slug generator",
        "slugify text",
      ],
      crossLinks: ["url-encode", "markdown-to-html"],
      metaDescription:
        "Generate clean URL slugs from text instantly for CMS entries, blog posts, and filenames.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "camelcase-converter",
    "camel",
    "camelCase converter",
    "Generate camelCase names for variables, JSON keys, and frontend code quickly.",
    "The quick brown fox jumps over the lazy dog",
  ),
  defineTextTransformPage(
    "snake-case-converter",
    "snake",
    "snake_case converter",
    "Create snake_case output for backend fields, constants, and migration work.",
    "The quick brown fox jumps over the lazy dog",
    {
      faq: defineFaqs(
        defineFaq(
          "Where is snake_case commonly used?",
          "It is common in database columns, API fields, analytics event names, config keys, and backend codebases that prefer readable identifiers with underscores.",
        ),
        defineFaq(
          "How is snake_case different from camelCase?",
          "snake_case uses lowercase words separated by underscores, while camelCase removes separators and capitalizes each word after the first.",
        ),
        defineFaq(
          "Can this tool clean up text that already includes dashes or mixed capitalization?",
          "Yes. It normalizes mixed separators and casing patterns into a consistent lowercase snake_case result.",
        ),
      ),
      longDescription: snakeCaseLongDescription,
      popular: true,
    },
  ),
  defineTextTransformPage(
    "kebab-case-converter",
    "kebab",
    "kebab-case converter",
    "Convert strings to kebab-case for URLs, slugs, and CSS-friendly identifiers.",
    "The quick brown fox jumps over the lazy dog",
  ),
  defineTextTransformPage(
    "base64-encode",
    "base64Encode",
    "Base64 Encoder \u2013 Encode text to Base64",
    "Encode text to Base64 instantly with this free online Base64 encoder. Works entirely in your browser.",
    "ConvertCenter Base64 example",
    {
      actionLabel: "encode",
      aliases: [
        "base64 encode",
        "base64 encoder",
        "encode text to base64",
        "plain text to base64",
      ],
      categoryKey: "encoding",
      crossLinks: ["json-formatter", "markdown-to-html"],
      metaDescription:
        "Encode text to Base64 instantly with this free online Base64 encoder. Works entirely in your browser.",
      popular: true,
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "base64-decode",
    "base64Decode",
    "Base64 Decoder \u2013 Decode Base64 strings",
    "Decode Base64 strings instantly with this free online Base64 decoder.",
    "Q29udmVydENlbnRlciBCYXNlNjQgZXhhbXBsZQ==",
    {
      actionLabel: "decode",
      aliases: [
        "base64 decode",
        "base64 decoder",
        "decode base64",
        "base64 to text",
      ],
      categoryKey: "encoding",
      metaDescription:
        "Decode Base64 strings instantly with this free online Base64 decoder.",
      popular: true,
      relatedSlugs: ["base64-encode"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "url-encode",
    "urlEncode",
    "URL Encoder \u2013 Encode URLs and query parameters",
    "Encode URLs safely for query strings, APIs, and web applications using this free URL encoder.",
    "https://convertcenter.org/search?q=kg to lbs&source=app",
    {
      actionLabel: "encode",
      aliases: [
        "url encode",
        "url encoder",
        "encode url",
        "encode query parameters",
      ],
      categoryKey: "encoding",
      metaDescription:
        "Encode URLs safely for query strings, APIs, and web applications using this free URL encoder.",
      popular: true,
      relatedSlugs: ["base64-encode", "base64-decode"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "url-decode",
    "urlDecode",
    "URL Decoder \u2013 Decode percent-encoded URLs",
    "Decode URL encoded strings instantly. Convert percent-encoded text back into readable URLs.",
    "https%3A%2F%2Fconvertcenter.org%2Fsearch%3Fq%3Dkg%2520to%2520lbs%26source%3Dapp",
    {
      actionLabel: "decode",
      aliases: [
        "url decode",
        "url decoder",
        "decode url",
        "decode percent encoded url",
      ],
      categoryKey: "encoding",
      metaDescription:
        "Decode URL encoded strings instantly. Convert percent-encoded text back into readable URLs.",
      popular: true,
      relatedSlugs: ["url-encode", "base64-decode"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "html-encode",
    "htmlEncode",
    "HTML Encoder \u2013 Escape HTML entities safely",
    "Encode HTML-sensitive characters into safe entities for templates, snippets, and docs.",
    '<button class="primary">Save & continue</button>',
    {
      actionLabel: "encode",
      aliases: [
        "html encode",
        "html encoder",
        "encode html entities",
        "escape html",
      ],
      categoryKey: "encoding",
      crossLinks: ["html-decode", "html-to-markdown", "strip-html-tags"],
      metaDescription:
        "Encode HTML entities instantly for templates, snippets, safe previews, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["html-decode", "html-to-markdown", "strip-html-tags"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "html-decode",
    "htmlDecode",
    "HTML Decoder \u2013 Decode HTML entities",
    "Decode HTML entities back into readable text or markup characters instantly.",
    "&lt;button class=&quot;primary&quot;&gt;Save &amp; continue&lt;/button&gt;",
    {
      actionLabel: "decode",
      aliases: [
        "html decode",
        "html decoder",
        "decode html entities",
        "html entities to text",
      ],
      categoryKey: "encoding",
      crossLinks: ["html-encode", "html-to-markdown", "strip-html-tags"],
      metaDescription:
        "Decode HTML entities instantly for debugging, cleanup, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["html-encode", "html-to-markdown", "strip-html-tags"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-formatter",
    "jsonFormat",
    "JSON Formatter \u2013 Format and validate JSON",
    "Format, beautify, and validate JSON instantly with this free JSON formatter.",
    '{"site":"ConvertCenter","tools":["base64","url","json"],"active":true}',
    {
      actionLabel: "format",
      aliases: [
        "json formatter",
        "format json",
        "validate json",
        "pretty print json",
      ],
      categoryKey: "encoding",
      crossLinks: ["markdown-to-html", "json-to-yaml", "yaml-to-json"],
      metaDescription:
        "Format, beautify, and validate JSON instantly with this free JSON formatter.",
      popular: true,
      relatedSlugs: ["url-encode", "url-decode"],
      secondaryActionLabel: "minify",
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-minifier",
    "jsonMinify",
    "JSON Minifier \u2013 Compress JSON instantly",
    "Minify JSON by removing whitespace and formatting. Useful for APIs and production data.",
    '{\n  "site": "ConvertCenter",\n  "tools": ["base64", "url", "json"],\n  "active": true\n}',
    {
      actionLabel: "minify",
      aliases: [
        "json minifier",
        "minify json",
        "compress json",
        "json compressor",
      ],
      categoryKey: "encoding",
      metaDescription:
        "Minify JSON by removing whitespace and formatting. Useful for APIs and production data.",
      popular: true,
      relatedSlugs: ["json-formatter"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-validator",
    "jsonValidate",
    "JSON Validator \u2013 Check if JSON is valid",
    "Validate JSON syntax instantly with this free online JSON validator.",
    '{"site":"ConvertCenter","tools":["base64","url","json"],"active":true}',
    {
      aliases: [
        "json validator",
        "validate json",
        "check json syntax",
        "json syntax checker",
      ],
      categoryKey: "encoding",
      metaDescription:
        "Validate JSON syntax instantly with this free online JSON validator.",
      outputStyle: "panel",
      popular: true,
      relatedSlugs: ["json-formatter", "json-minifier"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "markdown-to-html",
    "markdownToHtml",
    "Markdown to HTML Converter",
    "Convert Markdown to HTML instantly with this free online Markdown converter.",
    "# Hello",
    {
      actionLabel: "convert",
      aliases: [
        "markdown to html",
        "md to html",
        "markdown converter",
        "convert markdown to html",
      ],
      categoryKey: "dev-data",
      crossLinks: ["json-formatter", "html-to-markdown", "developer-tools"],
      metaDescription:
        "Convert Markdown to HTML instantly with this free online Markdown converter.",
      popular: true,
      relatedSlugs: ["json-formatter", "json-minifier", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "html-to-markdown",
    "htmlToMarkdown",
    "HTML to Markdown Converter",
    "Convert HTML code into clean Markdown format instantly.",
    "<h1>Hello</h1>",
    {
      actionLabel: "convert",
      aliases: [
        "html to markdown",
        "convert html to markdown",
        "html markdown converter",
        "html into markdown",
      ],
      categoryKey: "dev-data",
      metaDescription:
        "Convert HTML code into clean Markdown format instantly.",
      popular: true,
      relatedSlugs: ["markdown-to-html", "json-formatter"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-to-yaml",
    "jsonToYaml",
    "JSON to YAML Converter",
    "Convert JSON data into YAML format instantly.",
    '{\n  "name": "test"\n}',
    {
      actionLabel: "convert",
      aliases: [
        "json to yaml",
        "convert json to yaml",
        "json yaml converter",
        "json into yaml",
      ],
      categoryKey: "dev-data",
      crossLinks: ["json-formatter", "yaml-to-json", "developer-tools"],
      metaDescription:
        "Convert JSON data into YAML format instantly.",
      popular: true,
      relatedSlugs: ["json-formatter", "json-minifier", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "yaml-to-json",
    "yamlToJson",
    "YAML to JSON Converter",
    "Convert YAML data into JSON format instantly.",
    "name: test",
    {
      actionLabel: "convert",
      aliases: [
        "yaml to json",
        "convert yaml to json",
        "yaml json converter",
        "yaml into json",
      ],
      categoryKey: "dev-data",
      metaDescription:
        "Convert YAML data into JSON format instantly.",
      popular: true,
      relatedSlugs: ["json-to-yaml", "json-formatter", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-to-csv",
    "jsonToCsv",
    "JSON to CSV Converter",
    "Convert JSON records into CSV instantly for spreadsheets, exports, and quick data cleanup.",
    '[{"name":"Ada","score":42},{"name":"Lin","score":39}]',
    {
      actionLabel: "convert",
      aliases: [
        "json to csv",
        "convert json to csv",
        "json csv converter",
        "json records to csv",
      ],
      categoryKey: "dev-data",
      crossLinks: ["csv-to-json", "json-formatter", "json-validator"],
      metaDescription:
        "Convert JSON to CSV instantly for spreadsheets, exports, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["csv-to-json", "json-formatter", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "csv-to-json",
    "csvToJson",
    "CSV to JSON Converter",
    "Convert CSV rows into formatted JSON arrays instantly for APIs, cleanup, and data migrations.",
    "name,score\nAda,42\nLin,39",
    {
      actionLabel: "convert",
      aliases: [
        "csv to json",
        "convert csv to json",
        "csv json converter",
        "spreadsheet csv to json",
      ],
      categoryKey: "dev-data",
      crossLinks: ["json-to-csv", "json-formatter", "json-validator"],
      metaDescription:
        "Convert CSV to JSON instantly for APIs, cleanup, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["json-to-csv", "json-formatter", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "xml-to-json",
    "xmlToJson",
    "XML to JSON Converter",
    "Convert XML into formatted JSON instantly for migrations, payload inspection, and integrations.",
    "<person><name>Ada</name><score>42</score></person>",
    {
      actionLabel: "convert",
      aliases: [
        "xml to json",
        "convert xml to json",
        "xml json converter",
        "xml into json",
      ],
      categoryKey: "dev-data",
      crossLinks: ["json-to-xml", "json-formatter", "json-validator"],
      metaDescription:
        "Convert XML to JSON instantly for integrations, migrations, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["json-to-xml", "json-formatter", "json-validator"],
      showCharacterCount: true,
    },
  ),
  defineTextTransformPage(
    "json-to-xml",
    "jsonToXml",
    "JSON to XML Converter",
    "Convert JSON data into XML instantly for integrations, feeds, and structured exports.",
    '{"person":{"name":"Ada","score":42}}',
    {
      actionLabel: "convert",
      aliases: [
        "json to xml",
        "convert json to xml",
        "json xml converter",
        "json into xml",
      ],
      categoryKey: "dev-data",
      crossLinks: ["xml-to-json", "json-formatter", "json-validator"],
      metaDescription:
        "Convert JSON to XML instantly for feeds, integrations, and browser-based developer workflows.",
      popular: true,
      relatedSlugs: ["xml-to-json", "json-formatter", "json-validator"],
      showCharacterCount: true,
    },
  ),
] as const;

export const plannedDevToolPages = [
  {
    aliases: ["json yaml", "json to yaml", "yaml converter"],
    categoryKey: "dev",
    description: "Convert JSON payloads into readable YAML for config and developer workflows.",
    enabled: false,
    kind: "dev-tool",
    slug: "json-to-yaml",
    title: "JSON to YAML converter",
  },
  {
    aliases: ["base64", "base64 encode", "base64 decode"],
    categoryKey: "dev",
    description: "Encode and decode Base64 strings without leaving the utility shell.",
    enabled: false,
    kind: "dev-tool",
    slug: "base64-tool",
    title: "Base64 tool",
  },
] as const satisfies readonly DevToolPageSchema[];
