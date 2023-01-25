<script setup>
import 'v3-infinite-loading/lib/style.css'
import { ref, toRefs, watch } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import UserService from '../../services/user.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useModalStore } from '../../store/modal.store'
import { useUserStore } from '../../store/user.store'
import { useI18n } from 'vue-i18n'
import UserIcon from '../../assets/icons/UserIcon.vue'

const { t } = useI18n()

const props = defineProps({
  users: { type: Array, required: true },
})

const { users } = toRefs(props)
const selectedUserId = ref('')

const deleteUser = (selectedService) => {
  useModalStore().openDeleteAlertModal()
  useUserStore().setSelectedUser(selectedService)
}

watch(
  () => useModalStore().confirmDelete,
  (confirm) => {
    if (confirm) {
      UserService.deleteUser(selectedUserId.value)
        .then(() => {
          notify.success({
            message: t('deletedUser'),
          })
          UserService.getUsers({}).then((res) => {
            useUserStore().clearStore()
            useUserStore().setUsers(res?.data)
          })
          UserService.value = ''
        })
        .catch(() => {
          notify.warning({
            message: t('errorDeletingUser'),
          })
        })
    }
  }
)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(user, idx) in users" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div>
          <div class="capitalize">
            {{ user?.firstname + ' ' + user?.lastname }}
          </div>
          <div>{{ user?.phone }}</div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">
      {{ user?.role }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      {{ user?.subRoleName ? user?.subRoleName : '-' }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <!-- <div class="w-4 mr-3 transform text-blue-500 hover:text-purple-500 hover:scale-110 cursor-pointer">
          <EditIcon class="w-6 h-6" />
        </div> -->
        <div v-if="!user?.role?.includes('super')" @click="deleteUser(user)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
