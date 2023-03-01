<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import MedicalInformationOutlineIcon from '../../assets/icons/MedicalInformationOutlineIcon.vue'
import ServicesIcon from '../../assets/icons/ServicesIcon.vue'
import AddOperationService from '../../components/Registration/AddOperationService.vue'
import OperationServiceItem from '../../components/Items/OperationServiceItem.vue'
import ExpenseService from '../../services/operationExpenses.service'
import { useExpenseStore } from '../../store/expense.store'

const operationServices = computed(() => {
  return useExpenseStore().operationServices
})

onMounted(() => {
  useExpenseStore().clearStore()
  ExpenseService.getAllOperationServices().then((res) => {
    useExpenseStore().setOperationServices(res)
  })
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <router-link to="/operations" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
          <MedicalInformationOutlineIcon class="w-6 h-6 mr-1" />
          {{ $t('operations') }}
        </router-link>
        <div>|</div>
        <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
          <ServicesIcon class="w-6 h-6 mr-1" />
          {{ $t('operationServices') }}
        </div>
      </div>
    </div>
    <div class="grid grid- grid-cols-3 mt-5 gap-8">
      <div class="max-h-[75vh] overflow-auto xxl:overflow-x-hidden col-span-2">
        <div class="flex items-center p-3">
          <p class="text-3xl font-bold">{{ $t('operationServicesReport') }}</p>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('serviceType') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('service') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('servicePrice') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <OperationServiceItem :operationServices="operationServices" />
          </tbody>
        </table>
      </div>
      <div class="bg-white rounded-lg p-3">
        <p class="text-3xl font-bold mb-3">{{ $t('createOperationService') }}</p>
        <AddOperationService />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
