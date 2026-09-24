import type { ImageMetadata } from 'astro';
import prague from '../../portfolio/praguesquared/PragueSquared.png';
import ps2 from '../../portfolio/praguesquared/ps2.png';
import ps3 from '../../portfolio/praguesquared/ps3.png';
import ps5 from '../../portfolio/praguesquared/ps5.png';
import joy from '../../portfolio/joyplot/JoyMartinique.png';
import joyCzech from '../../portfolio/joyplot/joy.png';
import joyDominica from '../../portfolio/joyplot/JoyDominica.png';
import joyGrenada from '../../portfolio/joyplot/JoyGrenada.png';
import bivariate from '../../portfolio/bivariate-joyplot/nature-vs-people.png';
import dante from '../../portfolio/dante/Dante.png';
import tropical from '../../portfolio/tropical-nights/did-U-sleep-well.png';
import beatles from '../../portfolio/beatles/Beatles.png';
import elton from '../../portfolio/elton/Elton.png';
import horizon from '../assets/supplemental/beyond-horizon-storymap.jpg';
import vltava from '../assets/supplemental/vltava-chain-bridge-storymap.jpg';
import railways from '../assets/supplemental/railways-storymap.png';
import pavilion from '../assets/supplemental/cibulka-pavilion-sketchfab.jpg';

export interface Visual { image: ImageMetadata; alt: string; caption: string }
export interface ProjectMedia { cover: Visual; gallery: Visual[]; fit?: 'contain'; credit?: string }
const visual = (image: ImageMetadata, alt: string, caption: string): Visual => ({ image, alt, caption });
export const media: Record<string, ProjectMedia> = {
  'prague-squared': { cover: visual(prague, 'Four square-cartogram maps comparing Prague’s population, housing and built-up area.', 'Prague Squared — four perspectives on the city.'), fit: 'contain', gallery: [visual(ps2, 'Mint and purple square districts map the age composition of Prague.', 'Age composition'), visual(ps3, 'Pink and turquoise square districts compare occupied and empty housing.', 'Housing'), visual(ps5, 'Yellow and orange square districts show Prague’s built-up area.', 'Built-up area')] },
  joyplot: { cover: visual(joyCzech, 'Overlapping ridge profiles map elevation and population across Czechia.', 'Elevation / Population in Czechia'), fit: 'contain', gallery: [visual(joy, 'White elevation ridgelines trace Martinique on a lavender background.', 'Martinique'), visual(joyDominica, 'Ridgeline map of the island of Dominica.', 'Dominica'), visual(joyGrenada, 'Ridgeline map of the island of Grenada.', 'Grenada')] },
  'bivariate-joyplot': { cover: visual(bivariate, 'Green and blue ridgelines compare two spatial variables across France, with a legend below.', 'Nature vs. People — bivariate joy plot.'), fit: 'contain', gallery: [] },
  'dantes-inferno': { cover: visual(dante, 'Antique-style map of Europe with concentric circles centred on Jerusalem.', 'Dante’s Inferno — a cartographic interpretation.'), gallery: [] },
  'tropical-nights': { cover: visual(tropical, 'Thematic map titled Did U Sleep Well? showing tropical nights.', 'Did U Sleep Well?'), fit: 'contain', gallery: [] },
  'the-beatles-map': { cover: visual(beatles, 'The Beatles Map, a thematic music map with illustrated annotations.', 'The Beatles Map'), fit: 'contain', gallery: [] },
  'elton-john-tour': { cover: visual(elton, 'Map of concert locations on Elton John’s Farewell Yellow Brick Road tour.', 'Farewell Yellow Brick Road Tour'), fit: 'contain', gallery: [] },
  'beyond-the-horizon': { cover: visual(horizon, 'Historical map of Europe surrounded by city views, reproduced in the project StoryMap.', 'Historical source material from Beyond the Horizon.'), gallery: [], credit: 'Historical source image from the project StoryMap. Image-specific archival credit and reproduction permission are under review.' },
  'vltava-ii': { cover: visual(vltava, 'Archival postcard of the chain bridge at Podolsko over the Vltava.', 'The chain bridge at Podolsko — archival postcard.'), gallery: [], credit: 'Archival image from the project StoryMap. Image-specific archival credit and reproduction permission are under review.' },
  'two-centuries-of-railways': { cover: visual(railways, 'Historical railway alignment between Štěpánov and Kralovice on a topographic map.', 'Historical railway alignment — StoryMap source material.'), fit: 'contain', gallery: [], credit: 'Historical map from the project StoryMap. Image-specific archival credit and reproduction permission are under review.' },
  'chinese-pavilion-cibulka': { cover: visual(pavilion, 'Three-dimensional model of the Chinese Pavilion at Cibulka.', 'Čínský pavilon — munzbjos / Sketchfab, CC BY 4.0. Web image resized.'), gallery: [] },
};
