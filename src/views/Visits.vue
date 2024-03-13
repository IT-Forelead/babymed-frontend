<script setup>
import { computed, ref, reactive } from '@vue/reactivity'
import { onMounted } from 'vue'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import ArrowDownIcon from '../assets/icons/ArrowDownIcon.vue'
import VisitsReportItem from '../components/Items/VisitsReportItem.vue'
import { parseJwt } from '../mixins/utils.js'
import { useModalStore } from '../store/modal.store'
import { useVisitStore } from '../store/visit.store'
import { useDropStore } from '../store/drop.store'
import { usePatientStore } from '../store/patient.store'
import { onClickOutside } from '@vueuse/core'
import { cleanObjectEmptyFields } from '../mixins/utils'
import SelectOptionPatient from '../components/Inputs/SelectOptionPatient.vue'
import SelectOptionPaymentStatus from '../components/Inputs/SelectOptionPaymentStatus.vue'
import PatientService from '../services/patient.service'
import VisitService from '../services/visit.service'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const isLoading = ref(false)

const patients = computed(() => {
  return usePatientStore().patients
})

const selectedPatient = computed(() => {
  return useDropStore().selectPatientOption
})

const selectPaymentStatus = computed(() => {
  return useDropStore().selectPaymentStatusOption
})

const total = ref(1)
const visits = computed(() => {
  return useVisitStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(0)
const payload = ref({})

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 10 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 10 + additional >= page) {
    VisitService.getVisits(
      cleanObjectEmptyFields({
        patientId: selectedPatient.value?.patient?.id,
        paymentStatus: selectPaymentStatus.value?.id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page: page,
        limit: 30,
      })
    )
      .then((result) => {
        total.value = result?.total
        useVisitStore().setPatients(result?.data)
        $state.loaded()
      })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

const filterData = reactive({
  userId: '',
  patientId: '',
  serviceTypeId: '',
  serviceId: '',
  paymentStatus: '',
  startDate: '',
  endDate: '',
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

onMounted(() => {
  useVisitStore().clearStore()
})

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const submitFilterData = () => {
  isLoading.value = true
  VisitService.getVisits(
    cleanObjectEmptyFields({
      patientId: selectedPatient.value?.patient?.id,
      paymentStatus: selectPaymentStatus.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useVisitStore().clearStore()
    useVisitStore().setPatients(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

onMounted(() => {
  payload.value = parseJwt()
  localStorage.removeItem('visitCreatedAt')
  localStorage.removeItem('patientFullname')
  localStorage.removeItem('patientBirthday')
  localStorage.removeItem('patientAddress')
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('visitsReport') }}</p>
      <div class="flex items-center space-x-3">
        <div class="relative" ref="dropdown">
          <div @click="useModalStore().toggleFilterBy()" class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer">
            <FilterIcon class="w-5 h-5 text-gray-400" />
            {{ $t('filter') }}
          </div>
          <div v-if="useModalStore().isOpenFilterBy" class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
            <div>
              <p>{{ $t('selectPatient') }}</p>
              <SelectOptionPatient />
            </div>
            <div>
              <p>{{ $t('selectPaymentStatus') }}</p>
              <SelectOptionPaymentStatus />
            </div>
            <div class="flex items-center space-x-1">
              <label for="">
                {{ $t('from') }}
                <input v-model="filterData.startDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
              <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" />
              <label for="">
                {{ $t('to') }}
                <input v-model="filterData.endDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
            </div>
            <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
              <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('loading') }}</span>
            </div>
            <div v-else @click="submitFilterData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
              <span>{{ $t('filter') }}</span>
            </div>
          </div>
        </div>
        <div @click="useModalStore().openAddVisitModal()" v-if="navigationGuard(['admin', 'super_manager', 'tech_admin'])" class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
          <p class="text-base">+ {{ $t('addVisit') }}</p>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 patients-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('patient') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('service') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <VisitsReportItem :patients="visits" :distance="distance" :target="target" @infinite="loadPatients" />
        </tbody>
      </table>
      <div v-if="visits.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
