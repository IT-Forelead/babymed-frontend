<script setup>
import { ref } from '@vue/reactivity'
import { useDropStore } from '../../store/drop.store'
import {onMounted, watch} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { toRefs } from 'vue'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'

const props = defineProps({
  options: { type: Array, required: true },
})

const { options } = toRefs(props)

const selectedOption = ref('')
const dropdown = ref(null)

onMounted(() => {
  clearSelectedOptionData()
})

watch(useDropStore(), () => {
  selectedOption.value = useDropStore().selectServiceOption
})

const clearSelectedOptionData = () => {
  useDropStore().setSelectServiceOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeServiceDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectServiceOption(data)
  useDropStore().closeServiceDropDown()
}

const searchService = ref('')
const searchResults = ref([])

const getSearchResult = (options) => {
  if (searchService.value) {
    searchResults.value = options.filter((service) => service?.name.toLowerCase().includes(searchService?.value.toLowerCase()))
  } else {
    searchResults.value = []
  }
}

</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption && !useDropStore().isOpenServiceDropDown" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2" v-text="selectedOption?.name"></div>
      <input type="text" v-model="searchService" v-if="useDropStore().isOpenServiceDropDown" v-on:keyup="getSearchResult(options)" class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100" :placeholder="$t('enterServiceName')" />
      <div @click="useDropStore().openServiceDropDown()" v-if="!useDropStore().isOpenServiceDropDown && !selectedOption" class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openServiceDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="!searchService && useDropStore().isOpenServiceDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ option?.name }}
        </div>
        <div v-if="options?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          <p class="text-red-500">{{ $t('serviceError') }}</p>
        </div>
      </div>
      <div v-if="searchService && useDropStore().isOpenServiceDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" v-for="(option, idx) in searchResults" :key="idx" @click="optionClicked(option)">
          {{ option?.name }}
        </div>
        <div v-if="searchResults?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg">
          <p class="text-red-500">{{ $t('serviceNotFound') }}</p>
        </div>
      </div>
    </label>
  </div>
</template>
