<script setup>
import UserIcon from '../../assets/icons/UserIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import percentCalc from '../../mixins/percentCalc'
import { toRefs } from 'vue'
import moment from 'moment'

const props = defineProps({
  checkupExpenses: { type: Array, required: true },
})

const { checkupExpenses } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in checkupExpenses" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ expense?.user?.firstname + " " + expense?.user?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex flex-col space-y-1 justify-center">
        <div class="text-base leading-5font-medium capitalize">{{ expense?.patient?.firstname + " " + expense?.patient?.lastname }}</div>
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-500">{{ $t('visitingTime') }}:</span>
          <span class="text-base">{{ moment(expense?.visit?.createdAt).format('DD/MM/YYYY H:mm') }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex flex-col space-y-0.5 justify-center">
        <div class="capitalize">{{ expense?.service?.serviceTypeName + " - " + expense?.service?.name }}</div>
        <div class="text-sm font-bold italic">{{ useMoneyFormatter(expense?.service?.price) }}</div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex flex-col space-y-0.5 justify-center">
        <div>{{ expense?.doctorShare?.percent }}%</div>
        <div class="text-sm font-bold italic">
          {{ useMoneyFormatter(percentCalc(expense?.service?.price, expense?.doctorShare?.percent)) }}
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ moment(expense?.checkupExpense?.createdAt).format('DD/MM/YYYY H:mm') }}</td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td v-motion-pop colspan="10">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
