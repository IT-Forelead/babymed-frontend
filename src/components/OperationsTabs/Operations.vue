<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import ArrowDownIcon from '../../assets/icons/ArrowDownIcon.vue'
import FilterIcon from '../../assets/icons/FilterIcon.vue'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'
import MedicalInformationOutlineIcon from '../../assets/icons/MedicalInformationOutlineIcon.vue'
import ServicesIcon from '../../assets/icons/ServicesIcon.vue'
import OperationReportItem from '../../components/Items/OperationReportItem.vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import ExpenseService from '../../services/operationExpenses.service'
import { useExpenseStore } from '../../store/expense.store'
import { useModalStore } from '../../store/modal.store'

const isLoading = ref(false)

const total = ref(1)
const operations = computed(() => {
  return useExpenseStore().operations
})
const target = ref('.expenses-wrapper')
const distance = ref(0)

let page = 0
const loadExpenses = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    ExpenseService.getOperations(
      cleanObjectEmptyFields({
        serviceId: filterData.serviceId,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page: page,
        limit: 30,
      })
    )
      .then((result) => {
        total.value = result?.total
        useExpenseStore().setOperations(result?.data)
        $state.loaded()
      })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  startDate: '',
  endDate: '',
  patientId: '',
  serviceId: '',
})

const submitFilterData = () => {
  isLoading.value = true
  ExpenseService.getOperations(
    cleanObjectEmptyFields({
      serviceId: filterData.serviceId,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useExpenseStore().clearStore()
    useExpenseStore().setOperations(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

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
        <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
          <MedicalInformationOutlineIcon class="w-6 h-6 mr-1" />
          {{ $t('operations') }}
        </div>
        <div>|</div>
        <router-link to="/operations/services" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
          <ServicesIcon class="w-6 h-6 mr-1" />
          {{ $t('operationServices') }}
        </router-link>
      </div>
      <div class="flex items-center space-x-3">
        <div class="relative" ref="dropdown">
          <div @click="useModalStore().toggleFilterBy()" class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer">
            <FilterIcon class="w-5 h-5 text-gray-400" />
            {{ $t('filter') }}
          </div>
          <div v-if="useModalStore().isOpenFilterBy" class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
            <div>
              <p>{{ $t('service') }}</p>
              <select v-model="filterData.serviceId" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                <option value="" selected>{{ $t('selectService') }}</option>
                <option v-for="(service, idx) in operationServices" :key="idx" :value="service?.operationService?.serviceId">
                  {{ service?.service?.name }}
                </option>
              </select>
            </div>
            <div class="flex items-center space-x-1">
              <label for="">
                {{ $t('from') }}
                <input v-model="filterData.startDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
              <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" />
              <label for="">
                {{ $t('to') }}
                <input v-model="filterData.endDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </label>
            </div>
            <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
              <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('loading') }}</span>
            </div>
            <div v-else @click="submitFilterData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
              <span>{{ $t('filter') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 expenses-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('patient') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('service') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <OperationReportItem :operations="operations" :distance="distance" :target="target" @infinite="loadExpenses" />
        </tbody>
      </table>
      <div v-if="operations?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
