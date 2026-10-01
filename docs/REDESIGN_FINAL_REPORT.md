# FINAL incremental request — report

Implemented only `docs/REDESIGN_CHANGE_REQUEST_FINAL.md` on `redesign`, based on `56fbf33`. Earlier decisions remain unchanged except the explicit overrides below.

## Changes

- Music uses the two exact supplied Spotify **artist** embed URLs, including their parameters, lazy loading, fullscreen permission and 352px height. Accessible titles identify the artists. Introductory wording and layout are unchanged.
- Research uses an explicit fixed order: **Bivariate Joy Plots → Prague Squared → Beyond the Horizon → The Second Life of the Chain Bridge → Tracing the Lost Railway**. No year-based sorting. Homepage selections are unchanged.
- Joy Plots retains `joy.png` as its detail hero and excludes it from the gallery. Its six supporting images use the existing `PresentationGallery.astro` unchanged, in this order: `JoyDominica.png`, `JoyGrenada.png`, `JoyGuadeloupe.png`, `JoyMartinique.png`, `JoyStLucia.png`, `JoyStVincent.png`. No parallel carousel or dependency was added.

## QA

- `npm run validate`: PASS — Astro check, **17/17 content tests**, production build of **17 pages**, **450 local link/image/font references**. Two existing informational `frameborder` deprecation hints remain for the requested Spotify markup; no errors.
- `npm run test:browser`: **34/34 PASS**. All 17 routes checked with axe; responsive widths 320/390/768/1440; keyboard navigation, focus boundaries, no autoplay, image loading, no-JavaScript fallbacks, and all three shared galleries covered. Prague Squared and Beyond the Horizon regressions pass.
- Live Chromium check at **1440px and 390px**: Joy Plots first/last slides render with contain and correct counters; both new Spotify artist embeds load actual artist names and track listings. No playback initiated. Third-party player internals are not covered by host-page accessibility certification; Spotify truncates its long artist heading on narrow screens.
- External URL check: 17 HTTP 200 responses, including both new artist embeds. Existing exceptions unchanged: Bivariate DOI 404 (owner-approved pending DOI); Taylor & Francis 403 for Prague DOI target and recognition; LinkedIn 999. These approved URLs were not changed.
- `git diff --check`: PASS. Source assets, shared viewer component, other project imagery, and deployment workflows unchanged.

No unresolved implementation items in this FINAL request. Earlier content TBDs (including the future Elton animation) are outside this request and unchanged. `docs/review/` remains the labelled Round 3 historical screenshot package; this request did not ask to regenerate it. Current targeted visual checks are local QA artifacts.

`gh-pages` remains at `2a0790b115941055af7dfa73f77a1e6837ee3ada`. No public deployment or infrastructure changes.
