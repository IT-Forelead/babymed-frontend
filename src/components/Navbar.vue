<script setup>
import SearchIcon from '../assets/icons/SearchIcon.vue'
import BellIcon from '../assets/icons/BellIcon.vue'
import Registration from './Home/Registration.vue'
import { computed } from '@vue/reactivity';
import { useRouter } from 'vue-router';

const router = useRouter()

const currentLabel = computed(() => {
  if (router.currentRoute?.value?.path === '/visits') {
    return 'Patients Visit Page'
  } else if (router.currentRoute?.value?.path === '/patients') {
    return 'Patients Page'
  } else if (router.currentRoute?.value?.path === '/payment-visit') {
    return 'Payments & Visits Page'
  }
})
</script>

<template>
  <div class="bg-neutral-900 px-5 py-3 flex justify-between items-center">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold">{{ currentLabel }}</h1>
      <p class="text-gray-500">{{ $t('welcome') }}</p>
    </div>
    <div class="flex items-center justify-center space-x-5">
      <div class="relative text-gray-600">
        <input id="search" class="border-none bg-white h-10 pl-11 py-6 rounded-xl text focus:outline-none" type="search" name="search" :placeholder="$t('search')" />
        <label for="search" class="cursor-pointer absolute left-3 top-3 mr-4">
          <SearchIcon class="text-gray-600 h-6 w-6 fill-current" />
        </label>
      </div>
      <div class="bg-white rounded-xl p-3 cursor-pointer hover:shadow">
        <BellIcon class="text-gray-600 h-7 w-7 fill-current" />
      </div>
      <router-link to="/payment-visit" class="bg-black text-white rounded-xl p-3.5 px-7 cursor-pointer hover:bg-black/75">
        <p class="text-base">+ {{ $t('addRecord') }}</p>
      </router-link>
    </div>
    <!-- Registration Modal (Payment & Patient) -->
    <Registration />
  </div>
</template>

<style scoped></style>
