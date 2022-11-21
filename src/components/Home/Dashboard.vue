<script setup>
import StatisticsSection from './Statistics/StatisticsSection.vue'
import Registration from './Registration.vue'
import ReportItem from '../ReportItem.vue'
import authHeader from '../../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { usePatientStore } from '../../store/patient.store'
import { onMounted } from 'vue'

const API_URL = import.meta.env.VITE_BASE_URL

const total = ref(1)
const patients = computed(() => {
  return usePatientStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(200)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 30 == 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    try {
      const response = await fetch(`${API_URL}/patient/report?page=${page}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json?.total
      setTimeout(() => {
        // patients.value.push(...json?.data)
        usePatientStore().setPatients(json?.data)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

onMounted(() => {
  usePatientStore().clearStore()
})
</script>

<template>
  <StatisticsSection />
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('patientsReport') }}</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
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
          <ReportItem :patients="patients" :distance="distance" :target="target" @infinite="loadPatients" />
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
