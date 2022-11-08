<script setup>
import HomeIcon from '../assets/icons/HomeIcon.vue'
import SettingIcon from '../assets/icons/SettingIcon.vue'
import SignOutIcon from '../assets/icons/SignOutIcon.vue'
import { useSidebarStore } from '../store/sidebar.store'
import { computed } from '@vue/runtime-core'
import { useRouter } from 'vue-router'
import ChevronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import UserIcon from '../assets/icons/UserIcon.vue'
import UsersIcon from '../assets/icons/UsersIcon.vue'
import AppointmentIcon from '../assets/icons/AppointmentIcon.vue'
import ReportIcon from '../assets/icons/ReportIcon.vue'
import AuthService from '../services/auth.service'

const router = useRouter()
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
const isOpenSubMenu = computed(() => useSidebarStore().isOpenSubMenu)

const logout = () => {
  AuthService.logout()
  router.push('/')
}
</script>

<template>
  <div class="relative text-white">
    <div :class="isOpen ? 'p-5' : 'py-3 p-2'" class="flex items-center space-x-3 transition-all duration-300">
      <div class="bg-gray-700 w-14 h-14 flex items-center justify-center p-2 rounded-full">
        <img src="/logo.png" alt="" />
      </div>
      <p v-if="isOpen" class="text-xl font-bold capitalize">Baby med</p>
    </div>
    <div class="mt-5 h-[475px] overflow-auto py-5 px-2 text-gray-400 space-y-3">
      <router-link to="/dashboard" @click="useSidebarStore().toggleSidebarSubMenu()" class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <HomeIcon class="w-7 h-7" />
          <p v-if="isOpen">Dashboard</p>
        </div>
        <div>
          <ChevronRightIcon class="w-5 h-5 transition-all duration-300" :class="{ 'rotate-90': isOpenSubMenu }" />
        </div>
      </router-link>
      <div :class="{ hidden: !isOpenSubMenu }" class="transition-all duration-300">
        <router-link to="/dashboard" class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? 'Hospital Dashboard' : 'HD'"></p>
          </div>
        </router-link>
        <router-link to="/dashboard" class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? 'Patient Dashboard' : 'PD'"></p>
          </div>
        </router-link>
        <router-link to="/dashboard" class="flex items-center justify-between hover:text-gray-100 p-3 rounded-lg cursor-pointer">
          <div :class="isOpen ? 'pl-6' : 'pl-1'" class="flex items-center space-x-2">
            <p>-</p>
            <p v-text="isOpen ? 'Doctor Dashboard' : 'DD'"></p>
          </div>
        </router-link>
      </div>
      <router-link to="/dashboard" class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <AppointmentIcon class="w-7 h-7" />
          <p v-if="isOpen">Appointments</p>
        </div>
      </router-link>
      <router-link to="/dashboard" class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <UsersIcon class="w-7 h-7" />
          <p v-if="isOpen">Patients</p>
        </div>
        <div>
          <ChevronRightIcon class="w-5 h-5 transition-all duration-300" />
        </div>
      </router-link>
      <router-link to="/dashboard" class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <UserIcon class="w-7 h-7" />
          <p v-if="isOpen">Doctor</p>
        </div>
        <div>
          <ChevronRightIcon class="w-5 h-5 transition-all duration-300" />
        </div>
      </router-link>
      <router-link to="/dashboard" class="flex items-center justify-between hover:bg-gray-800 hover:text-gray-100 p-3 rounded-lg cursor-pointer">
        <div class="flex items-center space-x-2">
          <ReportIcon class="w-7 h-7" />
          <p v-if="isOpen">Reports</p>
        </div>
      </router-link>
    </div>
    <div class="absolute bottom-10 w-full flex justify-center items-center flex-col space-y-2">
      <div v-if="isOpen" class="w-24 h-24 flex items-center justify-center p-2 rounded-full">
        <img src="/logo.png" alt="hero" class="w-full" />
      </div>
      <div v-if="isOpen">
        <p class="text-lg font-bold text-gray-400">Babymed Admin</p>
        <p class="text-gray-600">example@gmail.com</p>
      </div>
      <div :class="{ 'flex-col space-x-0 space-y-3': !isOpen }" class="flex items-center justify-center space-x-5">
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

<style scoped></style>
