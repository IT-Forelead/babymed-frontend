<script setup>
import {computed} from '@vue/reactivity'
import useMoneyFormatter from '../mixins/currencyFormatter'
import {useModalStore} from '../store/modal.store'
import print from 'print-js'
import moment from 'moment'
import {useDropStore} from '../store/drop.store'
import {useI18n} from 'vue-i18n'

const {t} = useI18n()

const printing = () => {
  print({
    printable: 'ticket',
    type: 'html',
    showModal: true,
    font_size: '16px',
    modalMessage: t('preparingCheck'),
    style: `
    * {
      margin: 0;
      padding: 0;
      font-family: "Lucida Console";
    }
    #ticket {
      text-align: center;
      font-size: 40px;
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .margin-y {
      margin: 8px 0;
    }
    table {
      text-align: left;
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
  <div v-if="useModalStore().isOpenPrintModal"
       class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-xs md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="p-1 flex justify-center" id="ticket">
          <div>
            <div class="flex items-center justify-center space-x-3 mb-2 pb-2 header">
              <img src="/cheque_logo.jpg" class="w-[80%]" alt="Logo"/>
            </div>
            <center>
              <p>Многопрофильный медицинский центр</p>
            </center>
            <hr class="margin-y">
            <p class="text-center checkid mx-3">Check No: {{ report?.patientVisit?.id }} </p>
            <h1 class="text-center font-bold checkid">
              {{ report?.patient?.firstname + ' ' + report?.patient?.lastname }}
            </h1>
              <h1>ВНИМАНИЕ!!!</h1>
              <p>Порядок приёма пациентов:</p>
              <span>Сначала проходят пациенты заранее записанные на определённое время. 
                Пациенты ожидающие в живой очереди, будут проходить на приём, после заранее записанных пациентов.
                ПАЦИЕНТОВ НА СКОРОЙ ПОМОЩИ ПРИНИМАЕМ БЕЗ ОЧЕРЕДИ!!!</span>
            <hr class="margin-y">
            <table class="w-full max-w-[255px] mx-auto">
              <tr class="text-sm" v-for="(service, idx) in report.services" :key="idx">
                <td>{{ idx + 1 }}.</td>
                <td class="capitalize">
                  <p>{{ service?.name }}</p>
                  <strong>{{ useMoneyFormatter(service?.price) }}</strong>
                </td>
              </tr>
            </table>
            <hr class="margin-y">
            <p class="text-center px-3 total text-lg">Итоговая цена:</p>
            <h1 class="text-center px-3 font-bold total text-xl total-price">{{ useMoneyFormatter(totalPrice()) }}</h1>
            <p class="text-center px-3 total">Зарегистрировал(а): {{
                report?.userFirstName + ' ' + report?.userLastName
              }}</p>
            <p class="text-center px-3 total">Дата: {{
                moment(report?.patientVisit?.createdAt).format('DD/MM/YYYY h:mm')
              }}</p>
          </div>
        </div>
        <div class="p-3 flex justify-end space-x-2">
          <div @click="closeModal()" class="bg-gray-500 rounded p-1 px-4 text-white cursor-pointer">{{
              $t('close')
            }}
          </div>
          <div @click="printing()" class="bg-green-500 rounded p-1 px-4 text-white cursor-pointer">{{
              $t('print')
            }}
          </div>
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
