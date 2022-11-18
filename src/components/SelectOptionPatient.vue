<script setup>
import { ref } from '@vue/reactivity'
import UserBoldIcon from '../assets/icons/UserBoldIcon.vue'
import { useDropStore } from '../store/drop.store'
import { watch } from 'vue'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import { onClickOutside } from '@vueuse/core'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  options: { type: Array, required: true },
})

const { options } = toRefs(props)

const selectedOption = ref('')
const dropdown = ref(null)

watch(useDropStore(), () => {
  selectedOption.value = useDropStore().selectPatientOption
})

const clearSelectedOptionData = () => {
  useDropStore().setSelectPatientOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closePatientDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectPatientOption(data)
  useDropStore().closePatientDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="useDropStore().openPatientDropDown()" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="selectedOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="selectedOption?.patient?.firstname + ' ' + selectedOption?.patient?.lastname"></div>
      <div v-if="router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard'" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="useDropStore().selectPatientOption?.patient?.firstname + ' ' + useDropStore().selectPatientOption?.patient?.lastname"></div>
      <div @click="useDropStore().openPatientDropDown()" v-if="!selectedOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openPatientDropDown()" v-if="!selectedOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenPatientDropDown && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute p-2 z-20 top-12 shadow max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ option?.patient?.firstname + ' ' + option?.patient?.lastname }}
        </div>
      </div>
    </label>
  </div>
</template>
