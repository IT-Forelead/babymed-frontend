<script setup>
import { computed } from '@vue/reactivity'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { useModalStore } from '../../store/modal.store'
import { useVisitStore } from '../../store/visit.store.js'
import moment from 'moment'

const patientVisit = computed(() => {
  return useVisitStore().selectedPatient
})

const closeModal = () => {
  useModalStore().closeVisitInfoModal()
  useVisitStore().setSelectedPatient({})
}

const totalPayment = (price) => {
  let total = 0
  patientVisit.value?.services?.forEach((item) => {
    total += item?.serviceWithTypeName?.price
  })
  return useMoneyFormatter(price || total)
}

</script>
<template>
  <div v-if="useModalStore().isOpenVisitInfoModal"
       class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full h-full max-w-4xl md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="text-xl font-medium">{{ $t('visitPatientInfo') }}</div>
          <button @click="closeModal()"
                  class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-6">
          <h1 class="text-xl font-bold">{{ $t('patient') }}:</h1>
          <ul class="border-b mb-3 pb-3">
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('patientFullName') }}:</p>
              <p class="capitalize">{{ patientVisit?.patient?.firstname + ' ' + patientVisit?.patient?.lastname }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('patientPhone') }}:</p>
              <p>{{ patientVisit?.patient?.phone }}</p>
            </li>
            <li class="flex justify-between">
              <p class="capitalize">{{ $t('visitingTime') }}:</p>
              <p>{{ moment(patientVisit?.patient?.createdAt).format('DD/MM/YYYY H:mm') }}</p>
            </li>
          </ul>
          <div class="border-dashed pb-3 border-b-2">
            <h1 class="text-xl font-bold mb-3">{{ $t('services') }}:</h1>
            <table v-if="patientVisit?.services" class="w-full bg-gray-100 rounded-lg">
              <tr>
                <th>{{ $t('n') }}</th>
                <th class="text-left">{{ $t('service') }}</th>
                <th>{{ $t('doctor') }}</th>
                <th>{{ $t('price') }}</th>
              </tr>
              <tr class="text-center divide-y py-5" v-for="(service, idx) in patientVisit?.services" :key="idx">
                <td>{{ idx + 1 }}</td>
                <td class="capitalize text-left">
                  {{ service?.serviceWithTypeName?.name + ' - ' + service?.serviceWithTypeName?.serviceTypeName }}
                </td>
                <td>
                  {{ service?.serviceWithTypeName?.doctorFirstName + '  ' + service?.serviceWithTypeName?.doctorLastName
                  }}
                </td>
                <td>{{ useMoneyFormatter(service?.serviceWithTypeName?.price) }}</td>
              </tr>
            </table>
          </div>
          <div v-if="patientVisit?.recommender">
            <h1 class="text-xl font-bold mt-4">{{ $t('partnerDoctor') }}:</h1>
            <ul class="border-b mb-3 pb-3">
              <li class="flex justify-between">
                <p class="capitalize">
                  {{ $t('firstname') }} {{ $t('lastname') }}:
                </p>
                <p>
                  {{ patientVisit?.recommender?.firstname + ' ' + patientVisit?.recommender?.lastname }}
                </p>
              </li>
              <li class="flex justify-between">
                <p class="capitalize">
                  {{ $t('phone') }}:
                </p>
                <p>
                  {{ patientVisit?.recommender?.phone }}
                </p>
              </li>
              <li class="flex justify-between">
                <p class="capitalize">
                  {{ $t('recommenderShare') }}:
                </p>
                <p>{{ patientVisit?.recommender?.percent }} %</p>
              </li>
            </ul>
          </div>
          <div class="flex justify-between items-center mt-2">
            <p class="text-2xl font-bold">{{ $t('total') }}:</p>
            <p class="text-2xl font-bold">{{ totalPayment(patientVisit?.service?.serviceWithTypeName?.price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
