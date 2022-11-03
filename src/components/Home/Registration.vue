<script setup>
import { useModalStore } from '../../store/modal.store'
import { useTabStore } from '../../store/tab.store'
</script>
<template>
  <div v-if="useModalStore().isModalOpen" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 backdrop-blur bg-gray-900/75 w-full max-h-screen md:inset-0 md:h-full">
    <div class="relative p-4 w-full max-w-4xl h-full md:h-auto left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <div class="flex items-center justify-center space-x-3">
            <div @click="useTabStore().openFirstTab()" :class="useTabStore().isOpenFirstTab ? 'bg-lime-300' : 'bg-gray-200 text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">Add Patient</div>
            <div @click="useTabStore().openSecondTab()" :class="useTabStore().isOpenSecondTab ? 'bg-lime-300' : 'bg-gray-200 text-gray-600 cursor-pointer hover:shadow hover:scale-105'" class="flex items-center justify-center p-2 rounded-lg px-6 transition-all duration-300">Add Payment</div>
          </div>
          <button @click="useModalStore().closeModal()" type="button" class="text-gray-600 bg-gray-100 hover:bg-gray-800 hover:text-gray-300 transition-all duration-300 rounded-full text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div class="p-6">
          <div v-if="useTabStore().isOpenFirstTab">Tab 1</div>
          <div v-if="useTabStore().isOpenSecondTab">Tab 2</div>
        </div>
      </div>
    </div>
  </div>
</template>
