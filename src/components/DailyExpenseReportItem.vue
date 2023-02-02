<script setup>
import UserIcon from '../assets/icons/UserIcon.vue'
import 'v3-infinite-loading/lib/style.css'
import useMoneyFormatter from '../mixins/currencyFormatter'
import percentCalc from '../mixins/percentCalc'
import { toRefs, ref } from 'vue'
import { computed } from '@vue/reactivity'

const props = defineProps({
  dailyCheckupExpenses: { type: Array, required: true },
})

const res = computed(() => {
  let test = dailyCheckupExpenses.value
  let distinct = Array.from(new Set(test.map(el => el?.user?.id)))
  return distinct.map(distinctEl => dailyCheckupExpenses.value.filter(dce => dce?.user?.id === distinctEl))
})

const { dailyCheckupExpenses } = toRefs(props)
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(expense, idx) in res" :key="idx">
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
        {{ expense[0]?.user?.firstname + " " + expense[0]?.user?.lastname }}
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      {{ expense.length }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center font-bold italic">
      {{ useMoneyFormatter(percentCalc(expense?.service?.price, expense?.doctorShare?.percent)) }}
    </td>
  </tr>
</template>
