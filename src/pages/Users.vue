<script setup>
import { computed } from '@vue/reactivity'
import { onMounted } from 'vue'
import AddUser from '../components/Home/Registration/AddUser.vue'
import 'izitoast/dist/css/iziToast.min.css'
import UserService from '../services/user.service'
import { useUserStore } from '../store/user.store'
import UsersItem from '../components/Users/UsersItem.vue'

const users = computed(() => {
  return useUserStore().users
})

const getUsers = () => {
  UserService.getUsers({}).then((res) => {
    useUserStore().clearStore()
    useUserStore().setUsers(res?.data)
  })
}
onMounted(() => {
  getUsers()
})
</script>

<template>
  <div class="w-full">
    <!-- <div class="flex items-center justify-between bg-white rounded-lg p-3">
      <p class="text-3xl font-bold">Services Management</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div> -->
    <div class="grid grid-cols-3 gap-3">
      <AddUser />
      <div class="max-h-[77vh] overflow-auto mt-3 col-span-2 bg-white rounded-lg">
        <div class="flex items-center justify-between p-3">
          <p class="text-3xl font-bold">Users Report</p>
          <div class="flex items-center justify-center space-x-3">
            <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
              <option value="" selected>{{ $t('sortBy') }}</option>
              <option value="1">Sort 1</option>
              <option value="2">Sort 2</option>
            </select>
          </div>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('userFullname') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('role') }}</th>
              <th class="py-3 px-6 text-left">{{ $t('phone') }}</th>
              <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <UsersItem :users="users" />
          </tbody>
        </table>
        <div v-if="users.length === 0" class="w-full text-center text-red-500 mt-5">{{ $t('empty') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
