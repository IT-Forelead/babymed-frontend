<script setup>
import { useModalStore } from '../store/modal.store'
import { useTabStore } from '../store/tab.store'
import { useAddressStore } from '../store/address.store'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import AddPatient from './Registration/AddPatient.vue'
import { onMounted } from 'vue'
import AddressService from '../services/address.service'
import { computed } from '@vue/reactivity'

onMounted(() => {
  AddressService.getAllRegions()
    .then((res) => {
      useAddressStore().setRegions(res)
    })
    .catch((err) => {
      console.log('ERR: ', err)
    })
})

const regions = computed(() => {
  return useAddressStore().regions
})
</script>
<template>
  <div v-if="useModalStore().isModalOpen" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div :class="useTabStore().isOpenFirstTab ? 'max-w-4xl' : 'max-w-xl'" class="relative p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div @click="useTabStore().openFirstTab()" :class="useTabStore().isOpenFirstTab ? 'bg-lime-300' : 'bg-gray-200 text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">{{ $t('addPatient') }}</div>
            <!-- <div @click="useTabStore().openSecondTab()" :class="useTabStore().isOpenSecondTab ? 'bg-lime-300' : 'bg-gray-200 text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">{{ $t('addPayment') }}</div> -->
          </div>
          <button @click="useModalStore().closeModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-6">
          <div v-if="useTabStore().isOpenFirstTab">
            <AddPatient :regions="regions" />
          </div>
          <!-- <div v-if="useTabStore().isOpenSecondTab">
            <AddPayment />
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
