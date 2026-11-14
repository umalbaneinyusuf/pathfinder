# Andromeda Team — Interplanetary Survival Guide: Martian Map

PATHFINDER now frames the product as a layered Martian mission map for human exploration. The public experience leads with the astronaut question: combine optical, topographic, geological, and mission context so a crew can understand a route and science target before a Marswalk.

The NASA resources supplied for the challenge are represented in the source catalog and linked from the interface: JPL Mars Trek, the USGS-NASA Mars geologic maps, Curiosity's proposed route up Mount Sharp, NASA Worldview, and the Perseverance raw-images gallery. The Wadi Hauran page remains an Earth field-context module with an approximate anchor, a cited geology study, SRTM as DEM provenance, and a visible data stack.

## Comparison contract

The comparison workspace accepts a JSON measurement set. Each axis requires an Earth value, a planetary value, a shared unit, a normalization range, a source ID, and a processing method. The calculator uses the reproducible normalized absolute difference:

`similarity = clamp(1 - abs(Earth - Planet) / (rangeMax - rangeMin), 0, 1)`

The mission weights then combine only axes with valid paired measurements. Without a traceable measurement set, the interface intentionally displays no numeric score. This prevents the earlier qualitative placeholders from being mistaken for scientific results.

The downloadable template is generated in the comparison workspace. The same measurement structure is accepted by the public `pathfinder.calculate` API, so a submitted dataset can be checked both in the interface and through the API.

## Andromeda Iraqi Intelligence

The Compare Sites workspace includes a server-backed analyst named **Andromeda Iraqi Intelligence**. It receives the current site pair, mission profile, deterministic calculation, measurement set, and user question. Before answering, the server retrieves short live excerpts from the catalogued NASA, USGS, and Earth-data URLs. The model is grounded by those excerpts and the project registry; it is not presented as a newly trained NASA model. Arabic answers use clear Iraqi Arabic, while English answers use professional English. The analyst must keep missing axes unscored and must not invent measurements or claim NASA endorsement.
