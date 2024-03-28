import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
    isOpenPaymentStatusChangerModal: false,
    isOpenAddUserModal: false,
    isOpenAddVisitModal: false,
    isOpenAddServiceModal: false,
    isOpenAddRoleModal: false,
    isOpenEditServiceModal: false,
    isOpenDeleteAlertModal: false,
    isOpenFilterBy: false,
    isOpenOperationExpenseInfo: false,
    isOpenPrintModal: false,
    isOpenPrintPdfModal: false,
    isOpenVisitInfoModal: false,
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
    openAddUserModal() {
      this.isOpenAddUserModal = true
    },
    closeAddUserModal() {
      this.isOpenAddUserModal = false
    },
    openAddServiceModal() {
      this.isOpenAddServiceModal = true
    },
    closeAddServiceModal() {
      this.isOpenAddServiceModal = false
    },
    openAddRoleModal() {
      this.isOpenAddRoleModal = true
    },
    closeAddRoleModal() {
      this.isOpenAddRoleModal = false
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
    openVisitInfoModal() {
      this.isOpenVisitInfoModal = true
    },
    closeVisitInfoModal() {
      this.isOpenVisitInfoModal = false
    },
    toggleFilterBy() {
      this.isOpenFilterBy = !this.isOpenFilterBy
    },
  },
})
