<script setup>
import { computed, reactive, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import moment from 'moment'
import { onMounted, watch } from 'vue'
import FilterIcon from '../../assets/icons/FilterIcon.vue'
import MoneyBagIconm from '../../assets/icons/MoneyBagIcon.vue'
import MoneyExchangeIcon from '../../assets/icons/MoneyExchangeIcon.vue'
import DailyExpenseReportItem from '../Items/DailyExpenseReportItem.vue'
import SelectOptionDataRange from '../Inputs/SelectOptionDataRange.vue'
import { cleanObjectEmptyFields } from '../../mixins/utils'
import CheckupExpenseService from '../../services/checkupExpenses.service'
import UserService from '../../services/user.service'
import { useCheckupExpenseStore } from '../../store/checkupExpense.store'
import { useDropStore } from '../../store/drop.store'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

const isLoading = ref(false)

const checkupExpensesSummary = computed(() => {
  return useCheckupExpenseStore().checkupExpensesSummary
})

const selectDateRangeOption = computed(() => {
  return useDropStore().selectDateRangeOption
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  userId: '',
  serviceId: '',
  startDate: '',
  endDate: '',
})

watch(
  () => useDropStore().selectDateRangeOption,
  (data) => {
    if (data?.id === 'today') {
      filterData.startDate = moment().startOf('day').format().toString().slice(0, 19)
      filterData.endDate = moment().endOf('day').format().toString().slice(0, 19)
    } else if (data?.id === 'yesterday') {
      filterData.startDate = moment().subtract(1, 'days').startOf('day').format().toString().slice(0, 19)
      filterData.endDate = moment().subtract(1, 'days').endOf('day').format().toString().slice(0, 19)
    } else if (data?.id === 'weekly') {
      filterData.startDate = moment().startOf('isoWeek').format().toString().slice(0, 19)
      filterData.endDate = moment().endOf('isoWeek').format().toString().slice(0, 19)
    } else if (data?.id === 'lastWeek') {
      filterData.startDate = moment().subtract(1, 'weeks').startOf('isoWeek').format().toString().slice(0, 19)
      filterData.endDate = moment().subtract(1, 'weeks').endOf('isoWeek').format().toString().slice(0, 19)
    } else if (data?.id === 'monthly') {
      filterData.startDate = moment().startOf('month').format().toString().slice(0, 19)
      filterData.endDate = moment().endOf('month').format().toString().slice(0, 19)
    } else if (data?.id === 'lastMonth') {
      filterData.startDate = moment().subtract(1, 'months').startOf('month').format().toString().slice(0, 19)
      filterData.endDate = moment().subtract(1, 'months').endOf('month').format().toString().slice(0, 19)
    } else if (data?.id === 'yearly') {
      filterData.startDate = moment().startOf('year').format().toString().slice(0, 19)
      filterData.endDate = moment().endOf('year').format().toString().slice(0, 19)
    } else if (data?.id === 'lastYear') {
      filterData.startDate = moment().subtract(1, 'years').startOf('year').format().toString().slice(0, 19)
      filterData.endDate = moment().subtract(1, 'years').endOf('year').format().toString().slice(0, 19)
    } else if (data?.id === 'anotherDate') {
      filterData.startDate = ''
      filterData.endDate = ''
    }
  }
)

const submitFilterData = () => {
  isLoading.value = true
  CheckupExpenseService.getCheckupExpensesSummary(
    cleanObjectEmptyFields({
      startDate: filterData.startDate,
      endDate: filterData.endDate,
    })
  ).then((res) => {
    useCheckupExpenseStore().clearStore()
    useCheckupExpenseStore().setCheckupExpensesSummary(res)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

onMounted(() => {
  useCheckupExpenseStore().clearStore()
  UserService.getAllDoctors({
    role: 'doctor',
  }).then((res) => {
    useUserStore().setDoctors(res?.data)
  })
  useDropStore().setSelectDateRangeOption('')
  CheckupExpenseService.getCheckupExpensesSummary({
    startDate: moment().startOf('day').format().toString().slice(0, 19),
    endDate: moment().endOf('day').format().toString().slice(0, 19),
  }).then((res) => {
    useCheckupExpenseStore().clearStore()
    useCheckupExpenseStore().setCheckupExpensesSummary(res)
  })
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <router-link to="/checkup-expenses" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
          <MoneyBagIconm class="w-6 h-6 mr-1" />
          {{ $t('checkupExpenses') }}
        </router-link>
        <div>|</div>
        <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
          <MoneyBagIconm class="w-6 h-6 mr-1" />
          {{ $t('checkupExpensesReport') }}
        </div>
        <div>|</div>
        <router-link to="/checkup-expenses/doctor-shares" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
          <MoneyExchangeIcon class="w-5 h-5 mr-1" />
          {{ $t('doctorShares') }}
        </router-link>
      </div>
      <div class="flex items-center space-x-3">
        <div class="relative" ref="dropdown">
          <div @click="useModalStore().toggleFilterBy()" class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer"><FilterIcon class="w-5 h-5 text-gray-400" /> {{ $t('filter') }}</div>
          <div v-if="useModalStore().isOpenFilterBy" class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3 w-96">
            <div>
              <p>{{ $t('chooseDate') }}</p>
              <SelectOptionDataRange />
            </div>
            <div v-if="selectDateRangeOption?.id === 'anotherDate'" class="space-y-3">
              <div>
                {{ $t('from') }}
                <input type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </div>
              <div>
                {{ $t('to') }}
                <input type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
              </div>
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
    <div class="max-h-[77vh] overflow-auto mt-3 daily-expenses-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('doctor') }}</th>
            <th class="py-2 px-4 text-center">
              <div class="grid grid-cols-5 gap-1">
                <div class="col-span-2 text-left">{{ $t('service') }}</div>
                <div class="text-center">{{ $t('doctorShare') }}</div>
                <div class="text-center">{{ $t('visitcount') }}</div>
                <div class="text-center font-bold italic">{{ $t('totalPrice') }}</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <DailyExpenseReportItem :checkupExpensesSummary="checkupExpensesSummary" />
        </tbody>
      </table>
      <div v-if="checkupExpensesSummary?.length === 0" class="w-full pt-4 text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
