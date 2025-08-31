<script setup lang="ts">
import {computed, ref} from 'vue'
import {useItemsStore} from '@/stores/items'

const store = useItemsStore()

const searchQuery = ref('')

const filteredItems = computed(() => {
  if (!searchQuery.value) return store.items
  return store.items.filter(i =>
      i.name.toLowerCase().includes(searchQuery.value.toLowerCase().trim())
  )
})

const currentPage = ref(1)
const pageSize = 3

const totalPages = computed(() =>
    Math.ceil(filteredItems.value.length / pageSize)
)

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredItems.value.slice(start, end)
})

function nextPage() {
  if (currentPage.value < totalPages.value) currentPage.value++
}
function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
</script>

<template>
  <!-- Пошук -->
  <div class="flex mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8">
    <div class="flex max-w-md gap-x-4">
      <input
          v-model="searchQuery"
          type="text"
          placeholder="Пошук"
          class="min-w-0 flex-auto rounded-md border px-3.5 py-2 text-base outline-blue-500 placeholder:text-gray-500 sm:text-sm/6"
      />
    </div>
  </div>

  <!-- Список -->
  <div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">
    <div class="flex flex-wrap justify-between content-around">
      <div
          v-for="n in paginatedItems"
          :key="n.id"
          class="sm:basis-2/6 md:basis-4/12 p-1 overflow-hidden rounded-xl bg-transparent shadow-md"
      >
        <RouterLink
            :to="{ name: 'item-details', params: { id: n.id } }"
            class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-white-800 dark:border-gray-700 dark:hover:bg-gray-400"
        >
          <div class="md:shrink-0">
            <img
                class="h-48 w-full object-cover md:h-full"
                src="https://images.unsplash.com/photo-1637734433731-621aca1c8cb6?auto=format&fit=crop&w=404&q=80"
                alt="Modern building architecture"
            />
          </div>
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {{ n.name }} - ₴{{ n.price }}
          </h5>
          <div class="text-xs">loc: {{ n.location }} | {{ n.geometry.coordinates.join(', ') }}</div>
          <p class="font-normal text-gray-700 dark:text-gray-700">{{ n.description }}</p>
        </RouterLink>
      </div>
    </div>
  </div>

  <!-- Пагінація -->
  <div class="flex justify-center gap-4 mt-6">
    <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      ⬅️ Попередня
    </button>

    <span>Сторінка {{ currentPage }} з {{ totalPages }}</span>

    <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
    >
      Наступна ➡️
    </button>
  </div>
</template>
