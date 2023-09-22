<script setup>
import { ref, reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth.store'
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import AuthService from '../services/auth.service'
import { onMounted } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import i18n from '../i18n.js'
import { useI18n } from 'vue-i18n'
import decodeJwt from '../mixins/utils'
import { useSidebarStore } from '../store/sidebar.store.js'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const { t } = useI18n()
const isLoading = ref(false)
const hidePassword = ref(true)
const router = useRouter()
const loginFormData = reactive({
  phone: '',
  password: '',
})
const togglePassword = () => (hidePassword.value = !hidePassword.value)

const login = () => {
  localStorage.removeItem('token')
  if (!loginFormData.phone || !loginFormData.password) {
    notify.warning({
      message: t('phoneOrPasswordIncorrect'),
    })
  } else {
    isLoading.value = true
    AuthService.login({
      phone: loginFormData.phone,
      password: loginFormData.password,
    })
      .then((res) => {
        if (res) {
          useAuthStore().setToken(res)
          useAuthStore().setUser(decodeJwt(res))
          isLoading.value = false
          if (localStorage.getItem('token')) {
            setTimeout(() => {
              router.push('/dashboard')
            }, 200)
          }
        }
      })
      .catch((err) => {
        notify.warning({
          message: t('phoneOrPasswordIncorrect'),
        })
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
      })
  }
}

const lang = ref('')

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
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:w-2/3 px-8 md:px-4">
        <h1 class="text-2xl font-bold mb-5">{{ $t('login') }}</h1>
        <div class="flex flex-col space-y-6">
          <label for="phone">
            <p class="font-medium text-gray-500 pb-2">{{ $t('mobilePhone') }}</p>
            <input id="phone" v-mask="'+998(##) ###-##-##'" v-model="loginFormData.phone" type="text" class="w-full py-2 border border-gray-300 rounded focus:outline-none focus:border-slate-500 hover:shadow" placeholder="+998(00) 000-00-00" />
          </label>
          <div>
            <div class="flex flex-row items-center justify-between mb-2">
              <p class="font-medium text-gray-500">{{ $t('password') }}</p>
              <router-link to="/forgot-password" class="font-medium text-indigo-600 cursor-pointer hover:text-indigo-900">
                {{ $t('forgotPassword') }}
              </router-link>
            </div>
            <label for="password">
              <div class="relative">
                <input id="password" :type="hidePassword ? 'password' : 'text'" v-model="loginFormData.password" class="w-full py-2 border border-gray-300 rounded px-3 focus:outline-none focus:border-slate-500 hover:shadow" :placeholder="$t('enterYourPassword')" />
                <EyeIcon v-if="hidePassword" @click="togglePassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
                <EyeSlashIcon v-else @click="togglePassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
              </div>
            </label>
          </div>
          <div v-if="isLoading" class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="login()" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('login') }}</span>
          </div>
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
