<script setup>
import { useModalStore } from '../../store/modal.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import AddVisit from '../Registration/AddVisit.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div v-if="useModalStore().isOpenAddVisitModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="text-xl font-medium">{{ $t('createVisit') }}</div>
          </div>
          <button @click="useModalStore().closeAddVisitModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-4 space-y-5">
          <AddVisit />
        </div>
      </div>
    </div>
  </div>
</template>
