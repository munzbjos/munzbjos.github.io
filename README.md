# Josef Münzberger — portfolio redesign

Static Astro portfolio. Work is confined to **`redesign`**. Nothing in this branch should be published until Josef approves a separate production migration.

## Sources of truth

1. `MASTER_PROMPT_REDESIGN.md` — requirements and workflow.
2. `portfolio_catalog.md` — approved project content.
3. `curatorial_structure_proposal.md` — curation and ordering.

The owner-confirmed Vltava / Railways StoryMap correction is reflected in the catalog and data. The old root `index.html`, legacy scripts and all original `portfolio/` files are preserved. Astro uses `src/pages/`, not the legacy root page.

## Local build and preview

Node **22.12+** (tested with 22.23.1); npm lockfile committed.

```sh
npm ci
npm run validate
npm run preview
```

Preview listens only on `http://127.0.0.1:4321`. Development: `npm run dev`. No database, secrets, backend, or runtime image service is required.

From another machine, forward the local preview through SSH:

```sh
ssh -L 4321:127.0.0.1:4321 maia@38.7.145.74
```

Then open `http://127.0.0.1:4321` in your browser while preview is running on the VPS. No public preview port or firewall change is needed.

## Validation

```sh
npm run check
npm test
npm run build
node scripts/check-build.mjs
npx playwright install chromium
npm run test:browser
node scripts/check-external-links.mjs
git diff --check
```

Browser tests use a local installed Chromium if available, or Playwright's standard browser. Override with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if needed. The tests start a loopback preview automatically. External-link checks are separate: remote anti-bot responses do not establish a broken link. Results go to ignored `qa-artifacts/`.

## Content and media

- `src/data/projects.ts`: eleven unique projects, approved wording, explicit ordered lists. Prague Squared has one shared detail URL.
- `src/data/media.ts`: cover and gallery selection, alt text, captions and presentation.
- `src/components/`: reusable cards, grids, gallery and opt-in Sketchfab viewer.
- `src/styles/global.css`: responsive design tokens and layout.
- `portfolio/`: immutable original project materials.
- `src/assets/supplemental/`: genuine imagery from approved StoryMap / Sketchfab outputs. Provenance and unresolved archival permissions: `docs/MEDIA_SOURCES.md`.

Astro produces responsive WebP variants in `dist/_astro/`. Full project images retain their original aspect ratio on detail pages; grid crops are CSS-only. StoryMaps are links, not embeds. Sketchfab loads only after activation, with an ordinary external link as a no-JavaScript fallback.

## Deployment safety

- `redesign-check.yml` builds/tests and uploads a normal downloadable artifact; **it has no Pages deployment permissions or deployment step**.
- The legacy Pages workflow is guarded to run only for `gh-pages`, including manual dispatch. The actual `gh-pages` branch is untouched.
- `dist/` is the only future publishable directory. Do not upload the repository root for the Astro version.
- Preview builds deliberately use `noindex,nofollow` and `robots.txt: Disallow: /`.
- A later separately authorized production build may set `PUBLIC_INDEXABLE=true`. Canonicals and sitemap use `https://munzbjos.github.io/`, which is a root user site; a project-subpath deployment would require an explicit base-path migration.
- Resolve the content/rights TBDs and replace the legacy deployment with an Astro `dist/` deployment only after approval. Do not merge into `gh-pages` as part of this first-build handoff.

See `docs/AUDIT.md`, `docs/ARCHITECTURE.md`, `docs/COVER_REVIEW.md`, and `docs/QA_REPORT.md`.
