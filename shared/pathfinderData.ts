export type Body = "Earth" | "Mars" | "Moon";
export type Availability = "analyzed" | "partial" | "unavailable" | "field-validation";
export type MissionId = "rover" | "landing" | "geology" | "thermal" | "subsurface";
export type Axis = "surface" | "topography" | "thermal" | "hydrology" | "operations";

export type Source = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  edition?: string;
  date?: string;
  license?: string;
  resolution?: string;
  description: string;
};

export type FeatureEvidence = {
  axis: Axis;
  label: string;
  value?: string;
  valueAr?: string;
  status: Availability;
  sourceId?: string;
  unit?: string;
  resolution?: string;
  epoch?: string;
  coordinateFrame?: string;
  processing?: string;
  valueKind?: "measured" | "published-metadata" | "qualitative-internal";
  note: string;
  comparable?: boolean;
  scoreHints?: Partial<Record<Body, number>>;
};

export type Site = {
  id: string;
  name: string;
  nameAr: string;
  body: Body;
  country?: string;
  countryAr?: string;
  lat: number;
  lon: number;
  coordinateFrame: string;
  missionTags: MissionId[];
  extent?: string;
  extentAr?: string;
  environment: string;
  environmentAr: string;
  status: Availability;
  statusLabel: string;
  statusLabelAr: string;
  description: string;
  descriptionAr: string;
  useCases: string[];
  useCasesAr: string[];
  limitations: string[];
  limitationsAr: string[];
  evidence: FeatureEvidence[];
  sourceIds: string[];
};

export type MissionProfile = {
  id: MissionId;
  label: string;
  labelAr: string;
  description: string;
  weights: Record<Axis, number>;
};

export const sources: Source[] = [
  {
    id: "nasa-earth-globe",
    title: "Earth image from space",
    publisher: "U.S. Geological Survey",
    url: "https://www.usgs.gov/media/images/earth-image-space",
    edition: "Earth globe visual reference",
    description: "Earth globe image used only as a visual orientation asset in the showcase.",
  },
  {
    id: "nasa-mars-globe",
    title: "Mars",
    publisher: "NASA Science",
    url: "https://science.nasa.gov/mars/",
    edition: "Mars visual reference",
    description: "Mars image used only as a visual orientation asset in the showcase; it is not an analytical map layer.",
  },
  {
    id: "challenge-martian-map",
    title: "Interplanetary Survival Guide: Martian Map",
    publisher: "NASA Space Apps Challenge",
    url: "https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/",
    edition: "2026 challenge statement",
    date: "2026",
    description: "Official challenge context: create a layered, integrated Mars surface view using NASA data and tools for human exploration planning.",
  },
  {
    id: "judging-guide",
    title: "Judging & Awards Guide",
    publisher: "NASA Space Apps Challenge",
    url: "https://www.spaceappschallenge.org/resources/judging-awards-guide/",
    edition: "2026 judging criteria",
    date: "2026",
    description: "Official evaluation criteria covering Impact, Creativity, Validity, Relevance, and Presentation.",
  },
  {
    id: "wadi-geology",
    title: "Geology of Wadi Hauran, the Largest Valley in Iraqi Western Desert",
    publisher: "V. Sissakian et al. / DiVA open copy",
    url: "https://www.diva-portal.org/smash/get/diva2:1075532/FULLTEXT01.pdf",
    edition: "2017",
    date: "2017",
    license: "Publisher-hosted open copy",
    description: "Peer-reviewed geological and geomorphological context for the Iraqi candidate. Used for qualitative site context, not for an invented pixel statistic.",
  },
  {
    id: "wadi-anchor",
    title: "Wadi Hauran geographic reference",
    publisher: "Open geographic reference",
    url: "https://en.wikipedia.org/wiki/Wadi_Hauran",
    edition: "Accessed 2026-11-14",
    date: "2026-11-14",
    license: "CC BY-SA / see source",
    description: "Used only for the approximate map anchor and broad geographic context. The marker is not a surveyed study boundary.",
  },
  {
    id: "srtm",
    title: "Shuttle Radar Topography Mission",
    publisher: "NASA Earthdata",
    url: "https://www.earthdata.nasa.gov/data/instruments/srtm",
    edition: "SRTM C-band near-global DEM",
    date: "2000-02-11 to 2000-02-22",
    resolution: "Product dependent; near-global DEM provenance",
    description: "Earth topography provenance. A clipped Wadi Hauran raster is not bundled in the MVP, so Earth terrain statistics remain pending ingestion.",
  },
  {
    id: "curiosity-map",
    title: "Mars Science Laboratory: Curiosity Rover Location Map",
    publisher: "NASA Science",
    url: "https://science.nasa.gov/mission/msl-curiosity/location-map/",
    edition: "Mission map",
    description: "Mission context for Gale Crater and the Context/HiRISE-derived terrain map used for rover planning.",
  },
  {
    id: "gale-dem",
    title: "Mars MSL Gale Merged DEM 1m",
    publisher: "USGS Astrogeology Science Center",
    url: "https://astrogeology.usgs.gov/search/map/mars_msl_gale_merged_dem_1m",
    edition: "Version 3 / MSL_Gale_DEM_Mosaic_1m",
    date: "2016-10-20",
    resolution: "1 m/pixel",
    license: "Please credit authors; use constraints none",
    description: "Gale DEM built from HRSC, CTX and HiRISE products tied to MOLA. Bounds and product-level elevation range are recorded; no Wadi raster is silently paired with them.",
  },
  {
    id: "mola",
    title: "Mars MGS MOLA DEM 463m",
    publisher: "USGS Astrogeology Science Center / MOLA Team",
    url: "https://astrogeology.usgs.gov/search/map/mars_mgs_mola_dem_463m",
    edition: "2003-03-21",
    date: "1999–2001 measurements; product edition 2003-03-21",
    resolution: "463 m/pixel",
    license: "CC0 public domain",
    description: "Global Mars topography provenance from more than 600 million MOLA measurements. Useful for planetary context and CRS/resolution disclosure.",
  },
  {
    id: "treks",
    title: "NASA Solar System Treks",
    publisher: "NASA / JPL",
    url: "https://trek.nasa.gov/",
    edition: "Online planetary data portals",
    description: "Mission-derived planetary surface visualization and measurement portals.",
  },
  {
    id: "jpl-mars-trek",
    title: "JPL Mars Trek",
    publisher: "NASA / Jet Propulsion Laboratory",
    url: "https://trek.nasa.gov/mars/",
    edition: "Interactive Mars exploration portal",
    description: "NASA web-based portal for exploring Mars datasets collected at landing sites and across the planet.",
  },
  {
    id: "usgs-mars-geologic-maps",
    title: "USGS-NASA Planetary Geologic Mapping Program — Mars interactive maps",
    publisher: "USGS Astrogeology / NASA",
    url: "https://astrogeology-usgs.hub.arcgis.com/pages/interactive-maps-mars",
    edition: "Interactive standardized geologic maps",
    description: "Institutional planetary geologic mapping resource for standardized Mars map context.",
  },
  {
    id: "curiosity-mount-sharp-route",
    title: "Curiosity’s Proposed Path up Mount Sharp",
    publisher: "NASA Science",
    url: "https://science.nasa.gov/resource/curiositys-proposed-path-up-mount-sharp/",
    edition: "Route-map visual and flyover context",
    description: "NASA route-planning visual used to explain how planetary terrain data becomes an exploration story.",
  },
  {
    id: "nasa-worldview",
    title: "NASA Worldview",
    publisher: "NASA Earthdata",
    url: "https://worldview.earthdata.nasa.gov/",
    edition: "Near-real-time and historical Earth observation viewer",
    description: "NASA Earthdata viewer for visually exploring Earth from satellite observations.",
  },
  {
    id: "nasa-gibs",
    title: "NASA Global Imagery Browse Services (GIBS)",
    publisher: "NASA Earthdata",
    url: "https://www.earthdata.nasa.gov/engage/open-data-services-software/earthdata-developer-portal/gibs-api",
    edition: "WMTS / WMS Earth imagery services",
    date: "Accessed 2026-11-14",
    description: "Official NASA tile services used for the Wadi Hauran Earth map overlay; the MVP uses a dated Blue Marble shaded-relief layer for stable visual provenance.",
  },
  {
    id: "mars-trek-wmts",
    title: "Mars Trek WMTS layer services",
    publisher: "NASA / JPL Solar System Treks",
    url: "https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars",
    edition: "Mars equirectangular WMTS catalog",
    description: "Official NASA/JPL catalog for Mars Trek imagery and analysis layers, including MOLA color hillshade and other mission mosaics.",
  },
  {
    id: "themis-day-ir",
    title: "THEMIS-IR Day Global Mosaic 100m v12",
    publisher: "USGS Astrogeology / Arizona State University",
    url: "https://astrogeology.usgs.gov/search/map/mars_odyssey_themis_ir_day_global_mosaic_100m_v12",
    edition: "THEMIS daytime infrared, 100 m/pixel",
    description: "A visual representation of daytime thermal infrared temperatures. The mosaic values are stretched and blended; it is not a raw calibrated temperature raster.",
  },
  {
    id: "themis-night-ir",
    title: "THEMIS Night IR Global Mosaic",
    publisher: "NASA Mars Odyssey / Mars Trek",
    url: "https://trek.nasa.gov/mars/",
    edition: "THEMIS nighttime infrared mosaic",
    description: "Nighttime thermal infrared context layer exposed through the official Mars Trek WMTS catalog.",
  },
  {
    id: "ecostress",
    title: "ECOSTRESS instrument data",
    publisher: "NASA Earthdata / JPL",
    url: "https://www.earthdata.nasa.gov/data/instruments/ecostress",
    edition: "Earth land-surface temperature context",
    description: "Earth-only thermal observations from the ISS. PATHFINDER links to the ECOSTRESS data portal rather than misrepresenting it as a Mars layer.",
  },
  {
    id: "perseverance-raw-images",
    title: "Mars Perseverance Raw Images Gallery",
    publisher: "NASA Mars 2020",
    url: "https://mars.nasa.gov/mars2020/multimedia/raw-images/",
    edition: "Mission image gallery",
    description: "Mission image archive showing the visual evidence collected by Perseverance across Mars.",
  }
];

const evidence = (
  axis: Axis,
  label: string,
  status: Availability,
  note: string,
  extra: Partial<FeatureEvidence> = {},
): FeatureEvidence => ({ axis, label, status, note, ...extra });

export const sites: Site[] = [
  {
    id: "wadi-hauran",
    name: "Wadi Hauran",
    nameAr: "وادي حوران",
    body: "Earth",
    country: "Iraq",
    countryAr: "العراق",
    lat: 33.0333,
    lon: 40.25,
    coordinateFrame: "WGS 84; approximate map anchor, not a study boundary",
    missionTags: ["rover", "geology"],
    extent: "Approximate map anchor only; candidate boundary pending",
    extentAr: "نقطة إرشادية تقريبية فقط؛ حدود المرشح قيد التحقق",
    environment: "Arid wadi / sedimentary and erosional landscape",
    environmentAr: "وادٍ جاف / مشهد رسوبي وتعرية",
    status: "field-validation",
    statusLabel: "Candidate — boundary + field validation pending",
    statusLabelAr: "مرشح — الحدود والتحقق الميداني قيد التنفيذ",
    description: "An Iraqi candidate for studying drainage forms, exposed sedimentary units, erosion and rover-imaging workflows. This MVP uses an approximate point for orientation and does not claim a completed Wadi Hauran raster analysis.",
    descriptionAr: "مرشح عراقي لدراسة أشكال التصريف والوحدات الرسوبية المكشوفة والتعرية وسير عمل تصوير المركبات الجوالة. تستخدم النسخة الحالية نقطة تقريبية للتوجيه ولا تدعي اكتمال تحليل شبكي للوادي.",
    useCases: ["Geomorphology and drainage-form fieldwork", "Rover imaging workflow rehearsal", "Erosion-process observation"],
    useCasesAr: ["عمل جيومورفولوجي ميداني وأشكال التصريف", "تدريب سير عمل تصوير المركبات الجوالة", "رصد عمليات التعرية"],
    limitations: ["No matched Wadi Hauran DEM clipped to a documented study boundary in this MVP", "No field safety, access, or security clearance", "Earth conditions do not reproduce Martian pressure, radiation, gravity, or chemistry"],
    limitationsAr: ["لا يوجد في النسخة الحالية نموذج ارتفاع مقصوص لحدود دراسة موثقة للوادي", "لا يوجد تحقق من السلامة أو الوصول أو التصاريح الميدانية", "الظروف الأرضية لا تعيد ضغط المريخ أو إشعاعه أو جاذبيته أو كيمياءه"],
    evidence: [
      evidence("surface", "Geology / surface context", "partial", "Qualitative context is sourced from the Wadi Hauran geology study; RGB imagery alone is not used to infer rock type.", { sourceId: "wadi-geology", comparable: true, valueKind: "qualitative-internal", processing: "Internal categorical mapping from cited qualitative context; not a measured similarity", scoreHints: { Mars: 0.62 } }),
      evidence("topography", "Elevation / slope / roughness", "field-validation", "A study boundary and clipped DEM are required before a numerical topography comparison. NASA SRTM is the intended Earth DEM provenance.", { sourceId: "srtm", resolution: "pending clipped raster", comparable: false }),
      evidence("thermal", "Thermal properties", "unavailable", "No compatible Earth/Mars thermal product is loaded for this candidate.", { comparable: false }),
      evidence("hydrology", "Drainage / water history", "partial", "Wadi and drainage context is documented, but the current comparison does not claim a matched channel-distribution analysis.", { sourceId: "wadi-geology", comparable: true, valueKind: "qualitative-internal", processing: "Internal categorical mapping from cited qualitative context; not a measured similarity", scoreHints: { Mars: 0.68 } }),
      evidence("operations", "Operational accessibility", "field-validation", "No field access, safety, or route survey is represented. This is not a field authorization.", { comparable: false }),
    ],
    sourceIds: ["wadi-geology", "wadi-anchor", "srtm"],
  },
  {
    id: "gale-crater",
    name: "Gale Crater",
    nameAr: "فوهة غيل",
    body: "Mars",
    lat: -4.5895,
    lon: 137.4417,
    coordinateFrame: "Mars planetocentric; longitude positive east; Gale DEM equirectangular context",
    missionTags: ["rover", "landing", "geology"],
    extent: "Published DEM bounds: 0.969° latitude × 0.556° longitude",
    extentAr: "حدود نموذج الارتفاع المنشورة: 0.969° عرضاً × 0.556° طولاً",
    environment: "Impact crater with layered sedimentary terrain and rover traverse context",
    environmentAr: "فوهة اصطدام ذات تضاريس رسوبية طبقية وسياق مسار مركبة جوالة",
    status: "analyzed",
    statusLabel: "Reference dataset available",
    statusLabelAr: "بيانات الموقع المرجعي متاحة",
    description: "A Mars reference site for the priority comparison. The high-resolution Gale DEM is published by USGS Astrogeology and tied to MOLA; NASA’s Curiosity map provides mission and terrain-planning context.",
    descriptionAr: "موقع مرجعي على المريخ للمقارنة ذات الأولوية. نموذج غيل عالي الدقة منشور من مركز USGS Astrogeology ومرتبط بـ MOLA؛ وتوفر خريطة كيوريوسيتي من NASA سياق المهمة وتخطيط التضاريس.",
    useCases: ["Rover route-planning context", "Layered sedimentary and geomorphic comparison", "Planetary terrain visualization"],
    useCasesAr: ["سياق تخطيط مسار المركبة الجوالة", "مقارنة رسوبية وجيومورفولوجية طبقية", "تصوير التضاريس الكوكبية"],
    limitations: ["The DEM is not a matched Earth analogue raster", "Planetary elevation is Mars-referenced and is not directly comparable to Earth orthometric height", "The published product range is not treated as a site mean"],
    limitationsAr: ["نموذج الارتفاع ليس شبكة متناظرة لموقع أرضي", "ارتفاعات الكوكب مرتبطة بمرجع المريخ ولا تقارن مباشرة بارتفاع الأرض الأورثومتري", "مدى المنتج المنشور لا يعامل على أنه متوسط الموقع"],
    evidence: [
      evidence("surface", "Geology / surface context", "analyzed", "Published mission and DEM context supports layered sedimentary / erosional terrain interpretation; this is not an RGB-only rock classification.", { sourceId: "gale-dem", resolution: "1 m/pixel source product", comparable: true, valueKind: "qualitative-internal", processing: "Internal categorical mapping from cited qualitative context; not a measured similarity", scoreHints: { Earth: 0.62 } }),
      evidence("topography", "Elevation / slope / roughness", "analyzed", "Gale DEM metadata are available at 1 m/pixel, but the MVP does not download the 3.6 GB raster into the app.", { sourceId: "gale-dem", resolution: "1 m/pixel", epoch: "2011 source processing / 2016 publication", comparable: false }),
      evidence("thermal", "Thermal properties", "unavailable", "No compatible thermal product is loaded for this MVP comparison.", { comparable: false }),
      evidence("hydrology", "Drainage / water history", "partial", "NASA/USGS mission context supports ancient sedimentary and fluvial questions, but no matched channel distribution metric is calculated here.", { sourceId: "curiosity-map", comparable: true, valueKind: "qualitative-internal", processing: "Internal categorical mapping from cited qualitative context; not a measured similarity", scoreHints: { Earth: 0.68 } }),
      evidence("operations", "Operational accessibility", "partial", "Curiosity mission mapping demonstrates rover-planning context; this is not a direct Earth access score.", { sourceId: "curiosity-map", comparable: false }),
    ],
    sourceIds: ["curiosity-map", "gale-dem", "mola", "treks"],
  },
  {
    id: "atacama",
    name: "Atacama Desert",
    nameAr: "صحراء أتاكاما",
    body: "Earth",
    country: "Chile",
    countryAr: "تشيلي",
    lat: -23.5,
    lon: -69.25,
    coordinateFrame: "WGS 84; regional reference point",
    missionTags: ["rover", "geology"],
    extent: "Regional reference point; not a completed analysis boundary",
    extentAr: "نقطة مرجعية إقليمية؛ ليست حدود تحليل مكتملة",
    environment: "Hyper-arid desert benchmark",
    environmentAr: "مرجع لصحراء شديدة الجفاف",
    status: "partial",
    statusLabel: "Reference candidate — partial metadata",
    statusLabelAr: "مرشح مرجعي — بيانات وصفية جزئية",
    description: "A benchmark candidate shown for atlas context. It is not scored in the priority comparison until a documented boundary and compatible raster inputs are loaded.",
    descriptionAr: "مرشح مرجعي يظهر ضمن سياق الأطلس. لا يدخل المقارنة ذات الأولوية قبل تحميل حدود موثقة وبيانات شبكية متوافقة.",
    useCases: ["Hyper-arid fieldwork planning"],
    useCasesAr: ["تخطيط العمل الميداني في بيئة شديدة الجفاف"],
    limitations: ["Regional point only in this MVP", "No numeric PASI analysis loaded"],
    limitationsAr: ["نقطة إقليمية فقط في هذه النسخة", "لا يوجد تحليل PASI رقمي محمل"],
    evidence: [
      evidence("surface", "Aridity context", "partial", "Reference-only catalog entry; no numeric index is asserted.", { comparable: false }),
      evidence("topography", "Terrain metrics", "unavailable", "Boundary and raster ingestion pending.", { comparable: false }),
      evidence("thermal", "Thermal properties", "unavailable", "Not loaded.", { comparable: false }),
      evidence("hydrology", "Hydrology", "unavailable", "Not loaded.", { comparable: false }),
      evidence("operations", "Operations", "unavailable", "Not loaded.", { comparable: false }),
    ],
    sourceIds: ["srtm"],
  },
  {
    id: "jezero-crater",
    name: "Jezero Crater",
    nameAr: "فوهة جيزيرو",
    body: "Mars",
    lat: 18.4447,
    lon: 77.4508,
    coordinateFrame: "Mars planetocentric; regional reference point",
    missionTags: ["rover", "geology"],
    extent: "Regional reference point",
    extentAr: "نقطة مرجعية إقليمية",
    environment: "Ancient lake-basin and delta reference",
    environmentAr: "مرجع لحوض بحيري قديم ودلتا",
    status: "partial",
    statusLabel: "Reference candidate — partial metadata",
    statusLabelAr: "مرشح مرجعي — بيانات وصفية جزئية",
    description: "A secondary Mars reference for future sedimentary and delta-process comparisons. It is included in the atlas but not scored against Wadi Hauran in the default view.",
    descriptionAr: "مرجع ثانوي على المريخ لمقارنات مستقبلية للترسبات وعمليات الدلتا. يظهر في الأطلس لكنه لا يدخل المقارنة الافتراضية مع وادي حوران.",
    useCases: ["Ancient delta-process context", "Sedimentary geomorphology benchmark"],
    useCasesAr: ["سياق عمليات الدلتا القديمة", "مرجع للجيومورفولوجيا الرسوبية"],
    limitations: ["No matched Earth raster analysis in this MVP"],
    limitationsAr: ["لا يوجد تحليل شبكي متناظر مع الأرض في هذه النسخة"],
    evidence: [
      evidence("surface", "Surface context", "partial", "Reference entry only; no numeric comparison loaded.", { comparable: false }),
      evidence("topography", "Terrain metrics", "unavailable", "Not loaded.", { comparable: false }),
      evidence("thermal", "Thermal properties", "unavailable", "Not loaded.", { comparable: false }),
      evidence("hydrology", "Ancient hydrology", "partial", "Reference context only; no matched channel metric.", { comparable: false }),
      evidence("operations", "Operations", "unavailable", "Not loaded.", { comparable: false }),
    ],
    sourceIds: ["treks", "mola"],
  },
  {
    id: "lunar-south-pole",
    name: "Lunar South Pole",
    nameAr: "القطب الجنوبي للقمر",
    body: "Moon",
    lat: -89.0,
    lon: 0,
    coordinateFrame: "Moon planetocentric; polar reference point",
    missionTags: ["landing", "thermal"],
    extent: "Polar reference point",
    extentAr: "نقطة مرجعية قطبية",
    environment: "Polar illumination and terrain reference",
    environmentAr: "مرجع للإضاءة القطبية والتضاريس",
    status: "partial",
    statusLabel: "Moon reference — not a Mars analogue",
    statusLabelAr: "مرجع قمري — ليس نظيراً للمريخ",
    description: "A lunar reference target for future terrain and illumination analysis. It is intentionally not treated as a Mars-like environment.",
    descriptionAr: "هدف قمري مرجعي لتحليل التضاريس والإضاءة مستقبلاً. لا يعامل عمداً كبيئة شبيهة بالمريخ.",
    useCases: ["Lunar terrain and illumination planning"],
    useCasesAr: ["تخطيط التضاريس والإضاءة القمرية"],
    limitations: ["No Earth/Moon matched raster analysis in this MVP", "Moon and Mars are separate target bodies with different physical environments"],
    limitationsAr: ["لا يوجد تحليل شبكي متناظر بين الأرض والقمر في هذه النسخة", "القمر والمريخ جرمان مستهدفان ببيئات فيزيائية مختلفة"],
    evidence: [
      evidence("surface", "Surface context", "partial", "Reference target only.", { comparable: false }),
      evidence("topography", "Terrain metrics", "unavailable", "Not loaded.", { comparable: false }),
      evidence("thermal", "Thermal properties", "unavailable", "Not loaded.", { comparable: false }),
      evidence("hydrology", "Water / ice", "unavailable", "Not loaded; no ice value is inferred.", { comparable: false }),
      evidence("operations", "Operations", "partial", "Mission planning context only.", { comparable: false }),
    ],
    sourceIds: ["treks"],
  },
];

export const missions: MissionProfile[] = [
  { id: "rover", label: "Rover Testing", labelAr: "اختبار المركبات الجوالة", description: "Prioritizes surface context, terrain, and operational evidence.", weights: { surface: 0.35, topography: 0.25, thermal: 0.05, hydrology: 0.1, operations: 0.25 } },
  { id: "landing", label: "Landing Site Assessment", labelAr: "تقييم موقع الهبوط", description: "Prioritizes terrain, slope, roughness, elevation and hazards.", weights: { surface: 0.1, topography: 0.55, thermal: 0.05, hydrology: 0.05, operations: 0.25 } },
  { id: "geology", label: "Geological Fieldwork", labelAr: "العمل الجيولوجي الميداني", description: "Prioritizes surface/geology and hydrologic or landform context.", weights: { surface: 0.55, topography: 0.15, thermal: 0.05, hydrology: 0.2, operations: 0.05 } },
  { id: "thermal", label: "Thermal Instrument Testing", labelAr: "اختبار الأجهزة الحرارية", description: "Requires compatible thermal products before a strong conclusion is possible.", weights: { surface: 0.15, topography: 0.1, thermal: 0.6, hydrology: 0.05, operations: 0.1 } },
  { id: "subsurface", label: "Subsurface Exploration", labelAr: "استكشاف ما تحت السطح", description: "Prioritizes evidence of structure/voids and accessibility; unavailable data are shown, not assumed.", weights: { surface: 0.35, topography: 0.15, thermal: 0.05, hydrology: 0.1, operations: 0.35 } },
];

export const axisLabels: Record<Axis, { en: string; ar: string }> = {
  surface: { en: "Surface / geology", ar: "السطح / الجيولوجيا" },
  topography: { en: "Topography", ar: "التضاريس" },
  thermal: { en: "Thermal", ar: "الحراري" },
  hydrology: { en: "Hydrology / ice", ar: "المياه / الجليد" },
  operations: { en: "Operations", ar: "العمليات" },
};

export type MeasurementInput = Partial<Record<Axis, {
  earth: number;
  planet: number;
  unit: string;
  rangeMin: number;
  rangeMax: number;
  sourceId?: string;
  method?: string;
}>>;

export type PasiResult = {
  score: number | null;
  axisScores: Record<Axis, number | null>;
  completeness: number;
  availableAxes: Axis[];
  excludedAxes: Axis[];
  warnings: string[];
  rationale: string[];
  weights: Record<Axis, number>;
};

export function calculatePasi(earthId: string, planetId: string, missionId: MissionId, weightOverrides?: Partial<Record<Axis, number>>, measurements?: MeasurementInput): PasiResult {
  const earth = sites.find(s => s.id === earthId);
  const planet = sites.find(s => s.id === planetId);
  const mission = missions.find(m => m.id === missionId) ?? missions[0];
  const weights = { ...mission.weights, ...weightOverrides };
  const warnings: string[] = [];
  const rationale: string[] = [];
  const axisScores = {} as Record<Axis, number | null>;
  const axes: Axis[] = ["surface", "topography", "thermal", "hydrology", "operations"];

  if (!earth || !planet) {
    return { score: null, axisScores: { surface: null, topography: null, thermal: null, hydrology: null, operations: null }, completeness: 0, availableAxes: [], excludedAxes: axes, warnings: ["Select one Earth site and one planetary reference site."], rationale: [], weights };
  }

  let availableWeight = 0;
  let totalWeight = 0;
  for (const axis of axes) {
    const a = earth.evidence.find(e => e.axis === axis);
    const b = planet.evidence.find(e => e.axis === axis);
    const w = Math.max(0, Number(weights[axis] ?? 0));
    totalWeight += w;
    const aComparable = Boolean(a?.comparable && a?.status !== "unavailable" && a?.status !== "field-validation");
    const bComparable = Boolean(b?.comparable && b?.status !== "unavailable" && b?.status !== "field-validation");
    const measurement = measurements?.[axis];
    const hasMeasurement = Boolean(measurement && Number.isFinite(measurement.earth) && Number.isFinite(measurement.planet) && Number.isFinite(measurement.rangeMin) && Number.isFinite(measurement.rangeMax) && measurement.rangeMax > measurement.rangeMin && measurement.unit.trim().length > 0 && Boolean(measurement.sourceId?.trim()) && Boolean(measurement.method?.trim()));
    if (aComparable && bComparable && hasMeasurement) {
      const range = measurement!.rangeMax - measurement!.rangeMin;
      const score = Math.max(0, Math.min(1, 1 - Math.abs(measurement!.earth - measurement!.planet) / range));
      axisScores[axis] = score * 100;
      availableWeight += w;
      rationale.push(`${axis}: normalized absolute difference using ${measurement!.unit}${measurement!.sourceId ? ` from ${measurement!.sourceId}` : ""} (${Math.round(score * 100)} / 100).`);
    } else {
      axisScores[axis] = null;
      warnings.push(`${axisLabels[axis].en} excluded: a paired measured input is not available for both sites.`);
    }
  }

  const weighted = axes.reduce((sum, axis) => {
    const score = axisScores[axis];
    return sum + (score === null ? 0 : score * Math.max(0, Number(weights[axis] ?? 0)));
  }, 0);
  const score = availableWeight > 0 && totalWeight > 0 ? weighted / availableWeight : null;
  if (totalWeight === 0) warnings.push("At least one mission weight must be greater than zero before PASI can be calculated.");
  const completeness = totalWeight > 0 ? availableWeight / totalWeight : 0;
  if (earth.id === "wadi-hauran") warnings.push("Wadi Hauran is a candidate site with an approximate map anchor; a clipped DEM boundary and field validation are still required.");
  if (axisScores.topography === null) warnings.push("Absolute Earth and Mars elevations are not compared: their vertical datums and available spatial products are not matched in this MVP.");
  if (completeness < 0.75) warnings.push("The score is incomplete. A higher number of loaded properties would be required for a stronger conclusion.");
  warnings.push("No numeric score is shown unless both sites have paired measured inputs with compatible units and methods.");

  return { score: score === null ? null : Math.round(score * 10) / 10, axisScores, completeness, availableAxes: axes.filter(a => axisScores[a] !== null), excludedAxes: axes.filter(a => axisScores[a] === null), warnings: Array.from(new Set(warnings)), rationale, weights };
}

export const getSite = (id: string) => sites.find(site => site.id === id);
export const getMission = (id: MissionId) => missions.find(mission => mission.id === id) ?? missions[0];
