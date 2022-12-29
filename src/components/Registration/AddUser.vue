<script setup>
import { reactive, ref } from '@vue/reactivity'
import { watch, computed } from 'vue'
import UserService from '../../services/user.service'
import { useUserStore } from '../../store/user.store'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils.js'

const { t } = useI18n()

const showSubRoles = ref(false)

const userForm = reactive({
  firstname: '',
  lastname: '',
  role: '',
  subRoleId: '',
  phone: '',
})

const isLoading = ref(false)

const clearForm = () => {
  userForm.firstname = ''
  userForm.lastname = ''
  userForm.role = ''
  userForm.subRoleId = ''
  userForm.phone = ''
}

const submitUserData = () => {
  if (!userForm.firstname) {
    notify.warning({
      message: t('plsEnterUserFirstname'),
    })
  } else if (!userForm.lastname) {
    notify.warning({
      message: t('plsEnterUserLastname'),
    })
  } else if (!userForm.role) {
    notify.warning({
      message: t('plsSelectUserRole'),
    })
  } else if (userForm.role.includes('doctor') && !userForm.subRoleId) {
    notify.warning({
      message: 'Please select sub role!',
    })
  } else if (!userForm.phone) {
    notify.warning({
      message: t('plsEnterUserPhone'),
    })
  } else {
    isLoading.value = true
    UserService.createUser(
      cleanObjectEmptyFields({
        firstname: userForm.firstname,
        lastname: userForm.lastname,
        role: userForm.role,
        subRoleId: userForm.subRoleId,
        phone: userForm.phone.replace(/([() -])/g, ''),
      })
    )
      .then(() => {
        clearForm()
        notify.success({
          message: t('userCreated'),
        })
        UserService.getUsers({})
          .then((res) => {
            useUserStore().clearStore()
            useUserStore().setUsers(res?.data)
            showSubRoles.value = false
          })
          .catch(() => {
            notify.error({
              message: t('errorGettingUsers'),
            })
          })
        isLoading.value = false
      })
      .catch((err) => {
        notify.error({
          message: t('errorCreatingUser'),
        })
        setTimeout(() => {
          isLoading.value = false
        }, 3000)
      })
  }
}

const subRoles = computed(() => {
  return useUserStore().subRoles
})

watch(
  () => userForm.role,
  (role) => {
    if (role.includes('doctor')) {
      if (subRoles.value.length === 0) {
        UserService.getSubRoles().then((res) => {
          useUserStore().setSubRoles(res)
        })
      }
      showSubRoles.value = true
    } else {
      useUserStore().setSubRoles([])
      showSubRoles.value = false
    }
  }
)
</script>

<template>
  <div class="bg-white rounded-lg mt-3 p-3 space-y-5">
    <p class="text-3xl font-bold mb-3">{{ $t('createUser') }}</p>
    <label for="firstname">
      {{ $t('firstname') }}
      <input v-model="userForm.firstname" class="text-gray-500 mb-3 border-none bg-gray-100 rounded-lg w-full text-lg" type="text" id="firstname" :placeholder="$t('enterFirstname')" />
    </label>
    <label for="lastname">
      {{ $t('lastname') }}
      <input v-model="userForm.lastname" class="text-gray-500 border-none mb-3 bg-gray-100 rounded-lg w-full text-lg" type="text" id="lastname" :placeholder="$t('enterLastname')" />
    </label>
    <label for="">
      {{ $t('role') }}<br />
      <select v-model="userForm.role" class="rounded-lg w-full text-gray-500 border-none bg-gray-100 p-2.5 mb-3">
        <option value="">{{ $t('selectRole') }}</option>
        <option value="admin">Admin</option>
        <option value="doctor">{{ $t('doctor') }}</option>
        <option value="cashier">{{ $t('cashier') }}</option>
        <option value="tech_admin">Tech Admin</option>
      </select>
    </label>
    <!-- Show only doctor select -->
    <label for="" v-if="showSubRoles">
      {{ $t('subRole') }}<br />
      <select v-model="userForm.subRoleId" class="rounded-lg w-full text-gray-500 border-none bg-gray-100 p-2.5 mb-3">
        <option value="">{{ $t('selectSubRole') }}</option>
        <option v-for="(sr, idx) in subRoles" :key="idx" :value="sr?.id">{{ sr?.name }}</option>
      </select>
    </label>
    <label for="phone">
      <p class="font-medium text-gray-500 pb-2">{{ $t('phone') }}</p>
      <input id="phone" v-mask="'+998(##) ###-##-##'" v-model="userForm.phone" type="text" class="text-gray-500 mb-3 border-none bg-gray-100 rounded-lg w-full text-lg" placeholder="+998(00) 000-00-00" />
    </label>
    <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
      <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span>{{ t('creatingUser') }}</span>
    </div>
    <div v-else @click="submitUserData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ t('createUser') }}</span>
    </div>
  </div>
</template>

<style scoped></style>
