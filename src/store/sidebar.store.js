import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    isOpenSidebar: true,
    isOpenSubMenu: false,
  }),
  actions: {
    toggleSidebar() {
      this.isOpenSidebar = !this.isOpenSidebar
      localStorage.setItem('so', this.isOpenSidebar)
    },
    toggleSidebarSubMenu() {
      this.isOpenSubMenu = !this.isOpenSubMenu
    },
  },
})
