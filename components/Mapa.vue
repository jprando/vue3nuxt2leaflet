<template>
  <KeepAlive>
    <div :id="mapId" class="map" />
  </KeepAlive>
</template>

<script setup>
import "leaflet/dist/leaflet.css";

const props = defineProps({
  markers: Array,
});

const mapId = ref(`map_`);

if (process.client) {
  let _map;
  const router = useRouter();
  onMounted(async () => {
    mapId.value = `map_${Date.now()}`;

    const { control, map, tileLayer, divIcon, marker } = await import(
      "leaflet/src/Leaflet"
    );
    let markerCenter = null;

    _map = map(mapId.value, {
      zoomControl: false,
      attributionControl: true,
    }).setView([-20.361876858973783, -40.662597119808204], 17);

    _map
      // .on("click", () => {
      // .on("movestart", () => {
      .on("mousedown", () => {
        if (markerCenter) {
          markerCenter.remove();
        }
        const { lat, lng } = _map.getCenter();
        markerCenter = marker([lat, lng], {
          icon: divIcon({
            iconAnchor: [14, 16],
            iconSize: [0, 0],
            className: "makerCenter",
            html: "➕",
          }),
        }).addTo(_map);
      })
      .on("move", () => {
        if (_map && markerCenter) {
          const { lat, lng } = _map.getCenter();
          markerCenter.setLatLng([lat, lng]);
        }
      })
      // .on("moveend", function (ev) {
      .on("mouseup", function (ev) {
        const { lat, lng } = _map.getCenter();
        const zoom = _map.getZoom();
        router.push(`?lat=${lat}&lng=${lng}&z=${zoom}`);
        if (markerCenter) {
          markerCenter.remove();
        }
      });

    control.scale().addTo(_map);
    control
      .zoom({
        zoomOutTitle: "Diminuir zoom",
        zoomInTitle: "Aumentar zoom",
      })
      .addTo(_map);

    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      // preferCanvas: true,
      minZoom: 4,
      maxZoom: 19,
      updateInterval: 30000,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(_map);

    for (const { location, title } of props.markers) {
      marker(location, { title })
        .bindPopup(`<strong>${title}</strong><div>${location}<div>`)
        .addTo(_map);
    }

    _map
      .locate({ enableHighAccuracy: true, watch: true, setView: true })
      .on("locationfound", (ev) => {
        marker(ev.latlng).addTo(_map);
        const { latitude, longitude } = ev;
        router.push(`?lat=${latitude}&lng=${longitude}&z=17`);
        _map.setZoom(17);
      })
      .on("locationerror", () => {
        alert("initial location error");
        _map.setView([-20.361876858973783, -40.662597119808204], 17);
      });
  });
  onUnmounted(() => {
    _map.value.remove();
  });
}
</script>

<style>
.map {
  height: 100vh;
}

.makerCenter {
  padding: 5px;
  /* margin: auto; */
  min-height: 18px;
  min-width: 15px;
  border: solid 4px #0005;
  border-radius: 15px;
}
</style>
