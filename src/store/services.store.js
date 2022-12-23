import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: [],
    allServices: [],
    serviceTypes: [],
  }),
  actions: {
    setServices(data) {
      this.services = data
    },
    setAllServices(data) {
      this.allServices = data
    },
    setServiceTypes(data) {
      this.serviceTypes = data
    },
  },
})
