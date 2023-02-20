<script setup>
import { useModalStore } from '../../store/modal.store'
import TimesIcon from '../../assets/icons/TimesIcon.vue'
import SelectOptionPdfTemplate from '../Inputs/SelectOptionPdfTemplate.vue'
import { useI18n } from 'vue-i18n'
import { useDropStore } from '../../store/drop.store'

const { t } = useI18n()

const URL = import.meta.env.VITE_PDF_URL;

const clear = () => {
  localStorage.removeItem('visitCreatedAt')
  localStorage.removeItem('patientFullname')
  localStorage.removeItem('patientBirthday')
  localStorage.removeItem('patientAddress')
}

const closeModal = () => {
  useDropStore().setSelectPdfTypeOption('')
  useModalStore().closePrintPdfModal()
  clear()
}
</script>

<template>
  <div v-if="useModalStore().isOpenPrintPdfModal" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative max-w-xl p-4 w-full h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div class="text-xl font-medium">{{ $t('printPdfTemplate') }}</div>
          </div>
          <button @click="closeModal()" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
            <TimesIcon />
          </button>
        </div>
        <div class="p-4 space-y-5">
          <div>
            <p>{{ $t('selectPdfTemplate') }}</p>
            <SelectOptionPdfTemplate />
          </div>
          <div class="relative min-w-full">
            <div v-if="useDropStore().selectPdfTypeOption?.id === 'uzi'">
              <iframe :src="URL+'/uzi.html'" frameborder="0" class="w-full h-14"></iframe>
            </div>
            <div v-else-if="useDropStore().selectPdfTypeOption?.id === 'doppler'">
              <iframe :src="URL+'/doppler.html'" frameborder="0" class="w-full h-14"></iframe>
            </div>
            <div v-else-if="useDropStore().selectPdfTypeOption?.id === 'pediatr'">
              <iframe :src="URL+'/pediatr.html'" frameborder="0" class="w-full h-14"></iframe>
            </div>
            <div v-else-if="useDropStore().selectPdfTypeOption?.id === 'ginekolog'">
              <iframe :src="URL+'/ginekolog.html'" frameborder="0" class="w-full h-14"></iframe>
            </div>
          </div>
          <hr />
          <div class="flex items-center justify-end space-x-3 mt-5 text-white">
            <div class="rounded-lg p-3 px-7 bg-gray-900 hover:bg-gray-700 cursor-pointer" @click="closeModal()">{{ $t('cancel') }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
