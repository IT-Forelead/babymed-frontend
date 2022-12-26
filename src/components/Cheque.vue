<script setup>
import { computed } from '@vue/reactivity'
import useMoneyFormatter from '../mixins/currencyFormatter'
import { useModalStore } from '../store/modal.store'
import print from 'print-js'

const printing = () => {
  print({
    printable: 'ticket',
    type: 'html',
    style: `
    * {
      margin: 0;
      padding: 0;
    }
    #ticket {
      font-family: 'Courier New', Courier, monospace;
    }
    td {
      vertical-align: top;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid #999;
    }
    .title {
      margin-left: 10px;
    }
    .checkid {
      font-weight: bold;
      margin-top: 5px;
      font-size: 20px;
      text-align: center;
    }
    .total {
      text-align: right;
      border-top: 1px dashed #999;
      padding: 5px;
    }`,
  })
}

const closeModal = () => {
  useModalStore().closePrintModal()
  // useDropStore().setSelectedExpense({})
  // useDropStore().setSelectedExpenseItems([])
}

// const calculateTotalExpense = (expense) => {
//   let expensesTotal = expense?.operationExpense?.forLaboratory + expense?.operationExpense?.forTools + expense?.operationExpense?.forDrugs + expense?.operationExpense?.partnerDoctorPrice
//   let allDoctorsPriceTotal = expenseItems.value?.map((i) => i?.item?.price).reduce((s, a) => s + a, 0)
//   return expensesTotal + allDoctorsPriceTotal || 0
// }
</script>
<template>
  <div v-if="useModalStore().isOpenPrintModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xs md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="p-1 flex justify-center" id="ticket">
          <div>
            <div class="flex items-center justify-center space-x-3 border-b-2 border-gray-500 mb-2 pb-2 header">
              <img src="/logo.png" class="w-1/4" alt="Logo" />
              <div class="title">
                <h1 class="font-bold whitespace-nowrap">BABYMED HOSPITAL</h1>
                <p style="font-size: 12px;">Lorem ipsum dolor sit.</p>
              </div>
            </div>
            <p class="text-center font-bold checkid">Check No: 26da88ba-b9b3-458b-91d5-1fe33a751843</p>
            <p class="text-center font-bold checkid">Sharipov Ism Familiya qizi</p>
            <table class="w-full max-w-[255px] mx-auto border-b-2 border-dashed">
              <thead class="border-y-2 border-dashed">
                <tr>
                  <th>No</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in 5" :key="i">
                  <td>{{ i }}.</td>
                  <td>ARDUINO {{ i }}</td>
                  <td>{{ 1000 * i }} UZS</td>
                </tr>
              </tbody>
            </table>
            <h1 class="text-right px-3 font-bold total">TOTAL: 500 000.00 UZS</h1>
            <p class="text-right px-3 total">12.05.2021 16:35:03</p>
          </div>
        </div>
        <div class="p-3 flex justify-end space-x-2">
          <div @click="closeModal()" class="bg-gray-500 rounded-lg p-2 text-white cursor-pointer text-xs">Close</div>
          <div @click="printing()" class="bg-green-500 rounded-lg p-2 text-white cursor-pointer text-xs">Print</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#ticket {
  font-family: 'Courier New', Courier, monospace;
}
td {
  vertical-align: top;
}
</style>
