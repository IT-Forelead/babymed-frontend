<script setup>
import { onMounted, ref } from 'vue'
import InfiniteLoading from 'v3-infinite-loading'
import { toRefs } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import { useI18n } from 'vue-i18n'
import { parseJwt } from '../../mixins/utils.js'
import UserIcon from '../../assets/icons/UserIcon.vue'

const { t } = useI18n()
const payload = ref({})

const props = defineProps({
  users: { type: Array, required: true },
})

const { users } = toRefs(props)

const deleteUser = (selectedUser) => {
  useModalStore().openDeleteAlertModal()
  useUserStore().setSelectedUser(selectedUser)
}

onMounted(() => {
  payload.value = parseJwt()
})
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(user, idx) in users" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <UserIcon class="w-10 h-10 rounded-full border p-2 mr-2" />
        <div class="capitalize">{{ user?.firstname + ' ' + user?.lastname }}</div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ user?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ user?.role }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ user?.subRoleName ? user?.subRoleName : '-' }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div v-if="!user?.role?.includes('super')" @click="deleteUser(user)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
