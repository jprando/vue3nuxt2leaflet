<template>
    <KeepAlive>
        <div :id="mapId" class="map" />
    </KeepAlive>
</template>

<script setup>
import "leaflet/dist/leaflet.css";

const props = defineProps({
    markers: Array
})

const mapId = ref(`map_`)

if (process.client) {
    let _map
    onMounted(async () => {
        mapId.value = `map_${Date.now()}`
        const { map, tileLayer, marker } = await import("leaflet/src/Leaflet");

        _map = map(mapId.value).setView([51.505, -0.09], 13);

        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(_map);

        for (const { location, title } of props.markers) {
            marker(location, { title })
                .bindPopup(`<strong>${title}</strong><div>${location}<div>`)
                .addTo(_map)
        }
    })
    onUnmounted(() => {
        _map.value.remove()
    })
}
</script>

<style>
.map {
    height: 100vh
}
</style>