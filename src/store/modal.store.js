import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
    isOpenPaymentStatusChangerModal: false,
    isDeleteAlert: false,
    confirmDelete: false,
    isOpenAddVisitModal: false
  }),
  actions: {
    openModal() {
      this.isModalOpen = true
    },
    closeModal() {
      this.isModalOpen = false
    },
    openPaymentStatusChangerModal() {
      this.isOpenPaymentStatusChangerModal = true
    },
    closePaymentStatusChangerModal() {
      this.isOpenPaymentStatusChangerModal = false
    },
    openDeleteAlert() {
      this.isDeleteAlert = true
    },
    closeDeleteAlert() {
      this.isDeleteAlert = false
    },
    openAddVisitModal() {
      this.isOpenAddVisitModal = true
    },
    closeAddVisitModal() {
      this.isOpenAddVisitModal = false
    },
    allowDelete() {
      this.confirmDelete = true
      this.isDeleteAlert = false
    },
    denyDelete() {
      this.confirmDelete = false
      this.isDeleteAlert = false
    }
  },
})
