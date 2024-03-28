<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import MoneyExchangeIcon from '../../assets/icons/MoneyExchangeIcon.vue'
import MoneyBagIcon from '../../assets/icons/MoneyBagIcon.vue'
import RecommendersShares from '../Items/RecommendersSharesItem.vue'
import RecommendersService from '../../services/recommenders.service'
import { useRecommendersStore } from '../../store/recommenders.store'
import { useModalStore } from '../../store/modal.store'

const dropdown = ref(null)

const recommendersShares = computed(() => {
  return useRecommendersStore().recommendersShares
})

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

onMounted(() => {
  useRecommendersStore().clearStore()
  RecommendersService.getRecommendersShares().then((res) => {
    useRecommendersStore().setRecommendersShares(res?.data)
  })
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center space-x-3">
      <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIcon class="w-6 h-6 mr-1" />
        {{ $t('recommenderSharesHistory') }}
      </div>
      <div>|</div>
      <router-link to="/recommenders" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyExchangeIcon class="w-5 h-5 mr-1" />
        {{ $t('recommenders') }}
      </router-link>
    </div>
    <div class="max-h-[77vh] overflow-auto xxl:overflow-x-hidden mt-3 expenses-wrapper">
      <div class="flex items-center p-3">
        <p class="text-3xl font-bold">{{ $t('recommenderSharesHistory') }}</p>
      </div>
      <table class="min-w-max w-full table-auto">
        <thead class="sticky z-10 top-0 bg-white shadow">
          <tr class="text-gray-600 capitalize text-lg leading-normal">
            <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
            <th class="py-2 px-4 text-left">{{ $t('recommender') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('service') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('recommenderShare') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('createdAt') }}</th>
            <th class="py-2 px-4 text-center">{{ $t('paymentStatus') }}</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm font-light">
          <RecommendersShares :recommendersShares="recommendersShares" />
        </tbody>
      </table>
      <div v-if="recommendersShares?.length === 0" class="w-full text-center text-red-500">
        {{ recommendersShares }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>
