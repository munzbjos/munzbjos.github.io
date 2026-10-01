# Round 3 — implementace a QA

Rozsah: `docs/REDESIGN_CHANGE_REQUEST_ROUND3.md` a Josefem potvrzené pořadí galerií. Pouze větev `redesign`, výchozí commit `8faa2d8172ef7ff37e7e72e00a4a8d0d2ec1e824`. Dokončeno 1. října 2026.

## Implementace

- Research: sestupně podle počátečního roku, stabilní pořadí při shodě; odstraněn doplňkový label Further explorations. Výběr projektů na Home zachován.
- About: odstraněn pouze GitHub z Connect; Education používá GIS. Music: přesný schválený úvod, původní Spotify embeds beze změny.
- Schválené titulky, metadata a odstranění sekcí aplikovány; Beatles je jeden poster, Elton má kratší cardTitle a přesný odstavec o animaci. Chinese Pavilion má kratší název a zachovaný interaktivní Sketchfab viewer.
- Prague Squared: propojené ocenění; Bivariate: samostatně označená studie, nikoli publikace; Dante: dvě knihy v tišší samostatné skupině, původní ocenění zachována.
- Normalizováno ArcGIS Pro; odstraněny pouze hero captions, galerijní popisky zachovány. Interní údaje o financování a další skrytá metadata nebyla zahozena.
- Sdílený lehký `PresentationGallery`: jeden obrázek, contain, Previous/Next, počitadlo, šipky/Home/End, konečné hranice, bez autoplay a externí knihovny. Při deaktivaci krajního tlačítka přechází focus na galerii, aby další klávesové ovládání pokračovalo. Bez JavaScriptu je vidět první mapa a odkazy na všechny mapy.

| Galerie | Přesné pořadí |
|---|---|
| Prague Squared | `ps1.png`, `ps2.png`, `ps3.png`, `ps5.png` |
| Beyond the Horizon | `C_overview.png`, `C_detail.png`, `C_detail2.png`, `D_overview.png`, `D_detail.png`, `E_overview.png`, `E_detail.png`, `S_overview.png` |

Elton: `ProjectMedia.animation` přijímá `src` a MIME typ MP4/WebM. Po dodání souboru nahradí hero videem s nativními controls, statickým posterem a bez autoplay; zatím se nadále zobrazuje původní statický hero. Žádná náhradní animace nebyla vytvořena.

## Validace

- `npm run validate`: PASS — Astro check bez chyb, 17/17 obsahových testů, production build 17 stránek, 435 lokálních odkazů/assetů/fontů ověřeno. Dva stávající informační hinty k `frameborder` u výslovně zachovaných Spotify embeds.
- `npm run test:browser`: 33/33 PASS. Axe WCAG 2 A/AA, 2.1 AA a 2.2 AA bez nalezených porušení na všech 17 routes; šířky 320/390/768/1440; keyboard focus, reduced motion, všechny mapy po aktivaci dekódovány, přesné pořadí, no-autoplay, no-JS fallback a odložený Sketchfab.
- [Vizuální review](review/README.md): 48 full-page PNG (16 stránek × 3 šířky), 22 karet, 6 aktivních galerií. Celkem 76 PNG. Manifest obsahuje rozměry a původ; screenshoty Music jsou skutečné živé Spotify embeds, bez spuštění přehrávání.
- `node scripts/check-review.mjs`: kontrola úplnosti PNG, rozměrů, pořadí aktivních map a Markdown cest.
- `git diff --check`: PASS.
- Testy proběhly v Chromium na localhostu, nikoli na veřejném webu; nejde o certifikaci fyzických mobilních zařízení ani přístupnosti cizích embedded aplikací.

## Externí odkazy

Ověřeno read-only GET, včetně Spotify a Sketchfab embed URL: 21 adres, 17 × HTTP 200. Všechny čtyři StoryMaps, obě knihy Esri, Činoherní klub i Bivariate user study vracejí 200. Žádné formuláře ani participant sessions nebyly vytvářeny.

| Výjimka | Výsledek / postup |
|---|---|
| Bivariate DOI `10.1080/00087041.2026.2715285` | 404; ponecháno přesně podle dřívějšího schválení autora, záznam dosud není veřejně dostupný. |
| Prague DOI `10.1080/17445647.2025.2473593` | DOI přesměruje na Taylor & Francis, cílový server vrací automatickému klientovi 403. Obsah není plně ověřen. |
| Best Map Award na Taylor & Francis | 403 automatickému klientovi; schválená URL zachována, obsah není plně ověřen. |
| LinkedIn | 999 automatickému klientovi; původní URL zachována, obsah není plně ověřen. |

## Podklady a zbývající body

- Originály v `portfolio/` ani `src/assets/` nebyly touto implementací upraveny. Nové Grand Tours mapy jsou použity přímo. WebP deriváty generuje build.
- Upstream dodávka již změnila obrazová data na stávajících cestách Prague/Beyond the Horizon/Vltava/Pavilion. Neprováděla se další výměna coverů ani změna cropů. Alt text u dodaných náhrad Beyond the Horizon a Vltava byl přizpůsoben skutečně zobrazenému obsahu.
- Upstream přejmenoval dosavadní železniční cover na `rail_storymap2.png`; import opraven na tento byte-identický soubor. Nový `rail_storymap.png` nebyl svévolně vybrán jako náhradní cover.
- Některé dodané soubory mají příponu odlišnou od skutečného formátu (Prague PNG/JPEG, Horizon JPG/PNG). Build je rozpoznává a zpracovává; originály zůstaly beze změny. Horizon zdroj má přibližně 51 MiB; stránka používá responzivní WebP deriváty.
- Čeká se na skutečnou Elton animaci. Starší obsahová TBD: bibliografie připravovaného článku Beyond the Horizon a původní LinkedIn příspěvek Tropical Nights. Původní interní archivní kredity po upstream výměnách obrázků zůstávají k autorské revizi; nebyly nahrazeny vymyšlenými údaji.
- `gh-pages` zůstává na `2a0790b115941055af7dfa73f77a1e6837ee3ada`. Workflow pro `redesign` pouze validuje a ukládá build artifact; produkční workflow je omezeno na `gh-pages`. Žádný produkční deployment ani veřejná konfigurace se neměnily.
