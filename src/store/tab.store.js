import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({
    isOpenFirstTab: true,
    isOpenSecondTab: false,
    currentPaymentStatus: '',
    isNotPaid: false,
    isPartiallyPaid: false,
    isFullyPaid: false,
  }),
  actions: {
    openFirstTab() {
      this.isOpenFirstTab = true
      this.isOpenSecondTab = false
    },
    openSecondTab() {
      this.isOpenFirstTab = false
      this.isOpenSecondTab = true
    },
    changeTab(status) {
      this.currentPaymentStatus = status
      if (this.currentPaymentStatus.includes('not paid')) {
        this.isNotPaid = true
        this.isPartiallyPaid = false
        this.isFullyPaid = false
      } else if (this.currentPaymentStatus.includes('partially paid')) {
        this.isPartiallyPaid = true
        this.isNotPaid = false
        this.isFullyPaid = false
      } else {
        this.isFullyPaid = true
        this.isPartiallyPaid = false
        this.isNotPaid = false
      }
    },
  },
})
