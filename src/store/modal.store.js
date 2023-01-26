import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
    isOpenPaymentStatusChangerModal: false,
    isOpenAddVisitModal: false,
    isOpenAddServiceModal: false,
    isOpenEditServiceModal: false,
    isOpenDeleteAlertModal: false,
    isOpenFilterBy: false,
    isOpenOperationExpenseInfo: false,
    isOpenPrintModal: false,
    isOpenPrintPdfModal: false,
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
    openAddServiceModal() {
      this.isOpenAddServiceModal = true
    },
    closeAddServiceModal() {
      this.isOpenAddServiceModal = false
    },
    openEditServiceModal() {
      this.isOpenEditServiceModal = true
    },
    closeEditServiceModal() {
      this.isOpenEditServiceModal = false
    },
    openDeleteAlertModal() {
      this.isOpenDeleteAlertModal = true
    },
    closeDeleteAlertModal() {
      this.isOpenDeleteAlertModal = false
    },
    openOperationExpenseInfoModal() {
      this.isOpenOperationExpenseInfo = true
    },
    closeOperationExpenseInfoModal() {
      this.isOpenOperationExpenseInfo = false
    },
    openPrintModal() {
      this.isOpenPrintModal = true
    },
    closePrintModal() {
      this.isOpenPrintModal = false
    },
    openPrintPdfModal() {
      this.isOpenPrintPdfModal = true
    },
    closePrintPdfModal() {
      this.isOpenPrintPdfModal = false
    },
    toggleFilterBy() {
      this.isOpenFilterBy = !this.isOpenFilterBy
    },
  },
})
