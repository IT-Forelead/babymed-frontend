<script setup>
import { computed } from '@vue/reactivity'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { useDropStore } from '../../store/drop.store'
import { useModalStore } from '../../store/modal.store'

const expense = computed(() => {
  return useDropStore().selectedExpense
})
const expenseItems = computed(() => {
  return useDropStore().selectedExpenseItems
})

const closeModal = () => {
  useModalStore().closeOperationExpenseInfoModal()
  useDropStore().setSelectedExpense({})
  useDropStore().setSelectedExpenseItems([])
}

const calculateTotalExpense = (expense) => {
  let expensesTotal = expense?.operationExpense?.forLaboratory + expense?.operationExpense?.forTools + expense?.operationExpense?.forDrugs + expense?.operationExpense?.partnerDoctorPrice
  let allDoctorsPriceTotal = expenseItems.value?.map((i) => i?.item?.price).reduce((s, a) => s + a, 0)
  return expensesTotal + allDoctorsPriceTotal || 0
}
</script>
<template>
  <div v-if="useModalStore().isOpenOperationExpenseInfo" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="bg-lime-300 flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">{{ $t('operationExpence') }}</div>
          </div>
          <button @click="closeModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-6">
          <h1 class="text-xl font-bold">{{ $t('patient') }}:</h1>
          <ul class="border-b mb-3 pb-3">
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('patientFullName') }}:</p>
              <p class="capitalize">{{ expense?.patient?.firstname + ' ' + expense?.patient?.lastname }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('patientPhone') }}:</p>
              <p>{{ expense?.patient?.phone }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('service') }}:</p>
              <p class="capitalize">{{ expense?.service?.name }}</p>
            </li>
          </ul>
          <h1 class="text-xl font-bold">{{ $t('allExpenses') }}:</h1>
          <ul class="border-b mb-3 pb-3">
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('forLaboratory') }}:</p>
              <p>{{ useMoneyFormatter(expense?.operationExpense?.forLaboratory) }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('forTools') }}:</p>
              <p>{{ useMoneyFormatter(expense?.operationExpense?.forTools) }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('forDrugs') }}:</p>
              <p>{{ useMoneyFormatter(expense?.operationExpense?.forDrugs) }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">
                {{ $t('partnerDoctor') }} <b class="capitalize">{{ expense?.operationExpense?.partnerDoctorFullName }}</b>:
              </p>
              <p>{{ useMoneyFormatter(expense?.operationExpense?.partnerDoctorPrice) }}</p>
            </li>
          </ul>
          <div class="border-dashed pb-3 border-b-2">
            <h1 class="text-xl font-bold mb-3">{{ $t('allDoctors') }}:</h1>
            <table v-if="expenseItems?.length !== 0" class="w-full bg-gray-100 rounded-lg">
              <tr>
                <th>{{ $t('n') }}</th>
                <th class="text-left">{{ $t('doctor') }}</th>
                <th>{{ $t('subRole') }}</th>
                <th>{{ $t('price') }}</th>
              </tr>
              <tr class="text-center divide-y py-5" v-for="(item, idx) in expenseItems" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td class="capitalize text-left">{{ item?.user?.firstname + ' ' + item?.user?.lastname }}</td>
                <td>{{ item?.subRole?.name }}</td>
                <td>{{ useMoneyFormatter(item?.item?.price) }}</td>
              </tr>
            </table>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="text-2xl font-bold">{{ $t('total') }}:</p>
            <p class="text-2xl font-bold">{{ useMoneyFormatter(calculateTotalExpense(expense)) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
