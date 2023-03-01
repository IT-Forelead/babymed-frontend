<script setup>
import { ref } from '@vue/reactivity'
import UserBoldIcon from '../../assets/icons/UserBoldIcon.vue'
import { useDropStore } from '../../store/drop.store'
import { computed } from 'vue'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import { onClickOutside } from '@vueuse/core'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import SearchIcon from '../../assets/icons/SearchIcon.vue'
import { toRefs } from 'vue'
import { useRouter } from 'vue-router'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import PatientService from '../../services/patient.service'
import { usePatientStore } from '../../store/patient.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const props = defineProps({
  options: { type: Array, required: true },
})

const { options } = toRefs(props)

const dropdown = ref(null)

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

const patients = computed(() => {
  return usePatientStore().patients
})

const searchOptionClicked = (phone) => {
  let data = patients.value?.filter((p) => p?.patient?.phone === phone)[0]
  useDropStore().setSelectPatientOption(data)
  useDropStore().closePatientDropDown()
}

const searchPatient = ref('')
const searchResults = ref([])

const getSearchResult = () => {
  if (searchPatient.value) {
    PatientService.getPatientsByFullname(searchPatient.value).then((res) => {
      // usePatientStore().clearStore()
      // usePatientStore().setPatients(res)
      searchResults.value = res
      if (!res?.length) {
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
      <div v-if="useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="useDropStore().selectPatientOption?.patient?.firstname + ' ' + useDropStore().selectPatientOption?.patient?.lastname"></div>
      <input type="text" v-model="searchPatient" v-if="useDropStore().isOpenPatientDropDown" class="relative w-full foucus:ring-0 focus:outline-none border-none rounded-r-lg bg-gray-100" :placeholder="$t('enterPatientName')" />
      <SearchIcon v-if="useDropStore().isOpenPatientDropDown && searchPatient" @click="getSearchResult()" class="w-5 h-5 absolute right-2 cursor-pointer hover:text-red-500" />
      <div v-if="router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard'" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-r-lg pl-2 py-2 capitalize" v-text="useDropStore().selectPatientOption?.patient?.firstname + ' ' + useDropStore().selectPatientOption?.patient?.lastname"></div>
      <div @click="useDropStore().openPatientDropDown()" v-if="!useDropStore().isOpenPatientDropDown && !useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="border-none bg-gray-100 py-2 w-full text-lg rounded-r-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openPatientDropDown()" v-if="!useDropStore().isOpenPatientDropDown && !useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="useDropStore().selectPatientOption && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="searchResults.length === 0 && useDropStore().isOpenPatientDropDown && !(router.currentRoute.value.path === '/patients' || router.currentRoute.value.path === '/dashboard')" class="absolute p-2 z-20 top-12 shadow max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in options" :key="idx" @click="optionClicked(option)">
          {{ option?.patient?.firstname + ' ' + option?.patient?.lastname }}
        </div>
      </div>
      <div v-if="searchResults.length !== 0 && useDropStore().isOpenPatientDropDown" class="absolute p-2 z-20 top-12 shadow max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg capitalize" v-for="(option, idx) in searchResults" :key="idx" @click="searchOptionClicked(option?.phone)">
          {{ option?.firstName + ' ' + option?.lastName }}
        </div>
      </div>
    </label>
  </div>
</template>
