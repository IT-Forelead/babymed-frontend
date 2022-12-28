<script setup>
import { computed } from '@vue/reactivity'
import useMoneyFormatter from '../mixins/currencyFormatter'
import { useModalStore } from '../store/modal.store'
import print from 'print-js'
import moment from 'moment'
import { useDropStore } from '../store/drop.store'

const printing = () => {
  print({
    printable: 'ticket',
    type: 'html',
    showModal: true,
    modalMessage: 'Preparing check...',
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
      margin-top: 5px;
      text-align: center;
    }
    .total {
      text-align: center;
      margin-right: 5px;
    }
    .total1 {
      border-top: 1px dashed #999;
      padding-top: 5px;
    }
    .total2 {
      border-bottom: 1px dashed #999;
    }`,
  })
}

const closeModal = () => {
  useModalStore().closePrintModal()
}

const services = computed(() => {
  return useDropStore().selectedCheque
})

const totalPrice = () => {
  return services.value?.map((s) => s?.price).reduce((s, a) => s + a, 0)
}
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
                <h1 class="font-bold whitespace-nowrap">BABY MED HOSPITAL</h1>
                <p style="font-size: 12px">Многопрофильный медицинский центр</p>
              </div>
            </div>
            <p class="text-center checkid mx-3">Check No: 26da88ba-b9b3-458b-91d5-1fe33a751843</p>
            <h1 class="text-center font-bold checkid">Sharipov Familiya</h1>
            <table class="w-full max-w-[255px] mx-auto border-b-2 border-dashed">
              <thead class="border-y-2 border-dashed">
                <tr>
                  <th>№</th>
                  <th>Услуг</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(service, idx) in services" :key="idx">
                  <td>{{ idx }}.</td>
                  <td class="capitalize">{{ service?.name }}</td>
                  <td>{{ useMoneyFormatter(service?.price) }}</td>
                </tr>
              </tbody>
            </table>
            <h1 class="text-center px-3 font-bold total total1">Итоговая цена: {{ useMoneyFormatter(totalPrice) }}</h1>
            <p class="text-center px-3 total">Зарегистрировал: Admin Adminov</p>
            <p class="text-center px-3 total total2">Дата: {{ moment(moment.now()).format('MM.DD.YYYY hh:mm') }}</p>
          </div>
        </div>
        <div class="p-3 flex justify-end space-x-2">
          <div @click="closeModal()" class="bg-gray-500 rounded p-1 px-4 text-white cursor-pointer">Close</div>
          <div @click="printing()" class="bg-green-500 rounded p-1 px-4 text-white cursor-pointer">Print</div>
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
