<script setup>
import { toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import UserIcon from '../../assets/icons/UserIcon.vue'
import TrashIcon from '../../assets/icons/TrashIcon.vue'
import { useModalStore } from '../../store/modal.store'
import { useRecommendersStore } from '../../store/recommenders.store'

const { t } = useI18n()

const props = defineProps({
  recommenders: { type: Array, required: true },
})

const { recommenders } = toRefs(props)

const deleteRecommender = (selectedRecommender) => {
  useModalStore().openDeleteAlertModal()
  useRecommendersStore().setSelectedRecommender(selectedRecommender)
}
</script>

<template>
  <tr class="border-y border-gray-200 hover:bg-gray-100 text-lg font-medium" v-for="(recommender, idx) in recommenders" :key="idx">
    <td v-motion-pop class="text-center">{{ idx + 1 }}</td>
    <td v-motion-pop class="py-2 px-4 text-left">
      <div class="flex items-center">
        <div class="mr-2">
          <UserIcon class="w-10 h-10 rounded-full border p-2" />
        </div>
        <div class="text-base leading-5">
          <span class="font-medium capitalize">{{ recommender?.firstname + " " + recommender?.lastname }}</span>
        </div>
      </div>
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      {{ recommender?.percent }}%
    </td>
    <td v-motion-pop class="py-2 px-4 text-center">
      <div class="flex item-center justify-center">
        <div @click="deleteRecommender(recommender)" class="w-4 mr-3 transform text-red-500 hover:text-red-600 hover:scale-110 cursor-pointer">
          <TrashIcon class="w-6 h-6" />
        </div>
      </div>
    </td>
  </tr>
</template>
