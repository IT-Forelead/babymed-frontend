<script setup>
import { ref } from '@vue/reactivity'
import { computed } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { useDropStore } from '../../store/drop.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import ChevronRightIcon from '../../assets/icons/ChevronRightIcon.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const selectedOption = computed(() => {
  return useDropStore().selectDateRangeOption
})
const dropdown = ref(null)

const list = [
  {
    id: 'today',
    name: t('today')
  },
  {
    id: 'yesterday',
    name: t('yesterday')
  },
  {
    id: 'weekly',
    name: t('weekly')
  },
  {
    id: 'lastWeek',
    name: t('lastWeek')
  },
  {
    id: 'monthly',
    name: t('monthly')
  },
  {
    id: 'lastMonth',
    name: t('lastMonth')
  },
  {
    id: 'yearly',
    name: t('yearly')
  },
  {
    id: 'lastYear',
    name: t('lastYear')
  },
  {
    id: 'anotherDate',
    name: t('anotherDate')
  },
]

const clearSelectedOptionData = () => {
  useDropStore().setSelectDateRangeOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeDateRangeDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectDateRangeOption(data)
  useDropStore().closeDateRangeDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2">{{ selectedOption?.name }}</div>
      <div @click="useDropStore().openDateRangeDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openDateRangeDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenDateRangeDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div v-for="(dateRange, idx) in list" :key="idx" @click="optionClicked(dateRange)" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" >
          {{ dateRange?.name }}
        </div>
      </div>
    </label>
  </div>
</template>
