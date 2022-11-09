<script setup>
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import UserIcon from '../../assets/icons/UserIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import moment from 'moment'
import useMoneyFormatter from '../../mixins/currencyFormatter'

const props = defineProps({
  payments: { type: Array, required: true },
})

const { payments } = toRefs(props)
</script>
<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(payment, idx) in payments" :key="idx">
    <td class="text-center">{{ idx + 1 }}</td>
    <td class="py-3 px-6">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <span class="text-lg font-medium capitalize">{{ payment?.customer?.firstname + ' ' + payment?.customer?.lastname }}</span>
      </div>
    </td>
    <td class="py-3 px-6">{{ moment(payment?.payment?.createdAt).format('MM/DD/YYYY h:mm:ss') }}</td>
    <td class="py-3 px-6">
      {{ useMoneyFormatter(payment?.payment?.price) }}
    </td>
    <td class="py-3 px-6 text-center">
      <div class="flex item-center justify-center">
        <div class="w-4 mr-2 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
  <tr class="text-gray-700 text-md dark:text-gray-300 dark:bg-gray-800">
    <td colspan="5">
      <div class="flex items-center justify-center w-full p-2">
        <InfiniteLoading v-bind="$attrs" />
      </div>
    </td>
  </tr>
</template>
