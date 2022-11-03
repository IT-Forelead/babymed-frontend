import { defineStore } from 'pinia'

export const useTabStore = defineStore('tab', {
  state: () => ({
    isOpenFirstTab: true,
    isOpenSecondTab: false,
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
  },
})
