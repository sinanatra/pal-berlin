<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";

  let places = [];
  let map;
  let markers = [];
  let leafletLoaded = false;
  let loading = true;

  const CSV_URL =
    "https://docs.google.com/spreadsheets/d/1l9VlCwg3toS74RoFnQ66iEWqxd0ND6Uz7ckhFB2XaVE/gviz/tq?tqx=out:csv";

  function getColor1() {
    return (
      getComputedStyle(document.documentElement)
        .getPropertyValue("--color-1")
        .trim() || "#9000ff"
    );
  }

  function makeColor1Icon() {
    const color = getColor1();
    const svg = `
      <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="16" cy="16" rx="10" ry="10" fill="${color}" stroke="#222" stroke-width="1"/>
      </svg>
    `;
    return L.icon({
      iconUrl: "data:image/svg+xml," + encodeURIComponent(svg),
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
      className: "custom-marker",
    });
  }

  async function loadPlaces() {
    loading = true;
    const response = await fetch(CSV_URL);
    const csvData = await response.text();
    places = d3
      .csvParse(csvData, (d) => ({
        ...d,
        lat: +d.lat,
        lon: +d.lon,
        visible:
          String(d.visible).toLowerCase() === "true" ||
          d.visible === "1" ||
          d.visible === 1,
      }))
      .filter((p) => p.visible && !isNaN(p.lat) && !isNaN(p.lon));
    loading = false;
    if (leafletLoaded) renderMarkers();
  }

  async function renderMarkers() {
    if (!map) return;
    const L = (await import("leaflet")).default;
    markers.forEach((m) => map.removeLayer(m));
    markers = [];
    for (const place of places) {
      const popupContent = `
        <div>
          <strong>${place.name}</strong>
          ${place.note ? `<div style="margin-top:5px; color:#333; font-size:0.98em">${place.note}</div>` : ""}
          ${place.link ? `<div style="margin-top:7px;"><a href="${place.link}" class="custom-link" target="_blank" rel="noopener noreferrer">Link</a></div>` : ""}
        </div>
      `;
      const marker = L.marker([place.lat, place.lon], {
        icon: makeColor1Icon(),
      })
        .addTo(map)
        .bindPopup(popupContent);
      markers.push(marker);
    }
  }

  onMount(async () => {
    const leaflet = await import("leaflet");
    await import("leaflet/dist/leaflet.css");
    leafletLoaded = true;
    const L = leaflet.default;

    map = L.map("map", {
      zoomControl: true,
      attributionControl: true,
    }).setView([52.52, 13.405], 12);

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: "© OpenStreetMap © CartoDB",
      }
    ).addTo(map);

    loadPlaces();
  });
</script>

{#if loading}
  <div class="loading-indicator">Loading...</div>
{/if}

<div id="map" style="height: 100vh; width: 100vw;"></div>

<style>
  #map {
    position: absolute;
    inset: 0;
    height: 100vh;
    width: 100vw;
    z-index: 0;
  }

  :global(.custom-link) {
    display: inline-block;
    font-family: "Arial", sans-serif;
    font-size: 12px !important;
    color: #000;
    text-decoration: none;
  }

  :global(.custom-link::before) {
    content: "☞ ";
    margin-right: 0.3em;
  }

  :global(.custom-link:hover) {
    color: var(--color-1) !important;
  }

  .loading-indicator {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.85);
    color: var(--color-1);
    font-size: 1.5em;
    z-index: 1000;
    pointer-events: none;
  }

  :global(.leaflet-popup-content-wrapper) {
    min-width: 150px;
    background-color: #fff !important;
    color: var(--color-1) !important;
    border-radius: 10px !important;
    padding: 0.8em 1.4em !important;
    font-family: "Arial", sans-serif !important;
    max-width: none !important;
    width: auto;
    display: inline-block;
  }

  :global(.leaflet-popup-content-wrapper *) {
    color: var(--color-1) !important;
    font-weight: 400 !important;
  }

  :global(.leaflet-popup-content) {
    margin: 0 !important;
    line-height: 1.4;
    font-size: 16px;
  }

  :global(.leaflet-popup-content h1),
  :global(.leaflet-popup-content h2),
  :global(.leaflet-popup-content strong) {
    font-size: 20px !important;
    margin: 0 0 0.5em 0;
  }

  :global(.leaflet-popup-content p) {
    margin: 0.1em 0;
    font-weight: 400;
  }

  :global(.leaflet-popup-tip) {
    display: none;
  }

  :global(.leaflet-popup-close-button) {
    color: #000 !important;
    font-size: 18px;
    top: 4px;
    right: 6px;
  }
</style>
