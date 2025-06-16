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
      const iconHtml = `
        <div class="custom-marker-container">
          <div class="custom-marker-dot" style="background-color: ${getColor1()}"></div>
          <div class="custom-marker-popup">
            ${
              place.link
                ? `<strong><a href="${place.link}" class="custom-link" target="_blank" rel="noopener noreferrer">${place.name}</a></strong>`
                : `<strong>${place.name}</strong>`
            }
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: "custom-marker-icon",
        iconAnchor: [12, 12],
      });

      const marker = L.marker([place.lat, place.lon], {
        icon: customIcon,
      }).addTo(map);

      marker.on("add", function () {
        this.getElement().style.zIndex = 1000 - places.indexOf(place);
      });

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

  :global(.custom-marker-icon) {
    background: none;
    border: none;
  }

  :global(.custom-marker-container) {
    display: flex;
    align-items: center;
    transition: transform 0.2s ease-in-out;
  }

  :global(.custom-marker-dot) {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid #222;
    z-index: 2;
    flex-shrink: 0;
  }

  :global(.custom-marker-popup) {
    background-color: white;
    border-radius: 0 15px 15px 0;
    white-space: nowrap;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease-in-out;
    padding: 0 4px;
    margin-left: -12px;
    padding-left: 20px;
    z-index: 0;
    height: 30px;
    display: flex;
    align-items: center;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  }

  :global(.leaflet-marker-icon:hover .custom-marker-popup) {
    transform: scaleX(1);
  }

  :global(.leaflet-marker-icon:hover) {
    z-index: 1000 !important;
  }

  :global(.custom-marker-popup a),
  :global(.custom-marker-popup strong) {
    color: var(--color-1) !important;
    font-family: "Arial", sans-serif !important;
    font-size: 14px !important;
    font-weight: 400 !important;
    text-decoration: none;
  }

  :global(.custom-link::before) {
    content: "☞ ";
    margin-right: 0.3em;
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
</style>
