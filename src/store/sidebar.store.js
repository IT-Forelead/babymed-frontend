import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpenSidebar: true,
    isOpenSubMenu: false,
    isOpenExpenseMenu: false,
  }),
  actions: {
    toggleSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar
      localStorage.setItem('so', this.isOpenSidebar)
    },
    toggleSidebarSubMenu() {
      this.isOpenSubMenu = !this.isOpenSubMenu
    },
    toggleExpenseMenu() {
      this.isOpenExpenseMenu = !this.isOpenExpenseMenu
    },
    clearStore() {
      this.isOpenSidebar = true
      this.isOpenSubMenu = false
      this.isOpenExpenseMenu = false
    }
  },
})
