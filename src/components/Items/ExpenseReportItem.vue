<script setup>
import UserIcon from '../../assets/icons/UserIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { toRefs } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { useModalStore } from '../../store/modal.store'
import { useDropStore } from '../../store/drop.store'
import OperationExpenseService from '../../services/operationExpenses.service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const props = defineProps({
  expenses: { type: Array, required: true },
})

const { expenses } = toRefs(props)

const clickedTheRow = (data) => {
  OperationExpenseService.getExpenseItemsByExpenseId(data?.operationExpense?.id).then((res) => {
    useDropStore().setSelectedExpenseItems(res)
  })
  useDropStore().setSelectedExpense(data)
  useModalStore().openOperationExpenseInfoModal()
}
</script>
<template>
  <tr class="border-y cursor-pointer border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in expenses" :key="idx" @click="clickedTheRow(expense)">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5 font-medium capitalize">
          {{ expense?.patient?.firstname + " " + expense?.patient?.lastname }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center capitalize">
      {{ expense?.service?.serviceTypeName + " - " + expense?.service?.name }} <br />
      <span class="text-sm font-bold italic">{{ useMoneyFormatter(expense?.service?.price) }}</span>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ moment(expense?.operationExpense?.createdAt).format('DD/MM/YYYY H:mm') }}</td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
