<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import ChenronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import { useSidebarStore } from '../store/sidebar.store';
import { computed } from '@vue/runtime-core';
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
</script>
<template>
  <div class="flex h-screen overflow-y-hidden bg-white relative">
    <Sidebar :class="{ 'w-80': isOpen }" class="fixed inset-y-0 z-10 flex flex-col w-20 flex-shrink-0 max-h-screen overflow-hidden transition-all duration-500 transform bg-gray-900 shadow-lg lg:z-auto lg:static lg:shadow-none -translate-x-full lg:translate-x-0" />
    <div @click="useSidebarStore().toggleSidebar()" :class="{ 'left-72': isOpen }" class="absolute z-50 w-7 bg-white h-7 rounded-full flex items-center justify-center ml-4 top-7 cursor-pointer left-12 shadow-lg transition-all duration-500">
      <ChenronRightIcon :class="{ 'rotate-180': isOpen }" class="text-black w-6 h-6 rotate-0 transition-all duration-500" />
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
