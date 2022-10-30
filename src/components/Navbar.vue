<script setup>
import SearchIcon from '../assets/icons/SearchIcon.vue'
import BellIcon from '../assets/icons/BellIcon.vue'
</script>

<template>
  <div class="bg-neutral-900 px-5 py-3 flex justify-between items-center">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold">Patient Dashboard</h1>
      <p class="text-gray-500">Welcome Babymed</p>
    </div>
    <div class="flex items-center justify-center space-x-5">
      <div class="relative text-gray-600">
        <input id="search" class="border-none bg-white h-10 pl-11 py-6 rounded-xl text focus:outline-none" type="search" name="search" placeholder="Search" />
        <label for="search" class="cursor-pointer absolute left-3 top-3 mr-4">
          <SearchIcon class="text-gray-600 h-6 w-6 fill-current" />
        </label>
      </div>
      <div class="bg-white rounded-xl p-3 cursor-pointer hover:shadow">
        <BellIcon class="text-gray-600 h-7 w-7 fill-current" />
      </div>
      <div class="bg-black text-white rounded-xl p-3.5 px-7 cursor-pointer hover:bg-black/75">
        <p class="text-base">+ Add Record</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
