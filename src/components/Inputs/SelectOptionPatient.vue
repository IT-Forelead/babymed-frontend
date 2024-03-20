<script setup>
import { ref } from '@vue/reactivity'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import { useDropStore } from '../../store/drop.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import { onClickOutside } from '@vueuse/core'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import SearchIcon from '../../assets/icons/SearchIcon.vue'
import { useRouter } from 'vue-router'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import PatientService from '../../services/patient.service'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import { useI18n } from 'vue-i18n'
import SelectOptionPatientItem from '../Items/SelectOptionPatientItem.vue'

const { t } = useI18n()
const router = useRouter()

const dropdown = ref(null)

const clearSelectedOptionData = () => {
  useDropStore().setSelectPatientOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closePatientDropDown()
})

const searchPatient = ref('')
const patients = ref([])
const total = ref(1)
const target = ref('.patients-wrapper2')
const distance = ref(0)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 10 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 10 + additional >= page) {
    PatientService.getPatients(
      cleanObjectEmptyFields({
        patientFirstName: searchPatient.value ? `%${searchPatient.value}%` : '',
        page: page,
        limit: 10,
      })
    ).then((result) => {
      total.value = result?.total
      patients.value.push(...result?.data)
      $state.loaded()
    }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

const getSearchResult = () => {
  if (searchPatient.value) {
    PatientService.getPatients(
      cleanObjectEmptyFields({
        patientFirstName: '%' + searchPatient.value + '%',
        page: 1,
        limit: 10,
      })
    ).then((res) => {
      patients.value = []
      patients.value.push(...res?.data)
      if (!res?.total) {
        notify.info({
          title: searchPatient.value,
          message: t('patientNotFound'),
        })
      }
    })
  } else {
    notify.warning({
      message: t('plsEnterSomething'),
    })
  }
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div @click="useDropStore().openPatientDropDown()" class="w-11 h-11 flex items-center rounded-l-lg justify-center bg-gray-100 cursor-pointer">
        <UserBoldIcon class="w-10 h-10 border-r rounded-lg p-2" />
      </div>
      <div v-if="useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize">
        {{ useDropStore().selectPatientOption?.patient?.firstname + ' ' + useDropStore().selectPatientOption?.patient?.lastname }}
      </div>
      <input type="text" v-model="searchPatient" v-if="useDropStore().isOpenPatientDropDown" class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100" :placeholder="$t('enterPatientName')" />
      <SearchIcon v-if="useDropStore().isOpenPatientDropDown && searchPatient" @click="getSearchResult()" class="w-5 h-5 absolute right-2 cursor-pointer hover:text-red-500" />
      <div v-if="router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard'" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="useDropStore().selectPatientOption?.patient?.firstname + ' ' + useDropStore().selectPatientOption?.patient?.lastname"></div>
      <div @click="useDropStore().openPatientDropDown()" v-if="!useDropStore().isOpenPatientDropDown && !useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openPatientDropDown()" v-if="!useDropStore().isOpenPatientDropDown && !useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-show="useDropStore().isOpenPatientDropDown" class="absolute p-2 z-20 top-12 shadow max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y patients-wrapper2">
        <SelectOptionPatientItem :patients="patients" :distance="distance" :target="target" @infinite="loadPatients" />
      </div>
    </label>
  </div>
</template>
