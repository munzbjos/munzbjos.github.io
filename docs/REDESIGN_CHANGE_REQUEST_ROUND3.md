# REDESIGN_CHANGE_REQUEST — Next Review Round

Apply **only the changes listed below** to the current `redesign` branch.

- Do not modify `gh-pages`.
- Preserve all content, layout and behaviour not explicitly changed below.
- Keep the global footer rule from the previous iteration: `© 2026 Josef Münzberger`.
- Keep the global punctuation rule from the previous iteration: decorative full-stops use the same colour as the surrounding heading text.

---

## 1. Research

### RESEARCH-01 — Remove secondary label from Further Explorations

In the `Further Explorations` section, remove the small right-aligned text:

`Maps, music & models`

Keep the `Further Explorations` heading itself.

### RESEARCH-02 — Sort project cards by year

Sort the Research cards from newest to oldest, left to right.

Use the **first/start year shown** as the sorting key, descending.

For entries with the same start year, preserve their current relative order unless another explicit order is already defined.

---

## 2. About

### ABOUT-01 — Connect links

Remove the GitHub link from the `Connect` section.

Keep the remaining links unchanged.

### ABOUT-02 — Education wording

In the `Education` block, change:

`Teaching-related cartography, geocoding and spatial data visualization.`

to:

`Teaching-related cartography, GIS and spatial data visualization.`

---

## 3. Music

### MUSIC-01 — Add one short introductory sentence

Add one concise sentence directly below the main `Music.` heading and above the Spotify embeds.

Use this wording:

`I'm a lifelong musician, playing in <u>The Jay</u> and <u>Asibásně</u>, composing music for theatre productions, and a member of <u><a href="https://cinoherniklub.cz/lide/josef-munzberger/">Činoherní klub</a></u> since 2022 as a sound engineer.`

Requirements:
- underline `The Jay`;
- underline `Asibásně`;
- underline `Činoherní klub`;
- link only `Činoherní klub` to:
  `https://cinoherniklub.cz/lide/josef-munzberger/`
- keep the sentence visually restrained and secondary to the main `Music.` heading;
- keep the existing Spotify embeds unchanged.

---

## 4. Prague Squared

### PRAGUE-01 — Remove Location metadata

Remove the metadata row:

`Location — Prague, Czechia`

### PRAGUE-02 — Add Best Map Award recognition

In `Publications & Recognition`, add:

`Runner-up — Best Map Award 2025, Journal of Maps`

Link the recognition to:

`https://www.tandfonline.com/journals/tjom20/collections/best-map-award`

This recognition refers to the map poster associated with the Prague Squared article.

---

## 5. Bivariate Joy Plots

### BIVARIATE-01 — Add current user-testing survey

In `Publications & Recognition`, add a clearly labelled link to the current user-testing study:

**Bivariate Joy Plots User Study**

URL:

`https://joyplots.onmaps.cz/`

Add a short supporting description:

`User-testing study comparing bivariate joy plots with bivariate choropleth maps.`

Do not present it as a publication.

---

## 6. Tropical Nights

### TROPICAL-01 — Simplify subtitle

Remove:

`data-driven cartography`

from the visible project subtitle/type.

Keep the remaining thematic/climate visualization wording.

### TROPICAL-02 — Remove Sources & Credits

Remove the entire `Sources & Credits` section from the Tropical Nights detail page.

Do not display the Meteostat credit block on this project page.

---

## 7. The Beatles Map

### BEATLES-01 — Correct singular/plural framing

The project is one map poster, not a series.

Replace references to:

`map series`

with:

`map poster`

Update surrounding grammar where needed so both the short and extended description consistently describe a **single work**.

Do not otherwise rewrite the project description.

---

## 8. Elton John

### ELTON-01 — Shorter card title

On project cards/listings, replace the current long title with:

`Elton John Farewell Tour`

Keep the full existing project title on the detail page unless necessary for layout consistency.

Prefer an optional `cardTitle` / listing-title field rather than changing the canonical project title globally.

### ELTON-02 — Simplify subtitle

Remove:

`educational cartography`

from the visible project subtitle/type.

Keep the remaining thematic cartography / music mapping framing.

### ELTON-03 — Remove second explanatory paragraph

Delete the entire paragraph beginning:

`The teaching exercise asks students ...`

Do not replace it.

### ELTON-04 — Remove Teaching context

Remove the complete `Teaching context` section from the Elton John detail page.

### ELTON-05 — Reframe the project as a map animation

The main visual will be an animation in which tour stops appear progressively in chronological order.

Update the remaining descriptive paragraph so the project is framed primarily as a **map animation** rather than only a static thematic map.

Use this wording:

`The map animation was developed while preparing a university cartography practical on geocoding. It uses concert locations from part of Elton John’s Farewell Yellow Brick Road tour and reveals the tour stops progressively in chronological order, turning a simple geocoded dataset into a visual narrative of movement through space and time.`

The implementation should allow the new main animation asset to replace the current static hero visual when supplied.

---

## 9. Chinese Pavilion

### CIBULKA-01 — Shorter title

Change the visible project title from:

`Chinese Pavilion at Cibulka`

to:

`Chinese Pavilion`

Use the shorter title on cards and on the detail page.

### CIBULKA-02 — Simplify subtitle

Remove:
- `architectural visualization`
- `cultural heritage`

Keep only:

`3D modelling`

as the visible subtitle.

### CIBULKA-03 — Remove viewer helper text

Remove the line beginning:

`Loading the viewer...`

### CIBULKA-04 — Remove Sketchfab image caption / credit line

Remove the line beginning:

`Čínský pavilon — munzbjos...`

from the visible project page.

Do not remove the Sketchfab embed itself.

---

## 10. Beyond the Horizon

### BTH-01 — Update subtitle

The visible subtitle should become:

`Travel networks / Digital Humanities / HGIS`

Add `Travel networks`.

Remove:
- `Historical cartography`
- `spatial data visualization`

### BTH-02 — Remove Funding metadata

Remove the `Funding` row from the detail page.

### BTH-03 — Remove Sources & Credits

Remove the complete `Sources & Credits` section from the Beyond the Horizon detail page.

---

## 11. The Second Life of the Chain Bridge

### CHAIN-01 — Simplify subtitle

The visible subtitle should contain only:

`Digital storytelling`

### CHAIN-02 — Remove hero-image caption

Remove the caption displayed directly below the main project image.

### CHAIN-03 — Remove Funding metadata

Remove the `Funding` row from the project detail page.

### CHAIN-04 — Translate parent project name

Keep the portfolio item title:

`The Second Life of the Chain Bridge`

In the project metadata/context, change the parent project name to:

`Vltava II – transformations of the historical landscape, the river as a link and a barrier`

---

## 12. Tracing the Lost Railway

### RAILWAY-01 — Simplify subtitle

The visible subtitle should contain only:

`Digital storytelling`

### RAILWAY-02 — Remove hero-image caption

Remove the caption displayed directly below the main project image.

### RAILWAY-03 — Remove Funding metadata

Remove the `Funding` row from the project detail page.

### RAILWAY-04 — Use English parent project name

Keep the portfolio item title:

`Tracing the Lost Railway`

In the project metadata/context, use the parent project name:

`Two Centuries of Railways in the Czech Lands`

---

---

## Global metadata consistency

### GLOBAL-TOOLS-01 — Normalize ArcGIS Pro naming

Whenever `ArcGIS Pro` is listed as a tool, display only:

`ArcGIS Pro`

Do not display software version numbers such as:

- `ArcGIS Pro 3.3`
- any other ArcGIS Pro version suffix

Apply this rule consistently across all project detail pages, cards, metadata sources and structured project data.

Do not change the naming of other tools unless explicitly requested elsewhere.

**Acceptance criteria:** Every visible occurrence of ArcGIS Pro across the site uses the exact label `ArcGIS Pro`.


## Implementation constraints

- Apply only the changes above.
- Do not make additional visual redesign changes.
- Do not replace covers or crops unless required for the Elton John animation support described above.
- Preserve current responsive behaviour.
- Preserve existing accessibility behaviour.
- Run the existing production build and QA tests after implementation.
- Keep `gh-pages` unchanged.

---

## Additional final changes

### GLOBAL-DETAIL-01 — Remove captions below main project images

Apply this rule to **all project detail pages**.

Remove the visible text/caption directly below the main hero image.

Example to remove:
`Dante’s Inferno — a cartographic interpretation.`

Important:
- remove only the caption directly associated with the main/hero image;
- do **not** automatically remove captions from gallery/slideshow images unless separately requested;
- keep alt text and other accessibility metadata intact.

**Acceptance criteria:** No project detail page displays a visible caption immediately below its main hero image.

---

## Dante’s Inferno

### DANTE-01 — Add Esri Press book features to Publications & Recognition

In `Publications & Recognition`, add a restrained subsection / group such as:

`Featured in Esri Press books`

Include:

1. **Telling Stories with Maps**
   - Link:
     `https://www.esri.com/en-us/esri-press/browse/telling-stories-with-maps`
   - Supporting note:
     `Dante’s Inferno is presented in a two-page feature.`

2. **The Spatial Edge**
   - Link:
     `https://www.esri.com/en-us/esri-press/browse/the-spatial-edge`
   - Supporting note:
     `Dante’s Inferno is presented in a one-page feature.`

These are editorial/book features, not awards. Present them more quietly than the existing competition recognitions.

Do not remove or modify the existing awards.

---

## Shared presentation gallery component

### GALLERY-01 — Introduce a single-window presentation mode

Create a reusable gallery/presentation component for projects where several related visuals should be browsed in **one image window** instead of being displayed as a long vertical stack.

Use this component for:
- Prague Squared;
- Beyond the Horizon / Grand Tours.

#### Behaviour

The component should:
- display one image at a time in a single consistent viewport;
- provide clear Previous / Next controls;
- show the current position, e.g. `2 / 4`, or an equally restrained indicator;
- support keyboard navigation;
- remain fully usable on mobile;
- preserve image proportions using a non-destructive `contain`-style presentation where appropriate;
- lazy-load non-current images where practical;
- retain alt text for every image;
- avoid auto-rotation / autoplay;
- avoid decorative carousel effects.

Optional:
- swipe navigation on touch devices if implementation remains lightweight.

Do not introduce a third-party carousel library unless genuinely necessary.

---

## Prague Squared

### PRAGUE-03 — Present supporting maps in a single viewer

Keep the current main/hero image unchanged.

Replace the vertically stacked supporting visuals with the shared single-window presentation gallery from `GALLERY-01`.

Use these files in this exact order:

1. `portfolio/praguesquared/ps1.png`
2. `portfolio/praguesquared/ps2.png`
3. `portfolio/praguesquared/ps3.png`
4. `portfolio/praguesquared/ps5.png`

Do not include `ps0.png` in this presentation gallery unless it is already serving another explicitly approved purpose.

The four supporting maps should therefore be browsable inside one presentation window rather than displayed one below another.

Preserve appropriate per-image alt text and captions inside the viewer if captions are useful there.

---

## Beyond the Horizon / Grand Tours

### BTH-04 — Use newly supplied Grand Tours maps as project gallery content

Use the maps supplied in:

`portfolio/grand-tours/`

as the supporting visual content for the Beyond the Horizon detail page.

Do not substitute unrelated StoryMap screenshots or supplemental imagery when these supplied maps are available.

If `portfolio/grand-tours/` is not present in the working branch at implementation time, stop only this gallery task and report the missing directory; do not invent replacement assets.

### BTH-05 — Group and order Grand Tours maps by filename

The supplied filenames encode:
- the traveller/family using the first letter / family prefix;
- visual level using an `overview` or `detail` suffix.

Group files belonging to the same family/traveller together.

Within each family/traveller group, sort:

1. `overview`
2. `detail`
3. additional detail variants, if multiple exist, in their natural filename order

Then proceed to the next family/traveller group.

In other words, the desired sequence is conceptually:

`Family A overview → Family A detail(s) → Family B overview → Family B detail(s) → ...`

Do not alphabetically separate all overview maps from all detail maps.

### BTH-06 — Present Grand Tours maps in one presentation window

Display the ordered Grand Tours maps using the shared single-window presentation gallery from `GALLERY-01`.

Requirements:
- one map visible at a time;
- Previous / Next navigation;
- restrained image counter/indicator;
- no long vertical stack of all maps;
- preserve readable map detail as much as possible;
- use `contain` rather than aggressive cropping for cartographic content.

The viewer should function as a compact visual presentation of the different Grand Tour maps within the Beyond the Horizon project detail page.

