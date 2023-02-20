<script setup>
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import moment from 'moment'

const { t } = useI18n()

const props = defineProps({
  smsMessages: { type: Array, required: true },
})

const { smsMessages } = toRefs(props)

const translateDeliveryStatus = (status) => {
  if (status === 'sent') {
    return t('sent')
  } else if (status === 'delivered') {
    return t('delivered')
  } else if (status === 'failed') {
    return t('failed')
  } else {
    return t('undefined')
  }
}

const deliveryStatusColor = (status) => {
  if (status === 'sent') {
    return 'bg-amber-500'
  } else if (status === 'delivered') {
    return 'bg-green-500'
  } else if (status === 'failed') {
    return 'bg-red-500'
  } else {
    return 'bg-cyan-500'
  }
}

const translateSmsMessageType = (type) => {
  if (type === 'registration') {
    return t('registration')
  }
}

</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(sms, idx) in smsMessages" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ moment(sms?.sentDate).format('DD/MM/YYYY H:mm') }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ sms?.phone }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">{{ sms?.text }}</td>
    <td v-motion-pop class="py-2 px-4 text-center text-sm font-semibold italic">
      {{ translateSmsMessageType(sms?.messageType) }}
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <span class="p-1.5 px-3 text-sm rounded-full text-white" :class="deliveryStatusColor(sms?.deliveryStatus)">
        {{ translateDeliveryStatus(sms?.deliveryStatus) }}
      </span>
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
