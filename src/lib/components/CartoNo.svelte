<script>
  import { onMount } from "svelte";

  let map;
  let leafletLoaded = false;

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
  });
</script>

<div id="map" style="height: 100vh; width: 100vw;"></div>

<style>
  #map {
    position: absolute;
    inset: 0;
    height: 100vh;
    width: 100vw;
    z-index: 0;
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
