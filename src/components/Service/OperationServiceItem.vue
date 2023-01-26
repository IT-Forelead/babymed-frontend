<script setup>
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter.js'
import { useExpenseStore } from '../../store/expense.store'
import { useModalStore } from '../../store/modal.store'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  operationServices: { type: Array, required: true },
})

const { operationServices } = toRefs(props)

const deleteOperationService = (selectedOperationService) => {
  useModalStore().openDeleteAlertModal()
  useExpenseStore().setSelectedOperationService(selectedOperationService)
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(service, idx) in operationServices" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ service?.service?.serviceTypeName }}</td>
    <td v-motion-pop class="py-2 px-4 text-left uppercase">{{ service?.service?.name }}</td>
    <td v-motion-pop class="py-2 px-4 text-left text-sm italic font-bold">{{ useMoneyFormatter(service?.service?.price) }}</td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div @click="deleteOperationService(service)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
