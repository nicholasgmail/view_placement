<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useItemsStore } from '@/stores/items'

const route = useRoute()
const store = useItemsStore()

const item = computed(() =>
    store.items.find(i => i.id === route.params.id)
)
</script>

<template>
  <div v-if="item" class="p-8 max-w-3xl mx-auto">
    <h1 class="text-3xl font-bold mb-4">{{ item.name }}</h1>
    <p class="mb-2">{{ item.description }}</p>
    <p class="text-xl font-semibold">₴{{ item.price }}</p>
    <p class="text-sm">Location: {{ item.location }}</p>
    <p class="text-sm">Coordinates: {{ item.geometry.coordinates.join(', ') }}</p>
    <RouterLink to="/" class="text-blue-500 underline">⬅ Назад</RouterLink>
  </div>

  <div v-else class="p-8 text-red-500">Item not found</div>
</template>
