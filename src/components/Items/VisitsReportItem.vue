<script setup>
import PrinterIcon from '../../assets/icons/PrinterIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import MoneyPlusIcon from '../../assets/icons/MoneyPlusIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { ref, toRefs, onMounted } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { useModalStore } from '../../store/modal.store'
import { useDropStore } from '../../store/drop.store'
import { useVisitStore } from '../../store/visit.store'
import { useTabStore } from '../../store/tab.store'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { useI18n } from 'vue-i18n'
import PdfFileIcon from '../../assets/icons/PdfFileIcon.vue'
import {parseJwt} from "../../mixins/utils.js";

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

const props = defineProps({
  patients: { type: Array, required: true },
})

const { patients } = toRefs(props)

const open = (patient) => {
  useModalStore().openPaymentStatusChangerModal()
  useVisitStore().setSelectedPatient(patient)
  useTabStore().changeTab(patient?.patientVisit?.paymentStatus)
}

const translatePaymentStatus = (status) => {
  if (status === 'fully_paid') {
    return t('fullyPaid')
  } else {
    return t('notPaid')
  }
}

const printCheque = (data) => {
  useModalStore().openPrintModal()
  useDropStore().setSelectedCheque(data)
}

const printPdf = (data) => {
  localStorage.setItem('patientFullname', data?.patient?.firstname + " " + data?.patient?.lastname)
  localStorage.setItem('visitCreatedAt', moment(data?.patientVisit?.createdAt).format('DD/MM/YYYY H:mm'))
  localStorage.setItem('patientBirthday', moment(data?.patient?.birthday).format('DD/MM/YYYY'))
  localStorage.setItem('patientAddress', data?.patient?.address ? data?.region?.name + ", " + data?.city?.name + ", " + data?.patient?.address : data?.region?.name + ", " + data?.city?.name)
  useModalStore().openPrintPdfModal()
}

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-base font-medium" v-for="(patient, idx) in patients" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2" v-if="router.currentRoute?.value?.path === '/visits'">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div>
          <div class="text-base font-medium capitalize">
            {{ patient?.patient?.firstname + " " + patient?.patient?.lastname }}
          </div>
          <div>{{ patient?.patient?.phone }}</div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ moment(patient?.patientVisit?.createdAt).format('DD/MM/YYYY H:mm') }}</td>
    <td v-motion-pop class="py-2 px-4 text-center capitalize">
      <div v-for="(service, idx) in patient?.services" :key="idx">
        <span v-if="service?.serviceWithTypeName?.serviceTypeName.length < 18">{{ service?.serviceWithTypeName?.serviceTypeName }}</span>
        <span v-else>{{ service?.serviceWithTypeName?.serviceTypeName.substring(0,17)+"..." }}</span>
        <span> - {{ service?.serviceWithTypeName?.name }}</span>
        <span v-if="service?.count > 1"> - {{ service?.count + " " + $t('days') }}</span>
        <span class="text-sm font-bold italic">- {{ useMoneyFormatter(service?.serviceWithTypeName?.price * service?.count) }}</span>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full text-white" :class="patient?.patientVisit?.paymentStatus === 'not_paid' ? 'bg-red-500' : 'bg-green-400'">
        {{ translatePaymentStatus(patient?.patientVisit?.paymentStatus) }}
      </span>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center space-x-2">
        <div v-if="patient?.patientVisit?.paymentStatus === 'not_paid' && navigationGuard(['cashier', 'super_manager', 'tech_admin'])" @click="open(patient)" class="w-4 mr-2 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <MoneyPlusIcon class="w-6 h-6" />
        </div>
        <div v-if="router.currentRoute?.value?.path === '/visits' || router.currentRoute?.value?.path === '/dashboard'" @click="printCheque(patient)" class="w-4 mr-2 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <PrinterIcon class="w-6 h-6" />
        </div>
        <div v-if="router.currentRoute?.value?.path === '/visits' || router.currentRoute?.value?.path === '/dashboard'" @click="printPdf(patient)" class="w-4 mr-2 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <PdfFileIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="8">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
