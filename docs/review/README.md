# Vizuální review — druhá iterace

**48 full-page screenshotů**: Home, Work, Research, About, Music a všech 11 detailů. **22 samostatných náhledů karet**: všech 11 projektů v desktopové a mobilní variantě.

Zachyceno z lokálního production buildu po implementaci `docs/REDESIGN_CHANGE_REQUEST.md`. Veřejný web ani `gh-pages` se nemění. První review je zachováno v historii commitu `07a8e70`.

## Karty pro kurátorské kolo

**[Otevřít porovnání všech project cards →](cards/README.md)**

Náhledy obsahují celý aktuální cover crop, název, category/subtitle i rok. Jde o skutečné karty z Work / Research, nikoli o nově vysázené makety.

## Celé stránky

Kliknutím na název otevřeš všechny tři velikosti pod sebou. PNG lze na GitHubu otevřít přes **Raw** nebo stáhnout pro zobrazení v nativním rozlišení.

| Stránka | Desktop · 1440 px | Tablet · 768 px | Mobile · 390 px |
|---|---|---|---|
| [Home](01-home.md) | [PNG](desktop/01-home.png) | [PNG](tablet/01-home.png) | [PNG](mobile/01-home.png) |
| [Work](02-work.md) | [PNG](desktop/02-work.png) | [PNG](tablet/02-work.png) | [PNG](mobile/02-work.png) |
| [Research](03-research.md) | [PNG](desktop/03-research.png) | [PNG](tablet/03-research.png) | [PNG](mobile/03-research.png) |
| [About](04-about.md) | [PNG](desktop/04-about.png) | [PNG](tablet/04-about.png) | [PNG](mobile/04-about.png) |
| [Music](05-music.md) | [PNG](desktop/05-music.png) | [PNG](tablet/05-music.png) | [PNG](mobile/05-music.png) |
| [Prague Squared](06-prague-squared.md) | [PNG](desktop/06-prague-squared.png) | [PNG](tablet/06-prague-squared.png) | [PNG](mobile/06-prague-squared.png) |
| [Joy Plots](07-joy-plots.md) | [PNG](desktop/07-joy-plots.png) | [PNG](tablet/07-joy-plots.png) | [PNG](mobile/07-joy-plots.png) |
| [Bivariate Joy Plots](08-bivariate-joy-plots.md) | [PNG](desktop/08-bivariate-joy-plots.png) | [PNG](tablet/08-bivariate-joy-plots.png) | [PNG](mobile/08-bivariate-joy-plots.png) |
| [Dante’s Inferno](09-dantes-inferno.md) | [PNG](desktop/09-dantes-inferno.png) | [PNG](tablet/09-dantes-inferno.png) | [PNG](mobile/09-dantes-inferno.png) |
| [Tropical Nights](10-tropical-nights.md) | [PNG](desktop/10-tropical-nights.png) | [PNG](tablet/10-tropical-nights.png) | [PNG](mobile/10-tropical-nights.png) |
| [The Beatles Map](11-the-beatles-map.md) | [PNG](desktop/11-the-beatles-map.png) | [PNG](tablet/11-the-beatles-map.png) | [PNG](mobile/11-the-beatles-map.png) |
| [Elton John – Farewell Yellow Brick Road Tour](12-elton-john-tour.md) | [PNG](desktop/12-elton-john-tour.png) | [PNG](tablet/12-elton-john-tour.png) | [PNG](mobile/12-elton-john-tour.png) |
| [Chinese Pavilion at Cibulka](13-chinese-pavilion-cibulka.md) | [PNG](desktop/13-chinese-pavilion-cibulka.png) | [PNG](tablet/13-chinese-pavilion-cibulka.png) | [PNG](mobile/13-chinese-pavilion-cibulka.png) |
| [Beyond the Horizon](14-beyond-the-horizon.md) | [PNG](desktop/14-beyond-the-horizon.png) | [PNG](tablet/14-beyond-the-horizon.png) | [PNG](mobile/14-beyond-the-horizon.png) |
| [The Second Life of the Chain Bridge](15-chain-bridge.md) | [PNG](desktop/15-chain-bridge.png) | [PNG](tablet/15-chain-bridge.png) | [PNG](mobile/15-chain-bridge.png) |
| [Tracing the Lost Railway](16-lost-railway.md) | [PNG](desktop/16-lost-railway.png) | [PNG](tablet/16-lost-railway.png) | [PNG](mobile/16-lost-railway.png) |

## Co hodnotit

- Zjednodušenou hierarchii Home, Work a Research; jednotnou minimální patičku.
- Dvou sloupcové About na desktopu/tabletu a pořadí obsahu na mobilu.
- Velikosti dlaždic, spacing, typografii a čitelnost popisků.
- Přerámování mostu a železnice na konkrétní StoryMap příspěvky.
- Požadovanou výměnu Czechia / Martinique u Joy Plots a samostatné Danteho popisky.
- Stávající cropy pro další samostatné kurátorské kolo; **žádná další doporučení z COVER_REVIEW nebyla aplikována**.

## Metoda a původ

- Chromium, device pixel ratio 1. Viewporty 1440 × 1000, 768 × 1024 a 390 × 844; snímek zachycuje celou stránku (u krátké stránky alespoň výšku viewportu).
- Před zachycením jsou načtené lokální fonty a dekódované všechny obrázky. Nemění se jejich styl, crop ani zdrojové soubory.
- Screenshoty Music zachycují **živé Spotify přehrávače**, nikoli placeholder z automatických testů. Přehrávání nebylo aktivováno. Sketchfab zůstává neaktivovaný, stejně jako při běžném prvním načtení.
- `manifest.json` obsahuje zdrojový commit, případný příznak změněného pracovního stromu, UTC čas, verzi prohlížeče, rozměry a metadata všech snímků. Pokud je pracovní strom změněný, snímky odpovídají implementaci uložené společně s tímto review, nikoli samotnému výchozímu commitu.
- Jde o responzivní Chromium, ne o test fyzických iOS/Android zařízení. Originály v `portfolio/` i převzaté zdrojové obrázky zůstaly nezměněné.
- Stav implementace a případné otevřené body: [report druhé iterace](../REDESIGN_ITERATION_2_REPORT.md).

## Opakování

```sh
npm ci
npm run build
npm run preview
# V druhém terminálu:
node scripts/capture-review.mjs
```

Preview je pouze na `127.0.0.1:4321`. Skript aktualizuje screenshoty a manifest; během snímání Music potřebuje přístup ke Spotify. Markdown rozcestníky jsou udržované spolu s tímto review.
