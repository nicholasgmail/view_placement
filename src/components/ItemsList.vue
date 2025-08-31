<script setup lang="ts">
import {computed} from 'vue'
import {useItemsStore} from '@/stores/items'
import type {Item} from '@/types/item'

const store = useItemsStore()

let card = store.$state;

const newItem: Item = {
  id: 'itm_003',
  name: 'Meeting Room',
  description: '2h booking',
  price: 600,
  location: 'Kyiv',
  geometry: {type: 'Point', coordinates: [30.52, 50.45]}
}

const kyivItems = computed(() => store.byLocation('Kyiv'))

const numb = 4;
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
    <div class="flex flex-wrap justify-between content-around">
      <div
          v-for="n in card.items" :key="n"
          class="sm:basis-2/6 md:basis-4/12 p-1 overflow-hidden rounded-xl bg-transparent shadow-md">
        <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-400">
          <div class="md:shrink-0">
            <img
                class="h-48 w-full object-cover md:h-full"
                src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80"
                alt="Modern building architecture"
            />
          </div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{n.name}} - ₴{{n.price}}</h5>
          <div class="text-xs">loc: {{ n.location }} | {{ n.geometry.coordinates.join(', ') }}</div>
          <p class="font-normal text-gray-700 dark:text-gray-700">{{n.description}}</p>
        </a>
      </div>
    </div>
  </div>
</template>
