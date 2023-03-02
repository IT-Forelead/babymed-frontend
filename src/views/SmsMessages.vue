<script setup>
import { computed, ref, reactive } from '@vue/reactivity'
import { onMounted } from 'vue'
import { useSmsMessagesStore } from '../store/smsMessage.store'
import { useModalStore } from '../store/modal.store'
import { useDropStore } from '../store/drop.store'
import ArrowDownIcon from '../assets/icons/ArrowDownIcon.vue'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import SmsMessageItem from '../components/Items/SmsMessageItem.vue'
import SmsMessageService from '../services/smsMessage.service'
import { useI18n } from 'vue-i18n'
import { cleanObjectEmptyFields } from '../mixins/utils'
import SelectOptionDeliveryStatus from '../components/Inputs/SelectOptionDeliveryStatus.vue'
import SelectOptionSmsMessageType from '../components/Inputs/SelectOptionSmsMessageType.vue'
import { onClickOutside } from '@vueuse/core'
import LoadingIcon from '../assets/icons/LoadingIcon.vue'

const { t } = useI18n()
const isLoading = ref(false)
const dropdown = ref(null)

const total = ref(1)
const smsMessages = computed(() => {
  return useSmsMessagesStore().smsMessages
})
const target = ref('.sms-messages-wrapper')
const distance = ref(0)

let page = 0
const loadSmsMessages = async ($state) => {
  page++
  let additional = total.value % 30 === 0 ? 0 : 1
  if (total.value !== 0 && total.value / 30 + additional >= page) {
    SmsMessageService.getSmsMessages(
      cleanObjectEmptyFields({
        phone: filterData.phone.replace(/([() -])/g, ''),
        messageType: selectSmsMessageTypeOption?.value?.id,
        deliveryStatus: selectDeliveryStatusOption?.value?.id,
        startDate: filterData.startDate,
        endDate: filterData.endDate,
        page: page,
        limit: 30,
      })
    )
      .then((result) => {
        total.value = result?.total
        useSmsMessagesStore().setSmsMessages(result?.data)
        $state.loaded()
      })
      .catch(() => {
        $state.error()
      })
  } else $state.loaded()
}

const filterData = reactive({
  phone: '',
  messageType: '',
  deliveryStatus: '',
  startDate: '',
  endDate: '',
})

const submitFilterData = () => {
  isLoading.value = true
  SmsMessageService.getSmsMessages(
    cleanObjectEmptyFields({
      phone: filterData.phone.replace(/([() -])/g, ''),
      messageType: selectSmsMessageTypeOption?.value?.id,
      deliveryStatus: selectDeliveryStatusOption?.value?.id,
      startDate: filterData.startDate,
      endDate: filterData.endDate,
      page: 1,
      limit: 30,
    })
  ).then((res) => {
    useSmsMessagesStore().clearStore()
    useSmsMessagesStore().setSmsMessages(res?.data)
    isLoading.value = false
    if (useModalStore().isOpenFilterBy) {
      useModalStore().toggleFilterBy()
    }
  })
}

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

const selectSmsMessageTypeOption = computed(() => {
  return useDropStore().selectSmsMessageTypeOption
})

const selectDeliveryStatusOption = computed(() => {
  return useDropStore().selectDeliveryStatusOption
})

onMounted(() => {
  useSmsMessagesStore().clearStore()
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('smsMessagesReport') }}</p>
      <div class="relative" ref="dropdown">
        <div @click="useModalStore().toggleFilterBy()" class="border-none select-none text-gray-500 bg-gray-100 rounded-lg w-full p-2 px-5 flex items-center hover:bg-gray-200 cursor-pointer">
          <FilterIcon class="w-5 h-5 text-gray-400" />
          {{ $t('filter') }}
        </div>
        <div v-if="useModalStore().isOpenFilterBy" class="absolute bg-white shadow rounded-xl p-3 z-20 top-12 right-0 space-y-3">
          <label for="phone">
            {{ $t('phone') }}
            <input v-model="filterData.phone" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" type="text" v-mask="'+998(##) ###-##-##'" id="phone" placeholder="+998(00) 000-00-00" />
          </label>
          <div>
            {{ $t('selectType') }}
            <SelectOptionSmsMessageType />
          </div>
          <div>
            {{ $t('selectDeliveryStatus') }}
            <SelectOptionDeliveryStatus />
          </div>
          <div class="flex items-center space-x-1">
            <label for="">
              {{ $t('from') }}
              <input v-model="filterData.startDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
            </label>
            <ArrowDownIcon class="-rotate-90 text-gray-600 mt-6" />
            <label for="">
              {{ $t('to') }}
              <input v-model="filterData.endDate" type="datetime-local" class="border-none text-gray-500 bg-gray-100 rounded-lg w-full" />
            </label>
          </div>
          <div v-if="isLoading" class="w-full bg-gray-600 py-3 select-none text-white rounded-lg flex items-center justify-center">
            <LoadingIcon class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" />
            <span>{{ $t('loading') }}</span>
          </div>
          <div v-else @click="submitFilterData()" class="w-full bg-gray-900 hover:bg-gray-800 cursor-pointer select-none py-3 text-white rounded-lg flex items-center justify-center">
            <span>{{ $t('filter') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 sms-messages-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('phone') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('text') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('type') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('deleveryStatus') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <SmsMessageItem :smsMessages="smsMessages" :distance="distance" :target="target" @infinite="loadSmsMessages" />
        </tbody>
      </table>
      <div v-if="smsMessages?.length === 0" class="w-full text-center text-red-500 mt-5">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style scoped></style>
