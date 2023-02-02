<script setup>
import { useModalStore } from '../store/modal.store'
import TimesIcon from '../assets/icons/TimesIcon.vue'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import DailyExpenseReportItem from './DailyExpenseReportItem.vue'
import { useCheckupExpenseStore } from '../store/checkupExpense.store'

const { t } = useI18n()

const dailyCheckupExpenses = computed(() => {
  return useCheckupExpenseStore().dailyCheckupExpenses
})

</script>

<template>
  <div v-if="useModalStore().isOpenDailyExpenseModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-5xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="text-xl font-medium">{{ $t('dailyExpenses') }}</div>
          </div>
          <button @click="useModalStore().closeDailyExpenseModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-4 space-y-5">
          <div class="max-h-[77vh] overflow-auto mt-3 expenses-wrapper">
            <table class="min-w-max w-full table-auto">
              <thead class="sticky z-10 top-0 bg-white shadow">
                <tr class="text-gray-600 capitalize text-lg leading-normal">
                  <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
                  <th class="py-2 px-4 text-left">{{ $t('doctor') }}</th>
                  <th class="py-2 px-4 text-center">{{ $t('visitcount') }}</th>
                  <th class="py-2 px-4 text-center">{{ $t('totalPrice') }}</th>
                </tr>
              </thead>
              <tbody class="text-gray-600 text-sm font-light">
                <DailyExpenseReportItem :dailyCheckupExpenses="dailyCheckupExpenses" :distance="distance" :target="target" @infinite="loadExpenses" />
              </tbody>
            </table>
            <div v-if="dailyCheckupExpenses?.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
          </div>
          <div class="flex items-center justify-end space-x-3 mt-5 text-white">
            <div @click="useModalStore().closeDailyExpenseModal()" class="rounded-lg p-3 px-7 bg-gray-900 hover:bg-gray-700 cursor-pointer">{{ $t('close') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
