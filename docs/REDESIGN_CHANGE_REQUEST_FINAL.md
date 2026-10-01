# REDESIGN_CHANGE_REQUEST_FINAL

Final incremental change request for `munzbjos/munzbjos.github.io`.

- Target branch: `redesign`
- Do not modify `gh-pages`.
- This file applies **on top of** the previously approved redesign requests.
- Where this file conflicts with an earlier request, **this FINAL file takes precedence**.
- Apply only the changes listed below and preserve all other approved content and behaviour.

---

## 1. Music

### MUSIC-FINAL-01 — Replace both Spotify embeds

Replace the current Spotify embeds with the following two **artist embeds**.

#### The Jay

```html
<iframe
  data-testid="embed-iframe"
  style="border-radius:12px"
  src="https://open.spotify.com/embed/artist/1IwLCTxeQ2AAlT0Uu3l3SK?utm_source=generator&theme=0&si=ebf30ef4ec15466b"
  width="100%"
  height="352"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```

#### Asibásně

```html
<iframe
  data-testid="embed-iframe"
  style="border-radius:12px"
  src="https://open.spotify.com/embed/artist/0kw8rWYvTsKrtCRF0vYlMx?utm_source=generator&theme=0&si=21dc2c58cb9a40e9"
  width="100%"
  height="352"
  frameBorder="0"
  allowfullscreen=""
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy">
</iframe>
```

Keep the current Music page layout and introductory text unchanged apart from replacing these embeds.

---

## 2. Research

### RESEARCH-FINAL-01 — Explicit card order

Override the previous year-based sorting rule.

Display the Research project cards in this exact left-to-right order:

1. `Bivariate Joy Plots`
2. `Prague Squared`
3. `Beyond the Horizon`
4. `The Second Life of the Chain Bridge`
5. `Tracing the Lost Railway`

This is now the canonical Research ordering.

Do not auto-sort these cards by year.

---

## 3. Joy Plots

### JOYPLOTS-FINAL-01 — Keep `joy.png` as the hero image

Keep:

`portfolio/joyplot/joy.png`

as the main / hero image for the Joy Plots project detail page.

Do not include `joy.png` inside the supporting-image gallery.

### JOYPLOTS-FINAL-02 — Use the shared single-window presentation viewer

Replace the current supporting-image presentation with the same reusable single-window gallery / presentation component already used for:

- Prague Squared;
- Beyond the Horizon / Grand Tours.

The Joy Plots gallery must therefore:
- show one image at a time;
- provide Previous / Next navigation;
- include a restrained position indicator;
- support keyboard navigation;
- remain responsive on mobile;
- preserve image proportions;
- avoid autoplay;
- avoid a long vertical image stack.

Use the following files in this exact order:

1. `portfolio/joyplot/JoyDominica.png`
2. `portfolio/joyplot/JoyGrenada.png`
3. `portfolio/joyplot/JoyGuadeloupe.png`
4. `portfolio/joyplot/JoyMartinique.png`
5. `portfolio/joyplot/JoyStLucia.png`
6. `portfolio/joyplot/JoyStVincent.png`

Retain suitable alt text for every image.

Do not duplicate the hero image inside the gallery.

---

## Final implementation constraints

- Apply only the changes above.
- Preserve all earlier approved redesign decisions unless explicitly overridden here.
- Reuse the existing shared presentation-gallery component rather than creating another independent carousel implementation.
- Do not replace or crop unrelated project imagery.
- Preserve existing responsive and accessibility behaviour.
- Run the existing production build and QA checks after implementation.
- Keep `gh-pages` unchanged.

## Acceptance checklist

- Music shows the two new Spotify **artist** embeds.
- Research cards appear in the exact explicit order defined above.
- Joy Plots keeps `joy.png` as hero.
- Joy Plots supporting visuals appear in the shared single-window viewer in the exact specified order.
- No regression to Prague Squared or Beyond the Horizon gallery behaviour.
- Production build passes.
- `gh-pages` remains unchanged.
