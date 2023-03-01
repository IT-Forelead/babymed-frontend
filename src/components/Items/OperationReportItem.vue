<script setup>
import UserIcon from '../../assets/icons/UserIcon.vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import { toRefs } from 'vue'
import moment from 'moment'

const props = defineProps({
  operations: { type: Array, required: true },
})

const { operations } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(operation, idx) in operations" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ operation?.patient?.firstname + " " + operation?.patient?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="text-base leading-5font-medium">{{ operation?.patient?.phone }}</div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">{{ moment(operation?.operation?.createdAt).format('DD/MM/YYYY H:mm') }}</td>
    <td v-motion-pop class="py-2 px-4 text-center capitalize">
      <span>{{ operation?.service?.serviceTypeName + " - " + operation?.service?.name + " "}}</span>
      <span class="text-sm font-bold italic">- {{ useMoneyFormatter(operation?.service?.price) }}</span>
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
