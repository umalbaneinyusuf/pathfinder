
## PASI input provenance note

The default Wadi Hauran ↔ Gale Crater comparison does not display a numeric PASI score until paired measurements are supplied. Qualitative source context remains visible in the evidence matrix and can guide the analyst, but it is not silently converted into a measurement or score. Once matched Earth and Mars windows are ingested, similarities should be derived from documented numeric or distribution-based inputs.

## Martian Map comparison contract

The default Wadi Hauran ↔ Gale Crater view does not display a numeric score because the current catalog does not contain paired measured inputs. The comparison workspace accepts a JSON measurement set only when each axis contains Earth and planetary values, a shared unit, a normalization range, a source ID, and a processing method. The calculator then applies a normalized absolute-difference similarity and mission weights. This keeps the visible result reproducible and prevents qualitative source context from being presented as a scientific measurement.

## NASA Space Apps judging alignment

The 2026 Martian Map challenge asks for a layered, integrated Mars surface view using NASA data and tools, with safety and route context considered. The official judging guide evaluates Impact, Creativity, Validity, Relevance, and Presentation. PATHFINDER's report recommendations frame the current MVP honestly against those criteria: it demonstrates the live workflow and NASA data bridge, while identifying the next evidence needed for a field-ready Wadi boundary and matched Earth/Mars terrain metrics.

## Native Mars map layer contract

The Iraq page now keeps the Earth and Mars maps separate so their coordinate references are not mixed. Wadi Hauran uses NASA Earthdata GIBS in Web Mercator. Gale uses NASA/JPL Mars Trek's equirectangular WMTS catalog with the MGS MOLA global color hillshade layer and the official HiRISE Global ArcGIS resource listed by Mars Trek. The map labels the Gale marker as a Mars-coordinate reference and provides a direct Mars Trek link for full layer metadata and analysis.

The implemented base layer is `Mars_MGS_MOLA_ClrShade_merge_global_463m` through the documented REST WMTS path. The HiRISE switch uses the `HiRISE_Global` resource URL returned by Mars Trek's layer catalog (`https://astro.arcgis.com/arcgis/rest/services/OnMars/HiRISE/MapServer/tile/{z}/{y}/{x}`), rather than inventing a tile product path.

The Mars map now also exposes NASA Mars Trek THEMIS daytime and nighttime infrared mosaics. The daytime product is the documented 100 m/pixel visual mosaic; its values are stretched and blended, so it is presented as thermal context rather than a calibrated temperature measurement. ECOSTRESS is linked from the Wadi Hauran Earth map as an Earth-only thermal-data portal. It is not placed on the Mars map because ECOSTRESS observes Earth's surface from the ISS and does not provide Mars observations.
