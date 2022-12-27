import { defineStore } from 'pinia'

export const useMultiSelectStore = defineStore('multiSelect', {
  state: () => ({
    selectedServices: [],
  }),
  actions: {
    setSelectService(data) {
      if (data) {
        if (this.selectedServices.includes(data)) {
          this.selectedServices = this.selectedServices.filter((r) => r !== data)
        } else {
          this.selectedServices.push(data)
        }
      } else {
        this.selectedServices = []
      }
    },
    clearStore() {
      this.selectedServices = []
    }
  },
})
