<script setup>
import { ref } from '@vue/reactivity'
import { useDropStore } from '../store/drop.store'
import { watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { toRefs } from 'vue'
import UserBoldIcon from '../assets/icons/UserBoldIcon.vue'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'

const props = defineProps({
  options: { type: Array, required: true },
})

const { options } = toRefs(props)

const selectedOption = ref('')
const dropdown = ref(null)

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
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="useDropStore().openServiceDropDown()" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="selectedOption?.name"></div>
      <div @click="useDropStore().openServiceDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openServiceDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenServiceDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ option?.name }}
        </div>
        <div v-if="options?.length === 0" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize">
          <p class="text-red-500">T{{ $t('serviceError') }}</p>
        </div>
      </div>
    </label>
  </div>
</template>
