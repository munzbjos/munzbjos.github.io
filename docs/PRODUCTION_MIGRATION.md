# Astro production migration

## Preserved references

- Pre-deployment `gh-pages`: `2a0790b115941055af7dfa73f77a1e6837ee3ada`.
- Remote backup branch: `legacy-before-astro-redesign`, same SHA. Created and verified before modifying production.
- Approved source: `redesign` at `bdddc2b7a4ce56e97336f0cd4dd93892b0783f42` (FINAL request). This branch is retained unchanged.
- Production integrates that source with a normal two-parent merge commit, plus the deployment/metadata adjustments described here. No squash, rebase, force push, or history deletion.

## Deployment contract

`.github/workflows/static.yml` accepts only `gh-pages` push/manual events. It checks out the exact event SHA, sets up Node 22, runs `npm ci`, source/content checks, and builds with `PUBLIC_INDEXABLE=true`. Output validation runs before `actions/upload-pages-artifact` receives **only `dist/`**. `actions/deploy-pages` deploys that artifact to the `github-pages` environment.

The public URL stays `https://munzbjos.github.io/`. There is no runtime server, database, alternate production branch, or project-subpath base URL.

Production content pages use `index,follow`; robots allows crawling and links the 16-route sitemap. The custom 404 intentionally uses `noindex,follow` and canonical `/404.html`. Preview builds retain `noindex,nofollow` and `Disallow: /`. Validation rejects localhost URLs, preview directives, wrong canonicals/sitemap entries, and leaked source/legacy paths.

Root legacy HTML, scripts and original materials remain in the repository/history but are not published. Astro uses `src/pages/`, and only files intentionally under `public/` plus generated assets enter `dist/`.

## Pre-push verification

The complete requested suite was run on the untouched approved `redesign` before migration: `npm ci`, `npm run check`, `npm test`, `npm run build`, `node scripts/check-build.mjs`, `npm run test:browser`, `node scripts/check-external-links.mjs`, `git diff --check`. Results: 0 npm audit vulnerabilities, 17 content tests and 34 browser tests passed. Two existing Spotify `frameborder` hints are informational.

The merge working tree was additionally checked in production mode, including 34 browser tests, and both preview/production metadata modes were validated. No participant-facing content or gallery/Spotify behavior was changed by migration.

The deployment smoke script was rehearsed against the local production build: 34 page/viewport checks, six gallery/viewport checks, live artist embeds, Sketchfab activation, robots/sitemap, custom 404 and source-path exclusions passed. External requests retain the four known limitations below. Migration-only `git diff --check` passes; inspecting the entire historical merge also reports existing Markdown hard-break spaces in the authoritative master/curatorial documents and an existing trailing blank line in Round 3. Those approved historical files were deliberately not reformatted.

Live deployment is a separate gate: inspect the GitHub Actions run for this merge SHA, then run `node scripts/check-live.mjs` against the public domain. The read-only script writes `qa-artifacts/live-smoke.json`; do not equate a local build or workflow success with a passed live smoke test.

Known external limitations: approved Bivariate DOI currently returns 404; Taylor & Francis returns 403 to automated requests; LinkedIn returns 999. StoryMaps and supplied artist/player links are checked independently. These are not reasons to silently replace approved URLs.

## Recovery

Keep both the backup branch and `redesign` until a separate cleanup decision. For a rollback, first stop/inspect any in-flight Pages workflow and obtain approval for the desired version. A standard revert of this migration merge (mainline parent 1) preserves history and restores the legacy source/workflow; it would publish the old site using its old workflow. Do not force-push the backup over production. A later Astro rollback should instead restore a known-good Astro source commit while retaining the dist-only workflow.
