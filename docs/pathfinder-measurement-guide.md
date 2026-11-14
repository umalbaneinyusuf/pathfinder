# PATHFINDER measurement file guide

This file is for the Wadi Hauran ↔ Gale Crater comparison. The companion JSON template is intentionally blank. Fill a row only when both sites have a measured value from compatible products, units, windows, and processing methods.

## What to enter

- `earth`: the measured value for the documented Wadi Hauran analysis window.
- `planet`: the measured value for the matched Gale Crater window.
- `unit`: one shared unit, such as `degrees`, `m`, `K`, or a clearly defined index unit.
- `rangeMin` and `rangeMax`: the declared normalization range used for both values.
- `sourceId`: a traceable catalog ID or source record used to obtain the values.
- `method`: enough detail to repeat the extraction, such as product, window, statistic, resampling, and date.

## Suggested measurement families

- `topography`: mean slope, elevation spread, relief, or roughness from matched DEM windows. Use the same statistic and resolution on both bodies.
- `surface`: a documented numeric surface or spectral index only when the Earth and Mars products are physically comparable and the index definition is explicit.
- `thermal`: a matched surface-temperature statistic with compatible acquisition context and units. Do not mix air temperature with surface temperature.
- `hydrology`: a numeric water/ice or geomorphic proxy only when the proxy is defined for both windows. Do not treat missing water as zero.
- `operations`: a measurable route or access property, such as route length or slope burden, only when the two values are defined by the same procedure.

The calculator ignores incomplete rows. A score is not evidence that the sites reproduce Mars physics; it is an internal, mission-specific similarity calculation over the rows supplied.
