<script setup>
import { ref, reactive } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import EyeIcon from '../assets/icons/EyeIcon.vue'
import EyeSlashIcon from '../assets/icons/EyeSlashIcon.vue'
import AuthService from '../services/auth.service'
import { onMounted } from 'vue'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import i18n from '../i18n.js'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const lang = ref('')
const isLoading = ref(false)
const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const validCode = ref(false)
const router = useRouter()
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})')
const togglePassword = () => (hidePassword.value = !hidePassword.value)
const toggleConfirmPassword = () => (hideConfirmPassword.value = !hideConfirmPassword.value)

const changePasswordData = reactive({
  password: '',
  confirmPassword: '',
})

const changePassword = () => {
  if (!changePasswordData.password) {
    notify.warning({
      message: t('plsEnterPassword'),
    })
  } else if (!changePasswordData.confirmPassword) {
    notify.warning({
      message: t('plsConfirmPassword'),
    })
  } else if (!strongRegex.test(changePasswordData.password)) {
    notify.warning({
      message: t('passwordComplexity'),
    })
  } else if (changePasswordData.password !== changePasswordData.confirmPassword) {
    notify.warning({
      message: t('plsConfirmPasswordCorrectly'),
    })
  } else {
    isLoading.value = true
    AuthService.linkValidationAndUpdatePassword({
      linkCode: router.currentRoute.value.path.split('/')[2],
      password: changePasswordData.password,
    })
      .then((res) => {
        isLoading.value = false
        notify.success({
          message: t('passwordEdited'),
        })
        setTimeout(() => {
          router.push('/')
        }, 200)
      })
      .catch((err) => {
        notify.warning({
          message: t('errorEditingPassword'),
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
  AuthService.linkValidation(router.currentRoute.value.path.split('/')[2])
    .then((res) => {
      validCode.value = true
    })
    .catch((error) => {
      router.push('/notfound')
    })
})
</script>

<template>
  <div v-if="validCode" class="flex w-full h-screen overflow-hidden">
    <div class="relative w-full xl:basis-1/3 max-h-screen p-4 md:p-8">
      <div class="flex items-center justify-between">
        <img src="/images/logo.png" class="p-2 border border-gray-300 rounded-lg w-14" alt="Logo" />
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
        <h1 class="text-2xl font-bold mb-5">{{ $t('changePassword') }}</h1>
        <div class="flex flex-col space-y-6">
          <div>
            <p class="font-medium text-gray-500">{{ $t('newPassword') }}</p>
            <label for="password">
              <div class="relative">
                <input id="password" :type="hidePassword ? 'password' : 'text'" v-model="changePasswordData.password" class="w-full py-2 border border-gray-300 rounded px-3 focus:outline-none focus:border-slate-500 hover:shadow" :placeholder="$t('enterYourNewPassword')" />
                <EyeIcon v-if="hidePassword" @click="togglePassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
                <EyeSlashIcon v-else @click="togglePassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
              </div>
            </label>
          </div>
          <div>
            <p class="font-medium text-gray-500">{{ $t('confirmPassword') }}</p>
            <label for="confirmPassword">
              <div class="relative">
                <input id="confirmPassword" :type="hideConfirmPassword ? 'password' : 'text'" v-model="changePasswordData.confirmPassword" class="w-full py-2 border border-gray-300 rounded px-3 focus:outline-none focus:border-slate-500 hover:shadow" :placeholder="$t('reEnterYourPassword')" />
                <EyeIcon v-if="hideConfirmPassword" @click="toggleConfirmPassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
                <EyeSlashIcon v-else @click="toggleConfirmPassword()" class="text-gray-500 absolute z-10 top-1/2 -translate-y-1/2 right-3 w-5 h-5 cursor-pointer" />
              </div>
            </label>
          </div>
          <div v-if="isLoading" class="w-full select-none bg-gray-600 py-3 font-light text-white rounded flex items-center justify-center">
            <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>{{ $t('saving') }}</span>
          </div>
          <div v-else @click="changePassword()" class="w-full select-none bg-gray-900 hover:bg-gray-800 cursor-pointer py-3 font-light text-white rounded flex items-center justify-center">
            <span>{{ $t('save') }}</span>
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
