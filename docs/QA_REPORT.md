# First-build QA — 2026-09-22

Scope: local `redesign` branch, preview only at `127.0.0.1:4321`. No production deployment, firewall changes, server installation, or modifications to `gh-pages`.

## Implemented

- Static Astro site: homepage, Work, Research, About, Music, eleven shared project details and 404 (17 HTML pages).
- Approved project wording, metadata, order, separate Joy Plots / Bivariate Joy Plots, single Prague Squared detail, Beyond the Horizon umbrella preserved.
- Responsive editorial grids, self-hosted Inter variable, image galleries, semantic navigation, focus states, reduced motion, metadata, Person JSON-LD, sitemap, robots and favicon.
- Genuine project imagery only. Original `portfolio/` and legacy root site files remain byte-for-byte unchanged relative to `f67f0ac`.
- Owner-confirmed StoryMap assignment fixed in catalog and implementation: Vltava → `945c245...`; Railways → `8b9818...`.
- Font import repaired: installed Fontsource package exposes `wght.css`, not the nonexistent `latin.css` / `latin-ext.css` entries. Font files are self-hosted; OFL attribution is included at `/licenses/inter-OFL.txt`.
- Build/test-only GitHub workflow added. Existing deployment workflow receives a branch guard against manual deployment from `redesign`; deployment configuration on the actual `gh-pages` branch is unchanged.

## Automated checks

| Check | Result |
|---|---|
| `npm run check` | PASS — 0 errors, 0 warnings, 0 hints |
| `npm test` | PASS — 14/14 approved-content and curation checks |
| `npm run build` | PASS — 17 static pages and responsive image derivatives |
| `node scripts/check-build.mjs` | PASS — 17 pages / 411 local link, asset and font references; metadata, IDs, alt text, dimensions, noindex and deferred embeds |
| `npm run test:browser` | PASS — 25/25, final run 34.6 seconds |
| axe WCAG 2 A/AA, 2.1 AA, 2.2 AA rules | No detected violations on any of the 17 routes |
| Responsive / loaded images | All 17 routes at 320, 390, 768 and 1440 CSS px; no horizontal page overflow |
| Keyboard | Skip link, visible focus, navigation and keyboard activation of Sketchfab pass |
| JavaScript disabled | All pages navigate; model external-link fallback remains available |
| Reduced motion | Smooth scrolling and image transitions disabled |
| Third-party loading | No external requests or iframes on initial page load, all 17 routes |
| `npm audit --audit-level=low` | 0 vulnerabilities reported |
| `git diff --check` | PASS |
| Preservation | `git diff --exit-code f67f0ac -- portfolio index.html js` passes |

These are automated checks, not a claim of certified WCAG compliance. Browser coverage is desktop Chromium with mobile/tablet viewport emulation; physical iOS/Safari/Android devices are not independently certified.

## Visual review

Reviewed full-page screenshots of homepage desktop/mobile, Work tablet, Research desktop/mobile and long project details at mobile sizes. Fixed the 320px Vltava title overflow by reducing mobile display scale and allowing safe wrapping. Checked the fix visually: “Transformations” now fits on one line at 320px. Joy Plots now retains the full Martinique title instead of clipping it. Corrected featured-card responsive image sizes for sharper large imagery and allowed footer links to wrap.

Source originals are untouched. Detail images are uncropped; grid framing remains a reversible first-pass choice. The very wide railway cover and small bivariate cover require a later curatorial pass (see `COVER_REVIEW.md`).

## Performance

Local Lighthouse mobile-emulation runs, default throttling, Chromium on the VPS. Representative results (scores vary across runs; not real-user field data):

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT |
|---|---:|---:|---:|---:|---|---|---|
| Homepage | 99 | 100 | 100 | 69 | 2.0 s | 0.002 | 0 ms |
| Dante’s Inferno detail | 98 | 100 | 100 | 69 | 2.3 s | 0 | 0 ms |

SEO is intentionally reduced by the preview `noindex` policy; the scored failure is “Page is blocked from indexing”. Do not enable indexing until publication is separately approved. Lighthouse still suggests potential image-delivery savings on large map imagery; the first build prioritizes legibility while delivering responsive WebP and lazy below-fold media. Full build artifacts also retain bundled original image assets, but pages reference optimized derivatives.

## External links / viewers

19 unique external anchor destinations checked by HTTP GET:

- 16 returned HTTP 200, including all four StoryMaps, the Sketchfab short link/model, both Spotify artists, CTU profile, project websites, geocoding exercise, GitHub, Creative Commons and the JOHD DOI.
- Corrected StoryMap item metadata additionally confirmed public bridge and railway stories, with matching titles. Dante points only to the approved English story.
- Prague Squared DOI resolves to Taylor & Francis, whose destination returns HTTP 403 to the automated client. Treat as an automated-access limitation, not proof of a dead DOI.
- LinkedIn returns HTTP 999 (anti-bot restriction); automatic final-page validation is unavailable.
- **Bivariate Joy Plots DOI `10.1080/00087041.2026.2715285` returns HTTP 404.** The approved in-press citation/URL is preserved pending owner/publisher confirmation; no replacement was guessed.

Sketchfab: click-only iframe creation, keyboard focus, correct URL and title, static thumbnail, attribution and external fallback pass. Live iframe document returns HTTP 200. The headless software-rendered browser loads Sketchfab's interface but reports that the model cannot be rendered properly on the device. **Full interactive 3D rendering still needs a normal GPU-enabled browser check**; it is not reported as visually verified. Nothing loads from Sketchfab before activation.

## Handoff / remaining gates

- Build instructions and SSH-tunnel preview: `README.md`.
- Complete eleven-project cover inventory and content TBDs: `docs/COVER_REVIEW.md`.
- Supplemental image provenance and archival permission questions: `docs/MEDIA_SOURCES.md`.
- No GitHub CI result claimed before push. Local push dry-run fails because no credentials are configured for this repository; the unrelated JoyPlot deploy key was not reused. A repository-scoped writable deploy key or existing suitable authentication is required to finish the requested push.
- Remote `gh-pages` remains `2a0790b115941055af7dfa73f77a1e6837ee3ada`; checked read-only. No merge or deployment performed.

Raw screenshots, Lighthouse JSON and external-link results live in ignored `qa-artifacts/`; they are reproducible with the documented tools. No secrets, browser traces or generated site output are intended for the commit.
