import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', {
  state: () => ({
    regions: [],
  }),
  actions: {
    setRegions(data) {
      this.regions = data
    },
  },
})
