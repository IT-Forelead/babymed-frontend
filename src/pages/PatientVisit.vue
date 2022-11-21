<script setup>
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { useVisitStore } from '../store/visit.store'
import VisitsReportItem from '../components/VisitsReportItem.vue'
import AddVisit from '../components/AddVisit.vue'
import { useModalStore } from '../store/modal.store'
import { onMounted, watch } from 'vue'
import { useDropStore } from '../store/drop.store'
import useMoneyFormatter from '../mixins/currencyFormatter'

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
          <p class="text-3xl font-bold">{{ $t('createVisit') }}</p>
          <div @click="useModalStore().openModal()" class="bg-black mt-3 text-white rounded-xl p-2.5 px-4 cursor-pointer hover:bg-black/75">
            <p class="text-base">+ {{ $t('addPatient') }}</p>
          </div>
        </div>
        <AddVisit />
      </div>
      <div v-if="Object.keys(selectedDoctor).length !== 0 || Object.keys(selectedPatient).length !== 0 || Object.keys(selectedService).length !== 0" class="bg-white rounded-lg p-3 col-span-2 text-gray-600">
        <h1 class="text-2xl font-bold">{{ $t('patient') }}</h1>
        <div class="border-y-2 border-dashed my-2 p-3">
          <div class="flex justify-between border-b-2 border-dotted py-2">
            <div class="font-medium text-base">{{ $t('patient') }}:</div>
            <div class="text-right text-lg font-semibold text-gray-700">
              <div class="capitalize" v-if="Object.keys(selectedPatient).length !== 0">
                {{ selectedPatient?.patient?.firstname + ' ' + selectedPatient?.patient?.lastname }}
              </div>
              <div v-else class="capitalize">********</div>
              <div v-if="Object.keys(selectedPatient).length !== 0">{{ selectedPatient?.patient?.phone }}</div>
              <div v-if="Object.keys(selectedPatient).length !== 0">{{ selectedPatient?.region?.name + ' ' + selectedPatient?.town?.name }}</div>
              <div class="capitalize" v-if="Object.keys(selectedPatient).length !== 0">{{ selectedPatient?.patient?.address }}</div>
            </div>
          </div>
          <div class="flex justify-between border-b-2 border-dotted py-2">
            <div class="font-bold">{{ $t('doctor') }}:</div>
            <div class="capitalize text-right text-lg font-semibold text-gray-700" v-if="Object.keys(selectedDoctor).length !== 0">
              {{ selectedDoctor?.firstname + ' ' + selectedDoctor?.lastname }} <br />
              {{ selectedDoctor?.phone }}
            </div>
            <div v-else class="capitalize">********</div>
          </div>
          <div class="flex justify-between py-2">
            <div class="font-bold">{{ $t('service') }}:</div>
            <div class="capitalize text-right text-lg font-semibold text-gray-700" v-if="Object.keys(selectedService).length !== 0">
              {{ selectedService?.name }} <br />
              {{ useMoneyFormatter(selectedService?.cost) }}
            </div>
            <div v-else class="capitalize">********</div>
          </div>
        </div>
        <div v-if="Object.keys(selectedService).length !== 0" class="flex items-center justify-between font-bold text-2xl px-3">
          <div>{{ $t('total') }}:</div>
          <div class="text-right font-semibold text-gray-700">
            {{ useMoneyFormatter(selectedService?.cost) }}
          </div>
        </div>
      </div>
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
              <th class="py-3 px-6 text-center">{{ $t('paymentStatus') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('service') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('doctor') }}</th>
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
