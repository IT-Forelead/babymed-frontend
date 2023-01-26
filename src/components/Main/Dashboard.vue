<script setup>
import StatisticsSection from './Statistics/StatisticsSection.vue'
import ReportItem from '../ReportItem.vue'
import authHeader from '../../mixins/auth-header'
import {computed, ref} from '@vue/reactivity'
import {usePatientStore} from '../../store/patient.store'
import {onMounted} from 'vue'
import AxiosService from "../../services/axios.service.js";

const total = ref(1)
const patients = computed(() => {
  return usePatientStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(200)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    AxiosService.post("/patient/report", {page: page, limit: 30}, {headers: authHeader()})
        .then((result) => {
          total.value = result?.total
          usePatientStore().setPatients(result?.data)
          $state.loaded()
        }).catch(() => {
      $state.error()
    })
  } else $state.loaded()
}

onMounted(() => {
  usePatientStore().clearStore()
})
</script>

<template>
  <StatisticsSection/>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center">
      <p class="text-3xl font-bold">{{ $t('patientsReport') }}</p>
    </div>
    <div class="h-80 overflow-auto mt-3 patients-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
        <tr class="text-gray-600 capitalize text-lg leading-normal">
          <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
          <th class="py-3 px-6 text-left">{{ $t('patientName') }}</th>
          <th class="py-3 px-6 text-left">{{ $t('phone') }}</th>
          <th class="py-3 px-6 text-center">{{ $t('createdAt') }}</th>
          <th class="py-3 px-6 text-center">{{ $t('address') }}</th>
          <th class="py-3 px-6 text-center">{{ $t('birthday') }}</th>
          <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
        </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
        <ReportItem :patients="patients" :distance="distance" :target="target" @infinite="loadPatients"/>
        </tbody>
      </table>
      <div v-if="patients.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped>
.patients-table-h {
  max-height: 75vh;
}
</style>
