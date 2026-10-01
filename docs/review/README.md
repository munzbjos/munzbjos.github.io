# Vizuální review — třetí iterace

**48 full-page screenshotů**: Home, Work, Research, About, Music a všech 11 detailů. **22 samostatných náhledů karet**: všech 11 projektů v desktopové a mobilní variantě. **6 snímků prezentačních galerií** s aktivním druhým snímkem. Celkem **76 PNG**.

Zachyceno z lokálního production buildu po implementaci [Round 3 change requestu](../REDESIGN_CHANGE_REQUEST_ROUND3.md). Veřejný web ani `gh-pages` se nemění. První review je zachováno v historii commitu `07a8e70`.

## Karty pro kurátorské kolo

**[Otevřít porovnání všech project cards →](cards/README.md)**

Náhledy obsahují celý aktuální cover crop, název, category/subtitle i rok. Jde o skutečné karty z Work / Research, nikoli o nově vysázené makety.

## Prezentační galerie

**[Prague Squared a Beyond the Horizon — aktivní druhý snímek →](viewers/README.md)**

Šest doplňkových snímků zachycuje oba viewery na desktopu, tabletu a mobilu po přepnutí na druhou mapu.

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
| [Chinese Pavilion](13-chinese-pavilion-cibulka.md) | [PNG](desktop/13-chinese-pavilion-cibulka.png) | [PNG](tablet/13-chinese-pavilion-cibulka.png) | [PNG](mobile/13-chinese-pavilion-cibulka.png) |
| [Beyond the Horizon](14-beyond-the-horizon.md) | [PNG](desktop/14-beyond-the-horizon.png) | [PNG](tablet/14-beyond-the-horizon.png) | [PNG](mobile/14-beyond-the-horizon.png) |
| [The Second Life of the Chain Bridge](15-chain-bridge.md) | [PNG](desktop/15-chain-bridge.png) | [PNG](tablet/15-chain-bridge.png) | [PNG](mobile/15-chain-bridge.png) |
| [Tracing the Lost Railway](16-lost-railway.md) | [PNG](desktop/16-lost-railway.png) | [PNG](tablet/16-lost-railway.png) | [PNG](mobile/16-lost-railway.png) |

## Co hodnotit

- Research řazený sestupně podle počátečního roku se stabilním pořadím shodných let.
- Zkrácené titulky, viditelná metadata a odstraněné popisky hero obrázků; alt texty zůstávají zachované.
- Prague Squared a Grand Tours ve společném prezentačním vieweru: ovládání, počitadlo, proporce map a druhý aktivní snímek.
- Rozlišení Prague Squared recognition, Bivariate user study a Danteho knižních features od publikací a soutěžních ocenění.
- Jednotné ArcGIS Pro, Beatles jako jeden mapový poster a Elton jako mapová animace s podporou budoucího assetu.
- About bez GitHub odkazu a se slovem GIS; nový stručný úvod Music při zachování Spotify přehrávačů.
- Zachovanou responzivitu, minimální patičku a barvu teček; bez dodatečného redesignu coverů.

## Metoda a původ

- Chromium, device pixel ratio 1. Viewporty 1440 × 1000, 768 × 1024 a 390 × 844; snímek zachycuje celou stránku (u krátké stránky alespoň výšku viewportu).
- Před zachycením jsou načtené lokální fonty a dekódované všechny obrázky. Nemění se jejich styl, crop ani zdrojové soubory.
- Screenshoty Music zachycují **živé Spotify přehrávače**, nikoli placeholder z automatických testů. Přehrávání nebylo aktivováno. Sketchfab zůstává neaktivovaný, stejně jako při běžném prvním načtení.
- Při snímání Music je viewport dočasně zvýšen na výšku stránky při zachování požadované šířky; Chromium tak vykreslí i druhý cross-origin iframe, který jinak může na full-page screenshotu zůstat prázdný. Skutečná capture výška je v manifestu. DOM ani CSS se nemění.
- `manifest.json` obsahuje zdrojový commit, případný příznak změněného pracovního stromu, UTC čas, verzi prohlížeče, rozměry a metadata všech snímků. Pokud je pracovní strom změněný, snímky odpovídají implementaci uložené společně s tímto review, nikoli samotnému výchozímu commitu.
- Jde o responzivní Chromium, ne o test fyzických iOS/Android zařízení. Originály v `portfolio/` jsme při implementaci neupravovali. Aktuální podklady zahrnují upstream dodané či nahrazené soubory; netvrdíme historickou shodu obrazových dat s předchozí iterací.
- Stav implementace a případné otevřené body: [report třetí iterace](../REDESIGN_ROUND3_REPORT.md).

## Opakování

```sh
npm ci
npm run build
npm run preview
# V druhém terminálu:
node scripts/capture-review.mjs
```

Preview je pouze na `127.0.0.1:4321`. Skript aktualizuje screenshoty a manifest; během snímání Music potřebuje přístup ke Spotify. Markdown rozcestníky jsou udržované spolu s tímto review.
