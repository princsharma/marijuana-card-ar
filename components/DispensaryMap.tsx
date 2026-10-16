"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { DISPENSARIES, DISPENSARY_COORDS, DISPENSARY_SOURCE, dispensaryCities } from "@/lib/dispensaries";
import type { Dispensary } from "@/lib/types";

type Pin = Dispensary & { lat: number; lng: number };

function withCoords(item: Dispensary): Pin | null {
  const point = DISPENSARY_COORDS[item.id];
  if (!point) return null;
  return { ...item, lat: point.lat, lng: point.lng };
}

export function DispensaryLocator({ title, children }: { title: string; children?: ReactNode }) {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");
  const [zone, setZone] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const cities = dispensaryCities();
  const needle = query.trim().toLowerCase();
  const results = useMemo(
    () =>
      DISPENSARIES.map(withCoords).filter((item): item is Pin => {
        if (!item) return false;
        if (city !== "all" && item.city !== city) return false;
        if (zone !== "all" && String(item.zone) !== zone) return false;
        if (!needle) return true;
        return `${item.name} ${item.city} ${item.address}`.toLowerCase().includes(needle);
      }),
    [city, needle, zone],
  );
  const active = results.find((item) => item.id === selected) ?? null;

  function choose(id: string) {
    setSelected((current) => (current === id ? null : id));
  }

  function resetFilters() {
    setQuery("");
    setCity("all");
    setZone("all");
    setSelected(null);
  }

  return (
    <section className="locator-screen" aria-label="Dispensary map">
      <DispensaryCanvas pins={results} selected={active} onSelect={choose} />
      <div className="locator-panel">
        <h1>{title}</h1>
        <p className="lede">
          Filter by city or zone, then select a location to highlight it. Bring your card and photo ID. The state tracks a 2.5 ounce balance across every dispensary.
        </p>
        <div className="field">
          <label htmlFor="disp-search">Search name or address</label>
          <input id="disp-search" value={query} onChange={(event) => { setQuery(event.target.value); setSelected(null); }} />
        </div>
        <div className="field">
          <label htmlFor="disp-city">City</label>
          <select id="disp-city" value={city} onChange={(event) => { setCity(event.target.value); setSelected(null); }}>
            <option value="all">All cities in this snapshot</option>
            {cities.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="disp-zone">Zone</label>
          <select id="disp-zone" value={zone} onChange={(event) => { setZone(event.target.value); setSelected(null); }}>
            <option value="all">All zones</option>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
              <option key={number} value={number}>Zone {number}</option>
            ))}
          </select>
        </div>
        <div className="locator-tools">
          <p role="status">{results.length} {results.length === 1 ? "location" : "locations"}</p>
          <button className="btn" type="button" onClick={resetFilters}>Clear filters</button>
        </div>
        {results.length === 0 ? (
          <p className="callout">No locations match those filters.</p>
        ) : (
          <ul className="plain-list locator-list">
            {results.map((item) => {
              const on = item.id === selected;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={on ? "locator-hit is-active" : "locator-hit"}
                    aria-pressed={on}
                    onClick={() => choose(item.id)}
                  >
                    <strong>{item.name}</strong>
                    <span>{item.city} · Zone {item.zone}</span>
                    <span>{item.address}</span>
                  </button>
                  {on ? (
                    <div className="locator-more">
                      {item.phone ? <p><a href={`tel:+1${item.phone.replace(/\D/g, "")}`}>{item.phone}</a></p> : <p>Phone number was not listed in the source snapshot.</p>}
                      <p>
                        <a href={`https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lng}#map=16/${item.lat}/${item.lng}`}>
                          Open this pin in OpenStreetMap
                        </a>
                      </p>
                    </div>
                  ) : null}
                </li>
              );
            })}
          </ul>
        )}
        <p className="fine">
          Directory snapshot from the <a href={DISPENSARY_SOURCE}>Arkansas Cannabis Industry Association</a>.
          Most pins sit on the street from that snapshot. Confirm a location on the state list before you go.
          This practice does not sell cannabis.
        </p>
        {children}
      </div>
      {active ? (
        <aside className="locator-card" aria-live="polite">
          <p className="kicker">Zone {active.zone}</p>
          <h2>{active.name}</h2>
          <LocationFacts item={active} />
          <button className="btn" type="button" onClick={() => setSelected(null)}>Close</button>
        </aside>
      ) : null}
    </section>
  );
}

function DispensaryCanvas({
  pins,
  selected,
  onSelect,
}: {
  pins: Pin[];
  selected: Pin | null;
  onSelect: (id: string) => void;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const pinsRef = useRef(pins);
  const selectedRef = useRef(selected);
  const onSelectRef = useRef(onSelect);
  pinsRef.current = pins;
  selectedRef.current = selected;
  onSelectRef.current = onSelect;

  useEffect(() => {
    const node = frame.current;
    if (!node) return;
    let cancelled = false;
    let map: import("leaflet").Map | null = null;
    (async () => {
      const leaflet = await import("leaflet");
      const L = leaflet;
      if (cancelled || !frame.current) return;
      map = L.map(frame.current, { scrollWheelZoom: true, zoomControl: false }).setView([34.85, -92.4], 7);
      L.control.zoom({ position: "topright" }).addTo(map);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);
      layerRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      draw(L, map, layerRef.current, pinsRef.current, selectedRef.current, (id) => onSelectRef.current(id));
    })();
    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
      layerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const layer = layerRef.current;
    if (!map || !layer) return;
    let cancelled = false;
    (async () => {
      const L = await import("leaflet");
      if (cancelled) return;
      draw(L, map, layer, pins, selected, (id) => onSelectRef.current(id));
    })();
    return () => {
      cancelled = true;
    };
  }, [pins, selected]);

  return <div ref={frame} className="locator-map" role="application" aria-label="Map of dispensary locations in this snapshot" />;
}

function LocationFacts({ item }: { item: Pin }) {
  return (
    <>
      <p>{item.address}</p>
      {item.phone ? (
        <p><a href={`tel:+1${item.phone.replace(/\D/g, "")}`}>{item.phone}</a></p>
      ) : (
        <p>Phone number was not listed in the source snapshot.</p>
      )}
      <p>
        <a href={`https://www.openstreetmap.org/?mlat=${item.lat}&mlon=${item.lng}#map=16/${item.lat}/${item.lng}`}>
          Open this pin in OpenStreetMap
        </a>
      </p>
    </>
  );
}

function draw(
  L: typeof import("leaflet"),
  map: import("leaflet").Map,
  layer: import("leaflet").LayerGroup,
  pins: Pin[],
  selected: Pin | null,
  onSelect: (id: string) => void,
) {
  layer.clearLayers();
  const bounds = L.latLngBounds([]);
  pins.forEach((pin) => {
    const active = selected?.id === pin.id;
    if (active) {
      L.circle([pin.lat, pin.lng], {
        radius: 700,
        color: "#241b63",
        weight: 2,
        fillColor: "#f6e7a4",
        fillOpacity: 0.45,
      }).addTo(layer);
    }
    const marker = L.marker([pin.lat, pin.lng], {
      title: pin.name,
      keyboard: true,
      zIndexOffset: active ? 800 : 0,
      icon: L.divIcon({
        className: active ? "pin-icon is-active" : "pin-icon",
        html: `<span class="pin-dot${active ? " is-active" : ""}"></span>`,
        iconSize: active ? [34, 34] : [18, 18],
        iconAnchor: active ? [17, 17] : [9, 9],
      }),
    });
    marker.on("click", () => onSelect(pin.id));
    marker.addTo(layer);
    bounds.extend([pin.lat, pin.lng]);
  });
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (selected) {
    const nextZoom = Math.max(map.getZoom(), 12);
    if (reduce) map.setView([selected.lat, selected.lng], nextZoom);
    else map.flyTo([selected.lat, selected.lng], nextZoom, { duration: 0.55 });
  } else if (pins.length === 1) {
    map.setView([pins[0].lat, pins[0].lng], 11);
  } else if (pins.length > 1 && bounds.isValid()) {
    const narrow = window.innerWidth < 860;
    map.fitBounds(bounds.pad(0.12), {
      animate: !reduce,
      maxZoom: 11,
      paddingTopLeft: narrow ? [16, 16] : [400, 24],
      paddingBottomRight: narrow ? [16, 200] : [24, 24],
    });
  }
  window.setTimeout(() => map.invalidateSize(), 0);
}
