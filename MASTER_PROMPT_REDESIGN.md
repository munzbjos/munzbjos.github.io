# Master Prompt — munzbjos.github.io Redesign

## Role

You are the **orchestrator of a multi-agent web redesign team**. Your task is to redesign and rebuild Josef Münzberger’s personal portfolio website in the existing GitHub repository:

- Repository: `https://github.com/munzbjos/munzbjos.github.io`
- Working branch: **`redesign`**
- Current public website: `https://munzbjos.github.io`
- Visual reference: `https://sacha-schlumpf.ch/work`

You are responsible for coordinating specialist agents, resolving conflicts between their recommendations, maintaining a coherent design system, and delivering a working static website ready for later visual refinement.

Do not merely restyle the existing page. Treat this as a **curated portfolio redesign and content-architecture rebuild**.

---

## 1. Source of truth

Before making design or implementation decisions, inspect the full `redesign` branch.

Treat the following repository documents as authoritative:

1. `portfolio_catalog.md`  
   Contains approved project metadata, descriptions, roles, tools, publications, awards, links, section assignment, and Featured/Secondary status.

2. `curatorial_structure_proposal.md`  
   Contains the approved information architecture, homepage hierarchy, Work/Research logic, detail-page strategy, and curatorial principles.

If the filenames differ slightly, locate the Markdown files by their content.

### Precedence

When sources conflict, use this order:

1. `portfolio_catalog.md`
2. `curatorial_structure_proposal.md`
3. current repository content
4. current public website

Do not invent missing biographical facts, dates, awards, roles, publications, affiliations, client names, project credits, or links.

If information is genuinely missing, mark it clearly as `TBD` in an internal implementation note rather than fabricating it.

---

## 2. Core objective

Build a modern, minimal, image-led personal website presenting Josef primarily as a:

**Cartographer · Researcher · Educator**

The portfolio should communicate three things quickly:

1. strong thematic cartography and visual design;
2. active research in spatial visualization, historical cartography, HGIS, and digital humanities;
3. breadth across interactive storytelling, coding, teaching-related cartography, and 3D modelling.

The result should feel like a **curated visual portfolio with a research layer**, not like an academic CV converted into a website.

---

## 3. Design direction

Use `https://sacha-schlumpf.ch/work` as a reference for the **editorial, minimal, project-first character** of the experience.

Take inspiration from:

- generous whitespace;
- strong typography;
- image-led project tiles;
- restrained metadata;
- asymmetrical or editorial grid composition where appropriate;
- subtle interaction;
- visual hierarchy created through scale rather than decoration.

Do **not** copy its code, layout, typography, branding, animations, or visual identity.

Create an independent visual system appropriate for cartography and academic creative work.

### Desired visual character

Prefer:

- light or warm-neutral background;
- dark charcoal typography;
- restrained UI chrome;
- one subtle accent at most;
- project imagery as the main source of colour;
- modern variable sans-serif typography or an equivalent high-quality neutral type system;
- large images;
- precise spacing;
- quiet, editorial composition.

Avoid:

- generic developer-portfolio aesthetics;
- glassmorphism;
- large gradients;
- neon colour systems;
- excessive rounded cards;
- visible boxes around every project;
- oversized iconography;
- animated gimmicks;
- generic AI-generated visuals;
- decorative stock imagery.

---

## 4. Information architecture

Primary navigation:

- **Work**
- **Research**
- **About**
- **Music**

The site name / `Josef Münzberger` should serve as the Home link.

Do not create a separate Home navigation item.

Do not create a separate Contact page. Contact information belongs in About and the footer.

### Homepage order

1. Hero
2. Selected Work
3. Selected Research
4. Short About
5. Footer

No news feed.
No chronological archive.
No full publication list on the homepage.

---

## 5. Hero

Keep the homepage hero minimal.

Primary identity:

**Josef Münzberger**  
*Cartographer · Researcher · Educator*

A concise one-line statement may be used, for example:

> Exploring spatial data through thematic cartography, visualisation and digital storytelling.

Do not place a long biography above the portfolio.

---

## 6. Work and Research

Follow the approved project assignments and ordering principles from `portfolio_catalog.md` and `curatorial_structure_proposal.md`.

Important project logic:

### Joy Plots must remain separated

- `portfolio/joyplot/` → **Work**
- `portfolio/bivariate-joyplot/` → **Research**

Do not merge these into one page or one tile.

The Work entry should foreground visual/cartographic experimentation.

The Research entry should foreground the bivariate methodological contribution, publication, and research continuation.

### Prague Squared

Appears in both Work and Research, but must use **one shared project detail page**.

Do not duplicate the page or content.

### Beyond the Horizon

Treat as one umbrella Research project.

Do not create separate tiles for:

- Matching Page to Path
- Scoto analysis

These belong as publications / outputs inside Beyond the Horizon.

### StoryMap-based research projects

Vltava II and Two Centuries of Railways belong in Research.

Use static project covers in grids.

Do not live-embed ArcGIS StoryMaps inside listing grids.

### Dante’s Inferno

Work only.

Use only the approved English StoryMap version.

### Secondary Work

Keep smaller portfolio pieces visible as intentionally lighter work:

- Tropical Nights
- The Beatles Map
- Elton John – Farewell Yellow Brick Road Tour
- Chinese Pavilion at Cibulka

Do not hide them just because they are smaller or older.

They add breadth and make the portfolio less monolithic.

---

## 7. Existing visual material and placeholder strategy

The `portfolio/` directory contains visual material for the projects.

Use this material immediately during implementation as **temporary covers and gallery imagery**.

Do not wait for final cover artwork.

However:

- do not destructively crop, overwrite, rename, or delete source images;
- do not assume the first image in a folder is the final cover;
- do not generate synthetic cover art;
- do not use generic stock photography;
- do not create decorative AI images;
- preserve original project imagery.

For the first build, choose the strongest available image from each project folder and use non-destructive CSS cropping.

The final cover selection and crop strategy will be reviewed only after the responsive grid is working.

Create optimized web derivatives where needed, but keep originals intact.

---

## 8. Project media behaviour

Every project may eventually have:

- `cover`
- `gallery`
- `interactive output`
- optional publication / project links

### Listing pages

Use only static covers.

Never embed:

- ArcGIS StoryMaps
- Sketchfab
- other interactive viewers

inside Work, Research, or homepage grids.

### Detail pages

Interactive outputs may be embedded or linked where useful.

For the Chinese Pavilion, use the approved Sketchfab model:

`https://skfb.ly/pNUVq`

Use a static image in the grid and the Sketchfab embed only on the project detail page.

StoryMaps should normally be presented with:

- a static project image;
- a clear `View StoryMap ↗` action;
- optional embed only on the detail page if it performs well and improves the experience.

---

## 9. Content model

Do not hardcode every project into page markup.

Create a structured project content model.

Preferred fields include:

- `slug`
- `title`
- `year`
- `section`
- `displayStatus`
- `author`
- `role`
- `type`
- `shortDescription`
- `extendedNote`
- `keywords`
- `tools`
- `publications`
- `interactiveOutputs`
- `projectWebsite`
- `awards`
- `media`
- `cover`
- `gallery`

Derive the data from `portfolio_catalog.md`.

Use one project object/source for projects that appear in more than one section.

Do not duplicate project metadata between Work and Research.

---

## 10. Technical direction

The result must remain a static website suitable for GitHub Pages.

### Preferred stack

Default to:

- **Astro**
- semantic HTML
- modern CSS
- minimal client-side JavaScript
- Astro content collections or an equivalent structured data layer
- static generation

Avoid React/Vue/Svelte unless there is a concrete interaction that genuinely requires them.

Do not introduce a backend or runtime server.

If the repository audit reveals a strong reason not to use Astro, document the reason and use an equally lightweight static architecture.

### Repository safety

Work only on the **`redesign`** branch.

Do not push or merge changes into `gh-pages`.

Do not alter the live deployment target until explicit final approval.

Preserve repository history.

Do not delete the existing website before the redesign is functional.

If restructuring assets, preserve original source material.

---

## 11. Multi-agent responsibilities

Coordinate specialist agents with clearly separated responsibilities.

### Repository / architecture agent

Responsible for:

- auditing the current repo;
- current deployment workflow;
- dependency and build strategy;
- migration plan;
- asset structure;
- GitHub Pages compatibility.

### UX / information architecture agent

Responsible for:

- navigation;
- page hierarchy;
- project relationships;
- homepage hierarchy;
- responsive content behaviour;
- ensuring Work and Research remain distinct but connected.

### Visual design agent

Responsible for:

- typography;
- spacing;
- grid behaviour;
- project tile hierarchy;
- hover/focus states;
- colour restraint;
- editorial visual system.

### Content / migration agent

Responsible for:

- converting `portfolio_catalog.md` into structured content;
- preserving approved wording and factual metadata;
- matching repository media to projects;
- identifying missing assets or metadata;
- never inventing content.

### Frontend implementation agent

Responsible for:

- Astro implementation;
- reusable components;
- responsive layout;
- image optimisation;
- project routing;
- static deployment compatibility.

### QA / accessibility / performance agent

Responsible for:

- keyboard navigation;
- semantic structure;
- focus states;
- colour contrast;
- `prefers-reduced-motion`;
- responsive behaviour;
- link validation;
- performance;
- image loading;
- metadata and SEO;
- regression checks.

The orchestrator owns the final decision when recommendations conflict.

---

## 12. Component strategy

Create reusable components rather than page-specific markup.

Likely components:

- Header / navigation
- Hero
- ProjectGrid
- ProjectCard
- ProjectMeta
- Image / media component
- ProjectDetailHeader
- Gallery
- Publication block
- Interactive output block
- Related / next project navigation
- About teaser
- Footer

Do not over-componentize trivial markup.

---

## 13. Grid behaviour

The visual grid is central to the redesign.

### Desktop

Use an editorial grid with approximately two or three columns depending on viewport.

Featured projects may span more space than Secondary projects.

Allow variation in tile size where it improves visual rhythm.

### Tablet

Preserve hierarchy while simplifying layout.

### Mobile

Use a clear one-column structure with full-width project imagery.

Do not preserve asymmetry at the expense of readability.

### Card content

Each project tile should normally show only:

- image;
- title;
- year;
- one concise category label.

Avoid paragraphs in project cards.

---

## 14. Project detail pages

Use a consistent but flexible template.

Suggested hierarchy:

1. Title
2. Year / project period
3. Short type/category line
4. Large hero image
5. Short description
6. Selected visuals
7. Role / tools / methods where relevant
8. Publications / awards / interactive outputs where relevant
9. Related / next project navigation

The page should remain image-led.

Avoid:

- long journal-style abstracts;
- large metadata tables;
- walls of text;
- repeating information already visible elsewhere.

Featured projects may have richer detail pages.

Secondary projects may use a lighter template.

---

## 15. About

Create a compact professional About page.

Use repository content only where still current.

Do not automatically reuse outdated biography text from the old website.

The page should eventually include:

- concise professional biography;
- current affiliation;
- research interests;
- selected professional links;
- optional CV;
- email.

Do not prominently display a personal phone number.

If current biographical information is not present in the approved sources, create the page structure with clearly marked content placeholders.

---

## 16. Music

Keep Music separate from the cartographic Work grid.

Create a visually compatible but lightweight section/page for:

- short introduction;
- selected compositions/projects;
- external music links;
- optional lightweight player.

Do not allow Music to compete with Work and Research in the homepage hierarchy.

If Music content is incomplete, build the structure and leave clean placeholders rather than inventing entries.

---

## 17. Accessibility

Target WCAG 2.2 AA where practical.

Mandatory:

- semantic HTML;
- keyboard-accessible navigation;
- visible focus states;
- meaningful alt text for project imagery;
- logical heading hierarchy;
- sufficient contrast;
- no essential information conveyed by colour alone;
- `prefers-reduced-motion`;
- accessible external-link behaviour;
- responsive type sizing.

Do not use hover-only interactions for essential information.

---

## 18. Performance

The site should feel immediate.

Requirements:

- optimise raster images;
- prefer AVIF/WebP where appropriate;
- preserve originals;
- responsive `srcset` / sizes;
- lazy-load below-the-fold media;
- avoid unnecessary JS;
- avoid layout shifts;
- defer third-party embeds;
- do not load StoryMaps or Sketchfab before the user reaches the relevant detail page;
- minimise font payload.

Aim for strong Lighthouse results on representative pages, ideally around 90+ in Performance, Accessibility, Best Practices and SEO, without sacrificing visual quality.

---

## 19. SEO and metadata

Implement:

- page titles;
- meta descriptions;
- canonical URLs;
- Open Graph metadata;
- social preview support;
- favicon;
- sitemap;
- robots.txt;
- project-specific metadata;
- JSON-LD `Person` where appropriate.

Do not fabricate social/profile URLs that are not present in approved content.

---

## 20. Motion and interaction

Use motion sparingly.

Allowed examples:

- subtle image scale or crop shift;
- restrained text reveal;
- elegant page transition;
- underline or typographic navigation transition.

Avoid:

- scroll-jacking;
- parallax-heavy interaction;
- auto-playing video;
- dramatic page transitions;
- decorative animation that delays navigation.

All non-essential motion must respect `prefers-reduced-motion`.

---

## 21. Implementation phases

### Phase 1 — Audit

Inspect:

- full `redesign` branch;
- current HTML/CSS/JS;
- GitHub Actions workflow;
- `portfolio/`;
- the two approved Markdown documents;
- current broken/obsolete paths;
- current public site.

Produce an internal audit before major restructuring.

### Phase 2 — Architecture and design system

Establish:

- final site map;
- project content schema;
- typography;
- spacing tokens;
- colour tokens;
- grid system;
- responsive breakpoints;
- component structure.

### Phase 3 — First working build

Build the full site shell with:

- real approved text;
- real project titles and metadata;
- existing repository visuals as temporary covers;
- all Work and Research items;
- About structure;
- Music structure;
- responsive navigation;
- working project routes.

This phase must **not** depend on final cover artwork.

### Phase 4 — Content integration

Populate:

- project galleries where suitable;
- publication links;
- awards;
- StoryMap links;
- Sketchfab embed;
- project websites;
- supporting metadata.

### Phase 5 — QA

Run:

- production build;
- broken-link check;
- responsive review;
- keyboard review;
- accessibility review;
- performance review;
- GitHub Pages path check;
- external embed check.

### Phase 6 — Handoff

Do not publish to `gh-pages`.

Provide:

- completed code in `redesign`;
- build instructions;
- deployment notes;
- concise list of unresolved `TBD` items;
- list of project covers that should be revisited after visual review;
- any recommended final content edits.

---

## 22. First-build stopping point

The first implementation should be visually coherent and fully navigable, but **final cover selection is not part of the first-build gate**.

Use available repository imagery.

Do not spend excessive time manually retouching or permanently cropping project images before the grid is approved.

At the end of the first build, provide a concise cover-review inventory such as:

`Project → current temporary cover → recommended aspect ratio → potential alternative files`

This will support a later human curatorial pass.

---

## 23. Quality bar

The redesign is successful if a visitor can understand within a few seconds that Josef works at the intersection of:

**cartography, spatial data visualization, research and digital storytelling.**

The website should feel:

- deliberate;
- modern;
- quiet;
- visual;
- academically credible;
- technically clean;
- personal without being informal;
- curated rather than exhaustive.

When uncertain, prefer **clarity, restraint, and stronger project imagery over additional text or UI decoration**.
