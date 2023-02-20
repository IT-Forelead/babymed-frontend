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
  return useDropStore().selectSmsMessageTypeOption
})
const dropdown = ref(null)

const list = [
  {
    id: 'registration',
    name: t('registration')
  },
]

const clearSelectedOptionData = () => {
  useDropStore().setSelectSmsMessageTypeOption('')
}

onClickOutside(dropdown, () => {
  useDropStore().closeSmsMessageTypeDropDown()
})

const optionClicked = (data) => {
  useDropStore().setSelectSmsMessageTypeOption(data)
  useDropStore().closeSmsMessageTypeDropDown()
}
</script>
<template>
  <div class="select-none">
    <label ref="dropdown" class="flex items-center w-full relative">
      <div v-if="selectedOption" class="border-none focus:ring-0 outline-0 bg-gray-100 w-full text-lg rounded-lg pl-2 py-2">{{ selectedOption?.name }}</div>
      <div @click="useDropStore().openSmsMessageTypeDropDown()" v-else class="border-none bg-gray-100 py-2 w-full text-lg rounded-lg cursor-pointer text-gray-500 pl-2">{{ $t('select') }}</div>
      <ChevronRightIcon @click="useDropStore().openSmsMessageTypeDropDown()" v-if="!selectedOption" class="absolute right-2.5 z-10 rotate-90 cursor-pointer text-gray-600" />
      <TimesIcon @click="clearSelectedOptionData()" v-if="selectedOption" class="absolute right-2.5 z-10 cursor-pointer bg-gray-500 hover:bg-gray-600 text-white rounded-full p-1" />
      <div v-if="useDropStore().isOpenSmsMessageTypeDropDown" class="absolute shadow p-2 z-20 top-12 max-h-56 overflow-auto w-full bg-gray-100 rounded-lg divide-y">
        <div v-for="(type, idx) in list" :key="idx" @click="optionClicked(type)" class="hover:bg-gray-200 cursor-pointer p-2 rounded-lg" >
          {{ type?.name }}
        </div>
      </div>
    </label>
  </div>
</template>
