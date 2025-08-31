<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import ItemsList from '@/components/ItemsList.vue'
import { ref, onMounted } from 'vue'
import maplibregl from 'maplibre-gl'

const mapContainer = ref<HTMLDivElement | null>(null)
let map: maplibregl.Map

onMounted(() => {
  if (mapContainer.value) {
    map = new maplibregl.Map({
      container: mapContainer.value,
      style: 'https://demotiles.maplibre.org/style.json', // базова карта
      center: [24.0316, 49.8429], // координати Kyiv
      zoom: 1
    })

    // Додаємо контроль масштабування
    map.addControl(new maplibregl.NavigationControl())

    let marker = new Marker({
      color: "#FFFFFF",
      draggable: true
    }).setLngLat([30.5, 50.5])
        .addTo(map);
  }
})
</script>

<template>
  <AppLayout title="Map">
    <div class="w-full h-screen border-t-2 pt-4 px-2 border-gray-500">
      <div class="w-full h-screen  max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="w-full h-screen  bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <div id="map" ref="mapContainer" class="w-full h-screen object-cover"></div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<style>
body { margin: 0; padding: 0; }
html, body, #map { height: 100%; }
</style>
