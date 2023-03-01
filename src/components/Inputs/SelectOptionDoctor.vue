<script setup>
import { ref } from '@vue/reactivity'
import {watch, toRefs, onMounted} from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropStore } from '../../store/drop.store'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
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
  selectedOption.value = useDropStore().selectDoctorOption
})

const clearSelectedOptionData = () => {
  useDropStore().setSelectDoctorOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeDoctorDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectDoctorOption(data)
  useDropStore().closeDoctorDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="useDropStore().openDoctorDropDown()" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="selectedOption?.firstname + ' ' + selectedOption?.lastname"></div>
      <div @click="useDropStore().openDoctorDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openDoctorDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenDoctorDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ option?.firstname + ' ' + option?.lastname }}
        </div>
      </div>
    </label>
  </div>
</template>
