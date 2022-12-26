<script setup>
import { computed } from '@vue/reactivity'
import useMoneyFormatter from '../mixins/currencyFormatter'
import { useModalStore } from '../store/modal.store'
import print from 'print-js'

const printing = () => {
  print('ticket', 'html')
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
        <div class="flex justify-center" id="ticket">
          <div class="ticket">
            <img src="/logo.png" alt="Logo" />
            <p class="centered">BABYMED</p>
            <table>
              <thead>
                <tr>
                  <th class="quantity">No</th>
                  <th class="description">Description</th>
                  <th class="price">$$</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="quantity">1.</td>
                  <td class="description">ARDUINO</td>
                  <td class="price">$25.00</td>
                </tr>
                <tr>
                  <td class="quantity">2.</td>
                  <td class="description">JAVASCRIPT</td>
                  <td class="price">$10.00</td>
                </tr>
                <tr>
                  <td class="quantity">3.</td>
                  <td class="description">STICKER PACK</td>
                  <td class="price">$10.00</td>
                </tr>
                <tr>
                  <td class="quantity"></td>
                  <td class="description">TOTAL</td>
                  <td class="price">$55.00</td>
                </tr>
              </tbody>
            </table>
            <p class="centered">Thanks for your purchase! <br />parzibyte.me/blog</p>
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
td,
th,
tr,
table {
  border-top: 1px dashed black;
  border-collapse: collapse;
}

td.description,
th.description {
  width: 90px;
  max-width: 90px;
}

td.quantity,
th.quantity {
  width: 20px;
  max-width: 20px;
  word-break: break-all;
}

td.price,
th.price {
  width: 40px;
  max-width: 40px;
  word-break: break-all;
}

.centered {
  text-align: center;
  align-content: center;
}

.ticket {
  font-size: 12px;
  width: 155px;
  max-width: 155px;
}

img {
  max-width: inherit;
  width: inherit;
}
</style>
