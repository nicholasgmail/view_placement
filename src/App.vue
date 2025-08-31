<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

defineProps<{ to: string }>()
function handleClick() {
  const popover = document.getElementById('desktop-menu-solutions')
  if (popover?.hidePopover) popover.hidePopover()
  router.push({ name: props.to })
}

</script>

<template>
  <nav>
    <ul class="flex flex-row">
    <li><router-link :to="{name:'Home'}"> Головна </router-link></li>
    <li><router-link :to="{name:'Map'}"> Карта </router-link></li>
    </ul>
 </nav>
  <!-- Include this script tag or install `@tailwindplus/elements` via npm: -->
  <!-- <script src="https://cdn.jsdelivr.net/npm/@tailwindplus/elements@1" type="module"></script> -->
  <div class="relative">
    <button popovertarget="desktop-menu-solutions" class="inline-flex items-center gap-x-1 text-sm/6 font-semibold">
      <Bars3Icon class="w-6 h-6 "/>
    </button>

    <el-popover id="desktop-menu-solutions" anchor="bottom" popover class="w-screen max-w-max overflow-visible bg-transparent px-0 transition transition-discrete [--anchor-gap:--spacing(5)] backdrop:bg-transparent open:flex data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
      <div class="w-screen h-screen max-w-md flex-auto overflow-hidden bg-gray-800 text-sm/6 outline-1 -outline-offset-1 outline-white/10">
        <div class="relative p-4">
          <button popovertarget="desktop-menu-solutions" class="w-full relative flex items-center justify-end gap-x-1 text-sm/6 font-semibold">
            <XMarkIcon class="w-6 h-6 text-white"/>
          </button>
          <div @click="handleClick"
               class="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-white/5">
            <div class="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
              <HomeIcon class="w-6 h-6 text-white"/>
            </div>
            <div>
              <router-link :to="{name:'Home'}" class="text-white"> Головна <span class="absolute inset-0"></span></router-link>
            </div>
          </div>
          <div @click="handleClick"
              class="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-white/5">
            <div class="mt-1 flex items-center size-11 flex-none items-center justify-center rounded-lg bg-gray-700/50 group-hover:bg-gray-700">
              <MapIcon class="w-6 h-6 text-white"/>
            </div>
            <div>
              <router-link :to="{name:'Map'}" class="text-white"> Карта </router-link>
            </div>
          </div>

        </div>
      </div>
    </el-popover>
  </div>

  <router-view/>

</template>
