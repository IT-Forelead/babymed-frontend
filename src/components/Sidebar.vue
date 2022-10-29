<script setup>
import HomeIcon from '../assets/icons/HomeIcon.vue'
import SettingIcon from '../assets/icons/SettingIcon.vue'
import SignOutIcon from '../assets/icons/SignOutIcon.vue'
import { useSidebarStore } from '../store/sidebar.store';
import { computed } from '@vue/runtime-core';
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
</script>

<template>
  <div class="relative text-white">
    <div :class="{'p-5': isOpen}" class="flex items-center space-x-3 py-3 p-2 transition-all duration-300">
      <div class="bg-gray-700 w-14 h-14 flex items-center justify-center p-2 rounded-full">
        <img src="/vite.svg" alt="" />
      </div>
      <p v-if="isOpen" class="text-xl font-bold">Baby med</p>
    </div>
    <div class="mt-5 h-[475px] overflow-auto p-5">
      <router-link to="/" class="flex items-center space-x-2 hover:bg-slate-600 p-2 py-3 rounded-lg cursor-pointer"
        v-for="i in 10" :key="i">
        <HomeIcon class="w-7 h-7" />
        <p>Dashboard</p>
      </router-link>
    </div>
    <div class="absolute bottom-10 w-full flex justify-center items-center flex-col space-y-2">
      <div class="w-24 h-24 flex items-center justify-center p-2 rounded-full">
        <img src="/vite.svg" alt="hero" class="w-full" />
      </div>
      <div>
        <p class="text-lg font-bold text-gray-400">Babymed Admin</p>
        <p class="text-gray-600">example@gmail.com</p>
      </div>
      <div class="flex items-center justify-center space-x-5">
        <div class="border border-gray-600 rounded-lg p-2 cursor-pointer hover:shadow">
          <SettingIcon class="text-gray-600 h-6 w-6 fill-current" />
        </div>
        <div class="border border-gray-600 rounded-lg p-2 cursor-pointer hover:shadow">
          <SignOutIcon class="text-gray-600 h-6 w-6 fill-current" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>