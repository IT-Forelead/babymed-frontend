<script setup>
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { useVisitStore } from '../store/visit.store'
import { useModalStore } from '../store/modal.store'
import { onMounted } from 'vue'
import VisitsReportItem from '../components/VisitsReportItem.vue'

const API_URL = import.meta.env.VITE_BASE_URL

const total = ref(1)
const visits = computed(() => {
  return useVisitStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(200)

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 30 == 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    try {
      const response = await fetch(`${API_URL}/visit/report?page=${page}`, {
        method: 'POST',
        body: JSON.stringify({}),
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
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">Visit Reports</p>
      <div class="flex items-center justify-center space-x-3">
        <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
          <option value="" selected>{{ $t('sortBy') }}</option>
          <option value="1">Sort 1</option>
          <option value="2">Sort 2</option>
        </select>
        <div @click="useModalStore().openAddVisitModal()" class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
          <p class="text-base">+ Add Visit</p>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto mt-3 patients-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('patientName') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('phone') }}</th>
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
</template>
<style scoped>
.patients-table-h {
  max-height: 75vh;
}
</style>
