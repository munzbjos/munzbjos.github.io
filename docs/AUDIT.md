# Repository and deployment audit

Audit date: 21 September 2026. Baseline: `redesign` at `f67f0ac`.
Read in full: `MASTER_PROMPT_REDESIGN.md`, `portfolio_catalog.md`, and
`curatorial_structure_proposal.md`. Their precedence is preserved.

## Current implementation

- One root `index.html`, inline CSS and JavaScript, external W3.CSS,
  Montserrat and Font Awesome. No package manifest or static-site build exists.
- Legacy JavaScript includes several Three.js generations/loaders, an eager
  animated WebGL model, and a mouse-oriented slideshow.
- Existing biography contains potentially stale dates/status; do not migrate
  it as current biography without review. Existing contact email and profile
  links are attributable repository content; missing ORCID/Scholar/CV remain TBD.
- Music contains real Spotify artist links for The Jay and Asibásně. Retain
  as links rather than immediately loading third-party player if reused.
- HTML has duplicate `id="joy"`, malformed nested/closing tags, images without
  alt text, clickable slideshow anchors without href/button semantics, and
  no reduced-motion handling. Do not carry these patterns into the redesign.
- Broken local paths in the redesign baseline include `./ps0.png` through
  `ps5.png` (except ps4, never referenced), `./Dante.png`, `./joy.png`,
  `./JoyMartinique.png`, `./Beatles.png`, `./pavilon.dae`,
  `./TheBeatlesMap.pdf`, and `./js/VRButton.js`. Images/models exist under
  portfolio subdirectories; the PDF and VRButton file do not exist.

## Deployment and safety

- Existing `.github/workflows/static.yml` publishes the **whole repository**
  through GitHub Pages artifact actions. Push trigger is only `gh-pages`.
  It also permits `workflow_dispatch`, with no branch guard on the deploy job.
  Therefore a manual dispatch from redesign must not be used.
- `_config.yml` sets `jekyll-theme-cayman` but the workflow uploads static
  repository contents rather than invoking a Jekyll build.
- Public `https://munzbjos.github.io/` returns HTTP 200 via GitHub Pages;
  response Last-Modified is 19 March 2025. The current live site has not been
  modified during this audit.
- Unauthenticated Pages settings endpoint returns 404, so repository workflow
  and public response prove the current delivery mechanism, but do not prove
  account-level Pages settings. Do not claim settings have been verified.
- Safe implementation: Astro static output in `dist/`, root base `/` for this
  user site, trailing-slash directory routes, build-only redesign CI. No deploy
  action may execute on redesign; do not change gh-pages or Pages settings.
- Keep legacy source and all originals intact until an explicitly approved
  future migration. Build output must not contain source catalogs, model source
  files, secrets, or development dependencies by accident.

## Asset inventory and recommended initial mapping

Original `portfolio/` totals approximately 29 MiB: 18 PNGs and three pavilion
model files. Originals should remain byte-identical. Generate derivatives only.

| Project | Existing candidate | Dimensions / issue |
| --- | --- | --- |
| Prague Squared | `praguesquared/PragueSquared.png`; `ps0.png`, `ps1.png`, `ps2.png`, `ps3.png`, `ps5.png` | Composite 2033×1438; individual slides 2560×1440 |
| Joy Plots | `joyplot/joy.png`; six `Joy*.png` island maps | Main 2032×1438; islands approximately 2500–3100×1600–1700 |
| Bivariate Joy Plots | `bivariate-joyplot/nature-vs-people.png` | 887×1076 portrait; avoid aggressive crop of both variables |
| Dante’s Inferno | `dante/Dante.png` | 3508×2480, approximately 13 MiB: optimization essential |
| Tropical Nights | `tropical-nights/did-U-sleep-well.png` | 7016×4961, approximately 2.4 MiB |
| The Beatles Map | `beatles/Beatles.png` | 2245×1588, approximately 4.6 MiB; no PDF exists |
| Elton John | `elton/Elton.png` | 1446×1153 |
| Chinese Pavilion | `pavilon/pavilon.dae`, `.skp`, `.skb` | No static raster. Use a real model thumbnail/render if recoverable; never generic art |
| Beyond the Horizon | None | Approved StoryMap exists; static cover/gallery missing |
| Vltava II | None | Approved StoryMap exists; static cover/gallery missing |
| Two Centuries of Railways | None | Approved StoryMap exists; static cover/gallery missing |

Missing imagery should remain an honest, documented media gap unless a genuine
project-derived thumbnail can be obtained from the approved interactive output.
No synthetic/generic replacement. Project content/routes must still be complete.

## Content architecture constraints

There are 11 unique projects, seven Work entries and five Research entries;
Prague Squared shares one record/detail route. Joy Plots and Bivariate Joy Plots
must be separate. Beyond the Horizon remains one umbrella entry. Use English
Dante StoryMap only. Work order and Research order follow the curatorial file,
not filesystem/alphabetical order. All covers are provisional by source design.

## GitHub access

Public HTTPS clone/fetch works. No GitHub CLI, credential helper, repository
SSH command, or default GitHub SSH identity was found in the checked setup.
Only a JoyPlot-specific SSH key is visible by filename/metadata; it must not be
repurposed for this repository. Private-key contents were not read.
Write access is **not established** by public clone. If unavailable at handoff,
retain the local redesign commit and request a new repository-scoped writable
deploy key or a repository-scoped fine-grained token with Contents write only.
Workflow write authority may additionally be necessary if pushing workflow edits;
do not request broader account-wide access or change credentials silently.
