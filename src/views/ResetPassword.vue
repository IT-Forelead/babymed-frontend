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
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const { t } = useI18n()
const lang = ref('')
const isLoading = ref(false)
const hidePassword = ref(true)
const hideConfirmPassword = ref(true)
const validCode = ref(false)
const router = useRouter()
const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$')
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
            <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
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
