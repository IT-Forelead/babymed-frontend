<script setup>
import {onMounted, ref, toRefs} from 'vue'
import MdiCheck from '../../assets/icons/MdiCheck.vue'
import { useMultiSelectStore } from '../../store/multiselect.store'
import { onClickOutside } from '@vueuse/core'
import { useDropStore } from '../../store/drop.store';

const store = useMultiSelectStore()

const multiselect = ref(null)

const props = defineProps({
  options: Object,
  id: String,
})

const searchService = ref('')
const searchResults = ref([])

const getSearchResult = (options) => {
  if (searchService.value) {
    searchResults.value = options.filter((service) => service?.name.toLowerCase().includes(searchService?.value.toLowerCase()))
  } else {
    searchResults.value = []
  }
}

onMounted(() => {
  useMultiSelectStore().clearStore()
})

const { options, id } = toRefs(props)

onClickOutside(multiselect, () => {
  useDropStore().closeServiceDropDown()
})
</script>

<template>
  <div class="relative" ref="multiselect">
    <input type="text" v-model="searchService" v-if="useDropStore().isOpenServiceDropDown" v-on:keyup="getSearchResult(options)"
           class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100" :placeholder="$t('enterServiceName')" />
    <div class="absolute z-10 overflow-y-auto bg-gray-100 border w-full mt-2 p-1 max-h-56 overflow-auto rounded-lg divide-y shadow" :id="id">
      <div v-if="!searchService" v-for="(option, idx) in options" :key="idx" @click="store.setSelectService(option)">
        <div class="flex items-center justify-between p-1 rounded cursor-pointer hover:bg-slate-200">
          {{ option?.name }}
          <MdiCheck v-if="store.selectedServices.includes(option)" class="w-5 h-5 ml-3 text-gray-600" />
        </div>
      </div>
      <div v-if="searchService" v-for="(option, idx) in searchResults" :key="idx" @click="store.setSelectService(option)">
        <div class="flex items-center justify-between p-1 rounded cursor-pointer hover:bg-slate-200">
          {{ option?.name }}
          <MdiCheck v-if="store.selectedServices.includes(option)" class="w-5 h-5 ml-3 text-gray-600" />
        </div>
      </div>
      <div v-if="searchService && searchResults?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
        <p class="text-red-500">{{ $t('serviceNotFound') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
