<script setup>
import { computed, ref, reactive } from '@vue/reactivity'
import authHeader from '../mixins/auth-header'
import {onMounted} from 'vue'
import { useSmsMessagesStore } from '../store/smsMessage.store'
import { useModalStore } from '../store/modal.store'
import { useDropStore } from '../store/drop.store'
import ArrowDownIcon from '../assets/icons/ArrowDownIcon.vue'
import FilterIcon from '../assets/icons/FilterIcon.vue'
import SmsMessageItem from '../components/Items/SmsMessageItem.vue'
import SmsMessageService from '../services/smsMessage.service'
import { useI18n } from 'vue-i18n'
import AxiosService from '../services/axios.service'
import { cleanObjectEmptyFields } from '../mixins/utils'
import SelectOptionDeliveryStatus from '../components/Inputs/SelectOptionDeliveryStatus.vue'
import SelectOptionSmsMessageType from '../components/Inputs/SelectOptionSmsMessageType.vue'
import { onClickOutside } from '@vueuse/core'

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
    AxiosService.post('/message/report', { page: page, limit: 30 }, { headers: authHeader() })
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
            <svg class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
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
