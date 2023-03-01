<script setup>
import { computed, ref } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useServicesStore } from '../store/services.store'
import { useModalStore } from '../store/modal.store'
import ServiceItem from '../components/Items/ServiceItem.vue'
import 'izitoast/dist/css/iziToast.min.css'
import ServicesService from '../services/services.service'
import { useI18n } from 'vue-i18n'
import {parseJwt} from "../mixins/utils.js";

const { t } = useI18n()

const services = computed(() => {
  return useServicesStore().allServices
})
const payload = ref({})


const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

const getServices = () => {
  ServicesService.getAllServices().then((res) => {
    useServicesStore().setAllServices(res)
  })
  ServicesService.getAllServiceTypes().then((res) => {
    useServicesStore().setServiceTypes(res)
  })
}

onMounted(() => {
  payload.value = parseJwt()
  getServices()
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('servicesReport') }}</p>
      <div class="flex items-center">
        <div @click="useModalStore().openAddServiceModal()" v-if="navigationGuard(['admin', 'super_manager', 'tech_admin'])" class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
          <p class="text-base">{{ $t('createService') }}</p>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 patients-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('serviceType') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('serviceName') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('servicePrice') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <ServiceItem :services="services" />
        </tbody>
      </table>
      <div v-if="services?.length === 0" class="w-full text-center text-red-500 mt-5">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
