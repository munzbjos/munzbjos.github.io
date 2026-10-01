# Supplemental project media — first-build provenance

Retrieved and visually reviewed 2026-09-21. These are genuine images from the approved project outputs, not stock images, synthetic covers, or screenshots of unrelated work. No original `portfolio/` files were altered. Local originals below should be passed through the site's responsive image optimization rather than served at full size.

## Why supplemental files were needed

Beyond the Horizon, Vltava II and Two Centuries of Railways have no corresponding raster-image folders in the supplied portfolio. Chinese Pavilion has model files but no static render. The first build uses the existing imagery in the approved public StoryMaps and the approved Sketchfab model as temporary covers. These are still subject to final cover and rights review; public availability is not by itself a redistribution licence.

## Corrected content discrepancy

Josef confirmed the assignments below on 2026-09-22. Both `portfolio_catalog.md` and the structured project data have been corrected; the detail-page links are enabled.

The two StoryMap URLs in `portfolio_catalog.md` appear to be exchanged:

- `8b9818a23a184da3bf3938391581a0f2`, listed under Vltava II, actually contains **Po stopách zaniklé železnice — Vlašim–Trhový Štěpánov–Dolní Kralovice**.
- `945c245fcae24ee796371173e3ece15b`, listed under Railways, actually contains **Druhý život řetězového mostu — Příběh přesunu řetězového mostu z Podolska do Stádlce**.

Verified from the public ArcGIS item data (`https://www.arcgis.com/sharing/rest/content/items/ITEM_ID/data?f=json`) and the actual cover resources. Supplemental filenames follow the verified subject. The original acquisition did not change catalog links; the subsequent owner-approved correction did.

## Asset inventory

### Beyond the Horizon

- Local file: `src/assets/supplemental/beyond-horizon-storymap.jpg`
- Original: 2379 × 1828 pixels; 2,414,196 bytes.
- [Approved StoryMap](https://storymaps.arcgis.com/stories/3b792adbf0324bfeafc4f1149313bde1).
- [Direct resource](https://www.arcgis.com/sharing/rest/content/items/3b792adbf0324bfeafc4f1149313bde1/resources/Ax-EkCmGR8yYh_T4gMUvd.jpg).
- Actual cover resource: `r-UNhIX5`; historical map of Europe with city views. This is historical source material used in the StoryMap, not an original modern map authored by Josef.
- StoryMap byline: Josef Münzberger, Eva Chodějovská. General source credits: State Regional Archives Třeboň, Dept. Český Krumlov; National Heritage Institute České Budějovice, Český Krumlov Castle (Eggenberg/Schwarzenberg Family Library); Moravian Library in Brno. Map-content credits elsewhere in the story: Josef Münzberger, Marek Hoffmann. These general credits do not establish a specific reproduction licence for this scan.
- TBD: exact scan repository/credit and redistribution permission. Prefer a project-specific itinerary/map output in a future curatorial pass if supplied.

### Vltava II

- Local file: `src/assets/supplemental/vltava-chain-bridge-storymap.jpg`
- Original: 3274 × 2209 pixels; 3,073,628 bytes.
- [Verified chain-bridge StoryMap](https://storymaps.arcgis.com/stories/945c245fcae24ee796371173e3ece15b).
- [Direct resource](https://www.arcgis.com/sharing/rest/content/items/945c245fcae24ee796371173e3ece15b/resources/5PmzsQ7R3DHXsD6kH9Zdj.jpg).
- Actual cover resource: `r-2Q9q8E`; archival postcard showing the chain bridge at Podolsko.
- StoryMap archival-photo credits: Archiv Vojtěcha Pavelčíka, Městské muzeum Týn nad Vltavou, SOkA Písek. The specific holder/photographer of this cover was not individually identified in the cover node.
- TBD: confirm specific archival credit and reuse permission.

### Two Centuries of Railways

- Local file: `src/assets/supplemental/railways-storymap.png`
- Original: 1917 × 657 pixels; 3,111,306 bytes.
- [Verified railway StoryMap](https://storymaps.arcgis.com/stories/8b9818a23a184da3bf3938391581a0f2).
- [Direct resource](https://www.arcgis.com/sharing/rest/content/items/8b9818a23a184da3bf3938391581a0f2/resources/57FdjIZS7kRCae-miat0L.png).
- Actual cover resource: `r-TOSdHh`; historical map with railway alignment between Štěpánov and Kralovice. Wide 2.92:1 native aspect ratio; prefer a wide cover or contain mode to retain the route, not destructive cropping.
- StoryMap references railway alignment on Third Military Survey mapping. Its general credits include archival photographs (SOkA Benešov, SOA Praha, NTM), orthophotography (ČÚZK), and contemporary photographs (V. Pavelčík); those credits do not unambiguously identify this map resource.
- TBD: specific map reproduction credit and reuse permission.

### Chinese Pavilion at Cibulka

- Local file: `src/assets/supplemental/cibulka-pavilion-sketchfab.jpg`
- Original: 1920 × 1080 pixels; 66,890 bytes.
- Approved short link: https://skfb.ly/pNUVq
- [Resolved model](https://sketchfab.com/3d-models/cinsky-pavilon-191490ecadc94a66aa4afa840d8d96b0).
- [Public model metadata](https://api.sketchfab.com/v3/models/191490ecadc94a66aa4afa840d8d96b0).
- [Direct thumbnail](https://media.sketchfab.com/models/191490ecadc94a66aa4afa840d8d96b0/thumbnails/6057379e55f44698bc0c79dccfccb859/fc590ef366594c86a63e7eff70ed1504.jpeg).
- Detail-page embed only: `https://sketchfab.com/models/191490ecadc94a66aa4afa840d8d96b0/embed`.
- Model title: Čínský pavilon; creator: `munzbjos` (https://sketchfab.com/munzbjos). API lists [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Credit the creator and link the model/licence; any web resizing should be identified as such. Thumbnail is a render of the actual approved model, not a generated illustration.
- Suggested visible credit: “Čínský pavilon — munzbjos / Sketchfab, CC BY 4.0.”
- TBD: final composition/lighting can be reviewed later; current thumbnail is adequate for the first build.

## Handling notes

- Static files only in grids. Do not hotlink third-party images in the rendered build.
- Third-party viewer should be detail-only and user-activated; no autoplay.
- No synthetic cover art, permanent crop, source replacement, or production publishing was performed.
- Before a future public launch, resolve image-specific archival reproduction rights. Internal first-build use does not remove that requirement. The StoryMap URL mismatch is resolved.
