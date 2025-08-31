<script setup lang="ts">
import {computed, reactive, ref, watch} from 'vue'
import {useItemsStore} from '@/stores/items'

const store = useItemsStore()

let card = store.$state;
let filteredItems = ref('');

filteredItems = card.items

const searchQuery = defineModel({
  get(value: string) {
    return value?.toLowerCase().trim() ?? ''
  },
  set(value: string, modifiers) {
    if (modifiers?.capitalize && value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  }
});

watch(searchQuery, (newVal) => {
  filteredItems = card.items.filter(i => i.name.toLowerCase().includes(newVal));
})
</script>

<template>
  <div class="flex mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8">
    <div class="flex max-w-md gap-x-4">
      <input id="search" name="search" type="text"
             v-model="searchQuery"
             class="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base outline-1 -outline-offset-1 outline-blue-500 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
             placeholder="Пошук" />
    </div>
  </div>
  <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
    <div class="flex flex-wrap justify-between content-around">
      <div
          v-for="n in filteredItems" :key="n.id"
          class="sm:basis-2/6 md:basis-4/12 p-1 overflow-hidden rounded-xl bg-transparent shadow-md">
        <a href="#"
           class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-400">
          <div class="md:shrink-0">
            <img
                class="h-48 w-full object-cover md:h-full"
                src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=404&q=80"
                alt="Modern building architecture"
            />
          </div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ n.name }} - ₴{{ n.price }}</h5>
          <div class="text-xs">loc: {{ n.location }} | {{ n.geometry.coordinates.join(', ') }}</div>
          <p class="font-normal text-gray-700 dark:text-gray-700">{{ n.description }}</p>
        </a>
      </div>
    </div>
  </div>
</template>
