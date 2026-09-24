/**
 * Approved content transcribed from portfolio_catalog.md.
 * Curatorial ordering comes from curatorial_structure_proposal.md.
 * Media is maintained separately; never duplicate Prague Squared by section.
 */
export type ProjectSection = 'Work' | 'Research';
export interface Publication { title: string; citation: string; url: string }
export interface InteractiveOutput { title: string; url: string; kind: 'storymap' | 'sketchfab'; displayLabel?: string }
export interface Project {
  slug: string;
  title: string;
  year: string;
  sections: ProjectSection[];
  displayStatus: 'Featured' | 'Secondary';
  author?: string;
  role?: string;
  type: string;
  cardLabel?: string;
  detailSubtitle?: string;
  location?: string;
  project?: string;
  funding?: string;
  shortDescription: string;
  extendedNote: string[];
  keywords: string[];
  tools: string[];
  publications: Publication[];
  interactiveOutputs: InteractiveOutput[];
  projectWebsites: string[];
  awards: string[];
  dataCredits: string[];
  teachingContext?: { course: string; practical: string; url: string };
  /** Internal unresolved content, not invented public copy. */
  tbd: string[];
}
export const projects: Project[] = [
  {
    "slug": "prague-squared",
    "title": "Prague Squared",
    "year": "2025",
    "sections": [
      "Work",
      "Research"
    ],
    "displayStatus": "Featured",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / data visualization",
    "location": "Prague, Czechia",
    "shortDescription": "An experimental thematic mapping project that transforms Prague’s irregular municipal districts into contiguous squares, creating a consistent visual framework for communicating urban statistical data.",
    "extendedNote": [
      "Prague Squared explores an alternative approach to urban data visualization by combining thematic cartography, visual perception and information graphics. Municipal districts are represented as equally shaped square units while their spatial relationships are preserved, reducing visual conflicts caused by irregular administrative geometries and enabling different types of statistical information to be compared within a consistent layout."
    ],
    "keywords": [
      "thematic cartography",
      "data visualization",
      "cartogram",
      "urban data",
      "Prague",
      "information graphics"
    ],
    "tools": [
      "ArcGIS Pro 3.3"
    ],
    "publications": [
      {
        "title": "Prague Squared",
        "citation": "Münzberger, J. (2025). Prague Squared. Journal of Maps, 21(1).",
        "url": "https://doi.org/10.1080/17445647.2025.2473593"
      }
    ],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "joyplot",
    "title": "Joy Plots",
    "year": "2022–present",
    "sections": [
      "Work"
    ],
    "displayStatus": "Featured",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / spatial data visualization / cartographic experimentation",
    "shortDescription": "A series of cartographic experiments adapting joy plots (ridgeline plots) to the visualization of continuous spatial data.",
    "extendedNote": [
      "Joy Plots explores the use of overlapping ridge profiles as a distinctive thematic mapping technique. Continuous spatial data are sampled along parallel transects and transformed into profiles whose height represents the intensity of a mapped phenomenon.",
      "The project is presented in Work primarily through its visual outputs and cartographic design, showing how a statistical graphic can be reinterpreted as an expressive spatial visualization method."
    ],
    "keywords": [
      "thematic cartography",
      "joy plots",
      "ridgeline plots",
      "spatial data visualization",
      "continuous spatial data",
      "cartographic design"
    ],
    "tools": [
      "ArcGIS Pro",
      "R / ggplot2",
      "Adobe Illustrator"
    ],
    "publications": [],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "bivariate-joyplot",
    "title": "Bivariate Joy Plots",
    "year": "2022–present",
    "sections": [
      "Research"
    ],
    "displayStatus": "Featured",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / spatial data visualization / research method",
    "shortDescription": "A research project developing a bivariate extension of joy plots for the simultaneous visualization of two continuous spatial variables.",
    "extendedNote": [
      "The research extends the cartographic joy-plot method into a bivariate visualization in which two spatial variables are represented by separate overlapping ridge profiles. Their distributions, spatial relationships and areas of concurrence or divergence can therefore be examined within a single visualization.",
      "The project combines methodological development, cartographic design and empirical evaluation, and forms the research-oriented counterpart to the visually focused Joy Plots work entry."
    ],
    "keywords": [
      "thematic cartography",
      "bivariate joy plots",
      "ridgeline plots",
      "spatial data visualization",
      "bivariate visualization",
      "raster data",
      "visual analytics"
    ],
    "tools": [
      "ArcGIS Pro",
      "R / ggplot2",
      "Adobe Illustrator"
    ],
    "publications": [
      {
        "title": "Integrating Joy Plots into Thematic Cartography: Methodology and Applications for Bivariate Spatial Data Visualisation",
        "citation": "Münzberger, J. (2026, in press). Integrating Joy Plots into Thematic Cartography: Methodology and Applications for Bivariate Spatial Data Visualisation. The Cartographic Journal.",
        "url": "https://doi.org/10.1080/00087041.2026.2715285"
      }
    ],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "beyond-the-horizon",
    "cardLabel": "Travel networks",
    "title": "Beyond the Horizon",
    "year": "2024–2026",
    "sections": [
      "Research"
    ],
    "displayStatus": "Featured",
    "role": "Cartography / GIS / spatial data management / digital storytelling",
    "type": "Historical cartography / digital humanities / HGIS / spatial data visualization",
    "project": "Beyond the Horizon: Visualization and Interpretation of Networks in Early Modern Europe",
    "funding": "Czech Science Foundation, project 24-13165S",
    "shortDescription": "An interdisciplinary research project exploring mobility, travel networks and knowledge transfer in early modern Europe through historical GIS, spatial data analysis and cartographic visualization.",
    "extendedNote": [
      "Beyond the Horizon investigates early modern European travel with a particular focus on educational journeys, long-distance routes and the spatial networks used by individual travellers. The project combines historical sources such as travel and postal manuals with ego-documents and transforms them into structured, geocoded spatial data.",
      "My role focuses on the cartographic and geospatial dimension of the project, including spatial data management, historical GIS, mapping, visualization and digital storytelling. The resulting outputs range from research datasets and thematic maps to interactive web-based narratives."
    ],
    "keywords": [
      "historical cartography",
      "historical GIS",
      "digital humanities",
      "Grand Tour",
      "early modern mobility",
      "travel networks",
      "spatial data visualization",
      "digital storytelling"
    ],
    "tools": [
      "ArcGIS Pro",
      "ArcGIS Online",
      "ArcGIS StoryMaps",
      "spatial databases / GIS workflows"
    ],
    "publications": [
      {
        "title": "Heading to Italy in the Early Modern Period. Francesco Scoto’s Early Modern Italian Travel Manuals Geodataset (1650–1700).",
        "citation": "Chodějovská, E., & Münzberger, J. (2026). Heading to Italy in the Early Modern Period. Francesco Scoto’s Early Modern Italian Travel Manuals Geodataset (1650–1700). Journal of Open Humanities Data, 12(1), 107.",
        "url": "https://doi.org/10.5334/johd.594"
      }
    ],
    "interactiveOutputs": [
      {
        "title": "Reconstructing a Grand Tour: The Eggenberg Brothers’ Journey",
        "url": "https://storymaps.arcgis.com/stories/3b792adbf0324bfeafc4f1149313bde1",
        "kind": "storymap"
      }
    ],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": [
      "Forthcoming Journal of Maps article: publication status and bibliographic details"
    ]
  },
  {
    "slug": "dantes-inferno",
    "cardLabel": "Storymapping & Digital Humanities",
    "detailSubtitle": "Storymapping / Digital Humanities",
    "title": "Dante’s Inferno",
    "year": "2021–2022",
    "sections": [
      "Work"
    ],
    "displayStatus": "Featured",
    "author": "Josef Münzberger",
    "type": "Interactive cartography / digital storytelling / literary cartography",
    "shortDescription": "An interactive cartographic reconstruction of the location and structure of Dante’s Inferno, combining literary interpretation, historical models and spatial visualization in an ArcGIS StoryMap.",
    "extendedNote": [
      "Dante’s Inferno explores the spatial structure of the underworld described in Dante Alighieri’s Divine Comedy. The project reconstructs its location, geometry and internal organization using Dante’s text together with the historical model proposed by Antonio Manetti and later defended by Galileo Galilei.",
      "The StoryMap combines interactive maps, diagrams, a 3D reconstruction, narrative text and an original soundtrack to transform an imaginary literary space into an explorable cartographic environment."
    ],
    "keywords": [
      "interactive cartography",
      "ArcGIS StoryMaps",
      "digital storytelling",
      "literary cartography",
      "Dante Alighieri",
      "historical visualization",
      "3D visualization",
      "digital humanities"
    ],
    "tools": [
      "ArcGIS StoryMaps",
      "ArcGIS Pro",
      "SketchUp"
    ],
    "publications": [],
    "interactiveOutputs": [
      {
        "title": "Dante’s Inferno",
        "displayLabel": "Dante’s Inferno StoryMap",
        "url": "https://storymaps.arcgis.com/stories/ad2a09720b75435b922396307e2d6004",
        "kind": "storymap"
      }
    ],
    "projectWebsites": [],
    "awards": [
      "Winner — Digital Humanities and Popular Culture category, 2022 ArcGIS StoryMaps Competition",
      "Winner of Popular Vote; 2nd place in Jury Vote — StoryMap category, International Cartographic Exhibition 2023, ICC Cape Town",
      "Winner — Digital Cartographic Products and Applications on the Internet category, Mapa roku 2021"
    ],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "vltava-ii",
    "title": "The Second Life of the Chain Bridge",
    "cardLabel": "Storymapping",
    "year": "2023–2027",
    "sections": [
      "Research"
    ],
    "displayStatus": "Featured",
    "role": "StoryMap design",
    "type": "Historical cartography / digital storytelling / cultural heritage / historical GIS",
    "project": "Vltava II – proměny historické krajiny, řeka jako spojnice i bariéra",
    "funding": "Ministry of Culture of the Czech Republic, NAKI III, project DH23P03OVV055",
    "shortDescription": "An interactive StoryMap tracing the relocation of the historic chain bridge from Podolsko to Stádlec through archival imagery, maps and narrative cartography.",
    "extendedNote": [
      "The StoryMap follows the remarkable second life of the historic chain bridge originally built across the Vltava at Podolsko. It reconstructs the bridge’s dismantling and relocation to Stádlec, where it was reassembled across the Lužnice, combining archival maps, photographs and other historical material in a spatial narrative.",
      "Created within the Vltava II research project, the portfolio entry focuses specifically on Josef Münzberger’s contribution: the design of the StoryMap and its cartographic presentation."
    ],
    "keywords": [
      "historical cartography",
      "historical GIS",
      "cultural landscape",
      "cultural heritage",
      "Vltava",
      "digital storytelling",
      "ArcGIS StoryMaps",
      "transport history"
    ],
    "tools": [
      "ArcGIS StoryMaps"
    ],
    "publications": [],
    "interactiveOutputs": [
      {
        "title": "Druhý život řetězového mostu: Příběh přesunu řetězového mostu z Podolska do Stádlce",
        "url": "https://storymaps.arcgis.com/stories/945c245fcae24ee796371173e3ece15b",
        "kind": "storymap"
      }
    ],
    "projectWebsites": [
      "https://vltava.fsv.cvut.cz/vltava2/index.html"
    ],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "two-centuries-of-railways",
    "title": "Tracing the Lost Railway",
    "cardLabel": "Storymapping",
    "year": "2023–2027",
    "sections": [
      "Research"
    ],
    "displayStatus": "Featured",
    "role": "StoryMap design / cartography",
    "type": "Historical cartography / digital storytelling / railway heritage / historical GIS",
    "project": "Dvě století železnice v českých zemích. Kulturní, socioekonomické a dopravně technické aspekty vývoje českých (československých) železnic",
    "funding": "Ministry of Culture of the Czech Republic, NAKI III, project DH23P03OVV034",
    "shortDescription": "An interactive StoryMap tracing the vanished railway between Trhový Štěpánov and Dolní Kralovice through historical maps, aerial imagery, photographs and spatial reconstruction.",
    "extendedNote": [
      "The StoryMap follows the former railway line from Trhový Štěpánov towards Dolní Kralovice, documenting stations, surviving traces and locations transformed or lost after the construction of the Švihov Reservoir. Historical aerial imagery, photographs and cartographic sources are combined to reconnect the present-day landscape with the vanished railway.",
      "Created within the Two Centuries of Railways in the Czech Lands research project, the portfolio entry focuses specifically on Josef Münzberger’s contribution to the StoryMap design and cartographic presentation."
    ],
    "keywords": [
      "historical cartography",
      "historical GIS",
      "railway history",
      "cultural heritage",
      "abandoned railways",
      "digital storytelling",
      "ArcGIS StoryMaps",
      "3D reconstruction"
    ],
    "tools": [
      "ArcGIS StoryMaps"
    ],
    "publications": [],
    "interactiveOutputs": [
      {
        "title": "Po stopách zaniklé železnice Vlašim–Trhový Štěpánov–Dolní Kralovice",
        "url": "https://storymaps.arcgis.com/stories/8b9818a23a184da3bf3938391581a0f2",
        "kind": "storymap"
      }
    ],
    "projectWebsites": [
      "https://zeleznice.namapach.cz/",
      "https://railways.onmaps.cz/"
    ],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "the-beatles-map",
    "title": "The Beatles Map",
    "year": "2022",
    "sections": [
      "Work"
    ],
    "displayStatus": "Secondary",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / music mapping / cartographic design",
    "shortDescription": "A cartographic series mapping the cities around the world where The Beatles performed, combining music history with a distinctive watercolor-inspired visual style.",
    "extendedNote": [
      "The Beatles Map explores the geographical footprint of the band’s live performances through a series of thematic maps. Cities associated with Beatles concerts are mapped at different geographic scales, turning a dataset of musical performances into a visually expressive cartographic narrative.",
      "The project was originally created for the music theme of the 2022 #30DayMapChallenge and uses the Stamen Watercolor basemap as a deliberately illustrative background."
    ],
    "keywords": [
      "thematic cartography",
      "music mapping",
      "The Beatles",
      "cultural geography",
      "cartographic design",
      "data visualization"
    ],
    "tools": [
      "ArcGIS Pro"
    ],
    "publications": [],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "chinese-pavilion-cibulka",
    "title": "Chinese Pavilion at Cibulka",
    "year": "2020",
    "sections": [
      "Work"
    ],
    "displayStatus": "Secondary",
    "author": "Josef Münzberger",
    "type": "3D modelling / architectural visualization / cultural heritage",
    "shortDescription": "A 3D reconstruction of the historic Chinese Pavilion in the Cibulka landscape park in Prague, created as a student project in SketchUp.",
    "extendedNote": [
      "The model reconstructs the historic Chinese Pavilion located in the Cibulka landscape park in Prague’s Košíře district. The octagonal garden pavilion forms part of the romantic landscape composition of the Cibulka estate.",
      "The project is retained in the portfolio as an early example of architectural 3D modelling and as a demonstration of SketchUp-based visualization skills."
    ],
    "keywords": [
      "3D modelling",
      "architectural visualization",
      "cultural heritage",
      "SketchUp",
      "Cibulka",
      "Prague"
    ],
    "tools": [
      "SketchUp"
    ],
    "publications": [],
    "interactiveOutputs": [
      {
        "title": "Sketchfab model",
        "url": "https://skfb.ly/pNUVq",
        "kind": "sketchfab"
      }
    ],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "tbd": []
  },
  {
    "slug": "tropical-nights",
    "title": "Tropical Nights",
    "year": "2026",
    "sections": [
      "Work"
    ],
    "displayStatus": "Secondary",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / climate data visualization / data-driven cartography",
    "shortDescription": "A small data-driven mapping project comparing the average annual number of tropical nights across selected European capitals.",
    "extendedNote": [
      "Tropical Nights originated as a spontaneous cartographic response to an unusual sequence of hot summer nights in Prague. Using the Meteostat Python library, weather observations from the nearest stations to selected European capitals were processed to calculate the average annual number of tropical nights between 2010 and 2025.",
      "The visualization highlights striking differences between geographically close cities — most notably Prague and Vienna — and turns a simple climatic indicator into an accessible comparative map designed for social-media communication."
    ],
    "keywords": [
      "thematic cartography",
      "climate visualization",
      "data visualization",
      "tropical nights",
      "urban climate",
      "Python",
      "Meteostat",
      "social media cartography"
    ],
    "tools": [
      "Python",
      "Meteostat",
      "ArcGIS Pro"
    ],
    "publications": [],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [
      "Meteostat and contributing data providers, CC BY 4.0"
    ],
    "tbd": [
      "Original LinkedIn post URL"
    ]
  },
  {
    "slug": "elton-john-tour",
    "title": "Elton John – Farewell Yellow Brick Road Tour",
    "year": "2024",
    "sections": [
      "Work"
    ],
    "displayStatus": "Secondary",
    "author": "Josef Münzberger",
    "type": "Thematic cartography / music mapping / educational cartography",
    "shortDescription": "A thematic map of part of Elton John’s Farewell Yellow Brick Road tour, created as a teaching example for a university cartography exercise focused on geocoding and thematic mapping.",
    "extendedNote": [
      "The map was developed while preparing a university cartography practical on geocoding. It uses concert locations from Elton John’s Farewell Yellow Brick Road tour as an accessible real-world dataset for demonstrating the workflow from tabular data processing and geocoding to thematic cartographic visualization.",
      "The teaching exercise asks students to map the locations visited by an artist during a selected part of a tour and visualize the total concert revenue for each location. The Elton John map served as a visual example of the expected output and of how a relatively simple dataset can be turned into a polished thematic map."
    ],
    "keywords": [
      "thematic cartography",
      "music mapping",
      "geocoding",
      "cartographic education",
      "Elton John",
      "concert tour",
      "data visualization"
    ],
    "tools": [
      "ArcGIS Pro"
    ],
    "publications": [],
    "interactiveOutputs": [],
    "projectWebsites": [],
    "awards": [],
    "dataCredits": [],
    "teachingContext": {
      "course": "Cartography (155CART), CTU Prague",
      "practical": "Practical: Spatial data and geocoding",
      "url": "https://k155cvut.github.io/cart/practicals/Geocoding/"
    },
    "tbd": []
  }
];
export const workOrder = ['prague-squared', 'joyplot', 'dantes-inferno', 'tropical-nights', 'the-beatles-map', 'elton-john-tour', 'chinese-pavilion-cibulka'];
export const researchOrder = ['bivariate-joyplot', 'prague-squared', 'beyond-the-horizon', 'vltava-ii', 'two-centuries-of-railways'];
export const homeWork = ['prague-squared', 'joyplot', 'dantes-inferno'];
export const homeResearch = ['bivariate-joyplot', 'beyond-the-horizon', 'vltava-ii'];
export function getProject(slug: string): Project {
  const project = projects.find(project => project.slug === slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}
