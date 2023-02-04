<script setup>
import authHeader from '../mixins/auth-header'
import {computed, ref} from '@vue/reactivity'
import {useVisitStore} from '../store/visit.store'
import {useModalStore} from '../store/modal.store'
import {onMounted} from 'vue'
import VisitsReportItem from '../components/VisitsReportItem.vue'
import AxiosService from "../services/axios.service.js";
import {parseJwt} from "../mixins/utils.js";

const total = ref(1)
const visits = computed(() => {
  return useVisitStore().patients
})
const target = ref('.patients-wrapper')
const distance = ref(10)
const payload = ref({})

let page = 0
const loadPatients = async ($state) => {
  page++
  let additional = total.value % 10 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 10 + additional >= page) {
    AxiosService.post("/visit/report", {page: page, limit: 10}, {headers: authHeader()})
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

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
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
      <div class="flex items-center">
        <div @click="useModalStore().openAddVisitModal()"
             v-if="navigationGuard(['admin', 'super_manager', 'tech_admin'])"
             class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
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
        <VisitsReportItem :patients="visits" :distance="distance" :target="target" @infinite="loadPatients"/>
        </tbody>
      </table>
      <div v-if="visits.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
