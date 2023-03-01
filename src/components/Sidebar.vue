<script setup>
import HomeIcon from '../assets/icons/HomeIcon.vue'
import SettingIcon from '../assets/icons/SettingIcon.vue'
import SignOutIcon from '../assets/icons/SignOutIcon.vue'
import { useSidebarStore } from '../store/sidebar.store'
import { useAuthStore } from '../store/auth.store'
import { computed, onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import VisitsIcon from '../assets/icons/VisitsIcon.vue'
import UserPlusIcon from '../assets/icons/UserPlusIcon.vue'
import AuthService from '../services/auth.service'
import PaymentIcon from '../assets/icons/PaymentIcon.vue'
import i18n from '../i18n.js'
import decodeJwt, {parseJwt} from '../mixins/utils'
import UsersIcon from '../assets/icons/UsersIcon.vue'
import { useI18n } from 'vue-i18n'
import ServicesIcon from '../assets/icons/ServicesIcon.vue'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import MedicalInformationOutlineIcon from '../assets/icons/MedicalInformationOutlineIcon.vue'
import UserIcon from '../assets/icons/UserIcon.vue'
import EnvelopeIcon from '../assets/icons/EnvelopeIcon.vue'

const { t } = useI18n()

const router = useRouter()
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
const isOpenExpense = computed(() => useSidebarStore().isOpenExpenseMenu)
const isOpenSubMenu = computed(() => useSidebarStore().isOpenSubMenu)

const payload = ref({})

const logout = () => {
  AuthService.logout()
  router.push('/')
}
const isLangShow = ref(false)

const toggleLangDrop = () => {
  isLangShow.value = !isLangShow.value
}

const currentLang = ref('')

const changeLang = (lang) => {
  currentLang.value = lang
  localStorage.setItem('lang', lang)
  i18n.global.locale.value = lang
  document.getElementsByTagName('title')[0].innerHTML = t('title')
}

const navigationGuard = (access) => {
  return access.includes(payload.value?.role)
}

onMounted(() => {
  currentLang.value = localStorage.getItem('lang') || 'uz'
  document.getElementsByTagName('title')[0].innerHTML = t('title')
  useAuthStore().setUser(decodeJwt(localStorage.getItem('token')))
  payload.value = parseJwt()
})
</script>

<template>
  <div class="relative text-white">
    <div :class="isOpen ? 'p-5' : 'py-3 p-2'" class="flex items-center space-x-3 transition-all duration-300">
      <div class="w-12 h-12 flex items-center justify-center">
        <img src="/images/logo.png" alt="" />
      </div>
      <p v-if="isOpen" class="text-xl font-bold capitalize">Baby med</p>
    </div>
    <div class="mt-5 h-[620px] overflow-auto py-5 px-2 text-gray-400 space-y-3">
      <router-link to="/dashboard"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/dashboard' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/dashboard' ? 'bg-gray-800 text-gray-100 justify-center' : ''"
        class="flex items-center hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <HomeIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('mainPage') }}</p>
        </div>
      </router-link>
      <router-link to="/visits" v-if="navigationGuard(['admin', 'cashier', 'super_manager', 'tech_admin'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/visits' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/visits' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <VisitsIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('patientsVisit') }}</p>
        </div>
      </router-link>
      <router-link to="/patients" v-if="navigationGuard(['admin', 'super_manager', 'tech_admin'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/patients' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/patients' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <UsersIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('patients') }}</p>
        </div>
      </router-link>
      <router-link to="/operations" v-if="navigationGuard(['super_manager', 'tech_admin', 'cashier'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/operations' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/operations' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <MedicalInformationOutlineIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('operations') }}</p>
        </div>
      </router-link>
      <div @click="useSidebarStore().toggleExpenseMenu()"
        v-if="navigationGuard(['cashier', 'super_manager', 'tech_admin'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/operation-expenses' || router?.currentRoute?.value?.path === '/checkup-expenses' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/expenses' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <PaymentIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('expenses') }}</p>
        </div>
        <div>
          <ChevronRightIcon class="w-5 h-5 transition-all duration-300" :class="{ 'rotate-90': isOpenExpense }" />
        </div>
      </div>
      <div :class="{ hidden: !isOpenExpense }" class="transition-all duration-300">
        <router-link to="/operation-expenses"
          class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer"
          :class="{ 'text-gray-100': useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/operation-expenses' }">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? t('operationExpenses') : 'OE'"></p>
          </div>
        </router-link>
        <router-link to="/checkup-expenses"
          class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer"
          :class="{ 'text-gray-100': useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/checkup-expenses' }">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? t('checkupExpenses') : 'CE'"></p>
          </div>
        </router-link>
      </div>
      <div @click="useSidebarStore().toggleSidebarSubMenu()" v-if="navigationGuard(['super_manager', 'tech_admin'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/services' || router?.currentRoute?.value?.path === '/service-types' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/services' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <ServicesIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('services') }}</p>
        </div>
        <div>
          <ChevronRightIcon class="w-5 h-5 transition-all duration-300" :class="{ 'rotate-90': isOpenSubMenu }" />
        </div>
      </div>
      <div :class="{ hidden: !isOpenSubMenu }" class="transition-all duration-300">
        <router-link to="/service-types"
          class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer"
          :class="{ 'text-gray-100': useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/service-types' }">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? t('serviceTypes') : 'ST'"></p>
          </div>
        </router-link>
        <router-link to="/services"
          class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer"
          :class="{ 'text-gray-100': useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/services' }">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? t('services') : 'S'"></p>
          </div>
        </router-link>
      </div>
      <router-link to="/users" v-if="navigationGuard(['super_manager', 'tech_admin'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/users' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/users' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <UserPlusIcon class="w-7 h-7" />
          <p v-if="isOpen">{{ $t('users') }}</p>
        </div>
      </router-link>
      <!-- Menus for admin panel -->
      <router-link to="/sms-messages" v-if="navigationGuard(['super_manager'])"
        class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer"
        :class="useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/sms-messages' ? 'justify-between bg-gray-800 text-gray-100' : !useSidebarStore().isOpenSidebar && router?.currentRoute?.value?.path === '/sms-messages' ? 'bg-gray-800 text-gray-100 justify-center' : ''">
        <div class="flex items-center space-x-2">
          <EnvelopeIcon class="w-7 h-7" />
          <p v-if="isOpen">SMS messages</p>
        </div>
      </router-link>
    </div>
    <div class="absolute bottom-10 w-full flex justify-center items-center flex-col space-y-2">
      <div v-if="isOpen" class="w-18 h-18 flex items-center justify-center p-2 rounded-full bg-gray-700">
        <UserIcon class="w-10 h-10 text-gray-300" />
      </div>
      <div v-if="isOpen">
        <p class="text-lg font-bold text-gray-400 text-center">{{
          useAuthStore().user?.firstname + ' ' +
            useAuthStore().user?.lastname
        }}</p>
        <p class="text-gray-600 text-center">{{ useAuthStore().user?.phone }}</p>
      </div>
      <div :class="{ 'flex-col space-x-0 space-y-3': !isOpen }" class="flex items-center justify-center space-x-5">
        <div @click="toggleLangDrop()"
          class="relative border border-gray-600 rounded-lg p-2 cursor-pointer hover:bg-gray-800">
          <div v-if="isLangShow" class="absolute bottom-12 bg-gray-700 rounded-lg p-1 left-0 w-24">
            <div @click="changeLang('uz')" class="flex items-center space-x-2 hover:bg-slate-600 p-1 rounded">
              <p>O'zbek</p>
            </div>
            <hr />
            <div @click="changeLang('kr')" class="flex items-center space-x-2 hover:bg-slate-600 p-1 rounded">
              <p>Ўзбек</p>
            </div>
            <hr />
            <div @click="changeLang('ru')" class="flex items-center space-x-2 hover:bg-slate-600 p-1 rounded">
              <p>Русский</p>
            </div>
            <hr />
            <div @click="changeLang('en')" class="flex items-center space-x-2 hover:bg-slate-600 p-1 rounded">
              <p>English</p>
            </div>
          </div>
          <div class="text-gray-600 h-6 w-6 uppercase">{{ currentLang }}</div>
        </div>
        <div class="border border-gray-600 rounded-lg p-2 cursor-pointer hover:bg-gray-800">
          <SettingIcon class="text-gray-600 h-6 w-6 fill-current" />
        </div>
        <div @click="logout()" class="border border-gray-600 rounded-lg p-2 cursor-pointer hover:bg-gray-800">
          <SignOutIcon class="text-gray-600 h-6 w-6 fill-current" />
        </div>
      </div>
    </div>
  </div>
</template>
