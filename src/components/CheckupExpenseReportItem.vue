<script setup>
import EditIcon from '../assets/icons/EditIcon.vue'
import UserIcon from '../assets/icons/UserIcon.vue'
import TrashIcon from '../assets/icons/TrashIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../mixins/currencyFormatter'
import { toRefs } from 'vue'
import moment from 'moment'
import { useRouter } from 'vue-router'
import { useModalStore } from '../store/modal.store'
import { useDropStore } from '../store/drop.store'
import CheckupExpenseService from '../services/checkupExpenses.service'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const props = defineProps({
  checkupExpenses: { type: Array, required: true },
})

const { checkupExpenses } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in checkupExpenses" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-3 px-6 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ expense?.user?.firstname }}</span>
          <br />
          <span class="font-medium capitalize">{{ expense?.user?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-3 px-6 text-center capitalize">
      {{ expense?.service?.name }} <br />
      <span class="text-sm font-bold italic">{{ useMoneyFormatter(expense?.service?.price) }}</span>
    </td>
    <td v-motion-pop class="py-3 px-6 text-center">{{ expense?.doctorShare?.percent }}%</td>
    <td v-motion-pop class="py-3 px-6 text-center">{{ moment(expense?.operationExpense?.createdAt).format('MM/DD/YYYY h:mm:ss') }}</td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
