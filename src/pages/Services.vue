<script setup>
import ReportItem from '../components/ReportItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { usePatientStore } from '../store/patient.store'
import { onMounted } from 'vue'
import { useModalStore } from '../store/modal.store'
import SelectOption from '../components/SelectOptionPatient.vue'
import ServiceItem from '../components/Service/ServiceItem.vue'

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
      const response = await fetch(`${API_URL}/customer/report?page=${page}`, {
        method: 'POST',
        body: JSON.stringify({}),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json?.total
      setTimeout(() => {
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
  <div class="w-full">
    <div class="flex items-center justify-between bg-white rounded-lg p-3">
      <p class="text-3xl font-bold">Services Management</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div>
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-white rounded-lg mt-3 p-3">
        <div>
          <label for="serviceName">
            Service Name
            <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="serviceName" placeholder="Enter service name" />
          </label>
          <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5 p-3" type="button" value="Save Service" />
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto mt-3 patients-wrapper col-span-2 bg-white rounded-lg">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">Service Name</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ServiceItem :services="patients" :distance="distance" :target="target" @infinite="loadPatients" />
          </tbody>
        </table>
        <div v-if="patients.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
