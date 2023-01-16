<script setup>
import { ref } from '@vue/reactivity'
import { watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropStore } from '../store/drop.store'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import { useServicesStore } from '../store/services.store'

const selectedOption = ref('')
const dropdown = ref(null)

watch(useDropStore(), () => {
  selectedOption.value = useDropStore().selectServiceTypeOption
})

const clearSelectedOptionData = () => {
  useDropStore().setSelectServiceTypeOption('')
  useDropStore().setSelectServiceOption('')
  useServicesStore().setServices([])
}

onClickOutside(dropdown, () => {
  useDropStore().closePdfTemplateDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectServiceTypeOption(data)
  useDropStore().closePdfTemplateDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2" v-text="selectedOption?.name"></div>
      <div @click="useDropStore().openPdfTemplateDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openPdfTemplateDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenPdfTemplateDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Uzi namunasi
        </div>
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Dopler namunasi
        </div>
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Oediator namunasi
        </div>
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          Ginekolog namunasi
        </div>
      </div>
    </label>
  </div>
</template>
