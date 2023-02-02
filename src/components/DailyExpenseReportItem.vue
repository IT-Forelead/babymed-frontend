<script setup>
import UserIcon from '../assets/icons/UserIcon.vue'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../mixins/currencyFormatter'
import percentCalc from '../mixins/percentCalc'
import { toRefs } from 'vue'

const props = defineProps({
  checkupExpensesSummary: { type: Array, required: true },
})

// const res = computed(() => {
//   let test = checkupExpensesSummary.value
//   let distinct = Array.from(new Set(test.map(el => el?.user?.id)))
//   return distinct.map(distinctEl => checkupExpensesSummary.value.filter(dce => dce?.user?.id === distinctEl))
// })

const { checkupExpensesSummary } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in checkupExpensesSummary" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-8 h-8 rounded-full border p-1" />
        </div>
        <!-- <div v-for="(user, idx) in expense" :key="idx" class="text-base leading-5">
          <div>{{ user?.user }}</div>
          <span class="font-medium capitalize">{{ user?.firstname }}</span>
        </div> -->
        {{ expense?.user?.firstname + " " + expense?.user?.lastname }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4">
      <div v-for="(el, idx) in expense?.checkupExpenseInfos" :key="idx">
        <div class="grid grid-cols-5 gap-1">
          <div class="col-span-2 text-left">
            {{ el?.service?.serviceTypeName + " - " + el?.service?.name }}
            - <span class="font-bold italic">{{ useMoneyFormatter(el?.service?.price) }}</span>
          </div>
          <div class="text-center">
            {{ el?.doctorShare?.percent + "% "  }}
            - <span class="font-bold italic">{{ useMoneyFormatter(percentCalc(el?.service?.price, el?.doctorShare?.percent)) }}</span>
          </div>
          <div class="text-center">{{ el?.count }}</div>
          <div class="text-center font-bold italic">{{ useMoneyFormatter(el?.count * el?.checkupExpense?.price) }}</div>
        </div>
      </div>
    </td>
  </tr>
</template>
