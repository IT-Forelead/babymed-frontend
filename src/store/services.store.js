import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    serviceTypes: [],
  }),
  actions: {
    setServices(data) {
      this.services = data
    },
    setServiceTypes(data) {
      this.serviceTypes = data
    },
  },
})
