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
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .margin-y {
      margin: 8px 0;
    }
    .title {
      margin-left: 10px;
    }
    .checkid {
      text-align: center;
    }
    .total {
      text-align: center;
    }`,
  })
}

const closeModal = () => {
  useModalStore().closePrintModal()
}

const report = computed(() => {
  return useDropStore().selectedCheque
})

const totalPrice = () => {
  return report.value?.services.map((s) => s?.price).reduce((s, a) => s + a, 0)
}
</script>
<template>
  <div v-if="useModalStore().isOpenPrintModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xs md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="p-1 flex justify-center" id="ticket">
          <div>
            <div class="flex items-center justify-center space-x-3 mb-2 pb-2 header">
              <img src="/logo.png" class="w-1/4" alt="Logo" />
              <div class="title">
                <h1 class="font-bold whitespace-nowrap">BABY MED HOSPITAL</h1>
                <p style="font-size: 12px">Многопрофильный медицинский центр</p>
              </div>
            </div>
            <hr class="margin-y">
            <p class="text-center checkid mx-3">Check No: {{ report?.patientVisits[0]?.chequeId }}</p>
            <h1 class="text-center font-bold checkid">
              {{ report?.patient?.firstname + ' ' +  report?.patient?.lastname }}
            </h1>
            <hr class="margin-y">
            <table class="w-full max-w-[255px] mx-auto">
              <tbody>
                <tr class="text-sm" v-for="(service, idx) in report.services" :key="idx">
                  <td>{{ idx + 1}}.</td>
                  <td class="capitalize">
                    <span class="text-base">{{ service?.name }}</span>
                  <br>
                  <b>{{ useMoneyFormatter(service?.price) }}</b>
                </td>
                </tr>
              </tbody>
            </table>
            <hr class="margin-y">
            <p class="text-center px-3 total text-lg">Итоговая цена:</p>
            <h1 class="text-center px-3 font-bold total text-xl total-price">{{ useMoneyFormatter(totalPrice()) }}</h1>
            <p class="text-center px-3 total">Зарегистрировал(а): {{ report?.userFirstName + ' ' +  report?.userLastName }}</p>
            <p class="text-center px-3 total">Дата: {{ moment(report?.patientVisits[0]?.createdAt).format('DD/MM/YYYY h:mm') }}</p>
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
</style>
