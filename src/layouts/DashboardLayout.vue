<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
import ChenronRightIcon from '../assets/icons/ChevronRightIcon.vue'
import { useSidebarStore } from '../store/sidebar.store'
import { computed } from '@vue/runtime-core'
import { useModalStore } from '../store/modal.store'
const isOpen = computed(() => useSidebarStore().isOpenSidebar)
const isShowCloseSidebarBtn = computed(() => useModalStore().isModalOpen || useModalStore().isOpenPaymentStatusChangerModal || useModalStore().isOpenAddVisitModal || useModalStore().isOpenOperationExpenseInfo || useModalStore().isOpenPrintModal || useModalStore().isOpenPrintPdfModal || useModalStore().isOpenAddServiceModal || useModalStore().isOpenEditServiceModal || useModalStore().isOpenDeleteAlertModal)
</script>
<template>
  <div class="flex h-screen overflow-y-hidden bg-white relative">
    <Sidebar :class="isOpen ? 'w-80' : 'w-20'"
      class="fixed inset-y-0 z-10 flex flex-col flex-shrink-0 max-h-screen overflow-hidden transition-all duration-500 transform bg-gray-900 shadow-lg lg:z-auto lg:static lg:shadow-none -translate-x-full lg:translate-x-0" />
    <div v-if="!isShowCloseSidebarBtn" @click="useSidebarStore().toggleSidebar()" :class="isOpen ? 'left-72' : 'left-12'"
      class="absolute w-7 z-40 bg-white h-7 rounded-full flex items-center justify-center ml-4 top-7 cursor-pointer shadow-2xl transition-all duration-500">
      <ChenronRightIcon :class="isOpen ? 'rotate-180' : ''" class="text-black w-6 h-6 transition-all duration-500" />
    </div>
    <div class="flex flex-col flex-1 h-full overflow-hidden">
      <Navbar class="w-full bg-slate-100 sticky top-0 z-30" />
      <div class="flex-1 max-h-full p-5 overflow-auto bg-slate-100">
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </div>
    </div>
  </div>
</template>
