<script setup>
import 'v3-infinite-loading/lib/style.css'
import { ref, toRefs, watch } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import ExpenseService from '../../services/operationExpenses.service'
import notify from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { useExpenseStore } from '../../store/expense.store'
import { useModalStore } from '../../store/modal.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  operationServices: { type: Array, required: true },
})

const { operationServices } = toRefs(props)
const selectedServiceId = ref('')

const deleteOperationService = (s_id) => {
  selectedServiceId.value = s_id
  // useModalStore().openDeleteAlert()
  ExpenseService.deleteOperationService(selectedServiceId.value)
    .then(() => {
      notify.success({
        message: t('deletedOperationService'),
      })
      ExpenseService.getAllOperationServices().then((res) => {
        useExpenseStore().clearStore()
        useExpenseStore().setOperationServices(res)
      })
      selectedServiceId.value = ''
    })
    .catch(() => {
      notify.warning({
        message: t('errorDeletingOperationService'),
      })
    })
}

// watch(
//   () => useModalStore().confirmDelete,
//   (confirm) => {
//     if (confirm) {
//       ServicesService.deleteService(selectedServiceId.value)
//         .then(() => {
//           notify.success({
//             message: t('deletedService'),
//           })
//           ServicesService.getAllServices().then((res) => {
//             useServicesStore().setServices(res)
//           })
//           selectedServiceId.value = ''
//         })
//         .catch(() => {
//           notify.warning({
//             message: t('errorDeletingService'),
//           })
//         })
//     }
//   }
// )
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(service, idx) in operationServices" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-3 px-6 text-left uppercase">{{ service?.service?.serviceTypeName }}</td>
    <td v-motion-pop class="py-3 px-6 text-left uppercase">{{ service?.service?.name }}</td>
    <td v-motion-pop class="py-3 px-6 text-left">{{ useMoneyFormatter(service?.service?.price) }}</td>
    <td v-motion-pop class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <div @click="deleteOperationService(service?.operationService?.id)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
