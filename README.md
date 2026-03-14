# ConvertCenter

ConvertCenter is a static-first conversion hub built with Next.js App Router. The MVP includes unit converters, text transformation tools, category hubs, and SEO-focused landing pages, all styled from an attached HTML design reference provided during implementation.

## Overview

The product is organized around four content layers:

- Homepage: universal search, featured converter, popular tools, and category hubs
- Category hubs: grouped tool listings and featured tools for weight, length, volume, temperature, data, and text
- Pair pages: focused numeric converter pages such as `kg to lbs` or `km to miles`
- Text pages: focused text transformation tools such as uppercase, snake case, and kebab case

The app uses a shared config-driven model so new converters inherit routing, metadata, search suggestions, related links, examples, tables, and UI templates automatically.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Vitest
- Static-first content architecture with no database

## Local Development

Install dependencies:

```bash
npm install
```

Start the app locally:

```bash
npm run dev
```

Useful scripts:

```bash
npm run lint
npm run typecheck
npm run test
npm run check:content
npm run check:sitemap
npm run build
npm run verify
```

## Data Model

The main source of truth is [lib/config/conversion-registry.ts](./lib/config/conversion-registry.ts).

It defines:

- Categories and hub metadata
- Numeric units and their conversion behavior
- Linear-factor categories such as weight and data
- Formula-based categories such as temperature
- Numeric pair pages
- Text transform pages
- Homepage featured and popular tool lists
- Search aliases and related-tool relationships

From that registry, the app derives:

- Static routes
- Page metadata
- Search suggestions
- Category listings
- Related links
- Conversion tables and examples

## Adding A New Converter Page

For most numeric converters, add it in one place inside [lib/config/conversion-registry.ts](./lib/config/conversion-registry.ts):

1. Add a unit to the relevant category if the unit does not exist yet.
2. Add a `defineNumericPairPage(...)` entry to the category's pair page list.
3. Optionally add the slug to `homepageConfig.popularToolSlugs` or update category aliases if it should surface more often.

For text tools:

1. Add a `defineTextTransformPage(...)` entry in the text transform list.
2. If needed, extend the shared text engine in [lib/conversion/text.ts](./lib/conversion/text.ts).

Because routes, metadata, and UI all come from shared adapters, new pages automatically appear in:

- `/[slug]` static generation
- category hubs
- sitemap output
- search suggestions
- related links

## Design Reference

This implementation follows an attached HTML-based design reference. The production UI translates that reference into a reusable dark utility design system with bordered cards, pill filters, large search surfaces, emphasized outputs, and SEO-friendly page hierarchy.

## Cloudflare Deployment

The app is deployment-ready from a production build perspective:

```bash
npm run verify
```

For Cloudflare, keep the deployment simple:

- Build with `npm run build`
- Use the generated Next.js app with a Cloudflare-compatible Next deployment flow
- A baseline Wrangler config now exists in `wrangler.jsonc` with `nodejs_compat` enabled
- Set the production domain in [lib/site.ts](./lib/site.ts) if `https://convertcenter.org` is not the final canonical URL

Recommended command-line flow:

```bash
npm install
npm run verify
npm install -D wrangler
npx wrangler login
npx wrangler pages download config <YOUR_PAGES_PROJECT_NAME>
```

After downloading your Pages config, merge or keep the `compatibility_flags` entry from `wrangler.jsonc`:

```jsonc
"compatibility_flags": ["nodejs_compat"]
```

Then deploy:

```bash
npx wrangler pages deploy
```

Notes:

- The app is static-first, but it is still a Next.js App Router project rather than a plain exported static site.
- If you deploy to Cloudflare Pages or Workers, use the platform's current Next.js-compatible adapter/runtime rather than `next export`.
- The `no nodejs_compat compatibility flag set` error means Cloudflare is running the generated Next adapter output without the required Node compatibility runtime enabled.
- Canonical URLs, sitemap, robots, and structured data are already wired to the configured site URL.
- To enable Cloudflare Web Analytics from the app shell, set `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` in production. The script is injected from the root layout, so it loads across all pages without blocking initial rendering.

## SEO Verification Docs

- Search Console and sitemap rollout checklist: [docs/search-console-readiness.md](./docs/search-console-readiness.md)
