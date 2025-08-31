<script setup>
import AppLayout from '@/layouts/AppLayout.vue';
import ItemsList from '@/components/ItemsList.vue'
</script>

<template>
  <AppLayout title="Map">
    <div class="border-t-2 pt-4 px-2 border-gray-500">
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
          <ItemsList/>
        </div>
      </div>
    </div>
  </AppLayout>
</template>
