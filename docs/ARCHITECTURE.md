# First-build architecture and design system

Decision date: 2026-09-21. Scope: `redesign` only; no deployment.

## Audit gate

The baseline is a single legacy `index.html`, locally bundled Three.js scripts, W3CSS/CDN fonts, no package manifest, and a Pages workflow triggered by `gh-pages` or manual dispatch. The original site and all `portfolio/` files remain intact. See AUDIT.md for the full audit. A branch guard will prevent a manual Pages deployment from redesign. New CI only validates and uploads a build artifact.

## Architecture

- Astro static generation, TypeScript data layer, semantic HTML, plain CSS. No backend, framework hydration, or runtime image service.
- `/`, `/work/`, `/research/`, `/about/`, `/music/`, `/projects/[slug]/`, `/404.html`.
- Eleven project records; Prague Squared has one shared URL. Work has seven entries, Research five. Explicit ordered slug lists reflect the curatorial document.
- Approved catalogue prose and metadata in `src/data/projects.ts`; images and crop decisions separately in `src/data/media.ts`. Source references and missing items remain internal, not invented biography.
- Original PNGs imported directly from `portfolio/`; Astro creates responsive WebP derivatives in `dist/_astro/`. No originals are renamed, cropped, or overwritten. Supplemental images, if necessary, are genuine media from approved linked outputs with provenance, not synthetic covers.
- All gallery images are shown uncropped, with links to a larger optimized version. Listing crops are CSS-only. Third-party model viewer requires explicit activation on its detail page; StoryMaps are ordinary links. No embeds in grids.
- Canonicals point to the intended GitHub Pages root. Preview is noindex by default; a later explicitly approved `PUBLIC_INDEXABLE=true` build enables indexing. Sitemap and robots are static build outputs.
- Legacy root index and JS remain untouched and excluded from the Astro build output. Only `dist/` could be published in a future approved migration, never the repository root.

## Visual system

- Warm paper `#f5f4ef`, charcoal `#242823`, muted ink `#62675e`, single forest accent `#365342`, pale rule `#d8dbd1`. Photography and cartography provide the colour.
- Self-hosted Inter variable (Latin + Latin extended for proper Czech names), system fallback. No external font requests.
- Fluid display type, restrained tracking, 1.55 reading line-height, 65-character reading measure.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 144 px. Max content 1440 px, fluid page gutters 20–72 px.
- Featured grid: a broad first image, then two supporting images. Secondary grid: three columns desktop / two tablet / one mobile. Research uses two generous columns. No card boxes, shadows, or decorative badges.
- Breakpoints 640 and 1000 px. Mobile is a single column; navigation remains visible and wraps, rather than depending on a JavaScript menu.
- Underlines, subtle image scale, visible focus ring; reduced motion disables transitions. Touch targets at least 44 px for navigation and actions.

## Content policy

Catalogue wins over curatorial proposal, legacy repo, and live site, in that order. Exact project descriptions, publication status, credits, roles, tools, awards and approved URLs are preserved. About uses only approved professional identity, topics and affiliation; an expanded biography, CV and unprovided profile URLs remain TBD. Music may retain clearly attributable existing external links, but no dates, credits, recordings or current affiliations are invented.

## Validation plan

Content/schema and ordering tests; Astro type check; static build; all generated internal links/assets/anchors and metadata checks; browser tests at mobile/tablet/desktop; keyboard focus, reduced motion, no-JS navigation and no premature embeds; axe accessibility checks; representative Lighthouse checks. Document external services that block automated checks separately from broken links.
