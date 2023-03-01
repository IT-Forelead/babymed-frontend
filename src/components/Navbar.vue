<script setup>
import SearchIcon from '../assets/icons/SearchIcon.vue'
import BellIcon from '../assets/icons/BellIcon.vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ref, onMounted } from 'vue'
import { parseJwt } from '../mixins/utils.js'
import Registration from './Modals/Registration.vue'
import ChangePaymentStatus from './Modals/ChangePaymentStatus.vue'
import AddVisitModal from './Modals/AddVisitModal.vue'
import OperationInfoModal from './Modals/OperationInfoModal.vue'
import Cheque from './Modals/Cheque.vue'
import PrintPdfModal from './Modals/PrintPdfModal.vue'
import AddServiceModal from './Modals/AddServiceModal.vue'
import EditServiceModal from './Modals/EditServiceModal.vue'
import DeleteAlertModal from './Modals/DeleteAlertModal.vue'

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

const currentLabel = computed(() => {
  if (router.currentRoute?.value?.path === '/visits') {
    return t('visitsManagment')
  } else if (router.currentRoute?.value?.path === '/patients') {
    return t('patientsManagment')
  } else if (router.currentRoute?.value?.path === '/patient-visit') {
    return t('visitsManagment')
  } else if (router.currentRoute?.value?.path === '/dashboard') {
    return t('mainPage')
  } else if (router.currentRoute?.value?.path === '/services') {
    return t('servicesManagment')
  } else if (router.currentRoute?.value?.path === '/users') {
    return t('usersManagment')
  } else if (router.currentRoute?.value?.path === '/service-types') {
    return t('serviceTypes')
  } else if (router.currentRoute?.value?.path === '/operations') {
    return t('operationManagment')
  } else if (router.currentRoute?.value?.path === '/operations/services') {
    return t('operationServices')
  } else if (router.currentRoute?.value?.path === '/operation-expenses') {
    return t('operationExpenses')
  } else if (router.currentRoute?.value?.path === '/operation-expenses/summary') {
    return t('operationExpensesReport')
  } else if (router.currentRoute?.value?.path === '/operation-expenses/add') {
    return t('addOperationExpense')
  } else if (router.currentRoute?.value?.path === '/checkup-expenses') {
    return t('checkupExpenses')
  } else if (router.currentRoute?.value?.path === '/checkup-expenses/summary') {
    return t('checkupExpensesReport')
  } else if (router.currentRoute?.value?.path === '/checkup-expenses/doctor-shares') {
    return t('doctorShares')
  } else if (router.currentRoute?.value?.path === '/sms-messages') {
    return t('smsMessagesManagment')
  }
})

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>

<template>
  <div class="bg-neutral-900 px-5 py-3 flex justify-between items-center">
    <div class="space-y-2">
      <h1 class="text-3xl font-semibold">{{ currentLabel }}</h1>
      <p class="text-gray-500">{{ $t('welcome') }}</p>
    </div>
    <div class="flex items-center justify-center space-x-5">
      <div class="relative text-gray-600">
        <input id="search" class="border-none bg-white h-10 pl-11 py-6 rounded-xl text focus:outline-none" type="search" name="search" :placeholder="$t('search')" />
        <label for="search" class="cursor-pointer absolute left-3 top-3 mr-4">
          <SearchIcon class="text-gray-600 h-6 w-6 fill-current" />
        </label>
      </div>
      <div class="bg-white rounded-xl p-3 cursor-pointer hover:shadow">
        <BellIcon class="text-gray-600 h-7 w-7 fill-current" />
      </div>
      <router-link to="/patient-visit" v-if="navigationGuard(['admin', 'super_manager', 'tech_admin'])" class="bg-gray-900 text-white rounded-xl p-3.5 px-7 cursor-pointer hover:bg-gray-800">
        <p class="text-base">+ {{ $t('addRecord') }}</p>
      </router-link>
    </div>
    <!-- Registration Modal (Payment & Patient) -->
    <Registration />
    <!-- Payment Status Changer Modal -->
    <ChangePaymentStatus />
    <!-- Delete Alert -->
    <DeleteAlertModal />
    <!-- Add Visit Modal -->
    <AddVisitModal />
    <AddServiceModal />
    <EditServiceModal />
    <OperationInfoModal />
    <Cheque />
    <PrintPdfModal />
  </div>
</template>

<style scoped></style>
