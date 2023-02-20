<script setup>
import authHeader from '../mixins/auth-header'
import {computed, ref} from '@vue/reactivity'
import {useVisitStore} from '../store/visit.store'
import VisitsReportItem from '../components/Items/VisitsReportItem.vue'
import AddVisit from '../components/Registration/AddVisit.vue'
import {useModalStore} from '../store/modal.store'
import {onMounted, watch} from 'vue'
import {useDropStore} from '../store/drop.store'
import useMoneyFormatter from '../mixins/currencyFormatter'
import AxiosService from "../services/axios.service.js";

const total = ref(1)

const visits = computed(() => {
  return useVisitStore().patients
})

const target = ref('.patients-wrapper')
const distance = ref(0)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 12 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 12 + additional >= page) {
    AxiosService.post("/visit/report", {page: page, limit: 12}, {headers: authHeader()})
        .then((result) => {
          total.value = result?.total
          useVisitStore().setPatients(result?.data)
          $state.loaded()
        }).catch(() => {
      $state.error()
    })
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
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-white rounded-lg p-3">
        <div class="flex items-center justify-between">
          <p class="text-3xl font-bold">{{ $t('createVisit') }}</p>
          <div @click="useModalStore().openModal()"
               class="bg-black mt-3 text-white rounded-xl p-2.5 px-4 cursor-pointer hover:bg-black/75">
            <p class="text-base">+ {{ $t('addPatient') }}</p>
          </div>
        </div>
        <AddVisit/>
      </div>
      <div v-if="Object.keys(selectedPatient).length !== 0 || Object.keys(selectedService).length !== 0"
           class="bg-white rounded-lg p-3 col-span-2 text-gray-600">
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
              <div v-if="Object.keys(selectedPatient).length !== 0">
                {{ selectedPatient?.region?.name + ' ' + selectedPatient?.city?.name }}
              </div>
              <div class="capitalize" v-if="Object.keys(selectedPatient).length !== 0">
                {{ selectedPatient?.patient?.address }}
              </div>
            </div>
          </div>
          <div class="flex justify-between py-2">
            <div class="font-bold">{{ $t('service') }}:</div>
            <div class="capitalize text-right text-lg font-semibold text-gray-700"
                 v-if="Object.keys(selectedService).length !== 0">
              {{ selectedService?.name }} <br/>
              {{ useMoneyFormatter(selectedService?.price) }}
            </div>
            <div v-else class="capitalize">********</div>
          </div>
        </div>
        <div v-if="Object.keys(selectedService).length !== 0"
             class="flex items-center justify-between font-bold text-2xl px-3">
          <div>{{ $t('total') }}:</div>
          <div class="text-right font-semibold text-gray-700">
            {{ useMoneyFormatter(selectedService?.price) }}
          </div>
        </div>
      </div>
      <div v-else class="max-h-[82vh] overflow-auto xxl:overflow-x-hidden patients-wrapper bg-white rounded-lg col-span-2">
        <div class="flex items-center p-3 w-full">
          <p class="text-3xl font-bold">{{ $t('visitsReport') }}</p>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('patientName') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('service') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
          </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
          <VisitsReportItem :patients="visits" :distance="distance" :target="target" @infinite="loadPatients"/>
          </tbody>
        </table>
        <div v-if="visits.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
