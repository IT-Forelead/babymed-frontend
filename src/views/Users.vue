<script setup>
import { computed } from '@vue/reactivity'
import { onMounted, reactive, ref } from 'vue'
import { cleanObjectEmptyFields } from '../mixins/utils'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import UserService from '../services/user.service'
import { useUserStore } from '../store/user.store'
import { useModalStore } from '../store/modal.store'
import { onClickOutside } from '@vueuse/core'
import UsersItem from '../components/Items/UsersItem.vue'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const isLoading = ref(false)
const total = ref(1)
const target = ref('.users-wrapper')
const distance = ref(0)

const users = computed(() => {
  return useUserStore().users
})

let page = 0
const loadUsers = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    UserService.getUsers(
      cleanObjectEmptyFields({
        firstName: '%' + filterData.firstName + '%',
        lastName: '%' + filterData.lastName + '%',
        role: filterData.role,
        phone: filterData.phone.replace(/([() -])/g, ''),
        page: page,
        limit: 30,
      })
    )
      .then((result) => {
        total.value = result?.total
        useUserStore().setUsers(result?.data)
        $state.loaded()
      })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

onMounted(() => {
  useUserStore().clearStore()
})

const dropdown = ref(null)

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const filterData = reactive({
  firstName: '',
  lastName: '',
  role: '',
  phone: '',
})

const submitFilterData = () => {
  isLoading.value = true
  UserService.getUsers(
    cleanObjectEmptyFields({
      firstName: '%' + filterData.firstName + '%',
      lastName: '%' + filterData.lastName + '%',
      role: filterData.role,
      phone: filterData.phone.replace(/([() -])/g, ''),
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useUserStore().clearStore()
    useUserStore().setUsers(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('usersReport') }}</p>
      <div class="flex items-center space-x-3">
        <div class="relative" ref="dropdown">
          <div @click="useModalStore().toggleFilterBy()" class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer">
            <FilterIcon class="w-5 h-5 text-gray-400" />
            {{ $t('filter') }}
          </div>
          <div v-if="useModalStore().isOpenFilterBy" class="absolute bg-white shadow w-96 rounded-xl p-3 z-20 top-12 right-0 space-y-3">
            <label for="firstname">
              {{ $t('firstname') }}
              <input v-model="filterData.firstName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="firstname" :placeholder="$t('enterFirstname')" />
            </label>
            <label for="lastname">
              {{ $t('lastname') }}
              <input v-model="filterData.lastName" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" id="lastname" :placeholder="$t('enterLastname')" />
            </label>
            <label for="phone">
              {{ $t('phone') }}
              <input id="phone" v-mask="'+998(##) ###-##-##'" v-model="filterData.phone" type="text" class="text-gray-500 border-none bg-gray-100 rounded-lg w-full" placeholder="+998(00) 000-00-00" />
            </label>
            <label for="">
              <p>{{ $t('role') }}</p>
              <select v-model="filterData.role" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full">
                <option value="" selected>{{ $t('selectRole') }}</option>
                <option value="admin">Admin</option>
                <option value="doctor">{{ $t('doctor') }}</option>
                <option value="cashier">{{ $t('cashier') }}</option>
                <option value="tech_admin">Tech Admin</option>
              </select>
            </label>
            <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
              <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
              <span>{{ $t('loading') }}</span>
            </div>
            <div v-else @click="submitFilterData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
              <span>{{ $t('filter') }}</span>
            </div>
          </div>
        </div>
        <div @click="useModalStore().openAddUserModal()" class="bg-black text-white rounded-xl p-2 px-4 cursor-pointer hover:bg-black/75">
          <p class="text-base">{{ $t('createUser') }}</p>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 users-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('user') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('role') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('subRole') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <UsersItem :users="users" :distance="distance" :target="target" @infinite="loadUsers" />
        </tbody>
      </table>
      <div v-if="users.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
