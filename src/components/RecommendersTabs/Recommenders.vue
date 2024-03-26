<script setup>
import { computed, ref } from '@vue/reactivity'
import { onClickOutside } from '@vueuse/core'
import { onMounted } from 'vue'
import MoneyExchangeIcon from '../../assets/icons/MoneyExchangeIcon.vue'
import RecommendersItem from '../Items/RecommendersItem.vue'
import AddRecommender from '../Registration/AddRecommender.vue'
import RecommendersService from '../../services/recommenders.service'
import { useRecommendersStore } from '../../store/recommenders.store'
import { useModalStore } from '../../store/modal.store'
import MoneyBagIcon from '../../assets/icons/MoneyBagIcon.vue'

const dropdown = ref(null)

const recommenders = computed(() => {
  return useRecommendersStore().recommenders
})

onClickOutside(dropdown, () => {
  if (useModalStore().isOpenFilterBy) {
    useModalStore().toggleFilterBy()
  }
})

onMounted(() => {
  useRecommendersStore().clearStore()
  RecommendersService.getAllRecommenders().then((res) => {
    console.log('recommenders', res)
    useRecommendersStore().setRecommenders(res?.data)
  })
})
</script>

<template>
  <div class="bg-white rounded-lg w-full p-5">
    <div class="flex items-center space-x-3">
      <router-link to="" class="bg-gray-200 hover:bg-gray-400 cursor-pointer transition-all duration-300 hover:scale-105 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyBagIcon class="w-6 h-6 mr-1" />
        {{ $t('recommenderSharesHistory') }}
      </router-link>
      <div>|</div>
      <div class="bg-lime-400 rounded-lg p-1.5 px-3 flex items-center">
        <MoneyExchangeIcon class="w-5 h-5 mr-1" />
        {{ $t('recommenders') }}
      </div>
    </div>
    <div class="grid grid- grid-cols-3 mt-5 gap-8">
      <div class="max-h-[75vh] col-span-2 overflow-auto xxl:overflow-x-hidden">
        <div class="flex items-center p-3">
          <p class="text-3xl font-bold">{{ $t('recommenders') }}</p>
        </div>
        <table class="min-w-max w-full table-auto">
          <thead class="sticky z-10 top-0 bg-white shadow">
            <tr class="text-gray-600 capitalize text-lg leading-normal">
              <th class="py-2 px-4 text-center">{{ $t('n') }}</th>
              <th class="py-2 px-4 text-left">{{ $t('recommender') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('recommenderShare') }}</th>
              <th class="py-2 px-4 text-center">{{ $t('actions') }}</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <RecommendersItem :recommenders="recommenders" />
          </tbody>
        </table>
      </div>
      <div class="bg-white rounded-lg p-3">
        <p class="text-3xl font-bold mb-3">{{ $t('createRecommender') }}</p>
        <AddRecommender />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
