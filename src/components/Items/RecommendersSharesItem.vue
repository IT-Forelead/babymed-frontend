<script setup>
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import UserIcon from '../../assets/icons/UserIcon.vue'
import useMoneyFormatter from '../../mixins/currencyFormatter';
import percentCalc from '../../mixins/percentCalc'
import moment from 'moment';
const { t } = useI18n()

const props = defineProps({
  recommendersShares: { type: Array, required: true },
})

const { recommendersShares } = toRefs(props)

const translatePaymentStatus = (status) => {
  if (status === 'fully_paid') {
    return t('fullyPaid')
  } else {
    return t('notPaid')
  }
}

</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(share, idx) in recommendersShares" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ share?.recommender?.firstname + " " + share?.recommender?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="space-y-0.5 justify-center" v-for="service in share?.services">
        <div>
          {{ service.name }} - <span class="text-sm font-bold italic">{{ useMoneyFormatter(service.price) }}</span>
        </div>
      </div>
    </td>

    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="space-y-0.5 justify-center">
        {{ share?.recommender?.percent }}% - {{ useMoneyFormatter(share?.share?.price) }}
      </div>
    </td>

    <td v-motion-pop class="py-2 px-4 text-center">
      {{ moment(share?.visit?.createdAt).format('DD/MM/YYYY H:mm') }}
    </td>

    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full text-white" :class="share?.share.paymentStatus === 'not_paid' ? 'bg-red-500' : 'bg-green-400'">
        {{ translatePaymentStatus(share?.share.paymentStatus) }}
      </span>
    </td>
  </tr>
</template>
