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
      style: {
        'version': 8,
        'sources': {
          'raster-tiles': {
            'type': 'raster',
            'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            'tileSize': 256,
            'minzoom': 0,
            'maxzoom': 19
          }
        },
        'layers': [
          {
            'id': 'simple-tiles',
            'type': 'raster',
            'source': 'raster-tiles',
            'attribution': "© OpenStreetMap contributors",
          }
        ],
        'id': 'blank'
      },
      center: [30.5238, 50.4547],
      zoom: 6
    })

    map.addControl(new maplibregl.NavigationControl())

    const popup = new maplibregl.Popup({offset: 25}).setHTML(
        '<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">\n' +
        '  <svg class="size-12 shrink-0" viewBox="0 0 40 40"><defs><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="a"><stop stop-color="#2397B3" offset="0%"></stop><stop stop-color="#13577E" offset="100%"></stop></linearGradient><linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="b"><stop stop-color="#73DFF2" offset="0%"></stop><stop stop-color="#47B1EB" offset="100%"></stop></linearGradient></defs><g fill="none" fill-rule="evenodd"><path d="M28.872 22.096c.084.622.128 1.258.128 1.904 0 7.732-6.268 14-14 14-2.176 0-4.236-.496-6.073-1.382l-6.022 2.007c-1.564.521-3.051-.966-2.53-2.53l2.007-6.022A13.944 13.944 0 0 1 1 24c0-7.331 5.635-13.346 12.81-13.95A9.967 9.967 0 0 0 13 14c0 5.523 4.477 10 10 10a9.955 9.955 0 0 0 5.872-1.904z" fill="url(#a)" transform="translate(1 1)"></path><path d="M35.618 20.073l2.007 6.022c.521 1.564-.966 3.051-2.53 2.53l-6.022-2.007A13.944 13.944 0 0 1 23 28c-7.732 0-14-6.268-14-14S15.268 0 23 0s14 6.268 14 14c0 2.176-.496 4.236-1.382 6.073z" fill="url(#b)" transform="translate(1 1)"></path><path d="M18 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM24 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM30 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#FFF"></path></g></svg>\n' +
        '  <div>\n' +
        '    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>\n' +
        '    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>\n' +
        '  </div>\n' +
        '</div>'
    );

    // create DOM element for the marker
    const el = document.createElement('div');
    el.id = 'marker';

    const marker = new maplibregl.Marker()
        .setLngLat([30.5238, 50.4547])
        .setPopup(popup)
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
