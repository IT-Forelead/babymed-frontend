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
              <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
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
