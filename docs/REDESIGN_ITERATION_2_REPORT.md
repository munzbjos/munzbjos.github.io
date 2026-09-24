# Redesign iteration 2 — implementation and QA

Scope: `docs/REDESIGN_CHANGE_REQUEST.md`, branch `redesign` only. Baseline `a4a9202902da902ef1c59b6551f3bc77997f572b`. No public deployment or changes to `gh-pages`.

## Implemented

- GLOBAL / HOME: Inter retained; punctuation inherits text colour; Selected Work count, Research eyebrow and homepage About teaser removed. Every page has only `© 2026 Josef Münzberger` in its footer.
- WORK / RESEARCH: intros contain only their titles; Further explorations remains unchanged. Dedicated optional card labels added without losing richer internal type fields.
- Bridge / railway: titles are now **The Second Life of the Chain Bridge** and **Tracing the Lost Railway**; exact suggested short/extended copy used, roles preserved, parent projects/funding/website links retained as secondary metadata. Existing route slugs and periods remain unchanged.
- ABOUT: exact three practice blocks are primary content in a 2:1 desktop/tablet layout, then Connect; one column in that order on mobile. Removed only specified biography/labels/link. Existing four Connect links preserved.
- MUSIC: only title followed by the two exact approved lazy Spotify players, stacked at 352 px height with responsive widths and native-style rounding. No new text or surrounding cards. These embeds are the explicit exception to the first-build no-upfront-third-party-request policy.
- DETAILS: Prague Squared unchanged except global footer. Joy Plots swaps Czechia and Martinique, including alt text/captions; Dominica and Grenada unchanged. The existing shared cover model means the requested new Joy cover also appears on its listing cards. Only that card’s matching background changes from lavender to white; no other cover selection/crop is changed.
- Dante uses separate card label, detail subtitle and interactive display label; full internal type and English StoryMap URL preserved.
- Catalog synchronized with approved titles/copy/display fields. Bivariate DOI remains unchanged, as instructed.

## Resolved: two StoryMap URL lines

The original RESEARCH-03 / RESEARCH-04 URL lines were reversed. Josef confirmed the following assignments and the document correction on 2026-09-24:

| Actual public story | Verified URL |
|---|---|
| Druhý život řetězového mostu | https://storymaps.arcgis.com/stories/945c245fcae24ee796371173e3ece15b |
| Po stopách zaniklé železnice (embed) | https://storymaps.arcgis.com/stories/8b9818a23a184da3bf3938391581a0f2 |

Both public item endpoints returned HTTP 200 and those matching titles during this iteration. **The change-request document is now corrected with owner approval.** Existing verified URLs in the catalog, implementation and tests are preserved. No implementation decisions remain open for this request. This documentation-only confirmation does not change the rendered pages or invalidate the review screenshots.

## Validation

- `npm run check`: 0 errors / 0 warnings; 2 informational deprecation hints for the requested legacy `frameborder="0"` iframe attributes. CSS also applies `border: 0`.
- `npm test`: **16/16 PASS** (existing catalog/content checks plus display-label and StoryMap-contribution regressions).
- `npm run build`: **PASS**, 17 static HTML pages (16 content pages + 404).
- `node scripts/check-build.mjs`: **PASS**, 17 pages / 392 local references, metadata/assets, minimal footer everywhere, exact Music-only Spotify embeds.
- `npm run test:browser`: **30/30 PASS**, 45.3 seconds. All 17 routes at 320/390/768/1440 px, no overflow, loaded images; axe WCAG A/AA checks, keyboard/focus, reduced motion, no-JS fallback, Sketchfab click-only loading. New tests cover punctuation, removals, labels, About columns/order, Joy swap and Music layout.
- Spotify is intercepted only for deterministic automated host-page tests. Real review screenshots separately load the **live** players: *Caroline* / The Jay and *Pojď se mnou ven* / Františka Stropnická Asibásně, verified at all three review widths. No playback was started; playback/subscription behaviour is not claimed as tested.
- `git diff --check`: PASS. Original `portfolio/` and `src/assets/supplemental/` files are unchanged; deployment workflow files are unchanged in this iteration.

## Visual review 2

- [Review index](review/README.md): **48 full-page screenshots**, 16 pages × 1440/768/390 px.
- [Cards comparison](review/cards/README.md): **22 card screenshots**, all 11 projects × desktop/mobile. Each screenshot includes the entire displayed cover crop and title/category/year.
- Cards are extracted from their actual Work / Research grids, preserving the native featured/secondary widths. No artificial cover crops or restyled card mockups are introduced for this review.
- `scripts/capture-review.mjs` reproduces the package. `scripts/check-review.mjs` verifies exact PNG dimensions, counts, all project coverage, live Spotify evidence and Markdown links.
- Previous screenshots are replaced only within `docs/review/`; review 1 remains recoverable from Git history at `07a8e70`.
- No additional final-cover recommendations were implemented. Archival reproduction permissions and final cover decisions remain items for a later phase, as previously documented.

Remote `gh-pages` baseline: `2a0790b115941055af7dfa73f77a1e6837ee3ada`. No branch switch, merge or production deployment was performed.
