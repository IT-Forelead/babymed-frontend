<script setup>
import { ref } from '@vue/reactivity'
import AuthService from '../services/auth.service'
import { onMounted } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import i18n from '../i18n.js'
import { useI18n } from 'vue-i18n'
import { useSidebarStore } from '../store/sidebar.store.js'
import CheckIcon from '../assets/icons/EnvelopeIcon.vue'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const { t } = useI18n()
const lang = ref('')
const isLoading = ref(false)
const result = ref(false)
const phone = ref('')

const resetPassword = () => {
  if (!phone.value) {
    notify.warning({
      message: t('plsEnterYourPhone'),
    })
  } else if (phone.value.length !== 18) {
    notify.warning({
      message: t('plsEnterPhoneCorrectly'),
    })
  } else {
    isLoading.value = true
    AuthService.resetPassword(phone.value)
      .then((res) => {
        isLoading.value = false
        result.value = true
      })
      .catch((err) => {
        notify.warning({
          message: t('userNotFoundWithThisPhoneNumber'),
        })
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
      })
  }
}

const changeLang = () => {
  localStorage.setItem('lang', lang.value)
  i18n.global.locale.value = lang.value
  document.getElementsByTagName('title')[0].innerHTML = t('title')
}

onMounted(() => {
  lang.value = localStorage.getItem('lang') || 'uz'
  document.getElementsByTagName('title')[0].innerHTML = t('title')
  useSidebarStore().clearStore()
})
</script>

<template>
  <div class="flex w-full h-screen overflow-hidden">
    <div class="relative w-full xl:basis-1/3 max-h-screen p-4 md:p-8">
      <div class="flex items-center justify-between">
        <img src="/images/it-forelead.png" class="p-2 border border-gray-300 rounded-lg w-14" alt="Logo" />
        <div>
          <select v-model="lang" @change="changeLang" class="border border-gray-300 rounded-lg cursor-pointer">
            <option value="en" selected>English</option>
            <option value="uz">O'zbek</option>
            <option value="kr">Ўзбек</option>
            <option value="ru">Русский</option>
          </select>
        </div>
      </div>
      <div v-if="result" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <div class="flex flex-col items-center space-y-6">
          <div class="flex items-center justify-center w-24 h-24 bg-sky-50 rounded-lg">
            <CheckIcon class="w-16 h-16 text-blue-500"/>
          </div>
          <h1 class="text-2xl font-bold mb-5">{{ $t('smsWasSentTo') + phone }}</h1>
          <div class="text-gray-500">{{ $t('resetPasswordResult') }}</div>
          <router-link to="/" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            {{ $t('backToHome') }}
          </router-link>
        </div>
      </div>
      <div v-else class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <h1 class="text-2xl font-bold mb-5">{{ $t('resetPassword') }}</h1>
        <div class="flex flex-col space-y-6">
          <label for="phone">
            <p class="font-medium text-gray-700 pb-2">{{ $t('mobilePhone') }}</p>
            <input id="phone" v-mask="'+998(##) ###-##-##'" v-model="phone" type="text" class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow" placeholder="+998(00) 000-00-00" />
          </label>
          <div class="text-gray-500">{{ $t('resetPasswordReference') }}</div>
          <div v-if="isLoading" class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="resetPassword()" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('send') }}</span>
          </div>
          <router-link to="/" class="text-center font-medium text-indigo-600 cursor-pointer hover:text-indigo-900">
            {{ $t('backToHome') }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="hidden xl:block md:basis-2/3 max-h-screen bg-slate-200/80 pl-36 pt-44 relative">
      <div class="space-y-3">
        <h1 class="font-bold text-2xl text-gray-900">"{{ $t('quote') }}"</h1>
        <p class="font-medium text-base text-gray-500">- {{ $t('author') }}</p>
      </div>
      <div class="absolute bottom-0 right-0 w-full left-36 bg-slate-300/40 p-5 h-[520px] 2xl:h-[620px] rounded-tl-[42px]">
        <div class="bg-[url('/images/dashboard.png')] w-full h-[620px] rounded-tl-3xl"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
