<script setup>
import { ref } from '@vue/reactivity'
import UserBoldIcon from '../assets/icons/UserBoldIcon.vue'
import { useDropStore } from '../store/drop.store'
import { watch } from 'vue'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import { onClickOutside } from '@vueuse/core'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import { toRefs } from 'vue'

const props = defineProps({
  options: { type: Array, required: true },
  whereToUse: { type: String, required: true },
})

const { options, whereToUse } = toRefs(props)

const selectedOption = ref('')
const dropdown = ref(null)

watch(useDropStore(), () => {
  selectedOption.value = useDropStore().selectOption
})

const clearSelectedOptionData = () => {
  useDropStore().setSelectOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeDropDown()
})

const optionClicked = (data) => {
  console.log('OPTION: ', data)
  useDropStore().setSelectOption(data)
  useDropStore().closeDropDown()
}

const open = (data) => {
  console.log(data);
  useDropStore().openDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="open(whereToUse)" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="selectedOption"></div>
      <div @click="open(whereToUse)" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">Select</div>
      <ChevronRightIcon @click="open(whereToUse)" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenDropDown && whereToUse.includes('patients')" class="absolute p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ whereToUse }}
        </div>
      </div>
      <div v-if="useDropStore().isOpenDropDown && whereToUse.includes('doctors')" class="absolute p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ whereToUse }}
        </div>
      </div>
      <div v-if="useDropStore().isOpenDropDown && whereToUse.includes('services')" class="absolute p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ whereToUse }}
        </div>
      </div>
    </label>
  </div>
</template>
