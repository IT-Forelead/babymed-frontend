<script setup>
import { computed } from '@vue/reactivity'
import { useServicesStore } from '../store/services.store'
import { onMounted } from 'vue'
import ServiceItem from '../components/Service/ServiceItem.vue'
import ServicesService from '../services/services.service'

const services = computed(() => {
  return useServicesStore().services
})

onMounted(() => {
  ServicesService.getAllServices().then((res) => {
    console.log(res);
    useServicesStore().setServices(res)
  })
})
</script>

<template>
  <div class="w-full">
    <div class="flex items-center justify-between bg-white rounded-lg p-3">
      <p class="text-3xl font-bold">{{$t('serviceManagment')}}</p>
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
            {{$t('serviceName')}}
            <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5" type="text" id="serviceName" placeholder="Enter service name" />
          </label>
          <input class="border-none text-gray-500 bg-gray-100 rounded-lg w-full text-lg mb-5 p-3" type="button" value="Save Service" />
        </div>
      </div>
      <div class="max-h-[77vh] overflow-auto mt-3 col-span-2 bg-white rounded-lg">
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">{{$t('ServiceName')}}</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <ServiceItem :services="services" />
          </tbody>
        </table>
        <div v-if="services.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
