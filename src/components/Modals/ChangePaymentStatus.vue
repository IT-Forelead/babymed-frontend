<script setup>
import { useModalStore } from '../../store/modal.store'
import { useTabStore } from '../../store/tab.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import CheckIcon from '../../assets/icons/CheckIcon.vue'
import { useVisitStore } from '../../store/visit.store'
import { computed } from 'vue'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import VisitService from '../../services/visit.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const patient = computed(() => {
  return useVisitStore().selectedPatient
})

const selectedStatus = computed(() => {
  return useTabStore().currentStatus
})

const submitPaymentStatus = () => {
  if (selectedStatus.value === patient.value?.patientVisit?.paymentStatus) {
    notify.warning({
      message: t('nothingChanged'),
    })
  } else {
    VisitService.changePaymentStatus(patient.value?.patientVisit?.id)
      .then(() => {
        notify.success({
          message: t('paymentStatusChanged'),
        })
        useModalStore().closePaymentStatusChangerModal()
        VisitService.getVisits({
          page: 1,
          limit: 10
        }).then((res) => {
          useVisitStore().clearStore()
          useVisitStore().setPatients(res?.data)
        })
      })
      .catch(() => {
        notify.error({
          message: t('errorUpdatingPaymentStatus'),
        })
      })
  }
}

const totalPrice = () => {
  return patient.value?.services.map((s) => s?.serviceWithTypeName?.price * s?.count).reduce((s, a) => s + a, 0)
}
</script>

<template>
  <div v-if="useModalStore().isOpenPaymentStatusChangerModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="text-xl font-medium">{{ $t('changePaymentStatus') }}</div>
          </div>
          <button @click="useModalStore().closePaymentStatusChangerModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-4 space-y-5">
          <div class="space-y-2 border-b pb-4">
            <div class="flex justify-between items-center">
              <div class="text-base text-gray-500">{{ $t('patient') }}:</div>
              <div class="text-lg text-gray-700 capitalize">{{ patient?.patient?.firstname + ' ' + patient?.patient?.lastname }}</div>
            </div>
            <table class="w-full bg-gray-100">
              <tr>
                <th>{{ $t('n') }}</th>
                <th>{{ $t('serviceType') }}</th>
                <th>{{ $t('service') }}</th>
                <th>{{ $t('price') }}</th>
              </tr>
              <tr class="text-center divide-y py-5" v-for="(service, idx) in patient?.services" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td>{{ service?.serviceWithTypeName?.serviceTypeName }}</td>
                <td>
                  {{ service?.serviceWithTypeName?.name }}
                  <span v-if="service?.count > 1"> - {{ service?.count + " " + $t('days') }}</span>
                </td>
                <td>{{ useMoneyFormatter(service?.serviceWithTypeName?.price * service?.count) }}</td>
              </tr>
            </table>
            <div class="flex justify-between items-center">
              <div class="text-base text-gray-500">{{ $t('total') }}:</div>
              <div class="text-lg text-gray-700 font-bold">{{ useMoneyFormatter(totalPrice()) }}</div>
            </div>
          </div>
          <p class="mb-3 text-center">{{ $t('clickToChangePaymentStatus') }}</p>
          <div class="flex items-center justify-center space-x-3">
            <div @click="useTabStore().changeTab('not_paid')" :class="useTabStore().isNotPaid ? 'border-green-500 text-green-500 border' : 'border-gray-200 border text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-3 transition-all duration-300">
              <CheckIcon v-if="useTabStore().isNotPaid" class="w-6 h-6 mr-2" />
              <p>{{ $t('notPaid') }}</p>
            </div>
            <!-- <div @click="useTabStore().changeTab('partially paid')" :class="useTabStore().isPartiallyPaid ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">Partially paid</div> -->
            <div @click="useTabStore().changeTab('fully_paid')" :class="useTabStore().isFullyPaid ? 'border-green-500 text-green-500 border' : 'border-gray-200 border text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-3 transition-all duration-300">
              <CheckIcon v-if="useTabStore().isFullyPaid" class="w-6 h-6 mr-2" />
              <p>{{ $t('fullyPaid') }}</p>
            </div>
          </div>
          <hr />
          <div class="flex items-center justify-end space-x-3 mt-5 text-white">
            <div class="rounded-lg p-3 px-7 bg-gray-900 hover:bg-gray-700 cursor-pointer" @click="useModalStore().closePaymentStatusChangerModal()">{{ $t('cancel') }}</div>
            <div @click="submitPaymentStatus()" class="rounded-lg p-3 px-7 bg-lime-400 hover:bg-lime-300 cursor-pointer text-black">{{ $t('save') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
