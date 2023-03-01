<script setup>
import UserIcon from '../../assets/icons/UserIcon.vue'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../../mixins/currencyFormatter'
import percentCalc from '../../mixins/percentCalc'
import { toRefs } from 'vue'

const props = defineProps({
  operationExpenseItemsSummary: { type: Array, required: true },
})

const { operationExpenseItemsSummary } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in operationExpenseItemsSummary" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <UserIcon class="w-8 h-8 rounded-full border p-1 mr-2" />
        {{ expense?.user?.firstname + " " + expense?.user?.lastname }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4">
      <div v-for="(el, idx) in expense?.items" :key="idx">
        <div class="grid grid-cols-4 gap-1">
          <div class="text-left">
            {{ el?.patient?.firstname + " " + el?.patient?.lastname }}
          </div>
          <div class="text-center">
            {{ el?.service?.serviceTypeName + " - " + el?.service?.name }}
          </div>
          <div class="text-center">
            {{ el?.subRole.name }}
          </div>
          <div class="text-center">
            {{ useMoneyFormatter(el?.item?.price) }}
          </div>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center font-bold italic">
        {{ useMoneyFormatter(expense?.totalPrice) }}
    </td>
  </tr>
</template>
