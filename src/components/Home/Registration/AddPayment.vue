<script setup>
import { ref } from '@vue/reactivity'
import UserBoldIcon from '../../../assets/icons/UserBoldIcon.vue'
import DropItem from './DropItem.vue'
import { useDropStore } from '../../../store/drop.store'
import { watch } from 'vue'
import TimesIcon from '../../../assets/icons/TimesIcon.vue'
import { onClickOutside } from '@vueuse/core'
import ChevronRightIcon from '../../../assets/icons/ChevronRightIcon.vue'

const selectedPatient = ref('')
const dropdown = ref(null)
const sum = ref(0)
const moneyConf = {
  thousands: ' ',
  suffix: ' UZS',
  precision: 0,
}

watch(useDropStore(), () => {
  selectedPatient.value = useDropStore().selectPatient
  search.value = useDropStore().selectPatient
})

const clearSelectedPatientData = () => {
  selectedPatient.value = ''
  useDropStore().setSelectPatient('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeDropDown()
})
</script>
<template>
  <div class="select-none">
    <h1 class="text-lg">Patient</h1>
    <label ref="dropdown" class="flex items-center w-full relative my-3">
      <div @click="useDropStore().openDropDown()" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="selectedPatient" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2" v-text="selectedPatient"></div>
      <div @click="useDropStore().openDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">Select patient</div>
      <ChevronRightIcon @click="useDropStore().openDropDown()" v-if="!selectedPatient" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedPatientData()" v-if="selectedPatient" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenDropDown" class="absolute p-3 z-10 top-12 w-full bg-gray-100 rounded-lg divide-y">
        <DropItem />
      </div>
    </label>
    <h1 class="text-lg">Payment Amount</h1>
    <label class="flex items-center w-full relative my-3">
      <money3 v-model="sum" v-bind="moneyConf" class="border-none text-right text-gray-500 bg-gray-100 rounded-lg w-full text-lg"> </money3>
    </label>
    <hr class="my-3" />
    <div class="rounded-lg bg-blue-600 p-3 text-white text-center cursor-pointer hover:bg-blue-800">Save Payment</div>
  </div>
</template>
