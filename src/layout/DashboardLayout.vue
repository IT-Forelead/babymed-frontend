<script lang="js" setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import ChenronRightIcon from '../assets/icons/ChenronRightIcon.vue'
import { useSidebarStore } from '../store/sidebar.store';
import { computed } from '@vue/runtime-core';
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
</script>
<template>
  <div class="flex h-screen overflow-y-hidden bg-white relative">
    <Sidebar :class="{ 'w-20': !isOpen }" class="fixed inset-y-0 z-10 flex flex-col flex-shrink-0 w-80 max-h-screen overflow-hidden transition-all duration-500 transform bg-neutral-900 shadow-lg lg:z-auto lg:static lg:shadow-none -translate-x-full lg:translate-x-0" />
    <div @click="useSidebarStore().toggleSidebar()" :class="{ 'left-12': !isOpen }" class="absolute z-50 w-7 bg-white h-7 rounded-full flex items-center justify-center ml-4 top-7 cursor-pointer left-72 shadow-lg transition-all duration-500">
      <ChenronRightIcon :class="{ 'rotate-0': !isOpen }" class="text-black w-6 h-6 rotate-180 transition-all duration-500" />
    </div>
    <div class="flex flex-col flex-1 h-full overflow-hidden">
      <Navbar class="w-full bg-slate-100 sticky top-0 z-10" />
      <div class="flex-1 max-h-full p-5 overflow-hidden overflow-y-scroll bg-slate-100">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>
