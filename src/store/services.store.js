import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
  }),
  actions: {
    setServices(data) {
      this.services = data
    },
  },
})
