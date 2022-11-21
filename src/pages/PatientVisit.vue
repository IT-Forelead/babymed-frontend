<script setup>
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { useVisitStore } from '../store/visit.store'
import VisitsReportItem from '../components/VisitsReportItem.vue'
import AddVisit from '../components/AddVisit.vue'
import { useModalStore } from '../store/modal.store'
import { onMounted, watch } from 'vue'
import { useDropStore } from '../store/drop.store'

const API_URL = import.meta.env.VITE_BASE_URL

const total = ref(1)

const visits = computed(() => {
  return useVisitStore().patients
})

const target = ref('.patients-wrapper')
const distance = ref(10)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 12 == 0 ? 0 : 1
  if (total.value !== 0 && total.value / 12 + additional >= page) {
    try {
      const response = await fetch(`${API_URL}/visit/report`, {
        method: 'POST',
        body: JSON.stringify({
          page: page,
          limit: 12,
        }),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json?.total
      setTimeout(() => {
        useVisitStore().setPatients(json?.data)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}
onMounted(() => {
  useVisitStore().clearStore()
})

const selectedPatient = ref({})

watch(
  () => useDropStore().selectPatientOption,
  (data) => {
    selectedPatient.value = data
  }
)
const selectedDoctor = ref({})

watch(
  () => useDropStore().selectDoctorOption,
  (data) => {
    selectedDoctor.value = data
  }
)
const selectedService = ref({})

watch(
  () => useDropStore().selectServiceOption,
  (data) => {
    selectedService.value = data
  }
)
</script>

<template>
  <div class="w-full p-3">
    <!-- <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('patientsReport') }}</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div> -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-white rounded-lg p-3">
        <div class="flex items-center justify-between">
          <p class="text-3xl font-bold">Add Visits</p>
          <div @click="useModalStore().openModal()" class="bg-black mt-3 text-white rounded-xl p-2.5 px-4 cursor-pointer hover:bg-black/75">
            <p class="text-base">+ {{ $t('addPatient') }}</p>
          </div>
        </div>
        <AddVisit />
      </div>
      <div v-if="Object.keys(selectedDoctor).length !== 0 || Object.keys(selectedPatient).length !== 0 || Object.keys(selectedService).length !== 0" class="bg-white rounded-lg p-3 col-span-2">{{ selectedPatient }} {{ selectedDoctor }} {{ selectedService }}</div>
      <div v-else class="max-h-[82vh] overflow-auto patients-wrapper bg-white rounded-lg col-span-2">
        <div class="flex items-center justify-between p-3">
          <p class="text-3xl font-bold">Visits Report</p>
          <div class="flex items-center justify-center space-x-3">
            <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
              <option value="" selected>{{ $t('sortBy') }}</option>
              <option value="1">Sort 1</option>
              <option value="2">Sort 2</option>
            </select>
          </div>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('patientName') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('createdAt') }}</th>
              <th class="py-3 px-6 text-center">Payment Status</th>
              <th class="py-3 px-6 text-center">Service</th>
              <th class="py-3 px-6 text-center">Doctor</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <VisitsReportItem :patients="visits" :distance="distance" :target="target" @infinite="loadPatients" />
          </tbody>
        </table>
        <div v-if="visits.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
