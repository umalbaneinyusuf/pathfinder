# PATHFINDER MVP Plan

## Product scope
PATHFINDER is a bilingual Arabic/English scientific web platform for exploring terrestrial analogue candidates and comparing them with selected Moon/Mars reference sites. The MVP prioritizes Wadi Hauran, Iraq versus Gale Crater, Mars, while keeping every source, processing assumption, and data gap visible. It is a candidate-analysis tool, not a NASA product and not a claim that any Earth site is a complete planetary analogue.

## Implementation approach
- **Frontend:** React + TypeScript + Wouter, with a responsive scientific dashboard layout, full English/Arabic translation dictionary, RTL switching, interactive Leaflet atlas, Recharts comparison charts, and browser print/export for generated reports.
- **Backend:** Express/tRPC public procedures for the source-backed site catalog and a deterministic PASI calculation endpoint. The endpoint uses only available feature values, mission-specific weights, and a documented similarity function; it returns completeness, axis scores, warnings, and limitations.
- **Data model:** A versioned in-code registry is the initial MVP dataset. It contains traceable source URLs, source dates/editions, spatial resolution, CRS, processing notes, confidence, and explicit status per feature. The registry is deliberately conservative: approximate Wadi Hauran map anchor only, published Gale DEM metadata and published geographic bounds, and no invented pixel-level measurements.
- **Data path:** The app supports the real-source workflow through a source catalog and a “data availability” model. Numeric PASI is calculated only for comparable documented inputs. Missing or incompatible properties are excluded from the numerator and denominator, never converted to zero. Future GeoTIFF/CSV/GeoJSON ingestion can replace the registry without changing the UI contract.
- **Deployment:** Keep the initialized server/database resources, expose `/api/health`, serve `client/public/routes.json`, build with the existing Dockerfile, commit to `origin/main`, then publish through the configured hosting workflow.

## MVP pages and routes
- `/` and `/showcase` — audience-facing narrative overview: the question, the Wadi Hauran ↔ Gale Crater story, live comparison CTA, and NASA/USGS evidence landscape.
- `/workspace` — detailed project overview with transparent status counts and CTA to the atlas.
- `/atlas` — Leaflet world map with Earth/Mars reference layers, target-body and mission filters, layer toggles, marker popovers, and links to profiles.
- `/compare` — Earth/planet selection, mission profile, editable weights, computed PASI, axis scores, completeness and warnings.
- `/sites/:id` — scientific site profile with coordinates, scope, source links, availability matrix, limitations, and mission use cases.
- `/iraq` — Wadi Hauran focus view and safety/accessibility notice.
- `/methodology` — PASI equation, scoring method, weights, uncertainty, and explicit non-NASA disclaimer.
- `/sources` — source catalog with publisher, data product, edition/date, resolution and direct links.
- `/report` — generated scientific report from the current comparison state, with print/export-to-PDF via the browser print dialog.

## Project structure
- `client/src/App.tsx` contains the route-level views and shared interaction state for the compact MVP.
- `client/src/components/MapView.tsx` contains the Leaflet map; `client/src/lib/i18n.ts` contains bilingual copy and language types.
- `shared/pathfinderData.ts` contains the typed site registry, source registry, mission profiles, provenance fields and PASI calculation.
- `server/` contains public tRPC procedures for site catalog and PASI calculation.
- `client/public/routes.json` declares the complete page route set.
- `drizzle/` remains available for durable user/project records; the MVP does not require write-heavy persistence.
- `docs/` contains source notes and the implementation status handoff; `TODO.md` records delivered outcomes and known limitations.

## Design direction
Three possible movements were considered: Mission Control Minimalism (0.07), Desert Geology Fieldbook (0.06), and Dark Cartographic Instrument Panel (0.05). The chosen direction is **Dark Cartographic Instrument Panel**.

- **Design movement:** restrained mission-control UI fused with scientific map-room cartography.
- **Core principles:** evidence before decoration; density with clear hierarchy; every score has a visible provenance; strong bilingual legibility.
- **Color philosophy:** deep blue-black conveys instrument context; sand and amber identify Earth/desert evidence; teal identifies Mars reference data; coral is reserved for uncertainty and warnings.
- **Layout paradigm:** a map-led workspace with a left evidence rail and right analysis drawer on desktop, collapsing into stacked field cards on mobile rather than a generic centered marketing grid.
- **Signature elements:** segmented status chips, thin coordinate-grid lines, and “evidence rails” that pair every metric with source/date/resolution metadata.
- **Interaction philosophy:** filters and weights update the analysis immediately; no decorative click targets; unavailable data is interactive and explains why it is unavailable.
- **Animation:** short opacity/translate transitions for drawer changes and score updates; no looping hero motion; map interactions remain calm and inspectable.
- **Typography system:** Inter for English UI and system Arabic fallback for Arabic content, with tabular numerals for measurements and compact uppercase labels for scientific metadata.
- **Brand essence:** a transparent analogue-analysis instrument for researchers, engineers and challenge teams; precise, candid, exploratory.
- **Brand voice:** direct and careful. Example lines: “Compare the terrain you can measure.” / “Similarity is mission-specific, not a claim of planetary equivalence.”
- **Wordmark & logo:** a compact orbit/contour mark: a broken circular track crossing a contour line, paired with PATHFINDER in a technical wordmark.
- **Signature brand color:** oxidized amber `#D99A4E`, used sparingly to own the research interface without competing with map layers.

## Scientific boundary
The MVP must never imply that Earth reproduces Martian gravity, pressure, radiation, vacuum, or full chemistry. Wadi Hauran is labeled **Candidate Site — pending boundary/raster analysis and field validation**. Gale is a reference target backed by NASA/USGS planetary products. The product presents partial similarity for defined mission questions only.
