import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Site } from "@shared/pathfinderData";
import type { Lang } from "@/lib/i18n";

const colors: Record<Site["body"], string> = { Earth: "#d99a4e", Mars: "#ef6b5b", Moon: "#96a4b8" };

export default function MapView({ sites, showEarth, showMars, showMoon, onSelect, lang }: { sites: Site[]; showEarth: boolean; showMars: boolean; showMoon: boolean; onSelect: (id: string) => void; lang: Lang }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return;
    const map = L.map(mapRef.current, { worldCopyJump: true, zoomControl: false, minZoom: 2 }).setView([22, 18], 2);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors", maxZoom: 18 }).addTo(map);
    layerRef.current = L.layerGroup().addTo(map);
    mapInstance.current = map;
    setTimeout(() => map.invalidateSize(), 250);
    return () => { map.remove(); mapInstance.current = null; };
  }, []);

  useEffect(() => {
    const map = mapInstance.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    layer.clearLayers();
    const visible = sites.filter(site => site.body === "Earth" ? showEarth : site.body === "Mars" ? showMars : showMoon);
    visible.forEach(site => {
      const marker = L.circleMarker([site.lat, site.lon], { radius: site.id === "wadi-hauran" || site.id === "gale-crater" ? 9 : 7, color: colors[site.body], weight: 2, fillColor: colors[site.body], fillOpacity: 0.85 });
      const siteName = lang === "ar" ? site.nameAr : site.name;
      const status = lang === "ar" ? site.statusLabelAr : site.statusLabel;
      marker.bindPopup(`<div class="map-popup"><strong>${siteName}</strong><span>${site.body}${site.country ? ` · ${site.country}` : ""}</span><small>${status}</small></div>`);
      marker.on("click", () => onSelect(site.id));
      marker.addTo(layer);
    });
  }, [sites, showEarth, showMars, showMoon, onSelect, lang]);

  return <div ref={mapRef} className="map-canvas" aria-label="Interactive analogue atlas map" />;
}

export function WadiMap({ lang }: { lang: Lang }) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current, { zoomControl: false, scrollWheelZoom: false }).setView([33.0333, 40.25], 8);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    const osm = L.tileLayer("https://tile.openstreetmap.de/{z}/{x}/{y}.png", { attribution: "© OpenStreetMap contributors", maxZoom: 18 });
    const nasa = L.tileLayer("https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/BlueMarble_ShadedRelief_Bathymetry/default/2024-01-01/GoogleMapsCompatible_Level8/{z}/{y}/{x}.jpg", { attribution: "NASA Earthdata GIBS · Blue Marble Shaded Relief · 2024-01-01", maxZoom: 8, opacity: 0.82 });
    nasa.addTo(map);
    L.control.layers({ [lang === "ar" ? "NASA GIBS · تضاريس" : "NASA GIBS · relief"]: nasa, [lang === "ar" ? "خريطة الشوارع" : "Street map"]: osm }, undefined, { position: "topright" }).addTo(map);
    const ecostressControl = new (L.Control.extend({ options: { position: "topleft" }, onAdd: () => { const el = L.DomUtil.create("a", "thermal-link"); el.href = "https://ecostress.jpl.nasa.gov/data"; el.target = "_blank"; el.rel = "noreferrer"; el.textContent = lang === "ar" ? "ECOSTRESS · حرارة الأرض ↗" : "ECOSTRESS · Earth thermal ↗"; el.title = lang === "ar" ? "بيانات ECOSTRESS للأرض — ليست طبقة مريخية" : "ECOSTRESS Earth data — not a Mars layer"; L.DomEvent.disableClickPropagation(el); return el; } }))();
    ecostressControl.addTo(map);
    L.circleMarker([33.0333, 40.25], { radius: 9, color: "#d99a4e", weight: 3, fillColor: "#d99a4e", fillOpacity: 0.9 }).addTo(map).bindPopup(`<strong>${lang === "ar" ? "وادي حوران" : "Wadi Hauran"}</strong><br/><small>${lang === "ar" ? "نقطة إرشادية تقريبية وليست حدود دراسة" : "Approximate anchor, not a study boundary"}</small>`).openPopup();
    setTimeout(() => map.invalidateSize(), 250);
    return () => { map.remove(); };
  }, [lang]);
  return <div className="wadi-map-wrap"><div ref={mapRef} className="wadi-map" aria-label={lang === "ar" ? "خريطة وادي حوران بطبقة NASA GIBS" : "Wadi Hauran map with NASA GIBS layer"} /><div className="map-data-badge">NASA GIBS · Blue Marble relief · 2024-01-01</div></div>;
}

export function MarsTrekMap({ lang }: { lang: Lang }) {
  const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current, { crs: L.CRS.EPSG4326, zoomControl: false, minZoom: 0, maxZoom: 5, maxBounds: [[-90, -180], [90, 180]], maxBoundsViscosity: 1 }).setView([-4.5895, 137.4417], 1);
    L.control.zoom({ position: "bottomright" }).addTo(map);
    const mola = L.tileLayer("https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg", { attribution: "NASA/JPL Mars Trek · MOLA global color hillshade", minZoom: 0, maxZoom: 5, noWrap: true });
    const hirise = L.tileLayer("https://astro.arcgis.com/arcgis/rest/services/OnMars/HiRISE/MapServer/tile/{z}/{y}/{x}", { attribution: "NASA/JPL Mars Trek catalog · HiRISE Global", minZoom: 0, maxZoom: 5, noWrap: true, opacity: 0.9 });
    const themisDay = L.tileLayer("https://trek.nasa.gov/tiles/Mars/EQ/THEMIS_DayIR_ControlledMosaics_100m_v2_oct2018/1.0.0//default/default028mm/{z}/{y}/{x}.png", { attribution: "NASA/JPL Mars Trek · THEMIS daytime IR · 100 m/pixel", minZoom: 0, maxZoom: 5, noWrap: true, opacity: 0.82 });
    const themisNight = L.tileLayer("https://trek.nasa.gov/tiles/Mars/EQ/THEMIS_NightIR_ControlledMosaics_100m_v2_oct2018/1.0.0//default/default028mm/{z}/{y}/{x}.png", { attribution: "NASA/JPL Mars Trek · THEMIS nighttime IR · 100 m/pixel", minZoom: 0, maxZoom: 5, noWrap: true, opacity: 0.82 });
    mola.addTo(map);
    L.control.layers({ [lang === "ar" ? "MOLA · تضاريس" : "MOLA · terrain"]: mola }, { [lang === "ar" ? "THEMIS · نهاري" : "THEMIS · daytime IR"]: themisDay, [lang === "ar" ? "THEMIS · ليلي" : "THEMIS · nighttime IR"]: themisNight, [lang === "ar" ? "HiRISE · صور عالية الدقة" : "HiRISE · high resolution"]: hirise }, { position: "topright" }).addTo(map);
    L.circleMarker([-4.5895, 137.4417], { radius: 9, color: "#ef6b5b", weight: 3, fillColor: "#ef6b5b", fillOpacity: 0.9 }).addTo(map).bindPopup(`<strong>${lang === "ar" ? "فوهة غيل" : "Gale Crater"}</strong><br/><small>${lang === "ar" ? "مرجع Curiosity · إحداثيات مريخية" : "Curiosity reference · Mars coordinates"}</small>`).openPopup();
    setTimeout(() => map.invalidateSize(), 250);
    return () => { map.remove(); };
  }, [lang]);
  return <div className="mars-map-wrap"><div ref={mapRef} className="mars-map" aria-label={lang === "ar" ? "خريطة المريخ الأصلية من NASA Trek" : "Native NASA Trek Mars map"} /><div className="map-data-badge mars-badge">NASA Trek · equirectangular · MOLA + THEMIS + HiRISE</div></div>;
}
