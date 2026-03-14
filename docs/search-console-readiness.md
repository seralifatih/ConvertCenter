# Search Console And Sitemap Readiness

This document is the phase-2 deployment checklist for ConvertCenter. It is tied to the current registry-driven architecture, so sitemap coverage comes from:

- homepage
- dynamic category hubs
- registry-driven launch pages
- standalone tool pages

## Source Of Truth

- Canonical base URL: [lib/site.ts](../lib/site.ts)
- Sitemap generator: [app/sitemap.ts](../app/sitemap.ts)
- Robots generator: [app/robots.ts](../app/robots.ts)
- Category routes: [lib/content/categories.ts](../lib/content/categories.ts)
- Registry-driven tool routes: [lib/content/pages.ts](../lib/content/pages.ts)
- Standalone routes: [lib/content/standalone-pages.ts](../lib/content/standalone-pages.ts)

## Pre-Deploy Checklist

- Confirm `siteConfig.url` in [lib/site.ts](../lib/site.ts) matches the real production domain exactly.
- Run `npm run check:sitemap` to verify every live route appears in the sitemap once.
- Run `npm run build` to ensure static generation completes successfully.
- Run `npm run typecheck` if route files or page metadata changed.
- Confirm `robots.txt` still references `${siteConfig.url}/sitemap.xml`.
- Confirm no preview or parameterized URLs are meant to be indexed.

## What The Repo Checks Verify

`npm run check:sitemap` verifies:

- sitemap includes homepage, all category hubs, all registry-driven tool pages, and all standalone pages
- no duplicate sitemap URLs are emitted
- homepage and tool priority defaults are intact
- `robots.txt` points to the same canonical sitemap URL and still blocks query-parameter states

## Deployment Steps

1. Update [lib/site.ts](../lib/site.ts) if the canonical production domain changed.
2. Run:

```bash
npm run check:sitemap
npm run build
```

3. Deploy the current commit through the normal Cloudflare flow.
4. After deploy, verify these live URLs:

- `/`
- `/sitemap.xml`
- `/robots.txt`
- one category hub such as `/weight-converter`
- one registry page such as `/kg-to-lbs`
- one standalone page such as `/math-tools`

## Post-Deploy Verification

Use production checks against the live domain:

```bash
curl -I https://YOUR_DOMAIN/
curl https://YOUR_DOMAIN/sitemap.xml
curl https://YOUR_DOMAIN/robots.txt
```

If you are on PowerShell:

```powershell
Invoke-WebRequest https://YOUR_DOMAIN/sitemap.xml
Invoke-WebRequest https://YOUR_DOMAIN/robots.txt
```

Confirm:

- `sitemap.xml` loads with the production domain in each `<loc>`
- `robots.txt` includes the production sitemap URL
- category hubs and tools return `200`
- no canonical tags point to an old domain

## Search Console Submission Checklist

1. Open Google Search Console for the production property.
2. Submit `https://YOUR_DOMAIN/sitemap.xml`.
3. Inspect a few representative URLs:
   - homepage
   - category hub
   - numeric pair page
   - standalone calculator page
4. Confirm Google sees:
   - canonical URL on the production domain
   - indexable page status
   - expected structured data when present
5. Re-submit the sitemap after any large route expansion.

## Known Risks

- If [lib/site.ts](../lib/site.ts) points at the wrong domain, canonical tags, OG URLs, sitemap URLs, and robots sitemap references all drift together.
- Registry-driven routes and standalone routes are both included in sitemap generation, so adding pages outside those two systems can create accidental sitemap gaps.
- The dynamic Open Graph image route is expected to remain dynamic; that does not block static sitemap generation for the pages themselves.
