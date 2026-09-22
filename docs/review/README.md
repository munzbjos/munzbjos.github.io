# Vizuální review — první build

27 full-page screenshotů devíti stránek. Zachyceno z lokálního **production buildu** commitu `4230a85b34f5225205655200b092f257e9185c54`, nikoli z veřejného webu nebo vývojového serveru. Covery, layout ani obsah se v tomto balíčku nemění.

## Procházení

Kliknutím na název stránky otevřeš všechny tři velikosti pod sebou. Odkazy ve sloupcích vedou přímo na PNG; pro čtení detailů map lze na GitHubu otevřít obrázek přes **Raw** nebo stáhnout originál.

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

## Co hodnotit

- Hierarchii Home → Work / Research → projektové detaily.
- Velikosti featured a secondary dlaždic a jejich vzájemné proporce.
- Spacing, typografii, zalamování nadpisů a čitelnost metadat.
- Vhodnost současných reálných placeholderových vizuálů a jejich rámování.
- Rozdíly mezi desktopem, tabletem a mobilem.

Doporučení v `../COVER_REVIEW.md` zatím **nebyla aplikována**. Screenshoty jsou podkladem pro rozhodnutí, nikoli návrhem nových coverů.

## Metoda

- Chromium, device pixel ratio 1: šířka PNG přesně odpovídá CSS viewportu.
- Viewporty 1440 × 1000, 768 × 1024 a 390 × 844; PNG vždy zachycuje **celou výšku stránky**, nikoli jen viewport.
- Před zachycením se načtou lokální fonty a dekódují všechny obrázky včetně původně lazy-loaded galerií. Styling, obsah a rozměry elementů se nemění.
- Ukazatel myši je mimo obsah; neprobíhá hover ani aktivace externích embedů.
- Jde o responzivní layout v Chromium, nikoli o emulaci mobilního Safari nebo fotografii fyzického zařízení.
- `manifest.json` eviduje čas zachycení (UTC), verzi prohlížeče, zdrojový commit a ověřené rozměry každého PNG.

## Opakování

Z kořene repozitáře:

```sh
npm ci
npm run build
npm run preview
# V druhém terminálu:
node scripts/capture-review.mjs
```

Preview zůstává pouze na `127.0.0.1:4321`. Skript přegeneruje pouze screenshoty a manifest v této složce. Veřejný deployment ani `gh-pages` se nemění.
