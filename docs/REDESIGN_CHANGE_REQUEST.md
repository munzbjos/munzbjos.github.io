# REDESIGN_CHANGE_REQUEST

Working document for the second redesign iteration of `munzbjos.github.io`.

- Target branch: `redesign`
- Do not modify `gh-pages`.
- Preserve currently approved content unless a change is explicitly requested below.
- This document is incremental and will be expanded section by section.

---

## A. Global visual language + Homepage

### GLOBAL-01 — Typography

**Decision:** Keep the current `Inter Variable` typeface for now.

**Rationale:** The current typography is clean, restrained and appropriate for the minimal editorial direction. A similar alternative may be considered later, but changing the font is not required in this iteration.

**Implementation:** No typography replacement at this stage.

**Priority:** Low / hold.

---

### GLOBAL-02 — Full-stop punctuation must not use the accent colour

**Current state:** Full-stops after the site name and major page headings such as `Work.` and `Research.` are rendered in the green accent colour.

**Change:** Keep the full-stop wherever it is intentionally part of the heading, but always render it in the same colour as the surrounding heading/name text.

Apply this rule site-wide, including:
- Josef Münzberger in the hero;
- Josef Münzberger in the header brand;
- `Work.`;
- `Research.`;
- any equivalent major title using the same accent-dot pattern.

Do not remove the full-stop itself unless separately requested.

**Priority:** Medium.

**Acceptance criteria:** No decorative full-stop on the site uses the green accent colour.

---

### HOME-01 — Selected Work numbering

**Current state:** `Selected Work` includes the small upper-index count `01—03`.

**Change:** Remove `01—03`.

Keep:
- the `Selected Work` heading;
- the section divider;
- the `All work ↗` link;
- the three selected project tiles.

**Priority:** Medium.

---

### HOME-02 — Selected Work project captions

**Decision:** Keep the current presentation of project title and date below each project tile.

The visual cover imagery will be reviewed/replaced in a later cover-specific pass.

**Priority:** Keep as is.

---

### HOME-03 — Selected Research eyebrow

**Current state:** The section includes the small uppercase label:

`METHODS, HISTORIES, PERSPECTIVES`

**Change:** Remove this label completely.

Keep:
- the section divider;
- the `Selected Research` heading;
- the `All research ↗` link;
- the selected research tiles.

**Priority:** Medium.

---

### HOME-04 — Remove About teaser from homepage

**Current state:** A homepage section below Selected Research contains an About teaser beginning with:

`A cartographic perspective. An interdisciplinary practice.`

**Change:** Remove the entire About teaser section from the homepage.

Do not replace it with another text block.

The homepage should move directly from `Selected Research` to the footer.

**Priority:** High.

---

### GLOBAL-03 — Simplify footer site-wide

**Current state:** The footer contains:
- Josef Münzberger;
- `Cartography, research & the spaces between`;
- professional/social links;
- `Project imagery credited on detail pages`;
- copyright information.

**Change:** Remove all footer content except a minimal copyright line at the very bottom.

Keep only:

`© 2026 Josef Münzberger`

Remove:
- repeated name/identity block;
- `Cartography, research & the spaces between`;
- GitHub / social / professional links from the footer;
- `Project imagery credited on detail pages`.

Professional links may remain available on the About page.

**Priority:** High.

**Scope:** Apply this footer simplification across the entire website, including Home, Work, Research, About, Music and all project detail pages.

**Acceptance criteria:** Every page ends with a visually quiet footer containing only `© 2026 Josef Münzberger`.

---

## Resulting homepage hierarchy

After these changes, the homepage should contain only:

1. Hero / name / professional descriptor
2. Selected Work
3. Selected Research
4. Minimal copyright footer

The goal is a cleaner, more portfolio-first landing page with less explanatory and decorative content.

---

## B. Work page

### WORK-01 — Remove accent colour from `Work.` punctuation

**Current state:** The page title is rendered as `Work.` with the full-stop in the green accent colour.

**Change:** Keep the full-stop, but render it in the same colour as the `Work` heading.

This follows the same rule as `GLOBAL-02` for the Josef Münzberger brand/name punctuation.

**Priority:** Medium.

---

### WORK-02 — Simplify Work page introduction

**Current state:** The Work page header contains:

- eyebrow above the title: `Cartography & visual exploration`
- title: `Work.`
- lead below the title: `Spatial data, seen differently.`

**Change:** Remove both supporting text elements:

- remove `Cartography & visual exploration`;
- remove `Spatial data, seen differently.`

Keep only the `Work.` title in the page intro.

Do not replace the removed texts with alternative copy.

**Keep unchanged:** The later `Further explorations` section and its `Maps, music & models` label.

**Priority:** High.

**Acceptance criteria:** The top of the Work page contains a clean `Work.` heading without eyebrow or descriptive lead text before the project grid begins.

---

### WORK-03 — Dante’s Inferno card label

**Current state:** The Dante’s Inferno project card displays:

`Interactive cartography`

**Change:** Replace the card/listing label with:

`Storymapping & Digital Humanities`

This change is intended for the project-card metadata shown in Work/listing contexts. Do not unnecessarily replace the richer project `type` metadata used on the project detail page.

**Implementation note:** Prefer a dedicated optional card/listing label in the project data model (for example `cardLabel`) with the current type-derived label as fallback, rather than changing the underlying full `type` field solely to alter the card.

**Priority:** Medium.

**Acceptance criteria:** Dante’s Inferno displays `Storymapping & Digital Humanities` beneath its tile while the detailed project metadata can retain its existing fuller classification.

---

### WORK-04 — Footer

No additional Work-specific footer design is required.

Apply `GLOBAL-03`: the Work page footer must contain only:

`© 2026 Josef Münzberger`

Remove the tagline and all footer links.

---

## C. Research page

### RESEARCH-01 — Simplify Research page introduction

**Current state:** The Research page header contains:

- eyebrow above the title: `Spatial visualization & historical inquiry`
- title: `Research.`
- lead below the title: `New ways to read data. New perspectives on the past.`

**Change:** Remove both supporting text elements:

- remove `Spatial visualization & historical inquiry`;
- remove `New ways to read data. New perspectives on the past.`

Keep only the `Research.` title.

The full-stop must follow `GLOBAL-02` and use the same colour as the heading.

**Priority:** High.

**Acceptance criteria:** The Research page begins with a clean `Research.` heading followed by the research project grid, without eyebrow or descriptive lead copy.

---

### RESEARCH-02 — Beyond the Horizon card label

**Current state:** The card label is derived from the first part of the project type and therefore reads `Historical cartography`.

**Change:** Display the card/listing label:

`Travel networks`

Do not replace the fuller project metadata used inside the detail page.

**Implementation note:** Use the same optional card/listing-label mechanism requested in `WORK-03`.

**Priority:** Medium.

---

### RESEARCH-03 — Reframe Vltava II as the specific StoryMap contribution

The portfolio should no longer present the umbrella Vltava II research project as the primary item. It should present Josef's concrete contribution: the StoryMap about the relocated chain bridge.

#### Listing / card

Change title from:

`Vltava II – Historical Landscape Transformations`

to:

`The Second Life of the Chain Bridge`

Set the card/listing label to:

`Storymapping`

Keep the existing project period only if it remains useful as background metadata; for the portfolio-facing title and copy, prioritize the StoryMap itself rather than the umbrella project.

#### Detail page

Change the detail-page title to:

`The Second Life of the Chain Bridge`

Rewrite the short and extended description so that the page is primarily about the StoryMap and Josef's contribution, not about the full Vltava II project.

Use the following editorial direction:

**Suggested short description:**

`An interactive StoryMap tracing the relocation of the historic chain bridge from Podolsko to Stádlec through archival imagery, maps and narrative cartography.`

**Suggested extended note:**

`The StoryMap follows the remarkable second life of the historic chain bridge originally built across the Vltava at Podolsko. It reconstructs the bridge’s dismantling and relocation to Stádlec, where it was reassembled across the Lužnice, combining archival maps, photographs and other historical material in a spatial narrative.`

`Created within the Vltava II research project, the portfolio entry focuses specifically on Josef Münzberger’s contribution: the design of the StoryMap and its cartographic presentation.`

#### Role

Keep:

`StoryMap design`

#### Parent project

The Vltava II project may remain as secondary context in metadata, but it must not dominate the title, introduction or portfolio narrative.

A project website link may remain available as contextual information.

#### StoryMap URL correction

Use the correct StoryMap URL:

`https://storymaps.arcgis.com/stories/945c245fcae24ee796371173e3ece15b`

Owner-confirmed correction (2026-09-24): this URL opens the chain-bridge StoryMap. Preserve this assignment in the repository data; the original change-request URL was reversed.

**Priority:** High.

**Acceptance criteria:** Both the Research card and detail page clearly present the chain-bridge StoryMap as the portfolio item, with Vltava II visible only as supporting research context.

---

### RESEARCH-04 — Reframe railway project as the specific StoryMap contribution

The portfolio should no longer present the full `Two Centuries of Railways in the Czech Lands` research project as the primary item. It should present Josef's concrete contribution: the StoryMap about the abandoned railway.

#### Listing / card

Change title from:

`Two Centuries of Railways in the Czech Lands`

to:

`Tracing the Lost Railway`

Set the card/listing label to:

`Storymapping`

#### Detail page

Change the detail-page title to:

`Tracing the Lost Railway`

Rewrite the short and extended description so that the page focuses on the StoryMap and Josef's cartographic contribution.

Use the following editorial direction:

**Suggested short description:**

`An interactive StoryMap tracing the vanished railway between Trhový Štěpánov and Dolní Kralovice through historical maps, aerial imagery, photographs and spatial reconstruction.`

**Suggested extended note:**

`The StoryMap follows the former railway line from Trhový Štěpánov towards Dolní Kralovice, documenting stations, surviving traces and locations transformed or lost after the construction of the Švihov Reservoir. Historical aerial imagery, photographs and cartographic sources are combined to reconnect the present-day landscape with the vanished railway.`

`Created within the Two Centuries of Railways in the Czech Lands research project, the portfolio entry focuses specifically on Josef Münzberger’s contribution to the StoryMap design and cartographic presentation.`

#### Role

Keep:

`StoryMap design / cartography`

#### Parent project

The broader research project may remain as secondary contextual metadata, but it must not dominate the portfolio-facing title or introductory copy.

Project website links may remain as contextual resources.

#### StoryMap URL correction

Use the correct StoryMap URL:

`https://storymaps.arcgis.com/stories/8b9818a23a184da3bf3938391581a0f2`

Owner-confirmed correction (2026-09-24): this URL opens the lost-railway StoryMap. Preserve this assignment in the repository data; the original change-request URL was reversed.

**Priority:** High.

**Acceptance criteria:** Both the Research card and detail page clearly present the lost-railway StoryMap as the portfolio item, with the larger research project shown only as background context.

---

### RESEARCH-05 — Footer

Apply `GLOBAL-03`.

The Research page footer must contain only:

`© 2026 Josef Münzberger`

---

## D. About page

### ABOUT-01 — Reduce About to essential content

The current About page contains more explanatory copy than desired.

**Keep only:**
- the main page title `About.`;
- the `Connect` section;
- the three thematic practice blocks:
  - `Cartography & visualization`
  - `Research & storytelling`
  - `Education`

**Remove:**
- eyebrow `Cartographer · Researcher · Educator`;
- `I explore the relationships between maps, data and the stories they tell.`;
- `My work spans thematic cartography, spatial visualization, historical cartography, HGIS and digital humanities.`;
- `I am based at the Department of Geomatics, Czech Technical University in Prague.`;
- heading `Across the practice`;
- link `Explore the work ↗`.

Do not replace the removed biography copy with alternative text in this iteration.

The `About.` full-stop follows `GLOBAL-02`: same colour as the heading.

**Priority:** High.

---

### ABOUT-02 — Preserve the three thematic practice blocks

Keep the existing wording exactly:

#### Cartography & visualization
`Thematic mapping, information graphics and experimental visual methods.`

#### Research & storytelling
`Historical sources, spatial analysis and interactive narratives.`

#### Education
`Teaching-related cartography, geocoding and spatial data visualization.`

These three blocks should become the principal content of the About page rather than secondary content positioned only in the right-hand column.

**Priority:** High.

---

### ABOUT-03 — New spatial layout

The existing `text-layout` is no longer appropriate after removing the biography because it would leave the preserved content visually stranded in one side of the page.

Create a new About-specific responsive layout.

#### Desktop

After the `About.` heading, use a balanced two-column composition:

- **main / wider column (approximately 2/3):** the three thematic practice blocks;
- **secondary / narrower column (approximately 1/3):** `Connect`.

The thematic blocks should read as the main content of the page.

Suggested visual behaviour:
- generous vertical spacing between the three thematic blocks;
- no card boxes;
- no decorative backgrounds;
- typography and whitespace should create hierarchy;
- align `Connect` to the top of the thematic content;
- a subtle rule/divider may be used if consistent with the existing design system, but is not required.

Do not center the content artificially; preserve the editorial left-aligned character of the site.

#### Tablet

Retain a two-column layout while space permits, with the thematic column still visually dominant.

#### Mobile

Collapse to one column.

Recommended order:
1. thematic practice blocks;
2. Connect.

Maintain comfortable vertical spacing and avoid excessive empty space.

**Priority:** High.

**Acceptance criteria:** The About page feels intentionally composed after the biography is removed; no large empty left column remains and the three practice areas visually dominate the page.

---

### ABOUT-04 — Connect

Keep the existing `Connect` section and its current links:

- email;
- CTU Prague profile;
- LinkedIn;
- GitHub.

Keep it visually restrained and secondary to the three thematic practice areas.

Do not add new professional links in this iteration.

**Priority:** Keep / reposition.

---

### ABOUT-05 — Footer

Apply `GLOBAL-03`.

The About page footer must contain only:

`© 2026 Josef Münzberger`

---

## E. Music page

### MUSIC-01 — Simplify Music page introduction

**Current state:** The Music page header contains:

- eyebrow above the title: `Beyond the map`
- title: `Music.`
- lead below the title: `A different kind of composition.`

**Change:** Remove both supporting text elements:

- remove `Beyond the map`;
- remove `A different kind of composition.`

Keep only the main title:

`Music.`

The full-stop follows `GLOBAL-02`: same colour as the heading.

**Priority:** High.

---

### MUSIC-02 — Remove secondary heading and explanatory copy

Remove:

- section heading `Listen`;
- text `Selected music links from my existing portfolio.`

Do not replace either with alternative copy.

**Priority:** High.

---

### MUSIC-03 — Replace artist-link list with Spotify embeds

Remove the existing two-row link list for `The Jay` and `Asibásně`.

Replace it with two embedded Spotify players using the exact approved sources below.

#### The Jay

Use the album embed:

`https://open.spotify.com/embed/album/0Zgc4sdQv3ArYMS955r1FE?utm_source=generator&theme=0&si=1bc37425d8a34eca`

#### Asibásně

Use the track embed:

`https://open.spotify.com/embed/track/4r9UAO3vFwWMuy3Fo0jkQq?utm_source=generator&theme=0&si=2cf82103b97a40be`

Recommended markup behaviour:

- `width="100%"`;
- `height="352"`;
- `frameborder="0"`;
- `loading="lazy"`;
- `allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"`;
- preserve Spotify's rounded iframe presentation;
- keep the embeds responsive within the site's content width.

Use semantic surrounding sections/figures if helpful, but do not add redundant explanatory text.

**Priority:** High.

---

### MUSIC-04 — Layout of embeds

The Music page should remain minimal and visually consistent with the rest of the redesign.

#### Desktop

Recommended:
- stack the two Spotify embeds vertically;
- use the same page content width system as the rest of the site;
- keep generous spacing between the two embeds;
- avoid surrounding cards, panels or decorative backgrounds.

#### Mobile

- each embed should remain full-width;
- preserve comfortable side margins;
- ensure no horizontal overflow.

Do not place the two 352 px players side-by-side if doing so harms readability or Spotify's native layout.

**Priority:** Medium.

**Acceptance criteria:** The page reads simply as `Music.` followed by the two Spotify players, without intermediary labels or link-list UI.

---

### MUSIC-05 — Footer

Apply `GLOBAL-03`.

The Music page footer must contain only:

`© 2026 Josef Münzberger`

---

## F. Reviewed project detail pages

### DETAIL-01 — Prague Squared

**Decision:** Keep the Prague Squared detail page unchanged.

Only the global footer change from `GLOBAL-03` applies.

No other content, layout or metadata changes are requested in this iteration.

---

### DETAIL-02 — Joy Plots: swap hero and Martinique gallery image

**Current state:**
- hero / cover image: `JoyMartinique.png`
  - caption: `Martinique`
- first gallery image: `joy.png`
  - caption: `Elevation / Population in Czechia`

**Change:** Swap these two visuals, including their associated alt text and captions.

#### New hero / cover

Use:

`portfolio/joyplot/joy.png`

with its existing metadata:

- alt: `Overlapping ridge profiles map elevation and population across Czechia.`
- caption: `Elevation / Population in Czechia`

#### New gallery image

Move:

`portfolio/joyplot/JoyMartinique.png`

into the gallery position previously occupied by the Czechia image, preserving:

- alt: `White elevation ridgelines trace Martinique on a lavender background.`
- caption: `Martinique`

Do not alter the remaining Dominica and Grenada gallery entries.

**Priority:** High.

**Acceptance criteria:** The Joy Plots detail page opens with the Czechia Elevation / Population visual; Martinique appears as a gallery item with the correct caption.

---

### DETAIL-03 — Dante’s Inferno detail subtitle

**Current state:** The line directly below the main `Dante’s Inferno` heading is derived from the full project type:

`Interactive cartography / digital storytelling / literary cartography`

**Change:** On the detail page, display instead:

`Storymapping / Digital Humanities`

Do not discard or overwrite the richer internal project classification merely to change this visible subtitle.

**Implementation note:** Introduce an optional detail-facing field such as `detailSubtitle` / `detailLabel`, with the existing full `type` used as fallback for other projects.

This is separate from the card/listing label requested in `WORK-03`:

- card: `Storymapping & Digital Humanities`
- detail subtitle: `Storymapping / Digital Humanities`

**Priority:** Medium.

---

### DETAIL-04 — Dante’s Inferno StoryMap link label

**Current state:** Interactive outputs renders a generic combined label equivalent to:

`Dante’s Inferno — View StoryMap ↗`

**Change:** For Dante’s Inferno, show the link text as:

`Dante’s Inferno StoryMap ↗`

Keep the existing approved StoryMap URL unchanged:

`https://storymaps.arcgis.com/stories/ad2a09720b75435b922396307e2d6004`

Do not add a second `View StoryMap` suffix.

**Implementation note:** If necessary, add an optional display label for interactive outputs rather than special-casing the entire template.

**Priority:** Medium.

---

## G. Review package after implementation

The first review package contains project-detail screenshots only for:

- Prague Squared
- Joy Plots
- Bivariate Joy Plots
- Dante’s Inferno

After implementing this change request, regenerate the visual review package and **expand it to include desktop/tablet/mobile screenshots for all project detail pages**, including:

- Tropical Nights
- The Beatles Map
- Elton John – Farewell Yellow Brick Road Tour
- Chinese Pavilion at Cibulka
- Beyond the Horizon
- The Second Life of the Chain Bridge
- Tracing the Lost Railway

Also regenerate the already reviewed pages so the full second-iteration state can be checked consistently.

Do not make additional speculative design changes to unreviewed detail pages before this second review.

**Priority:** High for QA / review handoff.
