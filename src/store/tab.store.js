import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({
    isOpenFirstTab: true,
    isOpenSecondTab: false,
    isNotPaid: false,
    isPartiallyPaid: false,
    isFullyPaid: false,
    currentStatus: ''
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
      this.currentStatus = status
      if (status.includes('not_paid')) {
        this.isNotPaid = true
        this.isPartiallyPaid = false
        this.isFullyPaid = false
      } else {
        this.isFullyPaid = true
        this.isPartiallyPaid = false
        this.isNotPaid = false
      }
    },
  },
})
