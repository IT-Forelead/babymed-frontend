<script setup>
import SearchIcon from '../assets/icons/SearchIcon.vue'
import BellIcon from '../assets/icons/BellIcon.vue'
import Registration from './Registration.vue'
import { computed } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useModalStore } from '../store/modal.store'
import DeleteAlert from './DeleteAlert.vue'
import ChangePaymentStatus from './Payments/ChangePaymentStatus.vue'
import AddVisitModal from './AddVisitModal.vue'
import { useI18n } from 'vue-i18n'
import OperationInfoModal from './Operations/OperationInfoModal.vue'
import Cheque from './Cheque.vue'
import { ref, onMounted } from 'vue'

const { t } = useI18n()

const router = useRouter()
const payload = ref({})

function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}

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
  } else if (router.currentRoute?.value?.path === '/expenses') {
    return t('expenses')
  }
})

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  payload.value = parseJwt(localStorage.getItem('token'))
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
    <DeleteAlert />
    <!-- Add Visit Modal -->
    <AddVisitModal />
    <OperationInfoModal />
    <Cheque/>
  </div>
</template>

<style scoped></style>
