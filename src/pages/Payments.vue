<script setup>
import PaymentItem from '../components/Payments/PaymentItem.vue'
import authHeader from '../mixins/auth-header'
import { computed, ref } from '@vue/reactivity'
import { usePaymentStore } from '../store/payment.store'
import { onMounted } from 'vue'

const API_URL = import.meta.env.VITE_BASE_URL

const total = ref(1)
const payments = computed(() => {
  return usePaymentStore().payments
})
const target = ref('.payments-wrapper')
const distance = ref(200)

let page = 0
const perPageData = 30
const loadPayments = async ($state) => {
  page++
  let additional = total.value % perPageData == 0 ? 0 : 1
  if (total.value !== 0 && total.value / perPageData + additional >= page) {
    try {
      const response = await fetch(`${API_URL}/payment/report`, {
        method: 'POST',
        body: JSON.stringify({
          page: page,
          limit: perPageData,
        }),
        headers: authHeader(),
      })
      const json = await response.json()
      total.value = json?.total
      setTimeout(() => {
        // payments.value.push(...json?.data)
        usePaymentStore().setPayments(json?.data)
        $state.loaded()
      }, 500)
    } catch (error) {
      $state.error()
    }
  } else $state.loaded()
}

onMounted(() => {
  usePaymentStore().clearStore()
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center justify-between">
      <p class="text-3xl font-bold">{{ $t('paymentsReport') }}</p>
      <select class="border-none rounded-lg bg-gray-100 capitalize text-gray-400">
        <option value="" selected>{{ $t('sortBy') }}</option>
        <option value="1">Sort 1</option>
        <option value="2">Sort 2</option>
      </select>
    </div>
    <div class="overflow-auto mt-3 payments-wrapper">
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-3 px-6 text-center">{{ $t('n') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('createdAt') }}</th>
            <th class="py-3 px-6 text-left">{{ $t('patientName') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('paymentAmount') }}</th>
            <th class="py-3 px-6 text-center">{{ $t('actions') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <PaymentItem :payments="payments" :distance="distance" :target="target" @infinite="loadPayments" />
        </tbody>
      </table>
      <div v-if="payments.length === 0" class="w-full text-center text-red-500">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<style></style>
