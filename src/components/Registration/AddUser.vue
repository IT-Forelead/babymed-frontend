<script setup>
import { reactive, ref } from '@vue/reactivity'
import { watch, computed } from 'vue'
import UserService from '../../services/user.service'
import { useUserStore } from '../../store/user.store'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../../mixins/utils.js'
import LoadingIcon from '../../assets/icons/LoadingIcon.vue'

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
  <div class="space-y-5">
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
      <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
      <span>{{ t('creatingUser') }}</span>
    </div>
    <div v-else @click="submitUserData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
      <span>{{ t('createUser') }}</span>
    </div>
  </div>
</template>

<style scoped></style>
